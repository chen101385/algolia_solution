import React from "react";
import PropTypes from "prop-types";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import Ratings from "../Ratings/Ratings";
import PaymentFilter from "../PaymentFilter/PaymentFilter";

const Sidebar = ({ categoryList, categoryClick, ratingFilter, paymentFilter, resetFilter }) => (
  <div className="sidebar">
    <div className="categories">
      <h3 className="side-label">Cuisine/Food Type</h3>
      <CategoryFilter categoryList={categoryList} categoryClick={categoryClick} resetFilter={resetFilter} />
    </div>
    <div className="ratings">
      <h3 className="side-label"> Ratings (min)</h3>
      <Ratings ratingFilter={ratingFilter} resetFilter={resetFilter} />
    </div>
    <div className="payment-options">
      <h3 className="side-label">Payment Options</h3>
      <PaymentFilter paymentFilter={paymentFilter} resetFilter={resetFilter} />
    </div>
  </div>
);

Sidebar.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryClick: PropTypes.func.isRequired,
  ratingFilter: PropTypes.func.isRequired,
  paymentFilter: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

export default Sidebar;
