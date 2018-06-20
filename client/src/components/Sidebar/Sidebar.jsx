import React from "react";
import PropTypes from "prop-types";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import Ratings from "../Ratings/Ratings";
import PaymentFilter from "../PaymentFilter/PaymentFilter";

const Sidebar = ({ categoryList, handleSearch, categoryClick }) => (
  <div className="sidebar">
    <div className="categories">
      <h3 className="side-label">Cuisine/Food Type</h3>
      <CategoryFilter categoryList={categoryList} categoryClick={categoryClick} />
    </div>
    <div>
      <h3 className="side-label"> Ratings </h3>
      <Ratings />
    </div>
    <div>
      <h3 className="side-label">Payment Options</h3>
      <PaymentFilter />
    </div>
  </div>
);

Sidebar.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSearch: PropTypes.func.isRequired,
  categoryClick: PropTypes.func.isRequired,
};

export default Sidebar;
