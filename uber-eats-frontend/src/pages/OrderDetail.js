// src/pages/RestaurantDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { Typography, Button, Select, MenuItem } from '@mui/material';

import api, { endpoints } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function OrderDetail() {
  const [order, setOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        console.log(`Fetching data for order ID: ${id}`);
        const [orderResponse] = await Promise.all([
          api.get(`${endpoints.orderDetail}?orderId=${id}`)
        //   api.get(`${endpoints.restaurants}${id}/dishes/`)
        ]);
        console.log('Restaurant data:', orderResponse.data[0]);
        setOrder(orderResponse.data[0])
        setSelectedStatus(orderResponse.data[0].status)
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError('Failed to load restaurant details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderDetail();
  }, [id]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
        const response = await api.patch(`/orders/${orderId}/`, { status: newStatus });
        console.log('Updated order status:' + JSON.stringify(response.data));
      // Show a success message to the user
    //   alert('Dish added to cart successfully!');
      // Optionally, you can update the cart count in the header here
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed updating order status. Please try again.');
    }
  };


  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!order) return <div className="text-center">Order not found</div>;

  return (
    <Container>

      <Card>
            <Card.Body>
            <Typography variant="h5" component="div">Order details</Typography>

                <Card.Text>Dishes and list incl price</Card.Text>


            <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="preparing">Preparing</MenuItem>
                <MenuItem value="on_the_way">On the Way</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select> 
                <Button variant="contained" onClick={() => handleUpdateOrderStatus(id, selectedStatus)}>Update Status</Button>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
            <Typography variant="h5" component="div">Customer details</Typography>
                <Card.Text>Name : {order.customer.name}</Card.Text>
                <Card.Text>Phone : {order.customer.phone_number}</Card.Text>
                <br/>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Delivery Address</Typography>
                <Card.Text>Street 1 : {order.delivery_address.address_line1}</Card.Text>
                <Card.Text>City : {order.delivery_address.city}</Card.Text>
                <Card.Text>State : {order.delivery_address.state}</Card.Text>
                <Card.Text>Postal Code : {order.delivery_address.postal_code}</Card.Text>
            </Card.Body>
        </Card>
    </Container>
  );
}

export default OrderDetail;