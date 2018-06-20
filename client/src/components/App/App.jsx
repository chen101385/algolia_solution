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
      currentResults: [],
      searchResults: [],
      count: 0,
      searchTime: null,
      categories: [],
      query: '',
      shiftPointer: 5
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.shiftResults = this.shiftResults.bind(this);
    this.categoryClick = this.categoryClick.bind(this);
    this.ratingFilter = this.ratingFilter.bind(this);
    this.paymentFilter = this.paymentFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }
  componentWillMount() {
    this.loadFacetInfo();
  }

  handleSearch(queryString) {
    const helper = algoliasearchHelper(client, index, {
      hitsPerPage: 5000
    });

    console.log("handleSearch is running");

    helper.setQuery(queryString).search();

    helper.on("result", content => {
      content.hits.sort((a, b) => {
        return Number(b.stars_count) - Number(a.stars_count);
      });

      this.setState({
        query: queryString,
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS
      });
    });
  }

  loadFacetInfo() {
    const helper = algoliasearchHelper(client, index, {
      facets: ["food_type"],
      hitsPerPage: 100
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

  categoryClick(category) {
    const helper = algoliasearchHelper(client, index, {
      facets: ["food_type"],
      hitsPerPage: 5000
    });

    helper.on("result", content => {
      console.log("this is categoryClick content:", content);

      //attempt to sort content.hits;
      content.hits.sort((a, b) => {
        return Number(b.stars_count) - Number(a.stars_count);
      });

      this.setState({
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS
      });
    });
    helper.addFacetRefinement("food_type", category).search();
  }

  ratingQuery(value) {
    const helper = algoliasearchHelper(client, index, {
      hitsPerPage: 5000
    });

    helper.on("result", content => {
      //filter for value
      content.hits = content.hits.filter(hit => {
        return Number(hit.stars_count) >= value;
      });

      //sort by rating
      content.hits.sort((a, b) => {
        return Number(b.stars_count) - Number(a.stars_count);
      });

      this.setState({
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS
      });
    });
    helper.search();
  }

  shiftResults() {
    //shift pointer by 5 to current results;
    this.setState({
      currentResults: this.state.searchResults.slice(0, this.state.shiftPointer)
    });
    //increment shift pointer by 5;
    this.setState({
      shiftPointer: this.state.shiftPointer + 5
    });
  }

  //filter based on reviews;
  ratingFilter(value) {
    const { searchResults } = this.state;
    //if searchResults are empty
    if (!searchResults.length) {
      //search entire index;
      this.ratingQuery(value);
    } else {
      //filter current searchResults;
      const filteredResults = searchResults.filter(hit => {
        return Number(hit.stars_count) >= value;
      });
      this.setState({
        searchResults: filteredResults,
        currentResults: filteredResults.slice(0, 5),
        count: filteredResults.length
      });
    }
  }

  //payment filter;
  paymentFilter(type) {
    const { searchResults } = this.state;

    const filteredResults = searchResults.filter(hit => {
      return hit.payment_options.indexOf(type) !== -1;
    });

    console.log("this is filtered results", filteredResults);

    this.setState({
      searchResults: filteredResults,
      currentResults: filteredResults.slice(0, 5),
      count: filteredResults.length
    });
  }

  resetFilter() {
    const { searchResults, query } = this.state;

    this.loadFacetInfo();
    if (searchResults.length) this.handleSearch(query);
  }

  render() {
    const { currentResults, categories, count, searchTime } = this.state;
    const categoryList = categories.slice(0, 7);
    return (
      <div className="app">
        <div className="header">
          <div className="search">
            <Search handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className="container">
          <div className="sidebar">
            <Sidebar
              categoryList={categoryList}
              categoryClick={this.categoryClick}
              ratingFilter={this.ratingFilter}
              paymentFilter={this.paymentFilter}
              resetFilter={this.resetFilter}
            />
          </div>
          <div className="listings">
            <Listings
              items={currentResults}
              count={count}
              searchTime={searchTime}
              shiftResults={this.shiftResults}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
