import './App.css';
import AdList from './Components/AdList';
import FilterBar from './Components/FilterBar';
import Questions from './Components/Questions'
import Header from './Components/Header'
import data from './data';
import heroImage from "./images/thehitsBW.jpg"
import {Box, Paper} from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hero: {
    height: '75vh',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
});


function App() {
  const styles = useStyles()
  return (
    <Box>
      <Header></Header>
      <Box className={styles.hero}/>
      <Questions></Questions>
      <FilterBar/>
      <AdList data = {data}/>
    </Box>
  );
}

export default App;
