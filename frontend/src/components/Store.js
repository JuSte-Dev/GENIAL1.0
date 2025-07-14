import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Plus, Minus, Star, CreditCard, CheckCircle, MapPin, Clock, Navigation } from 'lucide-react';
import { apiService } from '../utils/api';
import { useOrders } from '../contexts/OrderContext';

const Store = ({ globalCart, setGlobalCart, showCart, setShowCart }) => {
  const { addOrder } = useOrders();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [preparationTime, setPreparationTime] = useState(0);
  const [loading, setLoading] = useState(true);

  // Utiliser le panier global au lieu du panier local
  const cart = globalCart || {};
  const setCart = setGlobalCart;

  console.log('Cart state:', cart); // Debug log pour voir l'état du panier

  const categories = [
    { id: 'all', name: 'Tous', image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' },
    { id: 'fruits-legumes', name: 'Fruits & Légumes', image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' },
    { id: 'charcuterie', name: 'Charcuterie', image: 'https://images.unsplash.com/photo-1513615147033-3ed2afaaae8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxoYW18ZW58MHx8fHdoaXRlfDE3NTI0MTYzNDR8MA&ixlib=rb-4.1.0&q=85&w=50&h=50' },
    { id: 'viandes', name: 'Viandes', image: 'https://images.unsplash.com/photo-1590457075683-06eb6c958aa5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2h8ZW58MHx8fHdoaXRlfDE3NTI0MjE3NzJ8MA&ixlib=rb-4.1.0&q=85&w=50&h=50' },
    { id: 'poissons', name: 'Poissons', image: 'https://images.pexels.com/photos/4725596/pexels-photo-4725596.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' },
    { id: 'fromages', name: 'Fromages', image: 'https://fromagerie-lechatbo.fr/878-home_default/comte-36-mois-aop.jpg' },
    { id: 'vins-rouges', name: 'Vins Rouges', image: 'https://www.vinsolite.fr/1434-home_default/yin-yang-sauzet.jpg' },
    { id: 'vins-blancs', name: 'Vins Blancs', image: 'https://www.vinsolite.fr/2786-home_default/la-petite-abeille.jpg' },
    { id: 'champagnes', name: 'Champagnes', image: 'https://www.vinsolite.fr/3154-home_default/ultime-recolte-moelleux-jeff-carrel.jpg' },
    { id: 'cafe', name: 'Café Partisan', image: 'https://www.parispartisancafe.com/cdn/shop/files/Screenshot2025-05-29at09.20.42_300x300.png?v=1748503259' },
    { id: 'cocktails', name: 'ELY Cocktails', image: 'https://www.ely.bar/cdn/shop/products/NEGRONI50_300x.jpg?v=1686212324' },
    { id: 'epicerie', name: 'Épicerie Fine', image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' }
  ];

  // Products with improved images - keeping all original products
  const defaultProducts = [
    // Fruits & Légumes - with improved images
    {
      id: 1,
      name: 'Tomates cerises bio',
      category: 'fruits-legumes',
      price: 8.50,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1609126986933-e3c84f19d49c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1598217475213-268e8ec0126e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxvcmdhbmljJTIwcHJvZHVjZXxlbnwwfHx8fDE3NTI1MDUwMzJ8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1553787434-45e1d245bfbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcHJvZHVjZXxlbnwwfHx8fDE3NTI1MDUwMzJ8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1485637701894-09ad422f6de6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxmYXJtZXJzJTIwbWFya2V0fGVufDB8fHx8MTc1MjUwNTA0MHww&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1609126986933-e3c84f19d49c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1598217475213-268e8ec0126e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxvcmdhbmljJTIwcHJvZHVjZXxlbnwwfHx8fDE3NTI1MDUwMzJ8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1553787434-45e1d245bfbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcHJvZHVjZXxlbnwwfHx8fDE3NTI1MDUwMzJ8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1485637701894-09ad422f6de6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxmYXJtZXJzJTIwbWFya2V0fGVufDB8fHx8MTc1MjUwNTA0MHww&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1609126986933-e3c84f19d49c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MHx8fHwxNzUyNTA1MDI0fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1678572823447-45fc146df43c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjaGFyY3V0ZXJpZXxlbnwwfHx8fDE3NTI1MDQ5ODF8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjaGFyY3V0ZXJpZXxlbnwwfHx8fDE3NTI1MDQ5ODF8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1678572823447-45fc146df43c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjaGFyY3V0ZXJpZXxlbnwwfHx8fDE3NTI1MDQ5ODF8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjaGFyY3V0ZXJpZXxlbnwwfHx8fDE3NTI1MDQ5ODF8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1678572823447-45fc146df43c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjaGFyY3V0ZXJpZXxlbnwwfHx8fDE3NTI1MDQ5ODF8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjaGFyY3V0ZXJpZXxlbnwwfHx8fDE3NTI1MDQ5ODF8MA&ixlib=rb-4.1.0&q=85',
      description: 'Coppa di Parma, échine de porc séchée',
      origin: 'Italie - Parme',
      producer: 'Salumificio di Parma - Tradition Italienne',
      stock: 10
    },

    // Viandes - with improved images
    {
      id: 19,
      name: 'Côte de bœuf Wagyu',
      category: 'viandes',
      price: 120.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtZWF0fGVufDB8fHx8MTc1MjUwNDk4OXww&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1448907503123-67254d59ca4f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxtZWF0fGVufDB8fHx8MTc1MjUwNDk4OXww&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxtZWF0fGVufDB8fHx8MTc1MjUwNDk4OXww&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtZWF0fGVufDB8fHx8MTc1MjUwNDk4OXww&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1448907503123-67254d59ca4f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxtZWF0fGVufDB8fHx8MTc1MjUwNDk4OXww&ixlib=rb-4.1.0&q=85',
      description: 'Veau de lait élevé sous la mère, tendreté garantie',
      origin: 'France - Limousin',
      producer: 'Élevage Limousin - Veau Traditionnel',
      stock: 10
    },

    // Poissons - with improved images
    {
      id: 24,
      name: 'Saumon fumé Écosse',
      category: 'poissons',
      price: 85.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2h8ZW58MHx8fHwxNzUyNTA1MTIyfDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1563557908-b7787229f123?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMGZpc2h8ZW58MHx8fHwxNzUyNTA1MTIyfDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxzZWFmb29kfGVufDB8fHx8MTc1MjUwNTEzMXww&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxzYWxtb258ZW58MHx8fHwxNzUyNTA1MTM4fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2h8ZW58MHx8fHwxNzUyNTA1MTIyfDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxzZWFmb29kfGVufDB8fHx8MTc1MjUwNTEzMXww&ixlib=rb-4.1.0&q=85',
      description: 'Saint-Jacques de plongée, pêche durable',
      origin: 'France - Normandie',
      producer: 'Pêcherie Normande - Plongée Artisanale',
      stock: 20
    },

    // Fromages - with improved images
    {
      id: 30,
      name: 'Comté AOP 24 mois',
      category: 'fromages',
      price: 42.00,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1752401984776-edc407a13e1e',
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
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d',
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
      image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d',
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
      image: 'https://images.pexels.com/photos/302457/pexels-photo-302457.jpeg',
      description: 'Camembert de Normandie AOP au lait cru',
      origin: 'France - Normandie',
      producer: 'Fromagerie Normande',
      stock: 18
    },

    // Vins Rouges - with improved images
    {
      id: 34,
      name: 'Châteauneuf-du-Pape 2018',
      category: 'vins-rouges',
      price: 65.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1562601579-599dec564e06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1516154767575-2146adebdf32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1598112973620-70dd9833f67e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1562601579-599dec564e06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1516154767575-2146adebdf32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1598112973620-70dd9833f67e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.unsplash.com/photo-1562601579-599dec564e06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlc3xlbnwwfHx8fDE3NTI1MDUwODB8MA&ixlib=rb-4.1.0&q=85',
      description: 'Brunello di Montalcino 2016, sangiovese toscan',
      origin: 'Italie - Toscane',
      producer: 'Tenuta Toscana',
      stock: 14
    },

    // Vins Blancs - with improved images
    {
      id: 41,
      name: 'Chablis Premier Cru 2020',
      category: 'vins-blancs',
      price: 35.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1526894198609-10b3cdf45c52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmV8ZW58MHx8fHwxNzUyNTA1MDg3fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.pexels.com/photos/3171770/pexels-photo-3171770.jpeg',
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
      image: 'https://images.pexels.com/photos/834896/pexels-photo-834896.jpeg',
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
      image: 'https://images.unsplash.com/photo-1526894198609-10b3cdf45c52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmV8ZW58MHx8fHwxNzUyNTA1MDg3fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.pexels.com/photos/3171770/pexels-photo-3171770.jpeg',
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
      image: 'https://images.pexels.com/photos/834896/pexels-photo-834896.jpeg',
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
      image: 'https://images.unsplash.com/photo-1526894198609-10b3cdf45c52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmV8ZW58MHx8fHwxNzUyNTA1MDg3fDA&ixlib=rb-4.1.0&q=85',
      description: 'Riesling Alsace Grand Cru 2020, minéralité pure',
      origin: 'France - Alsace',
      producer: 'Domaine Alsacien',
      stock: 28
    },

    // Champagnes - with improved images
    {
      id: 48,
      name: 'Champagne Dom Pérignon 2015',
      category: 'champagnes',
      price: 220.00,
      unit: 'bouteille',
      image: 'https://images.unsplash.com/photo-1526894198609-10b3cdf45c52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmV8ZW58MHx8fHwxNzUyNTA1MDg3fDA&ixlib=rb-4.1.0&q=85',
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
      image: 'https://images.pexels.com/photos/3171770/pexels-photo-3171770.jpeg',
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
      image: 'https://images.pexels.com/photos/834896/pexels-photo-834896.jpeg',
      description: 'Bollinger Special Cuvée, caractère affirmé',
      origin: 'France - Champagne',
      producer: 'Bollinger',
      stock: 20
    },

    // Café Partisan - Vrais cafés du site
    {
      id: 56,
      name: 'KENYA AB KAMWENJA 250g',
      category: 'cafe',
      price: 19.00,
      unit: '250g',
      image: 'https://www.parispartisancafe.com/cdn/shop/files/Screenshot2025-05-29at09.20.42_300x300.png?v=1748503259',
      description: 'Kenya AB Kamwenja, café d\'exception aux notes complexes',
      origin: 'Kenya',
      producer: 'Partisan Café Artisanal',
      stock: 20
    },
    {
      id: 57,
      name: 'COLOMBIE LAS BRISAS 250g',
      category: 'cafe',
      price: 19.00,
      unit: '250g',
      image: 'https://www.parispartisancafe.com/cdn/shop/files/Screenshot2025-05-29at09.27.03_300x300.png?v=1748503642',
      description: 'Colombie Las Brisas, profil équilibré et doux',
      origin: 'Colombie',
      producer: 'Partisan Café Artisanal',
      stock: 15
    },
    {
      id: 58,
      name: 'COLOMBIE LOS DIECINUEVE DECAF 250g',
      category: 'cafe',
      price: 18.00,
      unit: '250g',
      image: 'https://www.parispartisancafe.com/cdn/shop/files/Screenshot2025-05-29at10.33.48_300x300.png?v=1748507656',
      description: 'Colombie Los Diecinueve décaféiné, sans compromise sur le goût',
      origin: 'Colombie',
      producer: 'Partisan Café Artisanal',
      stock: 25
    },
    {
      id: 59,
      name: 'ITALIAN BLEND 250g',
      category: 'cafe',
      price: 15.00,
      unit: '250g',
      image: 'https://www.parispartisancafe.com/cdn/shop/files/Screenshot2025-04-20at17.26.05_300x300.png?v=1745162790',
      description: 'Italian Blend, assemblage traditionnel italien',
      origin: 'Assemblage',
      producer: 'Partisan Café Artisanal',
      stock: 30
    },

    // ELY Cocktails - Vraies bouteilles du site
    {
      id: 51,
      name: 'MARGARITA ELY',
      category: 'cocktails',
      price: 12.00,
      unit: 'bouteille',
      image: 'https://www.ely.bar/cdn/shop/products/MARGA50_300x.jpg?v=1686211780',
      description: 'Cocktail MARGARITA prêt à boire, élaboré dans notre laboratoire parisien',
      origin: 'France - Paris',
      producer: 'ELY Cocktails',
      stock: 15
    },
    {
      id: 52,
      name: 'NEGRONI ELY',
      category: 'cocktails',
      price: 14.00,
      unit: 'bouteille',
      image: 'https://www.ely.bar/cdn/shop/products/NEGRONI50_300x.jpg?v=1686212324',
      description: 'Cocktail NEGRONI prêt à boire, sans conservateurs ni sucre ajouté',
      origin: 'France - Paris',
      producer: 'ELY Cocktails',
      stock: 20
    },
    {
      id: 53,
      name: 'MOSCOW MULE ELY',
      category: 'cocktails',
      price: 20.90,
      unit: 'bouteille',
      image: 'https://www.ely.bar/cdn/shop/products/MOSCOWMULE50_300x.jpg?v=1686212073',
      description: 'Cocktail MOSCOW MULE prêt à boire, équilibre parfait',
      origin: 'France - Paris',
      producer: 'ELY Cocktails',
      stock: 18
    },
    {
      id: 54,
      name: 'PINK GIN ELY',
      category: 'cocktails',
      price: 10.70,
      unit: 'bouteille',
      image: 'https://www.ely.bar/cdn/shop/products/PINKGIN50_300x.jpg?v=1686212868',
      description: 'Cocktail PINK GIN prêt à boire, rafraîchissant',
      origin: 'France - Paris',
      producer: 'ELY Cocktails',
      stock: 25
    },
    {
      id: 55,
      name: 'ESPRESSO MARTINI ELY',
      category: 'cocktails',
      price: 15.00,
      unit: 'bouteille',
      image: 'https://www.ely.bar/cdn/shop/products/EXPRESSOMARTINI50_300x.jpg?v=1686210925',
      description: 'Cocktail ESPRESSO MARTINI prêt à boire, élégance caféinée',
      origin: 'France - Paris',
      producer: 'ELY Cocktails',
      stock: 12
    },

    // Épicerie Fine
    {
      id: 60,
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
      id: 61,
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
      id: 62,
      name: 'Miel de lavande de Provence',
      category: 'epicerie',
      price: 18.00,
      unit: 'pot 500g',
      image: 'https://images.pexels.com/photos/1642669/pexels-photo-1642669.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Miel de lavande de Provence, récolte artisanale',
      origin: 'France - Provence',
      producer: 'Rucher de Provence',
      stock: 30
    },
    {
      id: 63,
      name: 'Huile d\'olive extra vierge',
      category: 'epicerie',
      price: 25.00,
      unit: 'bouteille 500ml',
      image: 'https://images.pexels.com/photos/1001773/pexels-photo-1001773.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Huile d\'olive extra vierge première pression',
      origin: 'France - Provence',
      producer: 'Moulin de Provence',
      stock: 25
    },
    {
      id: 64,
      name: 'Confiture de fraises Mara des bois',
      category: 'epicerie',
      price: 8.50,
      unit: 'pot 250g',
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Confiture artisanale de fraises Mara des bois',
      origin: 'France - Périgord',
      producer: 'Confitures du Périgord',
      stock: 40
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
      
      // Ajouter la commande au contexte
      addOrder({
        orderNumber: order.order_number,
        preparationTime: order.preparation_time,
        totalAmount: getTotalPrice(),
        items: orderData.items
      });
      
      setCart({});
      setShowPayment(false);
      setShowConfirmation(true);
      
      // Fermer la confirmation après 3 secondes
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      // Fallback for demo
      const orderNum = 'CMD' + Math.random().toString(36).substr(2, 6).toUpperCase();
      const prepTime = 15 + getTotalItems() * 2;
      
      setOrderNumber(orderNum);
      setPreparationTime(prepTime);
      
      // Ajouter la commande au contexte
      addOrder({
        orderNumber: orderNum,
        preparationTime: prepTime,
        totalAmount: getTotalPrice(),
        items: Object.entries(cart).filter(([_, quantity]) => quantity > 0).map(([productId, quantity]) => {
          const product = products.find(p => p.id === parseInt(productId));
          return { product_id: productId, quantity, price: product?.price || 0, name: product?.name || 'Produit' };
        })
      });
      
      setCart({});
      setShowPayment(false);
      setShowConfirmation(true);
      
      // Fermer la confirmation après 3 secondes
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
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
    <div className="min-h-screen bg-gray-100 store-cursor">
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

        {/* Categories - Horizontal scrollable line like Deliveroo */}
        <div className="mb-8">
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max px-4 md:px-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 flex flex-col items-center space-y-2 p-3 rounded-xl transition-all min-w-[80px] ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full overflow-hidden ${
                    selectedCategory === category.id ? 'ring-2 ring-white' : ''
                  }`}>
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control pl-10 w-full"
            />
          </div>
        </div>

        {/* Products Grid - 2 products per row on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="flex h-52 min-h-[208px]">
                {/* Product Image - Left side */}
                <div className="relative w-40 h-52 flex-shrink-0 overflow-hidden">
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
                
                {/* Product Info - Right side - TALLER LAYOUT */}
                <div className="flex-1 p-4 flex flex-col min-w-0">
                  <div className="flex-1 mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-lg font-bold text-primary">{product.price}€</div>
                        <div className="text-xs text-gray-500">par {product.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 truncate max-w-[100px]">{product.origin}</div>
                        {product.producer && (
                          <div className="text-xs text-gray-400 truncate max-w-[100px]">{product.producer}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Add to cart section - BOTTOM ALIGNED */}
                  <div className="flex items-center justify-center w-full">
                    {(cart && cart[product.id] && cart[product.id] > 0) ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-gray-900 min-w-[2.5rem] text-center text-lg">
                          {cart[product.id]}
                        </span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-10 h-10 bg-neon-blue hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-neon-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm flex items-center w-full justify-center max-w-[200px]"
                      >
                        <Plus className="w-5 h-5 mr-2" />
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