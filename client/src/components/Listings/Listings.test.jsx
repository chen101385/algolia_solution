import React from "react";
import ReactDOM from "react-dom";
import Listings from "./Listings";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const items = [
    {
      objectID: "1"
    },
    {
      objectID: "2"
    }
  ];
  ReactDOM.render(<Listings items={items} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
