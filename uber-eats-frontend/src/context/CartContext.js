import React, { createContext, useState } from 'react';

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null);

  // Add item to cart or increment its quantity if already present
  const addToCart = (dish) => {
    if (!dish || !dish.restaurant || !dish.id) {
      console.error("Invalid dish object passed to addToCart:", dish);
      return;
    }

    if (currentRestaurantId && currentRestaurantId !== dish.restaurant.id) {
      const confirmed = window.confirm(
        "You have items from another restaurant in your cart. Do you want to clear your cart and add items from this restaurant?"
      );
      if (!confirmed) return;
      clearCart(); // Clear the cart if the user confirms
    }

    const existingItem = cartItems.find((item) => item.id === dish.id);
    if (existingItem) {
      // Increment the quantity if the item already exists in the cart
      setCartItems(
        cartItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Add the new item to the cart
      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }

    // Set the current restaurant's ID to enforce cart clearing when adding from another restaurant
    setCurrentRestaurantId(dish.restaurant.id);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Increment item quantity in the cart
  const incrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement item quantity, but not below 1
  const decrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setCurrentRestaurantId(null);
  };

  // Calculate total price of all items in the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Calculate the total number of items in the cart
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        calculateTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
