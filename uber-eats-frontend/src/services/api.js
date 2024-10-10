import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const endpoints = {
  customerLogin: '/customers/login/',
  customerSignup: '/customers/signup/',
  customerProfile: '/customers/me/',
  restaurants: '/restaurants/',
  dishes: '/dishes/',
  orders: '/orders/',
  placeOrder: '/orders/place_order/',
  cartItems: '/cart-items/',
  addToCart: '/cart-items/add_to_cart/',
  favoriteRestaurants: '/favorite-restaurants/',
  toggleFavorite: '/favorite-restaurants/toggle_favorite/',
  deliveryAddresses: '/delivery-addresses/',
};

export default api;
