import * as React from 'react';
import Question from "./Question"
import {Grid, Box, Paper, Button, Container, Typography} from '@mui/material/';
import renterQuestions from '../staticData/renterQuestionsData'
import lenderQuestions from '../staticData/lenderQuestionsData'

function Questions() {

  return (
    <Container sx={{marginTop: "30px"}}>
        <Typography variant="h4" sx={{textAlign: "center"}}>How does it work?</Typography>
        <Box sx={{display: "flex"}}>
          <Paper sx={{width: "100%"}}>
            <Typography variant="h5" sx={{textAlign: "center",  textDecoration: "underline"}}>Wanna Jam?</Typography>
            {renterQuestions.map(question => 
            <Question key={question.id} {...question}/>
            )}
          </Paper>
          <Paper sx={{width: "100%"}}>
          <Typography variant="h5" sx={{textAlign: "center",  textDecoration: "underline"}}>Want some Space?</Typography>
            {lenderQuestions.map(question => 
            <Question key={question.id} {...question}/>
            )}
          </Paper>
        </Box>
    </Container>
  )
}

export default Questions;
