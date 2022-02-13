import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Stepper, Step, StepLabel, Typography, Box } from "@mui/material"
import { makeStyles } from '@mui/styles';

import ReviewBooking from "./ReviewBooking"
import PaymentBooking from "./PaymentBooking"
import FinishBooking from "./FinishBooking"

const useStyles = makeStyles({
  input: {
    marginTop: "10px",
  },
});

const Booking = props => {
  const { user } = props;
  const location = useLocation();
  const { booking, listing } = location.state;
  const steps = ["Review", "Payment", "Finish"]
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(steps[step])

  const next = () => {
    setStep(step + 1)
    setPage(steps[step+1])
  }

  const back = () => {
    setStep(step - 1)
    setPage(steps[step-1])
  }

  const styles = useStyles();

  return (
    <Container sx={{display: "flex", flexDirection:"column", height:"100vh", justifyContent: "space-between"}}>

      <Box sx={{display: "flex", paddingTop: "50px", height:"80vh", justifyContent: "space-evenly"}}>
        <Box sx={{ "display": "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
          <Typography variant="h5">{listing.title}</Typography>
          <img src={listing.images[0]} alt='Main' />.
        </Box>
        <Box sx={{width: "50%", alignSelf: "center"}}>
          {page === "Review" ? <ReviewBooking styles={styles} step={step} next={next} back={back}></ReviewBooking>: ""}
          {page === "Payment" ? <PaymentBooking styles={styles} step={step} next={next} back={back}></PaymentBooking> : ""}
          {page === "Finish" ? <FinishBooking styles={styles} step={step} next={next} back={back}></FinishBooking> : ""}
        </Box>
      </Box>


      <Box sx={{display: "flex"}}>
        <Stepper sx={{width: "100%"}} activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
      </Box>
    </Container>
  );
};

export default Booking;