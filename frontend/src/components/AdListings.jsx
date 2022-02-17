import React, { useEffect } from 'react';
import listingsData from '../helpers/listingsData';
import Filters from './Filters';
import ListingCard from './ListingCard';
import { Box, Paper, Container, } from '@mui/material/';
import Masonry from 'react-masonry-css'

import heroImage from '../images/thehitsBWDark.jpg';
import logo from '../images/logoWhite.png';
import store from '../images/store1.jpg'
import drums from '../images/Drums.jpg'
import guitar1 from '../images/Guitars.jpg'
import guitar2 from '../images/Guitars2.jpg'
import guitar3 from '../images/Guitars3.jpg'
import map from '../images/amps_drums.jpg'
import { makeStyles } from '@mui/styles';
import board1 from '../images/board1.jpg'

const useStyles = makeStyles({
  hero: {
    marginTop: 0,
    backgroundImage: `url(${board1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

const AdListings = props => {
  const { listings, setListings } = props;
  const styles = useStyles();
  // user is also passed through but no needed yet so it was removed from the destructuring of props to eliminate the warning

  useEffect(() => {
    listingsData(setListings);
  }, []);

  return (
    <Box className={styles.hero}>
      <Container>
        <Filters setListings={setListings} />
        <Box sx={{paddingTop: "50px"}}>
        <Masonry 
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          >
            {listings.length === 0 ? (
            <h4 className='text-center'>
              Sorry, there is nothing available to rent.
            </h4>
          ) : (
            listings.map(listing => (
              <ListingCard key={listing._id} listing={listing} />
            ))
          )}
        </Masonry> 
        </Box>     
      </Container>
    </Box>
  );
};

export default AdListings;
