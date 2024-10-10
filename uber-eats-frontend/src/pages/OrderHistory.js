// src/pages/OrderHistory.js

import React, { useState, useEffect } from 'react';
import api, { endpoints } from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="order-history">
      <h1>Order History</h1>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-item" onClick={() => setSelectedOrder(order)}>
            <p>Order #{order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total_price}</p>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <div className="order-details">
          <h2>Order #{selectedOrder.id} Details</h2>
          <p>Status: {selectedOrder.status}</p>
          <p>Restaurant: {selectedOrder.restaurant.name}</p>
          <p>Delivery Address: {selectedOrder.delivery_address}</p>
          <h3>Items:</h3>
          <ul>
            {selectedOrder.items.map(item => (
              <li key={item.id}>
                {item.dish.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;