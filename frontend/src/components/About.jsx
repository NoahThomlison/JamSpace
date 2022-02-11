import { Typography, Container, Paper, Box } from '@mui/material';
import React from 'react';
import Filters from './Filters';
import ListingCard from './ListingCard';

const About = props => {
  const { listings, setListings } = props;
  // user is also passed through but no needed yet so it was removed from the destructuring of props to eliminate the warning

  return (
    <Container sx={{marginBottom: "50px", backgroundColor: "#808080"}}>
      <Typography variant="h2" sx={{color: "#FFFFFF"}}>About Us</Typography>
      <Typography sx={{color: "#FFFFFF"}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in lorem in orci interdum cursus et eu massa. Donec sagittis tellus quis lectus aliquet luctus.Morbi   quis  vehicula purus. Donec eleifend eleifend felis in tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique eros turpis,consectetur  interdum  lorem ultricies quis. Mauris nec mi vulputate, porttitor ex a, ullamcorper arcu. Mauris et erat molestie, euismod felis at, vulputate eros.Mauris lacinia   ante lacus,   eget dictum est dapibus at. Donec pharetra tincidunt felis eget bibendum. Nulla non dapibus eros. Pellentesque eget elementum velit.Vestibulum eget  eleifend odio. Sed ex  dolor.
      </Typography>
    </Container>
  );
};

export default About;
