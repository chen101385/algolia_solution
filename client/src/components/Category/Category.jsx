import React from "react";
import PropTypes from "prop-types";

const Category = ({ category }) => (
  <li>
    <a href={'#'}> {category.name} - ({category.count}) </a>
  </li>
);

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    isRefined: PropTypes.bool,
    isExcluded: PropTypes.bool
  })
};

export default Category;
