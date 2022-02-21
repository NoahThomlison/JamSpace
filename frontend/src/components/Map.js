import React from 'react';
import {
  GoogleMap,
  MarkerClusterer,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import drums from './icons/drums.jpg';
import keyboard from './icons/keyboard.jpg';
import bass from './icons/bass.jpg';
import acoustic from './icons/acoustic.jpg';
import electric from './icons/electric.jpg';
import Ad from './Ad.js';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const divStyle = {
  background: 'white',
  border: '1px solid #ccc',
  padding: 15,
};

const icons = {
  Drums: drums,
  'Acoustic Guitar': acoustic,
  'Bass Guitar': bass,
  'Electric Guitar': electric,
  Keyboard: keyboard,
};

function Map(props) {
  const { listings, setListings, user } = props;

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  };
  function createKey(location) {
    return location.lat + location.lng;
  }
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
    googleMapsApiKey: 'AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I',
  });
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
    console.log('loaderror');
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
}

export default React.memo(Map);
