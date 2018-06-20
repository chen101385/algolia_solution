import React from 'react';
import PropTypes from 'prop-types';
import ItemListEntry from '../ListingEntry/ListingEntry';

const Listings = ({ items }) => (
  <div className="listings">
    {
      items.map(item => <ItemListEntry item={item} key={item.objectID} />)
    }
  </div>
);

Listings.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Listings;
