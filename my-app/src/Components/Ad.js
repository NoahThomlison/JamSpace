import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Ad({description, title, price, images}) {
  const image = images[0]
  const daily = price.daily.$numberInt
  const weekly = price.weekly.$numberInt
  const monthly = price.monthly.$numberInt
  const subheader = "D:$" + daily + "W:$" + weekly + "M:$" +monthly
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="250"
        image="https://picsum.photos/id/1025/200/175.jpg"
      />
      <CardContent>
        <CardHeader
        title={title}
        subheader={subheader}
        />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Ad;

{/* <Card sx={{ maxWidth: 345 }}>
<CardMedia
  component="img"
  height="250"
  image="https://picsum.photos/id/1025/200/175.jpg"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="div">
{title}
</Typography>
<Typography gutterBottom variant="body1" color="text.secondary">
D:${daily}/W:${weekly}/M:${monthly}
</Typography>
<Typography variant="body2" color="text.secondary">
  {description}
</Typography>
</CardContent>
</Card> */}
