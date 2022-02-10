// Import React Components/Hooks
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DateRangePicker } from 'dates-picker';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

// Import Styles
import './IndividualAd.css';

// Import Material UI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const IndividualAd = props => {
  //const { user } = props;
  const id = useParams().id;

  // Initialize Listing State
  const initialListingState = {
    id: null,
    title: '',
    description: '',
    instrument_type: '',
    brand: '',
    condition: '',
    price: {},
    security_deposit: 0,
    images: [],
    host_id: '',
    host: {},
    address: {},
  };

  // Initialize Dates State
  const initialDateState = {
    minDate: new Date(),
    maxDate: new Date(),
    numOfDays: 0,
    rental: 0,
    deposit: 0,
    subtotal: 0,
    total: 0,
  };

  // State Variables
  const [listing, setListing] = useState(initialListingState);
  const [booking, setBooking] = useState(initialDateState);

  const getListing = id => {
    ListingsDataService.get(id)
      .then(response => {
        setListing(response.data.listing[0]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getListing(id);
  }, [id]);

  function callbackFunction(dates) {
    // Need to calculate the rate based on days rented.  eg 10 days is a week and 3 days
    const deposit = listing.security_deposit;
    let rentalRate = listing.price.daily;
    if (dates.numberOfDaysPicked > 30) {
      rentalRate = listing.price.monthly;
    } else if (dates.numberOfDaysPicked > 7) {
      rentalRate = listing.price.weekly;
    }
    const rental = dates.numberOfDaysPicked * rentalRate;
    const total = parseFloat(deposit) + parseFloat(rental);

    setBooking(prevState => ({
      ...prevState,
      minDate: dates.minDate,
      maxDate: dates.maxDate,
      numOfDays: dates.numberOfDaysPicked,
      rentalRate: rentalRate,
      rental: rental,
      deposit: deposit,
      total: total,
    }));
  }

  return (
    <div>
      {/* If there is a valid listing, show it, otherwise  */}
      {listing ? (
        <div className='m-5'>
          <div >
            <h3 className='mb-3'>{listing.title}</h3>
            <br />
            <img src={listing.images[0]} alt='Main' />
          </div>
          <div className='row mx-5'>
            <div className='left-side-ad col-7 mb-5'>
              <div className='mb-2'>
                <strong>Description: </strong>
              </div>
              <div className='mx-2 mb-2'>{listing.description}</div>
              <div>
                <p className='mb-1'>
                  <strong>Instrument Type: </strong>
                  {listing.instrument_type}
                </p>
                <p className='mb-1'>
                  <strong>Brand: </strong>
                  {listing.brand}
                </p>
                <p className='mb-1'>
                  <strong>Condition: </strong>
                  {listing.condition}
                </p>
              </div>
              <div className='price-section my-2'>
                <strong>Price: </strong>
                <div className='price-section-details mt-1 ms-3'>
                  <p className='mb-1'>
                    <strong>Daily:</strong> ${listing.price.daily}
                  </p>
                  <p className='mb-1'>
                    <strong>Weekly:</strong> ${listing.price.weekly}
                  </p>
                  <p className='mb-1'>
                    <strong>Monthly:</strong> ${listing.price.monthly}
                  </p>
                </div>
                <p>
                  <strong>Security Deposit Required: </strong>$
                  {listing.security_deposit}
                </p>
              </div>
              <strong>Location: </strong>
              {listing.address.city}, {listing.address.province}
            </div>
            <div className='right-side-ad'>
              <Box
                sx={{
                  boxShadow: 3,
                  width: 'auto',
                  height: 'auto',
                  bgcolor: theme =>
                    theme.palette.mode === 'dark' ? '#101010' : '#fff',
                  color: theme =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                  p: 1,
                  m: 1,
                  borderRadius: 2,
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                }}
              >
                <Typography
                  sx={{ fontSize: 20 }}
                  color='text.primary'
                  gutterBottom
                >
                  Rental Dates
                </Typography>
                <div>
                  <DateRangePicker
                    defaultColor='#222222'
                    format='MM-DD-YYYY'
                    callback={callbackFunction}
                  />
                </div>
                <div className='mb-3'>
                  <Link to={'/listings/book'} state={{ booking }}>
                    <button className='btn btn-lg btn-outline-dark btn-block'>
                      Reserve
                    </button>
                  </Link>
                </div>
                <Typography sx={{ mb: 1.5, mt: 3 }} color='text.secondary'>
                  Click to Book This Instrument
                </Typography>
                {booking.numOfDays > 0 ? (
                  <Typography variant='body2'>
                    <div className='row'>
                      <div className='col-lg-6 text-start ms-5'>
                        ${booking.rentalRate} x {booking.numOfDays} days
                      </div>
                      <div className='col-lg-4'>${booking.rental}</div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6 text-start ms-5'>
                        Security Deposit
                      </div>
                      <div
                        className='col-lg-4'
                        style={{ textDecoration: 'underline' }}
                      >
                        ${booking.deposit}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6 text-start ms-5'>Total</div>
                      <div className='col-lg-4'>${booking.total}</div>
                    </div>
                  </Typography>
                ) : null}
              </Box>
            </div>
          </div>
          <hr />
          <div className='bottom-ad text-center'>
            <strong>Hosted By: </strong>
            <br />
            <br />
            <img className='prof-img' src={listing.host.image} alt='Host' />
            <br />
            <br />
            <strong>{listing.host.name}</strong>
            <br />
            <em>{listing.host.about}</em>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <h2>No Listing Found.</h2>
        </div>
      )}
    </div>
  );
};

export default IndividualAd;
