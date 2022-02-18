import React, { useState } from "react";
import {
	GoogleMap,
	LoadScript,
	OverlayView,
	MarkerClusterer,
	Marker,
} from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Select, Box } from "@mui/material"
import Spiderfier from "./Spiderfier";


import drums from "./icons/drums.jpg"
import keyboard from "./icons/keyboard.jpg"
import bass from "./icons/bass.jpg"
import acoustic from "./icons/acoustic.jpg"
import electric from "./icons/electric.jpg"

const containerStyle = {
	width: "100%",
	height: "400px",
};

const divStyle = {
	background: "white",
	border: "1px solid #ccc",
	padding: 15,
};

const icons = {  
'Drums': drums,
'Acoustic Guitar': acoustic,
'Bass Guitar': bass,
'Electric Guitar': electric,
'Keyboard': keyboard,
}

function Map(props) {
	const { listings, setListings } = props;
	const spiderfy = Spiderfier(props)
	console.log(spiderfy)

	const options = {
		imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
	};
	function createKey(location) {
		return location.lat + location.lng;
	}
	const singleAd = listings.length === 1;
	const center = (singleAd ? listings[0].address.coordinates : { lat: 50, lng: -90 })
	const navigate = useNavigate()
	const toListing = (listing, index) => {
		navigate(`/listings/${listing._id}`)
};
// const showListing = (listing, index) => {
// return (<OverlayView
// 				position={listing.address.coordinates}
// 				mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
// 				onClick={toListing}
// 			>
// 				<div style={divStyle}>
// 					<h1> {listing.title} </h1>
// 				</div>
// 			</OverlayView>)

// };

const deCluster = (listing, index) => {
	// console.log(listing.address.coordinates.lat + index/10000)
	// console.log(index % 4)
	let latIndex = 0
	let lngIndex = 0
	if (index % 4 === 0) {latIndex = index; lngIndex = index}
	else if (index % 4 === 1) {latIndex = -index; lngIndex = index}
	else if (index % 4 === 2) {latIndex = index; lngIndex = -index}
	latIndex = index; lngIndex = index
	const spidered = {lat:listing.address.coordinates.lat + latIndex/10, lng: listing.address.coordinates.lng + lngIndex/10}
	return spidered

}
	return (
		<Container>
			<LoadScript
				googleMapsApiKey="AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I"
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={singleAd ? 10 : 4}
    	    id='marker-example'
				>
    	    <MarkerClusterer options={options}>
    	      {(clusterer) =>
						listings.map((listing, index) => 
    	          <Marker
								className="photo"
								key={createKey(listing.address.coordinates)}
								position={deCluster(listing, index)}
								clusterer={clusterer}
								onClick={() => toListing(listing, index)}
								icon={icons[listing.instrument_type]}
								/>
    	        )
    	      }
    	    </MarkerClusterer>
				</GoogleMap>
			</LoadScript>
		</Container>
	);
}

export default React.memo(Map);
