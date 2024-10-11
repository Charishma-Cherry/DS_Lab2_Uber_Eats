// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const login = async (username, password) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
    setCartItems([]); // Clear the cart on logout
  };

  const addToCart = (dish) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === dish.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <AuthContext.Provider value={{ user, cartItems, setCartItems, login, logout, addToCart, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};
