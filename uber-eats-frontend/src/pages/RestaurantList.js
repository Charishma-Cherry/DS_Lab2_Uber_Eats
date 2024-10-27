// src/pages/RestaurantList.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Alert, Carousel } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Import your ad images
import ad1 from '../assets/images/ad1.png';
import ad2 from '../assets/images/ad2.png';
import ad3 from '../assets/images/ad3.png';
import './RestaurantList.css'; // Import the CSS file

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurants();
    fetchFavorites();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get(endpoints.restaurants);
      console.log(response.data)
      setRestaurants(response.data);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get(endpoints.favoriteRestaurants);
      setFavorites(response.data);
    } catch (err) {
      console.error('Failed to fetch favorite restaurants.', err);
    }
  };

  const toggleFavorite = async (restaurantId) => {
    try {
      await api.post(endpoints.toggleFavorite, { restaurant_id: restaurantId });
      fetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (restaurantId) => {
    return favorites.some(fav => fav.restaurant.id === restaurantId);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="restaurant-list">
      <Carousel className="ad-carousel">
        <Carousel.Item>
          <img className="d-block w-100" src={ad1} alt="First slide" />
          <Carousel.Caption>
            <h3>Welcome to Uber Eats</h3>
            <p>Delicious meals delivered to your door.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={ad2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Special Offers</h3>
            <p>Check out our exclusive offers!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={ad3} alt="Third slide" />
          <Carousel.Caption>
            <h3>New Restaurants</h3>
            <p>Discover new flavors today!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2 className="restaurants-title">Available Restaurants</h2>
      <Row>
        {restaurants.map(restaurant => (
          <Col key={restaurant.id} md={4} className="mb-4">
            <RestaurantCard 
              restaurant={restaurant} 
              isFavorite={isFavorite(restaurant.id)}  
              toggleFavorite={toggleFavorite}  
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default RestaurantList;
