// Import React Components
import { useState, useEffect } from 'react';

// Import Custom Components
import Ad from './Ad.jsx';

// Import Material UI
import { Container, ImageList } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';

// Import Custom Styles
import '../App.css';

const AdList = props => {
  const { listings } = props;

  // adCount determines how many listings are displayed on each carousel page
  let adCount = 15;
  let slideCount = Math.ceil(listings.length / adCount);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(adCount);
  const [ads, setAds] = useState(listings.slice(min, max));

  useEffect(() => {
    setAds(listings.slice(min, max));
  }, [min, max, listings]);

  const next = () => {
    setMin(min + adCount);
    setMax(max + adCount);
  };

  const previous = () => {
    setMin(min - adCount);
    setMax(max - adCount);
  };

  return (
    <Container
      sx={{
        maxWidth: 1,
        maxHeight: 1,
        display: 'flex',
        justifyContents: 'center',
        alignItems: 'center',
      }}
    >
      {min / adCount > 0 ? (
        <IconButton
          onClick={() => {
            previous();
          }}
        >
          <ArrowBackIosIcon color='primary' />
        </IconButton>
      ) : (
        <IconButton>
          <ArrowBackIosIcon color='disabled' />
        </IconButton>
      )}
      <ImageList cols={5} rows={3}>
        {ads.map(ad => {
          return (
            <Ad
              ad={ad}
              id={ad._id}
              images={ad.images}
              price={ad.price}
              description={ad.description}
              title={ad.title}
            />
          );
        })}
      </ImageList>
      {max / adCount >= slideCount ? (
        <IconButton>
          <ArrowForwardIosIcon color='disabled' />
        </IconButton>
      ) : (
        <IconButton onClick={() => next()}>
          <ArrowForwardIosIcon color='primary' />
        </IconButton>
      )}
    </Container>
  );
};

export default AdList;
