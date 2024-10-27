// src/components/Header.js

import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useParams } from 'react-router-dom';

function RestaurantHeader(id) { // Removed cartCount from props
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const dashboardLink = `/restaurant/${id.id}/dashboard`
 


  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={dashboardLink} className="navbar-brand">Uber Eats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ flexGrow: 1 }}>
            {user ? (
              <>
                {/* <Nav.Link as={Link} to="/restaurants" className="nav-link">Restaurants</Nav.Link> */}
                {/* <Nav.Link as={Link} to="/favorites" className="nav-link">Favorites</Nav.Link> */}
                {/* <Nav.Link as={Link} to="/order-history" className="nav-link">Orders</Nav.Link> */}
                <Nav.Link as={Link} to={dashboardLink} className="nav-link">Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/customer/login" className="nav-link">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default RestaurantHeader;

