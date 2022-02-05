import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  // HARD CODED IN USER ID UNTIL USER DB IS CONNECTED
  const initialUserState = {
    username: '',
    password: '',
    userId: '61fc9dcb934a52db529c8f94',
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
  };

  return (
    <div className='submit-form d-flex justify-content-center'>
      <div className='text-center'>
        <div className='form-group mb-3'>
          <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            className='form-control'
            id='username'
            required
            value={user.username}
            onChange={handleInputChange}
            placeholder='Username'
            name='username'
          />
        </div>
        <div className='form-group mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            required
            value={user.password}
            onChange={handleInputChange}
            placeholder='Password'
            name='password'
          />
        </div>

        <Link to='/'>
          <button
            onClick={login}
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
