import React, { Component } from 'react';
import { Link } from 'gatsby';

class Search extends Component {
  state = {
    query: '',
    results: []
  };

  render() {
    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((item, i) => (
          <li className="package" key={i}>
            {item.name} <small>{item.description}</small>
          </li>
        ));
      } else if (this.state.query.length >= 2) {
        return 'No results for ' + this.state.query;
      } else {
        return 'Please insert at least 2 characters';
      }
    };

    return (
      <div>
        <input className="search-input" type="text" onChange={this.search} placeholder={'Search'} />
        <span>Results for '{this.state.query}'</span>
        <ul className="package-list">
          <ResultList />
        </ul>
      </div>
    );
  }

  getSearchResults(query) {
    var index = window.__FLEXSEARCH__.en.index;
    var store = window.__FLEXSEARCH__.en.store;

    if (!query || !index) {
      return [];
    } else {
      var results = [];
      // search the indexed fields
      Object.keys(index).forEach((idx) => {
        results.push(...index[idx].values.search(query)); // more search options at https://github.com/nextapps-de/flexsearch#index.search
      });

      // find the unique ids of the nodes
      results = Array.from(new Set(results));

      // return the corresponding nodes in the store
      var nodes = store.filter((node) => (results.includes(node.id) ? node : null)).map((node) => node.node);

      return nodes;
    }
  }

  search = (event) => {
    const query = event.target.value;
    if (this.state.query.length > 1) {
      const results = this.getSearchResults(query);
      this.setState({ results: results, query: query });
    } else {
      this.setState({ results: [], query: query });
    }
  };
}

export default Search;
