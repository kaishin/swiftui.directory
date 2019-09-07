import React, { Component } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import Highlighter from 'react-highlight-words';

class IndexPage extends Component {
  state = {
    query: '',
    results: []
  };

  render() {
    const { edges: packages } = this.props.data.allPackages;

    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((item, i) => (
          <li className="package" key={i}>
            <Highlighter textToHighlight={item.name} searchWords={this.state.query.split()} />
            <small>{item.description}</small>
          </li>
        ));
      } else if (this.state.query.length > 2) {
        return "No results for '" + this.state.query + "'";
      } else {
        return 'Please insert at least 3 characters';
      }
    };

    return (
      <Layout>
        <SEO title="Home" />

        <div className="header-body">
          <p className="intro">
            loreLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.
            Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
          </p>
          <input
            name="search"
            id="search"
            className="search-input"
            type="text"
            value={this.state.query}
            onChange={this.search}
            placeholder={'Search'}
          />
        </div>

        <section className={'search-container ' + (this.state.query.length > 0 ? '' : 'hidden')}>
          <h2 className="section-title">Search Results</h2>
          <ul className="package-list">
            <ResultList />
          </ul>
        </section>

        <section className={'browse-container ' + (this.state.query.length > 0 ? 'hidden' : '')}>
          <h2 className="section-title">Recently Added</h2>

          <ol className="package-list">
            {packages.map(({ node }, id) => (
              <li className="package" key={id}>
                {node.name} <small>{node.description}</small>
              </li>
            ))}
          </ol>
        </section>
      </Layout>
    );
  }

  search = (event) => {
    const query = event.target.value;

    if (query.length > 2) {
      const results = this.getSearchResults(query);
      this.setState({ results: results, query: query });
    } else {
      this.setState({ results: [], query: query });
    }
  };

  getSearchResults(query) {
    var index = window.__FLEXSEARCH__.en.index;
    var store = window.__FLEXSEARCH__.en.store;

    if (!query || !index) {
      return [];
    } else {
      var results = [];
      Object.keys(index).forEach((idx) => {
        results.push(...index[idx].values.search(query));
      });

      results = Array.from(new Set(results));
      var nodes = store.filter((node) => (results.includes(node.id) ? node : null)).map((node) => node.node);

      console.log(nodes.length);
      return nodes;
    }
  }
}

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
