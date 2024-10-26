import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import {
  Container,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  Divider,
  Typography,
  CircularProgress,
} from '@mui/material';

const OrdersManagement = () => {
  const { restaurantId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    fetchOrders();
  }, [restaurantId]);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}/orders`);
      console.log("Fetching orders for restaurant ID:", restaurantId);
      console.log("API Response:", response.data); // Log the entire response

      // Filter orders to include only those related to the logged-in restaurant
      const filteredOrders = response.data.filter(order => order.restaurant.id === parseInt(restaurantId));
      
      setOrders(filteredOrders); // Set only the filtered orders
      const initialSelectedStatuses = {};
      filteredOrders.forEach(order => {
        initialSelectedStatuses[order.id] = order.status;
      });
      setSelectedStatuses(initialSelectedStatuses);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Changing status for order ${orderId} to ${newStatus}`);
    
    setSelectedStatuses(prevState => ({
      ...prevState,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateOrderStatus = async (orderId) => {
    const newStatus = selectedStatuses[orderId];
    console.log(`Updating order ${orderId} status to ${newStatus}`);
    
    try {
      await api.patch(`/orders/${orderId}/`, { status: newStatus });
      console.log('API call successful, updating orders state.');

      setOrders(prevOrders => prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      alert('Order status updated successfully');
    } catch (err) {
      setError('Failed to update order status');
      console.error('Error updating order status:', err);
    }
  };

  const filteredOrders = filterStatus === 'all' ? orders : orders.filter(order => order.status === filterStatus);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>

      <Select value={filterStatus} onChange={handleFilterChange} sx={{ marginBottom: 2 }}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="new">New</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
        <MenuItem value="cancelled">Cancelled</MenuItem>
      </Select>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {filteredOrders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          filteredOrders.map(order => (
            <ListItem key={order.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography>Order #{order.id}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography>Status: {order.status.toUpperCase()}</Typography>
              <Select
                value={selectedStatuses[order.id]}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                sx={{ width: '150px' }}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="preparing">Preparing</MenuItem>
                <MenuItem value="on_the_way">On the Way</MenuItem>
                <MenuItem value="pickup_ready">Pick Up Ready</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="picked_up">Picked Up</MenuItem>
              </Select>
              <Button onClick={() => handleUpdateOrderStatus(order.id)}>Update Status</Button>

              <div style={{ marginLeft: '20px' }}>
                <Typography variant="body1"><strong>Name:</strong> {order.customer.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {order.customer.email}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {order.customer.phone_number}</Typography>
                <Typography variant="body1"><strong>City:</strong> {order.customer.city}</Typography>
                <Typography variant="body1"><strong>State:</strong> {order.customer.state}</Typography>
                <Typography variant="body1"><strong>Country:</strong> {order.customer.country}</Typography>
              </div>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default OrdersManagement;


