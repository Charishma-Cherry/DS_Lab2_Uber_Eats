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

// Remove the response interceptor for JWT refresh

export const endpoints = {
  customerLogin: '/customers/login/',
  customerSignup: '/customers/signup/',
  //customerProfile: '/customers/me/',
  customerProfile: '/customers/profile/',
  updateProfile: '/customers/update_profile/',
  restaurants: '/restaurants/',
  // dishes: '/dishes/',
  orders: '/orders/',
 // order_details: '/orders/',
  order_details: '/cart-items/order_details/',
  placeOrder: '/orders/place_order/',
  cartItems: '/cart-items/',
  addToCart: '/cart-items/add_to_cart/',
  favoriteRestaurants: '/favorite-restaurants/',
  toggleFavorite: '/favorite-restaurants/toggle_favorite/',
  deliveryAddresses: '/delivery-addresses/',
};

//to handle profile updates
export const updateProfile = (data) => {
  return api.patch(endpoints.updateProfile, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export default api;