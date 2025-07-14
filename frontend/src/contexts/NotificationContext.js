import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Charger les commandes depuis le localStorage au démarrage
  useEffect(() => {
    const savedOrders = localStorage.getItem('genial_orders');
    const savedCurrentOrder = localStorage.getItem('genial_current_order');
    
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error parsing saved orders:', error);
      }
    }
    
    if (savedCurrentOrder) {
      try {
        setCurrentOrder(JSON.parse(savedCurrentOrder));
      } catch (error) {
        console.error('Error parsing saved current order:', error);
      }
    }
  }, []);

  // Sauvegarder les commandes dans le localStorage
  useEffect(() => {
    localStorage.setItem('genial_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentOrder) {
      localStorage.setItem('genial_current_order', JSON.stringify(currentOrder));
    } else {
      localStorage.removeItem('genial_current_order');
    }
  }, [currentOrder]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now() + Math.random(),
      ...orderData,
      timestamp: new Date().toISOString(),
      status: 'en_preparation'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    
    return newOrder.id;
  };

  const markOrderAsReady = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'ready' } : order
    ));
    
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder(prev => ({ ...prev, status: 'ready' }));
    }
  };

  const markOrderAsCompleted = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'completed' } : order
    ));
    
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder(null);
    }
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  const hasActiveOrder = () => {
    return currentOrder && currentOrder.status !== 'completed';
  };

  const value = {
    orders,
    currentOrder,
    addOrder,
    markOrderAsReady,
    markOrderAsCompleted,
    clearCurrentOrder,
    hasActiveOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};