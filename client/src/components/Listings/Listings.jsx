import React from "react";
import PropTypes from "prop-types";
import ItemListEntry from "../ListingEntry/ListingEntry";

const Listings = ({ items, count, searchTime }) => (
  <div className="listings">
    <div className="listing-header">{count} - {searchTime}</div>
    <div className="listing-entries">
      {items.map(item => <ItemListEntry item={item} key={item.objectID} />)}
    </div>
  </div>
);

export default Listings;
