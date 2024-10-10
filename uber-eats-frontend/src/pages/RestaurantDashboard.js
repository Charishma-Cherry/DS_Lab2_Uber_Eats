import React, { useState, useEffect } from 'react';
import api, { endpoints } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setError('Failed to fetch restaurant profile');
      console.error('Error fetching restaurant profile:', err);
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await api.get('/dishes/');
      setDishes(response.data);
    } catch (err) {
      setError('Failed to fetch dishes');
      console.error('Error fetching dishes:', err);
    }
  };

  const fetchOrders = async () => {
    try {
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
      console.error('Error updating order status:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Restaurant Dashboard</h1>
      
      <section>
        <h2>Profile Management</h2>
        {restaurant && (
          <div>
            <p>Name: {restaurant.name}</p>
            <p>Description: {restaurant.description}</p>
            <p>Location: {restaurant.location}</p>
            <p>Contact Info: {restaurant.contact_info}</p>
            <p>Opening Time: {restaurant.opening_time}</p>
            <p>Closing Time: {restaurant.closing_time}</p>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          </div>
        )}
      </section>

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