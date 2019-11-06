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
          <div className="header-content">
            <p className="intro">A curated collection of open-source SwiftUI libraries.</p>
            <ul className="links">
              <li className="link standard">
                <a href="https://github.com">Suggest a Library</a>
              </li>
              <li className="link rss">
                <a href="/feed.xml">RSS Feed</a>
              </li>
              <li className="link twitter">
                <a href="https://github.com">Twitter</a>
              </li>
            </ul>
          </div>
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
