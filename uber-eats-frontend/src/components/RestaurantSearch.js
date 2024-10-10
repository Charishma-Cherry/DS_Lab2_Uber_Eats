import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, CircularProgress } from '@mui/material';

/**
 * RestaurantSearch component
 * Allows users to search for restaurants based on search term, cuisine type, and location
 */
const RestaurantSearch = ({ onSearch, isLoading }) => {
  // State for search inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');

  // Handler for search button click
  const handleSearch = () => {
    onSearch({ searchTerm, cuisineType, location });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Search restaurants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Cuisine Type</InputLabel>
          <Select
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="italian">Italian</MenuItem>
            <MenuItem value="chinese">Chinese</MenuItem>
            <MenuItem value="indian">Indian</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button 
          onClick={handleSearch} 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default RestaurantSearch;