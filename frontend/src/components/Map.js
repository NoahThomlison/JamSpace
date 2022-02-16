import React, { useEffect } from "react";
import {
	GoogleMap,
	LoadScript,
	OverlayView,
	MarkerClusterer,
	Marker,
	ScriptLoaded,
	Circle
} from "@react-google-maps/api";

import { Container, Typography, Select, Box } from "@mui/material"

const containerStyle = {
	width: "100%",
	height: "400px",
};

const divStyle = {
	background: "white",
	border: "1px solid #ccc",
	padding: 15,
};

function Map(props) {
	const { listings, setListings } = props;

  const listImages = listings.map((listing) => listing.image)

	const options = {
		imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'

	};
	function createKey(location) {
		return location.lat + location.lng;
	}
	const singleAd = listings.length === 1;
	const center = (singleAd ? listings[0].address.coordinates : { lat: 50, lng: -90 })
 
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
		<Container>
			<LoadScript
				googleMapsApiKey="AIzaSyAHC8XSAh1MI8qao7LNHuOqrc3-RIJjs-I"
				// width= "100%"
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={singleAd ? 10 : 4}
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
		</Container>
	);
}

export default React.memo(Map);
