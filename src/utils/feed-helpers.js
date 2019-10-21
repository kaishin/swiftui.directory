const fs = require('fs');
const pify = require('pify');

const writeFile = pify(fs.writeFile);

const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
};

const runQuery = (handler, query) =>
  handler(query).then((r) => {
    if (r.errors) {
      throw new Error(r.errors.join(`, `));
    }

    return r.data;
  });

const feedOptions = {
  siteQuery: `
    {
      site {
        siteMetadata {
          author
          description
          keywords
          title
          siteUrl
          email
          authorBio
        }
      }
    }
  `,

  feedQuery: `
  {
    allFile(sort: {fields: birthTime, order: DESC}) {
      edges {
        node {
          createdDate: birthTime
          modifiedDate: modifiedTime
          package: childPackagesYaml {
            name
            author {
              avatar
              name
              website
            }
            category
            description
            id
            license
            tags
            url
          }
          
        }
      }
    }
  }
  `
};

module.exports = {
  writeFile,
  runQuery,
  feedOptions,
  getFileUpdatedDate
};