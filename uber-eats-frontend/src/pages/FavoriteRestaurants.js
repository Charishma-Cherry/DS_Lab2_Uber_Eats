// src/pages/FavoriteRestaurants.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './FavoriteRestaurants.css'; // Importing the CSS file for styling

function FavoriteRestaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [favorites, setFavorites] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFavRestaurants();
        fetchFavorites();  
    }, []);

    const fetchFavRestaurants = async () => {
        try {
            const response = await api.get(endpoints.favoriteRestaurants);
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
        <div className="favorite-restaurants-container">
            <h2>Your Favorite Restaurants</h2>
            <Row>
                {favorites.flatMap(fav => fav.restaurant).map(restaurant => (
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

export default FavoriteRestaurants;
