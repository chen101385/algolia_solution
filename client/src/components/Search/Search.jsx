import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  //'as-you-type' search functionality via onChange trigger for invoking handleSearch function
  handleChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.props.handleSearch(this.state.value);
    });
  }

  //prevent enter from submitting the form
  onKeyPress(e) {
    let key = e.which || e.keyCode;
    if (key === 13) e.preventDefault();
  }

  render() {
    let { value } = this.state;
    return (
      <form onKeyPress={e => this.onKeyPress(e)}>
        <input
          type="text"
          placeholder="Search for Restaurants by Name, Cuisine, Location"
          value={value}
          onChange={e => this.handleChange(e)}
        />
      </form>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
};
