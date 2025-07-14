import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageCircle } from 'lucide-react';
import { apiService } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const contactTypes = [
    { value: 'general', label: 'Question générale' },
    { value: 'producer', label: 'Devenir producteur partenaire' },
    { value: 'partnership', label: 'Partenariat commercial' },
    { value: 'press', label: 'Presse et médias' },
    { value: 'event', label: 'Événements privés' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.sendContactMessage(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl mb-8">
              Une question, un projet, une suggestion ? Nous sommes là pour vous écouter
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <p className="text-green-800">
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nom complet *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Type de demande</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {contactTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Sujet *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div>
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      140 rue Saint-Dominique<br />
                      75007 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+33142334455" className="hover:text-primary">
                        01 42 33 44 55
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@genial.fr" className="hover:text-primary">
                        contact@genial.fr
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Dimanche<br />
                      7h00 - 22h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Comment devenir producteur partenaire ?</h3>
                  <p className="text-sm text-gray-600">
                    Contactez-nous via le formulaire en sélectionnant "Devenir producteur partenaire". 
                    Nous étudierons votre candidature et vous recontacterons.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Proposez-vous la livraison ?</h3>
                  <p className="text-sm text-gray-600">
                    Actuellement, nous proposons uniquement la commande en ligne avec retrait en magasin. 
                    La livraison sera disponible prochainement.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Organisez-vous des événements privés ?</h3>
                  <p className="text-sm text-gray-600">
                    Oui ! Nous organisons des dégustations privées, ateliers culinaires et événements sur mesure. 
                    Contactez-nous pour plus d'informations.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comment utiliser mon programme fidélité ?</h3>
                  <p className="text-sm text-gray-600">
                    Présentez votre QR code personnel en magasin pour gagner des points. 
                    Consultez votre profil en ligne pour gérer vos points et récompenses.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Suivez-nous</h2>
              
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/genial_paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  📷
                </a>
                <a
                  href="https://facebook.com/genial.paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  📘
                </a>
                <a
                  href="https://twitter.com/genial_paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  🐦
                </a>
                <a
                  href="https://linkedin.com/company/genial-paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  💼
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comment nous trouver</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Plan interactif</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Métro : Invalides (lignes 8, 13)<br />
                    Bus : 28, 49, 63, 83, 93
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Accès en transport</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Métro :</strong> Invalides (lignes 8, 13) - 3 min à pied</p>
                    <p><strong>Bus :</strong> Arrêt Invalides (lignes 28, 49, 63, 83, 93)</p>
                    <p><strong>RER :</strong> Invalides (RER C) - 5 min à pied</p>
                    <p><strong>Vélib' :</strong> Station Place des Invalides</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Stationnement</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Parking :</strong> Invalides (200m)</p>
                    <p><strong>Places payantes :</strong> Rue Saint-Dominique</p>
                    <p><strong>Zone :</strong> Stationnement résidentiel</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Accès PMR</h3>
                  <p className="text-sm text-gray-600">
                    Notre magasin est accessible aux personnes à mobilité réduite. 
                    Entrée de plain-pied et espaces adaptés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;