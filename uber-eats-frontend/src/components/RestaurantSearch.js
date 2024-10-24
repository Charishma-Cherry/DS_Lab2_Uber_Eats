// src/components/RestaurantSearch.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function RestaurantSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (onSearch) {
      console.log('Searching for:', searchTerm); // Log search term for debugging
      onSearch(searchTerm); // Call the onSearch function
    }
    setSearchTerm(''); // Clear input after search
  };

  return (
    <Form inline onSubmit={handleSearch}>
      <Form.Control
        type="text"
        placeholder="Search Restaurants"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mr-sm-2"
      />
      <Button type="submit" variant="outline-success">Search</Button>
    </Form>
  );
}

export default RestaurantSearch;
