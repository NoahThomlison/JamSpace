// Import React Components
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Material UI
import { Paper } from '@mui/material/';

// The ListingCard component displays a listings information on the Listings page.
const ListingCard = props => {
  const { listing } = props;
  const navigate = useNavigate();

  // Set the address text on the ListingCard
  const address = `${listing.address.city}, ${listing.address.province}, ${listing.address.postal_code}`;

  // Get the length of the specific listings description
  const descLength = listing.description.length;

  // Sets the max allowable description length to display on the listings page in the ListingCard
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
            ? listing.description.substring(0, maxLength) + '  . . .'
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
