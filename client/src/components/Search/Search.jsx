import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    let { value } = this.state;
    return (
      <form className="Search" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Go"
        />
      </form>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

