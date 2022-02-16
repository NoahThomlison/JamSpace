
// Import React Component
import React from 'react';
// Import Styles
import 'bootstrap/dist/css/bootstrap.min.css';
// Import fadeIn
import FadeInSection from "../helpers/fadeIn"

// Import Custom Components
import AdListings from '../components/AdListings';
import Questions from '../components/Questions';
import AdList from '../components/AdList';
import About from './About'
import Filters from './Filters'
import Map from './Map';


// Import Images
import heroImage from '../images/thehitsBWDark.jpg';
import logo from '../images/logoWhite.png';
import store from '../images/store1.jpg'
import drums from '../images/Drums.jpg'
import guitar1 from '../images/Guitars.jpg'
import guitar2 from '../images/Guitars2.jpg'
import guitar3 from '../images/Guitars3.jpg'
import map from '../images/amps_drums.jpg'


// Import MUI
import { Box, Paper } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hero: {
    marginTop: 0,
    height: '100vh',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    maxWidth: "15%",
    height: "auto",
  },
  store: {
    backgroundImage: `url(${store})`,
    height: "100vh",
    display: "flex",
    backgroundSize: 'auto',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    justifyContent: "center",
    alignItems: "center",   
  },
  listings:{
    backgroundImage: `url(${guitar2})`,
    height: "100vh",
    display: "flex",
    backgroundSize: 'cover',
    justifyContent: "center",
    alignItems: "center",  
  },
  map:{
    marginTop: "0",
    backgroundImage: `url(${map})`,
    height: "50vh",
    display: "flex",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    justifyContent: "center",
    alignItems: "center",   
  },
});

const Home = props => {
  const { listings, setListings, user } = props;
  const styles = useStyles();

  return (
    <Box >
      {/* View 1 */}
      <Box className={styles.hero}>
        <img src={logo} className={styles.logo}></img>
      </Box>

      {/* View 2 */}
      <Box className={styles.listings}>
        <FadeInSection>
          <Paper sx={{opacity: "97%"}}>
            <Filters setListings={setListings}></Filters>
            <AdList listings={listings}></AdList>
          </Paper>
        </FadeInSection>
      </Box>

      {/* View 3 */}
      <Box className={styles.store}>
        <FadeInSection>
          <Paper sx={{opacity: "97%"}}>
              <About />
              <Questions />
          </Paper>
        </FadeInSection>
      </Box>
      
      <Box className={styles.map}>
        <Map listings={listings}/>
      </Box>
    </Box>
  );
};

export default Home;