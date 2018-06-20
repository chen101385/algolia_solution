import React from "react";
import PropTypes from "prop-types";

const Category = ({ category, categoryClick }) => (
  <li>
    <a onClick={() => categoryClick(category.name)} style={{cursor: 'pointer'}}> {category.name} - ({category.count}) </a>
  </li>
);

Category.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  categoryClick: PropTypes.func.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    isRefined: PropTypes.bool,
    isExcluded: PropTypes.bool
  })
};

export default Category;
