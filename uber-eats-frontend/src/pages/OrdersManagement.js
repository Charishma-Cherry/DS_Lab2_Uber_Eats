// import React, { useState, useEffect } from 'react';
// import { Container, CardMedia, Typography, Button, Select, Stack, List, ListItem, Divider, Pagination } from '@mui/material';

// import api, { endpoints } from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const RestaurantDashboard = () => {
//   const [error, setError] = useState('');
//   const [restaurant, setRestaurant] = useState(null);
//   const [dishes, setDishes] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('all');
//   const navigate = useNavigate();

// //   // Pagination state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 5; // Set how many orders you want per page

// //   // Calculate the start and end indices for the current page
// //   const indexOfLastOrder = currentPage * itemsPerPage;
// //   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
// //   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

// //   // Handle page change
// //   const handlePageChange = (event, value) => {
// //     setCurrentPage(value);
// //   };

// //   useEffect(() => {
// //     fetchRestaurantProfile();
// //     fetchDishes();
// //     fetchOrders(1);
// //   }, []);

// //   const fetchRestaurantProfile = async () => {
// //     try {
// //       const response = await api.get('/restaurants/me/');
// //       setRestaurant(response.data);
// //     } catch (err) {
// //       console.error('Error fetching restaurant profile:', err);
// //     }
// //   };

// //   const fetchDishes = async () => {
// //     try {
// //       const response = await api.get('/dishes/');
// //       setDishes(response.data);
// //     } catch (err) {
// //       console.error('Error fetching dishes:', err);
// //     }
// //   };

// //   const fetchOrders = async (restaurantId) => {
// //     try {
// //       const response = await api.get('/restaurants/orders?restaurantId='+restaurantId);
// //       setOrders(response.data);
// //     } catch (err) {
// //       setError('Failed to fetch orders');
// //       console.error('Error fetching orders:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleProfileUpdate = async (updatedData) => {
// //     try {
// //       const response = await api.patch('/restaurants/me/', updatedData);
// //       setRestaurant(response.data);
// //       alert('Profile updated successfully');
// //     } catch (err) {
// //       setError('Failed to update profile');
// //       console.error('Error updating profile:', err);
// //     }
// //   };

// //   const handleAddDish = async (newDish) => {
// //     try {
// //       const response = await api.post('/dishes/', newDish);
// //       setDishes([...dishes, response.data]);
// //       alert('Dish added successfully');
// //     } catch (err) {
// //       setError('Failed to add dish');
// //       console.error('Error adding dish:', err);
// //     }
// //   };

// //   const handleUpdateDish = async (dishId, updatedDish) => {
// //     try {
// //       const response = await api.patch(`/dishes/${dishId}/`, updatedDish);
// //       setDishes(dishes.map(dish => dish.id === dishId ? response.data : dish));
// //       alert('Dish updated successfully');
// //     } catch (err) {
// //       setError('Failed to update dish');
// //       console.error('Error updating dish:', err);
// //     }
// //   };

// //   const handleDeleteDish = async (dishId) => {
// //     try {
// //       await api.delete(`/dishes/${dishId}/`);
// //       setDishes(dishes.filter(dish => dish.id !== dishId));
// //       alert('Dish deleted successfully');
// //     } catch (err) {
// //       setError('Failed to delete dish');
// //       console.error('Error deleting dish:', err);
// //     }
// //   };


// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   //return (
// //     // <div>
// //     //   <h1>Restaurant Dashboard</h1>
      
// //     //   <section>
// //     //     <h2>Profile Management</h2>
// //     //     {restaurant && (
// //     //       <div>
// //     //         <p>Name: {restaurant.name}</p>
// //     //         <p>Description: {restaurant.description}</p>
// //     //         <p>Location: {restaurant.location}</p>
// //     //         <p>Contact Info: {restaurant.contact_info}</p>
// //     //         <p>Opening Time: {restaurant.opening_time}</p>
// //     //         <p>Closing Time: {restaurant.closing_time}</p>
// //     //         <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
// //     //       </div>
// //     //     )}
// //     //   </section>

// //     //   <section>
// //     //     <h2>Menu Management</h2>
// //     //     <Button onClick={() => navigate('/dish/add')}>Add New Dish</Button>
// //     //     <ul>
// //     //       {dishes.map(dish => (
// //     //         <li key={dish.id}>
// //     //           {dish.name} - ${dish.price}
// //     //           <Button onClick={() => navigate(`/dish/edit/${dish.id}`)}>Edit</Button>
// //     //           <Button onClick={() => handleDeleteDish(dish.id)}>Delete</Button>
// //     //         </li>
// //     //       ))}
// //     //     </ul>
// //     //   </section>
//       <h2>Order Management</h2>
      
     
//       <List sx={{ width: '60%', bgcolor: 'background.paper' }}>
//         {currentOrders.map(order => (
//           <ListItem
//             key={order.id}
//             sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
//           >
//             Order #{order.id}
//             <Divider orientation="vertical" flexItem />
//             <div>
//               Status: {order.status.toUpperCase()}
//               {/* <Select
//                 value={order.status}
//                 onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
//               >
//                 <MenuItem value="new">New</MenuItem>
//                 <MenuItem value="preparing">Preparing</MenuItem>
//                 <MenuItem value="on_the_way">On the Way</MenuItem>
//                 <MenuItem value="delivered">Delivered</MenuItem>
//                 <MenuItem value="cancelled">Cancelled</MenuItem>
//               </Select> */}
//             </div>
//             <Button onClick={() => navigate(`/order-details/${order.id}`)}>Go to Order</Button>
//           </ListItem>
//         ))}
//       </List>

    
//       <Pagination
//         count={Math.ceil(orders.length / itemsPerPage)} // Total number of pages
//         page={currentPage}
//         onChange={handlePageChange}
//         color="primary"
//         sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
//       />
  
      

