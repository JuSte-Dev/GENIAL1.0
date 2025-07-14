import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../utils/api';
import QRCode from 'react-qr-code';
import { 
  User, 
  Mail, 
  Phone, 
  Star, 
  Gift,
  History,
  QrCode,
  CreditCard,
  ShoppingBag,
  Award,
  Calendar,
  TrendingUp
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loyaltyTransactions, setLoyaltyTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Si c'est un token de test, utiliser des données fictives
        if (token && token.startsWith('test-token-')) {
          // Données de test pour le profil client
          setLoyaltyTransactions([
            {
              id: 1,
              type: 'earned',
              points: 50,
              description: 'Achat en magasin',
              date: new Date().toISOString(),
              amount: 125.50
            },
            {
              id: 2,
              type: 'earned',
              points: 25,
              description: 'Commande en ligne',
              date: new Date(Date.now() - 86400000).toISOString(),
              amount: 67.80
            }
          ]);
          
          setOrders([
            {
              id: 1,
              order_number: 'CMD123456',
              status: 'completed',
              total_amount: 125.50,
              created_at: new Date().toISOString(),
              items: [
                { name: 'Saumon fumé', quantity: 1, price: 85.00 },
                { name: 'Fromage Comté', quantity: 1, price: 40.50 }
              ]
            },
            {
              id: 2,
              order_number: 'CMD123455',
              status: 'en_preparation',
              total_amount: 67.80,
              created_at: new Date(Date.now() - 86400000).toISOString(),
              items: [
                { name: 'Tomates cerises bio', quantity: 2, price: 17.00 },
                { name: 'Jambon de Bayonne', quantity: 1, price: 50.80 }
              ]
            }
          ]);
        } else {
          // Appels API normaux pour les vrais utilisateurs
          const [loyaltyResponse, ordersResponse] = await Promise.all([
            apiService.getLoyaltyTransactions(),
            apiService.getOrders()
          ]);
          
          setLoyaltyTransactions(loyaltyResponse.data);
          setOrders(ordersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // En cas d'erreur, afficher des données vides
        setLoyaltyTransactions([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRedeemPoints = async (points) => {
    try {
      await apiService.redeemPoints(points);
      // Refresh loyalty transactions
      const response = await apiService.getLoyaltyTransactions();
      setLoyaltyTransactions(response.data);
    } catch (error) {
      console.error('Error redeeming points:', error);
    }
  };

  const getLoyaltyLevel = (points) => {
    if (points >= 1000) return { level: 'Diamant', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (points >= 500) return { level: 'Or', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (points >= 250) return { level: 'Argent', color: 'text-gray-600', bg: 'bg-gray-100' };
    return { level: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-100' };
  };

  const loyaltyLevel = getLoyaltyLevel(user?.loyalty_points || 0);

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'loyalty', name: 'Fidélité', icon: Star },
    { id: 'orders', name: 'Commandes', icon: ShoppingBag },
    { id: 'qr', name: 'QR Code', icon: QrCode },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${loyaltyLevel.bg} ${loyaltyLevel.color} mt-2`}>
                <Award className="w-4 h-4 mr-1" />
                Niveau {loyaltyLevel.level}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Nom complet</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user?.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="form-label">Email</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user?.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="form-label">Téléphone</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user?.phone || 'Non renseigné'}</span>
                  </div>
                </div>
                
                <div>
                  <label className="form-label">Statut</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 capitalize">{user?.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">
                  Modifier mes informations
                </button>
              </div>
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Programme de fidélité</h2>
                <p className="text-gray-600">Gagnez des points à chaque achat et échangez-les contre des récompenses</p>
              </div>

              {/* Points Balance */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-8 h-8" />
                  <span className="text-3xl font-bold">{user?.loyalty_points || 0}</span>
                </div>
                <p className="text-lg">Points fidélité</p>
                <p className="text-sm opacity-80">Niveau {loyaltyLevel.level}</p>
              </div>

              {/* Rewards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Récompenses disponibles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">5€ de réduction</p>
                        <p className="text-sm text-gray-600">100 points</p>
                      </div>
                      <button
                        onClick={() => handleRedeemPoints(100)}
                        disabled={(user?.loyalty_points || 0) < 100}
                        className="btn btn-primary btn-sm"
                      >
                        Échanger
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">10€ de réduction</p>
                        <p className="text-sm text-gray-600">200 points</p>
                      </div>
                      <button
                        onClick={() => handleRedeemPoints(200)}
                        disabled={(user?.loyalty_points || 0) < 200}
                        className="btn btn-primary btn-sm"
                      >
                        Échanger
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Produit gratuit</p>
                        <p className="text-sm text-gray-600">500 points</p>
                      </div>
                      <button
                        onClick={() => handleRedeemPoints(500)}
                        disabled={(user?.loyalty_points || 0) < 500}
                        className="btn btn-primary btn-sm"
                      >
                        Échanger
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Comment gagner des points</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">1 point par euro dépensé</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">50 points bonus à l'inscription</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Points double les weekends</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Parrainage: 100 points</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loyalty History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des points</h3>
                <div className="space-y-3">
                  {loyaltyTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {transaction.transaction_type === 'earned' ? (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <Gift className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold ${transaction.transaction_type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.transaction_type === 'earned' ? '+' : '-'}{Math.abs(transaction.points)} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Mes commandes</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Aucune commande pour le moment</p>
                  <p className="text-gray-400">Découvrez notre store pour passer votre première commande</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">Commande {order.order_number}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">{order.total_amount.toFixed(2)}€</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status === 'completed' ? 'Terminée' :
                             order.status === 'pending' ? 'En préparation' :
                             order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p>{order.items?.length || 0} article{(order.items?.length || 0) > 1 ? 's' : ''}</p>
                        <p>Temps de préparation: {order.preparation_time} minutes</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre QR Code fidélité</h2>
                <p className="text-gray-600">Présentez ce code en magasin pour gagner des points</p>
              </div>

              <div className="flex justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
                  <div className="text-center mb-6">
                    <QRCode
                      size={200}
                      value={`genial://user/${user?.id}`}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${loyaltyLevel.bg} ${loyaltyLevel.color} mt-2`}>
                      <Star className="w-4 h-4 mr-1" />
                      {user?.loyalty_points || 0} points
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Comment utiliser votre QR Code</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>1. Montrez ce code au vendeur lors de votre passage en caisse</p>
                  <p>2. Le vendeur scanne votre code pour ajouter les points</p>
                  <p>3. Vos points sont automatiquement crédités sur votre compte</p>
                  <p>4. Utilisez vos points pour obtenir des réductions</p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="btn btn-primary"
                >
                  {showQRCode ? 'Masquer' : 'Afficher'} en plein écran
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">QR Code Fidélité</h3>
            
            <div className="mb-6">
              <QRCode
                size={300}
                value={`genial://user/${user?.id}`}
                viewBox={`0 0 256 256`}
              />
            </div>
            
            <div className="mb-6">
              <p className="font-semibold text-gray-900">{user?.name}</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${loyaltyLevel.bg} ${loyaltyLevel.color} mt-2`}>
                <Star className="w-4 h-4 mr-1" />
                {user?.loyalty_points || 0} points • Niveau {loyaltyLevel.level}
              </div>
            </div>
            
            <button
              onClick={() => setShowQRCode(false)}
              className="btn btn-secondary"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;