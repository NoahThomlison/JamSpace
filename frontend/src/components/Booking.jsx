import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import ReviewBooking from './ReviewBooking';
import PaymentBooking from './PaymentBooking';
import FinishBooking from './FinishBooking';

import guitar2 from '../images/Guitars2.jpg';
import guitar3 from '../images/Guitars3.jpg';
import guitar4 from '../images/Guitars4.jpg';
import guitar5 from '../images/Guitars5.jpg';
import guitar6 from '../images/Guitars6.jpg';
import guitar7 from '../images/Guitars7.jpg';
import instruments1 from '../images/instruments1.jpg';
import board1 from '../images/board1.jpg';

const useStyles = makeStyles({
  input: {
    marginTop: '10px',
  },
});

const Booking = props => {
  const { user, setUser } = props;
  const location = useLocation();
  const { booking, listing } = location.state;
  const steps = ['Review', 'Payment', 'Finish'];
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(steps[step]);

  const next = () => {
    setStep(step + 1);
    setPage(steps[step + 1]);
  };

  const back = () => {
    setStep(step - 1);
    setPage(steps[step - 1]);
  };

  const useStyles = makeStyles({
    background: {
      marginTop: 0,
      height: 'auto',
      backgroundImage: `url(${board1})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const styles = useStyles();

  return (
    <Box className={styles.background}>
      {console.log(booking)}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '50px',
          paddingBottom: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Paper sx={{ padding: '20px' }}>
          <Typography
            variant='h4'
            sx={{ textAlign: 'center', paddingBottom: '20px' }}
          >
            {listing.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '50px',
                justifyContent: 'center',
              }}
            >
              <img src={listing.images[0]} alt='Main' />.
            </Box>
            <Box
              sx={{
                width: '50%',
                height: '550px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {page === 'Review' ? (
                <ReviewBooking
                  styles={styles}
                  step={step}
                  listing={listing}
                  next={next}
                  back={back}
                ></ReviewBooking>
              ) : (
                ''
              )}
              {page === 'Payment' ? (
                <PaymentBooking
                  styles={styles}
                  step={step}
                  next={next}
                  back={back}
                ></PaymentBooking>
              ) : (
                ''
              )}
              {page === 'Finish' ? (
                <FinishBooking
                  user={user}
                  setUser={setUser}
                  styles={styles}
                  step={step}
                  next={next}
                  back={back}
                ></FinishBooking>
              ) : (
                ''
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', paddingTop: '50px' }}>
            <Stepper sx={{ width: '100%' }} activeStep={step} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Booking;
