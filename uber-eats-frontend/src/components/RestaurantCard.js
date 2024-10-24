// src/components/RestaurantCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';  // Import icons
import { useNavigate } from 'react-router-dom';
import './RestaurantCard.css'; // Import the CSS file

const RestaurantCard = ({ restaurant, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  return (
    <Card className="restaurant-card">
      <CardMedia
        component="img"
        height="140"
        image={restaurant.image || 'https://via.placeholder.com/140x100'}
        alt={restaurant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="restaurant-name">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant.description}
        </Typography>
        
        <div className="card-actions">
          <Button variant="contained" color="primary" onClick={handleViewMenu}>
            View Menu
          </Button>

          {/* Toggle Favorite Button */}
          <IconButton onClick={() => toggleFavorite(restaurant.id)} aria-label="add to favorites">
            {isFavorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
