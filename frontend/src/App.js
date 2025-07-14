import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import components
import Header from './components/Header';
import Home from './components/Home';
import Store from './components/Store';
import Reservations from './components/Reservations';
import Producers from './components/Producers';
import Careers from './components/Careers';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import ProducerDashboard from './components/ProducerDashboard';
import VendorDashboard from './components/VendorDashboard';

// Auth context
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';

// API setup
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

axios.defaults.baseURL = API;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  
  // État global du panier
  const [globalCart, setGlobalCart] = React.useState({});
  const [showCart, setShowCart] = React.useState(false);
  
  const getTotalItems = () => {
    return Object.values(globalCart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="App">
      <Header 
        cart={globalCart} 
        getTotalItems={getTotalItems} 
        setShowCart={setShowCart} 
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/store" 
            element={
              <Store 
                globalCart={globalCart} 
                setGlobalCart={setGlobalCart}
                showCart={showCart}
                setShowCart={setShowCart}
              />
            } 
          />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/producers" element={<Producers />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/producer-dashboard" 
            element={
              <ProtectedRoute requiredRole="producer">
                <ProducerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vendor-dashboard" 
            element={
              <ProtectedRoute requiredRole="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <AppContent />
        </Router>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;