import React, { useEffect } from 'react';
import listingsData from '../helpers/listingsData';
import Filters from './Filters';
import ListingCard from './ListingCard';

const AdListings = props => {
  const { listings, setListings } = props;
  // user is also passed through but no needed yet so it was removed from the destructuring of props to eliminate the warning

  useEffect(() => {
    listingsData(setListings);
  }, []);

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
            <ListingCard key={listing._id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdListings;
