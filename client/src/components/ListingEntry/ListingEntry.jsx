import React from "react";
import PropTypes from "prop-types";
import starEmpty from "./RatingStars/star-empty.png";
import starHalf from "./RatingStars/star-half.png";
import starFull from "./RatingStars/stars-plain.png";

const ListingEntry = ({ item }) => {
  return (
    <div className="listing">
      <div className="listing-image">
        <img
          className="image"
          width="120px"
          src={item.image_url}
          alt={item.name}
        />
      </div>
      <div className="listing-info">
        <h4>{item.name}</h4>
        <h5>
          {item.stars_count} - ({item.reviews_count} reviews)
        </h5>
        <span>
          {item.food_type} | {item.neighborhood} | {item.price_range}
        </span>
      </div>
    </div>
  );
};

ListingEntry.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.number
    ])
  ).isRequired
};

export default ListingEntry;
