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
        {/* {step === 0 ? <Button variant="disabled">Back</Button> : <Button onClick={() => back()}>Back</Button>} */}
        <Stepper sx={{width: "100%"}} activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
        {/* {step === 2 ? <Button variant="disabled">Next</Button> : <Button onClick={() => next()}>Next</Button>} */}
      </Box>
    </Container>
  );
};

export default Booking;


// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography variant="caption">Optional</Typography>
//             );
//           }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: '1 1 auto' }} />
//             {isStepOptional(activeStep) && (
//               <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                 Skip
//               </Button>
//             )}

//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }