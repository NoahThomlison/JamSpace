import React, { useEffect, useState } from 'react';
import ListingsDataService from '../services/listings';
import { Link } from 'react-router-dom';

const AdListings = props => {
  const [listings, setListings] = useState([]);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [searchInstrumentType, setSearchInstrumentType] = useState('');

  useEffect(() => {
    retrieveListings();
  }, []);

  const onChangeSearchBrand = e => {
    const brand = e.target.value;
    setSearchBrand(brand);
  };

  const onChangeSearchCity = e => {
    const city = e.target.value;
    setSearchCity(city);
  };

  const onChangeSearchDescription = e => {
    const description = e.target.value;
    setSearchDescription(description);
  };

  const onChangeSearchInstrumentType = e => {
    const instrumentType = e.target.value;
    setSearchInstrumentType(instrumentType);
  };

  const retrieveListings = () => {
    ListingsDataService.getAll()
      .then(response => {
        console.log('HEEERRRRRREEEEE');
        console.log(response);
        setListings(response.data.listings);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveListings();
  };

  const find = (query, by) => {
    ListingsDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setListings(response.data.listings);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const findByBrand = () => {
    find(searchBrand, 'brand');
  };

  // This is not working yet.
  const findByCity = () => {
    find(searchCity, 'city');
  };

  const findByDescription = () => {
    find(searchDescription, 'description');
  };

  const findByInstrumentType = () => {
    find(searchInstrumentType, 'instrument_type');
  };

  // Sample Test Code
  //const address = 'Hamilton, Ontario, Canada';

  console.log(listings);

  return (
    <div>
      <div className='row pb-1'>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by Brand'
            value={searchBrand}
            onChange={onChangeSearchBrand}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByBrand}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by City'
            value={searchCity}
            onChange={onChangeSearchCity}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByCity}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by Keyword'
            value={searchDescription}
            onChange={onChangeSearchDescription}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByDescription}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by Instrument Type'
            value={searchInstrumentType}
            onChange={onChangeSearchInstrumentType}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByInstrumentType}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='row'>
        {listings.map(listing => {
          const address = `${listing.address.city}, ${listing.address.province}, ${listing.address.country}`;
          return (
            <div className='col-lg-4 pb-1'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{listing.title}</h5>
                  <p className='card-text'>
                    {listing.description}
                    <br />
                    <strong>Instrument Type: </strong>
                    {listing.instrument_type}
                    <br />
                    <strong>Brand: </strong>
                    {listing.brand}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className='row'>
                    <Link
                      to={'/listings/' + listing._id}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                    >
                      View Ad
                    </Link>
                    <a
                      target='_blank'
                      href={'https://www.google.com/maps/place/' + address}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdListings;
