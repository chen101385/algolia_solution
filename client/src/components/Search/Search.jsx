import React, { Component } from "react";
import PropTypes from "prop-types";

const { SEARCH_KEY } = require("../../../../API/API_KEY");
const algoliasearch = require("algoliasearch");
const algoliasearchHelper = require("algoliasearch-helper");
const applicationID = "TGMMPVICOC";
const index = "restaurants";
const client = algoliasearch(applicationID, SEARCH_KEY);
const helper = algoliasearchHelper(client, index);

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.handleSearch(this.state.value);
  }

  render() {
    let { value } = this.state;
    return (
      <div className="Search">
      <form>
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={this.handleChange}
        />
      </form>
      </div>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
