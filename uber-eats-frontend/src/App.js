import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RestaurantList from './pages/RestaurantList';
import RestaurantMenu from './pages/RestaurantMenu';
import HomePage from './pages/HomePage';
import SignupSelection from './pages/SignupSelection'; // Import SignupSelection
import RestaurantSignup from './pages/RestaurantSignup'; // Import RestaurantSignup
import Cart from './pages/Cart'; // Import Cart
import Checkout from './pages/Checkout'; // Import Checkout
import OrderHistory from './pages/OrderHistory'; // Import OrderHistory
import { CartProvider } from './context/CartContext';  // Import CartProvider


function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-selection" element={<SignupSelection />} />
          <Route path="/restaurant/signup" element={<RestaurantSignup />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;