import React from "react";
import star0 from "./Stars/0.png";
import star1 from "./Stars/1.png";
import star2 from "./Stars/2.png";
import star3 from "./Stars/3.png";
import star4 from "./Stars/4.png";
import star5 from "./Stars/5.png";

const Ratings = ({ ratingFilter, resetFilter }) => (
    <ul>
      <li>
        <img
          src={star0}
          onClick={() => ratingFilter(0)}
          alt="0 stars"
          style={{ cursor: "pointer" }}
        />
      </li>
      <li>
        <img
          src={star1}
          onClick={() => ratingFilter(1)}
          alt="1 stars"
          style={{ cursor: "pointer" }}
        />
      </li>
      <li>
        <img
          src={star2}
          onClick={() => ratingFilter(2)}
          alt="2 stars"
          style={{ cursor: "pointer" }}
        />
      </li>
      <li>
        <img
          src={star3}
          onClick={() => ratingFilter(3)}
          alt="3 stars"
          style={{ cursor: "pointer" }}
        />
      </li>
      <li>
        <img
          src={star4}
          onClick={() => ratingFilter(4)}
          alt="4 stars"
          style={{ cursor: "pointer" }}
        />
      </li>
      <li>
        <img
          src={star5}
          onClick={() => ratingFilter(5)}
          alt="5 stars"
          style={{ cursor: "pointer" }}
        />
      </li>
      <li>
        <br />
        <a
          onClick={e => {
            e.preventDefault();
            resetFilter();
          }}
          alt="reset"
          style={{ cursor: "pointer" }}
        >
          <i>reset filters</i>
        </a>
      </li>
    </ul>
);

export default Ratings;
