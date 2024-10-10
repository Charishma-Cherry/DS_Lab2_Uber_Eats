// src/pages/RestaurantSignup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { endpoints } from '../services/api';

const RestaurantSignup = () => {
  const [formData, setFormData] = useState({
    user: { username: '', email: '', password: '' },
    name: '',
    description: '',
    location: '',
    contact_info: '',
    image: null,
    opening_time: '',
    closing_time: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.user) {
      setFormData(prev => ({ ...prev, user: { ...prev.user, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/restaurants/signup/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Restaurant signup successful:', response.data);
      navigate('/restaurant/login');
    } catch (error) {
      console.error('Restaurant signup error:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.user.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={formData.user.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.user.password} onChange={handleChange} placeholder="Password" required />
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Restaurant Name" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} placeholder="Contact Info" required />
      <input type="file" name="image" onChange={handleFileChange} />
      <input type="time" name="opening_time" value={formData.opening_time} onChange={handleChange} required />
      <input type="time" name="closing_time" value={formData.closing_time} onChange={handleChange} required />
      <button type="submit">Sign Up Restaurant</button>
    </form>
  );
};

export default RestaurantSignup;