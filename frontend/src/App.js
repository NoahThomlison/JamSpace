import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import Custom Components
import AdListings from './components/ad-listings';
import Login from './components/login';
import Ad from './components/ad';
import CreateListing from './components/create-listing';
import Home from './components/home';

//Import Listing Database Call
import ListingData from './helpers/ListingData';
import Footer from './components/Footer/Footer';

function App() {
  const [user, setUser] = useState('');

  const [listings, setListings] = useState([]);

  useEffect(() => {
    ListingData(setListings);
  }, []);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

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
              {user ? (
                <a
                  onClick={logout}
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
          <Route path='/listings/:id' element={<Ad user={user} />} />
          <Route path='/login' element={<Login login={login} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