//     </div>
//   );
// };

// export default OrdersManagement;
//=================================
// import React, { useState, useEffect } from 'react';
// import { List, ListItem, Button, Divider, Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import api from '../services/api'; // Assuming api is set up for requests
// import { useNavigate } from 'react-router-dom';

// const OrdersManagement = () => {
//   const [orders, setOrders] = useState([]); // Holds fetched orders
//   const [filterStatus, setFilterStatus] = useState('all'); // For filtering orders by status
//   const [loading, setLoading] = useState(true); // For loading state
//   const [currentPage, setCurrentPage] = useState(1); // For pagination
//   const itemsPerPage = 5; // Number of items per page
//   const navigate = useNavigate();

//   // Fetch orders from the API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await api.get('/api/orders'); // Adjust API path as necessary
//         setOrders(response.data);
//       } catch (err) {
//         console.error('Failed to fetch orders', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Filtered orders based on the selected status
//   const filteredOrders = filterStatus === 'all'
//     ? orders
//     : orders.filter(order => order.status.toLowerCase() === filterStatus);

//   // Pagination logic
//   const indexOfLastOrder = currentPage * itemsPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // Handle page change
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   // Handle filter change
//   const handleFilterChange = (event) => {
//     setFilterStatus(event.target.value);
//     setCurrentPage(1); // Reset to first page when changing filter
//   };

//   // Handle updating the order status
//   const handleUpdateOrderStatus = async (orderId, newStatus) => {
//     try {
//       await api.patch(`/restaurants/orders/${orderId}`, { status: newStatus });
//       setOrders(orders.map(order =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       ));
//       alert('Order status updated successfully');
//     } catch (err) {
//       console.error('Failed to update order status', err);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Orders Management</h2>
      
//       {/* Filter Dropdown */}
//       <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
//         <InputLabel>Status Filter</InputLabel>
//         <Select value={filterStatus} onChange={handleFilterChange} label="Status Filter">
//           <MenuItem value="all">All</MenuItem>
//           <MenuItem value="new">New</MenuItem>
//           <MenuItem value="delivered">Delivered</MenuItem>
//           <MenuItem value="cancelled">Cancelled</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Orders List */}
//       <List sx={{ width: '60%', bgcolor: 'background.paper' }}>
//         {currentOrders.map(order => (
//           <ListItem
//             key={order.id}
//             sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
//           >
//             <div>
//               <strong>Order #{order.id}</strong>
//               <Divider orientation="vertical" flexItem />
//               Status: {order.status.toUpperCase()}
//               <p><strong>Customer:</strong> {order.customer?.name || 'Unknown'}</p> {/* Display customer name */}
//             </div>
            
//             {/* Update Status Dropdown */}
//             <FormControl sx={{ minWidth: 150 }}>
//               <Select
//                 value={order.status}
//                 onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
//                 displayEmpty
//               >
//                 <MenuItem value="order_received">Order Received</MenuItem>
//                 <MenuItem value="preparing">Preparing</MenuItem>
//                 <MenuItem value="on_the_way">On the Way</MenuItem>
//                 <MenuItem value="pick_up_ready">Pick Up Ready</MenuItem>
//                 <MenuItem value="delivered">Delivered</MenuItem>
//                 <MenuItem value="picked_up">Picked Up</MenuItem>
//               </Select>
//             </FormControl>
            
//             {/* Button to view order details */}
//             <Button onClick={() => navigate(`/order-details/${order.id}`)}>Go to Order</Button>
//           </ListItem>
//         ))}
//       </List>

//       {/* Pagination */}
//       <Pagination
//         count={Math.ceil(filteredOrders.length / itemsPerPage)}
//         page={currentPage}
//         onChange={handlePageChange}
//         color="primary"
//         sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
//       />
//     </div>
//   );
// };

// export default OrdersManagement;

//=================

// src/pages/OrdersManagement.js

import React, { useState, useEffect } from 'react';
import { List, ListItem, Button, Divider, Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders');
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status.toLowerCase() === filterStatus);

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

//   const handleUpdateOrderStatus = async (orderId, newStatus) => {
//     try {
//       await api.patch(`/api/orders/${orderId}/update_order_status/`, { status: newStatus });
//       setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
//       alert('Order status updated successfully');
//     } catch (err) {
//       console.error('Failed to update order status', err);
//     }
//   };

const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/api/orders/${orderId}/update_order_status/`, { status: newStatus });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
      alert('Order status updated successfully');
    } catch (err) {
      console.error('Failed to update order status', err);
    }
  };
  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Orders Management</h2>

      <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel>Status Filter</InputLabel>
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status Filter">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <List sx={{ width: '60%', bgcolor: 'background.paper' }}>
        {currentOrders.map(order => (
          <ListItem key={order.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <div>
              <strong>Order #{order.id}</strong>
              <Divider orientation="vertical" flexItem />
              Status: {order.status.toUpperCase()}
              <p><strong>Customer:</strong> {order.customer?.name || 'Unknown'}</p>
            </div>
            <FormControl sx={{ minWidth: 150 }}>
              <Select value={order.status} onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)} displayEmpty>
                <MenuItem value="order_received">Order Received</MenuItem>
                <MenuItem value="preparing">Preparing</MenuItem>
                <MenuItem value="on_the_way">On the Way</MenuItem>
                <MenuItem value="pick_up_ready">Pick Up Ready</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="picked_up">Picked Up</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={() => navigate(`/order-details/${order.id}`)}>Go to Order</Button>
          </ListItem>
        ))}
      </List>

      <Pagination
        count={Math.ceil(filteredOrders.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
    </div>
  );
};

export default OrdersManagement;



