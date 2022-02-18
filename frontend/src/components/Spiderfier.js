import React, { useState } from "react";


function Spiderfier(props) {
	const { listings, setListings } = props;
  

  const uniqueCoords = listings
    .map(listing => listing.address.coordinates.lat) // get all coords
    .filter((uniqueCoord, index, array) => array.indexOf(uniqueCoord) === index); // filter out duplicates
  
  const counts = uniqueCoords
    .map(uniqueCoord => ({
      lat: uniqueCoord,
      count: listings.filter(item => item.address.coordinates.lat === uniqueCoord).length
    }))
    .filter((unique)=> unique.count > 1);
    //     listings.map(listing, index => {
    //       if (counts.find(element => element.lat === listing.address.coordinates.lat)) {
    //         const last = listing.address.coordinates.lat
    //         setListings(...prevlistings, listing.address.coordinates.lat = listing.address.coordinates.lat + addCoords ) :
    //         listing
    //         addCoords+=.000001
    //       }
    //     })
    // const tester = {}
    // counts.map((item, index) => {
    //   // tester[index] = 
    //   const addCoords = 0.000001
    //   tester =
    //   listings.map((listing, index) => {listing.address.coordinates.lat === item.lat ? 
    //   setListings(prev =>  ({...prev,
    //     ...prev[index].address.coordinates.lat + addCoords })) :
    //     false})
    //     addCoords+=.000001
    //   // tester[index] = listings.find(listing => listing.address.coordinates.lat === item.lat) 
        
    //     // const last = listing.address.coordinates.lat
    //     // setListings(...prevlistings, listing.address.coordinates.lat = listing.address.coordinates.lat + addCoords ) :
    //     // listing
    //     // addCoords+=.000001
      
    // })
  
    // counts = counts.map(multi => ({

    // }))
    // console.log(uniqueCoords)

   return counts


}
export default Spiderfier;
