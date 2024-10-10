// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import RestaurantList from './pages/RestaurantList';
import RestaurantSignup from './pages/RestaurantSignup';
import FavoriteRestaurants from './components/FavoriteRestaurants';
import SignupSelection from './pages/SignupSelection';

function AppContent() {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Render Header only if not on the HomePage */}
      {location.pathname !== '/' && <Header />}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurant/signup" element={<RestaurantSignup />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/favorites" element={<FavoriteRestaurants />} />
          <Route path="/signup-selection" element={<SignupSelection />} />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
