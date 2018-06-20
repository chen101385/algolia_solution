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
      categories: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(queryString) {
    const helper = algoliasearchHelper(client, index);

    helper.setQuery(queryString).search();

    helper.on("result", content => {
      this.setState({ searchResults: content.hits });
      console.log('this is content.hits[0]', content.hits[0])
    });
  }

  loadFacetInfo() {
    const helper = algoliasearchHelper(client, index, {
      facets: ['food_type']
    });

    helper.on("result", content => {   
      this.setState({ categories: content.getFacetValues("food_type", { sortBy: ["count:desc"] })})
    });
    helper.search();
  }

  categoryClick() {

  }

  ratingClick() {
    
  }

  componentDidMount() {
    this.loadFacetInfo();
  }

  render() {
    const { searchResults, categories } = this.state;
    const categoryList = categories.slice(0, 7);
    return (
      <div className="app">
        <div>
          <Search handleSearch={this.handleSearch} />
        </div>
        <Sidebar categoryList={categoryList} />
        <div className="listings">
          <Listings items={searchResults} />
        </div>
      </div>
    );
  }
}

export default App;
