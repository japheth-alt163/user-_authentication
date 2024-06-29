// src/context/Auth/AuthState.js

import React, { useReducer } from 'react';
import axios from 'axios'; // Example: Axios for HTTP requests
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
  // Add other types/constants as needed
} from '../types';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register User
  const register = async formData => {
    try {
      const res = await axios.post('/api/auth/register', formData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // Assuming the response includes a token
      });

      loadUser(); // Load user after successful registration
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg // Error message from server
      });
    }
  };

  // Login User
  const login = async formData => {
    try {
      const res = await axios.post('/api/auth/login', formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data // Assuming the response includes a token
      });

      loadUser(); // Load user after successful login
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg // Error message from server
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      // Assuming backend returns user data
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
