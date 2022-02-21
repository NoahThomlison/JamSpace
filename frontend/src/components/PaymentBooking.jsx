import React from 'react';
import { Container, Paper, Box, TextField, Button,  } from "@mui/material"
import { usePaymentInputs, PaymentInputsWrapper } from "react-payment-inputs";
import images from 'react-payment-inputs/images';
import { css } from 'styled-components';


const PaymentBooking = props => {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();

  return (
    <Container>
      <Paper sx={{display:"flex", flexDirection: "column"}}>
        <TextField className={props.styles.input} id='outlined-basic' name='email' label='Email' variant='outlined'/>
        <TextField sx={{marginTop: "10px"}} className={props.styles.input} id='outlined-basic' name='contact_number'  label='Contact Number' variant='outlined'/>    

        <PaymentInputsWrapper
        {...wrapperProps}
        styles={{
          fieldWrapper: {
            base: css`
            width: 100%; margin-top: 10px;
            `
          },
          inputWrapper: {
            base: css`
            height: 56px
            `
          },
          input: {
            base: css``
          },
        }}>
          <svg {...getCardImageProps({ images })} />
          <input {...getCardNumberProps()} />
          <input {...getExpiryDateProps()} />
          <input {...getCVCProps()} />
        </PaymentInputsWrapper>

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


