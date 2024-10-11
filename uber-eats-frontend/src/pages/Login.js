// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // Link to custom CSS
import api, { endpoints } from '../services/api';  


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Set error message
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    console.log("Login ")
    const success = await login(username, password);
    if (success) {
      navigate('/restaurants'); // Redirect to restaurant list on success
    } else {
      setError('Invalid username or password. Please try again.'); // Display error message
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Login</Button>
        </Form>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
}

export default Login;
