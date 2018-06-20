import React, { Component } from "react";
import Search from "../Search/Search";
import Listings from "../Listings/Listings";
import Sidebar from "../Sidebar/Sidebar";

import "./App.css";

const { SEARCH_KEY } = require("../../../../API/API_KEY");
const algoliasearch = require("algoliasearch");
const algoliasearchHelper = require("algoliasearch-helper");
const applicationID = "TGMMPVICOC";
const index = "restaurants";
const client = algoliasearch(applicationID, SEARCH_KEY);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      facetTypes: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(queryString) {
    const helper = algoliasearchHelper(client, index);

    helper.setQuery(queryString).search();

    helper.on("result", content => {
      this.setState({ searchResults: content.hits });
    });
  }

  loadFacets() {
    const helper = algoliasearchHelper(client, index, {
      facets: ['food_type']
    });

    
    helper.on("result", content => {
      console.log('facet values', content);
      
      this.setState({ facetTypes: content.getFacetValues("food_type", { sortBy: ["count:asc"] })})
      console.log('facetTypes:', this.state.facetTypes);
    });
    helper.search();
  }

  componentDidMount() {
    this.loadFacets();
  }

  render() {
    const { searchResults } = this.state;
    return (
      <div className="app">
        <div>
          <Search handleSearch={this.handleSearch.bind(this)} />
        </div>
        <Sidebar />
        <div className="listings">
          <Listings items={searchResults} />
        </div>
      </div>
    );
  }
}

export default App;
