import Container from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

function Ad(props) {
  const {description, title, price, images} = props
  const image = images[0]
  return (
    <Container>
      <img src={image}></img>
      <Typography>{title}</Typography>
      <Typography>{description}</Typography>
      <Typography>{price}</Typography>  
    </Container>
  );
}

export default Ad;
