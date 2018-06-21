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
      currentCategory: "",
      query: "",
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

  async handleSearch(queryString) {
    const helper = algoliasearchHelper(client, index);

    console.log("handleSearch is running");

    helper.on("result", content => {
      content.hits.sort((a, b) => {
        return Number(b.stars_count) - Number(a.stars_count);
      });

    this.setState({
        query: queryString,
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS,
        currentCategory: '',
      });
    });
    await helper
      .setQueryParameter("hitsPerPage", 5000)
      .setQuery(queryString)
      .search();
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
    helper.setQueryParameter("hitsPerPage", 5000).search();
  }

  categoryClick(category) {
    const helper = algoliasearchHelper(client, index, {
      facets: ["food_type"]
    });

    helper.on("result", content => {
      //attempt to sort content.hits;
      content.hits.sort((a, b) => {
        return Number(b.stars_count) - Number(a.stars_count);
      });

      this.setState({
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS,
        currentCategory: category
      });
    });
    helper
      .setQueryParameter("hitsPerPage", 5000)
      .addFacetRefinement("food_type", category)
      .search();
  }

  ratingQuery(value) {
    const helper = algoliasearchHelper(client, index);

    helper.on("result", content => {
      //filter for value
      content.hits = content.hits.filter(hit => {
        return Number(hit.stars_count) >= value;
      });

      //sort by rating
      content.hits.sort((a, b) => {
        return Number(b.stars_count) - Number(a.stars_count);
      });

      console.log("this is content.hits", content.hits);

      this.setState({
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS
      });
    });

    console.log("this state searchResults", this.state.searchResults);
    helper.setQueryParameter("hitsPerPage", 5000).search();
  }

  shiftResults() {
    const {shiftPointer, searchResults} = this.state;
    const newShiftPointer = shiftPointer + 5;
    this.setState({
      currentResults: this.state.searchResults.slice(0, newShiftPointer),
      shiftPointer: newShiftPointer,
    });
  }

  //filter based on reviews;
  ratingFilter(value) {
    const { searchResults } = this.state;
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
  // }

  //payment filter;
  paymentFilter(type) {
    const { searchResults } = this.state;

    const filteredResults = searchResults.filter(hit => {
      return hit.payment_options.indexOf(type) !== -1;
    });

    this.setState({
      searchResults: filteredResults,
      currentResults: filteredResults.slice(0, 5),
      count: filteredResults.length
    });
  }

  resetFilter() {
    const { query, currentCategory } = this.state;
    if (query) this.handleSearch(query);
    if (currentCategory) this.categoryClick(currentCategory);
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
