/**
 * Script d'enrichissement des données de démonstration M'ZAKA
 * Génère 500+ propriétés réalistes pour tous les quartiers d'Ouagadougou
 */

interface PropertyTemplate {
  title: string;
  description: string;
  property_type: string;
  neighborhood: string;
  price_range: [number, number];
  surface_range: [number, number];
  features: {
    bedrooms: [number, number];
    bathrooms: [number, number];
    furnished: number; // 0-1 probability
    ac: number; // 0-1 probability
    parking: number; // 0-1 probability
    garden: number; // 0-1 probability
  };
  images: string[];
}

// Données enrichies des quartiers d'Ouagadougou
const OUAGADOUGOU_QUARTERS = [
  {
    name: 'Basilea',
    characteristics: 'quartier-résidentiel-moderne',
    price_multiplier: 1.3,
    population_density: 'medium',
    popularity: 'high'
  },
  {
    name: 'Azimmo',
    characteristics: 'quartier-mixte',
    price_multiplier: 1.0,
    population_density: 'high',
    popularity: 'medium'
  },
  {
    name: 'Gaoua',
    characteristics: 'quartier-populaire',
    price_multiplier: 0.7,
    population_density: 'high',
    popularity: 'medium'
  },
  {
    name: 'Kombissiri',
    characteristics: 'quartier-administratif',
    price_multiplier: 1.5,
    population_density: 'low',
    popularity: 'high'
  },
  {
    name: 'Koulouba',
    characteristics: 'centre-ville',
    price_multiplier: 1.1,
    population_density: 'very-high',
    popularity: 'high'
  },
  {
    name: 'Nonsin',
    characteristics: 'quartier-populaire',
    price_multiplier: 0.6,
    population_density: 'very-high',
    popularity: 'low'
  },
  {
    name: 'Gounghin',
    characteristics: 'quartier-éducatif',
    price_multiplier: 1.0,
    population_density: 'medium',
    popularity: 'medium'
  },
  {
    name: 'Pabre',
    characteristics: 'quartier-en-développement',
    price_multiplier: 0.8,
    population_density: 'low',
    popularity: 'low'
  },
  {
    name: 'Ouaga-2000',
    characteristics: 'quartier-haut-de-gamme',
    price_multiplier: 2.0,
    population_density: 'low',
    popularity: 'very-high'
  },
  {
    name: 'Somgandé',
    characteristics: 'quartier-périphérique',
    price_multiplier: 0.5,
    population_density: 'medium',
    popularity: 'low'
  }
];

