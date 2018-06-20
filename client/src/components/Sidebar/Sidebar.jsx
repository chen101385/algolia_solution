import React from "react";

const Sidebar = props => (
  <div className="sidebar">
    <div className="cuisineList">categoryList</div>
    <div className="ratingList">ratingList</div>
    <div className="paymentOptions">paymentOptions</div>
  </div>
);

// Listings.propTypes = {
//     items: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default Sidebar;
