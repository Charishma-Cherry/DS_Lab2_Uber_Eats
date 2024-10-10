// src/components/RestaurantCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
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
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;