// src/components/Auth/Register.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // If using React Router for navigation
import axios from 'axios'; // Example: Axios for HTTP requests

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      
      // Assuming successful registration with token returned
      history.push('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error('Registration error:', err.response.data);
      // Handle registration error (display message, clear form, etc.)
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
