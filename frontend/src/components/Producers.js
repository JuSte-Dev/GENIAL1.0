import React, { useState, useEffect } from 'react';
import { MapPin, Star, Phone, Mail, ExternalLink, Award, Calendar, Truck } from 'lucide-react';
import { apiService } from '../utils/api';

const Producers = () => {
  const [producers, setProducers] = useState([]);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const [producerProducts, setProducerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = async () => {
    try {
      const response = await apiService.getProducers();
      setProducers(response.data);
    } catch (error) {
      console.error('Error fetching producers:', error);
      // Fallback with mock data
      setProducers([
        {
          id: 1,
          company_name: 'Ferme Bio des Alpilles',
          description: 'Producteur de fruits et légumes biologiques depuis 3 générations dans les Alpilles. Nos produits sont cultivés dans le respect de la nature et des saisons.',
          location: 'Provence-Alpes-Côte d\'Azur',
          specialties: ['Fruits bio', 'Légumes bio', 'Herbes aromatiques'],
          certification: 'Agriculture Biologique',
          image_url: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          contact_email: 'contact@ferme-alpilles.fr',
          contact_phone: '04 90 54 32 10',
          is_verified: true
        },
        {
          id: 2,
          company_name: 'Fromagerie du Jura',
          description: 'Maître fromager artisan spécialisé dans les fromages du Jura. Nos comtés sont affinés dans nos caves traditionnelles pour développer des saveurs uniques.',
          location: 'Franche-Comté',
          specialties: ['Comté AOP', 'Morbier', 'Bleu du Jura'],
          certification: 'AOP Comté',
          image_url: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          contact_email: 'fromager@jura-tradition.fr',
          contact_phone: '03 84 51 23 45',
          is_verified: true
        },
        {
          id: 3,
          company_name: 'Charcuterie Montagne',
          description: 'Charcutier artisan en Auvergne, nous perpétuons les traditions de la charcuterie française avec des méthodes ancestrales et des produits de qualité.',
          location: 'Auvergne-Rhône-Alpes',
          specialties: ['Saucissons secs', 'Jambon de pays', 'Pâtés artisanaux'],
          certification: 'Maître Artisan',
          image_url: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxoYW18ZW58MHx8fHdoaXRlfDE3NTI0MTYzNDR8MA&ixlib=rb-4.1.0&q=85',
          contact_email: 'artisan@charcuterie-montagne.fr',
          contact_phone: '04 71 45 67 89',
          is_verified: true
        },
        {
          id: 4,
          company_name: 'Domaine des Papes',
          description: 'Viticulteur familial à Châteauneuf-du-Pape depuis 1892. Nos vins expriment la typicité de notre terroir d\'exception avec passion et savoir-faire.',
          location: 'Vallée du Rhône',
          specialties: ['Châteauneuf-du-Pape', 'Côtes du Rhône', 'Vins naturels'],
          certification: 'AOC Châteauneuf-du-Pape',
          image_url: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
          contact_email: 'vigneron@domaine-papes.fr',
          contact_phone: '04 90 83 45 67',
          is_verified: true
        },
        {
          id: 5,
          company_name: 'Café Partisan',
          description: 'Torréfacteur artisanal parisien passionné par les cafés de spécialité. Nous sélectionnons nos grains directement chez les producteurs pour vous offrir des cafés d\'exception.',
          location: 'Paris',
          specialties: ['Café de spécialité', 'Torréfaction artisanale', 'Commerce équitable'],
          certification: 'Commerce Équitable',
          image_url: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          contact_email: 'hello@cafepartisan.com',
          contact_phone: '01 42 85 67 89',
          is_verified: true
        },
        {
          id: 6,
          company_name: 'Ruchers de Provence',
          description: 'Apiculteur en Provence, nous produisons des miels artisanaux de qualité exceptionnelle. Nos ruches sont installées dans des zones préservées pour des miels purs.',
          location: 'Provence-Alpes-Côte d\'Azur',
          specialties: ['Miel de lavande', 'Miel de thym', 'Miel de romarin'],
          certification: 'Agriculture Biologique',
          image_url: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
          contact_email: 'apiculteur@ruchers-provence.fr',
          contact_phone: '04 90 76 54 32',
          is_verified: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducerProducts = async (producerId) => {
    try {
      const response = await apiService.getProducerProducts(producerId);
      setProducerProducts(response.data);
    } catch (error) {
      console.error('Error fetching producer products:', error);
      setProducerProducts([]);
    }
  };

  const handleProducerClick = (producer) => {
    setSelectedProducer(producer);
    fetchProducerProducts(producer.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des producteurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos producteurs partenaires
            </h1>
            <p className="text-xl mb-8">
              Découvrez les artisans passionnés qui font la richesse de GENIAL
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Qualité certifiée</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>Livraison quotidienne</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Sélection rigoureuse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Selection Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Notre processus de sélection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Sourcing rigoureux</h3>
                <p className="text-gray-600">
                  Nous parcourons la France pour dénicher les meilleurs artisans et producteurs locaux
                </p>
              </div>
            </div>

            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Contrôle qualité</h3>
                <p className="text-gray-600">
                  Chaque produit est testé et approuvé par notre équipe d'experts culinaires
                </p>
              </div>
            </div>

            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Partenariat durable</h3>
                <p className="text-gray-600">
                  Nous construisons des relations à long terme basées sur la confiance et la qualité
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Producers Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Rencontrez nos producteurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {producers.map((producer) => (
              <div 
                key={producer.id} 
                className="card hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleProducerClick(producer)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={producer.image_url}
                    alt={producer.company_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="card-body">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{producer.company_name}</h3>
                    {producer.is_verified && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Award className="w-4 h-4" />
                        <span className="text-xs">Vérifié</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{producer.location}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                    {producer.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {producer.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {producer.certification && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Award className="w-4 h-4 text-gold" />
                      <span className="text-gold font-medium">{producer.certification}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vous êtes producteur ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez notre réseau de producteurs partenaires et faites découvrir vos produits d'exception à notre clientèle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn btn-primary text-lg px-8 py-3"
            >
              <Mail className="w-5 h-5 mr-2" />
              Devenir partenaire
            </a>
            <a
              href="tel:+33142334455"
              className="btn btn-secondary text-lg px-8 py-3"
            >
              <Phone className="w-5 h-5 mr-2" />
              Nous appeler
            </a>
          </div>
        </section>
      </div>

      {/* Producer Details Modal */}
      {selectedProducer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedProducer.image_url}
                alt={selectedProducer.company_name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProducer(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedProducer.company_name}</h2>
                {selectedProducer.is_verified && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Award className="w-5 h-5" />
                    <span className="font-medium">Producteur vérifié</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">À propos</h3>
                  <p className="text-gray-700 mb-6">{selectedProducer.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{selectedProducer.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a 
                        href={`tel:${selectedProducer.contact_phone}`}
                        className="text-gray-700 hover:text-primary"
                      >
                        {selectedProducer.contact_phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a 
                        href={`mailto:${selectedProducer.contact_email}`}
                        className="text-gray-700 hover:text-primary"
                      >
                        {selectedProducer.contact_email}
                      </a>
                    </div>
                    
                    {selectedProducer.certification && (
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-gold" />
                        <span className="text-gold font-medium">{selectedProducer.certification}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Spécialités</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProducer.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Nos produits chez GENIAL</h3>
                  {producerProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {producerProducts.map((product) => (
                        <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-medium text-primary">
                                {product.price}€/{product.unit}
                              </span>
                              <span className="text-xs text-gray-500">
                                Stock: {product.stock}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Aucun produit disponible actuellement
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Producers;