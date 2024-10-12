// src/pages/Cart.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
import api, { endpoints } from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState(new Map());
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [restaurantNames, setRestaurantNames] = useState(new Map());

  useEffect(() => {
    fetchCartItems();
    fetchDefaultAddress();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await api.get(endpoints.cartItems);
      console.log(response.data);
      let grouped_carts = new Map();
      for (const item of response.data ){
        let rest_id = item.dish['restaurant'];
        if (!grouped_carts.has(rest_id)){
          grouped_carts.set(rest_id, []);
          const restaurant = await api.get(endpoints.restaurants + rest_id.toString());
          // console.log(restaurant.data.name);
          let rest_names = restaurantNames;
          rest_names.set(rest_id, restaurant.data.name);
          setRestaurantNames(rest_names);
        }
        grouped_carts.get(rest_id).push(item);
      }
      console.log(grouped_carts);
      setCartItems(grouped_carts);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const response = await api.get(endpoints.deliveryAddresses);
      if (response.data.length > 0) {
        setDefaultAddress(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching default address:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await api.patch(`${endpoints.cartItems}${itemId}/`, { quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`${endpoints.cartItems}${itemId}/`);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const calculateTotal = (rest_cart) => {
    return rest_cart.reduce((total, item) => total + item.dish.price * item.quantity, 0).toFixed(2);
  };

  
  return ( 
  <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        <ListGroup>
        {Array.from(cartItems).map(([rest_id, rest_cart]) => (
          <>
          <h6>{restaurantNames.get(rest_id)}</h6>
          <ListGroup>
            {rest_cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col xs={6}>
                    <h5>{item.dish.name}</h5>
                    <p>Price: ${item.dish.price}</p>
                  </Col>
                  <Col xs={3}>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                  </Col>
                  <Col xs={3}>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          
          <Card className="mt-3">
            <Card.Body>
              <h3>Total: ${calculateTotal(rest_cart)}</h3>
              {defaultAddress && (
                <div>
                  <h4>Default Delivery Address:</h4>
                  <p>{defaultAddress.address_line1}, {defaultAddress.city}, {defaultAddress.state}</p>
                </div>
              )}
              <Link to="/order-placement" state={{rest_id, rest_cart}}>
                <Button variant="primary">Proceed to Checkout</Button>
              </Link>
            </Card.Body>
          </Card>
          </>))
          }
          </ListGroup>
        </>
      )}
    </div>
  );
  
};

export default Cart;
