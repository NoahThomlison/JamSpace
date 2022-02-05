import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, CardHeader, Button, Grid, Typography} from '@mui/material/';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

function Ad({description, title, price, images}) {
  const image = images[0]
  const daily = price.daily.$numberInt
  const weekly = price.weekly.$numberInt
  const monthly = price.monthly.$numberInt
  const subheader = "D:$" + daily + "W:$" + weekly + "M:$" +monthly
  
  // return (
  //   <Grid item >
  //     <Card sx={{ maxWidth: 345 }}>
  //       <CardMedia
  //         component="img"
  //         height="250"
  //         image="https://picsum.photos/id/1025/200/175.jpg"
  //       />
  //       <CardContent>
  //         <CardHeader
  //         title={title}
  //         subheader={subheader}
  //         />
  //         <Typography variant="body2" color="text.secondary">
  //           {description}
  //         </Typography>
  //       </CardContent>
  //     </Card>
  //   </Grid>
  // );

  return(
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={6}>
      </ImageListItem>
        <ImageListItem key="https://picsum.photos/id/1025/200/175.jpg">
          <img
            src={"https://picsum.photos/id/1025/200/175.jpg?w=248&fit=crop&auto=format"}
            srcSet={"https://picsum.photos/id/1025/200/175.jpg?w=248&fit=crop&auto=format"}
            alt={title}
            loading="lazy"
          />
          <ImageListItemBar
            title={title}
            subtitle="Noah"
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
    </ImageList>
  )
}

export default Ad;
