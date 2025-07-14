import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, TrendingUp, DollarSign, ShoppingCart, Eye, BarChart3 } from 'lucide-react';
import { apiService } from '../utils/api';

const ProducerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    unit: '',
    stock: '',
    image_url: '',
    origin: '',
    producer_name: ''
  });

  const categories = [
    'fruits-legumes',
    'charcuterie',
    'viandes',
    'poissons',
    'fromages',
    'vins-rouges',
    'vins-blancs',
    'champagnes',
    'cafe',
    'cocktails',
    'epicerie'
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Si c'est un token de test, utiliser des données fictives
      if (token && token.startsWith('test-token-')) {
        // Données de test pour le dashboard producteur
        const testDashboardData = {
          total_products: 12,
          total_sales: 1520.75,
          pending_orders: 8,
          monthly_revenue: 4862.30,
          products: [
            {
              id: 1,
              name: 'Tomates cerises bio',
              category: 'fruits-legumes',
              price: 8.50,
              unit: 'kg',
              stock: 50,
              image_url: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818',
              origin: 'France - Provence',
              producer_name: 'Producteur Test',
              description: 'Tomates cerises biologiques de Provence',
              sales_count: 25
            },
            {
              id: 2,
              name: 'Fromage de chèvre',
              category: 'fromages',
              price: 28.00,
              unit: 'kg',
              stock: 12,
              image_url: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d',
              origin: 'France - Loire',
              producer_name: 'Producteur Test',
              description: 'Fromage de chèvre cendré artisanal',
              sales_count: 18
            },
            {
              id: 3,
              name: 'Miel de lavande',
              category: 'epicerie',
              price: 15.50,
              unit: 'pot 250g',
              stock: 24,
              image_url: 'https://images.pexels.com/photos/302480/pexels-photo-302480.jpeg',
              origin: 'France - Provence',
              producer_name: 'Producteur Test',
              description: 'Miel de lavande pur, récolte locale',
              sales_count: 32
            }
          ]
        };
        
        setDashboardData(testDashboardData);
        setProducts(testDashboardData.products);
      } else {
        // Appel API normal pour les vrais utilisateurs
        const response = await apiService.getProducerDashboard();
        setDashboardData(response.data);
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback data en cas d'erreur
      setDashboardData({
        total_products: 0,
        total_sales: 0,
        pending_orders: 0,
        monthly_revenue: 0,
        products: []
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock)
      };

      if (editingProduct) {
        await apiService.updateProduct(editingProduct.id, productData);
      } else {
        await apiService.createProduct(productData);
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        category: '',
        price: '',
        unit: '',
        stock: '',
        image_url: '',
        origin: '',
        producer_name: ''
      });
      
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erreur lors de la sauvegarde du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      unit: product.unit,
      stock: product.stock.toString(),
      image_url: product.image_url || '',
      origin: product.origin,
      producer_name: product.producer_name || ''
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await apiService.deleteProduct(productId);
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Erreur lors de la suppression du produit');
      }
    }
  };

  const handleInputChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Producteur</h1>
              <p className="text-gray-600">Gérez vos produits et suivez vos ventes</p>
            </div>
            <button
              onClick={() => setShowProductForm(true)}
              className="btn btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un produit
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produits</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.total_products || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ventes totales</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.total_sales?.toFixed(2) || '0.00'}€</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commandes</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.total_orders || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Panier moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.total_orders > 0 
                    ? (dashboardData.total_sales / dashboardData.total_orders).toFixed(2)
                    : '0.00'
                  }€
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mes produits</h2>
            <div className="flex items-center space-x-2">
              <button className="btn btn-secondary">
                <BarChart3 className="w-4 h-4 mr-2" />
                Statistiques
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Aucun produit</p>
              <p className="text-gray-400 mb-6">Commencez par ajouter votre premier produit</p>
              <button
                onClick={() => setShowProductForm(true)}
                className="btn btn-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter un produit
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Produit</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Catégorie</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image_url || '/placeholder.jpg'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.origin}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">{product.price}€</p>
                        <p className="text-sm text-gray-500">par {product.unit}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} en stock
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.is_active ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Commandes récentes</h2>
          
          {dashboardData?.recent_orders?.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recent_orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
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
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucune commande récente</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
            </h3>
            
            <form onSubmit={handleProductSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nom du produit *</label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Catégorie *</label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.replace('-', ' & ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Prix *</label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleInputChange}
                    className="form-control"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Unité *</label>
                  <select
                    name="unit"
                    value={productForm.unit}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Sélectionnez une unité</option>
                    <option value="kg">kg</option>
                    <option value="pièce">pièce</option>
                    <option value="bouteille">bouteille</option>
                    <option value="pot">pot</option>
                    <option value="botte">botte</option>
                    <option value="barquette">barquette</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleInputChange}
                    className="form-control"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Origine *</label>
                  <input
                    type="text"
                    name="origin"
                    value={productForm.origin}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Ex: France - Provence"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Producteur</label>
                  <input
                    type="text"
                    name="producer_name"
                    value={productForm.producer_name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Ex: Ferme du Soleil"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">URL de l'image</label>
                <input
                  type="url"
                  name="image_url"
                  value={productForm.image_url}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="https://..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowProductForm(false);
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      description: '',
                      category: '',
                      price: '',
                      unit: '',
                      stock: '',
                      image_url: '',
                      origin: '',
                      producer_name: ''
                    });
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1"
                >
                  {loading ? 'Enregistrement...' : (editingProduct ? 'Modifier' : 'Ajouter')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProducerDashboard;