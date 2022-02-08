import * as React from 'react';
import { NavLink } from 'react-router-dom';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function Ad({ad, id, description, title, price, images, key}) {
  const image = images[0]
  const daily = price.daily
  const weekly = price.weekly
  const monthly = price.monthly
  const subheader = "D:$" + daily + "W:$" + weekly + "M:$" +monthly
 
  return(
    <NavLink to={`/listings/${id}`} className='nav-link'>
        <ImageListItem key={key}>
        <img src={image} loading="lazy" id={id} sx={{height:"100%",width:"auto"}}/>
        <ImageListItemBar title={title} subtitle={subheader}/>
      </ImageListItem>
    </NavLink>
  )
}

export default Ad;
