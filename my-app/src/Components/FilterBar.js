import {Card, CardActions, Container, CardContent, CardMedia, CardHeader, Button, Grid, Typography} from '@mui/material/';

function FilterBar() {
  return (
    <Container maxWidth={"xl"}>
      <Typography variant="h4">Shop by</Typography>
      <Button variant="contained">Instrument</Button>
      <Button variant="contained">Availabiltiy</Button>
      <Button variant="contained">Location</Button>
      <Button variant="contained">Prices</Button>
  </Container>
  )
}

export default FilterBar;
