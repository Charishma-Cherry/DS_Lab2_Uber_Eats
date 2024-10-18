import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import CustomerLogin from './pages/CustomerLogin';
import RestaurantLogin from './pages/RestaurantLogin';
import Signup from './pages/Signup';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';
import RestaurantDashboard from './pages/RestaurantDashboard';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import OrderPlacement from './components/OrderPlacement';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import SignupSelection from './pages/SignupSelection'; // Import SignupSelection
import RestaurantSignup from './pages/RestaurantSignup'; // Import RestaurantSignup
import FavoriteRestaurants from './pages/FavoriteRestaurants';
import OrderDetail from './pages/OrderDetail';
import Dish from './pages/Dish';

//import Checkout from './pages/Checkout'; // Import Checkout
//import RestaurantMenu from './pages/RestaurantMenu';



function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/home" element={<RestaurantList />} />
          <Route path="/restaurant/home/:id" element={<RestaurantDashboard />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/restaurant/login" element={<RestaurantLogin />} />
          <Route path="/order-details/:id" element={<OrderDetail />} />=
          <Route path="/dish/edit/:id" element={<Dish/>} />=
          <Route path="/dish/add" element={<Dish/>} />=

          
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-selection" element={<SignupSelection />} />
          <Route path="/restaurant/signup" element={<RestaurantSignup />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          {/* <Route path="/restaurants/:id" element={<RestaurantMenu />} /> */}
          {/* <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} /> */}
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/favorites" element={<FavoriteRestaurants />} />
          <Route 
              path="/userprofile" 
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
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      {/* <CartProvider> */}
        <Router>
          <AppContent />
        </Router>
      {/* </CartProvider> */}
    </AuthProvider>
  );
}

export default App;