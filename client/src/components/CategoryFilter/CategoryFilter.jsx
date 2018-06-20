import React from "react";
import PropTypes from "prop-types";
import Category from "../Category/Category";

const CategoryFilter = ({ categoryList, categoryClick, resetFilter }) => (
  <ul>
    {categoryList.map((category, index) => (
      <Category category={category} categoryClick={categoryClick} key={index} />
    ))}
    <br />
    <a
      onClick={e => {
        e.preventDefault();
        resetFilter();
      }}
      alt="reset"
      style={{ cursor: " pointer" }}
    >
      reset filter
    </a>
  </ul>
);

CategoryFilter.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryClick: PropTypes.func.isRequired
};

export default CategoryFilter;
