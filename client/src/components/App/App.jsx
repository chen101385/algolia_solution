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
      query: "",
      shiftPointer: 5
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.shiftResults = this.shiftResults.bind(this);
    this.categoryClick = this.categoryClick.bind(this);
  }
  componentWillMount() {
    this.loadFacetInfo();
    this.shiftResults();
  }

  componentDidMount() {
  }

  handleSearch(queryString) {
    const helper = algoliasearchHelper(client, index);

    console.log('handleSearch is running');

    helper.setQuery(queryString).search();

    helper.on("result", content => {
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

  categoryClick(category) {
    const helper = algoliasearchHelper(client, index, {
      facets: ["food_type"]
    });

    helper.on("result", content => {
      console.log('this is categoryClick content:', content)
      this.setState({
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS,
      })
    });

    helper.setQuery(category).search();

  }

  shiftResults() {
    //shift pointer by 5 to current results;
    console.log('this is searchResults', this.state.searchResults);
    this.setState({
      currentResults: this.state.searchResults.slice(0, this.state.shiftPointer),
    });
    //increment shift pointer by 5;
    this.setState({
      shiftPointer: this.state.shiftPointer + 5,
    })

    console.log('current results', this.state.currentResults)
  }

  // ratingClick() {}

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
              handleSearch={this.handleSearch}
              categoryClick={this.categoryClick}
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
