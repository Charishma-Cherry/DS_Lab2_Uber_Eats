// // src/components/Checkout.js
// import React, { useContext, useState } from 'react';
// import { CartContext } from '../context/CartContext';
// import './Checkout.css'; // Import the CSS file

// const Checkout = () => {
//   const { cartItems, calculateTotal, clearCart } = useContext(CartContext);
//   const [address, setAddress] = useState('');

//   const handleCheckout = () => {
//     if (!address) {
//       alert('Please provide a delivery address.');
//       return;
//     }
//     alert('Order placed successfully!');
//     clearCart(); 
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>
//       <ul className="cart-items-list">
//         {cartItems.map((item) => (
//           <li key={item.id} className="cart-item">
//             {item.name} - Quantity: {item.quantity}
//           </li>
//         ))}
//       </ul>
//       <h3 className="total-amount">Total: ${calculateTotal().toFixed(2)}</h3>

//       <input
//         type="text"
//         className="address-input"
//         placeholder="Enter delivery address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <button className="checkout-button" onClick={handleCheckout}>
//         Confirm and Place Order
//       </button>
//     </div>
//   );
// };

// export default Checkout;

// src/components/Checkout.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './Checkout.css';  // Your CSS file for styling

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  
  const handlePlaceOrder = async () => {
    if (!address) {
      alert('Please provide a delivery address.');
      return;
    }

    const orderData = {
      restaurant_id: cartItems[0]?.dish.restaurant.id,  // Assuming all items in cart are from the same restaurant
      delivery_address: address,
    };

    try {
      const token = localStorage.getItem('token');  // Or retrieve token from where it is stored
      const response = await axios.post('http://localhost:8000/api/orders/place_order/', orderData, {
          headers: {
              Authorization: `Token ${token}`,  // Add token if authentication is required
          },
      });
      alert('Order placed successfully!');
      clearCart();  // Clear the cart after successful order placement
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul className="cart-items-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            {item.dish.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <h3 className="total-amount">Total: ${calculateTotal().toFixed(2)}</h3>

      <input
        type="text"
        className="address-input"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="checkout-button" onClick={handlePlaceOrder}>
        Confirm and Place Order
      </button>
    </div>
  );
};

export default Checkout;


