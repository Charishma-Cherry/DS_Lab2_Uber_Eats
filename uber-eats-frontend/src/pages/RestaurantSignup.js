// // src/pages/RestaurantSignup.js
// import React, { useState } from 'react';
// import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import BrandBar from '../components/BrandBar';  // Ensure BrandBar is imported
// import './CSSforSignup.css';  // Custom CSS for styling

// function RestaurantSignup() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     restaurantName: '',
//     location: '',
//     description: '',
//     contactInfo: '',
//     image: null,
//     openingTime: '',
//     closingTime: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       image: e.target.files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }

//       await api.post('/restaurants/signup/', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate('/login');
//     } catch (err) {
//       setError('Failed to sign up. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <BrandBar /> {/* Ensure BrandBar is rendered once */}
//       <Container className="signup-wrapper">
//         <div className="signup-form">
//         <br></br>
//           <h2 className="text-center mb-4">Restaurant Sign Up</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             {/* User Credentials */}
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formUsername">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     placeholder="Enter username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formConfirmPassword">
//                   <Form.Label>Confirm Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Restaurant Details */}
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formRestaurantName">
//                   <Form.Label>Restaurant Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="restaurantName"
//                     placeholder="Enter restaurant name"
//                     value={formData.restaurantName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formLocation">
//                   <Form.Label>Location</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="location"
//                     placeholder="Enter location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formOpeningTime">
//                   <Form.Label>Opening Time</Form.Label>
//                   <Form.Control
//                     type="time"
//                     name="openingTime"
//                     value={formData.openingTime}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formClosingTime">
//                   <Form.Label>Closing Time</Form.Label>
//                   <Form.Control
//                     type="time"
//                     name="closingTime"
//                     value={formData.closingTime}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3" controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="description"
//                 placeholder="Enter description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formContactInfo">
//               <Form.Label>Contact Info</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="contactInfo"
//                 placeholder="Enter contact information"
//                 value={formData.contactInfo}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formImage">
//               <Form.Label>Upload Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="image"
//                 onChange={handleFileChange}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" disabled={loading} className="w-100">
//               {loading ? 'Signing up...' : 'Sign Up Restaurant'}
//             </Button>
//           </Form>

//           {/* Back to Home Button */}
//           <Button
//             variant="secondary"
//             className="mt-3 w-100 back-home-btn"
//             onClick={() => navigate('/')}
//           >
//             Back to Home
//           </Button>
//         </div>
//       </Container>
//     </>
//   );
// }

// export default RestaurantSignup;

import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Signup.css';
import { AuthContext } from '../context/AuthContext';

function RestaurantSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    address: '',
    phone_number: '',
  });
  const { loginRestaurant } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      await api.post('/restaurants/signup/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        restaurant_name: formData.restaurantName,
        address: formData.address,
        phone_number: formData.phone_number
      });
      alert("Restaurant Signup Successful!");
      const restId = await loginRestaurant(formData.username, formData.password);

      navigate(`/restaurant/${restId}/dashboard`);
    } catch (err) {
      const error = err.response?.data?.error || 'Failed to sign up';
      setError('Failed to sign up: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <h2 className="text-center mb-4">Restaurant Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRestaurantName">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              type="text"
              name="restaurantName"
              placeholder="Enter restaurant name"
              value={formData.restaurantName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter restaurant address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              name="phone_number"
              placeholder="Enter restaurant phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RestaurantSignup;