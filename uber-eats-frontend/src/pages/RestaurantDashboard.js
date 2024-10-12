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
<<<<<<< HEAD
      const response = await api.get('/restaurants/my_orders/');
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      const response = await api.patch('/restaurants/me/', updatedData);
      setRestaurant(response.data);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleAddDish = async (newDish) => {
    try {
      const response = await api.post('/dishes/', newDish);
      setDishes([...dishes, response.data]);
      alert('Dish added successfully');
    } catch (err) {
      setError('Failed to add dish');
      console.error('Error adding dish:', err);
    }
  };

  const handleUpdateDish = async (dishId, updatedDish) => {
    try {
      const response = await api.patch(`/dishes/${dishId}/`, updatedDish);
      setDishes(dishes.map(dish => dish.id === dishId ? response.data : dish));
      alert('Dish updated successfully');
    } catch (err) {
      setError('Failed to update dish');
      console.error('Error updating dish:', err);
    }
  };

  const handleDeleteDish = async (dishId) => {
    try {
      await api.delete(`/dishes/${dishId}/`);
      setDishes(dishes.filter(dish => dish.id !== dishId));
      alert('Dish deleted successfully');
    } catch (err) {
      setError('Failed to delete dish');
      console.error('Error deleting dish:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await api.patch(`/orders/${orderId}/`, { status: newStatus });
      setOrders(orders.map(order => order.id === orderId ? response.data : order));
      alert('Order status updated successfully');
    } catch (err) {
      setError('Failed to update order status');
=======
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
>>>>>>> origin/main
      console.error('Error updating order status:', err);
    }
  };

<<<<<<< HEAD
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Restaurant Dashboard</h1>
      
=======
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    fetchOrders();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Restaurant Dashboard</h1>

      {/* Profile Management */}
>>>>>>> origin/main
      <section>
        <h2>Profile Management</h2>
        {restaurant && (
          <div>
<<<<<<< HEAD
            <p>Name: {restaurant.name}</p>
            <p>Description: {restaurant.description}</p>
            <p>Location: {restaurant.location}</p>
            <p>Contact Info: {restaurant.contact_info}</p>
            <p>Opening Time: {restaurant.opening_time}</p>
            <p>Closing Time: {restaurant.closing_time}</p>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
=======
            <p><strong>Name:</strong> {restaurant.name}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Description:</strong> {restaurant.description}</p>
            <p><strong>Contact Info:</strong> {restaurant.contact_info}</p>
            <p><strong>Timings:</strong> {restaurant.opening_time} - {restaurant.closing_time}</p>
            <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
>>>>>>> origin/main
          </div>
        )}
      </section>

<<<<<<< HEAD
      <section>
        <h2>Menu Management</h2>
        <button onClick={() => navigate('/add-dish')}>Add New Dish</button>
        <ul>
          {dishes.map(dish => (
            <li key={dish.id}>
              {dish.name} - ${dish.price}
              <button onClick={() => navigate(`/edit-dish/${dish.id}`)}>Edit</button>
              <button onClick={() => handleDeleteDish(dish.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Order Management</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order #{order.id} - Status: {order.status}
              <select
                value={order.status}
                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
              >
                <option value="new">New</option>
                <option value="preparing">Preparing</option>
                <option value="on_the_way">On the Way</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button onClick={() => navigate(`/order-details/${order.id}`)}>View Details</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RestaurantDashboard;
=======
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
>>>>>>> origin/main
