import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// Import Custom Components
import AdListings from '../components/ad-listings';
import Questions from "../components/Questions"
import CreateListing from '../components/create-listing';

// MUI
import heroImage from "../images/thehitsBW.jpg"
import {Box, Paper} from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hero: {
    marginTop: 0,
    height: '75vh',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
});

function Home(user) {
  const styles = useStyles()

  return (
    <div>
      <Box className={styles.hero}/>
      <Questions/>
      <AdListings user={user}/>
    </div>
  );
}

export default Home;
