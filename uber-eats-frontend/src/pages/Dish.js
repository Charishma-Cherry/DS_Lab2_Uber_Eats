// src/pages/Dish.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Image, Form } from 'react-bootstrap';
import { Typography, Button, TextField, Box, Input, InputAdornment, MenuItem, Select, FormControl, InputLabel } 
from '@mui/material';
import api, { endpoints } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function Dish() {
  const [dish, setDish] = useState(null);
  const [nameEntered, setNameEntered] = useState('');
  const [ingredientsEntered, setingredientsEntered] = useState('');
  const [descriptionEntered, setDescriptionEntered] = useState('');
  const [priceEntered, setPriceEntered]=useState(true);
  const [categorySelected, setCategorySelected] = useState('');
  const category = ["Appetizer", "Salad", "Main Course", "Dessert", "Beverage"];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [profilePicture, setProfilePicture] = useState(null);


  const loggedIn = localStorage.getItem('token') !== null
  useEffect(() => {
    const fetchDishDetail = async () => {
      try {
        setLoading(true);
        if (id) {
          const [dishResponse] = await Promise.all([
            api.get(`${endpoints.getDish}?dishId=${id}`)
          ]);
          setDish(dishResponse.data[0]);
          setNameEntered(dishResponse.data[0].name || '');
          setingredientsEntered(dishResponse.data[0].ingredients|| '');
          setDescriptionEntered(dishResponse.data[0].description || '');
          setPriceEntered(dishResponse.data[0].price || '');
          setCategorySelected(dishResponse.data[0].category || '');
          setProfilePicture(dishResponse.data[0].image || null)
          console.log(dishResponse.data[0])
        }
      } catch (error) {
        console.error('Error fetching dish details:', error);
        setError('Failed to load dish details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetail();
  }, [id]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      console.log(profilePicture)
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateDish = async (dishId) => {
    try {

      const formDataToSend = new FormData();
      formDataToSend.append('name', nameEntered);
      formDataToSend.append('ingredients', ingredientsEntered);
      formDataToSend.append('description', descriptionEntered);
      formDataToSend.append('category', categorySelected);
      formDataToSend.append('price', priceEntered);
      
      if (profilePicture) {
          formDataToSend.append('image', profilePicture);
      }



      const response = await api.put(`${endpoints.editDish}/?dishId=${dishId}`, formDataToSend);
      console.log('Updated dish details:', response.data);
      alert('Dish updated Successfully');
    } catch (error) {
      console.error('Error updating dish details:', error);
      alert('Failed updating dish details. Please try again.');
    }
  };

  const handleAddDish = async () => {
    try {
      const response = await api.put(`${endpoints.addDish}/?dishId=${id}`, {
        name: nameEntered,
        ingredients: ingredientsEntered,
        description: descriptionEntered,
        category: categorySelected
      });
      console.log('Added dish details:', response.data);
      alert('Dish added Successfully');
    } catch (error) {
      console.error('Error adding dish details:', error);
      alert('Failed adding dish details. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <Container>
      <Card className="dish-card">
        <Card.Body>
          <Typography variant="h5" component="div">Dish Details</Typography>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Name"
              variant="outlined"
              defaultValue={dish ? dish.name : ''}
              size="small"
              onChange={(e) => setNameEntered(e.target.value)}
            />
            
            <TextField
              label="Ingredients"
              variant="outlined"
              defaultValue={dish ? dish.ingredients : ''}
              multiline
              rows={4}
              onChange={(e) => setingredientsEntered(e.target.value)}
            />

            <TextField
              label="Description"
              variant="outlined"
              defaultValue={dish ? dish.description : ''}
              multiline
              rows={4}
              onChange={(e) => setDescriptionEntered(e.target.value)}
            />
            <Input
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Price"
              // value={priceEntered}
              onChange={(e) => setPriceEntered(e.target.value)}
              defaultValue={dish ? dish.price : ''}
              sx={{ m: 1, width: '30ch' }} // Custom styling
            />
          </Box>

          <FormControl sx={{ m: 1, width: '30ch' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={categorySelected}
              label="Category"
              onChange={(e) => setCategorySelected(e.target.value)}
              required
            >
              {category.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            </FormControl>

          <Image src={"http://localhost:8000" + profilePicture || 'default-avatar.png'} fluid />
            <Form.Group controlId="formProfilePicture" className="mt-2">
              <Form.Label>Update Dish Image</Form.Label>
              <Form.Control type="file" onChange={(e) => handleProfilePictureChange(e)} accept="image/*" />
            </Form.Group>
          {loggedIn &&
            <Button
            variant="contained"
            onClick={() => (id ? handleUpdateDish(id) : handleAddDish())}
            className="update-button"
          > 
          
          
            {id ? 'Update Dish' : 'Add Dish'}
          </Button>
          }
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dish;
