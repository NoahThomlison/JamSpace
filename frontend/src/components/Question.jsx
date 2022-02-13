import * as React from 'react';
import {useState} from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails} from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Question = ( props ) => {
  const { question, answer } = props;
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
    <AccordionDetails sx={{ display: 'flex', justifyContent: 'flex-end' }} >
      <Typography sx={{ width: "95%" }}>
        {answer}
      </Typography>
    </AccordionDetails>
  </Accordion>
  )
}

export default Question;


