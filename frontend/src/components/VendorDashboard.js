import React, { useState, useEffect } from 'react';
import { QrCodeIcon, User, Star, ShoppingBag, CreditCard, Search, Clock, Phone, Mail } from 'lucide-react';
import { apiService } from '../utils/api';

const VendorDashboard = () => {
  const [qrScanResult, setQrScanResult] = useState(null);
  const [manualUserId, setManualUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQRScan = async (userId) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await apiService.scanUserQR(userId);
      setQrScanResult(response.data);
    } catch (err) {
      setError('Utilisateur non trouvé ou erreur de scan');
      console.error('Error scanning QR:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (manualUserId.trim()) {
      handleQRScan(manualUserId.trim());
    }
  };

  const addLoyaltyPoints = async (points) => {
    if (!qrScanResult) return;
    
    try {
      // Here you would implement the logic to add loyalty points
      // This would typically involve creating a loyalty transaction
      alert(`${points} points ajoutés avec succès !`);
      
      // Refresh user data
      handleQRScan(qrScanResult.user.id);
    } catch (error) {
      console.error('Error adding loyalty points:', error);
      alert('Erreur lors de l\'ajout des points');
    }
  };

  const getLoyaltyLevel = (points) => {
    if (points >= 1000) return { level: 'Diamant', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (points >= 500) return { level: 'Or', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (points >= 250) return { level: 'Argent', color: 'text-gray-600', bg: 'bg-gray-100' };
    return { level: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-100' };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Vendeur</h1>
          <p className="text-gray-600">Scannez le QR code des clients pour gérer leur programme de fidélité</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Scanner */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Scanner QR Code</h2>
              
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <QrCodeIcon className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">
                  Demandez au client de présenter son QR code
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="form-label">Ou saisissez l'ID client manuellement</label>
                  <form onSubmit={handleManualSearch} className="flex space-x-2">
                    <input
                      type="text"
                      value={manualUserId}
                      onChange={(e) => setManualUserId(e.target.value)}
                      placeholder="ID client ou email"
                      className="form-control flex-1"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Recherche en cours...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Actions rapides</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => addLoyaltyPoints(50)}
                  disabled={!qrScanResult}
                  className="w-full btn btn-primary text-left"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Ajouter 50 points (anniversaire)
                </button>
                
                <button
                  onClick={() => addLoyaltyPoints(100)}
                  disabled={!qrScanResult}
                  className="w-full btn btn-secondary text-left"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Ajouter 100 points (parrainage)
                </button>
                
                <button
                  onClick={() => addLoyaltyPoints(25)}
                  disabled={!qrScanResult}
                  className="w-full btn btn-ghost text-left"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Ajouter 25 points (satisfaction)
                </button>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="lg:col-span-2">
            {qrScanResult ? (
              <div className="space-y-6">
                {/* Customer Profile */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Profil Client</h2>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {qrScanResult.user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{qrScanResult.user.name}</h3>
                      <p className="text-gray-600">{qrScanResult.user.email}</p>
                      {qrScanResult.user.phone && (
                        <p className="text-gray-600 flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{qrScanResult.user.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Loyalty Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Star className="w-6 h-6" />
                        <span className="text-2xl font-bold">{qrScanResult.user.loyalty_points}</span>
                      </div>
                      <p className="text-sm">Points fidélité</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="text-2xl font-bold">{qrScanResult.recent_orders?.length || 0}</span>
                      </div>
                      <p className="text-sm">Commandes récentes</p>
                    </div>
                    
                    <div className={`text-center p-4 rounded-lg ${getLoyaltyLevel(qrScanResult.user.loyalty_points).bg}`}>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Star className={`w-6 h-6 ${getLoyaltyLevel(qrScanResult.user.loyalty_points).color}`} />
                        <span className={`text-2xl font-bold ${getLoyaltyLevel(qrScanResult.user.loyalty_points).color}`}>
                          {getLoyaltyLevel(qrScanResult.user.loyalty_points).level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Niveau fidélité</p>
                    </div>
                  </div>

                  {/* Customer Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total dépensé</p>
                      <p className="text-lg font-bold text-gray-900">
                        {qrScanResult.recent_orders?.reduce((total, order) => total + order.total_amount, 0).toFixed(2) || '0.00'}€
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Panier moyen</p>
                      <p className="text-lg font-bold text-gray-900">
                        {qrScanResult.recent_orders?.length > 0 
                          ? (qrScanResult.recent_orders.reduce((total, order) => total + order.total_amount, 0) / qrScanResult.recent_orders.length).toFixed(2)
                          : '0.00'
                        }€
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Fréquence</p>
                      <p className="text-lg font-bold text-gray-900">
                        {qrScanResult.recent_orders?.length > 0 ? 'Régulier' : 'Nouveau'}
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Membre depuis</p>
                      <p className="text-lg font-bold text-gray-900">
                        {new Date(qrScanResult.user.created_at).toLocaleDateString('fr-FR', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Commandes récentes</h2>
                  
                  {qrScanResult.recent_orders && qrScanResult.recent_orders.length > 0 ? (
                    <div className="space-y-4">
                      {qrScanResult.recent_orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                              <ShoppingBag className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Commande {order.order_number}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.created_at).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{order.total_amount.toFixed(2)}€</p>
                            <p className="text-sm text-gray-600">{order.items?.length || 0} articles</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Aucune commande récente</p>
                    </div>
                  )}
                </div>

                {/* Loyalty Transactions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Historique des points</h2>
                  
                  {qrScanResult.loyalty_transactions && qrScanResult.loyalty_transactions.length > 0 ? (
                    <div className="space-y-3">
                      {qrScanResult.loyalty_transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.transaction_type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <Star className={`w-4 h-4 ${
                                transaction.transaction_type === 'earned' ? 'text-green-600' : 'text-red-600'
                              }`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-xs text-gray-600">
                                {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          <div className={`font-bold ${
                            transaction.transaction_type === 'earned' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.transaction_type === 'earned' ? '+' : '-'}{Math.abs(transaction.points)} pts
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Aucune transaction de points</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <QrCodeIcon className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun client sélectionné</h2>
                <p className="text-gray-600 mb-8">
                  Scannez le QR code d'un client ou saisissez son ID pour accéder à ses informations
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">📱 Scanner QR Code</h3>
                    <p className="text-sm text-gray-600">
                      Demandez au client de présenter son QR code personnel depuis son profil
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🔍 Recherche manuelle</h3>
                    <p className="text-sm text-gray-600">
                      Saisissez l'ID client ou son adresse email dans le champ de recherche
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;