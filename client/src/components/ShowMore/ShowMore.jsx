import React from "react";

const ShowMore = ({ count, shiftResults }) => {
  if (count)
    return (
      <button onClick={() => shiftResults()}>
        Show More
      </button>
    );
  return <div />;
};

export default ShowMore;
