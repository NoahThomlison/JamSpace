
import React from "react";
import {
	GoogleMap,
	LoadScript,
	OverlayView,
	MarkerClusterer,
	Marker,
	ScriptLoaded,
} from "@react-google-maps/api";
import { userData } from "../helpers/usersData"
import Geocode from "react-geocode";


import { useState, useEffect } from "react";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("ca");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("APPROXIMATE");

// Get latitude & longitude from address.

// const getGeocode = (address) => {
// Geocode.fromAddress("Eiffel Tower").then(
//   (response) => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//   },
//   (error) => {
//     console.error(error);
//   }
// );
// }

const containerStyle = {
	width: "75%",
	height: "400px",
};

const center = {
	lat: 60,
	lng: -90,
};



const divStyle = {
	background: "white",
	border: "1px solid #ccc",
	padding: 15,
};


function Map(props) {
	const { listings, setListings } = props;
	// const [min, setMin] = useState(0);
	// const [locations, setLocations ] = useState([])
	// const [ads, setAds] = useState(listings.slice(min, max));
	// let slideCount = Math.ceil(listings.length / adCount);
  const listImages = listings.map((listing) => listing.image)

	const options = {
		imagePath: listImages,
		// {ads.map(ad => {
		//   return (
		//     <Ad
		//       ad={ad}
		//       id={ad._id}
		//       images={ad.images}
		//       price={ad.price}
		//       description={ad.description}
		//       title={ad.title}
		//       />
		//   })}
		// 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
		// so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
	};
	function createKey(location) {
		return location.lat + location.lng;
	}
  const locations = 
[
	{ lat: 61.56391, lng: -87.154312 },
	{ lat: 63.718234, lng: -90.363181 },
	{ lat: 63.727111, lng: -90.371124 },
	{ lat: 63.848588, lng: -91.209834 },
	{ lat: 63.851702, lng: -91.216968 },
	{ lat: 64.671264, lng: -90.863657 },
	{ lat: 65.304724, lng: -88.662905 },
	{ lat: 66.817685, lng: -115.699196 },
	{ lat: 66.828611, lng: -115.790222 },
	{ lat: 67.75, lng: -85.116667 },
	{ lat: 67.759859, lng: -85.128708 },
	{ lat: 67.765015, lng: -85.133858 },
	{ lat: 67.770104, lng: -85.143299 },
	{ lat: 67.7737, lng: -85.145187 },
	{ lat: 67.774785, lng: -85.137978 },
	{ lat: 67.819616, lng: -84.968119 },
	{ lat: 68.330766, lng: -84.695692 },
	{ lat: 69.927193, lng: -85.053218 },
	{ lat: 61.330162, lng: -84.865694 },
	{ lat: 62.734358, lng: -87.439506 },
	{ lat: 62.734358, lng: -87.501315 },
	{ lat: 62.735258, lng: -87.438 },
	{ lat: 63.999792, lng: -110.463352 },
];
const onClick = () => {
	console.info("I have been clicked!");
					return (<OverlayView
					position={center}
					mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					onClick="/"
				>
					<div style={divStyle}>
						<h1>OverlayView</h1>

					</div>
				</OverlayView>)
};
// const locations = []

// useEffect(() => {listings.map((listing) => {
//   Geocode.fromAddress(listing.address.postal_code).then(
//     (response) => {
//       // listing.address.coordinates= response.results[0].geometry.location;
//       const { lat, lng } = response.results[0].geometry.location;
//       setLocations([...locations, {lat, lng}])
//       // console.log(response.results[0].geometry.location)
//     },
//     (error) => {
//       console.error(error);
//     }
//   );})},[locations], console.log(locations));
  



  // console.log(listings.address.coordinates)
//   const locations = 
// //   listings.map((listing) => {Geocode.fromAddress(listing.address.postal_code).then(
// //   (response) => {
// //     const { lat, lng } = response.results[0].geometry.location;
// //     console.log(lat, lng);
// //     return (lat, lng)
// //   },
// //   (error) => {
// //     console.error(error);
// //   }
// // );})
// // userData.address.map((addresses) => {
// //   Geocode.fromAddress(addresses).then(
// //     (response) => {
// //       const { lat, lng } = response.results[0].geometry.location;
// //       console.log(lat, lng);
// //     },
// //     function (error) {
// //       console.error(error);
// //     }
// //   );
// // })
  // userData.address.map((addresses) => {
//   Geocode.fromAddress(addresses).then(
//     (response) => {
//       const { lat, lng } = response.results[0].geometry.location;
//       console.log(lat, lng);
//     },
//     function (error) {
//       console.error(error);
//     }
//   );
// })
//   Geocode.fromAddress("V3A 4K2").then(
//   (response) => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

	return (
		<LoadScript
			googleMapsApiKey="AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I"
			// width= "100%"
		>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={3.5}
        id='marker-example'
			>
				{/* Child components, such as markers, info windows, etc. */}
				<></>
        <MarkerClusterer options={options}>
          {(clusterer) =>
            locations.map((location) => (

              <Marker key={createKey(location)} position={location} clusterer={clusterer} onClick={onClick} />
            ))
          }
        </MarkerClusterer>

			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(Map);




// // import React, { Component } from 'react';
// // import { GoogleMap, LoadScript } from '@react-google-maps/api';

// // const containerStyle = {
// //   width: '400px',
// //   height: '400px'
// // };

// // const center = {
// //   lat: -3.745,
// //   lng: -38.523
// // };

// // class Map extends Component {
// //   render() {
// //     return (
// //       <LoadScript
// //         googleMapsApiKey="YOUR_API_KEY"
// //         width="100%"
// //       >
// //         <GoogleMap
// //           mapContainerStyle={containerStyle}
// //           center={center}
// //           zoom={10}
// //         >
// //           { /* Child components, such as markers, info windows, etc. */ }
// //           <></>
// //         </GoogleMap>
// //       </LoadScript>
// //     )
// //   }
// // }
// // export default Map;

// // import React from 'react'
// // import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// // const containerStyle = {
// //   width: '400px',
// //   height: '400px'
// // };

// // const center = {
// //   lat: -3.745,
// //   lng: -38.523
// // };

// // function Map () {
// //   const { isLoaded } = useJsApiLoader({
// //     id: 'google-map-script',
// //     googleMapsApiKey: "YOUR_API_KEY"
// //   })

// //   const [map, setMap] = React.useState(null)

// //   const onLoad = React.useCallback(function callback(map) {
// //     const bounds = new window.google.maps.LatLngBounds();
// //     map.fitBounds(bounds);
// //     setMap(map)
// //   }, [])

// //   const onUnmount = React.useCallback(function callback(map) {
// //     setMap(null)
// //   }, [])

// //   return isLoaded ? (
// //       <GoogleMap
// //         mapContainerStyle={containerStyle}
// //         center={center}
// //         zoom={10}
// //         onLoad={onLoad}
// //         onUnmount={onUnmount}
// //       >
// //         { /* Child components, such as markers, info windows, etc. */ }
// //         <></>
// //       </GoogleMap>
// //   ) : <></>
// // }

// // export default React.memo(Map)

// // import React from 'react'
// // import { GoogleMap, useLoadScript } from '@react-google-maps/api'

// // const options = {
// //   zoomControlOptions: {
// //     position: google.maps.ControlPosition.RIGHT_CENTER // ,
// //     // ...otherOptions
// //   }
// // }

// // function Map () {
// //   const { isLoaded, loadError } = useLoadScript({
// //     googleMapsApiKey: "YOUR_API_KEY" // ,
// //     // ...otherOptions
// //   })

// //   const renderMap = () => {
// //     // wrapping to a function is useful in case you want to access `window.google`
// //     // to eg. setup options or create latLng object, it won't be available otherwise
// //     // feel free to render directly if you don't need that
// //     const onLoad = React.useCallback(
// //       function onLoad (mapInstance) {
// //         // do something with map Instance
// //       }
// //     )
// //     return <GoogleMap
// //       options={options}
// //       onLoad={onLoad}
// //     >
// //       {
// //         // ...Your map components
// //       }
// //     </GoogleMap>
// //   }

// //   if (loadError) {
// //     return <div>Map cannot be loaded right now, sorry.</div>
// //   }

// //   return isLoaded ? renderMap() : <Spinner />
// // }

// // export default React.memo(Map)
