// // src/components/Cart.js

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
// import api, { endpoints } from '../services/api';
// import './Cart.css'; // Import custom CSS
// import { useCart } from '../context/CartContext'; // Import the useCart hook

// const Cart = () => {
//   const { cartItems, setCartItems, setCartCount } = useCart(); // Use context to get cart items and functions
//   const [defaultAddress, setDefaultAddress] = useState(null);
//   const [restaurantNames, setRestaurantNames] = useState(new Map());

//   useEffect(() => {
//     fetchCartItems();
//     fetchDefaultAddress();
//   }, []);

//   useEffect(() => {
//     const totalCount = Array.from(cartItems.values()).reduce((total, rest_cart) => total + rest_cart.length, 0);
//     setCartCount(totalCount); 
//     console.log('Updated cartCount:', totalCount); 
// }, [cartItems, setCartCount]);


//   // const fetchCartItems = async () => {
//   //   try {
//   //     const response = await api.get(endpoints.cartItems);
//   //     let grouped_carts = new Map();
//   //     for (const item of response.data) {
//   //       const rest_id = item.dish?.restaurant;
//   //       // let rest_id = item.dish['restaurant'];
//   //        // Check if rest_id is defined before proceeding
//   //       if (!rest_id) {
//   //         console.error(`CartItem with id ${item.id} has no associated restaurant.`);
//   //         continue; // Skip this item if there's no restaurant
//   //       }
//   //       if (!grouped_carts.has(rest_id)) {
//   //         grouped_carts.set(rest_id, []);
          
//   //         const restaurant = await api.get(endpoints.restaurants + rest_id.toString());
//   //         let rest_names = restaurantNames;
//   //         rest_names.set(rest_id, restaurant.data.name);
//   //         setRestaurantNames(rest_names);
//   //       }
//   //       grouped_carts.get(rest_id).push(item);
//   //     }
//   //     setCartItems(grouped_carts); 
//   //   } catch (error) {
//   //     console.error('Error fetching cart items:', error);
//   //   }
//   // };
  
//   const fetchCartItems = async () => {
//     try {
//         const response = await api.get(endpoints.cartItems);
//         console.log("Fetched Cart Items:", response.data);

//         let grouped_carts = new Map();

//         for (const item of response.data) {
//             const rest_id = item.dish?.restaurant;

//             if (rest_id) {
//                 if (!grouped_carts.has(rest_id)) {
//                     const restaurantResponse = await api.get(`${endpoints.restaurants}${rest_id}`);
//                     console.log(`Fetched restaurant data for ID ${rest_id}:`, restaurantResponse.data);
                    
//                     grouped_carts.set(rest_id, {
//                         restaurant: restaurantResponse.data,
//                         items: []
//                     });
//                 }
//                 grouped_carts.get(rest_id).items.push(item);
//             } else {
//                 console.warn(`CartItem with id ${item.id} has no associated restaurant.`);
//             }
//         }

//         setCartItems(grouped_carts); // Finalize cart items grouping
//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//     }
// };


//   const fetchDefaultAddress = async () => {
//     try {
//       const response = await api.get(endpoints.deliveryAddresses);
//       if (response.data.length > 0) {
//         setDefaultAddress(response.data[0]);
//       }
//     } catch (error) {
//       console.error('Error fetching default address:', error);
//     }
//   };

//   const handleUpdateQuantity = async (itemId, newQuantity) => {
//     try {
//       await api.patch(`${endpoints.cartItems}${itemId}/`, { quantity: newQuantity });
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error updating cart item quantity:', error);
//     }
//   };

//   const handleRemoveItem = async (itemId) => {
//     try {
//       await api.delete(`${endpoints.cartItems}${itemId}/`);
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error removing cart item:', error);
//     }
//   };

//   const calculateTotal = (rest_cart) => {
//     return rest_cart.reduce((total, item) => total + item.dish.price * item.quantity, 0).toFixed(2);
//   };

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">Your Cart</h2>
//       {Array.from(cartItems).length === 0 ? (
//         <p className="empty-cart">Your cart is empty.</p>
//       ) : (
//         <>
//           <ListGroup>
//             {Array.from(cartItems).map(([rest_id, rest_cart]) => (
//               <div key={rest_id}>
//                 <h6 className="restaurant-name">{restaurantNames.get(rest_id)}</h6>
//                 <ListGroup className="cart-list">
//                   {rest_cart.map((item) => (
//                     <ListGroup.Item key={item.id} className="cart-item">
//                       <Row>
//                         <Col xs={6}>
//                           <h5 className="dish-name">{item.dish.name}</h5>
//                           <p className="dish-price">Price: ${item.dish.price}</p>
//                         </Col>
//                         <Col xs={3} className="quantity-controls">
//                           <Button variant="outline-secondary" size="sm" className="quantity-btn" onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
//                           <span className="quantity">{item.quantity}</span>
//                           <Button variant="outline-secondary" size="sm" className="quantity-btn" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
//                         </Col>
//                         <Col xs={3} className="remove-controls">
//                           <Button variant="danger" size="sm" className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>