// Templates de propriétés par type
const PROPERTY_TEMPLATES: PropertyTemplate[] = [
  {
    title: 'Appartement moderne',
    description: 'Appartement moderne avec finitions de qualité, dans un quartier sécurisé avec toutes les commodités.',
    property_type: 'appartement',
    neighborhood: 'basilea',
    price_range: [80000, 200000],
    surface_range: [35, 120],
    features: {
      bedrooms: [1, 4],
      bathrooms: [1, 2],
      furnished: 0.3,
      ac: 0.6,
      parking: 0.4,
      garden: 0.1
    },
    images: ['apartment1.jpg', 'apartment2.jpg', 'apartment3.jpg']
  },
  {
    title: 'Maison familiale',
    description: 'Belle maison familiale avec cour intérieure, parfaite pour les grandes familles.',
    property_type: 'maison',
    neighborhood: 'kombissiri',
    price_range: [150000, 400000],
    surface_range: [80, 250],
    features: {
      bedrooms: [2, 6],
      bathrooms: [1, 3],
      furnished: 0.1,
      ac: 0.4,
      parking: 0.7,
      garden: 0.8
    },
    images: ['house1.jpg', 'house2.jpg', 'house3.jpg']
  },
  {
    title: 'Studio meublé',
    description: 'Studio entièrement meublé et équipé, ideal pour les jeunes professionnels.',
    property_type: 'studio',
    neighborhood: 'koulouba',
    price_range: [40000, 120000],
    surface_range: [20, 50],
    features: {
      bedrooms: [0, 1],
      bathrooms: [1, 1],
      furnished: 0.9,
      ac: 0.7,
      parking: 0.2,
      garden: 0.0
    },
    images: ['studio1.jpg', 'studio2.jpg']
  },
  {
    title: 'Villa de luxe',
    description: 'Villa luxueuse avec piscine et jardin paysager, dans le quartier le plus prisé d\'Ouagadougou.',
    property_type: 'villa',
    neighborhood: 'Ouaga-2000',
    price_range: [300000, 800000],
    surface_range: [200, 500],
    features: {
      bedrooms: [3, 8],
      bathrooms: [2, 5],
      furnished: 0.2,
      ac: 0.9,
      parking: 0.9,
      garden: 0.95
    },
    images: ['villa1.jpg', 'villa2.jpg', 'villa3.jpg', 'villa4.jpg']
  },
  {
    title: 'Maison de plain-pied',
    description: 'Maison traditionnelle de plain-pied avec dépendances, dans un quartier calme.',
    property_type: 'maison',
    neighborhood: 'gaoua',
    price_range: [60000, 180000],
    surface_range: [60, 180],
    features: {
      bedrooms: [2, 4],
      bathrooms: [1, 2],
      furnished: 0.2,
      ac: 0.3,
      parking: 0.5,
      garden: 0.6
    },
    images: ['house4.jpg', 'house5.jpg', 'house6.jpg']
  },
  {
    title: 'Appartement économique',
    description: 'Appartement économique et fonctionnel, parfait pour les étudiants et jeunes actifs.',
    property_type: 'appartement',
    neighborhood: 'nonsin',
    price_range: [30000, 80000],
    surface_range: [25, 80],
    features: {
      bedrooms: [1, 2],
      bathrooms: [1, 1],
      furnished: 0.4,
      ac: 0.2,
      parking: 0.1,
      garden: 0.0
    },
    images: ['apartment4.jpg', 'apartment5.jpg']
  },
  {
    title: 'Résidence sécurisée',
    description: 'Logement dans une résidence sécurisée avec gardiens 24h/24 et espaces verts.',
    property_type: 'appartement',
    neighborhood: 'gounghin',
    price_range: [90000, 250000],
    surface_range: [40, 150],
    features: {
      bedrooms: [1, 4],
      bathrooms: [1, 2],
      furnished: 0.2,
      ac: 0.5,
      parking: 0.6,
      garden: 0.3
    },
    images: ['residence1.jpg', 'residence2.jpg', 'residence3.jpg']
  },
  {
    title: 'F2 meublé moderne',
    description: 'F2 moderne et meublé avec terrasse, proche des transports et commerces.',
    property_type: 'appartement',
    neighborhood: 'azimmo',
    price_range: [70000, 160000],
    surface_range: [35, 90],
    features: {
      bedrooms: [1, 2],
      bathrooms: [1, 2],
      furnished: 0.7,
      ac: 0.6,
      parking: 0.4,
      garden: 0.2
    },
    images: ['f2-1.jpg', 'f2-2.jpg', 'f2-3.jpg']
  },
  {
    title: 'Maison en cours de construction',
    description: 'Maison en phase de finalisation, idéal pour personnaliser selon ses goûts.',
    property_type: 'maison',
    neighborhood: 'pabre',
    price_range: [80000, 220000],
    surface_range: [70, 200],
    features: {
      bedrooms: [2, 5],
      bathrooms: [1, 3],
      furnished: 0.0,
      ac: 0.1,
      parking: 0.7,
      garden: 0.7
    },
    images: ['construction1.jpg', 'construction2.jpg']
  },
  {
    title: 'Chambre indépendante',
    description: 'Chambre indépendante avec coin cuisine et salle d\'eau privée.',
    property_type: 'chambre',
    neighborhood: 'somgande',
    price_range: [25000, 70000],
    surface_range: [15, 35],
    features: {
      bedrooms: [1, 1],
      bathrooms: [1, 1],
      furnished: 0.5,
      ac: 0.1,
      parking: 0.0,
      garden: 0.0
    },
    images: ['room1.jpg', 'room2.jpg']
  }
];

