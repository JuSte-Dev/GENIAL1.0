import React, { useState, useEffect } from 'react';
import { useOrders } from '../contexts/OrderContext';
import { CheckCircle, X, Clock, MapPin, Navigation } from 'lucide-react';

const NotificationBar = () => {
  const { currentOrder, clearCurrentOrder } = useOrders();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (currentOrder) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentOrder]);

  const handleClose = () => {
    try {
      setIsVisible(false);
      setTimeout(() => {
        clearCurrentOrder();
      }, 300);
    } catch (error) {
      console.error('Error closing notification:', error);
      // Force clear without animation if there's an error
      clearCurrentOrder();
    }
  };

  if (!currentOrder || !isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex flex-col items-center space-y-2 p-4">
        <div 
          className={`pointer-events-auto bg-white shadow-2xl rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 border-l-4 border-green-500 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Commande validée !</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Votre commande {currentOrder.orderNumber} sera prête dans {currentOrder.preparationTime} minutes
                </p>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-gray-900 text-sm">GENIAL Market</span>
                  </div>
                  <p className="text-gray-800 text-xs text-center">140 rue Saint-Dominique, 75007 Paris</p>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Prêt dans <span className="font-bold text-green-600">{currentOrder.preparationTime} min</span>
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    try {
                      window.open('https://maps.google.com/?q=140+rue+Saint-Dominique+75007+Paris', '_blank');
                    } catch (error) {
                      console.error('Error opening maps:', error);
                    }
                  }}
                  className="w-full bg-neon-blue hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Voir l'itinéraire</span>
                </button>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;