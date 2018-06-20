import React from "react";
import star0 from "./Stars/0.png";
import star1 from "./Stars/1.png";
import star2 from "./Stars/2.png";
import star3 from "./Stars/3.png";
import star4 from "./Stars/4.png";
import star5 from "./Stars/5.png";

const Ratings = props => (
  <div className="ratings">
    <img src={star0} alt="0 stars" />
    <img src={star1} alt="1 stars" />
    <img src={star2} alt="2 stars" />
    <img src={star3} alt="3 stars" />
    <img src={star4} alt="4 stars" />
    <img src={star5} alt="5 stars" />
  </div>
);

export default Ratings;
