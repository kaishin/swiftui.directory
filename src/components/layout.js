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
        <Seo />
        <header className="site-header">
          <Link to="/" activeClassName="header-link">
            <h1>
              SwiftUI <span>Directory</span>
            </h1>
          </Link>
          <div className="header-body">
            <p className="intro">
              loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum
              mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
            </p>
            <input type="text" name="search" id="search" />
          </div>
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
