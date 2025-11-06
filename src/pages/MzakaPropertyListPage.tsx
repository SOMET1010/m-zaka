import React, { useState } from 'react';
import { MapPin, DollarSign, Home, Star, Heart, Eye, Filter, Grid, List } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';

const MzakaPropertyListPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [filters, setFilters] = useState({
    type: 'Tous',
    budget: 'Tous',
    quartier: 'Tous',
    surface: 'Tous',
    chambres: 'Tous',
    sdb: 'Tous',
    parking: false,
    mobilie: false
  });
  
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Données demo propriétés burkinabé
  const properties = [
    {
      id: 1,
      title: "Appartement T3 - Ouaga 2000",
      type: "Appartement",
      price: 250000,
      priceUnit: "mois",
      currency: "FCFA",
      surface: 120,
      bedrooms: 3,
      bathrooms: 2,
      location: "Ouaga 2000, Ouagadougou",
      image: "/property-images/appartement-moderne-abidjan.jpg",
      rating: 4.8,
      reviews: 24,
      available: true,
      verified: true
    },
    {
      id: 2,
      title: "Villa Moderne - Koulouba",
      type: "Maison",
      price: 450000,
      priceUnit: "mois", 
      currency: "FCFA",
      surface: 200,
      bedrooms: 4,
      bathrooms: 3,
      location: "Koulouba, Ouagadougou",
      image: "/property-images/villa-luxe-cocody.jpg",
      rating: 4.9,
      reviews: 18,
      available: true,
      verified: true
    },
    {
      id: 3,
      title: "Bureau - Centre-ville",
      type: "Bureau",
      price: 150000,
      priceUnit: "mois",
      currency: "FCFA", 
      surface: 80,
      bedrooms: 0,
      bathrooms: 1,
      location: "Centre-ville, Ouagadougou",
      image: "/property-images/building-moderne.jpg",
      rating: 4.6,
      reviews: 12,
      available: true,
      verified: false
    },
    {
      id: 4,
      title: "Appartement Studio - Gounghin",
      type: "Studio",
      price: 85000,
      priceUnit: "mois",
      currency: "FCFA",
      surface: 45,
      bedrooms: 1,
      bathrooms: 1,
      location: "Gounghin, Ouagadougou", 
      image: "/property-images/studio-plateau.jpg",
      rating: 4.3,
      reviews: 31,
      available: true,
      verified: true
    }
  ];

  // Filtres selon maquette
  const filterCategories = [
    {
      title: "Type de bien",
      options: ["Tous", "Appartement", "Maison", "Studio", "Bureau", "Magasin"]
    },
    {
      title: "Budget mensuel",
      options: ["Tous", "50K-100K", "100K-200K", "200K-500K", "500K+"]
    },
    {
      title: "Quartier",
      options: ["Tous", "Ouaga 2000", "Koulouba", "Gounghin", "Cale coco", "Pissy"]
    },
    {
      title: "Surface",
      options: ["Tous", "Moins de 50m²", "50-100m²", "100-200m²", "Plus de 200m²"]
    },
    {
      title: "Chambres",
      options: ["Tous", "Studio", "1", "2", "3", "4+"]
    },
    {
      title: "Salles de bain",
      options: ["Tous", "1", "2", "3+"]
    }
  ];

  return (
    <div className="min-h-screen bg-beige-faso">
      <HeaderMzaka userType="locataire" userName="Paul" notifications={2} />
      
      <div className="flex">
        {/* Filtres latéraux (fond beige, texte vert) selon maquette */}
        <aside className="w-80 bg-beige-faso p-6 border-r border-gris-clair/20">
          <div className="mb-6">
            <h2 className="text-xl font-poppins font-bold text-vert-sahel mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtres de recherche
            </h2>
          </div>
          
          <div className="space-y-6">
            {filterCategories.map((category, index) => (
              <div key={index}>
                <h3 className="font-nunito font-semibold text-terre-sombre mb-3">
                  {category.title}
                </h3>
                <select
                  value={filters[category.title.toLowerCase().replace(' ', '') as keyof typeof filters] as string}
                  onChange={(e) => setFilters({
                    ...filters, 
                    [category.title.toLowerCase().replace(' ', '')]: e.target.value
                  })}
                  className="w-full p-3 border border-gris-clair rounded-lg text-terre-sombre font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                >
                  {category.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            
            {/* Options supplémentaires */}
            <div>
              <h3 className="font-nunito font-semibold text-terre-sombre mb-3">
                Options
              </h3>
              <div className="space-y-2">
                <label className="flex items-center text-terre-sombre">
                  <input
                    type="checkbox"
                    checked={filters.parking}
                    onChange={(e) => setFilters({...filters, parking: e.target.checked})}
                    className="mr-3 text-vert-sahel focus:ring-vert-sahel"
                  />
                  Parking disponible
                </label>
                <label className="flex items-center text-terre-sombre">
                  <input
                    type="checkbox"
                    checked={filters.mobilie}
                    onChange={(e) => setFilters({...filters, mobilie: e.target.checked})}
                    className="mr-3 text-vert-sahel focus:ring-vert-sahel"
                  />
                  Meublé
                </label>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Contenu principal */}
        <main className="flex-1 p-6">
          {/* En-tête avec vue liste/carte */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-poppins font-bold text-terre-sombre">
                Biens disponibles à Ouagadougou
              </h1>
              <p className="text-terre-sombre/60 font-nunito">
                {properties.length} propriétés trouvées
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <ButtonMzaka
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid className="h-5 w-5" />
              </ButtonMzaka>
              <ButtonMzaka
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="h-5 w-5" />
              </ButtonMzaka>
            </div>
          </div>
          
          {/* Grille des propriétés */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {properties.map((property) => (
              <div
                key={property.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                  property.verified ? 'border-rouge-burkina/20' : 'border-gris-clair/20'
                } hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image avec bordure rouge selon maquette */}
                <div className={`relative ${viewMode === 'list' ? 'w-80 h-48' : 'h-48'}`}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Badge vérifié */}
                  {property.verified && (
                    <div className="absolute top-3 left-3 bg-rouge-burkina text-white px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Vérifié
                    </div>
                  )}
                  {/* Prix sur fond or selon maquette */}
                  <div className="absolute top-3 right-3 bg-or-soleil text-terre-sombre px-3 py-1 rounded-full font-poppins font-bold">
                    {property.price.toLocaleString()} {property.currency}/{property.priceUnit}
                  </div>
                  {/* Favori */}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(property.id) 
                          ? 'text-rouge-burkina fill-current' 
                          : 'text-terre-sombre/60'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Contenu */}
                <div className="p-4 flex-1">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-2">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-terre-sombre/60 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-nunito text-sm">{property.location}</span>
                  </div>
                  
                  {/* Détails */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-terre-sombre/80">
                    <span className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      {property.surface} m²
                    </span>
                    <span>{property.bedrooms > 0 ? `${property.bedrooms} ch.` : 'Studio'}</span>
                    <span>{property.bathrooms} sdb</span>
                  </div>
                  
                  {/* Note et avis */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-or-soleil fill-current mr-1" />
                      <span className="font-nunito text-sm font-medium text-terre-sombre">
                        {property.rating}/5
                      </span>
                      <span className="text-terre-sombre/60 text-sm ml-1">
                        ({property.reviews} avis)
                      </span>
                    </div>
                  </div>
                  
                  {/* Boutons d'action */}
                  <div className="flex space-x-2">
                    <ButtonMzaka variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </ButtonMzaka>
                    <ButtonMzaka variant="primary" className="flex-1">
                      Candidater
                    </ButtonMzaka>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      {/* Bouton flottant "Publier un bien" selon maquette */}
      <div className="fixed bottom-6 right-6 z-50">
        <ButtonMzaka variant="primary" className="rounded-full w-16 h-16 shadow-2xl">
          <Home className="h-6 w-6" />
        </ButtonMzaka>
      </div>
    </div>
  );
};

export default MzakaPropertyListPage;