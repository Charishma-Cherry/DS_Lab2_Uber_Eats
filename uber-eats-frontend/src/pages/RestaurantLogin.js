import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CustomerLogin.css'; // Link to custom CSS
import api, { endpoints } from '../services/api';  


function RestaurantLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Set error message
  const { loginRestaurant } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const restaurant_id = await loginRestaurant(username, password);
    if (restaurant_id) {
      navigate(`/restaurant/${restaurant_id}/dashboard`);
    } else {
      setError('Invalid username or password');
    }
  };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h2>Restaurant Login</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Form.Group className="mb-3">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Login
//       </Button>
//     </Form>
//   );
// }

// export default Login;

// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

// function RestaurantLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await api.post('/restaurants/login/', { username, password });
//       const { token, user_id, restaurant_id } = response.data;

//       // Store token and navigate
//       localStorage.setItem('token', token);
//       localStorage.setItem('user_id', user_id);
//       localStorage.setItem('restaurant_id', restaurant_id);
//       localStorage.setItem('userType', "restaurant")
//       navigate(`/restaurant/${restaurant_id}/dashboard`);  // Redirect to dashboard
//     } catch (err) {
//       const errorMessage = err.response?.data?.error || 'Failed to log in';
//       setError(errorMessage);
//     }
//   };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Restaurant Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
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
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default RestaurantLogin;