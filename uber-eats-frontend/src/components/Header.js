// src/components/Header.js
import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header({ showNavLinks = true }){ //Add prop to control nav link visibility
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Uber Eats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Restaurants</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
                <Nav.Link as={Link} to="/cart">Cart <Badge pill bg="primary">{cartCount}</Badge> </Nav.Link>
                <Nav.Link as={Link} to="/order-history">Order History</Nav.Link>
                <Nav.Link as={Link} to="/userprofile">Welcome, {user.username}</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
