import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
