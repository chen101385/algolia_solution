import React from 'react';
import PropTypes from 'prop-types';

const ListingEntry = ({ item }) => (
  <div>
    <h5>{item.name}</h5>
  </div>
);

ListingEntry.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.object, PropTypes.array, PropTypes.number
  ])).isRequired,
};

export default ListingEntry;
