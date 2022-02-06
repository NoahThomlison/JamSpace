import React, { useState } from 'react';
import ListingsDataService from '../services/listings';

// Import dropdown data
import { instruments, brands } from '../staticData/filterDropdownData.js';

const Filters = props => {
  const { setListings } = props;

  const [searchBrand, setSearchBrand] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [searchInstrumentType, setSearchInstrumentType] = useState('');

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

  const find = (query, by) => {
    ListingsDataService.find(query, by)
      .then(response => {
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
    <div className='container'>
      <div className='row pt-3 justify-content-around'>
        <div className='col-lg-5'>
          <div className='input-group'>
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
        </div>
        <div className='col-lg-5'>
          <div className='input-group'>
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
        </div>
        <div className='row pb-5 justify-content-around'>
          <div className='col-lg-4 pt-3'>
            <div className='input-group'>
              <select onChange={onChangeSearchBrand}>
                <option value=''>All Brands</option>
                {brands.map(brand => (
                  <option value={brand}>{brand}</option>
                ))}
              </select>
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
          </div>
          <div className='col-lg-3 pt-3'>
            <div className='input-group'>
              <select onChange={onChangeSearchInstrumentType}>
                <option value=''>All Instruments</option>
                {instruments.map(instrument => (
                  <option value={instrument}>{instrument}</option>
                ))}
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
        </div>
      </div>
    </div>
  );
};

export default Filters;
