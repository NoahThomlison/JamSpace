import { Typography, Container, } from '@mui/material';
import React from 'react';

const About = props => {

  return (
    <Container sx={{marginBottom: "50px"}}>
      <Typography variant="h2">About Us</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in lorem in orci interdum cursus et eu massa. Donec sagittis tellus quis lectus aliquet luctus.Morbi   quis  vehicula purus. Donec eleifend eleifend felis in tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique eros turpis,consectetur  interdum  lorem ultricies quis. Mauris nec mi vulputate, porttitor ex a, ullamcorper arcu. Mauris et erat molestie, euismod felis at, vulputate eros.Mauris lacinia   ante lacus,   eget dictum est dapibus at. Donec pharetra tincidunt felis eget bibendum. Nulla non dapibus eros. Pellentesque eget elementum velit.Vestibulum eget  eleifend odio. Sed ex  dolor.
      </Typography>
    </Container>
  );
};

export default About;
