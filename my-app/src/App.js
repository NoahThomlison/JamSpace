import './App.css';
import AdList from './Components/AdList';
import FilterBar from './Components/FilterBar';
import data from './data';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {

  return (
    <home>
    <h1>JamSpace</h1>
    <img src="https://blog.reverbnation.com/wp-content/uploads/2017/12/why-your-band-needs-to-practice-1500px.jpg"></img>
    <div>
      <FilterBar/>
      <AdList data = {data}/>
    </div>
    </home>
  );
}

export default App;
