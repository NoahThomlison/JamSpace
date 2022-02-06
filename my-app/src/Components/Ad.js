import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, CardHeader, Button, Grid, Typography, Container} from '@mui/material/';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';

function Ad({id, description, title, price, images, key}) {
  const image = images[0]
  const daily = price.daily.$numberInt
  const weekly = price.weekly.$numberInt
  const monthly = price.monthly.$numberInt
  const subheader = "D:$" + daily + "W:$" + weekly + "M:$" +monthly
  
  // const style = 
  return(
      <ImageListItem key={key} onClick={() => alert(id)}>
        <img src={image} loading="lazy" alt={title} id={id} sx={{height:500}}/>
        <ImageListItemBar title={title} subtitle={subheader}/>
      </ImageListItem>
  )
}

export default Ad;
