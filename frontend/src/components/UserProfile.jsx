import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

// Import Custom Components
import HorizontalListingCard from './HorizontalListingCard';
import HorizontalBookingCard from './HorizontalBookingCard';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

// Import Users Database Calls
import UsersDataService from '../services/users';

//Import Users Database Call Helper Function
import { userData } from '../helpers/usersData';

// Import ListingsData Request to Get Listings
import listingsData from '../helpers/listingsData';

const UserProfile = props => {
  const [cookies, setCookies, removeCookie] = useCookies(['id']);

  // State Initializers
  const initialUserState = {
    userId: cookies.id || '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: {},
    host: null,
    listing_ids: [],
  };

  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    if (cookies.id) {
      userData(setUser, cookies.id);
    }
  }, [cookies.id]);

  const { setListings, listings } = props;
  let listingIds = user.listing_ids;
  // const [listingIds, setListingIds] = useState(user.listing_ids);
  //const [bookingIds, setBookingIds] = useState(user.booking_ids);
  const [usersListings, setUsersListings] = useState([]);
  const bookings = user.booking_ids;

  useEffect(() => {
    listingsData(setListings);
  }, []);

  useEffect(() => {
    if (usersListings.length === 0) {
      setUsersListings([]);
    }
    const tempListings = [];

    if (listings[0]) {
      listingIds.forEach(listingId => {
        const index = listings.findIndex(listing => {
          return listing._id === listingId;
        });
        tempListings.push(listings[index]);
      });
      setUsersListings(tempListings);
    }
  }, [listingIds, listings]);

  const updateUser = async (userData, updatedListings, type) => {
    await UsersDataService.updateUser(userData, updatedListings, type)
      .then(() => {
        console.log(`Edited User ID #${userData._id}`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteListing = async listingId => {
    // const index = user.listing_ids.indexOf(listingId);
    // const updatedListings = user.listing_ids.filter(listing => {
    //   return listing !== listingId;
    // });
    listingIds = listingIds.filter(listing => {
      return listing !== listingId;
    });
    await Promise.resolve(
      // setUser(prev => ({ ...prev, listing_ids: updatedListings }))
      setUser(prev => ({ ...prev, listing_ids: listingIds }))
    );
    await ListingsDataService.deleteListing(listingId).then(response => {
      return Promise.resolve(
        // updateUser(user, updatedListings, 'listings')
        updateUser(user, listingIds, 'listings')
      ).catch(e => {
        console.log(e);
      });
    });
  };

  const handleDeleteClick = id => {
    deleteListing(id);
  };

  const deleteBooking = async bookingId => {
    const updatedBookings = [...user.booking_ids];
    const index = updatedBookings.indexOf(function (booking) {
      return booking.booking === bookingId;
    });
    updatedBookings.splice(index, 1);

    await Promise.resolve(
      setUser(prev => ({ ...prev, booking_ids: updatedBookings }))
    );
    await UsersDataService.removeUserBooking(user, updatedBookings)
      .then(() => {
        console.log(`Deleted a booking.`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDeleteBooking = bookingId => {
    deleteBooking(bookingId);
  };

  return (
    <div className='container'>
      <div className='text-center'>
        {console.log(user)}
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
            <div className='text-center mt-4'>
              {usersListings.length === 0 ? (
                <h4 className='text-center'>
                  You currently have no ads listed.
                </h4>
              ) : (
                usersListings.map(listing => (
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
          <div className='text-center mb-5 mt-4'>
            {bookings && bookings.length === 0 ? (
              <h4 className='text-center'>
                You currently have no instruments booked.
              </h4>
            ) : user.email !== '' ? (
              bookings.map(booking => (
                <HorizontalBookingCard
                  key={booking.booking}
                  booking={booking}
                  handleDeleteBooking={handleDeleteBooking}
                />
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
