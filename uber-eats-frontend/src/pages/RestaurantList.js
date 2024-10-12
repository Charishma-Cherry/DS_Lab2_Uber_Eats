// src/pages/RestaurantList.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
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

  

  // // Function to fetch the list of favorite restaurants
  // const fetchFavorites = async () => {
  //   try {
  //     const response = await api.get(endpoints.favoriteRestaurants);  // Get list of favorite restaurants
  //     setFavorites(response.data);
  //   } catch (err) {
  //     console.error('Failed to fetch favorite restaurants.', err);
  //   }
  // };
  // // Function to toggle favorite status
  // const toggleFavorite = async (restaurantId) => {
  //   try {
  //     await api.post(endpoints.toggleFavorite, { restaurant_id: restaurantId });  // Toggle favorite
  //     fetchFavorites();  // Re-fetch favorites after toggling
  //   } catch (error) {
  //     console.error('Error toggling favorite:', error);
  //   }
  // };
  // Helper function to check if a restaurant is favorited
  // const isFavorite = (restaurantId) => {
  //   return favorites.some(fav => fav.restaurant.id === restaurantId);  // Check if in favorites
  // };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Row>
      {restaurants.map(restaurant => (
        <Col key={restaurant.id} md={4} className="mb-4">
          <RestaurantCard 
            restaurant={restaurant} 
           // isFavorite={isFavorite(restaurant.id)}  // Pass isFavorite status
           // toggleFavorite={toggleFavorite}  // Pass toggle function
          />
        </Col>
      ))}
    </Row>
  );
}

export default RestaurantList;