// src/pages/OrderHistory.js

import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import api, { endpoints } from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(endpoints.orders); // Use correct endpoint for fetching orders
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="order-history">
      <h1>Order History</h1>
      
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ListGroup>
          {orders.map(order => (
            <ListGroup.Item 
              key={order.id}
              className="mb-2"
              onClick={() => setSelectedOrder(order)}
              style={{ cursor: 'pointer' }}
            >
              <Card>
                <Card.Body>
                  <h5>Order #{order.id}</h5>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Total:</strong> ${order.total_price}</p>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      
      {/* Detailed Order View */}
      {selectedOrder && (
        <div className="order-details mt-4">
          <Card>
            <Card.Body>
              <h2>Order #{selectedOrder.id} Details</h2>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Restaurant:</strong> {selectedOrder.restaurant.name}</p>
              <p><strong>Delivery Address:</strong> {selectedOrder.delivery_address}</p>

              <h4>Items:</h4>
              <ul>
                {selectedOrder.items.map(item => (
                  <li key={item.id}>
                    {item.dish.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <h4>Total Price: ${selectedOrder.total_price}</h4>
              
              <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                Back to Order List
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
