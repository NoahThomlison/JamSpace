import * as React from 'react';
import Question from "./Question"
import {Grid, Box, Paper, Button, Container, Typography} from '@mui/material/';
import renterQuestions from '../renterQuestionsData'
import lenderQuestions from '../lenderQuestionsData'

function Questions() {


  return (
    <Container sx={{marginTop: "30px"}}>
        <Typography variant="h4" sx={{textAlign: "center"}}>How does it work?</Typography>
        <Box sx={{display: "flex"}}>
          <Paper sx={{width: "100%"}}>
            <Typography variant="h5" sx={{textAlign: "center",  textDecoration: "underline"}}>For Jammers</Typography>
            {renterQuestions.map(question => 
            <Question key={question.id} {...question}/>
            )}
          </Paper>
          <Paper sx={{width: "100%"}}>
          <Typography variant="h5" sx={{textAlign: "center",  textDecoration: "underline"}}>For Lenders</Typography>
            {lenderQuestions.map(question => 
            <Question key={question.id} {...question}/>
            )}
          </Paper>
        </Box>
    </Container>
  )
}

export default Questions;
