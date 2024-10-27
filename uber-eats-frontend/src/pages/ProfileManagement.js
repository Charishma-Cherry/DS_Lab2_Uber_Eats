// import React, { useEffect, useState } from 'react';
// import { Form, Button, Alert, ListGroup } from 'react-bootstrap';
// import api from '../services/api';

// function ProfileManagement() {
//     const [profileData, setProfileData] = useState({});
//     const [dishes, setDishes] = useState([]);
//     const [error, setError] = useState('');
//     const [dishFormData, setDishFormData] = useState({
//         name: '',
//         ingredients: '',
//         description: '',
//         price: '',
//         image: null,
//     });

//     // Fetch profile data on component mount
//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 const response = await api.get('/restaurants/dashboard/', {
//                     headers: { Authorization: `Token ${localStorage.getItem('token')}` }
//                 });
//                 setProfileData(response.data);
//             } catch (err) {
//                 setError('Failed to fetch profile data.');
//                 console.error(err);
//             }
//         };

//         fetchProfileData();
//     }, []); // Only run once on mount

//     // Fetch dishes when profileData.id changes
//     useEffect(() => {
//         const fetchDishes = async () => {
//             if (profileData.id) {  // Ensure profileData.id is available
//                 try {
//                     const response = await api.get(`/restaurants/${profileData.id}/dishes/`, {
//                         headers: { Authorization: `Token ${localStorage.getItem('token')}` }
//                     });
//                     setDishes(response.data);
//                 } catch (err) {
//                     setError('Failed to fetch dishes.');
//                     console.error(err);
//                 }
//             }
//         };

//         fetchDishes();
//     }, [profileData.id]); // Runs whenever profileData.id changes

    
// //   const fetchDishes = async () => {
// //     try {
// //       const response = await api.get('/dishes/');
// //       setDishes(response.data);
// //     } catch (err) {
// //       console.error('Error fetching dishes:', err);
// //     }
// //   };

//     // Handle profile data change
//     const handleProfileChange = (e) => {
//         const { name, value } = e.target;
//         setProfileData({ ...profileData, [name]: value });
//     };

//     // Handle dish form data change
//     const handleDishChange = (e) => {
//         const { name, value } = e.target;
//         setDishFormData({ ...dishFormData, [name]: value });
//     };

//     // Submit profile update
//     const handleProfileSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await api.patch('/restaurants/update_profile/', profileData, {
//                 headers: { Authorization: `Token ${localStorage.getItem('token')}` }
//             });
//             alert('Profile updated successfully!');
//         } catch (err) {
//             setError('Failed to update profile.');
//             console.error(err);
//         }
//     };

//     // Submit dish addition
//     const handleAddDish = async (e) => {
//         e.preventDefault();
        
//         const formDataToSend = new FormData();
        
//         formDataToSend.append('name', dishFormData.name);
//         formDataToSend.append('ingredients', dishFormData.ingredients);
//         formDataToSend.append('description', dishFormData.description);
//         formDataToSend.append('price', dishFormData.price);
        
//         if (dishFormData.image) {
//             formDataToSend.append('image', dishFormData.image);
//         }

//         try {
//             await api.post('/restaurants/add_dish/', formDataToSend, {
//                 headers: { Authorization: `Token ${localStorage.getItem('token')}` }
//             });
//             alert('Dish added successfully!');
//             // Optionally refresh dish list here
//             setDishes([...dishes, dishFormData]); // Update local state with new dish
//             setDishFormData({ name: '', ingredients: '',description: '', price: '', image: null }); // Reset form
//         } catch (err) {
//             setError('Failed to add dish.');
//             console.error(err.response.data); // Log the error response for debugging
//         }
//     };

//     if (error) return <Alert variant="danger">{error}</Alert>;

//     return (
//         <div>
//             <h2>Restaurant Profile</h2>
//             <Form onSubmit={handleProfileSubmit}>
//                 <Form.Group controlId="formBasicName">
//                     <Form.Label>Restaurant Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="name"
//                         value={profileData.name || ''}
//                         onChange={handleProfileChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicAddress">
//                     <Form.Label>Ingredients</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="address"
//                         value={profileData.address || ''}
//                         onChange={handleProfileChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicAddress">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="address"
//                         value={profileData.address || ''}
//                         onChange={handleProfileChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicDescription">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="description"
//                         value={profileData.description || ''}
//                         onChange={handleProfileChange}
//                         required
//                     />
//                 </Form.Group>

//                 {/* Add more fields as necessary */}

//                 <Button variant="primary" type="submit">
//                     Update Profile
//                 </Button>
//             </Form>

//             <h2>Your Dishes</h2>
//             {dishes.length === 0 ? (
//                 <p>No dishes found.</p>
//             ) : (
//                 <ListGroup>
//                     {dishes.map(dish => (
//                         <ListGroup.Item key={dish.id}>
//                             {dish.name} - ${dish.price}
//                             {/* Add options to edit or delete */}
//                         </ListGroup.Item>
//                     ))}
//                 </ListGroup>
//             )}

//             {/* Add form for adding new dishes */}
//             <h3>Add New Dish</h3>
//             <Form onSubmit={handleAddDish}>
//                 <Form.Group controlId="formDishName">
//                     <Form.Label>Dish Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="name"
//                         value={dishFormData.name}
//                         onChange={handleDishChange}
//                         required
//                     />
//             </Form.Group>

