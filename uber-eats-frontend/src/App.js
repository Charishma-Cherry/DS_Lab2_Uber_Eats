// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import OrderPlacement from './components/OrderPlacement';
import ProtectedRoute from './components/ProtectedRoute';
import FavoriteRestaurants from './components/FavoriteRestaurants';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/favorites" element={<FavoriteRestaurants />} /> {/* Add this route */}
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-history" 
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-placement" 
              element={
                <ProtectedRoute>
                  <OrderPlacement />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;