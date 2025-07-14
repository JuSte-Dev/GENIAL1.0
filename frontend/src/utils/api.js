import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),

  // Products
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),

  // Orders
  createOrder: (data) => api.post('/orders', data),
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),

  // Reservations
  createReservation: (data) => api.post('/reservations', data),
  getReservations: () => api.get('/reservations'),

  // Producers
  getProducers: () => api.get('/producers'),
  getProducer: (id) => api.get(`/producers/${id}`),
  getProducerProducts: (id) => api.get(`/producers/${id}/products`),
  createProducerProfile: (data) => api.post('/producers', data),

  // Jobs
  getJobs: () => api.get('/jobs'),
  applyForJob: (jobId, data) => api.post(`/jobs/${jobId}/apply`, data),
  createJob: (data) => api.post('/jobs', data),

  // Contact
  sendContactMessage: (data) => api.post('/contact', data),
  getContactMessages: () => api.get('/contact'),

  // Loyalty
  getLoyaltyTransactions: () => api.get('/loyalty/transactions'),
  redeemPoints: (points) => api.post('/loyalty/redeem', { points }),

  // Vendor
  scanUserQR: (userId) => api.get(`/vendor/scan/${userId}`),

  // Dashboard
  getProducerDashboard: () => api.get('/dashboard/producer'),

  // Health check
  healthCheck: () => api.get('/health'),
};

export default api;