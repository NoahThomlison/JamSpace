// Import React Components/Hooks
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import Custom Components
import IndividualAd from './components/IndividualAd';
import AdListings from './components/AdListings';
import CreateListing from './components/CreateListing';
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer/Footer';
import Booking from './components/Booking';

//Import Listing Database Call Helper Function
import listingsData from './helpers/listingsData';

//Import Autentication Helper Functions
import { login, logout } from './helpers/authentication';

function App() {
  // State Initializers
  const initialUserState = {
    username: '',
    password: '',
    // HARD CODED IN USER ID UNTIL USER DB IS CONNECTED
    userId: '61fc9dcb934a52db529c8f94',
  };

  // State Variables
  const [user, setUser] = useState(initialUserState);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    listingsData(setListings);
  }, []);

  return (
    <div>
      <nav className='navbar sticky-top navbar-expand navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link to={'/'} className='nav-link'>
            <div className='navbar-brand'>JamSpace</div>
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/listings'} className='nav-link'>
                Listings
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/listings/new'} className='nav-link'>
                New Listing
              </Link>
            </li>
            <li className='nav-item'>
              {/* If a username is set, show Logout, otherwise show the Login Link */}
              {user.username !== '' ? (
                <a
                  onClick={() => logout(setUser)}
                  href='/login'
                  className='nav-link'
                  style={{ cursor: 'pointer' }}
                >
                  Logout {user.username}
                </a>
              ) : (
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              )}
            </li>
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route
            path={'/'}
            element={
              <Home listings={listings} setListings={setListings} user={user} />
            }
          />
          <Route
            path={'/listings'}
            element={
              <AdListings
                listings={listings}
                setListings={setListings}
                user={user}
              />
            }
          />
          <Route path='/listings/new' element={<CreateListing user={user} />} />
          <Route path='/listings/:id' element={<IndividualAd user={user} />} />
          <Route
            path='/login'
            element={<Login login={login} setUser={setUser} user={user} />}
          />
          <Route path='/listings/book' element={<Booking user={user} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
