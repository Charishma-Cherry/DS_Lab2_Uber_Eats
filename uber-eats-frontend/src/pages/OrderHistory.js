// src/pages/OrderHistory.js
import React, { useState, useEffect } from 'react';
import api, { endpoints } from '../services/api';
import './OrderHistory.css'; // Importing the CSS file for styling

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(endpoints.orders);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await api.get(endpoints.order_details, { order_id: orderId });
      console.log(response);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  return (
    <div className="order-history">
      <h1 className="title">Order History</h1>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-item" onClick={() => fetchOrderDetails(order.id)}>
            <p className="order-number">Order #{order.id}</p>
            <p className="order-status">Status: {order.status}</p>
            {/* Check if total_price is a number before calling toFixed */}
            <p className="order-total">
            Total: ${typeof order.total_price === 'number' ? order.total_price.toFixed(2) : 
                     typeof order.total_price === 'string' ? parseFloat(order.total_price).toFixed(2) : 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="order-details">
          <h2 className="details-title">Order #{selectedOrder.id} Details</h2>
          <p className="details-status">Status: {selectedOrder.status}</p>
          <p className="details-restaurant">Restaurant: {selectedOrder.restaurant}</p>
          <h3 className="items-title">Items:</h3>
          <ul className="items-list">
            {selectedOrder.items?.map(item => (
              <li key={item.id} className="item">
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
