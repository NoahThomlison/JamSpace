// Import React Components/Hooks
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DateRangePicker } from 'dates-picker';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

// Import Styles
import './IndividualAd.css';

// Import Material UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import {
  Container,
  Typography,
  MenuItem,
  Autocomplete,
  FormHelperText,
  Select,
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//Drag and Drop
import { useDropzone } from 'react-dropzone';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
  const [index, setIndex] = useState(0);

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

  const previous = () => {
    if (index - 1 < 0) {
      setIndex(listing.images.length - 1);
    } else setIndex(index - 1);
  };

  const next = () => {
    if (index + 1 > listing.images.length - 1) {
      setIndex(0);
    } else setIndex(index + 1);
  };

  return (
    <Container sx={{ display: 'flex' }}>
      {/* If there is a valid listing, show it, otherwise  */}
      {listing ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className='mb-3'>{listing.title}</h3>
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={() => {
                  previous();
                }}
              >
                <ArrowBackIosIcon color='primary' />
              </IconButton>
              <img src={listing.images[index]} alt='Main' />
              <IconButton
                onClick={() => {
                  next();
                }}
              >
                <ArrowForwardIosIcon color='primary' />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            {/* Description Stuff */}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '75%' }}
            >
              <strong>Description: </strong>
              {listing.description}
              <strong>Instrument Type: </strong>
              {listing.instrument_type}
              <strong>Brand: </strong>
              {listing.brand}
              <strong>Condition: </strong>
              {listing.condition}
              <strong>Price: </strong>
              <strong>Daily:</strong> ${listing.price.daily}
              <strong>Weekly:</strong> ${listing.price.weekly}
              <strong>Security Deposit Required: </strong>$
              {listing.security_deposit}
              <strong>Location: </strong>
              {listing.address.city}, {listing.address.province}
            </Box>
            {/* Dates Stuff */}
            <Box
              sx={{
                boxShadow: 3,
                width: '40%',
                height: '30%',
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
                  <div className='col-lg-6 text-start ms-5'>Total</div>
                  <div className='col-lg-4'>${booking.total}</div>
                </Typography>
              ) : null}
            </Box>
          </Box>
          {/* Hosted By Stuff */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <strong>Hosted By: </strong>
            <img className='prof-img' src={listing.host.image} alt='Host' />
            <strong>{listing.host.name}</strong>
            <em>{listing.host.about}</em>
          </Box>
        </Box>
      ) : (
        <div>
          <br />
          <h2>No Listing Found.</h2>
        </div>
      )}
    </Container>
  );
};

export default IndividualAd;
