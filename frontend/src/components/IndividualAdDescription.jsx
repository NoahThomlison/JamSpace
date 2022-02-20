// Import React Components/Hooks
import React, { useEffect, useState } from 'react';

// Import Material UI
import { Container, Typography, Select, Box, Button, TextField, Paper} from "@mui/material"

const IndividualAdDescription = props => {
  const maxLength = 2000;
  const {listing} = (props);

  return (
    <Box sx={{display:"flex", flexDirection:"column", width: "100%", padding: "5px"}}>
      {listing.description.length > maxLength ? 
      <TextField variant="standard" label="Description" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} multiline value={`${listing.description.substring(0,  maxLength)}...`}>
      </TextField>
      :
      <TextField variant="standard" label="Description" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} multiline value={listing.description}>
      </TextField> 
      }
      <Box>
        <Box sx={{display:"flex", justifyContent: "space-between",}}>
          <TextField variant="standard" label="Type" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} value={listing.instrument_type}/>              
          <TextField variant="standard" label="Brand" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} value={listing.brand}/>              
          <TextField variant="standard" label="Condition" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} value={listing.condition}/>     
          <TextField variant="standard" label="Location" value={`${listing.address.city}, ${listing.address.province}`}/> 
        </Box>
        <Box sx={{display:"flex", justifyContent: "space-between",}}>
          <TextField variant="standard" label="Daily Price" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} value={`$${listing.price.daily}`}/>              
          <TextField variant="standard" label="Weekly Price" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} value={`$${listing.price.weekly}`}/>       
          <TextField variant="standard" label="Montly Price" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} value={`$${listing.price.monthly}`}/> 
          <TextField variant="standard" label="Deposit" InputLabelProps={{shrink: true}} InputProps={{readOnly: true}} value={`$${listing.security_deposit}`}/> 
        </Box>
      </Box> 
    </Box>
  )
}

export default IndividualAdDescription