// Import React Components
import React from 'react';

// Import Material UI Components
import { Typography, Container } from '@mui/material';

// Import Static About Us Data
import AboutUs from '../staticData/AboutUs';

// The About component displays the About Us story from the static data using Typography MUI components on the Home Page.
const About = () => {
  return (
    <Container sx={{ marginBottom: '50px' }}>
      <Typography variant='h2' sx={{ fontWeight: '800' }}>
        About Us
      </Typography>
      <hr></hr>
      <Typography>{AboutUs[0]}</Typography>
      <Typography
        variant='h6'
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {AboutUs[1]}
      </Typography>
    </Container>
  );
};

export default About;
