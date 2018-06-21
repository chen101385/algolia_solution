import React from "react";
import PropTypes from "prop-types";
import starEmpty from "./RatingStars/star-empty.png";
import starHalf from "./RatingStars/star-half.png";
import starFull from "./RatingStars/stars-plain.png";

const ListingEntry = ({ item }) => {
  
  const stars = [];

  const starRating = rating => {
    //3.3-3.7 = 3 & half;
    let ratingCount = rating;
    let count = 5;

    while (count) {
      if (ratingCount > 0.7) {
        stars.push(
          <img
            className="full-star"
            key={count}
            src={starFull}
            alt="full-star"
            width="20px"
          />
        );
      }

      if (ratingCount >= 0.3 && ratingCount <= 0.7) {
        stars.push(
          <img
            className="half-star"
            key={count}
            src={starHalf}
            alt="half-star"
            width="20px"
          />
        );
      }

      if (ratingCount < 0.3) {
        stars.push(
          <img
            className="empty-star"
            key={count}
            src={starEmpty}
            alt="empty-star"
            width="20px"
          />
        );
      }
      ratingCount--;
      count--;
    }
  };

  starRating(item.stars_count);

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
        <p id="listing-name">{item.name}</p>
        <p>
          <span className="star-count">{item.stars_count} </span>
          <span className="stars">{stars}</span>
          <span className="review-count"> ({item.reviews_count} reviews)</span>
        </p>
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
