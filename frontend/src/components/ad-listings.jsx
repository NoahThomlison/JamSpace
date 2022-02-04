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

  const findByCity = () => {
    find(searchCity, 'city');
  };

  const findByDescription = () => {
    find(searchDescription, 'description');
  };

  const findByInstrumentType = () => {
    find(searchInstrumentType, 'instrument_type');
  };

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
          <select onChange={onChangeSearchInstrumentType}>
            <option value=''>All Instruments</option>
            <option value='Drums'>Drums</option>
            <option value='Acoustic Guitar'>Acoustic Guitar</option>
            <option value='Bass Guitar'>Bass Guitar</option>
            <option value='Electric Guitar'>Electric Guitar</option>
            <option value='Keyboard'> Keyboard</option>
          </select>
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
        {listings.length === 0 ? (
          <h4 className='text-center'>
            Sorry, there is nothing available to rent.
          </h4>
        ) : (
          listings.map(listing => {
            const address = `${listing.address.city}, ${listing.address.province}, ${listing.address.postal_code}`;
            const descLength = listing.description.length;
            const maxLength = 250;
            return (
              <div className='col-lg-4 pb-1'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{listing.title}</h5>
                    <img
                      src={listing.images[0]}
                      className='rounded img-fluid'
                    />
                    <p className='card-text'>
                      {descLength > maxLength
                        ? listing.description.substring(0, 200) + '  . . .'
                        : listing.description}
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
          })
        )}
      </div>
    </div>
  );
};

export default AdListings;
