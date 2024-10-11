import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={restaurant.image || 'https://via.placeholder.com/140x100'}
        alt={restaurant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant.description}
        </Typography>
        
        <Button onClick={handleViewMenu}>View Menu</Button>

        {/* Toggle Favorite Button */}
        <IconButton onClick={() => toggleFavorite(restaurant.id)} aria-label="add to favorites">
          {isFavorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
