// Import React Components
import React, { useEffect } from 'react';

// Import Custom Components
import Filters from './Filters';
import ListingCard from './ListingCard';

// Import Listings Data Helper Function
import listingsData from '../helpers/listingsData';

// Import React Masonry
import Masonry from 'react-masonry-css';

// Import Material UI Components
import { Box, Container } from '@mui/material/';
import { makeStyles } from '@mui/styles';

// Import Background Image
import board1 from '../images/board1.jpg';

// The AdListings component displays all of the listings from the DB inside ListingCard components all in the style of React Masonry.
const AdListings = props => {
  const { listings, setListings } = props;

  const useStyles = makeStyles({
    hero: {
      marginTop: 0,
      backgroundImage: `url(${board1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  });
  const styles = useStyles();

  useEffect(() => {
    listingsData(setListings);
  }, []);

  return (
    <Box className={styles.hero}>
      <Container>
        <Filters setListings={setListings} />
        <Box sx={{ paddingTop: '50px' }}>
          <Masonry
            breakpointCols={3}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
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
