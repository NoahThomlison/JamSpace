import Ad from './Ad.js';
import Container from '@mui/material/Typography';

function Adlist(props) {
  const ads = props.data
  console.log(ads)
  return (
    ads.map((ad) => {
      return (
        <Container>
          <Ad images={ad.images} description = {ad.description} title = {ad.title}/>
        </Container>
      )
    })
  )
}

export default Adlist;
