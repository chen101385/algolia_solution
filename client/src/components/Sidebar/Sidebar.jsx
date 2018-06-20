import React from 'react';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Ratings from '../Ratings/Ratings';

const Sidebar = props => (
  <div className="sidebar">
    <div className="cuisineList">
      <CategoryFilter categoryList={props.categoryList}/>
    </div>
    <div className="ratingList"><Ratings /></div>
    <div className="paymentOptions">paymentOptions</div>
  </div>
);

// Listings.propTypes = {
//     items: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default Sidebar;
