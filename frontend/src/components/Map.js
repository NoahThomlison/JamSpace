import React, { useEffect } from "react";
import {
	GoogleMap,
	LoadScript,
	OverlayView,
	MarkerClusterer,
	Marker,
	ScriptLoaded,
} from "@react-google-maps/api";
import { userData } from "../helpers/usersData"
import { Circle } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { useState } from "react";
import axios from "axios";

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
  const listImages = listings.map((listing) => listing.images[0])
	const [spot, setSpot] = useState({})
	const [error, setError] = useState()
	const [loading, setLoading] = useState()

	const options = {
		// imagePath: listImages,
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
		imagePath:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
		// so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
	};
	function createKey(location) {
		return location.lat + location.lng;
	}
 
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
					listings.map((listing) => 
             (
              <Marker 
							// key={createKey(listing.address.coordinates)} 
							position={listing.address.coordinates} 
							clusterer={clusterer} 
							onClick={onClick}	/>
				// 			<OverlayView
				// 	position={center}
				// 	mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
				// 	key={createKey(listing.address.coordinates)} 
				// 	position={listing.address.coordinates} 
				// 	clusterer={clusterer} 
				// 	onClick={onClick}
				// >
				// 	<div style={divStyle}>
				// 		<h1>OverlayView</h1>

				// 	</div>
				// </OverlayView>
            ))
          }
        </MarkerClusterer>

			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(Map);



// import Geocode from "react-geocode";

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I");

// // set response language. Defaults to english.
// Geocode.setLanguage("en");

// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("ca");

// // set location_type filter . Its optional.
// // google geocoder returns more that one address for given lat/lng.
// // In some case we need one address as response for which google itself provides a location_type filter.
// // So we can easily parse the result for fetching address components
// // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// Geocode.setLocationType("APPROXIMATE");

