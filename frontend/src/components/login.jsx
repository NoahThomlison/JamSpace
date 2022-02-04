import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  const initialUserState = {
    name: '',
    password: '',
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
    <div className='submit-form'>
      <div>
        <div className='form-group'>
          <label htmlFor='user'>Username</label>
          <input
            type='text'
            className='form-control'
            id='name'
            required
            value={user.name}
            onChange={handleInputChange}
            name='name'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            required
            value={user.password}
            onChange={handleInputChange}
            name='password'
          />
        </div>
        <Link to='/'>
          <button onClick={login} className='btn btn-success'>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
