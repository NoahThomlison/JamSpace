import React, { useEffect, useState } from 'react';
import ListingsDataService from '../services/listings';
import { Link, useParams } from 'react-router-dom';

const Ad = props => {
  const { user } = props;
  const id = useParams().id;
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

  const [listing, setListing] = useState(initialListingState);

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

  return (
    <div>
      {listing ? (
        <div className='text-center'>
          <h5>{listing.title}</h5>
          <br />
          <img src={listing.images[0]} alt='Main' />
          <br />
          <br />
          <p>
            <strong>Description: </strong>
            <br />
            {listing.description}
            <br />
            <strong>Instrument Type: </strong>
            {listing.instrument_type}
            <br />
            <strong>Brand: </strong>
            {listing.brand}
            <br />
            <strong>Condition: </strong>
            {listing.condition}
            <br />
            <strong>Price: </strong>
            <br />
            <strong>Daily:</strong> ${listing.price.daily}
            <br />
            <strong>Weekly:</strong> ${listing.price.weekly}
            <br />
            <strong>Monthly:</strong> ${listing.price.monthly}
            <br />
            <strong>Security Deposit Required: </strong>
            {listing.security_deposit}
            <br />
            <strong>Location: </strong>
            {listing.address.city}, {listing.address.province}
          </p>
          <br />
          <hr />
          <p>
            <strong>Hosted By: </strong>
            <br />
            <br />
            <img className='prof-img' src={listing.host.image} alt='Host' />
            <br />
            <br />
            <strong>{listing.host.name}</strong>
            <br />
            <em>{listing.host.about}</em>
          </p>
        </div>
      ) : (
        <div>
          <br />
          <p>No Listing Found.</p>
        </div>
      )}
    </div>
  );
};

export default Ad;
