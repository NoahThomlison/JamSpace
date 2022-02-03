import Ad from './Ad.js';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Adlist(props) {
  const ads = props.data
  console.log(ads)
  return (
    ads.map((ad) => {
      return (
        <Grid>
          <Ad images={ad.images} price={ad.price} description = {ad.description} title = {ad.title}/>
        </Grid>
      )
    })
  )
}

export default Adlist;
