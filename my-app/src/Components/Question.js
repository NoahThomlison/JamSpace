import * as React from 'react';
import {useState} from "react";
import {Card, Button, Typography, Grid, Paper, IconButton, Box} from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Question = ( props ) => {
  const { id, question, answer } = props;
  const [expanded, setExpanded] = useState(false)

  const toggleExpaned = () => {
    setExpanded(!expanded)
  }

  return (
    <Box>
      <Box component="div" sx={{ display: 'flex', justifyContent: 'flexStart', alignItems: 'center',width: "90%"}}>
        <Typography>{question}</Typography>
        <IconButton variant="contained" onClick={() => toggleExpaned()}>{expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</IconButton>
        </Box>
          <Box component="div" sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center',width: "90%"}}>
          {expanded ? <Typography>{answer}</Typography>:<Typography></Typography>}
        </Box>
    </Box>
  )
}

export default Question;

