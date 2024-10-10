// src/pages/Cart.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
import api, { endpoints } from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    fetchCartItems();
    fetchDefaultAddress();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await api.get(endpoints.cartItems);
      setCartItems(response.data);
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.dish.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ListGroup>
            {cartItems.map((item) => (
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
              <h3>Total: ${calculateTotal()}</h3>
              {defaultAddress && (
                <div>
                  <h4>Default Delivery Address:</h4>
                  <p>{defaultAddress.address_line1}, {defaultAddress.city}, {defaultAddress.state}</p>
                </div>
              )}
              <Link to="/order-placement">
                <Button variant="primary">Proceed to Checkout</Button>
              </Link>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Cart;