//             <Form onSubmit={handleAddDish}>
//                 <Form.Group controlId="formDishName">
//                     <Form.Label>Ingredients</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="name"
//                         value={dishFormData.ingredients}
//                         onChange={handleDishChange}
//                         required
//                     />
//             </Form.Group>

//                 <Form.Group controlId="formDishDescription">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="description"
//                         value={dishFormData.description}
//                         onChange={handleDishChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formDishPrice">
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control
//                         type="number"
//                         name="price"
//                         value={dishFormData.price}
//                         onChange={handleDishChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formDishImage">
//                     <Form.Label>Image</Form.Label>
//                     <Form.Control 
//                         type="file" 
//                         accept="image/*" 
//                         onChange={(e) => setDishFormData({ ...dishFormData, image: e.target.files[0] })} 
//                     />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Add Dish
//                 </Button>
//             </Form>
//         </div>
//     );
// }

// export default ProfileManagement;

import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, ListGroup, Image } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function ProfileManagement() {
    const [profileData, setProfileData] = useState({});
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState('');
    const [dishFormData, setDishFormData] = useState({
        name: '',
        ingredients: '',
        description: '',
        price: '',
        category: '',
        phone_number: '',
        image: null
    });
    const [profilePicture, setProfilePicture] = useState(null);

    const navigate = useNavigate();

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get('/restaurants/dashboard/', {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` }
                });
                setProfileData(response.data);
                setProfilePicture(response.data.image)
                console.log(response.data)
            } catch (err) {
                setError('Failed to fetch profile data.');
                console.error(err);
            }
        };

        fetchProfileData();
    }, []);

    // Fetch dishes when profileData.id changes
    useEffect(() => {
        const fetchDishes = async () => {
            if (profileData.id) {
                try {
                    const response = await api.get(`/restaurants/${profileData.id}/dishes/`, {
                        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
                    }); console.log(response.data)
                    setDishes(response.data);
                } catch (err) {
                    setError('Failed to fetch dishes.');
                    console.error(err);
                }
            }
        };

        fetchDishes();
    }, [profileData.id]);

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
    const handleProfileSubmit = async () => {
        const formDataToSend = new FormData();

        formDataToSend.append('name', profileData.name);
        formDataToSend.append('address', profileData.address);
        formDataToSend.append('description', profileData.description);
        formDataToSend.append('phone_number', profileData.phone_number);
        
        if (profilePicture) {
            formDataToSend.append('image', profilePicture);
        }        
        console.log(profilePicture)
        try {
            await api.patch('/restaurants/update_profile/', formDataToSend, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            alert('Profile updated successfully!');
            window.location.reload();
        } catch (err) {
            setError('Failed to update profile.');
            console.error(err);
        }
    };

    const handleDishRedirect = (dishId) => {
        navigate(`/dish/edit/${dishId}`);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setProfilePicture(file);
          console.log(profilePicture)
          const reader = new FileReader();
         
          reader.readAsDataURL(file);
        }
      };

    // Submit dish addition
    const handleAddDish = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', dishFormData.name);
        formDataToSend.append('ingredients', dishFormData.ingredients);
        formDataToSend.append('description', dishFormData.description);
        formDataToSend.append('category', dishFormData.category);
        formDataToSend.append('price', dishFormData.price);
        formDataToSend.append('restaurant', profileData.id);
        
        if (dishFormData.image) {
            formDataToSend.append('image', dishFormData.image);
        }

        try {
            let dishResponse = await api.post('/restaurants/add_dish/', formDataToSend, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            alert('Dish added successfully!');
            setDishes([...dishes, dishResponse.data]);
            setDishFormData({ name: '', ingredients: '', description: '', price: '', category: '',image: null });
        } catch (err) {
            setError('Failed to add dish.');
            console.error(err.response.data);
        }
    };

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Restaurant Profile</h2>
            <Form >
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

                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={profileData.phone_number || ''}
                        onChange={handleProfileChange}
                        required
                    />
                </Form.Group>

                <Image style={{maxHeight : '300px', width : 'auto'}} src={"http://localhost:8000" + profilePicture || 'default-avatar.png'} fluid />
                <Form.Group controlId="formProfilePicture" className="mt-2" >
                    <Form.Label>Update Restaurant Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => handleProfilePictureChange(e)} accept="image/*" />
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={handleProfileSubmit}>
                    Update Profile
                </Button >
            <h2>Your Dishes</h2>
            {dishes.length === 0 ? (
                <p>No dishes found.</p>
            ) : (
                <ListGroup>
                    {dishes.map(dish => (
                        <ListGroup.Item key={dish.id}>
                            <strong>{dish.name}</strong> - ${dish.price} <br />
                            <em>Category:</em> {dish.category} <br />
                            <em>Ingredients:</em> {dish.ingredients}
                            <Button 
                                variant="link" 
                                size="sm" 
                                style={{ padding: '0', marginLeft: '10px', fontSize: '0.9em' }}
                                onClick={() => handleDishRedirect(dish.id)}
                            >
                                Edit
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

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

                <Form.Group controlId="formDishIngredients">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                        type="text"
                        name="ingredients"
                        value={dishFormData.ingredients}
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

                <Form.Group controlId="formDishPrice">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        value={dishFormData.category}
                        onChange={handleDishChange}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Salad">Salad</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Beverage">Beverage</option>
                    </Form.Control>
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
