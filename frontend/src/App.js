// Import React Components/Hooks
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
import UserProfile from './components/UserProfile';

// Import Images
import logoWhiteHorizontal from './images/logoWhiteHorizontal.png';

//Import Listing Database Call Helper Function
import listingsData from './helpers/listingsData';

//Import Users Database Call Helper Function
import { userData } from './helpers/usersData';

//Import Autentication Helper Functions
import { login, logout } from './helpers/authentication';

function App() {
  const [cookies, setCookies, removeCookie] = useCookies(['id']);

  // State Initializers
  const initialUserState = {
    userId: cookies.id || '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: {},
    host: null,
    listing_ids: [],
  };

  const [user, setUser] = useState(initialUserState);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    listingsData(setListings);
  }, []);

  useEffect(() => {
    if (cookies.id) {
      userData(setUser, cookies.id);
    }
  }, [cookies.id]);

  const handleCookie = value => {
    setCookies('id', value, {
      path: '/',
    });
  };

  const destroyCookie = () => {
    removeCookie('id');
  };

  return (
    <div>
      <nav className='navbar sticky-top navbar-expand navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link to={'/'} className='nav-link'>
            <div className='navbar-brand'>
              <img className='logo' src={logoWhiteHorizontal}></img>
            </div>
          </Link>
          <div className='navbar-nav mr-auto left'>
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
            {/* If a user is set, show Logout and My Profile, otherwise show the Login Link */}
            {user.email !== '' ? (
              <>
                <li className='nav-item'>
                  <Link to={'/user'} className='nav-link'>
                    My Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <a
                    onClick={() => logout(setUser, destroyCookie)}
                    href='/login'
                    className='nav-link'
                    style={{ cursor: 'pointer' }}
                  >
                    Logout {user.first_name}
                  </a>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>
            )}
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
          <Route
            path='/listings/new'
            element={<CreateListing user={user} setUser={setUser} />}
          />
          <Route path='/listings/:id' element={<IndividualAd user={user} />} />
          <Route
            path='/login'
            element={
              <Login
                login={login}
                handleCookie={handleCookie}
                setUser={setUser}
                user={user}
              />
            }
          />
          <Route path='/listings/book' element={<Booking user={user} />} />
          <Route
            path='/user'
            element={
              <UserProfile
                user={user}
                listings={listings}
                setListings={setListings}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
