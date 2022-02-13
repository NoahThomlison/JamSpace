import * as React from 'react';
import Question from "./Question"
import {Grid, Box, Paper, Button, Container, Typography} from '@mui/material/';
import renterQuestions from '../staticData/renterQuestionsData'
import lenderQuestions from '../staticData/lenderQuestionsData'

function Questions() {

  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{paddingBottom: "20px"}}>How does it work?</Typography>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Box sx={{width: "45%"}}>
            <Typography variant="h5" sx={{textAlign: "center",  textDecoration: "underline"}}>Wanna Jam?</Typography>
            {renterQuestions.map(question => 
            <Question key={question.id} {...question}/>
            )}
          </Box>
          <Box sx={{width: "45%"}}>
          <Typography variant="h5" sx={{textAlign: "center",  textDecoration: "underline"}}>Want some Space?</Typography>
            {lenderQuestions.map(question => 
            <Question key={question.id} {...question}/>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Questions;