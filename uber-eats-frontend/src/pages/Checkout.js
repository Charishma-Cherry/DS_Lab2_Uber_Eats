// src/components/Checkout.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './Checkout.css'; // Import the CSS file

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    if (!address) {
      alert('Please provide a delivery address.');
      return;
    }
    alert('Order placed successfully!');
    clearCart(); 
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul className="cart-items-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            {item.name} - Quantity: {item.quantity}
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
      <button className="checkout-button" onClick={handleCheckout}>
        Confirm and Place Order
      </button>
    </div>
  );
};

export default Checkout;
