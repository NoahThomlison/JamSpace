import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Typography';

function FilterBar() {
  return (
    <Container>
      <Typography>Shop by</Typography>
      <Button variant="contained">Instrument</Button>
      <Button variant="contained">Availabiltiy</Button>
      <Button variant="contained">Location</Button>
      <Button variant="contained">Prices</Button>
  </Container>
  )
}

export default FilterBar;
 