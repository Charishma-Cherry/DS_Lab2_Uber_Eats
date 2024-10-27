// src/components/Header.js

import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // Import useCart
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header() { // Removed cartCount from props
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart() || {}; // Get cartItems from context
  const navigate = useNavigate();
  const cartCount = Array.from(cartItems.values()).reduce((total, rest_cart) => total + rest_cart.length, 0); // Calculate count
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/user/home" className="navbar-brand">Uber Eats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ flexGrow: 1 }}>
            {user ? (
              <>
                <Nav.Link as={Link} to="/userprofile" className="nav-link">Welcome, {user.user.username}</Nav.Link>
                <Nav.Link as={Link} to="/restaurants" className="nav-link">Restaurants</Nav.Link>
                <Nav.Link as={Link} to="/favorites" className="nav-link">Favorites</Nav.Link>
                <Nav.Link as={Link} to="/order-history" className="nav-link">Order History</Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/customer/login" className="nav-link">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link">Sign Up</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/cart" aria-label="Cart" className="nav-link cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
              {/* Ensure cartItems is an array before checking length */}
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

