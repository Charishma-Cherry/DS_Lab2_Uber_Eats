import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Button, Table } from 'react-bootstrap'; // Use Bootstrap components

const Cart = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, calculateTotal } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button variant="outline-success" onClick={() => incrementQuantity(item.id)}>+1</Button>
                    <Button variant="outline-warning" onClick={() => decrementQuantity(item.id)}>-1</Button>
                    <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Total: ${calculateTotal()}</h3>
          <Button variant="primary">Proceed to Checkout</Button>
        </>
      )}
    </div>
  );
};

export default Cart;
