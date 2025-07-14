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
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1631021967261-c57ee4dfa9bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiYXNrZXR8ZW58MHx8fHwxNzUyNDIxNTY2fDA&ixlib=rb-4.1.0&q=85"
            alt="Panier de légumes frais"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Caddie */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-neon-blue rounded-full flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">GENIAL</span>
              <span className="block text-lg md:text-xl font-normal mt-2 text-gray-300">
                Un nouveau lieu de vie
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Marché frais • Épicerie fine • Restauration
            </p>
            <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto">
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
                <h3 className="text-3xl font-bold mb-3 text-white">{slot.title}</h3>
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
                src="https://images.unsplash.com/photo-1748335083329-f9cc0e65812b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwbHVuY2h8ZW58MHx8fHwxNzUyNTExMTc2fDA&ixlib=rb-4.1.0&q=85"
                alt="Lunch artisanal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-3">
                  <Sandwich className="w-8 h-8 text-neon-blue mr-3" />
                  <span className="text-lg font-semibold">11h30 - 15h00</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Lunch gourmand</h3>
                <p className="text-lg text-gray-200 mb-4">
                  Savourez nos sandwichs artisanaux, salades fraîches et plats du jour
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Focaccia maison</span>
                  <span className="px-3 py-1 bg-neon-blue/20 rounded-full text-sm border border-neon-blue/30">Salades</span>
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
                  <span className="text-lg font-semibold">10h00 - 19h00</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Marché d'exception</h3>
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
                <h3 className="text-3xl font-bold mb-3">Apéro dînatoire</h3>
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

          {/* Restaurant section with people at table */}
          <div className="mt-8 group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1631021967261-c57ee4dfa9bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiYXNrZXR8ZW58MHx8fHwxNzUyNDIxNTY2fDA&ixlib=rb-4.1.0&q=85"
              alt="Restaurant ambiance"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl mx-auto text-center px-6 text-white">
                <div className="flex items-center justify-center mb-4">
                  <Utensils className="w-10 h-10 text-neon-blue mr-4" />
                  <span className="text-xl font-semibold">19h00 - 22h30</span>
                </div>
                <h3 className="text-4xl font-bold mb-4">Restaurant gastronomique</h3>
                <p className="text-xl text-gray-200 mb-6">
                  Terminez votre journée par une expérience culinaire unique dans notre restaurant
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="px-4 py-2 bg-neon-blue/20 rounded-full text-lg border border-neon-blue/30">Menu dégustation</span>
                  <span className="px-4 py-2 bg-neon-blue/20 rounded-full text-lg border border-neon-blue/30">Cuisine créative</span>
                  <span className="px-4 py-2 bg-neon-blue/20 rounded-full text-lg border border-neon-blue/30">Accords mets-vins</span>
                </div>
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de ceux qui ont adopté GENIAL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gray-600 font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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