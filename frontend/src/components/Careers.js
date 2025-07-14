import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Users, Send, CheckCircle } from 'lucide-react';
import { apiService } from '../utils/api';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    cover_letter: '',
    resume_url: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiService.getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback with mock data
      setJobs([
        {
          id: 1,
          title: 'Vendeur/Vendeuse en épicerie fine',
          location: 'Paris 7ème',
          job_type: 'CDI',
          salary: '2200€ - 2800€',
          description: 'Nous recherchons un(e) vendeur/vendeuse passionné(e) par les produits d\'exception pour rejoindre notre équipe. Vous serez en charge de l\'accueil client, du conseil et de la vente de nos produits premium.',
          requirements: [
            'Expérience en vente alimentaire ou épicerie fine',
            'Passion pour les produits de qualité',
            'Excellent relationnel client',
            'Connaissance des produits régionaux français',
            'Disponibilité week-end'
          ],
          created_at: new Date().toISOString(),
          is_active: true
        },
        {
          id: 2,
          title: 'Responsable de rayon charcuterie',
          location: 'Paris 7ème',
          job_type: 'CDI',
          salary: '2800€ - 3200€',
          description: 'Rejoignez notre équipe en tant que responsable du rayon charcuterie. Vous gérerez les approvisionnements, la présentation des produits et conseillerez notre clientèle exigeante.',
          requirements: [
            'CAP/BEP Charcuterie ou équivalent',
            'Expérience en charcuterie traditionnelle',
            'Connaissance des normes HACCP',
            'Capacité à travailler en équipe',
            'Passion pour l\'artisanat alimentaire'
          ],
          created_at: new Date().toISOString(),
          is_active: true
        },
        {
          id: 3,
          title: 'Sommelier/Caviste',
          location: 'Paris 7ème',
          job_type: 'CDI',
          salary: '3000€ - 3800€',
          description: 'Nous cherchons un(e) sommelier/caviste pour enrichir notre équipe. Vous serez en charge de la sélection des vins, du conseil client et de l\'animation de dégustations.',
          requirements: [
            'Formation sommellerie ou caviste',
            'Excellente connaissance des vins français',
            'Capacité d\'animation commerciale',
            'Maîtrise des accords mets-vins',
            'Aisance relationnelle'
          ],
          created_at: new Date().toISOString(),
          is_active: true
        },
        {
          id: 4,
          title: 'Chef de cuisine',
          location: 'Paris 7ème',
          job_type: 'CDI',
          salary: '3500€ - 4500€',
          description: 'Rejoignez GENIAL comme chef de cuisine pour notre espace restauration. Vous concevrez des menus créatifs mettant en valeur nos produits d\'exception.',
          requirements: [
            'Formation culinaire reconnue',
            'Expérience en restauration qualité',
            'Créativité et innovation culinaire',
            'Gestion d\'équipe',
            'Passion pour les produits de terroir'
          ],
          created_at: new Date().toISOString(),
          is_active: true
        },
        {
          id: 5,
          title: 'Apprenti(e) boulanger/pâtissier',
          location: 'Paris 7ème',
          job_type: 'Apprentissage',
          salary: 'Selon grille apprentissage',
          description: 'Opportunité d\'apprentissage dans notre laboratoire de boulangerie-pâtisserie. Formez-vous aux côtés de nos artisans pour maîtriser les techniques traditionnelles.',
          requirements: [
            'Motivation et passion pour la boulangerie',
            'Inscription en formation boulangerie/pâtisserie',
            'Disponibilité tôt le matin',
            'Esprit d\'équipe',
            'Rigueur et précision'
          ],
          created_at: new Date().toISOString(),
          is_active: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setFormData({
      job_id: job.id,
      applicant_name: '',
      applicant_email: '',
      applicant_phone: '',
      cover_letter: '',
      resume_url: ''
    });
    setShowApplicationForm(true);
  };

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
      await apiService.applyForJob(selectedJob.id, formData);
      setShowApplicationForm(false);
      setSelectedJob(null);
      // Show success message
      alert('Candidature envoyée avec succès !');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Erreur lors de l\'envoi de la candidature');
    } finally {
      setLoading(false);
    }
  };

  const getJobTypeColor = (type) => {
    switch (type) {
      case 'CDI': return 'bg-green-100 text-green-800';
      case 'CDD': return 'bg-blue-100 text-blue-800';
      case 'Apprentissage': return 'bg-purple-100 text-purple-800';
      case 'Stage': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des offres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rejoignez l'aventure GENIAL
            </h1>
            <p className="text-xl mb-8">
              Découvrez nos opportunités de carrière et participez à révolutionner l'expérience alimentaire
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Équipe passionnée</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Paris 7ème</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Postes variés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Company Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi rejoindre GENIAL ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence & Qualité</h3>
                <p className="text-gray-600">
                  Travaillez avec des produits d'exception et des partenaires de confiance
                </p>
              </div>
            </div>

            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation & Créativité</h3>
                <p className="text-gray-600">
                  Participez à la révolution de l'expérience alimentaire moderne
                </p>
              </div>
            </div>

            <div className="card text-center hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Équipe & Convivialité</h3>
                <p className="text-gray-600">
                  Intégrez une équipe passionnée dans un environnement bienveillant
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Offres d'emploi</h2>
          
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="card hover:shadow-xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.job_type}</span>
                        </div>
                        {job.salary && (
                          <div className="font-semibold text-primary">
                            {job.salary}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.job_type)}`}>
                        {job.job_type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(job.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Profil recherché :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleJobClick(job)}
                      className="btn btn-primary"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Postuler
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Avantages & Bénéfices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold mb-1">Salaire attractif</h3>
              <p className="text-sm text-gray-600">Rémunération compétitive selon profil</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🍽️</div>
              <h3 className="font-semibold mb-1">Repas d'équipe</h3>
              <p className="text-sm text-gray-600">Déjeuners avec les produits GENIAL</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold mb-1">Formation</h3>
              <p className="text-sm text-gray-600">Développement des compétences</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Évolution</h3>
              <p className="text-sm text-gray-600">Opportunités de carrière</p>
            </div>
          </div>
        </section>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Postuler pour : {selectedJob.title}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nom complet *</label>
                  <input
                    type="text"
                    name="applicant_name"
                    value={formData.applicant_name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="applicant_email"
                    value={formData.applicant_email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Téléphone *</label>
                <input
                  type="tel"
                  name="applicant_phone"
                  value={formData.applicant_phone}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div>
                <label className="form-label">Lettre de motivation *</label>
                <textarea
                  name="cover_letter"
                  value={formData.cover_letter}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="6"
                  placeholder="Présentez-vous et expliquez pourquoi vous souhaitez rejoindre GENIAL..."
                  required
                />
              </div>

              <div>
                <label className="form-label">CV (lien vers votre CV en ligne)</label>
                <input
                  type="url"
                  name="resume_url"
                  value={formData.resume_url}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="https://..."
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note :</strong> Votre candidature sera examinée par notre équipe RH. 
                  Nous vous contacterons dans les plus brefs délais si votre profil correspond à nos attentes.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="btn btn-secondary flex-1"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1"
                >
                  {loading ? 'Envoi...' : 'Envoyer ma candidature'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;