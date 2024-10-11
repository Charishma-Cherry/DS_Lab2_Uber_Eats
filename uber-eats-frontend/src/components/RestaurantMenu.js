// src/pages/RestaurantMenu.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Import the context

const RestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const { id } = useParams();
  const { addToCart } = useContext(AuthContext); // Destructure addToCart from the context

  useEffect(() => {
    fetchRestaurantAndMenu();
  }, [id]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const restaurantResponse = await fetch(`/restaurants/${id}`);
      setRestaurant(await restaurantResponse.json());

      const menuResponse = await fetch(`/restaurants/${id}/dishes`);
      setMenu(await menuResponse.json());
    } catch (error) {
      console.error('Error fetching restaurant and menu:', error);
    }
  };

  const handleAddToCart = (dish) => {
    addToCart(dish); // Call the addToCart function from the context
    alert('Dish added to cart successfully!');
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="restaurant-menu">
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>

      <h2>Menu</h2>
      <div className="menu-items">
        {menu.map((dish) => (
          <div key={dish.id} className="menu-item">
            <h3>{dish.name}</h3>
            <p>Price: ${dish.price}</p>
            <button onClick={() => handleAddToCart(dish)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
