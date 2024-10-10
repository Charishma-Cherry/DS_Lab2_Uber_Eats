// src/pages/HomePage.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Link to custom CSS

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-wrapper">
      <div className="overlay">
        <Container className="text-center homepage-content">
          <h1 className="display-3">Welcome to Uber Eats</h1>
          <p className="lead">Your favorite food delivered fast at your door.</p>
          <Button 
            variant="success" 
            size="lg" 
            className="homepage-btn" 
            onClick={() => navigate('/restaurants')}
          >
            Explore Restaurants
          </Button>
          <Button 
            variant="outline-light" 
            size="lg" 
            className="homepage-btn" 
            onClick={() => navigate('/signup-selection')}  // Navigates to signup selection
          >
            Sign Up
          </Button>

          {/* New Button for "Already a User" */}
          <Button 
            variant="outline-light" 
            size="lg" 
            className="homepage-btn" 
            onClick={() => navigate('/login')}  // Link to login page
          >
            Already a User? Login
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
