import React from "react";
import PropTypes from "prop-types";

const ShowMore = ({ count, shiftResults }) => {
  if (count) return <button onClick={() => shiftResults()}>Show More</button>;
  return <div />;
};

ShowMore.propTypes = {
  count: PropTypes.number.isRequired,
  shiftResults: PropTypes.func.isRequired
};

export default ShowMore;
