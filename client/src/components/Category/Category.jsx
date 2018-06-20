import React from "react";
import PropTypes from "prop-types";

const Category = ({ category }) => (
  <li>
    {category.name} - ({category.count})
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
