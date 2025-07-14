import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Charger les notifications depuis le localStorage au démarrage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('genial_notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
      } catch (error) {
        console.error('Error parsing saved notifications:', error);
      }
    }
  }, []);

  // Sauvegarder les notifications dans le localStorage
  useEffect(() => {
    localStorage.setItem('genial_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      ...notification,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification.id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const addOrderNotification = (orderData) => {
    return addNotification({
      type: 'order_success',
      title: 'Commande validée !',
      message: `Votre commande ${orderData.orderNumber} sera prête dans ${orderData.preparationTime} minutes`,
      orderNumber: orderData.orderNumber,
      preparationTime: orderData.preparationTime,
      persistent: true // Cette notification reste jusqu'à ce qu'elle soit explicitement supprimée
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('genial_notifications');
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    addOrderNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};