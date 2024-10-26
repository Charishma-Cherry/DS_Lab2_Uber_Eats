import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import api, { endpoints } from '../services/api';
import './OrderPlacement.css'; // Import the CSS for custom styles

const OrderPlacement = () => {
  const [cartItems, setCartItems] = useState([]);
  const [restId, setRestId] = useState(null);
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
  const location = useLocation();
  const [restaurantName, setRestaurantName] = useState('');


  useEffect(() => {
    fetchCartItems();
    fetchAddresses();
  }, []);

  const fetchCartItems = async() => {
    const cart_data = location.state;
    if (!cart_data) {
      navigate('/cart');
    }
    if (cart_data.rest_id && cart_data.rest_cart) {
      setCartItems(cart_data.rest_cart);
      setRestId(cart_data.rest_id);
      //New
       // Fetch restaurant name using the restId
      try {
      const response = await api.get(`${endpoints.restaurants}/${cart_data.rest_id}`.replace(/\/+/g, '/'));
      setRestaurantName(response.data.name); 
      } catch (error) {
      console.error('Error fetching restaurant name:', error);
      setError('Failed to load restaurant name. Please try again.');
      }
      console.log('Cart Items:', cart_data.rest_cart);
    } else {
      navigate('/cart');
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
        setError(`Failed to add new address: ${JSON.stringify(error.response.data)}`);
      } else {
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

      //New
      const orderItems = cartItems.map(item => ({
        dish_id: item.dish.id, 
        quantity: item.quantity
      }));

      const orderData = {
        delivery_address_id: selectedAddressId,
        restaurant_id: restId,
        items: orderItems
      };

      //New
      console.log('Placing Order Data:', orderData); // Log the order data
      const response = await api.post(endpoints.placeOrder, orderData);
      //End New
      console.log('Order placed:', response.data);
      alert('Order placed successfully!');
      navigate('/order-history');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  //New
  // Group cart items by restaurant
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const { restaurant_id } = item.dish; // Assuming each dish has a restaurant_id
    if (!acc[restaurant_id]) {
      acc[restaurant_id] = { restaurantName: restaurantName, items: [] };
    }
    acc[restaurant_id].items.push(item);
    return acc;
  }, {});

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.dish.price * item.quantity), 0);

  return (
    <div className="order-placement-container">
      <h2 className="text-center mb-4">Order Placement</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="mb-4">
        <Card.Header as="h5">Cart Items</Card.Header>
        <Card.Body>
        {Object.entries(groupedCartItems).map(([restaurantId, restaurantGroup]) => (
            <div key={restaurantId} className="restaurant-group">
              <p className="restaurant-name">{restaurantGroup.restaurantName}</p>
              {restaurantGroup.items.map(item => (
                <div key={item.id} className="cart-item">
                  <p>{item.dish.name} - Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          ))}
          <h5 className="mt-3">Total Price: ${totalPrice.toFixed(2)}</h5>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Header as="h5">Select Delivery Address</Card.Header>
        <Card.Body>
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
          <Button variant="link" onClick={() => setShowNewAddressForm(!showNewAddressForm)}>
            {showNewAddressForm ? 'Cancel' : 'Add New Address'}
          </Button>
          {showNewAddressForm && (
            <Form onSubmit={handleAddNewAddress} className="mt-3">
              <Form.Group controlId="address_line1">
                <Form.Control
                  type="text"
                  name="address_line1"
                  value={newAddress.address_line1}
                  onChange={handleNewAddressChange}
                  placeholder="Address Line 1"
                  required
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Control
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleNewAddressChange}
                  placeholder="City"
                  required
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Control
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleNewAddressChange}
                  placeholder="State"
                  required
                />
              </Form.Group>
              <Form.Group controlId="postal_code">
                <Form.Control
                  type="text"
                  name="postal_code"
                  value={newAddress.postal_code}
                  onChange={handleNewAddressChange}
                  placeholder="Postal Code"
                  required
                />
              </Form.Group>
              <Form.Group controlId="country">
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
              <Button type="submit" variant="primary">Add Address</Button>
            </Form>
          )}
        </Card.Body>
      </Card>
      <Button onClick={handlePlaceOrder} variant="success">Place Order</Button>
    </div>
  );
};

export default OrderPlacement;