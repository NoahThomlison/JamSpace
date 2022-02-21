import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, Paper, Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Import Users Database Calls
import UsersDataService from '../services/users';

const FinishingBooking = props => {
  const { user, setUser } = props;
  const location = useLocation();
  const { booking, listing } = location.state;
  const [loading, setLoading] = useState(true);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const newBooking = {
    cost: `$${booking.rental}`,
    deposit: `$${booking.deposit}`,
    total: `$${booking.total}`,
    days: booking.numOfDays,
    first_day: booking.minDate.toLocaleDateString('en-US', options),
    last_day: booking.maxDate.toLocaleDateString('en-US', options),
    host_name: listing.host.name,
    listing_desc: listing.description,
    listing_id: listing._id,
    listing_image: listing.images[0],
    listing_title: listing.title,
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const finalizeBooking = async () => {
    console.log(newBooking);
    await UsersDataService.updateUserBookings(user, newBooking)
      .then(() => {
        console.log(`Added new booking.`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Paper>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress></CircularProgress>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckCircleOutlineIcon
              color='success'
              sx={{ fontSize: '100px' }}
            ></CheckCircleOutlineIcon>
            <Typography variant='h5'>Order Placed!</Typography>
            <Typography>Thank you for jamming with us!</Typography>
            <Link
              to={'/'}
              onClick={finalizeBooking}
              className='btn btn-outline-dark col-lg-5 mt-4 mb-2'
            >
              Complete
            </Link>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default FinishingBooking;
