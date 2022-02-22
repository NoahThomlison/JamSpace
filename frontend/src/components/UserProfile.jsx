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

// Import Images
import header from '../images/amps_drums.jpg';

// Import MUI
import { Box } from '@mui/material/';
import { makeStyles, withThemeCreator } from '@mui/styles';

const useStyles = makeStyles({
  profileHeader: {
    marginLeft: '0',
    marginRight: '0',
    color: 'white',
    opacity: '0.9',
    backgroundImage: `url(${header})`,
    height: '28rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UserProfile = props => {
  const { currUser, setListings, listings } = props;

  const [cookies, setCookies, removeCookie] = useCookies(['id']);

  // State Initializers
  const initialUserState = {
    userId: cookies.id || '',
    first_name: currUser.first_name || '',
    last_name: currUser.last_name || '',
    email: currUser.email || '',
    password: currUser.password || '',
    address: currUser.address || {},
    host: currUser.host || null,
    listing_ids: currUser.listing_ids || [],
    booking_ids: currUser.booking_ids || [],
    image: currUser.image || '',
    about: currUser.about || '',
  };

  const styles = useStyles();
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    if (cookies.id) {
      userData(setUser, cookies.id);
    }
  }, [cookies.id]);

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
    console.log(`deleteBooking - updatedBookings:`);
    console.log(updatedBookings);
    let bookingIndex;
    updatedBookings.forEach((booking, index) => {
      console.log(`index booking: ${booking}`);
      if (booking.booking === bookingId) {
        bookingIndex = index;
      }
    });
    console.log(`deleteBooking - index: ${bookingIndex}`);
    updatedBookings.splice(bookingIndex, 1);

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
    console.log(`handleDeleteBooking: ${bookingId}`);
    deleteBooking(bookingId);
  };

  return (
    <div className='container mb-5 px-0' style={{ maxWidth: '100%' }}>
      <div className='text-center '>
        <Box className={styles.profileHeader}>
          <div
            style={{
              backgroundColor: 'black',
              display: 'block',
              maxWidth: '50%',
              borderRadius: '10px',
              border: '3px solid white',
            }}
          >
            <h1 style={{ fontSize: '400%', margin: '0.5rem 1rem' }}>
              {user.first_name} {user.last_name}
            </h1>
          </div>
          <div className='mt-4'>
            <img
              style={{
                maxWidth: '15rem',
                maxHeight: '10rem',
                borderRadius: '50%',
                border: '3px solid white',
              }}
              src={user.image}
              alt='profile'
            />
          </div>
          <div className='mt-4'>
            <h5>
              <em>{user.about}</em>
            </h5>
          </div>
        </Box>
        {user.host ? (
          <div className='mb-5 mt-4 mx-5'>
            <h1>My Listings:</h1>
            <div className='text-center mt-4 mx-5'>
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
        <div className='mb-5 mt-4 mx-5'>
          <h1>My Bookings:</h1>
          <div className='text-center mb-5 mt-4 mx-5'>
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