//                 <Card className="mt-3">
//                   <Card.Body>
//                     <h3>Total: ${calculateTotal(rest_cart)}</h3>
//                     {defaultAddress && (
//                       <div>
//                         <h4>Default Delivery Address:</h4>
//                         <p>{defaultAddress.address_line1}, {defaultAddress.city}, {defaultAddress.state}</p>
//                       </div>
//                     )}
//                     <div className="checkout-container">
//                       <Link to="/order-placement" state={{ rest_id, rest_cart }}>
//                         <Button className="checkout-button">Proceed to Checkout</Button>
//                       </Link>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </div>
//             ))}
//           </ListGroup>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


// src/components/Cart.js
// src/components/Cart.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
import './Cart.css'; // Import custom CSS
import { useCart } from '../context/CartContext'; // Import the useCart hook

const Cart = () => {
  const { cartItems, setCartItems, setCartCount } = useCart(); // Use context to get cart items and functions
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [restaurantNames, setRestaurantNames] = useState(new Map());

  useEffect(() => {
    fetchCartItems();
    fetchDefaultAddress();
  }, []);

  useEffect(() => {
    const totalCount = Array.from(cartItems.values()).reduce((total, rest_cart) => total + rest_cart.length, 0);
    setCartCount(totalCount); 
    console.log('Updated cartCount:', totalCount); 
  }, [cartItems, setCartCount]);

  const fetchCartItems = async () => {
    try {
      const response = await api.get(endpoints.cartItems);
      console.log("Fetched Cart Items:", response.data);

      const groupedCarts = new Map();

      // Grouping items by restaurant
      for (const item of response.data) {
        const rest_id = item.restaurant; // restaurant ID
        if (!groupedCarts.has(rest_id)) {
          groupedCarts.set(rest_id, {
            restaurant: item.dish.restaurant, // Assuming the restaurant ID is stored in the dish object
            items: []
          });
        }
        groupedCarts.get(rest_id).items.push(item);
      }

      setCartItems(groupedCarts); // Finalize cart items grouping
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const response = await api.get(endpoints.deliveryAddresses);
      if (response.data.length > 0) {
        setDefaultAddress(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching default address:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await api.patch(`${endpoints.cartItems}${itemId}/`, { quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`${endpoints.cartItems}${itemId}/`);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.dish.price) * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {Array.from(cartItems).length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ListGroup>
            {Array.from(cartItems).map(([rest_id, rest_cart]) => (
              <div key={rest_id}>
                <h6 className="restaurant-name">{restaurantNames.get(rest_id) || `Restaurant: ${rest_id}`}</h6>
                <ListGroup className="cart-list">
                  {rest_cart.items.map((item) => (
                    <ListGroup.Item key={item.id} className="cart-item">
                      <Row>
                        <Col xs={6}>
                          <h5 className="dish-name">{item.dish.name}</h5>
                          <p className="dish-price">Price: ${item.dish.price}</p>
                        </Col>
                        <Col xs={3} className="quantity-controls">
                          <Button variant="outline-secondary" size="sm" className="quantity-btn" 
                                  onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                          <span className="quantity">{item.quantity}</span>
                          <Button variant="outline-secondary" size="sm" className="quantity-btn" 
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                        </Col>
                        <Col xs={3} className="remove-controls">
                          <Button variant="danger" size="sm" className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <Card className="mt-3">
                  <Card.Body>
                    <h3>Total: ${calculateTotal(rest_cart.items)}</h3>
                    {defaultAddress && (
                      <div>
                        <h4>Default Delivery Address:</h4>
                        <p>{defaultAddress.address_line1}, {defaultAddress.city}, {defaultAddress.state}</p>
                      </div>
                    )}
                    <div className="checkout-container">
                      <Link to="/order-placement" state={{ rest_id, rest_cart: rest_cart.items }}>
                        <Button className="checkout-button">Proceed to Checkout</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default Cart;


