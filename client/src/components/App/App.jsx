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
      currentCategory: null,
      currentPayment: null,
      searchResults: [],
      count: 0,
      searchTime: null,
      categories: [],
      query: "",
      shiftPointer: 5,
      geoLocation: null
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.shiftResults = this.shiftResults.bind(this);
    this.categoryClick = this.categoryClick.bind(this);
    this.ratingFilter = this.ratingFilter.bind(this);
    this.paymentFilter = this.paymentFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }
  componentWillMount() {
    this.getGeoLocation();
    this.loadFacetInfo();
    this.handleSearch();
  }

  getGeoLocation() {
    const success = Position => {
      let { latitude, longitude } = Position.coords;
      this.setState({ geoLocation: { lat: latitude, lng: longitude } }, () => {
        console.log("geolocation:", this.state.geoLocation);
      });
    };

    const error = PositionError => {
      console.log("Geolocation Error Code:", PositionError.code);
      console.log("Geolocation Error Message:", PositionError.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

  handleSearch(queryString) {
    const helper = algoliasearchHelper(client, index, {
      hitsPerPage: 5000
    });
    helper.on("result", content => {

      this.setState({
        query: queryString,
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS,
        currentCategory: null,
        currentPayment: null,
      });
    });

    //aroundLatLngViaIP: true,
    //aroundLatLng: `${lat}, ${lng}`

    if (!this.state.geoLocation) {
      helper
        .setQueryParameter(`aroundLatLngViaIP`, true)
        .setQuery(queryString)
        .search();
    } else {
      const { lat, lng } = this.state.geoLocation;
      helper
        .setQueryParameter(`aroundLatLng`, `${lat}, ${lng}`)
        .setQuery(queryString)
        .search();
    }
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
      hitsPerPage: 5000,
      facets: ["food_type"],
    });

    helper.on("result", content => {
      // //attempt to sort content.hits;
      // content.hits.sort((a, b) => {
      //   return Number(b.stars_count) - Number(a.stars_count);
      // });

      this.setState({
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS,
        currentCategory: category,
        currentPayment: null,
      });
    });

    if (!this.state.geoLocation) {
      helper
        .setQueryParameter(`aroundLatLngViaIP`, true)
        .addFacetRefinement("food_type", category)
        .search();
    } else {
      const { lat, lng } = this.state.geoLocation;
      helper
        .setQueryParameter(`aroundLatLng`, `${lat}, ${lng}`)
        .addFacetRefinement("food_type", category)
        .search();
    }
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

      this.setState({
        searchResults: content.hits,
        currentResults: content.hits.slice(0, 5),
        count: content.nbHits,
        searchTime: content.processingTimeMS
      });
    });

    helper.setQueryParameter("hitsPerPage", 5000).search();
  }

  shiftResults() {
    const { shiftPointer, searchResults } = this.state;
    const newShiftPointer = shiftPointer + 5;
    this.setState({
      currentResults: this.state.searchResults.slice(0, newShiftPointer),
      shiftPointer: newShiftPointer
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
      count: filteredResults.length,
      currentPayment: type,
    });
  }

  resetFilter() {
    const { query, currentCategory, currentPayment } = this.state;
    //if query + any filters --> reset all filters, query only;
    if (query) this.handleSearch(query);
    //if current category + payment --> reset payment, category only;
    else if (currentCategory && currentPayment) this.categoryClick(currentCategory);
    //if only one of category, payment or ratings --> return to default list;
    else this.handleSearch();
 
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
