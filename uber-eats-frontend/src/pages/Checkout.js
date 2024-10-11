import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    if (!address) {
      alert('Please provide a delivery address.');
      return;
    }
    alert('Order placed successfully!');
    clearCart(); // Clear the cart after successful order
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${calculateTotal()}</h3>

      <input
        type="text"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleCheckout}>Confirm and Place Order</button>
    </div>
  );
};

export default Checkout;
