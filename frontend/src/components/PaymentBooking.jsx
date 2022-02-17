import React from 'react';
import { Container, Paper, Box, TextField, Button } from "@mui/material"

const PaymentBooking = props => {

  return (
    <Container>
      <Paper sx={{display:"flex", flexDirection: "column"}}>
      <TextField className={props.styles.input} id='outlined-basic' name='email' label='Email' variant='outlined'/>
      <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='contact_number'  label='Contact Number' variant='outlined'/>    

      <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='card_number' label='Card Number' variant='outlined'/>
      <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='expiry_date'  label='YY/MM' variant='outlined'/>   
      <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='cvc' label='CVC' variant='outlined'/>
 
      <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='name_on_card' label='Name on Card' variant='outlined'/>

      <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='country' label='Country' variant='outlined'/>
      <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='postal_code' label='Postal Code' variant='outlined'/>
      <Box sx={{display:"flex", justifyContent: "space-around"}}>
      <Button className={props.styles.input} variant="contained" sx={{width: "100%"}} onClick={() => props.next()}>Pay</Button>
      <Button className={props.styles.input} variant="contained" color="error" sx={{width: "100%"}} onClick={() => props.back()}>Back</Button>
      </Box>
      </Paper>
    </Container>
  );
};

export default PaymentBooking;
