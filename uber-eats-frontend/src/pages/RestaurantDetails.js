// src/pages/RestaurantDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurantAndDishes = async () => {
      try {
        setLoading(true);
        console.log(`Fetching data for restaurant ID: ${id}`);
        const [restaurantResponse, dishesResponse] = await Promise.all([
          api.get(`${endpoints.restaurants}${id}/`),
          api.get(`${endpoints.restaurants}${id}/dishes/`)
        ]);
        console.log('Restaurant data:', restaurantResponse.data);
        console.log('Dishes data:', dishesResponse.data);
        setRestaurant(restaurantResponse.data);
        setDishes(dishesResponse.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError('Failed to load restaurant details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchRestaurantAndDishes();
  }, [id]);

  const handleAddToCart = async (dishId) => {
    try {
      const response = await api.post(endpoints.addToCart, { dish_id: dishId, quantity: 1 });
      console.log('Dish added to cart:', response.data);
      // Show a success message to the user
      alert('Dish added to cart successfully!');
      // Optionally, you can update the cart count in the header here
    } catch (error) {
      console.error('Error adding dish to cart:', error);
      alert('Failed to add dish to cart. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!restaurant) return <div className="text-center">Restaurant not found</div>;

  return (
    <Container>
      <h1 className="mb-4">{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>Address: {restaurant.address}</p>
      <p>Phone: {restaurant.phone_number}</p>
      <p>Rating: {restaurant.rating}</p>
      
      <h2 className="mt-5 mb-4">Menu</h2>
      {dishes.length === 0 ? (
        <p>No dishes available for this restaurant.</p>
      ) : (
        <Row>
          {dishes.map(dish => (
            <Col key={dish.id} md={4} className="mb-4">
              <Card>
                {dish.image && <Card.Img variant="top" src={dish.image} alt={dish.name} />}
                <Card.Body>
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Card.Text>Price: ${dish.price}</Card.Text>
                  <Card.Text>
                    {dish.is_vegetarian && <span className="badge bg-success me-1">Vegetarian</span>}
                    {dish.is_vegan && <span className="badge bg-info me-1">Vegan</span>}
                    {dish.is_gluten_free && <span className="badge bg-warning">Gluten-Free</span>}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleAddToCart(dish.id)}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default RestaurantDetails;