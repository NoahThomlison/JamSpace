// Import React Components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  // Pull in the login and setUser functions and the current user info
  const { login, handleCookie, setUser, user } = props;

  // Set the initial state of the user with the info passed in with user
  const initialUserState = {
    email: user.email,
    password: user.password,
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
    login(setUser, newUser, handleCookie);
  };

  return (
    <div className='submit-form d-flex justify-content-center my-5'>
      <div className='text-center my-5'>
        <div className='form-group mb-3'>
          <h1 className='h3 mb-3 font-weight-normal'>Please Sign In</h1>
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

        <Link to='/user'>
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
