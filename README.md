# JamSpace
Online marketplace that connects people with musical instruments they want to rent out to people who want to rent instruments. 

This can be person to person, band (especially touring bands), organization (recording studio), and so on. 

Apart from connecting musicians, we add value through an insurance program so that when "life happens", no one is left holding the bag

## Getting Started

1. Create the `.env` by using `.env.example` 
2. Update the .env file with the correct db info (must have mongodb set up)
    - INSTRUMENTLISTINGS_DB_URI=<your mongo db connect link>
    - INSTRUMENTLISTINGS_NS=<mongo db name>
    - PORT=5000
3. Install dependencies for each of frontend and backend: `npm install`
4. Run the server in backend folder: `nodemon server`
  - Note: nodemon is used, so you should not have to restart your server
5. Visit `http://localhost:5000/`
6. Run the client in frontend folder: `npm start`
7. Visit `http://localhost:3000/`
