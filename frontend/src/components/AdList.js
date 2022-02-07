import Ad from './Ad.js';
import {Box, Container, Grid, Item, ImageList } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useState, useEffect} from "react"
import '../App.css';


import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


function AdList(props) {
  let adCount = 6
  const { listings, setListings } = props;
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(adCount)
  const [ads, setAds] = useState(listings.slice(min, max))
  let slideCount = Math.ceil(listings.length/adCount)

  useEffect(() => {
    setAds(listings.slice(min, max));
  }, [min, max, listings]);

  const next = () => {
    setMin(min+adCount)
    setMax(max+adCount)
  }

  const previous = () => {
    setMin(min-adCount)
    setMax(max-adCount)
  }
 
  return (
    <Container sx={{marginTop: 10, height: 300, maxWidth: 1, maxHeight: 1, display:"flex", justifyContents:"center", alignItems:"center"}}>
          {min/adCount > 0 ? 
      <IconButton onClick={() => {previous()}}><ArrowBackIosIcon color="primary" /></IconButton > : 
      <IconButton ><ArrowBackIosIcon color="disabled"/></IconButton>}
      <ImageList cols={6} rows={2}>
        {ads.map((ad) => {
          return (
            <Ad id={ad._id.$oid} images={ad.images} price={ad.price} description = {ad.description} title = {ad.title}/>
          )
        })}
      </ImageList>
      {max/adCount >= slideCount ? 
      <IconButton ><ArrowForwardIosIcon color="disabled"/></IconButton > : 
      <IconButton onClick={() => next()}><ArrowForwardIosIcon color="primary"/></IconButton >}
    </Container>
  )
}

export default AdList;