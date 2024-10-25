import React, { useState, useEffect } from 'react';
import { Container, CardMedia, Typography, Button, Select, Stack, List, ListItem, Divider, Pagination } from '@mui/material';

import api, { endpoints } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const OrdersManagement = () => {
  const [error, setError] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const { id } = useParams();


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set how many orders you want per page

  // Calculate the start and end indices for the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchRestaurantProfile();
    fetchDishes();
    fetchOrders(id);
    console.log(id)
  }, [id]);

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

  const fetchOrders = async (restaurantId) => {
    try {
      console.log("rest id: "+ restaurantId)
      const response = await api.get('/restaurants/orders?restaurantId='+restaurantId);
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


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>    

      <h2>Order Management</h2>
      
      <List sx={{ width: '60%', bgcolor: 'background.paper' }}>
        {currentOrders.map(order => (
          <ListItem
            key={order.id}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
          >
            Order #{order.id}
            <Divider orientation="vertical" flexItem />
            <div>
              Status: {order.status.toUpperCase()}
              {/* <Select
                value={order.status}
                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="preparing">Preparing</MenuItem>
                <MenuItem value="on_the_way">On the Way</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select> */}
            </div>
            <Button onClick={() => navigate(`/order-details/${order.id}`)}>Go to Order</Button>
          </ListItem>
        ))}
      </List>

    
      <Pagination
        count={Math.ceil(orders.length / itemsPerPage)} // Total number of pages
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
  
      

    </div>
  );
};

export default OrdersManagement;