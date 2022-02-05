import * as React from 'react';
import {useState} from "react";
import {Card, Button, Typography, Grid, Paper, IconButton, Box, Accordion, AccordionSummary, AccordionDetails} from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Question = ( props ) => {
  const { id, question, answer } = props;
  const [expanded, setExpanded] = useState(false)

  const toggleExpaned = () => {
    setExpanded(!expanded)
  }

  return (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>{question}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {answer}
      </Typography>
    </AccordionDetails>
  </Accordion>
  )
}

export default Question;


