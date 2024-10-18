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
  restaurantLogin: '/restaurants/login/',
  customerSignup: '/customers/signup/',
  //customerProfile: '/customers/me/',
  customerProfile: '/customers/profile/',
  updateProfile: '/customers/update_profile/',
  restaurants: '/restaurants/',
  addDish: '/dishes/createDish',
  editDish: '/dishes/editDish',
  getDish: '/dishes/getDish',
  orders: '/orders/',
  orderDetail: '/orders/getOrderDetail',
  customerDetail: '/customers/details',
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
