import ListingsDataService from '../services/listings';

const ListingData = setListings => {
  ListingsDataService.getAll()
    .then(response => {
      setListings(response.data.listings);
    })
    .catch(e => {
      console.log(e);
    });
};

export default ListingData;
