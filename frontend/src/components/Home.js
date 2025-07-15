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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Découvrez nos 4 adresses à Paris</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chacune avec sa propre personnalité et son ambiance unique
            </p>
          </div>
          
          {/* Carrousel des établissements */}
          <div className="relative overflow-hidden mb-12">
            {/* Flèche gauche */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              onClick={() => document.querySelector('.carousel-container').scrollBy({ left: -320, behavior: 'smooth' })}
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Flèche droite */}
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              onClick={() => document.querySelector('.carousel-container').scrollBy({ left: 320, behavior: 'smooth' })}
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex animate-scroll space-x-6 carousel-container" style={{ animationPlayState: 'running' }}>
              {/* Établissement 1 - Saint-Germain */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1622076356935-900292e7019a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjBzdG9yZWZyb250fGVufDB8fHx8MTc1MjU3NjY3N3ww&ixlib=rb-4.1.0&q=85" 
                    alt="GENIAL Saint-Germain - Terrasse avec parasols"
                    className="w-full h-40 object-cover"
                  />
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h4 className="font-bold text-lg mb-3">Informations pratiques</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>45 rue de Rennes, 75006 Paris</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>01 42 33 44 55</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>7h00 - 22h30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-2">GENIAL Saint-Germain</h3>
                  <p className="text-xs text-gray-500">
                    Notre flagship store au cœur de Saint-Germain. Espace dégustation, ateliers cuisine et terrasse.
                  </p>
                </div>
              </div>

              {/* Établissement 2 - Marais */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src="https://images.pexels.com/photos/2432221/pexels-photo-2432221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="GENIAL Marais - Storefront de nuit"
                    className="w-full h-40 object-cover"
                  />
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h4 className="font-bold text-lg mb-3">Informations pratiques</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>23 rue des Rosiers, 75004 Paris</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>01 42 33 44 56</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>7h00 - 22h30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-2">GENIAL Marais</h3>
                  <p className="text-xs text-gray-500">
                    Dans un cadre historique du Marais. Spécialités artisanales et produits du terroir français.
                  </p>
                </div>
              </div>

              {/* Établissement 3 - Montmartre */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85" 
                    alt="GENIAL Montmartre - Intérieur avec clients"
                    className="w-full h-40 object-cover"
                  />
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h4 className="font-bold text-lg mb-3">Informations pratiques</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>8 place du Tertre, 75018 Paris</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>01 42 33 44 57</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>7h00 - 22h30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-2">GENIAL Montmartre</h3>
                  <p className="text-xs text-gray-500">
                    Ambiance bohème au pied du Sacré-Cœur. Terrasse avec vue et spécialités locales.
                  </p>
                </div>
              </div>

              {/* Établissement 4 - Bastille */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1516154767575-2146adebdf32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85" 
                    alt="GENIAL Bastille - Intérieur avec fruits/légumes"
                    className="w-full h-40 object-cover"
                  />
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h4 className="font-bold text-lg mb-3">Informations pratiques</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>12 rue de la Roquette, 75011 Paris</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>01 42 33 44 58</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>7h00 - 22h30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-2">GENIAL Bastille</h3>
                  <p className="text-xs text-gray-500">
                    Concept moderne dans le quartier branché. Espace co-working et événements nocturnes.
                  </p>
                </div>
              </div>
              
              {/* Dupliquer pour défilement continu */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1631021967261-c57ee4dfa9bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiYXNrZXR8ZW58MHx8fHwxNzUyNDIxNTY2fDA&ixlib=rb-4.1.0&q=85" 
                    alt="GENIAL Saint-Germain - Terrasse avec parasols"
                    className="w-full h-40 object-cover"
                  />
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h4 className="font-bold text-lg mb-3">Informations pratiques</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>45 rue de Rennes, 75006 Paris</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>01 42 33 44 55</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>7h00 - 22h30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-2">GENIAL Saint-Germain</h3>
                  <p className="text-xs text-gray-500">
                    Notre flagship store au cœur de Saint-Germain. Espace dégustation, ateliers cuisine et terrasse.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte de Paris */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">Trouvez-nous dans Paris</h3>
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.2945%2C48.8356%2C2.4095%2C48.8866&layer=mapnik&marker=48.8611%2C2.352"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                className="rounded-lg"
              />
              
              {/* Points interactifs par-dessus la carte */}
              <div className="absolute top-32 left-1/3 group">
                <div className="w-4 h-4 bg-neon-blue rounded-full border-2 border-white cursor-pointer transform hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                    Saint-Germain • 45 rue de Rennes
                  </div>
                </div>
              </div>
              
              <div className="absolute top-40 left-1/2 group">
                <div className="w-4 h-4 bg-neon-blue rounded-full border-2 border-white cursor-pointer transform hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                    Marais • 23 rue des Rosiers
                  </div>
                </div>
              </div>
              
              <div className="absolute top-20 right-1/3 group">
                <div className="w-4 h-4 bg-neon-blue rounded-full border-2 border-white cursor-pointer transform hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                    Montmartre • 8 place du Tertre
                  </div>
                </div>
              </div>
              
              <div className="absolute top-48 right-1/4 group">
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

      {/* Informations générales */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Informations générales</h2>
            <p className="text-xl text-gray-600">
              Toutes les informations utiles pour nous contacter
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Email général</h3>
                  <p className="text-gray-600">contact@genial.fr</p>
                </div>
                <div className="text-center">
                  <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Service client</h3>
                  <p className="text-gray-600">01 42 33 44 00</p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Horaires</h3>
                  <p className="text-gray-600">7h00 - 22h30<br />Tous les jours</p>
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