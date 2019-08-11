import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import Seo from './seo';

import '../css/normalize.css';
import '../css/styles.css';

import 'typeface-rubik';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
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
    `}
    render={(data) => (
      <section className="grid-container">
        <Seo />
        <header className="site-header">
          <Link to="/" activeClassName="header-link">
            <h1 className="full-name">{data.site.siteMetadata.title}</h1>
          </Link>
        </header>

        <main className="main-container">{children}</main>

        <footer className="site-footer">
          <ul className="link-list">
            <li className="link">
              <a href="https://widegamut.club/@kaishin" rel="me">
                Mastodon
              </a>
              <span className="separator">/</span>
            </li>
            <li className="link">
              <a href="https://github.com/kaishin" rel="me">
                Github
              </a>
              <span className="separator">/</span>
            </li>
            <li className="link">
              <a href="https://twitter.com/kaishin" rel="me">
                Twitter
              </a>
            </li>
          </ul>
          <span className="copyright">
            <em>&copy;</em> {new Date().getFullYear()} {data.site.siteMetadata.author}.
            <br />All Rights Reserved. <a href="https://github.com/kaishin/redalemeden.com">Source</a>
          </span>
        </footer>
      </section>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
