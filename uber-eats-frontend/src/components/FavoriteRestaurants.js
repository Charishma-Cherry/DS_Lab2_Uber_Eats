import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, CircularProgress, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import api, { endpoints } from '../services/api';

const FavoriteRestaurants = () => {
  // State for storing favorite restaurants and loading status
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
      if (isFavorite) {
        await api.post(endpoints.toggleFavorite, { restaurant_id: restaurantId });
      } else {
        await api.post(endpoints.toggleFavorite, { restaurant_id: restaurantId });
      }
      // Refresh the favorites list after toggling
      fetchFavorites();
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
    <List>
      {favorites.map((favorite) => (
        <ListItem key={favorite.id}>
          <ListItemText primary={favorite.restaurant.name} />
          <IconButton onClick={() => toggleFavorite(favorite.restaurant.id)}>
            <Favorite color="secondary" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default FavoriteRestaurants;