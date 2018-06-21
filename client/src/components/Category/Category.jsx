import React, { Component } from "react";
import PropTypes from "prop-types";

//category, categoryClick

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  onMouseEnter() {
    this.setState(prevState => ({
      hover: !prevState.hover
    }));
  }

  onMouseLeave() {
    this.setState(prevState => ({
      hover: !prevState.hover
    }));
  }

  render() {
    const { categoryClick, category } = this.props;
    const { hover } = this.state;
    const hoverClass = hover ? "hover-category category" : "category";

    return (
      <li
        className={hoverClass}
        onClick={() => categoryClick(category.name)}
        style={{ cursor: "pointer" }}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}
      >
          <span>{category.name}</span>
          <span className="category-count">{category.count}</span>
      </li>
    );
  }
}

Category.propTypes = {
  categoryClick: PropTypes.func.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    isRefined: PropTypes.bool,
    isExcluded: PropTypes.bool
  })
};

export default Category;
