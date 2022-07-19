# JamSpace

JamSpace is an online marketplace that connects people with musical instruments they want to rent out to people who want to rent instruments.

This can be person to person, band (especially touring bands), organization (recording studio), and so on.

This app was built by [Brett](https://github.com/bbjarvis), [Noah](https://github.com/NoahThomlison) and [Tyler](https://github.com/TylerJEShelton) as our final project for the [Lighthouse Labs Web Development Flex Progam](https://www.lighthouselabs.ca/en/web-development-flex-program).

## Screenshots

### Home Page

!["JamSpace Home Page"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/Home.png?raw=true)

### Home Page Listings

!["JamSpace Home Page Listings"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/Home_Screen_Carousel.png?raw=true)

### Filtered Home Page Listings

!["JamSpace Home Page Listings"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/Filtered_Home_Screen_Carousel.png?raw=true)

### Create a Listing

!["JamSpace Create a Listing"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/Create_a_Listing.png?raw=true)

### My Profile

!["JamSpace My Profile"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/My_Profile.png?raw=true)

### Delete a Listing

!["JamSpace Delete a Listing"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/Delete_a_Listing.png?raw=true)

### Listings

!["JamSpace Listings"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/Listings.png?raw=true)

### Booking an Instrument

!["JamSpace Booking an Instrument"](https://github.com/TylerJEShelton/JamSpace/blob/master/screenshots/Booking_an_Instrument.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` in both the frontend and backend folders.
2. Update the .env file in the backend folder with the correct db info (must have mongodb set up)
   - INSTRUMENTLISTINGS_DB_URI=<your mongo db connect link>
   - INSTRUMENTLISTINGS_NS=<mongo db name>
   - PORT=<port #>
3. Update the .env file in the frontend folder with the correct Google API Key
   - REACT_APP_YOUR_API_KEY=<your google api key>
4. Install dependencies for both the frontend and the backend: `npm install`
5. Run the server in backend folder: `nodemon server`

- Note: nodemon is used, so you should not have to restart your server

6. Visit `http://localhost:5000/`
7. Run the client in frontend folder: `npm start`
8. Visit `http://localhost:3000/`
