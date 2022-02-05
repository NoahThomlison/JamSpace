import Ad from './Ad.js';
import {Container, Grid, Item} from '@mui/material/';

function Adlist(props) {
  const ads = props.data
  console.log(ads)
  return (
    <Container>
      <Grid container spacing={2}>
        {ads.map((ad) => {
          return (
            <Ad images={ad.images} price={ad.price} description = {ad.description} title = {ad.title}/>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Adlist;
