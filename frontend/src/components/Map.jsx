// Import React Components
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Google Maps Api
import {
  GoogleMap,
  MarkerClusterer,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';

// Import Material UI
import { Container } from '@mui/material';

// Import Custom Icons for Map Markers
import drums from './icons/drums.jpg';
import keyboard from './icons/keyboard.jpg';
import bass from './icons/bass.jpg';
import acoustic from './icons/acoustic.png';
import electric from './icons/electric.jpg';

// The Map component uses the Google API to put all ads on the map on the homepage and a single ad on the IndividualAd component
const Map = props => {
  const { listings, user } = props;

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  // Custom icons on the map
  const icons = {
    Drums: drums,
    'Acoustic Guitar': acoustic,
    'Bass Guitar': bass,
    'Electric Guitar': electric,
    Keyboard: keyboard,
  };

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  };

  const createKey = location => {
    return location.lat + location.lng;
  };

  const singleAd = listings.length === 1;

  const center = singleAd
    ? listings[0].address.coordinates
    : user.address.coordinates
    ? user.address.coordinates
    : { lat: 50, lng: -90 };

  const navigate = useNavigate();
  const toListing = listing => {
    navigate(`/listings/${listing._id}`);
  };

  const deCluster = (listing, index) => {
    let latIndex = 0;
    let lngIndex = 0;
    if (index % 4 === 0) {
      latIndex = index;
      lngIndex = index;
    } else if (index % 4 === 1) {
      latIndex = -index;
      lngIndex = index;
    } else if (index % 4 === 2) {
      latIndex = index;
      lngIndex = -index;
    }
    latIndex = index;
    lngIndex = index;
    const spidered = {
      lat: listing.address.coordinates.lat + latIndex / 1000,
      lng: listing.address.coordinates.lng + lngIndex / 1000,
    };
    return spidered;
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_YOUR_API_KEY,
  });

  if (loadError) {
    console.log('Load Error');
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <Container>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={singleAd ? 10 : user.address.coordinates ? 8 : 4}
        id='marker-example'
      >
        <MarkerClusterer options={options}>
          {clusterer =>
            listings.map((listing, index) => (
              <Marker
                className='photo'
                key={createKey(listing.address.coordinates)}
                position={deCluster(listing, index)}
                clusterer={clusterer}
                onClick={() => toListing(listing)}
                icon={icons[listing.instrument_type]}
              ></Marker>
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </Container>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(Map);
