// src/pages/RestaurantDashboard.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Form } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurantProfile();
    fetchDishes();
    fetchOrders();
  }, []);

  const fetchRestaurantProfile = async () => {
    try {
      const response = await api.get('/restaurants/me/');
      setRestaurant(response.data);
    } catch (err) {
      console.error('Error fetching restaurant profile:', err);
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await api.get('/dishes/');
      setDishes(response.data);
    } catch (err) {
      console.error('Error fetching dishes:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/restaurants/orders/?status=${filterStatus}`);
      setOrders(response.data);
    } catch (err) {
<<<<<<< HEAD
      console.error('Error fetching orders:', err);
=======
      setError('Failed to fetch orders');
      console.error('Errors fetching orders:', err);
    } finally {
      setLoading(false);
>>>>>>> 4b0a2cb06362faac9c2e1668910bbb3b8de6ac77
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/`, { status: newStatus });
      fetchOrders(); // Refresh orders after status update
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    fetchOrders();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Restaurant Dashboard</h1>

      {/* Profile Management */}
      <section>
        <h2>Profile Management</h2>
        {restaurant && (
          <div>
            <p><strong>Name:</strong> {restaurant.name}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Description:</strong> {restaurant.description}</p>
            <p><strong>Contact Info:</strong> {restaurant.contact_info}</p>
            <p><strong>Timings:</strong> {restaurant.opening_time} - {restaurant.closing_time}</p>
            <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
          </div>
        )}
      </section>

      {/* Dishes Management */}
      <section>
        <h2>Menu Management</h2>
        <Button onClick={() => navigate('/add-dish')}>Add New Dish</Button>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map(dish => (
              <tr key={dish.id}>
                <td>{dish.name}</td>
                <td>${dish.price}</td>
                <td>{dish.category}</td>
                <td>
                  <Button onClick={() => navigate(`/edit-dish/${dish.id}`)}>Edit</Button>
                  <Button variant="danger" onClick={() => /* handle delete */ }>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Order Management */}
      <section>
        <h2>Order Management</h2>
        <Form.Select value={filterStatus} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </Form.Select>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.customer.name}</td>
                <td>
                  <Form.Select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)}>
                    <option value="new">New</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </Container>
  );
};

export default RestaurantDashboard;
