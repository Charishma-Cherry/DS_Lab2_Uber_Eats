import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation
import './HomePage.css';  // Link to your existing CSS file

const HomePage = () => {
  const navigate = useNavigate();  // Initialize navigate function

  return (
    <div className="homepage-wrapper">
      <div className="overlay">
        <div className="text-center homepage-content">
          <h1 className="display-3">Welcome to Uber Eats</h1>
          <p className="lead">Your favorite food delivered fast at your door.</p>
          
          {/* Explore Restaurants Button */}
          <button 
            className="homepage-btn" 
            onClick={() => navigate('/restaurants')}
          >
            Explore Restaurants
          </button>
          
          {/* Sign Up Button to navigate to Signup Selection */}
          <button 
            className="homepage-btn"
            onClick={() => navigate('/signup-selection')}  // Navigate to signup selection page
          >
            Sign Up
          </button>

          {/* Already a User? Login Button */}
          <button 
            className="homepage-btn"
            onClick={() => navigate('/login')}  // Link to login page
          >
            Already a User? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
