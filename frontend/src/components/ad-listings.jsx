import React from 'react';
import Filters from './Filters';
import Listing from './Listing';

const AdListings = props => {
  const { listings, setListings } = props;
  // user is also passed through but no needed yet so it was removed from the destructuring of props to eliminate the warning

  return (
    <div className='container'>
      <Filters setListings={setListings} />
      <div className='row'>
        {listings.length === 0 ? (
          <h4 className='text-center'>
            Sorry, there is nothing available to rent.
          </h4>
        ) : (
          listings.map(listing => (
            <Listing key={listing._id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdListings;
