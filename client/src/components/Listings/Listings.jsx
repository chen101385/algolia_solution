import React from "react";
import PropTypes from "prop-types";
import ItemListEntry from "../ListingEntry/ListingEntry";
import ShowMore from "../ShowMore/ShowMore";

const Listings = ({ items, count, searchTime, shiftResults }) => {
  const milliseconds = (searchTime / 1000).toFixed(3);
  return (
    <div>
      <div className="listing-header">
        <span id="result-count">{count} results found </span>
        <span id="result-time"> in {milliseconds} seconds</span>
      </div>
      <div className="listings">
        <div className="listing-entries">
          {items.map(item => <ItemListEntry item={item} key={item.objectID} />)}
        </div>
        <ShowMore 
          count={count}
          shiftResults={shiftResults}
         />
      </div>
    </div>
  );
};

export default Listings;
