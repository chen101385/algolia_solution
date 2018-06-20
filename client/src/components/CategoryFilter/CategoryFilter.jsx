import React from 'react';
import PropTypes from 'prop-types';
import Category from '../Category/Category';

const CategoryFilter = ({ categoryList }) => (
  <div className="categories">
    <ul>
      {categoryList.map((category, index) => <Category category={category} key={index} />)}
    </ul>
  </div>
);

CategoryFilter.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryFilter;
