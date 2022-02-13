import React, { useState, useEffect } from 'react';

// Import Custom Components
import HorizontalListingCard from './HorizontalListingCard';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

const UserProfile = props => {
  const { user } = props;
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const getListing = id => {
    ListingsDataService.get(id)
      .then(response => {
        if (!listings.find(({ _id }) => _id === id)) {
          setListings(prev => [...prev, response.data.listing[0]]);
          setBookings(prev => [...prev, response.data.listing[0]]);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findUsersAds = () => {
    user.listing_ids.map(listing_id => getListing(listing_id));
  };

  useEffect(() => {
    findUsersAds();
  }, []);

  const handleDeleteClick = () => {};

  return (
    <div className='container'>
      <div className='text-center'>
        <h1>
          {user.first_name} {user.last_name}
        </h1>
        <div>
          <img
            style={{
              maxWidth: '15rem',
              maxHeight: 'auto',
              borderRadius: '50%',
            }}
            src={user.image}
            alt='profile'
          />
        </div>
        <div>
          <em>{user.about}</em>
        </div>
        <div className='mb-5 mt-4'>
          <h1>My Listings</h1>
          <div className='text-center'>
            {listings.length === 0 ? (
              <h4 className='text-center'>You currently have no ads listed.</h4>
            ) : (
              listings.map(listing => (
                <HorizontalListingCard
                  key={listing._id}
                  handleDeleteClick={handleDeleteClick}
                  listing={listing}
                />
              ))
            )}
          </div>
        </div>
        <div>
          <h1>My Bookings</h1>
          <div className='text-center'>
            {bookings.length === 0 ? (
              <h4 className='text-center'>
                You currently have no instruments booked.
              </h4>
            ) : (
              bookings.map(listing => (
                <HorizontalListingCard key={listing._id} listing={listing} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
