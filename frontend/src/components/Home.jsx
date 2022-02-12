// Import React Component
import React, { useEffect } from 'react';

// Import Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import fadeIn
import FadeInSection from '../helpers/fadeIn';

// Import Custom Components
import AdListings from '../components/AdListings';
import Questions from '../components/Questions';
import AdList from '../components/AdList';
import About from './About';

// Import Listings Data
import listingsData from '../helpers/listingsData';

// Import Images
import heroImage from '../images/thehitsBWDark.jpg';
import logo from '../images/logoWhite.png';
import store from '../images/store1.jpg';

// Import MUI
import { Box } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import TabScrollButton from '@mui/material/TabScrollButton';

const useStyles = makeStyles({
  hero: {
    marginTop: 0,
    height: '100vh',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'contains',
  },
  logo: {
    maxWidth: '15%',
    height: 'auto',
  },
  store: {
    backgroundImage: `url(${store})`,
    height: '100vh',
    display: 'flex',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = props => {
  const { listings, setListings, user } = props;
  const styles = useStyles();

  useEffect(() => {
    listingsData(setListings);
  }, []);

  return (
    <div sx={{ color: '#FF0000' }}>
      <Box className={styles.main}>
        <Box className={styles.hero}>
          <img src={logo} className={styles.logo}></img>
        </Box>
        <Box className={styles.store}>
          <FadeInSection>
            <About />
            <Questions />
          </FadeInSection>
        </Box>
        <FadeInSection>
          <AdList listings={listings}></AdList>
        </FadeInSection>
      </Box>
    </div>
  );
};

export default Home;
