// // src/pages/OrderDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { Typography, Button, Select, MenuItem } from '@mui/material';

import api, { endpoints } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './OrderDetail.css'; // Importing the CSS file for styling

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
        ]);
        console.log('Order data:', orderResponse.data[0]);
        setOrder(orderResponse.data[0]);
        setSelectedStatus(orderResponse.data[0].status);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderDetail();
  }, [id]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
        const response = await api.post(`/orders/updateOrderStatus/`, { status: newStatus, orderId : orderId });
        console.log('Updated order status:', response.data);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!order) return <div className="text-center">Order not found</div>;

  return (
    <Container className="order-detail-container">
      <Card className="mb-4">
        <Card.Body>
          <Typography variant="h5" component="div">Order Details</Typography>
          <Card.Text>Dishes and Prices:</Card.Text>
          {/* Replace with actual dishes and prices */}
          <Typography variant="body2" color="text.secondary">
            {/* Example dishes */}
            {/* {order.dishes.map(dish => (
              <div key={dish.id}>{dish.name} - ${dish.price.toFixed(2)}</div>
            ))} */}
          </Typography>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-select"
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="preparing">Preparing</MenuItem>
            <MenuItem value="on_the_way">On the Way</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select> 
          <Button variant="contained" onClick={() => handleUpdateOrderStatus(id, selectedStatus)} className="update-button">
            Update Status
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Typography variant="h5" component="div">Customer Details</Typography>
          <Card.Text>Name: {order.customer.name}</Card.Text>
          <Card.Text>Phone: {order.customer.phone_number}</Card.Text>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Delivery Address:</Typography>
          <Card.Text>Street 1: {order.delivery_address.address_line1}</Card.Text>
          <Card.Text>City: {order.delivery_address.city}</Card.Text>
          <Card.Text>State: {order.delivery_address.state}</Card.Text>
          <Card.Text>Postal Code: {order.delivery_address.postal_code}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default OrderDetail;

// src/pages/OrderDetail.js

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Card } from 'react-bootstrap';
// import { Typography, Button, Select, MenuItem } from '@mui/material';

// import api from '../services/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import './OrderDetail.css';

// function OrderDetail() {
//   const [order, setOrder] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchOrderDetail = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get(`/api/orders/${id}/`);
//         setOrder(response.data);
//         setSelectedStatus(response.data.status);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//         setError('Failed to load order details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetail();
//   }, [id]);

//   const handleUpdateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const response = await api.patch(`/api/orders/${orderId}/update_order_status/`, { status: newStatus });
//       console.log('Updated order status:', response.data);
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update order status. Please try again.');
//     }
//   };

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-center text-danger">{error}</div>;
//   if (!order) return <div className="text-center">Order not found</div>;

//   return (
//     <Container className="order-detail-container">
//       <Card className="mb-4">
//         <Card.Body>
//           <Typography variant="h5" component="div">Order Details</Typography>
//           <Card.Text>Dishes and Prices:</Card.Text>
//           <Typography variant="body2" color="text.secondary">
//             {order.dishes.map(dish => (
//               <div key={dish.id}>{dish.name} - ${dish.price.toFixed(2)}</div>
//             ))}
//           </Typography>
//           <Select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="status-select"
//           >
//             <MenuItem value="new">New</MenuItem>
//             <MenuItem value="preparing">Preparing</MenuItem>
//             <MenuItem value="on_the_way">On the Way</MenuItem>
//             <MenuItem value="delivered">Delivered</MenuItem>
//             <MenuItem value="cancelled">Cancelled</MenuItem>
//           </Select>
//           <Button variant="contained" onClick={() => handleUpdateOrderStatus(id, selectedStatus)} className="update-button">
//             Update Status
//           </Button>
//         </Card.Body>
//       </Card>

//       <Card>
//         <Card.Body>
//           <Typography variant="h5" component="div">Customer Details</Typography>
//           <Card.Text>Name: {order.customer.name}</Card.Text>
//           <Card.Text>Phone: {order.customer.phone_number}</Card.Text>
//           <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Delivery Address:</Typography>
//           <Card.Text>Street 1: {order.delivery_address.address_line1}</Card.Text>
//           <Card.Text>City: {order.delivery_address.city}</Card.Text>
//           <Card.Text>State: {order.delivery_address.state}</Card.Text>
//           <Card.Text>Postal Code: {order.delivery_address.postal_code}</Card.Text>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

// export default OrderDetail;
