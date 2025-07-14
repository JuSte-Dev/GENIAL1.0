import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { apiService } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const Reservations = () => {
  const { user, isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'table',
    date: '',
    time_slot: '',
    guests: 2,
    special_requests: ''
  });

  const timeSlots = [
    { value: '7:00-9:00', label: '7h00 - 9h00 (Petit déjeuner)' },
    { value: '9:00-11:00', label: '9h00 - 11h00 (Brunch)' },
    { value: '12:00-14:00', label: '12h00 - 14h00 (Déjeuner)' },
    { value: '14:00-16:00', label: '14h00 - 16h00 (Pause café)' },
    { value: '18:00-20:00', label: '18h00 - 20h00 (Apéro)' },
    { value: '20:00-22:00', label: '20h00 - 22h00 (Dîner)' }
  ];

  const experiences = [
    {
      id: 'wine-tasting',
      title: 'Dégustation de vins',
      description: 'Découvrez notre sélection de vins naturels avec notre sommelier',
      duration: '2h',
      price: '45€/personne',
      image: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 'cheese-workshop',
      title: 'Atelier fromages',
      description: 'Apprenez à reconnaître et déguster les fromages d\'exception',
      duration: '1h30',
      price: '35€/personne',
      image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
    },
    {
      id: 'charcuterie-discovery',
      title: 'Découverte charcuterie',
      description: 'Voyage gustatif à travers les charcuteries artisanales',
      duration: '1h',
      price: '25€/personne',
      image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxoYW18ZW58MHx8fHdoaXRlfDE3NTI0MTYzNDR8MA&ixlib=rb-4.1.0&q=85'
    }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]);

  const fetchReservations = async () => {
    try {
      const response = await apiService.getReservations();
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reservationData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        guests: parseInt(formData.guests)
      };

      await apiService.createReservation(reservationData);
      setShowForm(false);
      setFormData({
        type: 'table',
        date: '',
        time_slot: '',
        guests: 2,
        special_requests: ''
      });
      
      if (isAuthenticated) {
        fetchReservations();
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Réservez votre expérience
            </h1>
            <p className="text-xl mb-8">
              Tables, dégustations et ateliers culinaires dans l'ambiance unique de GENIAL
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-gold text-lg px-8 py-3"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Réserver maintenant
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Reservation Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nos espaces de réservation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Table Reservation */}
            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Réservation de table</h3>
                    <p className="text-gray-600">Pour profiter de nos services de restauration</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Disponible de 7h à 22h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>2 à 8 personnes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Réservation gratuite</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, type: 'table' });
                      setShowForm(true);
                    }}
                    className="btn btn-primary w-full"
                  >
                    Réserver une table
                  </button>
                </div>
              </div>
            </div>

            {/* Experience Reservation */}
            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Expériences culinaires</h3>
                    <p className="text-gray-600">Ateliers et dégustations avec nos experts</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Créneaux spécifiques</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Groupes de 4 à 12 personnes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span>Payant selon l'expérience</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, type: 'experience' });
                      setShowForm(true);
                    }}
                    className="btn btn-gold w-full"
                  >
                    Réserver une expérience
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiences */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nos expériences culinaires</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <div key={experience.id} className="card hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="font-semibold text-primary">
                      {experience.price}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setFormData({ ...formData, type: 'experience' });
                      setShowForm(true);
                    }}
                    className="btn btn-primary w-full"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Reservations */}
        {isAuthenticated && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Mes réservations</h2>
            
            {reservations.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Aucune réservation pour le moment</p>
                <p className="text-gray-400">Réservez votre première table ou expérience</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="card">
                    <div className="card-body">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reservation.status === 'confirmed' ? 'Confirmée' :
                           reservation.status === 'pending' ? 'En attente' :
                           reservation.status}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {reservation.type === 'table' ? 'Table' : 'Expérience'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(reservation.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{reservation.time_slot}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{reservation.guests} personne{reservation.guests > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      {reservation.special_requests && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                          <strong>Demandes spéciales:</strong> {reservation.special_requests}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Contact Info */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Informations pratiques</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Adresse</h3>
              <p className="text-gray-600">
                140 rue Saint-Dominique<br />
                75007 Paris
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Téléphone</h3>
              <p className="text-gray-600">01 42 33 44 55</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">reservations@genial.fr</p>
            </div>
          </div>
        </section>
      </div>

      {/* Reservation Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Nouvelle réservation
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Type de réservation</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="table">Table</option>
                  <option value="experience">Expérience culinaire</option>
                </select>
              </div>

              <div>
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label className="form-label">Créneau horaire</label>
                <select
                  name="time_slot"
                  value={formData.time_slot}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Sélectionnez un créneau</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Nombre de personnes</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="form-control"
                  min="1"
                  max="12"
                  required
                />
              </div>

              <div>
                <label className="form-label">Demandes spéciales (optionnel)</label>
                <textarea
                  name="special_requests"
                  value={formData.special_requests}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="Allergies, régime particulier, occasion spéciale..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary flex-1"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1"
                >
                  {loading ? 'Réservation...' : 'Réserver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;