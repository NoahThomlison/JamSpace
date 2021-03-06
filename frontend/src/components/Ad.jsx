// Import React Components
import * as React from 'react';
import { NavLink } from 'react-router-dom';

// Import Material UI
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

// The Ad component is each individual listing in the carousel on the home page
const Ad = props => {
  const { id, title, price, images, key } = props;

  //  Get the first image from the images array
  const image = images[0];
  const daily = price.daily;
  const weekly = price.weekly;
  const monthly = price.monthly;

  // subheader is the text under the listing description on each ad in the carousel
  const subheader = `D: $${daily} - W: $${weekly} - M: $${monthly}`;

  return (
    <NavLink to={`/listings/${id}`} className='nav-link px-1'>
      <ImageListItem key={key}>
        <div style={{ height: '10rem' }} className='text-center'>
          <img
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            src={image}
            loading='lazy'
            id={id}
            alt='Instrument'
          />
          <ImageListItemBar title={title} subtitle={subheader} />
        </div>
      </ImageListItem>
    </NavLink>
  );
};

export default Ad;
