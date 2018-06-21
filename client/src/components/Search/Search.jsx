import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value }, () => {this.props.handleSearch(this.state.value)});
  }

  clearInput() {
    this.setState({ value: "" });
  }

  render() {
    let { value } = this.state;
    return (
      <form>
        <input
          type="text"
          placeholder="Search for Restaurants by Name, Cuisine, Location"
          value={value}
          onChange={(e) => this.handleChange(e)}
        />
      </form>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
