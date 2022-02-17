import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Paper, Typography, Box,  } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const FinishingBooking = props => {
  const location = useLocation();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Paper>
        {loading ? 
        <Box sx={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
        <CircularProgress></CircularProgress>
        </Box> : (
          <Box  sx={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <CheckCircleOutlineIcon color="success" sx={{fontSize:"100px"}}></CheckCircleOutlineIcon>
            <Typography variant="h5">Order Placed!</Typography>
            <Typography>Thank you for jamming with us!</Typography>
          </Box>)}
      </Paper>
    </Container>
  );
};

export default FinishingBooking;
