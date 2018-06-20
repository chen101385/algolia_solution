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
      count: null,
      searchTime: null,
      categories: []
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(queryString) {
    const helper = algoliasearchHelper(client, index);

    helper.setQuery(queryString).search();

    helper.on("result", content => {
      console.log(content);
      this.setState({
        searchResults: content.hits,
        count: content.nbHits,
        searchTime: content.processingTimeMS
      });
    });
  }

  loadFacetInfo() {
    const helper = algoliasearchHelper(client, index, {
      facets: ["food_type"]
    });

    helper.on("result", content => {
      this.setState({
        categories: content.getFacetValues("food_type", {
          sortBy: ["count:desc"]
        })
      });
    });
    helper.search();
  }

  // categoryClick() {}

  // ratingClick() {}

  componentWillMount() {
    this.loadFacetInfo();
  }

  render() {
    const { searchResults, categories, count, searchTime } = this.state;
    const categoryList = categories.slice(0, 7);
    //if any search results present
    if (searchResults.length) {
      return (
        <div className="app">
          <div className="header">
            <div className="search">
              <Search handleSearch={this.handleSearch} />
            </div>
          </div>
          <div className="container">
            <div className="sidebar">
              <Sidebar categoryList={categoryList} />
            </div>
            <div className="listings">
              <Listings
                items={searchResults}
                count={count}
                searchTime={searchTime}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="app">
        <div className="header">
          <div className="search">
            <Search handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className="container">
          <div className="sidebar">
            <Sidebar categoryList={categoryList} />
          </div>
          <div className="listings">
            <p id="empty">No Search Results</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
