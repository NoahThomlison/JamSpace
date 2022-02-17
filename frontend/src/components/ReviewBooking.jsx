import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Paper, Typography, Box, TextField, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';


const ReviewBooking = props => {
  const location = useLocation();
  const { booking } = location.state;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const firstDay = booking.minDate.toLocaleDateString('en-US', options);
  const lastDay = booking.maxDate.toLocaleDateString('en-US', options);
  const { numOfDays, rentalRate, rental, deposit, total } = booking;
  const navigate = useNavigate();

  const navigateToAd = (listing) => {
    console.log(listing)
    navigate('/listings/' + listing._id)
  }

  return (
    <Container>
      <Paper sx={{display:"flex", flexDirection: "column"}}>
        <Typography variant="h5">Review Your Order</Typography>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} value={`${firstDay}`} InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} label='First Day' variant='outlined'/>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} value={`${lastDay}`} InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} label='Last Day' variant='outlined'/>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} value={`${numOfDays}`} InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} label='Number of Days' variant='outlined'/>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} value={`$${rentalRate}`} InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} label='Rental Rate' variant='outlined'/>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} value={`$${rental}`} InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} label='Rental Cost' variant='outlined'/>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} value={`$${deposit}`} InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} label='Security Deposit' variant='outlined'/>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} value={`$${total}`} InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} label='Total' variant='outlined'/>
        <Box sx={{display:"flex", justifyContent: "space-around"}}>
          <Button className={props.styles.input} variant="contained" sx={{width:"100%"}} onClick={() => props.next()}>Proceed to Payment</Button>
          <Button className={props.styles.input} variant="contained" color="error" sx={{width: "100%"}} onClick={() => navigateToAd(props.listing)}>Back</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReviewBooking;
