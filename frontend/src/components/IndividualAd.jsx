// Import React Components/Hooks
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DateRangePicker } from 'dates-picker';
import Reserve from './Reserve';
import IndividualAdDescription from './IndividualAdDescription';

import Map from './Map';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

// Import Styles
import './IndividualAd.css';

// Import Material UI
import { Container, Typography, Select, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

//Drag and Drop
import { useDropzone } from 'react-dropzone';
import { ImageListItem, TextField, Paper } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import drums from '../images/Drums.jpg';
import guitar2 from '../images/Guitars2.jpg';
import guitar3 from '../images/Guitars3.jpg';
import guitar4 from '../images/Guitars4.jpg';
import guitar5 from '../images/Guitars5.jpg';

const useStyles = makeStyles({
  background: {
    marginTop: 0,
    height: 'auto',
    backgroundImage: `url(${guitar2})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const IndividualAd = props => {
  const id = useParams().id;
  const maxLength = 500;

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
  const [loading, setLoading] = useState(true);

  const styles = useStyles();
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
    setLoading(false);
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
    <Box className={styles.background}>
      <Container
        sx={{
          display: 'flex',
          opacity: '97%',
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      >
        <Paper sx={{ width: '100%', display: 'flex', padding: '20px' }}>
          {/* If there is a valid listing, show it, otherwise  */}
          {listing ? (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <Typography variant='h4' sx={{ textAlign: 'center' }}>
                {listing.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {/* Image Container */}
                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
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
                </Paper>

                {/* Description and Reservation Container */}
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    zIndex: "10"
                  }}
                >
                  <IndividualAdDescription
                    listing={listing}
                  ></IndividualAdDescription>
                  <Reserve
                  sx={{zIndex: "10"}}
                    listing={listing}
                    booking={booking}
                    callbackFunction={callbackFunction}
                  ></Reserve>
                </Paper>
              </Box>

              {/* Map */}
              <Paper>
                {!loading ? (
                  <Map sx={{ width: '100%' }} listings={[listing]} />
                ) : (
                'loading'
                )}
              </Paper>
              {/* Hosted By */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 'auto',
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
        </Paper>
      </Container>
    </Box>
  );
};

export default IndividualAd;
