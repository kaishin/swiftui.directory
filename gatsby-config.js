module.exports = {
  siteMetadata: {
    title: 'SwiftUI Directory',
    description: 'A curated directory of SwiftUI open-source libraries.',
    author: 'Reda Lemeden',
    email: 'hello@redalemeden.com',
    keywords: ['swiftui', 'packages', 'libraries', 'frameworks', 'spm'],
    siteUrl: 'https://swiftui.directory',
    authorBio: 'Designer, programmer, and illustrator based in Stockholm, Sweden.',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cms',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Quattro:n4,i4,n7,i7'],
          urls: ['/fonts/fonts.css'],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-flexsearch',
      options: {
        languages: ['en'],
        type: 'LibrariesYaml',
        fields: [
          {
            name: 'name',
            resolver: 'name',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9,
            },
          },
          {
            name: 'searchIndex',
            resolver: 'fields.searchIndex',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9,
            },
          },
          {
            name: 'description',
            resolver: 'description',
            indexed: false,
            store: true,
          },
          {
            name: 'category',
            resolver: 'category',
            indexed: false,
            store: true,
          },
          {
            name: 'license',
            resolver: 'license',
            indexed: false,
            store: true,
          },
          {
            name: 'tags',
            resolver: 'tags',
            indexed: false,
            store: true,
          },
          {
            name: 'url',
            resolver: 'url',
            indexed: false,
            store: true,
          },
          {
            name: 'authorName',
            resolver: 'author.name',
            indexed: false,
            store: true,
          },
          {
            name: 'authorAvatar',
            resolver: 'author.avatar',
            indexed: false,
            store: true,
          },
          {
            name: 'authorWebsite',
            resolver: 'author.website',
            indexed: false,
            store: true,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
