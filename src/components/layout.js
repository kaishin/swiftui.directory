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
      <section className="main-container">
        <Seo title="Home" />
        <header className="site-header">
          <Link to="/" activeClassName="header-link">
            <h1>
              SwiftUI <span>Directory</span>
            </h1>
          </Link>
          <p className="intro">
            A curated collection of open-source SwiftUI packages.To suggest a package, open an issue.
          </p>
        </header>

        <main className="page-content">{children}</main>

        <footer className="site-footer">
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
