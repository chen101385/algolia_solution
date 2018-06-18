import React from 'react';
import PropTypes from 'prop-types';
import ItemListEntry from '../ListingEntry/ListingEntry';

const Listings = ({ items }) => (
  <div>
    {
      items.map(item => <ItemListEntry item={item} key={item.id} />)
    }
  </div>
);

Listings.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Listings;