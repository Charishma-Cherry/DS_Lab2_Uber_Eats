// src/pages/Dish.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, FormGroup } from 'react-bootstrap';
import { Typography, Button, Checkbox, FormControlLabel, TextField, Box, Input, InputAdornment } from '@mui/material';

import api, { endpoints } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function Dish() {
  const [dish, setDish] = useState(null);
  const [vegetarianChecked, setVegetarianChecked] = useState(true);
  const [veganChecked, setVeganChecked] = useState(true);
  const [glutenFreeChecked, setGlutenFreeChecked] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDishDetail = async () => {
      try {
        setLoading(true);
        if (id) {
          const [dishResponse] = await Promise.all([
            api.get(`${endpoints.getDish}?dishId=${id}`)
          ]);
          setDish(dishResponse.data[0]);
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

  const handleUpdateDish = async (dishId) => {
    try {
      const response = await api.put(`${endpoints.editDish}/?dishId=${dishId}`, {
        vegetarian: vegetarianChecked,
        vegan: veganChecked,
        glutenFree: glutenFreeChecked
      });
      console.log('Updated dish details:', response.data);
    } catch (error) {
      console.error('Error updating dish details:', error);
      alert('Failed updating dish details. Please try again.');
    }
  };

  const handleAddDish = async () => {
    try {
      const response = await api.put(`${endpoints.addDish}/?dishId=${id}`, {
        vegetarian: vegetarianChecked,
        vegan: veganChecked,
        glutenFree: glutenFreeChecked
      });
      console.log('Added dish details:', response.data);
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
            />
            <TextField
              label="Description"
              variant="outlined"
              defaultValue={dish ? dish.description : ''}
              multiline
              rows={4}
            />
            <Input
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Price"
              defaultValue={dish ? dish.price : ''}
              sx={{ m: 1, width: '30ch' }} // Custom styling
            />
          </Box>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox
                checked={vegetarianChecked}
                onChange={() => setVegetarianChecked(!vegetarianChecked)}
              />}
              label="Vegetarian"
            />
            <FormControlLabel
              control={<Checkbox
                checked={veganChecked}
                onChange={() => setVeganChecked(!veganChecked)}
              />}
              label="Vegan"
            />
            <FormControlLabel
              control={<Checkbox
                checked={glutenFreeChecked}
                onChange={() => setGlutenFreeChecked(!glutenFreeChecked)}
              />}
              label="Gluten Free"
            />
          </FormGroup>

          <Button
            variant="contained"
            onClick={() => (id ? handleUpdateDish(id) : handleAddDish())}
            className="update-button"
          >
            {id ? 'Update Dish' : 'Add Dish'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dish;
