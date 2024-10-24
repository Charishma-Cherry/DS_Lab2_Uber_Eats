import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, CircularProgress, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import api, { endpoints } from '../services/api';
import './FavoriteRestaurants.css'; // Import your CSS file

const FavoriteRestaurants = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch favorites when component mounts
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Function to fetch favorite restaurants from the API
  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(endpoints.favoriteRestaurants); // Update endpoint to match backend
      console.log(response.data);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle favorite status of a restaurant
  const toggleFavorite = async (restaurantId) => {
    try {
      const isFavorite = favorites.some(fav => fav.restaurant.id === restaurantId);
      await api.post(endpoints.toggleFavorite, { restaurant_id: restaurantId });
      fetchFavorites(); // Refresh the favorites list after toggling
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Show loading spinner while fetching data
  if (isLoading) {
    return <CircularProgress />;
  }

  // Show message if no favorites
  if (favorites.length === 0) {
    return <Typography>No favorite restaurants yet.</Typography>;
  }

  // Render list of favorite restaurants
  return (
    <div className="favorite-restaurants-wrapper">
      <Typography variant="h5" gutterBottom>Your Favorite Restaurants</Typography>
      <div className="favorite-restaurants-list">
        {favorites.map((favorite) => (
          <div className="favorite-restaurants-item" key={favorite.id}>
            <ListItemText primary={favorite.restaurant.name} />
            <IconButton onClick={() => toggleFavorite(favorite.restaurant.id)}>
              <Favorite className="favorite-restaurants-icon" />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRestaurants;
