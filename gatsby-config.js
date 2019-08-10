module.exports = {
  siteMetadata: {
    title: 'SwiftUI Directory',
    description: 'A curated directory of SwiftUI open-source packages.',
    author: 'Reda Lemeden'
  },
  plugins: [
    'gatsby-transformer-yaml',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/`
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-flexsearch',
      options: {
        languages: [ 'en' ],
        type: 'PackagesYaml',
        fields: [
          {
            name: 'id',
            resolver: 'id',
            indexed: false,
            store: true
          },
          {
            name: 'name',
            resolver: 'name',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9
            }
          },
          {
            name: 'description',
            resolver: 'description',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9
            }
          },
          {
            name: 'category',
            resolver: 'category',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9
            }
          },
          {
            name: 'license',
            resolver: 'license',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9
            }
          },
          {
            name: 'tags',
            resolver: 'tags',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9
            }
          },
          {
            name: 'url',
            resolver: 'url',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9
            }
          },
          {
            name: 'authorName',
            resolver: 'author.name',
            indexed: true,
            store: true,
            attributes: {
              encode: 'icase',
              tokenize: 'forward',
              resolution: 9
            }
          },
          {
            name: 'authorAvatar',
            resolver: 'author.avatar',
            indexed: false,
            store: true
          },
          {
            name: 'authorWebsite',
            resolver: 'author.website',
            indexed: false,
            store: true
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
