// Import React Components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  // Pull in the login and setUser functions and the current user info
  const { login, setUser, user } = props;

  // Set the initial state of the user with the info passed in with user
  const initialUserState = {
    userId: user.userId,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
    address: user.address,
    host: user.host,
    listing_ids: user.listing_ids,
  };

  // State variable to record changes made in the form
  const [newUser, setNewUser] = useState(initialUserState);

  // Handles the input change for both the username and password form fields
  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handles the Sign in button click
  const handleOnClick = () => {
    login(setUser, newUser);
  };

  return (
    <div className='submit-form d-flex justify-content-center'>
      <div className='text-center'>
        <div className='form-group mb-3'>
          <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            className='form-control'
            id='email'
            required
            value={newUser.email}
            onChange={handleInputChange}
            placeholder='Email Address'
            name='email'
          />
        </div>
        <div className='form-group mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            required
            value={newUser.password}
            onChange={handleInputChange}
            placeholder='Password'
            name='password'
          />
        </div>

        <Link to='/'>
          <button
            onClick={handleOnClick}
            className='btn btn-lg btn-outline-dark btn-block'
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
