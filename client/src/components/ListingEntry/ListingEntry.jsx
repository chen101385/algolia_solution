import React from "react";
import PropTypes from "prop-types";

const ListingEntry = ({ item }) => (
  <div className="listing">
      <img className="image" src={item.image_url} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <h5>{item.stars_count} - ({item.reviews_count} - reviews)</h5>
      </div>

  </div>
);

ListingEntry.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.number,
    ])
  ).isRequired,
};

export default ListingEntry;