// Fonction pour générer un prix basé sur le quartier et le type
function generatePrice(basePrice: number, quarter: string, propertyType: string): number {
  const quarterData = OUAGADOUGOU_QUARTERS.find(q => q.name.toLowerCase() === quarter.toLowerCase());
  if (!quarterData) return basePrice;

  // Multiplicateur par quartier
  const quarterMultiplier = quarterData.price_multiplier;
  
  // Multiplicateur par type de propriété
  const typeMultiplier = {
    'appartement': 1.0,
    'maison': 1.2,
    'studio': 0.6,
    'villa': 2.0,
    'chambre': 0.4,
    'f2': 0.8,
    'f3': 1.0,
    'f4': 1.4
  }[propertyType] || 1.0;

  // Variation aléatoire ±20%
  const randomFactor = 0.8 + Math.random() * 0.4;
  
  return Math.round(basePrice * quarterMultiplier * typeMultiplier * randomFactor);
}

// Fonction pour générer une surface basée sur le type
function generateSurface(min: number, max: number, quarter: string, propertyType: string): number {
  const quarterData = OUAGADOUGOU_QUARTERS.find(q => q.name.toLowerCase() === quarter.toLowerCase());
  
  // Les quartiers populaires ont des surfaces plus petites
  const densityFactor = quarterData?.population_density === 'very-high' ? 0.8 : 
                       quarterData?.population_density === 'high' ? 0.9 : 1.0;
  
  const size = min * densityFactor + Math.random() * ((max - min) * densityFactor);
  return Math.round(size);
}

// Fonction pour générer un nombre de chambres
function generateBedrooms(min: number, max: number, quarter: string, propertyType: string): number {
  const quarterData = OUAGADOUGOU_QUARTERS.find(q => q.name.toLowerCase() === quarter.toLowerCase());
  
  // Les quartiers populaires ont des logements plus compacts
  const densityFactor = quarterData?.population_density === 'very-high' ? 0.7 : 
                       quarterData?.population_density === 'high' ? 0.8 : 1.0;
  
  const bedrooms = min + Math.random() * ((max - min) * densityFactor);
  return Math.max(0, Math.round(bedrooms));
}

// Fonction pour déterminer si une propriété a une caractéristique
function hasFeature(probability: number): boolean {
  return Math.random() < probability;
}

// Fonction pour créer une propriété
function createProperty(template: PropertyTemplate, quarter: string, index: number, ownerId: string) {
  const basePrice = template.price_range[0] + Math.random() * (template.price_range[1] - template.price_range[0]);
  const price = generatePrice(basePrice, quarter, template.property_type);
  const surface = generateSurface(template.surface_range[0], template.surface_range[1], quarter, template.property_type);
  const bedrooms = generateBedrooms(template.features.bedrooms[0], template.features.bedrooms[1], quarter, template.property_type);
  const bathrooms = generateBedrooms(template.features.bathrooms[0], template.features.bathrooms[1], quarter, template.property_type);

  return {
    id: `prop_${Date.now()}_${index}`,
    title: `${template.title} - ${quarter}`,
    description: template.description,
    property_type: template.property_type,
    city: 'Ouagadougou',
    neighborhood: quarter.toLowerCase(),
    address: `${Math.floor(Math.random() * 9999) + 1} Rue ${template.property_type} - ${quarter}`,
    monthly_rent: price,
    deposit_amount: Math.round(price * 2),
    charges_amount: Math.round(price * 0.1),
    surface_area: surface,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    floor_number: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : null,
    is_furnished: hasFeature(template.features.furnished),
    has_ac: hasFeature(template.features.ac),
    has_parking: hasFeature(template.features.parking),
    has_garden: hasFeature(template.features.garden),
    main_image: template.images[0],
    images: template.images,
    status: Math.random() > 0.2 ? 'disponible' : 'loué',
    view_count: Math.floor(Math.random() * 1000),
    created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    owner_id: ownerId
  };
}

