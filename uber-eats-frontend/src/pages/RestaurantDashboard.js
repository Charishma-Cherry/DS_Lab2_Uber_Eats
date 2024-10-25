// // src/pages/RestaurantDashboard.js
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function RestaurantDashboard() {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleProfileManagement = () => {
    navigate('/restaurant/profile'); // Navigate to the profile management page
  };

  const handleOrdersManagement = () => {
    navigate(`/restaurant/${id}/orders`); // Navigate to the orders management page
  };

  return (
    <Container>
      <h1>Restaurant Dashboard</h1>
      <div className="button-group">
        <Button variant="primary" onClick={handleProfileManagement}>
          Profile Management
        </Button>
        <Button variant="secondary" onClick={handleOrdersManagement}>
          Orders Management
        </Button>
      </div>
    </Container>
  );
}

export default RestaurantDashboard;