// src/pages/RestaurantList.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import api from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants/');
        setRestaurants(response.data);
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Row>
      {restaurants.map(restaurant => (
        <Col key={restaurant.id} md={4} className="mb-4">
          <RestaurantCard restaurant={restaurant} />
        </Col>
      ))}
    </Row>
  );
}

export default RestaurantList;