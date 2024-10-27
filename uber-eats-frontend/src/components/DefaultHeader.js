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

function DefaultHeader() { // Removed cartCount from props
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart() || {}; // Get cartItems from context
  const navigate = useNavigate();

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">Uber Eats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link as={Link} to="/customer/login" className="nav-link">Login</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DefaultHeader;

