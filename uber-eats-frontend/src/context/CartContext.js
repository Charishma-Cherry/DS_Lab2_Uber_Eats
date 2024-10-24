// src/context/CartContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(new Map());
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount, setCartCount }}>
        {children}
    </CartContext.Provider>
   );

};

export const useCart = () => {
  return useContext(CartContext);
};
