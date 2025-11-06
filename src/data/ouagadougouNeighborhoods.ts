/**
 * Données des quartiers d'Ouagadougou
 * Informations détaillées sur chaque quartier
 */

export interface Neighborhood {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: {
    latitude: number;
    longitude: number;
  };
  priceRange: {
    min: number;
    max: number;
    average: number;
  };
  scores: {
    transport: number; // 0-10
    commerce: number; // 0-10
    education: number; // 0-10
    security: number; // 0-10
    healthcare: number; // 0-10
  };
  description: string;
  characteristics: string[];
  population?: number;
}

export const OUAGADOUGOU_NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'basilea',
    name: 'Basilea',
    bounds: {
      north: 12.3900,
      south: 12.3600,
      east: -1.5000,
      west: -1.5300,
    },
    center: {
      latitude: 12.3750,
      longitude: -1.5150,
    },
    priceRange: {
      min: 120000,
      max: 350000,
      average: 200000,
    },
    scores: {
      transport: 8,
      commerce: 8,
      education: 8,
      security: 8,
      healthcare: 7,
    },
    description: 'Quartier résidentiel moderne et sécurisé du secteur 4, prisé par les cadres.',
    characteristics: [
      'Résidences modernes',
      'Quartier sécurisé',
      'Écoles privées',
      'Commerces modernes',
      'Cliniques privées',
    ],
    population: 80000,
  },
  {
    id: 'azimmo',
    name: 'Azimmo',
    bounds: {
      north: 12.3800,
      south: 12.3500,
      east: -1.4800,
      west: -1.5100,
    },
    center: {
      latitude: 12.3650,
      longitude: -1.4950,
    },
    priceRange: {
      min: 100000,
      max: 280000,
      average: 180000,
    },
    scores: {
      transport: 7,
      commerce: 7,
      education: 7,
      security: 7,
      healthcare: 6,
    },
    description: 'Quartier mixte résidentiel et commercial en plein développement.',
    characteristics: [
      'Bon rapport qualité-prix',
      'Transport facile',
      'Marchés locaux',
      'Écoles publiques',
      'Centre de santé',
    ],
    population: 65000,
  },
  {
    id: 'gaoua',
    name: 'Gaoua',
    bounds: {
      north: 12.3700,
      south: 12.3400,
      east: -1.5200,
      west: -1.5500,
    },
    center: {
      latitude: 12.3550,
      longitude: -1.5350,
    },
    priceRange: {
      min: 80000,
      max: 200000,
      average: 140000,
    },
    scores: {
      transport: 6,
      commerce: 6,
      education: 6,
      security: 6,
      healthcare: 5,
    },
    description: 'Quartier populaire avec de nombreuses familles, prix abordables.',
    characteristics: [
      'Prix très abordables',
      'Quartier familial',
      'Marchés traditionnels',
      'Écoles primaires',
      'Population jeune',
    ],
    population: 120000,
  },
  {
    id: 'kombissiri',
    name: 'Kombissiri',
    bounds: {
      north: 12.4000,
      south: 12.3700,
      east: -1.4600,
      west: -1.4900,
    },
    center: {
      latitude: 12.3850,
      longitude: -1.4750,
    },
    priceRange: {
      min: 150000,
      max: 400000,
      average: 250000,
    },
    scores: {
      transport: 8,
      commerce: 9,
      education: 8,
      security: 8,
      healthcare: 7,
    },
    description: 'Secteur administratif et résidentiel du secteur 1, calme et verdoyant.',
    characteristics: [
      'Quartier administratif',
      'Espaces verts',
      'Sécurité renforcée',
      'Banques nearby',
      'Restaurant et cafés',
    ],
    population: 45000,
  },
  {
    id: 'koulouba',
    name: 'Koulouba',
    bounds: {
      north: 12.3800,
      south: 12.3500,
      east: -1.5400,
      west: -1.5700,
    },
    center: {
      latitude: 12.3650,
      longitude: -1.5550,
    },
    priceRange: {
      min: 90000,
      max: 250000,
      average: 160000,
    },
    scores: {
      transport: 7,
      commerce: 7,
      education: 7,
      security: 7,
      healthcare: 6,
    },
    description: 'Quartier central avec de nombreuses administrations et commerces.',
    characteristics: [
      'Centre-ville',
      'Proche administrations',
      'Transport diversifié',
      'Commerces variés',
      'Diversité sociale',
    ],
    population: 95000,
  },
  {
    id: 'nonsin',
    name: 'Nonsin',
    bounds: {
      north: 12.3600,
      south: 12.3300,
      east: -1.5300,
      west: -1.5600,
    },
    center: {
      latitude: 12.3450,
      longitude: -1.5450,
    },
    priceRange: {
      min: 70000,
      max: 180000,
      average: 120000,
    },
    scores: {
      transport: 6,
      commerce: 6,
      education: 5,
      security: 5,
      healthcare: 5,
    },
    description: 'Quartier populaire du secteur 12, très animé et abordable.',
    characteristics: [
      'Quartier populaire',
      'Prix très accessibles',
      'Vie sociale active',
      'Marchés quotidiens',
      'Population diverse',
    ],
    population: 180000,
  },
  {
    id: 'gounghin',
    name: 'Gounghin',
    bounds: {
      north: 12.4200,
      south: 12.3900,
      east: -1.4800,
      west: -1.5100,
    },
    center: {
      latitude: 12.4050,
      longitude: -1.4950,
    },
    priceRange: {
      min: 110000,
      max: 300000,
      average: 190000,
    },
    scores: {
      transport: 7,
      commerce: 7,
      education: 8,
      security: 7,
      healthcare: 7,
    },
    description: 'Quartier résidentiel du secteur 10 avec de nombreuses écoles.',
    characteristics: [
      'Quartier éducatif',
      'Résidences familiales',
      'Bon système éducatif',
      'Parcs et espaces verts',
      'Transport scolaire',
    ],
    population: 75000,
  },
  {
    id: 'pabre',
    name: 'Pabre',
    bounds: {
      north: 12.4100,
      south: 12.3800,
      east: -1.5200,
      west: -1.5500,
    },
    center: {
      latitude: 12.3950,
      longitude: -1.5350,
    },
    priceRange: {
      min: 80000,
      max: 220000,
      average: 150000,
    },
    scores: {
      transport: 6,
      commerce: 6,
      education: 6,
      security: 6,
      healthcare: 6,
    },
    description: 'Quartier en expansion du secteur 15, moderne et accessible.',
    characteristics: [
      'Quartier en développement',
      'Projets immobiliers',
      'Infrastructures récentes',
      'Prix compétitifs',
      'Potentiel de croissance',
    ],
    population: 60000,
  },
  {
    id: 'Ouaga-2000',
    name: 'Ouaga 2000',
    bounds: {
      north: 12.3800,
      south: 12.3500,
      east: -1.4600,
      west: -1.4900,
    },
    center: {
      latitude: 12.3650,
      longitude: -1.4750,
    },
    priceRange: {
      min: 200000,
      max: 600000,
      average: 350000,
    },
    scores: {
      transport: 9,
      commerce: 9,
      education: 9,
      security: 9,
      healthcare: 8,
    },
    description: 'Quartier ultra-moderne du secteur 5, réservé aux revenus élevés.',
    characteristics: [
      'Quartier haut de gamme',
      'Infrastructures modernes',
      'Sécurité 24/7',
      'Centres commerciaux',
      'Résidences de luxe',
    ],
    population: 25000,
  },
  {
    id: 'somgande',
    name: 'Somgandé',
    bounds: {
      north: 12.3500,
      south: 12.3200,
      east: -1.5100,
      west: -1.5400,
    },
    center: {
      latitude: 12.3350,
      longitude: -1.5250,
    },
    priceRange: {
      min: 60000,
      max: 150000,
      average: 100000,
    },
    scores: {
      transport: 5,
      commerce: 5,
      education: 4,
      security: 4,
      healthcare: 4,
    },
    description: 'Quartier périphérique populaire, très abordable pour les familles.',
    characteristics: [
      'Prix très abordables',
      'Quartier rural-urbain',
      'Proximité nature',
      'Populationautochtone',
      'Potentiel d\'amélioration',
    ],
    population: 95000,
  },
];

// Fonction utilitaire pour obtenir la couleur selon le prix moyen
export const getPriceColor = (avgPrice: number): string => {
  if (avgPrice < 100000) return '#10b981'; // Vert - Abordable
  if (avgPrice < 200000) return '#f59e0b'; // Orange - Moyen
  if (avgPrice < 300000) return '#ef4444'; // Rouge - Cher
  return '#8b5cf6'; // Violet - Très cher
};

// Fonction pour obtenir le label de prix
export const getPriceLabel = (avgPrice: number): string => {
  if (avgPrice < 100000) return '< 100k FCFA';
  if (avgPrice < 200000) return '100k - 200k FCFA';
  if (avgPrice < 300000) return '200k - 300k FCFA';
  return '> 300k FCFA';
};
