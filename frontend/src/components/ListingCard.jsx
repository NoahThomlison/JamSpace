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

  const navigateToAd = (listing) => {
    navigate('/listings/' + listing._id)
  }

  return (
      <Paper className='card'>
        <div className='card-body' onClick={() => navigateToAd(listing)}>
          <h5 className='card-title'>{listing.title}</h5>
          <img
            src={listing.images[0]}
            className='rounded img-fluid'
            alt='Main'
          />
          <p className='card-text'>
            {descLength > maxLength
              ? listing.description.substring(0, 200) + '  . . .'
              : listing.description}
            <br />
            <strong>Price: </strong>D: <em>${listing.price.daily}</em>, W:{' '}
            <em>${listing.price.weekly}</em>, M:{' '}
            <em>${listing.price.monthly}</em>
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
