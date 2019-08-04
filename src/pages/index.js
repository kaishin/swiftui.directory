import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>SwiftUI Directory</h1>

    <ol className="package-list">
      {data.allPackages.edges.map(({ node }, id) => (
        <li className="package">
          {node.name} <small>{node.description}</small>
        </li>
      ))}
    </ol>
  </Layout>
);

export const query = graphql`
  query PackagesQuery {
    allPackages: allPackagesYaml {
      edges {
        node {
          name
          description
        }
      }
    }
  }
`;

export default IndexPage;
