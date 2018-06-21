import React from "react";

const ShowMore = ({ count, shiftResults }) => {
  if (count)
    return (
      <button id="show-more" onClick={() => shiftResults()}>
        Show More
      </button>
    );
  return <div />;
};

export default ShowMore;
