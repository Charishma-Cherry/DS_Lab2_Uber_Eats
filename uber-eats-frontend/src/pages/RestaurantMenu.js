// src/pages/RestaurantMenu.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api, { endpoints } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import DishDetailsModal from '../components/DishDetailsModal';

const RestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchRestaurantAndMenu();
  }, [id]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const restaurantResponse = await api.get(`/restaurants/${id}/`);
      setRestaurant(restaurantResponse.data);
      const menuResponse = await api.get(`/restaurants/${id}/dishes/`);
      setMenu(menuResponse.data);
    } catch (error) {
      console.error('Error fetching restaurant and menu:', error);
    }
  };

  const addToCart = async (dishId) => {
    if (!user) {
      alert('Please log in to add items to your cart');
      return;
    }

    try {
      await api.post(endpoints.addToCart, { dish_id: dishId, quantity: 1 });
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="restaurant-menu">
      <div className="restaurant-details">
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
        <p>Location: {restaurant.location}</p>
        <p>Contact: {restaurant.contact_info}</p>
        <p>Opening Hours: {restaurant.opening_time} - {restaurant.closing_time}</p>
      </div>
      <h2>Menu</h2>
      <div className="menu-items">
        {menu.map((dish) => (
          <div key={dish.id} className="menu-item">
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>Price: ${dish.price}</p>
            <button onClick={() => setSelectedDish(dish)}>View Details</button>
            <button onClick={() => addToCart(dish.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {selectedDish && (
        <DishDetailsModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToCart={() => addToCart(selectedDish.id)}
        />
      )}
    </div>
  );
};

export default RestaurantMenu;
