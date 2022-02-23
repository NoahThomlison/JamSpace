import React, { useState } from 'react';
import ListingsDataService from '../services/listings';

// Import dropdown data
import { instruments, brands } from '../staticData/filterDropdownData.js';

// Import MUI
import {
  Box,
  Paper,
  Container,
  TextField,
  Select,
  Button,
  ButtonGroup,
  InputLabel,
  MenuItem,
  Typography,
  FormControl,
} from '@mui/material/';

const Filters = props => {
  const { setListings } = props;

  const [searchBrand, setSearchBrand] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [searchInstrumentType, setSearchInstrumentType] = useState('');
  const [searchType, setSearchType] = useState('');

  const onChangeSearchBrand = e => {
    const brand = e.target.value ? e.target.value : '';
    setSearchBrand(brand);
    setSearchType('brand');
  };

  const onChangeSearchCity = e => {
    const city =
      e.target.value.charAt(0).toUpperCase() +
      e.target.value.slice(1).toLowerCase();
    setSearchCity(city);
    setSearchType('city');
  };

  const onChangeSearchDescription = e => {
    const description = e.target.value;
    setSearchDescription(description);
    setSearchType('description');
  };

  const onChangeSearchInstrumentType = e => {
    const instrumentType = e.target.value;
    if (instrumentType) {
      setSearchInstrumentType(instrumentType);
      setSearchType('instrumentType');
    } else {
      setSearchInstrumentType('');
      setSearchType('instrumentType');
    }
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

  const findBySearch = filter => {
    // alert(filter)
    if (filter === 'brand') {
      findByBrand();
    }
    if (filter === 'city') {
      findByCity();
    }
    if (filter === 'description') {
      findByDescription();
    }
    if (filter === 'instrumentType') {
      findByInstrumentType();
    }
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
    // alert("findbyinstrument")
    find(searchInstrumentType, 'instrument_type');
  };

  return (
    <Box>
      <Container sx={{ paddingTop: '50px' }}>
        <Paper>
          <Box sx={{ width: '100%', display: 'flex' }}>
            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
              sx={{
                borderRadius: '15px 4px 4px 4px',
                marginRight: '10px',
                marginLeft: '10px',
                marginTop: '10px',
                width: '50%',
              }}
            >
              <TextField
                id='standard-basic'
                label='Search by City'
                variant='standard'
                onChange={onChangeSearchCity}
                value={searchCity}
                sx={{ width: '100%', marginLeft: '10px' }}
              />
            </ButtonGroup>

            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
              sx={{
                borderRadius: '4px 15px 4px 4px',
                marginRight: '10px',
                marginLeft: '10px',
                marginTop: '10px',
                width: '50%',
              }}
            >
              <TextField
                id='standard-basic'
                label='Search by Keyword'
                variant='standard'
                onChange={onChangeSearchDescription}
                value={searchDescription}
                sx={{ width: '100%', marginLeft: '10px' }}
              />
            </ButtonGroup>
          </Box>

          <Box sx={{ width: '100%', display: 'flex' }}>
            <FormControl
              fullWidth
              sx={{
                marginRight: '10px',
                marginLeft: '10px',
                marginTop: '10px',
                width: '50%',
              }}
            >
              <InputLabel id='demo-simple-select-label' sx={{ width: '100%' }}>
                Search by Brand
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                sx={{ width: '100%' }}
                id='demo-simple-select'
                label='Brand'
                onChange={onChangeSearchBrand}
              >
                <MenuItem value={false}>{'All Brands'}</MenuItem>
                {brands.map(brand => (
                  <MenuItem value={brand}>{brand}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                marginRight: '10px',
                marginLeft: '10px',
                marginTop: '10px',
                width: '50%',
              }}
            >
              <InputLabel id='demo-simple-select-label' sx={{ width: '100%' }}>
                Search by Instruments Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                sx={{ width: '100%' }}
                id='demo-simple-select'
                label='Brand'
                onChange={onChangeSearchInstrumentType}
              >
                <MenuItem value={false}>{'All Types'}</MenuItem>
                {instruments.map(instrument => (
                  <MenuItem value={instrument}>{instrument}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            sx={{
              width: '100%',
              marginTop: '10px',
              borderRadius: '0px 0px 15px 15px',
            }}
            onClick={() => {
              findBySearch(searchType);
            }}
            variant='contained'
          >
            Search
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Filters;
