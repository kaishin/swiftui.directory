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
            A curated collection of open-source SwiftUI libraries. Open an issue to suggest a new library.
          </p>
        </header>

        <main className="page-content">{children}</main>

        <footer className="site-footer">
          <div className="footer-content">
            <p className="legal">
              This website doesn't store any personal information from visitors, including IP addresses, geolocation,
              and browser fingerprints. <a href="https://usefathom.com">Fathom</a> is used to collect basic,
              non-identifying data such as visitor count and referrers.
              <br /> <br />This website is not affiliated with Apple nor the Swift open-source project.
            </p>
            <span className="copyright">
              <em>&copy;</em> {new Date().getFullYear()}{' '}
              <a href="https://redalemeden.com">{data.site.siteMetadata.author}</a> —{' '}
              <a href="https://github.com/kaishin/redalemeden.com">Source</a>
            </span>
          </div>
        </footer>
      </section>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
