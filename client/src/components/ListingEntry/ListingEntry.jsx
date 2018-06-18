import React from 'react';
import PropTypes from 'prop-types';

const ListingEntry = ({ item }) => (
  <div>
    <h5>{item.key}</h5>
  </div>
);

ListingEntry.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
  ])).isRequired,
};

export default ListingEntry;
