import React, { Component } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Card from '../components/card';
import { graphql } from 'gatsby';
import { ReactComponent as SearchIcon } from '../images/magnifier-icon.svg';

class IndexPage extends Component {
  state = {
    query: '',
    results: [],
  };

  componentDidMount() {
    this.showSearch();
  }

  render() {
    const { edges: packages } = this.props.data.allPackages;

    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((item, i) => <Card index={i} item={item} query={this.state.query} />);
      } else if (this.state.query.length > 2) {
        return "No results were found for '" + this.state.query + "' :(";
      } else {
        return 'Shrug';
      }
    };

    return (
      <Layout>
        <SEO title="Home" />

        <div className="header-body hidden">
          <label className="search-input-label">
            <input
              name="search"
              id="search"
              className="search-input"
              type="text"
              value={this.state.query}
              onChange={this.search}
              placeholder={'Search by name, keyword, author, etc.'}
            />
            <SearchIcon className="search-icon" alt="Magnifier Icon" />
          </label>
          <small className={'hint ' + (this.state.query.length > 0 ? '' : 'hidden')}>{this.searchHintText()}</small>
        </div>

        <div className="content-section">
          <section className={'search-container ' + (this.state.query.length > 2 ? '' : 'hidden')}>
            <div className="title-container">
              <span className="line" />
              <h2 className="section-title">Search Results</h2>
              <span className="line" />
            </div>
            <ul className="library-list">
              <ResultList />
            </ul>
          </section>

          <section className={'browse-container ' + (this.state.query.length > 2 ? 'hidden' : '')}>
            <div className="title-container">
              <span className="line" />
              <h2 className="section-title">Recently Added</h2>
              <span className="line" />
            </div>
            <ol className="library-list">{packages.map(({ node }, id) => <Card index={id} item={node} query="" />)}</ol>
          </section>
        </div>
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

  showSearch() {
    document.querySelector('.header-body').style.display = 'block';
  }

  searchHintText() {
    if (this.state.query.length < 3) {
      return 'Minimum 3 characters';
    }
  }
}

export const query = graphql`
  query PackagesQuery {
    allPackages: allPackagesYaml(sort: { fields: added, order: DESC }) {
      edges {
        node {
          author {
            avatar
            name
            website
          }
          added
          category
          description
          license
          name
          tags
          url
        }
      }
    }
  }
`;

export default IndexPage;
