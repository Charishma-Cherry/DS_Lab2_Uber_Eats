import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Button, Card, Row, Col } from 'react-bootstrap'; // Use Bootstrap components
import api from '../services/api';

const RestaurantMenu = () => {
  const [menu, setMenu] = useState([]);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await api.get(`/restaurants/${id}/dishes/`);
      setMenu(response.data);
    };

    fetchMenu();
  }, [id]);

  const handleAddToCart = (dish) => {
    addToCart(dish);
    alert(`${dish.name} added to cart!`);
  };

  return (
    <div>
      <h2 className="text-center">Restaurant Menu</h2>
      <Row>
        {menu.map((dish) => (
          <Col key={dish.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>Price: ${dish.price}</Card.Text>
                <Button variant="primary" onClick={() => handleAddToCart(dish)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RestaurantMenu;
