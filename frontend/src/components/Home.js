import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Calendar, 
  Coffee, 
  Wine, 
  Utensils, 
  Star, 
  ShoppingBasket,
  Sandwich,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

const Home = () => {
  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Cliente régulière',
      content: 'GENIAL a révolutionné ma façon de faire les courses. La qualité des produits est exceptionnelle et l\'ambiance est unique.',
      rating: 5
    },
    {
      name: 'Jean-Pierre Martin',
      role: 'Chef de restaurant',
      content: 'Je viens ici pour mes approvisionnements. La fraîcheur et la qualité des produits sont incomparables.',
      rating: 5
    },
    {
      name: 'Sophie Leroy',
      role: 'Passionnée de cuisine',
      content: 'L\'expérience shopping chez GENIAL est un vrai plaisir. Les producteurs sont passionnés et les conseils précieux.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1631021967261-c57ee4dfa9bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiYXNrZXR8ZW58MHx8fHwxNzUyNDIxNTY2fDA&ixlib=rb-4.1.0&q=85"
            alt="Panier de légumes frais"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="relative w-full max-w-none px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Caddie */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-neon-blue rounded-full flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">GENIAL</span>
              <span className="block text-lg md:text-xl font-normal mt-2 text-gray-300">
                Un nouveau lieu de vie
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200">
              Marché frais • Épicerie fine • Restauration
            </p>
            <p className="text-base sm:text-lg mb-10 text-gray-300 max-w-2xl mx-auto">
              Du café matinal à l'apéro dînatoire, vivez une expérience unique entouré de produits d'exception
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/store" className="btn btn-neon text-lg px-8 py-3">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Commander en ligne
              </Link>
              <Link to="/reservations" className="btn btn-secondary text-lg px-8 py-3">
                <Calendar className="w-5 h-5 mr-2" />
                Réserver une table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Une journée GENIAL - REDESIGNED WITH IMMERSIVE IMAGES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Une journée GENIAL</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De l'aube à la nuit, vivez chaque moment avec des produits d'exception
            </p>
          </div>
          
          {/* Grid of moments with immersive images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Morning Coffee */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwwfHx8fDE3NTI1MTExMjF8MA&ixlib=rb-4.1.0&q=85"
                alt="Café du matin"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-3">
                  <Coffee className="w-8 h-8 text-neon-blue mr-3" />
                  <span className="text-lg font-semibold">7h00 - 10h30</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Café matinal</h3>
                <p className="text-lg text-gray-200 mb-4">
                  Commencez votre journée avec nos cafés d'exception et viennoiseries artisanales
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Café de spécialité</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Viennoiseries</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Pâtisseries</span>
                </div>
              </div>
            </div>

            {/* Lunch/Deli */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1735353783469-52314e87dd3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxkdWNrJTIwc2FsYWR8ZW58MHx8fHwxNzUyNTE3MDU1fDA&ixlib=rb-4.1.0&q=85"
                alt="Salade du Gers gourmande"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-3">
                  <Sandwich className="w-8 h-8 text-neon-blue mr-3" />
                  <span className="text-lg font-semibold">11h30 - 15h00</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Lunch gourmand</h3>
                <p className="text-lg text-gray-200 mb-4">
                  Savourez nos salades du Gers, sandwichs artisanaux et plats du jour préparés avec amour
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Salades du Gers</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Sandwichs artisanaux</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Plats du jour</span>
                </div>
              </div>
            </div>

            {/* Market/Shopping */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85"
                alt="Marché frais"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-3">
                  <ShoppingBasket className="w-8 h-8 text-neon-blue mr-3" />
                  <span className="text-lg font-semibold">7h00 - 22h30</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Marché d'exception</h3>
                <p className="text-lg text-gray-200 mb-4">
                  Découvrez nos produits frais sélectionnés chez les meilleurs producteurs
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Fruits & légumes bio</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Charcuterie</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Fromages</span>
                </div>
              </div>
            </div>

            {/* Aperitif/Wine */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1516154767575-2146adebdf32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85"
                alt="Cave à vins"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-3">
                  <Wine className="w-8 h-8 text-neon-blue mr-3" />
                  <span className="text-lg font-semibold">17h00 - 20h00</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Apéro dînatoire</h3>
                <p className="text-lg text-gray-200 mb-4">
                  Partagez un moment convivial avec notre sélection de vins et mets raffinés
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Vins d'exception</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Champagnes</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Tapas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expérience gastronomique section */}
          <div className="mt-8 group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxjb29raW5nJTIwd29ya3Nob3B8ZW58MHx8fHwxNzUyNTE3MDkzfDA&ixlib=rb-4.1.0&q=85"
              alt="Expérience gastronomique"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center mb-3">
                <Utensils className="w-8 h-8 text-neon-blue mr-3" />
                <span className="text-lg font-semibold">19h00 - 22h30</span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Expérience gastronomique</h3>
              <p className="text-lg text-gray-200 mb-4">
                Participez à nos ateliers culinaires, dégustations et soirées découverte animées par nos chefs
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Ateliers cuisine</span>
                <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Dégustations vins</span>
                <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Soirées découverte</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à découvrir GENIAL ?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Commandez en ligne, réservez votre table ou venez nous rendre visite au marché
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/store" className="btn btn-gold text-lg px-8 py-3">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Découvrir le store
              </Link>
              <Link to="/reservations" className="btn btn-secondary text-lg px-8 py-3">
                <Calendar className="w-5 h-5 mr-2" />
                Réserver maintenant
              </Link>
              <Link to="/contact" className="btn btn-ghost text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                <Mail className="w-5 h-5 mr-2" />
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nos établissements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Nos établissements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos 4 lieux d'exception dans Paris, chacun avec sa propre personnalité
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            {/* Établissement 1 - Saint-Germain */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1709289025780-a750386056e2" 
                alt="GENIAL Saint-Germain"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">GENIAL Saint-Germain</h3>
                <p className="text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  45 rue de Rennes, 75006 Paris
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Notre flagship store au cœur de Saint-Germain. Espace dégustation, ateliers cuisine et terrasse.
                </p>
                <div className="text-sm text-gray-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  7h00 - 22h30
                </div>
              </div>
            </div>

            {/* Établissement 2 - Marais */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="/api/placeholder/400/300" 
                alt="GENIAL Marais"
                className="w-full h-48 object-cover"
                style={{
                  backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                      <rect width="400" height="300" fill="#2c3e50"/>
                      <rect x="0" y="100" width="400" height="200" fill="#34495e"/>
                      <rect x="50" y="120" width="300" height="160" fill="#1a1a1a" rx="10"/>
                      <rect x="70" y="140" width="260" height="120" fill="#f8f9fa"/>
                      <text x="200" y="90" text-anchor="middle" fill="#0066ff" font-family="Arial" font-size="32" font-weight="bold">GENIAL</text>
                      <text x="200" y="110" text-anchor="middle" fill="#0066ff" font-family="Arial" font-size="14">Market</text>
                      <rect x="90" y="160" width="40" height="80" fill="#e74c3c"/>
                      <rect x="140" y="160" width="40" height="80" fill="#f39c12"/>
                      <rect x="190" y="160" width="40" height="80" fill="#2ecc71"/>
                      <rect x="240" y="160" width="40" height="80" fill="#3498db"/>
                      <rect x="290" y="160" width="40" height="80" fill="#9b59b6"/>
                      <circle cx="60" cy="60" r="8" fill="#f1c40f"/>
                      <circle cx="340" cy="60" r="8" fill="#f1c40f"/>
                      <text x="200" y="280" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12">Ambiance historique • Produits artisanaux</text>
                    </svg>
                  `)}`
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">GENIAL Marais</h3>
                <p className="text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  23 rue des Rosiers, 75004 Paris
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Dans un cadre historique du Marais. Spécialités artisanales et produits du terroir français.
                </p>
                <div className="text-sm text-gray-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  7h00 - 22h30
                </div>
              </div>
            </div>

            {/* Établissement 3 - Montmartre */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="/api/placeholder/400/300" 
                alt="GENIAL Montmartre"
                className="w-full h-48 object-cover"
                style={{
                  backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                      <rect width="400" height="300" fill="#ecf0f1"/>
                      <rect x="0" y="0" width="400" height="80" fill="#2c3e50"/>
                      <rect x="50" y="20" width="300" height="40" fill="#0066ff" rx="5"/>
                      <text x="200" y="45" text-anchor="middle" fill="#fff" font-family="Arial" font-size="20" font-weight="bold">GENIAL Market</text>
                      <rect x="20" y="100" width="360" height="160" fill="#fff" stroke="#bdc3c7" stroke-width="2"/>
                      <rect x="40" y="120" width="80" height="60" fill="#e8f5e8" rx="5"/>
                      <rect x="140" y="120" width="80" height="60" fill="#fff5e6" rx="5"/>
                      <rect x="240" y="120" width="80" height="60" fill="#f0f8ff" rx="5"/>
                      <rect x="40" y="200" width="80" height="40" fill="#8b4513" rx="5"/>
                      <rect x="140" y="200" width="80" height="40" fill="#8b4513" rx="5"/>
                      <rect x="240" y="200" width="80" height="40" fill="#8b4513" rx="5"/>
                      <circle cx="60" cy="140" r="8" fill="#27ae60"/>
                      <circle cx="100" cy="140" r="8" fill="#27ae60"/>
                      <circle cx="160" cy="140" r="8" fill="#f39c12"/>
                      <circle cx="200" cy="140" r="8" fill="#f39c12"/>
                      <circle cx="260" cy="140" r="8" fill="#3498db"/>
                      <circle cx="300" cy="140" r="8" fill="#3498db"/>
                      <text x="200" y="280" text-anchor="middle" fill="#2c3e50" font-family="Arial" font-size="12">Charme montmartrois • Vue panoramique</text>
                    </svg>
                  `)}`
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">GENIAL Montmartre</h3>
                <p className="text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  8 place du Tertre, 75018 Paris
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Ambiance bohème au pied du Sacré-Cœur. Terrasse avec vue et spécialités locales.
                </p>
                <div className="text-sm text-gray-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  7h00 - 22h30
                </div>
              </div>
            </div>

            {/* Établissement 4 - Bastille */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="/api/placeholder/400/300" 
                alt="GENIAL Bastille"
                className="w-full h-48 object-cover"
                style={{
                  backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                      <rect width="400" height="300" fill="#34495e"/>
                      <rect x="0" y="200" width="400" height="100" fill="#2c3e50"/>
                      <rect x="50" y="50" width="300" height="200" fill="#1a1a1a" rx="10"/>
                      <rect x="60" y="30" width="280" height="40" fill="#0066ff" rx="5"/>
                      <text x="200" y="55" text-anchor="middle" fill="#fff" font-family="Arial" font-size="24" font-weight="bold">GENIAL</text>
                      <rect x="80" y="80" width="240" height="120" fill="#f8f9fa"/>
                      <rect x="100" y="100" width="50" height="30" fill="#e74c3c"/>
                      <rect x="175" y="100" width="50" height="30" fill="#f39c12"/>
                      <rect x="250" y="100" width="50" height="30" fill="#2ecc71"/>
                      <rect x="100" y="140" width="50" height="30" fill="#3498db"/>
                      <rect x="175" y="140" width="50" height="30" fill="#9b59b6"/>
                      <rect x="250" y="140" width="50" height="30" fill="#1abc9c"/>
                      <rect x="90" y="220" width="60" height="20" fill="#8b4513" rx="3"/>
                      <rect x="170" y="220" width="60" height="20" fill="#8b4513" rx="3"/>
                      <rect x="250" y="220" width="60" height="20" fill="#8b4513" rx="3"/>
                      <circle cx="365" cy="35" r="5" fill="#f1c40f"/>
                      <circle cx="380" cy="35" r="5" fill="#f1c40f"/>
                      <circle cx="395" cy="35" r="5" fill="#f1c40f"/>
                      <text x="200" y="280" text-anchor="middle" fill="#bdc3c7" font-family="Arial" font-size="12">Quartier branché • Concept moderne</text>
                    </svg>
                  `)}`
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">GENIAL Bastille</h3>
                <p className="text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  12 rue de la Roquette, 75011 Paris
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Concept moderne dans le quartier branché. Espace co-working et événements nocturnes.
                </p>
                <div className="text-sm text-gray-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  7h00 - 22h30
                </div>
              </div>
            </div>
          </div>

          {/* Carte de Paris */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">Trouvez-nous dans Paris</h3>
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
                      <rect width="800" height="400" fill="#e8f4f8"/>
                      <path d="M100 200 Q200 150 300 200 T500 200 Q600 150 700 200" stroke="#3498db" stroke-width="3" fill="none"/>
                      <path d="M150 100 Q250 50 350 100 T550 100 Q650 50 750 100" stroke="#2980b9" stroke-width="2" fill="none"/>
                      <path d="M50 300 Q150 250 250 300 T450 300 Q550 250 650 300" stroke="#3498db" stroke-width="2" fill="none"/>
                      
                      <!-- Arrondissements -->
                      <circle cx="200" cy="150" r="80" fill="#bdc3c7" opacity="0.3"/>
                      <circle cx="300" cy="200" r="60" fill="#95a5a6" opacity="0.3"/>
                      <circle cx="500" cy="180" r="90" fill="#7f8c8d" opacity="0.3"/>
                      <circle cx="600" cy="220" r="70" fill="#95a5a6" opacity="0.3"/>
                      
                      <!-- Établissements GENIAL -->
                      <circle cx="180" cy="160" r="8" fill="#0066ff" stroke="#fff" stroke-width="2"/>
                      <text x="180" y="145" text-anchor="middle" fill="#0066ff" font-family="Arial" font-size="10" font-weight="bold">Saint-Germain</text>
                      
                      <circle cx="280" cy="190" r="8" fill="#0066ff" stroke="#fff" stroke-width="2"/>
                      <text x="280" y="175" text-anchor="middle" fill="#0066ff" font-family="Arial" font-size="10" font-weight="bold">Marais</text>
                      
                      <circle cx="480" cy="120" r="8" fill="#0066ff" stroke="#fff" stroke-width="2"/>
                      <text x="480" y="105" text-anchor="middle" fill="#0066ff" font-family="Arial" font-size="10" font-weight="bold">Montmartre</text>
                      
                      <circle cx="520" cy="200" r="8" fill="#0066ff" stroke="#fff" stroke-width="2"/>
                      <text x="520" y="185" text-anchor="middle" fill="#0066ff" font-family="Arial" font-size="10" font-weight="bold">Bastille</text>
                      
                      <!-- Landmarks -->
                      <rect x="350" y="160" width="8" height="15" fill="#8b4513"/>
                      <polygon points="354,160 350,150 358,150" fill="#e74c3c"/>
                      <text x="354" y="145" text-anchor="middle" fill="#8b4513" font-family="Arial" font-size="8">Tour Eiffel</text>
                      
                      <rect x="450" y="100" width="12" height="20" fill="#ecf0f1"/>
                      <polygon points="456,100 450,90 462,90" fill="#ecf0f1"/>
                      <text x="456" y="85" text-anchor="middle" fill="#7f8c8d" font-family="Arial" font-size="8">Sacré-Cœur</text>
                      
                      <rect x="550" y="180" width="15" height="25" fill="#f39c12"/>
                      <text x="557" y="175" text-anchor="middle" fill="#f39c12" font-family="Arial" font-size="8">Bastille</text>
                      
                      <text x="400" y="350" text-anchor="middle" fill="#34495e" font-family="Arial" font-size="16" font-weight="bold">PARIS - 4 établissements GENIAL</text>
                      
                      <!-- Légende -->
                      <rect x="20" y="20" width="150" height="60" fill="#fff" opacity="0.9" rx="5"/>
                      <circle cx="35" cy="35" r="4" fill="#0066ff"/>
                      <text x="50" y="39" fill="#2c3e50" font-family="Arial" font-size="12">GENIAL Market</text>
                      <rect x="30" y="45" width="6" height="10" fill="#8b4513"/>
                      <text x="50" y="54" fill="#2c3e50" font-family="Arial" font-size="12">Monuments</text>
                      <path d="M30 62 Q35 58 40 62" stroke="#3498db" stroke-width="2" fill="none"/>
                      <text x="50" y="66" fill="#2c3e50" font-family="Arial" font-size="12">Seine</text>
                    </svg>
                  `)}`
                }}
              />
              
              {/* Points interactifs */}
              <div className="absolute top-20 left-36 group">
                <div className="w-4 h-4 bg-neon-blue rounded-full border-2 border-white cursor-pointer transform hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                    Saint-Germain • 45 rue de Rennes
                  </div>
                </div>
              </div>
              
              <div className="absolute top-32 left-56 group">
                <div className="w-4 h-4 bg-neon-blue rounded-full border-2 border-white cursor-pointer transform hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                    Marais • 23 rue des Rosiers
                  </div>
                </div>
              </div>
              
              <div className="absolute top-12 right-80 group">
                <div className="w-4 h-4 bg-neon-blue rounded-full border-2 border-white cursor-pointer transform hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                    Montmartre • 8 place du Tertre
                  </div>
                </div>
              </div>
              
              <div className="absolute top-32 right-56 group">
                <div className="w-4 h-4 bg-neon-blue rounded-full border-2 border-white cursor-pointer transform hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                    Bastille • 12 rue de la Roquette
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Témoignages clients - Défilement horizontal */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Ce que disent nos clients</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences de nos clients fidèles
            </p>
          </div>
          
          {/* Carrousel de témoignages */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-6">
              {/* Témoignage 1 */}
              <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Une expérience incroyable ! Les produits sont d'une qualité exceptionnelle et l'atelier cuisine était fantastique. Je recommande vivement !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sophie Martin</p>
                    <p className="text-sm text-gray-500">Cliente fidèle</p>
                  </div>
                </div>
              </div>
              
              {/* Témoignage 2 */}
              <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "J'adore venir ici pour mes courses quotidiennes. L'équipe est formidable et les produits locaux sont un vrai délice."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    PD
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pierre Dubois</p>
                    <p className="text-sm text-gray-500">Résident du quartier</p>
                  </div>
                </div>
              </div>
              
              {/* Témoignage 3 */}
              <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Les soirées dégustation de vins sont exceptionnelles. J'ai découvert des pépites et rencontré des passionnés !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    CL
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Claire Lefèvre</p>
                    <p className="text-sm text-gray-500">Amatrice de vins</p>
                  </div>
                </div>
              </div>
              
              {/* Témoignage 4 */}
              <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Le concept est génial ! C'est bien plus qu'un simple marché, c'est un lieu de vie où l'on apprend et découvre."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    MR
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Marc Robert</p>
                    <p className="text-sm text-gray-500">Chef amateur</p>
                  </div>
                </div>
              </div>
              
              {/* Témoignage 5 */}
              <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Mes enfants adorent les ateliers cuisine du week-end. C'est éducatif et amusant, parfait pour les familles !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    AB
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Anne Berger</p>
                    <p className="text-sm text-gray-500">Maman de famille</p>
                  </div>
                </div>
              </div>
              
              {/* Témoignage 6 */}
              <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "La qualité des produits et le service client sont irréprochables. Je ne fais plus mes courses ailleurs !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Jean Michel</p>
                    <p className="text-sm text-gray-500">Gourmand passionné</p>
                  </div>
                </div>
              </div>
              
              {/* Dupliquer pour assurer le défilement continu */}
              <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Une expérience incroyable ! Les produits sont d'une qualité exceptionnelle et l'atelier cuisine était fantastique. Je recommande vivement !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sophie Martin</p>
                    <p className="text-sm text-gray-500">Cliente fidèle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nous trouver</h2>
            <p className="text-xl text-gray-600">
              Venez nous rendre visite au cœur de Paris
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-2xl font-bold mb-6">Informations pratiques</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Adresse</p>
                        <p className="text-gray-600">140 rue Saint-Dominique<br />75007 Paris</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Horaires</p>
                        <p className="text-gray-600">Lundi - Dimanche<br />7h00 - 22h00</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Téléphone</p>
                        <p className="text-gray-600">01 42 33 44 55</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-gray-600">contact@genial.fr</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h3 className="text-2xl font-bold mb-6">Plan d'accès</h3>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-gray-600">Carte interactive</p>
                      <p className="text-sm text-gray-500">Métro : Invalides (ligne 8, 13)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;