
import React from "react";
import {
	GoogleMap,
	LoadScript,
	OverlayView,
	MarkerClusterer,
	Marker,
	ScriptLoaded,
} from "@react-google-maps/api";

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

  const listImages = listings.map((listing) => listing.image)

	const options = {
		imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'

	};
	function createKey(location) {
		return location.lat + location.lng;
	}
  const locations = 
[
	{ lat: 51.56391, lng: -87.154312 },
	{ lat: 53.718234, lng: -90.363181 },
	{ lat: 53.727111, lng: -90.371124 },
	{ lat: 53.848588, lng: -91.209834 },
	{ lat: 53.851702, lng: -91.216968 },
	{ lat: 54.671264, lng: -90.863657 },
	{ lat: 55.304724, lng: -88.662905 },
	{ lat: 49.217685, lng: -122.699196 },
	{ lat: 49.228611, lng: -122.790222 },
	{ lat: 51.75, lng: -85.116667 },
	{ lat: 51.759859, lng: -85.128708 },
	{ lat: 51.765015, lng: -85.133858 },
	{ lat: 51.770104, lng: -85.143299 },
	{ lat: 51.7737, lng: -85.145187 },
	{ lat: 51.774785, lng: -85.137978 },
	{ lat: 51.819616, lng: -84.968119 },
	{ lat: 52.330766, lng: -84.695692 },
	{ lat: 53.927193, lng: -85.053218 },
	{ lat: 51.330162, lng: -84.865694 },
	{ lat: 52.734358, lng: -87.439506 },
	{ lat: 52.734358, lng: -87.501315 },
	{ lat: 52.735258, lng: -87.438 },
	{ lat: 49.104178, lng: -122.660352 },
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