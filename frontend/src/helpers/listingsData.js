// Import the db query calls
import ListingsDataService from '../services/listings';

const listingsData = setListings => {
  ListingsDataService.getAll()
    .then(response => {
      setListings(response.data.listings);
    })
    .catch(e => {
      console.log(e);
    });
};

export default listingsData;
