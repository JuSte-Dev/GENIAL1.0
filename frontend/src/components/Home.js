import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  ShoppingCart, 
  Calendar,
  Coffee,
  Utensils,
  Wine,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail
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
              <Link to="/store" className="btn btn-primary text-lg px-8 py-3">
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

      {/* Time Slots Section - Notting Hill Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Une journée GENIAL</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Du café matinal à l'apéro dînatoire, vivez chaque moment dans l'atmosphère unique de notre marché moderne
            </p>
          </div>

          {/* Large Image Grid - Notting Hill Style */}
          <div className="space-y-12">
            {/* Morning 7h-11h */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1606925596310-07f140a50c77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBicmVha2Zhc3R8ZW58MHx8fHdoaXRlfDE3NTI0MjA4NDl8MA&ixlib=rb-4.1.0&q=85"
                  alt="Réveil Gourmand"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6 lg:pl-8">
                <div className="flex items-center space-x-3">
                  <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-4 py-2 rounded-full">
                    7h-11h
                  </span>
                  <Coffee className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Réveil Gourmand</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Café Partisan torréfié localement, viennoiseries artisanales du jour, fruits frais cueillis le matin. 
                  Marché ouvert pour vos courses matinales.
                </p>
                <Link to="/store" className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700">
                  Découvrir notre sélection café
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Lunch 12h-15h */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 lg:pr-8 lg:order-1">
                <div className="flex items-center space-x-3">
                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                    12h-15h
                  </span>
                  <Utensils className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Pause Déjeuner</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sandwichs gourmets, salades composées avec les légumes du marché, cuisine ouverte. 
                  Shopping libre dans notre épicerie fine.
                </p>
                <Link to="/reservations" className="inline-flex items-center text-green-600 font-semibold hover:text-green-700">
                  Réserver une table
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="h-96 rounded-2xl overflow-hidden shadow-2xl lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1662714208483-3480ccd2de39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxsdW5jaCUyMGdyb2Nlcnl8ZW58MHx8fHdoaXRlfDE3NTI0MjA4NTZ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Pause Déjeuner"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Shopping 7h-22h */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                  alt="Shopping Épicerie"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6 lg:pl-8">
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                    7h-22h
                  </span>
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Shopping Épicerie</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Marché frais et épicerie fine ouverts toute la journée. Shopping libre entre les étals suspendus, 
                  armoires réfrigérées et table centrale conviviale.
                </p>
                <Link to="/store" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                  Parcourir notre store
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Apéro 18h-22h */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 lg:pr-8 lg:order-1">
                <div className="flex items-center space-x-3">
                  <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
                    18h-22h
                  </span>
                  <Wine className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Apéro Dînatoire</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Vins naturels, charcuterie d'exception, fromages affinés, planches à partager. 
                  Ambiance conviviale autour de notre table centrale.
                </p>
                <Link to="/reservations" className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700">
                  Réserver pour l'apéro
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="h-96 rounded-2xl overflow-hidden shadow-2xl lg:order-2">
                <img 
                  src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                  alt="Apéro Dînatoire"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
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