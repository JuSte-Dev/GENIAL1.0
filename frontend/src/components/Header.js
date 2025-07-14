import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  LogOut,
  Search,
  Home,
  Store,
  Calendar,
  Users,
  Briefcase,
  Mail,
  BarChart3,
  Clock,
  MapPin,
  Navigation,
  Package
} from 'lucide-react';

// Header qui accepte les props du panier
const Header = ({ cart = {}, getTotalItems = () => 0, setShowCart = () => {} }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { orders, currentOrder, hasActiveOrder } = useOrders();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Store', href: '/store', icon: Store },
    { name: 'Réservations', href: '/reservations', icon: Calendar },
    { name: 'Producteurs', href: '/producers', icon: Users },
    { name: 'Carrière', href: '/careers', icon: Briefcase },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const userNavigation = [
    { name: 'Mon profil', href: '/profile', icon: User },
    { name: 'Mes commandes', href: '#', icon: Package, onClick: () => setShowOrderDetails(!showOrderDetails) },
  ];

  // Add role-specific navigation
  if (user?.role === 'producer') {
    userNavigation.push({ name: 'Dashboard producteur', href: '/producer-dashboard', icon: BarChart3 });
  } else if (user?.role === 'vendor') {
    userNavigation.push({ name: 'Dashboard vendeur', href: '/vendor-dashboard', icon: BarChart3 });
  }

  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center">
                <ShoppingCart className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-primary">GENIAL</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-neon-blue bg-blue-50'
                      : 'text-gray-700 hover:text-neon-blue hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-neon-blue hover:bg-blue-50 rounded-md transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart - Active avec le vrai panier */}
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-600 hover:text-neon-blue hover:bg-blue-50 rounded-md transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu avec notification */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative flex items-center space-x-2 p-2 text-gray-700 hover:text-neon-blue hover:bg-blue-50 rounded-md transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{user?.name}</span>
                  {/* Notification rouge pour commande active */}
                  {hasActiveOrder() && (
                    <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full"></span>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border">
                    {userNavigation.map((item) => {
                      const Icon = item.icon;
                      if (item.onClick) {
                        return (
                          <button
                            key={item.name}
                            onClick={item.onClick}
                            className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                          >
                            <div className="flex items-center space-x-2">
                              <Icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </div>
                            {hasActiveOrder() && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">1</span>
                            )}
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}

                    {/* Mini centre de notifications pour commandes */}
                    {showOrderDetails && currentOrder && (
                      <div className="border-t border-gray-100 p-4 bg-blue-50">
                        <div className="text-sm font-medium text-gray-900 mb-2">Commande en cours</div>
                        <div className="text-xs text-gray-600 mb-2">
                          {currentOrder.orderNumber}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Clock className="w-3 h-3 text-neon-blue" />
                          <span className="text-xs text-gray-600">
                            Prêt dans {currentOrder.preparationTime} min
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mb-3">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">140 rue Saint-Dominique, 75007 Paris</span>
                        </div>
                        <button
                          onClick={() => window.open('https://maps.google.com/?q=140+rue+Saint-Dominique+75007+Paris', '_blank')}
                          className="w-full bg-neon-blue hover:bg-blue-600 text-white py-1 px-2 rounded text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Voir l'itinéraire</span>
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 border-t border-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-neon-blue hover:bg-blue-50 rounded-md transition-colors"
                  title="Connexion"
                >
                  <User className="w-5 h-5" />
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-neon-blue hover:bg-blue-50 rounded-md border border-gray-300 hover:border-neon-blue transition-colors"
                  title="Inscription"
                >
                  <User className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-neon-blue hover:bg-blue-50 rounded-md transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-neon-blue bg-blue-50'
                        : 'text-gray-700 hover:text-neon-blue hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;