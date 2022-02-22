// Import React Components/Hooks
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DateRangePicker } from 'dates-picker';

import Map from './Map';

// Import Listings Database Calls
import ListingsDataService from '../services/listings';

// Import Styles
import './IndividualAd.css';

// Import Material UI
import { Container, Typography, Select, Box } from '@mui/material';

//Drag and Drop
import { useDropzone } from 'react-dropzone';
import { ImageListItem, TextField, Paper } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Reserve = props => {
  const { booking, listing, callbackFunction } = props;

  return (
    <Box
      sx={{
        zIndex: '2',
        height: 'auto',
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
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
      <Typography sx={{ fontSize: 20 }} color='text.primary' gutterBottom>
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
        <Link to={'/listings/book'} state={{ booking, listing }}>
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
            <div className='col-lg-6 text-start ms-5'>Security Deposit</div>
            <div className='col-lg-4'>${booking.deposit}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-lg-6 text-start ms-5'>Total</div>
            <div className='col-lg-4'>${booking.total}</div>
          </div>
        </Typography>
      ) : null}
    </Box>
  );
};

export default Reserve;
