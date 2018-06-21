import React from "react";
import ReactDOM from "react-dom";
import ListingEntry from "./ListingEntry";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const item = {
    objectID: "99943",
    food_type: "American",
    neighborhood: "Downtown/Gaslamp",
    name: "The Edgewater Grill",
    stars_count: "3.9",
    reviews_count: "186",
    price_range: "$30 and under",
    image_url: "https://www.opentable.com/img/restimages/99943.jpg",
  };
  ReactDOM.render(<ListingEntry item={item} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
