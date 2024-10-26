import React, { useState, useEffect } from 'react';
import api, { endpoints } from '../services/api';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(endpoints.orders);
      console.log('Fetched Orders:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="order-history">
      <h1 className="title">Order History</h1>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <p className="order-number">Order #{order.id}</p>
            <p className="order-status">Status: {order.status}</p>
            <p className="order-total">
              Total: ${typeof order.total_price === 'number' ? order.total_price.toFixed(2) : 
                       typeof order.total_price === 'string' ? parseFloat(order.total_price).toFixed(2) : 'N/A'}
            </p>
            <p className="order-restaurant">Restaurant: {order.restaurant?.name}</p>

            <h3 className="items-title">Items:</h3>
            <ul className="items-list">
              {order.items && order.items.length > 0 ? (
                order.items.map(item => (
                  <li key={item.dish.id} className="item">
                    {item.dish.name} - Quantity: {item.quantity}
                  </li>
                ))
              ) : (
                <li>No items found.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;


