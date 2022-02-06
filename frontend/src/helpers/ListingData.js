// Import the db query calls
import ListingsDataService from '../services/listings';

const listingData = setListings => {
  ListingsDataService.getAll()
    .then(response => {
      setListings(response.data.listings);
    })
    .catch(e => {
      console.log(e);
    });
};

export default listingData;
