import React, { useState } from 'react';
import ListingsDataService from '../services/listings';
import { Link } from 'react-router-dom';

const CreateListing = props => {
  const { username, userId } = props.user;

  // HARDCODED USER IMG AND ABOUT UNTIL USER DB SET UP AND CONNECTED
  const initialListingState = {
    title: '',
    description: '',
    instrument_type: '',
    brand: '',
    condition: '',
    daily: null,
    weekly: null,
    monthly: null,
    deposit: null,
    images: [''],
    user_id: userId,
    name: username,
    user_img: 'https://picsum.photos/id/1025/4951/3301.jpg',
    user_about: 'Music is my life and I want to share it with all of you!',
    city: '',
    province: '',
    country: '',
    postal_code: '',
  };

  let editing = false;

  // EDITING STILL NEEDS TO BE IMPLEMENTED

  // if (props.location.state && props.location.state.currentListing) {
  //   editing = true;
  //   initialListingState = props.location.state.currentListing.text;
  // }

  const [listing, setListing] = useState(initialListingState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setListing({ ...listing, [name]: value });
  };

  const saveListing = () => {
    let data = {
      title: listing.title,
      description: listing.description,
      instrument_type: listing.instrument_type,
      brand: listing.brand,
      condition: listing.condition,
      daily: listing.daily,
      weekly: listing.weekly,
      monthly: listing.monthly,
      deposit: listing.deposit,
      images: listing.images,
      user_id: listing.user_id,
      name: listing.name,
      user_img: listing.user_img,
      user_about: listing.user_about,
      city: listing.city,
      province: listing.province,
      country: listing.country,
      postal_code: listing.postal_code,
    };

    if (editing) {
      data.listing_id = props.location.state.currentListing._id;
      ListingsDataService.updateListing(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      ListingsDataService.createListing(data)
        .then(response => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {/* If the username is not set as an empty string, display the new listing form, otherwise display the message to Login */}
      {username !== '' ? (
        <div className='submit-form mb-5'>
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={'/'} className='btn btn-lg btn-primary btn-block'>
                Back to the Listings
              </Link>
            </div>
          ) : (
            <div>
              <h3 className='mb-4'>{editing ? 'Edit' : 'Create'} Listing: </h3>
              <div className='form-group row'>
                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='title'
                >
                  <strong>Title: </strong>
                </label>
                <div className='col-sm-10 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    required
                    value={listing.title}
                    onChange={handleInputChange}
                    name='title'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='description'
                >
                  <strong>Description: </strong>
                </label>
                <div className='col-sm-10 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='description'
                    required
                    value={listing.description}
                    onChange={handleInputChange}
                    name='description'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='instrument_type'
                >
                  <strong>Instument Type: </strong>
                </label>
                <div className='col-sm-10 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='instrument_type'
                    required
                    value={listing.instrument_type}
                    onChange={handleInputChange}
                    name='instrument_type'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='brand'
                >
                  <strong>Brand: </strong>
                </label>
                <div className='col-sm-10 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='brand'
                    required
                    value={listing.brand}
                    onChange={handleInputChange}
                    name='brand'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='condition'
                >
                  <strong>Condition: </strong>
                </label>
                <div className='col-sm-10 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='condition'
                    required
                    value={listing.condition}
                    onChange={handleInputChange}
                    name='condition'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='images'
                >
                  <strong>Link to Image: </strong>
                </label>
                <div className='col-sm-10 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='images'
                    required
                    value={listing.images}
                    onChange={handleInputChange}
                    name='images'
                  />
                </div>

                <div className='mb-2'>
                  <h3>Price: </h3>
                </div>
                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='daily'
                >
                  <strong>Daily: </strong>
                </label>
                <div className='col-sm-2 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='daily'
                    required
                    value={listing.daily}
                    onChange={handleInputChange}
                    name='daily'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='weekly'
                >
                  <strong>Weekly: </strong>
                </label>
                <div className='col-sm-2 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='weekly'
                    required
                    value={listing.weekly}
                    onChange={handleInputChange}
                    name='weekly'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='monthly'
                >
                  <strong>Monthly: </strong>
                </label>
                <div className='col-sm-2 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='monthly'
                    required
                    value={listing.monthly}
                    onChange={handleInputChange}
                    name='monthly'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='deposit'
                >
                  <strong>Security Deposit: </strong>
                </label>
                <div className='col-sm-10 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='deposit'
                    required
                    value={listing.deposit}
                    onChange={handleInputChange}
                    name='deposit'
                  />
                </div>

                <div className='mb-2'>
                  <h3>Instrument Location: </h3>
                </div>
                <label className='col-sm-2 create-listing-label' htmlFor='city'>
                  <strong>City: </strong>
                </label>
                <div className='col-sm-4 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='city'
                    required
                    value={listing.city}
                    onChange={handleInputChange}
                    name='city'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='province'
                >
                  <strong>Province: </strong>
                </label>
                <div className='col-sm-4 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='province'
                    required
                    value={listing.province}
                    onChange={handleInputChange}
                    name='province'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='country'
                >
                  <strong>Country: </strong>
                </label>
                <div className='col-sm-4 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='country'
                    required
                    value={listing.country}
                    onChange={handleInputChange}
                    name='country'
                  />
                </div>

                <label
                  className='col-sm-2 create-listing-label'
                  htmlFor='postal_code'
                >
                  <strong>Postal Code: </strong>
                </label>
                <div className='col-sm-4 mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='postal_code'
                    required
                    value={listing.postal_code}
                    onChange={handleInputChange}
                    name='postal_code'
                  />
                </div>
              </div>
              <div className='text-center mt-3'>
                <button
                  onClick={saveListing}
                  className='btn btn-lg btn-outline-dark btn-block'
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='text-center mt-5'>
          <h2>Please Log In To Create A Listing.</h2>
          <Link
            to={'/login'}
            className='btn btn-lg btn-outline-dark btn-block mt-4'
          >
            Click Here To Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateListing;
