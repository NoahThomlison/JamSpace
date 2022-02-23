import React, { useState, useEffect } from 'react';
import ListingsDataService from '../services/listings';
import { Link } from 'react-router-dom';
import { brands, instruments } from '../staticData/filterDropdownData';
import axios from 'axios';

// Import Users Database Calls
import UsersDataService from '../services/users';

//MUI
import {
  Container,
  Typography,
  MenuItem,
  Autocomplete,
  FormHelperText,
  Select,
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//Drag and Drop
import { useDropzone } from 'react-dropzone';

//MUI styles
const useStyles = makeStyles({
  dragDrop: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: '5px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: ' #fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: '50%',
    '&:hover': {
      borderColor: '#d9d9d9',
    },
  },
  fourItems: {
    width: '25%',
  },
  threeItems: {
    width: '33.333333%',
  },
});

const CreateListing = props => {
  const { user, setUser } = props;

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
    images: [
      'https://www.long-mcquade.com/files/93525/md_807427acf19e77c2ee3cd7b809a479f9.png',
    ],
    user_id: user._id,
    name: `${user.first_name} ${user.last_name}`,
    user_img: user.image,
    user_about: user.about,
    city: '',
    province: '',
    country: '',
    postal_code: '',
  };

  const classes = useStyles();
  const [dailyRate, setDailyRate] = useState('');
  const [weeklyRate, setWeeklyRate] = useState('');
  const [monthlyRate, setMonthlyRate] = useState('');
  const [deposit, setDeposit] = useState('');
  const [formComplete, setFormComplete] = useState(false);
  const [listing, setListing] = useState(initialListingState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  //check if form is filled out completely
  useEffect(() => {
    if (Object.values(listing).some(x => x === '' || x === null)) {
      setFormComplete(false);
    } else {
      setFormComplete(true);
    }
  }, [listing]);

  let editing = false;

  const handleInputChange = event => {
    const { name, value } = event.target;
    setListing({ ...listing, [name]: value });
  };

  const priceCalculator = event => {
    const { value } = event.target;
    const dailyRateCalc = Math.round(value * 0.005 * 100) / 100;
    const weeklyRateCalc = Math.round(dailyRateCalc * 4 * 100) / 100;
    const monthlyRateCalc = Math.round(weeklyRateCalc * 3.5 * 100) / 100;
    setListing({
      ...listing,
      daily: dailyRateCalc,
      weekly: weeklyRateCalc,
      monthly: monthlyRateCalc,
      deposit: value,
    });
    setDailyRate(dailyRateCalc);
    setWeeklyRate(weeklyRateCalc);
    setMonthlyRate(monthlyRateCalc);
    setDeposit(value);
  };

  // need to remove reference to "type" everywhere
  const updateUser = async (userData, updatedListings, type) => {
    await UsersDataService.updateUser(userData, updatedListings, type)
      .then(() => {
        console.log(`Edited User ID #${userData._id}`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${listing.postalCode}&key=AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I`)
  //   .then(response => {
  //     setListing({ ...listing, coordinates: response.data.results[0].geometry.location })
  //     console.log(listing)
  //   })
  //   .catch(error => {
  //     console.log("error fetching: ", error)
  //     setError(console.error())
  //   })
  //   .finally(() => {
  //     setLoading(false)
  //   })
  // }, []);
  const saveListing = async () => {
    await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${listing.postal_code}&key=AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I`
    )
      .then(response => {
        // let coords = response.data.results[0].geometry.location

        // setListing({ ...listing, coordinates: coords})
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
          coordinates: response.data.results[0].geometry.location,
        };
        if (editing) {
          data.listing_id = props.location.state.currentListing._id;
          ListingsDataService.updateListing(data)
            .then(response => {
              setSubmitted(true);
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          ListingsDataService.createListing(data)
            .then(async response => {
              setSubmitted(true);
              const newListingId = response.data.adResponse.insertedId;
              const updatedListingIds = [...user.listing_ids, newListingId];
              await Promise.resolve(
                setUser(prev => ({ ...prev, listing_ids: updatedListingIds }))
              ).then(res => {
                updateUser(user, updatedListingIds, 'listings');
              });
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(error => {
        console.log('error fetching: ', error);
        setError(console.error());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Drag and Drop functionality
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      {/* If the username is not set as an empty string, display the new listing form, otherwise display the message to Login */}
      {user.first_name !== '' || user === null ? (
        <div className='submit-form mb-5'>
          {submitted ? (
            <div className='text-center my-5'>
              <h4>You have created a new listing successfully!</h4>
              <Link
                to={'/'}
                className='btn btn-lg btn-outline-dark btn-block mt-5'
              >
                Complete
              </Link>
            </div>
          ) : (
            <div className='mt-5'>
              <Container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h3 className='mb-4'>
                  {editing ? 'Edit' : 'Create'} Your Listing:{' '}
                </h3>
                <Container sx={{ display: 'flex' }}>
                  <Container
                    className={classes.dragDrop}
                    sx={{ display: 'flex' }}
                  >
                    <Box {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <Typography variant='h2'>
                        <AddAPhotoIcon fontSize='xl'></AddAPhotoIcon>
                      </Typography>
                    </Box>
                    <aside>
                      <ul>{files}</ul>
                    </aside>
                  </Container>
                  <Container
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '50%',
                    }}
                  >
                    <TextField
                      id='outlined-basic'
                      label='Title'
                      name='title'
                      variant='outlined'
                      onChange={handleInputChange}
                    />
                    <TextField
                      sx={{ marginTop: '20px' }}
                      id='outlined-multiline-static'
                      label='Description'
                      name='description'
                      multiline
                      rows={4}
                      onChange={handleInputChange}
                    />
                    {/* Instrument Type */}
                    <Box sx={{ width: '100%', marginTop: '20px' }}>
                      <FormControl className={classes.threeItems}>
                        <InputLabel id='demo-simple-select-helper-label'>
                          Instrument Type
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-helper-label'
                          id='demo-simple-select-helper'
                          name='instrument_type'
                          label='Instrument_Type'
                          onChange={handleInputChange}
                        >
                          {instruments.map(instrument => {
                            return (
                              <MenuItem value={instrument}>
                                {instrument}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      {/* Condition */}
                      <FormControl className={classes.threeItems}>
                        <InputLabel id='demo-simple-select-helper-label'>
                          Condition
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-helper-label'
                          id='demo-simple-select-helper'
                          name='condition'
                          label='Condition'
                          onChange={handleInputChange}
                        >
                          <MenuItem value={'Excellent'}>Excellent</MenuItem>
                          <MenuItem value={'Good'}>Good</MenuItem>
                          <MenuItem value={'Fair'}>Fair</MenuItem>
                          <MenuItem value={'Not so hot'}>Not so hot</MenuItem>
                          <MenuItem value={'Smashed'}>Smashed</MenuItem>
                        </Select>
                      </FormControl>
                      {/* Brand */}
                      <FormControl className={classes.threeItems}>
                        <InputLabel id='demo-simple-select-helper-label'>
                          Brand
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-helper-label'
                          id='demo-simple-select-helper'
                          name='brand'
                          label='Brand'
                          onChange={handleInputChange}
                        >
                          {brands.map(brand => {
                            return <MenuItem value={brand}>{brand}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Instrument Value */}
                    <Box sx={{ marginTop: '20px', width: '100%' }}>
                      <TextField
                        sx={{ width: '100%' }}
                        id='outlined-basic'
                        name='instrument_value'
                        label='Instrument Value'
                        variant='outlined'
                        onChange={priceCalculator}
                      />
                    </Box>

                    {/* Rates */}
                    <Box sx={{ marginTop: '20px' }}>
                      <TextField
                        name='dailyFilled'
                        id='outlined-read-only-input'
                        label='Deposit'
                        value={deposit}
                        className={classes.fourItems}
                      />
                      <TextField
                        name='dailyFilled'
                        id='outlined-read-only-input'
                        label='Daily Rate'
                        value={dailyRate}
                        className={classes.fourItems}
                      />
                      <TextField
                        name='dailyFilled'
                        id='outlined-read-only-input'
                        label='Weekly Rate'
                        value={weeklyRate}
                        className={classes.fourItems}
                      />
                      <TextField
                        name='dailyFilled'
                        id='outlined-read-only-input'
                        label='Monthly Rate'
                        value={monthlyRate}
                        className={classes.fourItems}
                      />
                    </Box>

                    {/* Location */}
                    <Box sx={{ marginTop: '20px' }}>
                      <TextField
                        id='outlined-basic'
                        name='city'
                        label='City'
                        variant='outlined'
                        onChange={handleInputChange}
                        className={classes.fourItems}
                      />
                      <FormControl className={classes.fourItems}>
                        <InputLabel id='demo-simple-select-helper-label'>
                          Province
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-helper-label'
                          id='demo-simple-select-helper'
                          name='province'
                          label='Province'
                          onChange={handleInputChange}
                        >
                          <MenuItem value={'AB'}>AB</MenuItem>
                          <MenuItem value={'BC'}>BC</MenuItem>
                          <MenuItem value={'MB'}>MB</MenuItem>
                          <MenuItem value={'NB'}>NB</MenuItem>
                          <MenuItem value={'NL'}>NL</MenuItem>
                          <MenuItem value={'NS'}>NS</MenuItem>
                          <MenuItem value={'NT'}>NT</MenuItem>
                          <MenuItem value={'NU'}>NU</MenuItem>
                          <MenuItem value={'ON'}>ON</MenuItem>
                          <MenuItem value={'QC'}>QC</MenuItem>
                          <MenuItem value={'SK'}>SK</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl className={classes.fourItems}>
                        <InputLabel id='demo-simple-select-helper-label'>
                          Country
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-helper-label'
                          id='demo-simple-select-helper'
                          name='country'
                          label='Country'
                          onChange={handleInputChange}
                        >
                          <MenuItem value={'Canada'}>Canada</MenuItem>
                          <MenuItem value={'United States'}>
                            United States
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        startAdornment={'$'}
                        id='outlined-basic'
                        name='postal_code'
                        label='Postal Code'
                        variant='outlined'
                        onChange={handleInputChange}
                        className={classes.fourItems}
                      />
                    </Box>
                  </Container>
                </Container>
                {formComplete ? (
                  <button
                    onClick={saveListing}
                    className='btn btn-lg btn-outline-dark mt-4'
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={saveListing}
                    className='btn btn-lg btn-outline-dark mt-4'
                    disabled
                  >
                    Submit
                  </button>
                )}
              </Container>
            </div>
          )}
        </div>
      ) : (
        <div className='text-center my-5'>
          <h2>Please Log In To Create A Listing.</h2>
          <Link
            to={'/login'}
            className='btn btn-lg btn-outline-dark btn-block my-5'
          >
            Click Here To Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateListing;
