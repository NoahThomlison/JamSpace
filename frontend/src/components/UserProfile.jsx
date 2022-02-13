import React, { useState, useEffect } from 'react';

// Import Custom Components
import HorizontalListingCard from './HorizontalListingCard';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

const UserProfile = props => {
  const { user, setUser } = props;
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const getListing = async id => {
    await ListingsDataService.get(id)
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

  useEffect(() => {
    user.listing_ids.map(listing_id => getListing(listing_id));
    console.log('getting');
  }, [user.listing_ids]);

  const deleteListing = async (listingId, index) => {
    await ListingsDataService.deleteListing(listingId).then(response => {
      setUser(prev => {
        prev.listing_ids.splice(index, 1);
        return {
          ...prev,
        };
      });
    });
  };

  const handleDeleteClick = (id, index) => {
    console.log(`Delete id #: ${id}`);
    deleteListing(id, index);
  };

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
              listings.map((listing, index) => (
                <HorizontalListingCard
                  key={listing._id}
                  index={index}
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
