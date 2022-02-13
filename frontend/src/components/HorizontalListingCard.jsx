import React from 'react';
import { Link } from 'react-router-dom';

// Import Styles
import './HorizontalListingCard.css';

// Import MUI Icon
import { DeleteOutlineOutlined } from '@mui/icons-material';

const HorizontalListingCard = props => {
  const { listing, handleDeleteClick, index } = props;

  const address = `${listing.address.city}, ${listing.address.province}, ${listing.address.postal_code}`;
  const descLength = listing.description.length;
  const maxLength = 250;

  return (
    <div className='card mb-2'>
      <div className='card-body'>
        <h5 className='card-title'>{listing.title}</h5>
        <div className='row'>
          <div className='col-lg-2'>
            <img
              src={listing.images[0]}
              className='rounded img-fluid'
              alt='Main'
            />
          </div>
          <div className='card-text col-lg-5'>
            {descLength > maxLength
              ? listing.description.substring(0, 200) + '  . . .'
              : listing.description}
          </div>

          <div className='card-text col-lg-3'>
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
          </div>
          <div className='col-lg-2'>
            <div
              className='row'
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link
                to={'/listings/' + listing._id}
                className='btn btn-sm btn-outline-dark col-lg-5 mx-1 mb-1'
              >
                View Ad
              </Link>
            </div>
            <div className='row centerButtons'>
              <a
                href={'https://www.google.com/maps/place/' + address}
                className='btn btn-sm btn-outline-dark col-lg-5 mx-1 mb-1'
              >
                View Map
              </a>
            </div>
            <div className='row centerButtons'>
              <Link
                to={'/user'}
                onClick={() => handleDeleteClick(listing._id, index)}
                className='btn btn-outline-dark col-lg-5 mx-1 mb-1 deleteButton'
              >
                <DeleteOutlineOutlined />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalListingCard;
