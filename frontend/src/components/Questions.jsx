import * as React from 'react';
import Question from "./Question"
import {Box, Container, Typography} from '@mui/material/';
import renterQuestions from '../staticData/renterQuestionsData'
import lenderQuestions from '../staticData/lenderQuestionsData'

function Questions() {

  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{paddingBottom: "20px", fontWeight: "800"}}>How does it work?</Typography>
        <hr></hr>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Box sx={{width: "45%"}}>
            <Typography variant="h5" sx={{textAlign: "center"}}>Wanna Jam?</Typography>
            {renterQuestions.map(question => 
            <Question key={question.id} {...question}/>
            )}
          </Box>
          <Box sx={{width: "45%"}}>
          <Typography variant="h5" sx={{textAlign: "center"}}>Want some Space?</Typography>
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