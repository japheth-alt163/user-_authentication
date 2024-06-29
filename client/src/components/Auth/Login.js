// src/components/Auth/Login.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // If using React Router for navigation
import axios from 'axios'; // Example: Axios for HTTP requests
import { setAuthToken } from '../../utils/setAuthToken';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      // Assuming successful login with token returned
      setAuthToken(res.data.token); // Set token in localStorage or sessionStorage
      history.push('/dashboard'); // Redirect to dashboard or desired route
    } catch (err) {
      console.error('Login error:', err.response.data);
      // Handle login error (display message, clear form, etc.)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
