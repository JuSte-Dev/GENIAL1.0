import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Plus, Minus, Star, CreditCard, CheckCircle, MapPin, Clock, Navigation } from 'lucide-react';
import { apiService } from '../utils/api';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [preparationTime, setPreparationTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'Tous', emoji: '🛒' },
    { id: 'fruits-legumes', name: 'Fruits & Légumes', emoji: '🥬' },
    { id: 'charcuterie', name: 'Charcuterie', emoji: '🥓' },
    { id: 'viandes', name: 'Viandes', emoji: '🥩' },
    { id: 'poissons', name: 'Poissons', emoji: '🐟' },
    { id: 'fromages', name: 'Fromages', emoji: '🧀' },
    { id: 'vins-rouges', name: 'Vins Rouges', emoji: '🍷' },
    { id: 'vins-blancs', name: 'Vins Blancs', emoji: '🥂' },
    { id: 'champagnes', name: 'Champagnes', emoji: '🍾' },
    { id: 'cafe', name: 'Café Partisan', emoji: '☕' },
    { id: 'cocktails', name: 'ELY Cocktails', emoji: '🍸' },
    { id: 'epicerie', name: 'Épicerie Fine', emoji: '🥫' }
  ];

  // Products with improved images - keeping all original products
  const defaultProducts = [
    // Fruits & Légumes
    {
      id: 1,
      name: 'Tomates cerises bio',
      category: 'fruits-legumes',
      price: 8.50,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Tomates cerises biologiques, sucrées et parfumées',
      origin: 'France - Provence',
      producer: 'Marie Dubois - Ferme du Soleil',
      stock: 50
    },
    {
      id: 2,
      name: 'Avocat Hass',
      category: 'fruits-legumes',
      price: 3.20,
      unit: 'pièce',
      image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Avocat Hass à maturité parfaite',
      origin: 'Espagne',
      producer: 'Jean-Claude Berton - Vergers d\'Andalousie',
      stock: 30
    },
    {
      id: 3,
      name: 'Courgettes bio',
      category: 'fruits-legumes',
      price: 4.20,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Courgettes biologiques fraîches du jour',
      origin: 'France - Loire',
      producer: 'Laurent Mercier - Maraîchage de Loire',
      stock: 25
    },
    {
      id: 4,
      name: 'Mangue Tommy',
      category: 'fruits-legumes',
      price: 4.50,
      unit: 'pièce',
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Mangue Tommy Atkins, chair sucrée',
      origin: 'Pérou',
      producer: 'Coopérative Tropicale del Sur',
      stock: 20
    },
    {
      id: 5,
      name: 'Épinards frais',
      category: 'fruits-legumes',
      price: 6.80,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Épinards frais, feuilles tendres',
      origin: 'France - Île-de-France',
      producer: 'Sophie Moreau - Jardins de Rambouillet',
      stock: 40
    },
    {
      id: 6,
      name: 'Citrons de Menton IGP',
      category: 'fruits-legumes',
      price: 12.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Citrons de Menton IGP, parfum intense',
      origin: 'France - Menton',
      producer: 'Hervé Bonneau - Agrumes de la Côte',
      stock: 30
    },
    {
      id: 7,
      name: 'Fraises Gariguette',
      category: 'fruits-legumes',
      price: 15.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Fraises Gariguette, parfum exceptionnel',
      origin: 'France - Périgord',
      producer: 'Claire Monet - Fraisiers du Périgord',
      stock: 15
    },
    {
      id: 8,
      name: 'Aubergines violettes',
      category: 'fruits-legumes',
      price: 5.80,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Aubergines violettes, chair fondante',
      origin: 'France - Provence',
      producer: 'Paul Girard - Potager Provençal',
      stock: 25
    },
    {
      id: 9,
      name: 'Poivrons rouges',
      category: 'fruits-legumes',
      price: 7.20,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Poivrons rouges, doux et charnus',
      origin: 'France - Languedoc',
      producer: 'Sylvie Roux - Maraîchage du Soleil',
      stock: 35
    },
    {
      id: 10,
      name: 'Radis roses',
      category: 'fruits-legumes',
      price: 3.50,
      unit: 'botte',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Radis roses croquants, fanes fraîches',
      origin: 'France - Île-de-France',
      producer: 'Antoine Dubois - Potager de Fontainebleau',
      stock: 50
    },
    {
      id: 11,
      name: 'Champignons de Paris',
      category: 'fruits-legumes',
      price: 8.90,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Champignons de Paris blancs, fraîcheur garantie',
      origin: 'France - Saumur',
      producer: 'Champignonnière de Loire',
      stock: 40
    },
    {
      id: 12,
      name: 'Roquette sauvage',
      category: 'fruits-legumes',
      price: 12.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Roquette sauvage, goût piquant authentique',
      origin: 'France - Provence',
      producer: 'Ferme Bio des Alpilles',
      stock: 20
    },

    // Charcuterie - with improved images
    {
      id: 13,
      name: 'Jambon de Bayonne AOP',
      category: 'charcuterie',
      price: 45.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxoYW18ZW58MHx8fHdoaXRlfDE3NTI0MTYzNDR8MA&ixlib=rb-4.1.0&q=85',
      description: 'Jambon de Bayonne AOP, affiné 18 mois',
      origin: 'France - Pays Basque',
      producer: 'Maison Ibaïama - Salaisons Basques',
      stock: 20
    },
    {
      id: 14,
      name: 'Saucisson sec artisanal',
      category: 'charcuterie',
      price: 28.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1582074727348-f1d3d27d9f1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxzYXVzYWdlfGVufDB8fHx3aGl0ZXwxNzUyNDE2MzYyfDA&ixlib=rb-4.1.0&q=85',
      description: 'Saucisson sec pur porc, séchage traditionnel',
      origin: 'France - Auvergne',
      producer: 'Charcuterie Montagne - Maître Artisan',
      stock: 12
    },
    {
      id: 15,
      name: 'Pâté de campagne',
      category: 'charcuterie',
      price: 18.50,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4109954/pexels-photo-4109954.jpeg',
      description: 'Pâté de campagne artisanal aux herbes',
      origin: 'France - Périgord',
      producer: 'Ferme du Quercy - Charcuterie Fermière',
      stock: 18
    },
    {
      id: 16,
      name: 'Chorizo Ibérique Bellota',
      category: 'charcuterie',
      price: 65.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4198021/pexels-photo-4198021.jpeg',
      description: 'Chorizo ibérique Bellota, porc nourri aux glands',
      origin: 'Espagne - Extremadura',
      producer: 'Dehesa de Extremadura - Jamones Ibéricos',
      stock: 8
    },
    {
      id: 17,
      name: 'Jambon Noir de Bigorre AOP',
      category: 'charcuterie',
      price: 85.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxoYW18ZW58MHx8fHdoaXRlfDE3NTI0MTYzNDR8MA&ixlib=rb-4.1.0&q=85',
      description: 'Jambon Noir de Bigorre AOP, 24 mois d\'affinage',
      origin: 'France - Pyrénées',
      producer: 'Élevage Pyrénéen - Porc Gascon',
      stock: 5
    },
    {
      id: 18,
      name: 'Coppa di Parma',
      category: 'charcuterie',
      price: 42.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4198021/pexels-photo-4198021.jpeg',
      description: 'Coppa di Parma, échine de porc séchée',
      origin: 'Italie - Parme',
      producer: 'Salumificio di Parma - Tradition Italienne',
      stock: 10
    },

    // Viandes
    {
      id: 19,
      name: 'Côte de bœuf Wagyu',
      category: 'viandes',
      price: 120.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1590457075683-06eb6c958aa5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2h8ZW58MHx8fHdoaXRlfDE3NTI0MjE3NzJ8MA&ixlib=rb-4.1.0&q=85',
      description: 'Côte de bœuf Wagyu A5, persillage exceptionnel',
      origin: 'Japon',
      producer: 'Élevage Kobe Premium',
      stock: 6
    },
    {
      id: 20,
      name: 'Agneau de Sisteron IGP',
      category: 'viandes',
      price: 32.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbWVhdHxlbnwwfHx8d2hpdGV8MTc1MjQyMTc3Mnww&ixlib=rb-4.1.0&q=85',
      description: 'Gigot d\'agneau de Sisteron IGP',
      origin: 'France - Alpes',
      producer: 'Bergerie des Alpes - Élevage Traditionnel',
      stock: 12
    },
    {
      id: 21,
      name: 'Volaille fermière de Bresse',
      category: 'viandes',
      price: 18.50,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbWVhdHxlbnwwfHx8d2hpdGV8MTc1MjQyMTc3Mnww&ixlib=rb-4.1.0&q=85',
      description: 'Poulet fermier Label Rouge élevé au grain',
      origin: 'France - Bresse',
      producer: 'Ferme Avicole de Bresse - AOC',
      stock: 15
    },
    {
      id: 22,
      name: 'Canard de Barbarie',
      category: 'viandes',
      price: 22.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbWVhdHxlbnwwfHx8d2hpdGV8MTc1MjQyMTc3Mnww&ixlib=rb-4.1.0&q=85',
      description: 'Canard de Barbarie fermier, magrets et cuisses',
      origin: 'France - Sud-Ouest',
      producer: 'Élevage du Gers - Canards Fermiers',
      stock: 8
    },
    {
      id: 23,
      name: 'Veau de lait sous la mère',
      category: 'viandes',
      price: 38.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbWVhdHxlbnwwfHx8d2hpdGV8MTc1MjQyMTc3Mnww&ixlib=rb-4.1.0&q=85',
      description: 'Veau de lait élevé sous la mère, tendreté garantie',
      origin: 'France - Limousin',
      producer: 'Élevage Limousin - Veau Traditionnel',
      stock: 10
    },

    // Poissons
    {
      id: 24,
      name: 'Saumon fumé Écosse',
      category: 'poissons',
      price: 85.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4725596/pexels-photo-4725596.jpeg',
      description: 'Saumon fumé d\'Écosse, fumage artisanal',
      origin: 'Écosse',
      producer: 'Saumonerie des Highlands',
      stock: 15
    },
    {
      id: 25,
      name: 'Huîtres Gillardeau n°3',
      category: 'poissons',
      price: 4.50,
      unit: 'pièce',
      image: 'https://images.pexels.com/photos/4725595/pexels-photo-4725595.jpeg',
      description: 'Huîtres Gillardeau n°3, élevage traditionnel',
      origin: 'France - Charente-Maritime',
      producer: 'Ostréiculture Gillardeau',
      stock: 48
    },
    {
      id: 26,
      name: 'Caviar Ossetra',
      category: 'poissons',
      price: 180.00,
      unit: '50g',
      image: 'https://images.pexels.com/photos/4828218/pexels-photo-4828218.jpeg',
      description: 'Caviar Ossetra Premium, grains nacrés',
      origin: 'France - Périgord',
      producer: 'Caviar de France - Sturgeon',
      stock: 6
    },
    {
      id: 27,
      name: 'Œufs de saumon Keta',
      category: 'poissons',
      price: 45.00,
      unit: '100g',
      image: 'https://images.pexels.com/photos/4828218/pexels-photo-4828218.jpeg',
      description: 'Œufs de saumon Keta, saveur iodée',
      origin: 'Alaska',
      producer: 'Pêcherie Sauvage d\'Alaska',
      stock: 12
    },
    {
      id: 28,
      name: 'Poutargue de thon',
      category: 'poissons',
      price: 120.00,
      unit: '100g',
      image: 'https://images.pexels.com/photos/4725596/pexels-photo-4725596.jpeg',
      description: 'Poutargue de thon rouge, séchée traditionnellement',
      origin: 'Italie - Sicile',
      producer: 'Tonnara di Sicilia',
      stock: 8
    },
    {
      id: 29,
      name: 'Saint-Jacques de plongée',
      category: 'poissons',
      price: 28.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4725595/pexels-photo-4725595.jpeg',
      description: 'Saint-Jacques de plongée, pêche durable',
      origin: 'France - Normandie',
      producer: 'Pêcherie Normande - Plongée Artisanale',
      stock: 20
    },

    // Fromages
    {
      id: 30,
      name: 'Comté AOP 24 mois',
      category: 'fromages',
      price: 42.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Comté AOP affiné 24 mois, fruité et typé',
      origin: 'France - Jura',
      producer: 'Fromagerie du Jura',
      stock: 15
    },
    {
      id: 31,
      name: 'Roquefort Papillon',
      category: 'fromages',
      price: 38.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Roquefort Papillon AOP, caves de Roquefort',
      origin: 'France - Aveyron',
      producer: 'Caves de Roquefort',
      stock: 10
    },
    {
      id: 32,
      name: 'Chèvre cendré de Touraine',
      category: 'fromages',
      price: 28.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Fromage de chèvre cendré, pâte crémeuse',
      origin: 'France - Loire',
      producer: 'Ferme Caprine de Loire',
      stock: 12
    },
    {
      id: 33,
      name: 'Camembert de Normandie AOP',
      category: 'fromages',
      price: 24.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Camembert de Normandie AOP au lait cru',
      origin: 'France - Normandie',
      producer: 'Fromagerie Normande',
      stock: 18
    },

    // Vins Rouges
    {
      id: 34,
      name: 'Châteauneuf-du-Pape 2018',
      category: 'vins-rouges',
      price: 65.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Châteauneuf-du-Pape 2018, puissant et élégant',
      origin: 'France - Rhône',
      producer: 'Domaine du Pegau',
      stock: 24
    },
    {
      id: 35,
      name: 'Gevrey-Chambertin 2019',
      category: 'vins-rouges',
      price: 85.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Gevrey-Chambertin 2019, finesse bourguignonne',
      origin: 'France - Bourgogne',
      producer: 'Domaine Bourguignon',
      stock: 18
    },
    {
      id: 36,
      name: 'Barolo DOCG 2017',
      category: 'vins-rouges',
      price: 95.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Barolo DOCG 2017, roi des vins italiens',
      origin: 'Italie - Piémont',
      producer: 'Tenuta Piemontese',
      stock: 12
    },
    {
      id: 37,
      name: 'Côte-Rôtie 2016',
      category: 'vins-rouges',
      price: 110.00,
      unit: 'bouteille',
      image: 'https://images.pexels.com/photos/2647933/pexels-photo-2647933.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Côte-Rôtie 2016, syrah noble des coteaux',
      origin: 'France - Rhône Nord',
      producer: 'Domaine de la Côte',
      stock: 15
    },
    {
      id: 38,
      name: 'Pomerol 2015',
      category: 'vins-rouges',
      price: 125.00,
      unit: 'bouteille',
      image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Pomerol 2015, merlot d\'exception',
      origin: 'France - Bordeaux',
      producer: 'Château Bordelais',
      stock: 10
    },
    {
      id: 39,
      name: 'Hermitage 2014',
      category: 'vins-rouges',
      price: 140.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Hermitage 2014, syrah légendaire',
      origin: 'France - Rhône Nord',
      producer: 'Domaine de l\'Hermitage',
      stock: 8
    },
    {
      id: 40,
      name: 'Brunello di Montalcino 2016',
      category: 'vins-rouges',
      price: 95.00,
      unit: 'bouteille',
      image: 'https://images.pexels.com/photos/2647933/pexels-photo-2647933.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Brunello di Montalcino 2016, sangiovese toscan',
      origin: 'Italie - Toscane',
      producer: 'Tenuta Toscana',
      stock: 14
    },

    // Vins Blancs
    {
      id: 41,
      name: 'Chablis Premier Cru 2020',
      category: 'vins-blancs',
      price: 35.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1611571940159-425a28706d6f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Chablis Premier Cru Montmains 2020, minéral',
      origin: 'France - Bourgogne',
      producer: 'Domaine Chablis',
      stock: 30
    },
    {
      id: 42,
      name: 'Sancerre 2021',
      category: 'vins-blancs',
      price: 28.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1611571940159-425a28706d6f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Sancerre 2021, fraîcheur et vivacité',
      origin: 'France - Loire',
      producer: 'Domaine de la Loire',
      stock: 25
    },
    {
      id: 43,
      name: 'Meursault 2019',
      category: 'vins-blancs',
      price: 75.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1611571940159-425a28706d6f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Meursault 2019, richesse et complexité',
      origin: 'France - Bourgogne',
      producer: 'Domaine de Meursault',
      stock: 20
    },
    {
      id: 44,
      name: 'Condrieu 2020',
      category: 'vins-blancs',
      price: 85.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Condrieu 2020, viognier aromatique',
      origin: 'France - Rhône Nord',
      producer: 'Domaine du Condrieu',
      stock: 16
    },
    {
      id: 45,
      name: 'Puligny-Montrachet 2018',
      category: 'vins-blancs',
      price: 120.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1611571940159-425a28706d6f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Puligny-Montrachet 2018, chardonnay d\'exception',
      origin: 'France - Bourgogne',
      producer: 'Domaine de Montrachet',
      stock: 12
    },
    {
      id: 46,
      name: 'Vouvray Moelleux 2019',
      category: 'vins-blancs',
      price: 32.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1586800687177-069ba4e4f5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Vouvray Moelleux 2019, chenin blanc liquoreux',
      origin: 'France - Loire',
      producer: 'Domaine de Vouvray',
      stock: 22
    },
    {
      id: 47,
      name: 'Riesling Alsace Grand Cru 2020',
      category: 'vins-blancs',
      price: 45.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1611571940159-425a28706d6f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHx3aW5lfGVufDB8fHx3aGl0ZXwxNzUyNDE2NDA0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Riesling Alsace Grand Cru 2020, minéralité pure',
      origin: 'France - Alsace',
      producer: 'Domaine Alsacien',
      stock: 28
    },

    // Champagnes
    {
      id: 48,
      name: 'Champagne Dom Pérignon 2015',
      category: 'champagnes',
      price: 220.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1708265502359-1f6f3ad8227b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxjaGFtcGFnbmV8ZW58MHx8fHdoaXRlfDE3NTI0MTY0MTB8MA&ixlib=rb-4.1.0&q=85',
      description: 'Champagne Dom Pérignon millésime 2015',
      origin: 'France - Champagne',
      producer: 'Moët & Chandon',
      stock: 8
    },
    {
      id: 49,
      name: 'Krug Grande Cuvée',
      category: 'champagnes',
      price: 180.00,
      unit: 'bouteille',
      image: 'https://images.pexels.com/photos/14071962/pexels-photo-14071962.jpeg',
      description: 'Krug Grande Cuvée, assemblage d\'exception',
      origin: 'France - Champagne',
      producer: 'Krug',
      stock: 6
    },
    {
      id: 50,
      name: 'Bollinger Special Cuvée',
      category: 'champagnes',
      price: 55.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1708265502359-1f6f3ad8227b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxjaGFtcGFnbmV8ZW58MHx8fHdoaXRlfDE3NTI0MTY0MTB8MA&ixlib=rb-4.1.0&q=85',
      description: 'Bollinger Special Cuvée, caractère affirmé',
      origin: 'France - Champagne',
      producer: 'Bollinger',
      stock: 20
    },

    // Café Partisan
    {
      id: 51,
      name: 'Café Partisan Mélange Maison',
      category: 'cafe',
      price: 24.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Mélange signature Partisan, torréfaction artisanale',
      origin: 'Torréfaction Paris',
      producer: 'Café Partisan',
      stock: 20
    },
    {
      id: 52,
      name: 'Café Partisan Éthiopie',
      category: 'cafe',
      price: 28.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Single origin Éthiopie, notes florales',
      origin: 'Éthiopie - Sidamo',
      producer: 'Café Partisan',
      stock: 15
    },
    {
      id: 53,
      name: 'Café Partisan Capsules',
      category: 'cafe',
      price: 18.00,
      unit: 'boîte 20',
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Capsules compatibles Nespresso, mélange intense',
      origin: 'Torréfaction Paris',
      producer: 'Café Partisan',
      stock: 30
    },

    // ELY Cocktails
    {
      id: 54,
      name: 'ELY Gin Artisanal',
      category: 'cocktails',
      price: 45.00,
      unit: 'bouteille 70cl',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Gin artisanal ELY, 12 botaniques',
      origin: 'France - Distillerie ELY',
      producer: 'Distillerie ELY',
      stock: 25
    },
    {
      id: 55,
      name: 'ELY Rhum Épicé',
      category: 'cocktails',
      price: 52.00,
      unit: 'bouteille 70cl',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Rhum épicé ELY, macération d\'épices',
      origin: 'France - Distillerie ELY',
      producer: 'Distillerie ELY',
      stock: 20
    },
    {
      id: 56,
      name: 'ELY Liqueur de Poire',
      category: 'cocktails',
      price: 38.00,
      unit: 'bouteille 50cl',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Liqueur de poire Williams ELY, artisanale',
      origin: 'France - Distillerie ELY',
      producer: 'Distillerie ELY',
      stock: 15
    },
    {
      id: 57,
      name: 'ELY Vodka Premium',
      category: 'cocktails',
      price: 42.00,
      unit: 'bouteille 70cl',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Vodka premium ELY, distillation française',
      origin: 'France - Distillerie ELY',
      producer: 'Distillerie ELY',
      stock: 18
    },
    {
      id: 58,
      name: 'ELY Whisky Single Malt',
      category: 'cocktails',
      price: 85.00,
      unit: 'bouteille 70cl',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Whisky single malt ELY, vieillissement 8 ans',
      origin: 'France - Distillerie ELY',
      producer: 'Distillerie ELY',
      stock: 12
    },

    // Épicerie Fine
    {
      id: 59,
      name: 'Foie gras de canard mi-cuit',
      category: 'epicerie',
      price: 85.00,
      unit: 'terrine 200g',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Foie gras de canard mi-cuit sous vide',
      origin: 'France - Périgord',
      producer: 'Ferme du Périgord',
      stock: 12
    },
    {
      id: 60,
      name: 'Terrine de sanglier aux noisettes',
      category: 'epicerie',
      price: 22.00,
      unit: 'terrine 180g',
      image: 'https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Terrine artisanale sous vide aux noisettes',
      origin: 'France - Ardennes',
      producer: 'Charcuterie des Ardennes',
      stock: 15
    },
    {
      id: 61,
      name: 'Miel de lavande',
      category: 'epicerie',
      price: 12.00,
      unit: 'pot 250g',
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Miel de lavande de Provence, récolte 2024',
      origin: 'France - Provence',
      producer: 'Ruchers de Provence',
      stock: 25
    },
    {
      id: 62,
      name: 'Confit de canard sous vide',
      category: 'epicerie',
      price: 28.00,
      unit: '4 cuisses',
      image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Confit de canard traditionnel sous vide',
      origin: 'France - Sud-Ouest',
      producer: 'Ferme du Sud-Ouest',
      stock: 20
    },
    {
      id: 63,
      name: 'Truffe noire du Périgord',
      category: 'epicerie',
      price: 800.00,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4518607/pexels-photo-4518607.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Truffe noire du Périgord, saison 2024',
      origin: 'France - Périgord',
      producer: 'Truffières du Périgord',
      stock: 2
    }
  ];

  useEffect(() => {
    // Try to fetch products from API, fallback to default products
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          // If API returns empty array, use default products
          setProducts(defaultProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return sum + (product ? product.price * quantity : 0);
    }, 0);
  };

  const handleCheckout = () => {
    if (getTotalItems() > 0) {
      setShowCart(false);
      setShowPayment(true);
    }
  };

  const handlePayment = async () => {
    try {
      const orderData = {
        items: Object.entries(cart).filter(([_, quantity]) => quantity > 0).map(([productId, quantity]) => {
          const product = products.find(p => p.id === parseInt(productId));
          return { product_id: productId, quantity, price: product?.price || 0 };
        }),
        total_amount: getTotalPrice()
      };

      const response = await apiService.createOrder(orderData);
      const order = response.data;

      setOrderNumber(order.order_number);
      setPreparationTime(order.preparation_time);
      setCart({});
      setShowPayment(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error creating order:', error);
      // Fallback for demo
      const orderNum = 'CMD' + Math.random().toString(36).substr(2, 6).toUpperCase();
      setOrderNumber(orderNum);
      setPreparationTime(15 + getTotalItems() * 2);
      setCart({});
      setShowPayment(false);
      setShowConfirmation(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Store GENIAL</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Commandez vos produits d'exception et récupérez-les au magasin
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quality Banner */}
        <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Extra frais du jour</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Qualité premium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Producteurs sélectionnés</span>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        {getTotalItems() > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Votre panier</p>
                  <p className="text-sm text-gray-600">{getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-bold text-xl text-primary">{getTotalPrice().toFixed(2)}€</p>
                </div>
                <button
                  onClick={() => setShowCart(true)}
                  className="btn btn-primary"
                >
                  Voir le panier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 text-sm ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-base">{category.emoji}</span>
                  <span className="whitespace-nowrap">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid - 2 products per row with smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="flex">
                {/* Product Image - Left side */}
                <div className="relative w-1/3 h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-semibold text-gray-900">{product.price}€</span>
                    </div>
                  </div>
                </div>
                
                {/* Product Info - Right side */}
                <div className="flex-1 p-4">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-lg font-bold text-primary">{product.price}€</div>
                      <div className="text-xs text-gray-500">par {product.unit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{product.origin}</div>
                      {product.producer && (
                        <div className="text-xs text-gray-400 mt-1 truncate max-w-[120px]">{product.producer}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {cart[product.id] > 0 ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-gray-900 min-w-[1.5rem] text-center text-sm">
                          {cart[product.id]}
                        </span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-6 h-6 bg-primary hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-primary hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        <Plus className="w-3 h-3 mr-1 inline" />
                        Ajouter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
            <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Mon panier</h3>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {Object.entries(cart).filter(([_, quantity]) => quantity > 0).map(([productId, quantity]) => {
                const product = products.find(p => p.id === parseInt(productId));
                if (!product) return null;
                return (
                  <div key={productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.price}€ / {product.unit}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-6 h-6 bg-primary hover:bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-xl text-primary">{getTotalPrice().toFixed(2)}€</span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Commander
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Paiement</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total à payer</span>
                  <span className="text-2xl font-bold text-primary">{getTotalPrice().toFixed(2)}€</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePayment}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
              >
                <span>📱</span>
                <span>Apple Pay</span>
              </button>
              
              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <span>💳</span>
                <span>Google Pay</span>
              </button>
              
              <button
                onClick={handlePayment}
                className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
              >
                <span>💳</span>
                <span>Carte bancaire</span>
              </button>
            </div>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 py-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Commande validée !</h3>
            <p className="text-gray-600 mb-2 text-lg font-semibold">
              {orderNumber}
            </p>
            <p className="text-gray-600 mb-6">
              Prête dans <span className="font-bold text-green-600 text-xl">{preparationTime} minutes</span>
            </p>
            
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">GENIAL Market</span>
              </div>
              <p className="text-gray-800 text-sm">140 rue Saint-Dominique, 75007 Paris</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.open('https://maps.google.com/?q=140+rue+Saint-Dominique+75007+Paris', '_blank')}
                className="w-full bg-primary hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Navigation className="w-5 h-5" />
                <span>Voir l'itinéraire</span>
              </button>
              
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;