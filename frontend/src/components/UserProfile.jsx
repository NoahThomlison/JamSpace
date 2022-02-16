import React, { useState, useEffect } from 'react';

// Import Custom Components
import HorizontalListingCard from './HorizontalListingCard';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

// Import Users Database Calls
import UsersDataService from '../services/users';

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
  }, [user.listing_ids]);

  const deleteListing = async listingId => {
    await ListingsDataService.deleteListing(listingId).then(response => {
      const index = user.listing_ids.indexOf(listingId);
      console.log('index = ' + index);
      return Promise.resolve(
        setUser(prev => {
          console.log(`user before splice: ${prev.listing_ids}`);
          prev.listing_ids.splice(index, 1);
          console.log(`user after splice: ${prev.listing_ids}`);
          return {
            ...prev,
          };
        })
      )
        .then(() => {
          updateUser(user);
          console.log(user.listing_ids);
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  const updateUser = async userData => {
    await UsersDataService.updateUser(userData)
      .then(() => {
        console.log(`Edited User ID #${userData._id}`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const deleteListing = async listingId => {
  //   const index = user.listing_ids.indexOf(listingId);
  //   return Promise.resolve(
  //     setUser(prev => {
  //       prev.listing_ids.splice(index, 1);
  //       return {
  //         ...prev,
  //       };
  //     })
  //   )
  //     .then(async () => {
  //       await ListingsDataService.deleteListing(listingId);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const updateUser = async (userData, listingId) => {
  //   await UsersDataService.updateUser(userData)
  //     .then(() => {
  //       deleteListing(listingId);
  //       console.log(`Edited User ID #${userData._id}`);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const handleDeleteClick = id => {
    deleteListing(id);
    // updateUser(user);
    // updateUser(user, id);
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
        {user.host ? (
          <div className='mb-5 mt-4'>
            <h1>My Listings</h1>
            <div className='text-center'>
              {listings.length === 0 ? (
                <h4 className='text-center'>
                  You currently have no ads listed.
                </h4>
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
        ) : null}
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
