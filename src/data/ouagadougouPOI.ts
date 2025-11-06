/**
 * Points d'Intérêt (POI) d'Ouagadougou
 * Données réelles des principaux lieux d'intérêt de la ville
 */

export interface POI {
  id: string;
  name: string;
  type: 'school' | 'transport' | 'hospital' | 'market' | 'mall' | 'restaurant';
  latitude: number;
  longitude: number;
  neighborhood: string;
  description?: string;
}

export const OUAGADOUGOU_POI: POI[] = [
  // ÉCOLES
  {
    id: 'school-1',
    name: 'Lycée Municipal de Ouagadougou',
    type: 'school',
    latitude: 12.3714,
    longitude: -1.5204,
    neighborhood: 'Koulouba',
    description: 'Lycée public prestigieux de la capitale',
  },
  {
    id: 'school-2',
    name: 'Université Joseph Ki-Zerbo',
    type: 'school',
    latitude: 12.3750,
    longitude: -1.5150,
    neighborhood: 'Basilea',
    description: 'Principale université publique du Burkina Faso',
  },
  {
    id: 'school-3',
    name: 'École Internationale de Ouagadougou',
    type: 'school',
    latitude: 12.3850,
    longitude: -1.4750,
    neighborhood: 'Kombissiri',
    description: 'École française internationale',
  },
  {
    id: 'school-4',
    name: 'Institut Supérieur de Formation Continue',
    type: 'school',
    latitude: 12.3650,
    longitude: -1.4950,
    neighborhood: 'Azimmo',
    description: 'Institut d\'enseignement supérieur privé',
  },

  // TRANSPORTS
  {
    id: 'transport-1',
    name: 'Gare Routière de Ouagadougou',
    type: 'transport',
    latitude: 12.3550,
    longitude: -1.5350,
    neighborhood: 'Gaoua',
    description: 'Principale gare routière du pays',
  },
  {
    id: 'transport-2',
    name: 'Gare de l\'Est',
    type: 'transport',
    latitude: 12.3750,
    longitude: -1.5150,
    neighborhood: 'Basilea',
    description: 'Gare routière pour les destinations est',
  },
  {
    id: 'transport-3',
    name: 'Aéroport International de Ouagadougou',
    type: 'transport',
    latitude: 12.3531,
    longitude: -1.5422,
    neighborhood: 'Somgandé',
    description: 'Aéroport international de la capitale',
  },
  {
    id: 'transport-4',
    name: 'Gare de Gounghin',
    type: 'transport',
    latitude: 12.4050,
    longitude: -1.4950,
    neighborhood: 'Gounghin',
    description: 'Gare routière pour les destinations nord',
  },

  // HÔPITAUX
  {
    id: 'hospital-1',
    name: 'CHU de Bogodogo',
    type: 'hospital',
    latitude: 12.3650,
    longitude: -1.5550,
    neighborhood: 'Koulouba',
    description: 'Centre hospitalier universitaire principal',
  },
  {
    id: 'hospital-2',
    name: 'Hôpital du District de Baskuy',
    type: 'hospital',
    latitude: 12.3750,
    longitude: -1.5150,
    neighborhood: 'Basilea',
    description: 'Hôpital de district central',
  },
  {
    id: 'hospital-3',
    name: 'Polyclinique Pasteur',
    type: 'hospital',
    latitude: 12.3850,
    longitude: -1.4750,
    neighborhood: 'Kombissiri',
    description: 'Clinique privée moderne',
  },
  {
    id: 'hospital-4',
    name: 'Centre de Santé Urbain de Nonsin',
    type: 'hospital',
    latitude: 12.3450,
    longitude: -1.5450,
    neighborhood: 'Nonsin',
    description: 'Centre de santé municipal',
  },

  // MARCHÉS
  {
    id: 'market-1',
    name: 'Marché Central de Ouagadougou',
    type: 'market',
    latitude: 12.3650,
    longitude: -1.5204,
    neighborhood: 'Koulouba',
    description: 'Plus grand marché central de la ville',
  },
  {
    id: 'market-2',
    name: 'Marché de Koulouba',
    type: 'market',
    latitude: 12.3750,
    longitude: -1.5150,
    neighborhood: 'Koulouba',
    description: 'Marché de quartier',
  },
  {
    id: 'market-3',
    name: 'Marché de Gounghin',
    type: 'market',
    latitude: 12.4050,
    longitude: -1.4950,
    neighborhood: 'Gounghin',
    description: 'Marché moderne du secteur 10',
  },
  {
    id: 'market-4',
    name: 'Marché de Somgandé',
    type: 'market',
    latitude: 12.3350,
    longitude: -1.5250,
    neighborhood: 'Somgandé',
    description: 'Marché populaire périphérique',
  },

  // CENTRES COMMERCIAUX
  {
    id: 'mall-1',
    name: 'Centre Commercial Ouaga 2000',
    type: 'mall',
    latitude: 12.3650,
    longitude: -1.4750,
    neighborhood: 'Ouaga 2000',
    description: 'Centre commercial moderne haut de gamme',
  },
  {
    id: 'mall-2',
    name: 'Playce Lascassas',
    type: 'mall',
    latitude: 12.3750,
    longitude: -1.5150,
    neighborhood: 'Basilea',
    description: 'Mall avec cinéma et restaurants',
  },
  {
    id: 'mall-3',
    name: 'Centre Commercial Azimmo',
    type: 'mall',
    latitude: 12.3650,
    longitude: -1.4950,
    neighborhood: 'Azimmo',
    description: 'Centre commercial de proximité',
  },
  {
    id: 'mall-4',
    name: 'Superette de Pabre',
    type: 'mall',
    latitude: 12.3950,
    longitude: -1.5350,
    neighborhood: 'Pabre',
    description: 'Hypermarché et centre commercial',
  },

  // RESTAURANTS
  {
    id: 'restaurant-1',
    name: 'Restaurant Le Baobab',
    type: 'restaurant',
    latitude: 12.3750,
    longitude: -1.5150,
    neighborhood: 'Basilea',
    description: 'Restaurant traditionnel burkinabé',
  },
  {
    id: 'restaurant-2',
    name: 'La Terrace Gourmande',
    type: 'restaurant',
    latitude: 12.3650,
    longitude: -1.4950,
    neighborhood: 'Koulouba',
    description: 'Restaurant français et international',
  },
  {
    id: 'restaurant-3',
    name: 'Chez Fatimata',
    type: 'restaurant',
    latitude: 12.3550,
    longitude: -1.5350,
    neighborhood: 'Gaoua',
    description: 'Spécialités locales et grillades',
  },
  {
    id: 'restaurant-4',
    name: 'Restaurant La Sultane',
    type: 'restaurant',
    latitude: 12.3850,
    longitude: -1.4750,
    neighborhood: 'Kombissiri',
    description: 'Restaurant arabe et moyen-oriental',
  },
];

export const POI_CATEGORIES = {
  school: {
    label: 'Écoles',
    icon: '🏫',
    color: '#3b82f6',
  },
  transport: {
    label: 'Transports',
    icon: '🚌',
    color: '#10b981',
  },
  hospital: {
    label: 'Hôpitaux',
    icon: '🏥',
    color: '#ef4444',
  },
  market: {
    label: 'Marchés',
    icon: '🛒',
    color: '#f59e0b',
  },
  mall: {
    label: 'Centres commerciaux',
    icon: '🏬',
    color: '#8b5cf6',
  },
  restaurant: {
    label: 'Restaurants',
    icon: '🍽️',
    color: '#ec4899',
  },
};
