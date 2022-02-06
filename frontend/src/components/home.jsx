// Import React Component
import React from 'react';

// Import Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Custom Components
import AdListings from '../components/AdListings';
import Questions from '../components/Questions';

// Import MUI
import heroImage from '../images/thehitsBW.jpg';
import { Box } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hero: {
    marginTop: 0,
    height: '75vh',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

const Home = props => {
  const { listings, setListings, user } = props;
  const styles = useStyles();

  return (
    <div>
      <Box className={styles.hero} />
      <Questions />
      <AdListings listings={listings} setListings={setListings} user={user} />
    </div>
  );
};

export default Home;
