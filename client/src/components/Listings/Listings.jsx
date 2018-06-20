import React from "react";
import PropTypes from "prop-types";
import ItemListEntry from "../ListingEntry/ListingEntry";

const Listings = ({ items, count, searchTime }) => {
  let milliseconds = searchTime;
  return (
    <div>
      <div className="listing-header">
        <span>{count} results found </span>
        <span> in {searchTime} seconds</span>
      </div>
      <div className="listings">
        <div className="listing-entries">
          {items.map(item => <ItemListEntry item={item} key={item.objectID} />)}
        </div>
      </div>
    </div>
  );
};

export default Listings;
