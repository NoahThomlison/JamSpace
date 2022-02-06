import Ad from './Ad.js';
import {Box, Container, Grid, Item, ImageList } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useState, useEffect} from "react"


import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


function Adlist(props) {

  let adCount = 6
  let slideCount = Math.ceil(props.data.length/adCount)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(adCount)
  const [ads, setAds] = useState(props.data.slice(min, max))

  useEffect(() => {
    setAds(props.data.slice(min, max));
  }, [min, max, props.data]);

  const next = () => {
    setMin(min+adCount)
    setMax(max+adCount)
  }

  const previous = () => {
    setMin(min-adCount)
    setMax(max-adCount)
  }
 
  return (
    <Container sx={{display:"flex", justifyContents:"center", alignItems:"center"}}>
          {min/adCount > 0 ? 
      <IconButton onClick={() => {previous()}}><ArrowBackIosIcon color="primary" /></IconButton > : 
      <IconButton ><ArrowBackIosIcon color="disabled"/></IconButton >}
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

export default Adlist;