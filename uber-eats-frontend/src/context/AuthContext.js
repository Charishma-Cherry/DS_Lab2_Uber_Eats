// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api, { endpoints } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (token && storedUser) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get(endpoints.customerProfile);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post(endpoints.customerLogin, { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', "customer")
      localStorage.setItem('userLoggedIn', "true")
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const loginRestaurant = async (username, password) => {
    try {
      const response = await api.post(endpoints.restaurantLogin, { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', "restaurant")
      localStorage.setItem('userLoggedIn', "true")
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      console.log(response.data)
      setUser(user);
      return user.id;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType')
    localStorage.removeItem('userLoggedIn')
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginRestaurant, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
