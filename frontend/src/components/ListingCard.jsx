import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = props => {
  const { listing } = props;

  const address = `${listing.address.city}, ${listing.address.province}, ${listing.address.postal_code}`;
  const descLength = listing.description.length;
  const maxLength = 250;

  return (
    <div className='col-lg-4 pb-1'>
      <div className='card'>
        <div className='card-body'>
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
          <div className='row'>
            <Link
              to={'/listings/' + listing._id}
              className='btn btn-primary col-lg-5 mx-1 mb-1'
            >
              View Ad
            </Link>
            <a
              href={'https://www.google.com/maps/place/' + address}
              className='btn btn-primary col-lg-5 mx-1 mb-1'
            >
              View Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
