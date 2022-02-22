import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Container } from '@mui/material/';
import { useNavigate } from 'react-router-dom';

const ListingCard = props => {
  const { listing } = props;
  const navigate = useNavigate();

  const address = `${listing.address.city}, ${listing.address.province}, ${listing.address.postal_code}`;
  const descLength = listing.description.length;
  const maxLength = 250;

  const navigateToAd = listing => {
    navigate('/listings/' + listing._id);
  };

  return (
    <Paper className='card'>
      <div className='card-body ' onClick={() => navigateToAd(listing)}>
        <h5 className='card-title text-center'>{listing.title}</h5>
        <div
          className='my-4'
          style={{
            maxHeight: '30rem',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={listing.images[0]}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
            className='rounded'
            alt='Main'
          />
        </div>
        <p className='card-text'>
          {descLength > maxLength
            ? listing.description.substring(0, 200) + '  . . .'
            : listing.description}
          <br />
          <br />
          <strong>Price: </strong>D: <em>${listing.price.daily}</em>, W:{' '}
          <em>${listing.price.weekly}</em>, M: <em>${listing.price.monthly}</em>
          <br />
          <strong>Instrument Type: </strong>
          {listing.instrument_type}
          <br />
          <strong>Brand: </strong>
          {listing.brand}
          <br />
          <strong>Address: </strong>
          {address}
        </p>
      </div>
    </Paper>
  );
};

export default ListingCard;
