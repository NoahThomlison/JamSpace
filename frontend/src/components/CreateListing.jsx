import React, { useState, useCallback } from 'react';
import ListingsDataService from '../services/listings';
import { Link } from 'react-router-dom';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

import {useDropzone} from 'react-dropzone'


//MUI
import { Autocomplete, Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material"


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

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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

                <Box className="container" sx={{backgroundColor: "#808080"}}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </Box>

    <TextField id="outlined-basic" label="Title" name="title" variant="outlined" onChange={handleInputChange}/>

    
                {/* <TextField id="outlined-textarea" label="Description" name="description" variant="outlined"  onChange={handleInputChange}/> */}
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  onChange={handleInputChange}
                />
                {/* dropdown */}
                {/* <TextField id="outlined-basic" name="instrument_type" label="Instument Type" variant="outlined"/> */}
                <FormControl sx={{width:150}}>
                  <InputLabel id="demo-simple-select-helper-label">Instument Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="instrument_type"
                    label="Brand"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={10}>Guitar</MenuItem>
                    <MenuItem value={20}>Drums</MenuItem>
                    <MenuItem value={30}>Soemthing else?</MenuItem>
                  </Select>
                </FormControl>


                {/* <TextField id="outlined-basic" name="condition"  label="Condition" variant="outlined" onChange={handleInputChange}/> */}
                <FormControl sx={{width:150}}>
                  <InputLabel id="demo-simple-select-helper-label">Condition</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="condition"
                    label="Condition"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={10}>Excellent</MenuItem>
                    <MenuItem value={20}>Good</MenuItem>
                    <MenuItem value={30}>Fair</MenuItem>
                    <MenuItem value={30}>Not so hot</MenuItem>
                    <MenuItem value={30}>Smashed</MenuItem>
                  </Select>
                </FormControl>


                {/* <TextField id="outlined-basic" name="brand" label="Brand" variant="outlined" onChange={handleInputChange}/> */}
                <FormControl sx={{width:150}}>
                  <InputLabel id="demo-simple-select-helper-label">Brand</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="brand"
                    label="Brand"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={10}>Something</MenuItem>
                    <MenuItem value={20}>Something</MenuItem>
                    <MenuItem value={30}>Something</MenuItem>
                  </Select>
                </FormControl>

                <TextField id="outlined-basic" name="images" label="Link to Image" variant="outlined" onChange={handleInputChange}/>

                {/* //prices  */}
                <TextField id="outlined-basic" name='daily' label="Daily($)" variant="outlined" onChange={handleInputChange}/>
                <TextField id="outlined-basic" name='weekly' label="Weekly($)" variant="outlined" onChange={handleInputChange}/>
                <TextField id="outlined-basic" name='monthly' label="Monthly($)" variant="outlined" onChange={handleInputChange}/>
                <TextField id="outlined-basic" name='deposit' label="Security Deposit($)" variant="outlined" onChange={handleInputChange}/>

                {/* //location  */}
                <TextField id="outlined-basic" name='city' label="City:" variant="outlined" onChange={handleInputChange}/>
                <TextField id="outlined-basic" name='province' label="Province:" variant="outlined" onChange={handleInputChange}/>
                <TextField id="outlined-basic" name='country' label="Country:" variant="outlined" onChange={handleInputChange}/>
                <TextField startAdornment={"$"} id="outlined-basic" name='postal_code' label="Postal Code:" variant="outlined" onChange={handleInputChange}/>
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


