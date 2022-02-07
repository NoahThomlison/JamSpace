import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, CardHeader, Button, Grid, Typography, Container} from '@mui/material/';
import '../App.css';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

function Ad({id, description, title, price, images, key}) {
  console.log({price})
  const image = images[0]
  const daily = price.daily
  const weekly = price.weekly
  const monthly = price.monthly
  const subheader = "D:$" + daily + "W:$" + weekly + "M:$" +monthly

  return(
        <ImageListItem key={key}>
          <img src={image} loading="lazy" alt={title} id={id} sx={{height:"100%", width:"auto"}}/>
        <ImageListItemBar title={title} subtitle={subheader}/>
      </ImageListItem>
  )
}

export default Ad;