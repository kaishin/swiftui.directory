const path = require('path');
const url = require('url');
const moment = require('moment');
const { Feed } = require('feed');
const { feedOptions, runQuery, writeFile, getFileUpdatedDate } = require('./src/utils/feed-helpers');
const publicPath = './public';

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `PackagesYaml`) {
    const searchIndex =
      node.description + ' ' + node.tags.join(', ') + ' ' + node.category + ' ' + node.license + ' ' + node.author.name;

    createNodeField({
      node,
      name: 'searchIndex',
      value: searchIndex,
    });
  }
};

exports.onPostBuild = async ({ graphql }) => {
  const siteQuery = await runQuery(graphql, feedOptions.siteQuery);
  const {
    site: {
      siteMetadata: { title: siteTitle, description: siteDescription, siteUrl, author: siteAuthor, email: siteEmail },
    },
  } = siteQuery;

  // Main Feed

  const feedQuery = await runQuery(graphql, feedOptions.feedQuery);
  const { allPackagesYaml: { edges: data } } = feedQuery;

  const items = data.map((i) => {
    const { node: package } = i;

    return {
      id: package.url,
      url: package.url,
      name: package.name,
      datePublished: moment(package.added).toDate(),
      dateUpdated: moment(package.added).toDate(),
      content: package.description,
      category: package.category,
      tags: package.tags,
      license: package.license,
      author: package.author,
    };
  });

  console.log('Generating JSON and RSS feeds...');

  let newFeed = new Feed({
    title: siteTitle,
    description: siteDescription,
    link: siteUrl,
    id: 'swiftui-directory',
    copyright: '2019 – SwiftUI Directory',
    favicon: url.resolve(siteUrl, 'favicon.ico'),
    image: url.resolve(siteUrl, 'icon-touch.png'),
    feedLinks: {
      rss: url.resolve(siteUrl, 'feed.xml'),
      json: url.resolve(siteUrl, 'feed.json'),
    },
    author: {
      name: siteAuthor,
      email: siteEmail,
    },
  });

  let all = new Feed({
    title: siteTitle,
    description: siteDescription,
    link: siteUrl,
    id: 'swiftui-directory',
    copyright: '2019 – SwiftUI Directory',
    feedLinks: {
      json: url.resolve(siteUrl, 'feed.json'),
    },
  });

  items.slice(0, 50).forEach((item) => {
    newFeed.addItem({
      title: item.name,
      id: item.url,
      link: item.url,
      published: item.datePublished,
      content: item.content,
      extensions: [{ name: 'metadata', objects: { authorTwitter: item.author.twitter } }],
      author: [
        {
          name: item.author.name,
          link: item.author.website,
        },
      ],
    });
  });

  items.forEach((item) => {
    all.addItem({
      title: item.name,
      link: item.url,
      published: item.datePublished,
      extensions: [
        { name: 'tags', objects: item.tags },
        { name: 'description', objects: item.content },
        { name: 'category', objects: item.category },
        { name: 'license', objects: item.license },
        { name: 'author', objects: item.author },
      ],
    });
  });

  newFeed.addContributor({
    name: siteAuthor,
    email: siteEmail,
    link: siteUrl,
  });

  await writeFile(path.join(publicPath, 'feed.json'), newFeed.json1(), 'utf8').catch((r) => {
    console.log('Failed to write JSON Feed file: ', r);
  });

  await writeFile(path.join(publicPath, 'all.json'), all.json1(), 'utf8').catch((r) => {
    console.log('Failed to write JSON Feed file: ', r);
  });

  await writeFile(path.join(publicPath, 'feed.xml'), newFeed.rss2(), 'utf8').catch((r) => {
    console.log('Failed to write RSS Feed File:', r);
  });

  return Promise.resolve();
};
