import React from "react";
import PropTypes from "prop-types";
import ItemListEntry from "../ListingEntry/ListingEntry";
import ShowMore from "../ShowMore/ShowMore";

const Listings = ({ items, count, searchTime, shiftResults }) => {
  //convert seconds to milliseconds
  const milliseconds = (searchTime / 1000).toFixed(3);
  return (
    <div className="listing-container">
      <div className="listing-header">
        <span id="result-count">{count} results found </span>
        <span id="result-time"> in {milliseconds} seconds</span>
      </div>
      <div className="listings">
        <div className="listing-entries">
          {items.map(item => <ItemListEntry item={item} key={item.objectID} />)}
        </div>
        <div id="show-more">
          <ShowMore count={count} shiftResults={shiftResults} />
        </div>
      </div>
    </div>
  );
};

Listings.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.number
    ])
  ).isRequired,
  count: PropTypes.number.isRequired,
  searchTime: PropTypes.number.isRequired,
  shiftResults: PropTypes.func.isRequired
};

export default Listings;
