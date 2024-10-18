// src/pages/RestaurantDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, FormGroup, FormControl } from 'react-bootstrap';
import { Typography, Button, Select, MenuItem, Checkbox, FormControlLabel, TextField, Box, Input, InputAdornment, InputLabel } from '@mui/material';

import api, { endpoints } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function OrderDetail() {
  const [dish, setDish] = useState(null);

  const [vegetarianchecked, setVegetarianChecked] = React.useState(true);
  const [veganchecked, setVeganChecked] = React.useState(true);
  const [glutenfreechecked, setGlutenFreeChecked] = React.useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDishDetail = async () => {
      try {
        setLoading(true);
        if(id) {
            console.log(`Fetching data for dish ID: ${id}`);
            const [dishResponse] = await Promise.all([
            api.get(`${endpoints.getDish}?dishId=${id}`)
            //   api.get(`${endpoints.restaurants}${id}/dishes/`)
            ]);
            console.log('Dish data:', dishResponse.data[0]);
            setDish(dishResponse.data[0])
        }
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError('Failed to load restaurant details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDishDetail();
  }, [id]);

  const handleUpdateDish = async (dishId) => {
    try {
        //TODO: write backend code for editing dish
        const response = await api.put(`${endpoints.editDish}/?dishId=${dishId}`,
            //TODO: pass the rest of the fields
             { vegetarian : vegetarianchecked,
                vegan : veganchecked,
                glutenFree : glutenfreechecked 
              });
        console.log('Updated dish details: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating dish details:', error);
      alert('Failed updating dish details. Please try again.');
    }
  };

  const handleAddDish = async (dishId) => {
    try {
        //TODO: write backend code for adding dish
        const response = await api.put(`${endpoints.addDish}/?dishId=${dishId}`,
                        //TODO: pass the rest of the fields

             { vegetarian : vegetarianchecked,
                vegan : veganchecked,
                glutenFree : glutenfreechecked 
              });
        console.log('Updated dish details: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating dish details:', error);
      alert('Failed updating dish details. Please try again.');
    }
  };


  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;


  if (id !== undefined) {
    if (!dish) return <div className="text-center">Dish not found</div>;
    return <div>
        <Container>
        <Card>
              <Card.Body>
              <Typography variant="h5" component="div">Dish details</Typography>
              <br/>
              <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                  noValidate
                  autoComplete="off"
              >
  
                  <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue={dish.name} size="small"/>
                  <TextField id="outlined-basic" label="Description" variant="outlined" defaultValue={dish.description} multiline rows={4}/>
                  <Input
                      id="filled-adornment-amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label = "Price"
                      defaultValue = {dish.price}
                  />       
              </Box>
              
              <FormGroup>
              <FormControlLabel required control={<Checkbox
                                  checked={dish.is_vegetarian}
                                  onChange={() => setVegetarianChecked(!dish.is_vegetarian)}
                                  />} label = "Vegetarian" />
              <FormControlLabel required control={<Checkbox
                                  checked={dish.is_vegan}
                                  onChange={() => setVeganChecked(!veganchecked)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                  />} label="Vegan" />
              <FormControlLabel required control={<Checkbox
                                  checked={dish.is_gluten_free}
                                  onChange={()=> setGlutenFreeChecked(!glutenfreechecked)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                  />} label="Gluten Free" />
              </FormGroup>
              <Button variant="contained" onClick={() => handleUpdateDish(id)}>Update Dish</Button>
              </Card.Body>
          </Card>
  
      </Container>
      </div>
    
              }else { 
    return <div>
        <Container>
      <Card>
            <Card.Body>
            <Typography variant="h5" component="div">Dish details</Typography>
            <br/>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >

                <TextField id="outlined-basic" label="Name" variant="outlined"  size="small"/>
                <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4}/>
                <Input
                    id="filled-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label = "Price"
                />       
            </Box>
            
            <FormGroup>
            <FormControlLabel required control={<Checkbox
                                onChange={() => setVegetarianChecked(!dish.is_vegetarian)}
                                />} label = "Vegetarian" />
            <FormControlLabel required control={<Checkbox
                                onChange={() => setVeganChecked(!veganchecked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                />} label="Vegan" />
            <FormControlLabel required control={<Checkbox
                                onChange={()=> setGlutenFreeChecked(!glutenfreechecked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                />} label="Gluten Free" />
            </FormGroup>
            <Button variant="contained" onClick={() => handleUpdateDish(id)}>Add Dish</Button>
            </Card.Body>
        </Card>

    </Container>
    </div>
              }  

    
};

export default OrderDetail;