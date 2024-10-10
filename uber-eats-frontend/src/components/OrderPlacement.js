// src/components/OrderPlacement.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import api, { endpoints } from '../services/api';

const OrderPlacement = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address_line1: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    is_default: false
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    fetchAddresses();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await api.get(endpoints.cartItems);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Failed to load cart items. Please try again.');
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await api.get(endpoints.deliveryAddresses);
      console.log('Fetched addresses:', response.data);
      setAddresses(response.data);
      if (response.data.length > 0) {
        setSelectedAddressId(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError('Failed to load delivery addresses. Please try again.');
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddressId(parseInt(e.target.value));
  };

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      console.log('Adding new address:', newAddress);
      const response = await api.post(endpoints.deliveryAddresses, newAddress);
      console.log('New address added:', response.data);
      setAddresses([...addresses, response.data]);
      setSelectedAddressId(response.data.id);
      setShowNewAddressForm(false);
      setNewAddress({
        address_line1: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        is_default: false
      });
    } catch (error) {
      console.error('Error adding new address:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        setError(`Failed to add new address: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('Failed to add new address: No response received from server');
      } else {
        console.error('Error message:', error.message);
        setError(`Failed to add new address: ${error.message}`);
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError('Please select a delivery address');
      return;
    }

    try {
      const response = await api.post(endpoints.placeOrder, {
        delivery_address_id: selectedAddressId
      });
      console.log('Order placed:', response.data);
      alert('Order placed successfully!');
      navigate('/order-history');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Order Placement</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div>
        <h3>Cart Items</h3>
        {cartItems.map(item => (
          <div key={item.id}>
            <p>{item.dish.name} - Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Select Delivery Address</h3>
        {addresses.map(address => (
          <Form.Check
            key={address.id}
            type="radio"
            id={`address-${address.id}`}
            name="address"
            value={address.id}
            checked={selectedAddressId === address.id}
            onChange={handleAddressChange}
            label={`${address.address_line1}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`}
          />
        ))}
        <Button onClick={() => setShowNewAddressForm(!showNewAddressForm)}>
          {showNewAddressForm ? 'Cancel' : 'Add New Address'}
        </Button>
        {showNewAddressForm && (
          <Form onSubmit={handleAddNewAddress}>
            <Form.Group>
              <Form.Control
                type="text"
                name="address_line1"
                value={newAddress.address_line1}
                onChange={handleNewAddressChange}
                placeholder="Address Line 1"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                placeholder="City"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleNewAddressChange}
                placeholder="State"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="postal_code"
                value={newAddress.postal_code}
                onChange={handleNewAddressChange}
                placeholder="Postal Code"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="country"
                value={newAddress.country}
                onChange={handleNewAddressChange}
                placeholder="Country"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
              type="checkbox"
              label="Set as default address"
              name="is_default"
              checked={newAddress.is_default}
              onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
              />
             </Form.Group>
            <Button type="submit">Add Address</Button>
          </Form>
        )}
      </div>
      <Button onClick={handlePlaceOrder}>Place Order</Button>
    </div>
  );
};

export default OrderPlacement;