// Fonction principale pour générer toutes les propriétés
function generateAllProperties() {
  console.log('🏠 Génération de 500+ propriétés M\'ZAKA pour Ouagadougou...');
  
  const properties: any[] = [];
  const ownerIds = [
    'demo_proprietaire_1',
    'demo_proprietaire_2', 
    'demo_proprietaire_3',
    'demo_agence_1',
    'demo_agence_2'
  ];

  // Distribution des propriétés par quartier (basée sur la réalité d'Ouagadougou)
  const quarterDistribution = {
    'nonsin': 0.25,        // 25% - Quartier populaire, beaucoup de logements
    'koulouba': 0.18,      // 18% - Centre-ville, très dense
    'gaoua': 0.15,         // 15% - Quartier populaire
    'azimmo': 0.12,        // 12% - Quartier mixte
    'gounghin': 0.10,      // 10% - Quartier éducatif
    'basilea': 0.08,       // 8% - Quartier résidentiel moderne
    'kombissiri': 0.05,    // 5% - Quartier administratif
    'pabre': 0.03,         // 3% - Quartier en développement
    'Ouaga-2000': 0.03,    // 3% - Quartier haut de gamme
    'somgande': 0.01       // 1% - Quartier périphérique
  };

  const totalProperties = 520;
  const targetProperties = 520;

  for (const [quarter, percentage] of Object.entries(quarterDistribution)) {
    const propertiesInQuarter = Math.floor(targetProperties * percentage);
    
    for (let i = 0; i < propertiesInQuarter; i++) {
      // Sélectionner un template aléatoire
      const template = PROPERTY_TEMPLATES[Math.floor(Math.random() * PROPERTY_TEMPLATES.length)];
      const ownerId = ownerIds[Math.floor(Math.random() * ownerIds.length)];
      
      const property = createProperty(template, quarter, i, ownerId);
      properties.push(property);
    }
  }

  // Ajuster pour atteindre exactement 520 propriétés
  while (properties.length < targetProperties) {
    const quarter = 'nonsin'; // Quartier avec le plus de rotation
    const template = PROPERTY_TEMPLATES[0];
    const ownerId = ownerIds[Math.floor(Math.random() * ownerIds.length)];
    
    const property = createProperty(template, quarter, properties.length, ownerId);
    properties.push(property);
  }

  console.log(`✅ ${properties.length} propriétés générées avec succès !`);
  console.log('📊 Distribution par quartier:');
  
  // Statistiques par quartier
  const stats = properties.reduce((acc, prop) => {
    const quarter = prop.neighborhood;
    if (!acc[quarter]) {
      acc[quarter] = { count: 0, avgPrice: 0, totalPrice: 0 };
    }
    acc[quarter].count++;
    acc[quarter].totalPrice += prop.monthly_rent;
    acc[quarter].avgPrice = acc[quarter].totalPrice / acc[quarter].count;
    return acc;
  }, {} as any);

  Object.entries(stats).forEach(([quarter, data]: [string, any]) => {
    console.log(`   ${quarter}: ${data.count} propriétés, prix moyen: ${Math.round(data.avgPrice).toLocaleString()} FCFA`);
  });

  return properties;
}

// Export pour utilisation dans d'autres fichiers
export { generateAllProperties, OUAGADOUGOU_QUARTERS, PROPERTY_TEMPLATES };

// Exécution si appelé directement
if (require.main === module) {
  const properties = generateAllProperties();
  
  // Sauvegarder dans un fichier JSON pour inspection
  const fs = require('fs');
  fs.writeFileSync(
    'generated_properties.json', 
    JSON.stringify(properties, null, 2)
  );
  
  console.log('💾 Propriétés sauvegardées dans generated_properties.json');
}