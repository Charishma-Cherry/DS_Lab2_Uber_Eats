import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, ListGroup } from 'react-bootstrap';
import api from '../services/api';

function ProfileManagement() {
    const [profileData, setProfileData] = useState({});
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState('');
    const [dishFormData, setDishFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
    });

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get('/restaurants/dashboard/', {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` }
                });
                setProfileData(response.data);
            } catch (err) {
                setError('Failed to fetch profile data.');
                console.error(err);
            }
        };

        fetchProfileData();
    }, []); // Only run once on mount

    // Fetch dishes when profileData.id changes
    useEffect(() => {
        const fetchDishes = async () => {
            if (profileData.id) {  // Ensure profileData.id is available
                try {
                    const response = await api.get(`/restaurants/${profileData.id}/dishes/`, {
                        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
                    });
                    setDishes(response.data);
                } catch (err) {
                    setError('Failed to fetch dishes.');
                    console.error(err);
                }
            }
        };

        fetchDishes();
    }, [profileData.id]); // Runs whenever profileData.id changes

    // Handle profile data change
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // Handle dish form data change
    const handleDishChange = (e) => {
        const { name, value } = e.target;
        setDishFormData({ ...dishFormData, [name]: value });
    };

    // Submit profile update
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch('/restaurants/update_profile/', profileData, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile.');
            console.error(err);
        }
    };

    // Submit dish addition
    const handleAddDish = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        
        formDataToSend.append('name', dishFormData.name);
        formDataToSend.append('description', dishFormData.description);
        formDataToSend.append('price', dishFormData.price);
        
        if (dishFormData.image) {
            formDataToSend.append('image', dishFormData.image);
        }

        try {
            await api.post('/restaurants/add_dish/', formDataToSend, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            alert('Dish added successfully!');
            // Optionally refresh dish list here
            setDishes([...dishes, dishFormData]); // Update local state with new dish
            setDishFormData({ name: '', description: '', price: '', image: null }); // Reset form
        } catch (err) {
            setError('Failed to add dish.');
            console.error(err.response.data); // Log the error response for debugging
        }
    };

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Restaurant Profile</h2>
            <Form onSubmit={handleProfileSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={profileData.name || ''}
                        onChange={handleProfileChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={profileData.address || ''}
                        onChange={handleProfileChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={profileData.description || ''}
                        onChange={handleProfileChange}
                        required
                    />
                </Form.Group>

                {/* Add more fields as necessary */}

                <Button variant="primary" type="submit">
                    Update Profile
                </Button>
            </Form>

            <h2>Your Dishes</h2>
            {dishes.length === 0 ? (
                <p>No dishes found.</p>
            ) : (
                <ListGroup>
                    {dishes.map(dish => (
                        <ListGroup.Item key={dish.id}>
                            {dish.name} - ${dish.price}
                            {/* Add options to edit or delete */}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            {/* Add form for adding new dishes */}
            <h3>Add New Dish</h3>
            <Form onSubmit={handleAddDish}>
                <Form.Group controlId="formDishName">
                    <Form.Label>Dish Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={dishFormData.name}
                        onChange={handleDishChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDishDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={dishFormData.description}
                        onChange={handleDishChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDishPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={dishFormData.price}
                        onChange={handleDishChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDishImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setDishFormData({ ...dishFormData, image: e.target.files[0] })} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Dish
                </Button>
            </Form>
        </div>
    );
}

export default ProfileManagement;