import React, { useState, useCallback, setState } from 'react';
import ListingsDataService from '../services/listings';
import { Link } from 'react-router-dom';

//MUI
import { Container, Typography, MenuItem, Autocomplete, FormHelperText, Select, Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material"
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//Drag and Drop
import {useDropzone} from 'react-dropzone'

//MUI styles
const useStyles = makeStyles({
  dragDrop: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: "5px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor:" #fafafa",
    color:"#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    width: "50%",
    '&:hover':{
      borderColor: '#d9d9d9',
    }
  },
  fourItems: {
    width: "25%",
    },
  threeItems: {
    width: "33.333333%",
  },
});

const CreateListing = props => {
  const { username, userId } = props.user;
  const classes = useStyles();
  const [dailyRate, setDailyRate] = useState("")

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

   const priceCalculator = event =>{
    const { name, value } = event.target;

    const dailyRate = value * 0.005
    const weeklyRate = dailyRate * 4
    const monthlyRate = weeklyRate * 3.5
    setListing({ ...listing, ["daily"]: dailyRate, ["weekly"]: weeklyRate, ["monthly"]: monthlyRate, ["deposit"]: value});
    console.log(dailyRate)
    setDailyRate(dailyRate)
    
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
  
  //Drag and Drop functionality
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
              <Container sx={{display:"flex", flexDirection: "column", alignItems:"center"}}>              
                <h3 className='mb-4'>{editing ? 'Edit' : 'Create'} Listing: </h3>
              <Container sx={{display: "flex"}}>
                <Container className={classes.dragDrop} sx={{display:"flex"}} >
                  <Box {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <Typography variant="h2">
                    <AddAPhotoIcon fontSize="xl"></AddAPhotoIcon>
                    </Typography>
                  </Box>
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </Container>
                <Container sx={{display: "flex", flexDirection: "column", width: "50%"}}>
                <TextField id="outlined-basic" label="Title" name="title" variant="outlined" onChange={handleInputChange}/>
                <TextField sx={{marginTop: "20px"}} id="outlined-multiline-static" label="Description" name="description" multiline rows={4} onChange={handleInputChange}/>
                {/* dropdown */}
                <Box sx={{width:"100%", marginTop: "20px"}}> 
                <FormControl className={classes.threeItems}>
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
                <FormControl className={classes.threeItems}>
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

                <FormControl className={classes.threeItems}>
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
                </Box>
                <TextField id="outlined-basic" name='instrument_value' label="Instrument Value" variant="outlined" onChange={priceCalculator} className={classes.fourItems}/>

                <Box sx={{marginTop: "20px"}}>
                {/* //prices  */}
                <TextField id="outlined-basic" name='daily' label="Daily($)" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                <TextField id="outlined-basic" name='weekly' label="Weekly($)" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                <TextField id="outlined-basic" name='monthly' label="Monthly($)" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                <TextField id="outlined-basic" name='deposit' label="Deposit($)" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                </Box>

                <Box sx={{marginTop: "20px"}}>
                {/* //prices  */}
                <TextField name='dailyFilled' id="dailyFilled" defaultValue= {`${dailyRate}`} className={classes.fourItems}/>
                <TextField name='weeklyFilled' label="Weekly($)"  className={classes.fourItems}/>
                <TextField name='monthlyFilled' label="Monthly($)"  className={classes.fourItems}/>
                <TextField name='depositFilled' label="Deposit($)"  className={classes.fourItems}/>
                </Box>

                {/* //location  */}
                <Box sx={{marginTop: "20px"}}>
                <TextField id="outlined-basic" name='city' label="City" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                <TextField id="outlined-basic" name='province' label="Province" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                <TextField id="outlined-basic" name='country' label="Country" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                <TextField startAdornment={"$"} id="outlined-basic" name='postal_code' label="Postal Code" variant="outlined" onChange={handleInputChange} className={classes.fourItems}/>
                </Box>
                </Container>
                
                </Container>
                <Button onClick={saveListing} sx={{width:"200px", marginTop:"20px"}} variant="outlined">Submit</Button>

                </Container>
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


