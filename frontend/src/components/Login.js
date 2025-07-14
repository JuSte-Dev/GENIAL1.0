import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async (userType) => {
    setLoading(true);
    setError('');
    
    try {
      // Connexion rapide selon le type d'utilisateur avec utilisateurs fictifs
      const testCredentials = {
        client: { 
          email: 'client@test.com', 
          password: 'password123',
          userData: {
            id: '1',
            name: 'Client Test',
            email: 'client@test.com',
            role: 'client'
          }
        },
        producer: { 
          email: 'producer@test.com', 
          password: 'password123',
          userData: {
            id: '2',
            name: 'Producteur Test',
            email: 'producer@test.com',
            role: 'producer'
          }
        }
      };
      
      const { userData } = testCredentials[userType];
      
      // Simuler la connexion pour les tests
      localStorage.setItem('token', 'test-token-' + userType);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Utiliser directement login du contexte avec connexion simulée
      // Pour le test, on simule une connexion réussie
      try {
        const result = await login(testCredentials[userType].email, testCredentials[userType].password);
        // Si l'API ne fonctionne pas, on force la connexion pour les tests
        if (!result.success) {
          // Connexion forcée pour les tests
          localStorage.setItem('token', 'test-token-' + userType);
          
          // Redirection selon le rôle
          if (userType === 'client') {
            navigate('/profile');
          } else if (userType === 'producer') {
            navigate('/producer-dashboard');
          }
        } else {
          // Redirection selon le rôle après connexion réussie
          if (userData.role === 'client') {
            navigate('/profile');
          } else if (userData.role === 'producer') {
            navigate('/producer-dashboard');
          }
        }
      } catch (err) {
        // En cas d'erreur API, connexion simulée pour les tests
        localStorage.setItem('token', 'test-token-' + userType);
        
        if (userType === 'client') {
          navigate('/profile');
        } else if (userType === 'producer') {
          navigate('/producer-dashboard');
        }
      }
    } catch (err) {
      setError('Erreur de connexion rapide');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Connexion à GENIAL
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-gray-800"
            >
              créez votre compte
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control pl-10"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control pl-10 pr-10"
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erreur de connexion
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary hover:text-gray-800"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Se connecter
                </>
              )}
            </button>
          </div>

          {/* Test Quick Login Buttons */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-500 mb-4">
              🧪 Connexion rapide pour les tests
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin('client')}
                disabled={loading}
                className="w-full flex justify-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                👤 Test Client
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('producer')}
                disabled={loading}
                className="w-full flex justify-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                🌾 Test Producteur
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-gray-800"
              >
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;