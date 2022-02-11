// Import React Component
import React from 'react';

// Import Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Custom Components
import AdListings from '../components/AdListings';
import Questions from '../components/Questions';
import AdList from '../components/AdList';

// Import MUI
import heroImage from '../images/thehitsBWDark.jpg';
import logo from '../images/logoWhite.png';
import { Box } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hero: {
    marginTop: 0,
    height: '75vh',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "contains"
  },
  logo: {
    maxWidth: "15%",
    height: "auto",
    }
});

const Home = props => {
  const { listings, setListings, user } = props;
  const styles = useStyles();

  return (
    <div>

          <Box className={styles.hero}>
          <img src={logo} className={styles.logo}></img>


        </Box>
      <Questions />
      <AdList listings={listings}></AdList>
      {/* <AdListings listings={listings} setListings={setListings} user={user} /> */}
    </div>
  );
};

export default Home;
