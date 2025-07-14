import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          // Vérifier si c'est un token de test
          if (token.startsWith('test-token-')) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            // Token normal, vérifier avec l'API
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            try {
              const response = await axios.get('/auth/me');
              setUser(response.data);
              setIsAuthenticated(true);
            } catch (error) {
              console.error('Token validation failed:', error);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              delete axios.defaults.headers.common['Authorization'];
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Vérifier si c'est une connexion de test
      if (email === 'client@test.com' && password === 'password123') {
        const testUser = {
          id: '1',
          name: 'Client Test',
          email: 'client@test.com',
          role: 'client'
        };
        
        localStorage.setItem('token', 'test-token-client');
        localStorage.setItem('user', JSON.stringify(testUser));
        axios.defaults.headers.common['Authorization'] = `Bearer test-token-client`;
        
        setUser(testUser);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      if (email === 'producer@test.com' && password === 'password123') {
        const testUser = {
          id: '2',
          name: 'Producteur Test',
          email: 'producer@test.com',
          role: 'producer'
        };
        
        localStorage.setItem('token', 'test-token-producer');
        localStorage.setItem('user', JSON.stringify(testUser));
        axios.defaults.headers.common['Authorization'] = `Bearer test-token-producer`;
        
        setUser(testUser);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      // Connexion normale avec API
      const response = await axios.post('/auth/login', { email, password });
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      const { access_token, user: newUser } = response.data;
      
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};