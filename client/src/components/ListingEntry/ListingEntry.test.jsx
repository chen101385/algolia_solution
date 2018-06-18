import React from 'react';
import ReactDOM from 'react-dom';
import ListingEntry from './ListingEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const item = {
    key: 'FILL_ME_IN',
  };
  ReactDOM.render(<ListingEntry item={item} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
