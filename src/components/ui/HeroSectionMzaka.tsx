import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Building, Filter, X } from 'lucide-react';
import ButtonMzaka from './ButtonMzaka';

interface HeroSectionMzakaProps {
  onSearch?: (filters: SearchFilters) => void;
  popularLocations?: string[];
  totalProperties?: number;
}

interface SearchFilters {
  city: string;
  type: string;
  budget: string;
  neighborhood: string;
}

const HeroSectionMzaka: React.FC<HeroSectionMzakaProps> = ({
  onSearch,
  popularLocations = [
    'Ouaga 2000', 'Koulouba', 'Dapoya', 'Gounghin', 
    'Pissy', 'Tampouy', 'Bogodogo', 'Tanghin'
  ],
  totalProperties = 520
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    city: 'Ouagadougou',
    type: '',
    budget: '',
    neighborhood: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const propertyTypes = [
    'Studio', 'F2', 'F3', 'F4', 'Villa', 'Bureau', 
    'Local commercial', 'Terrain', 'Entrepôt', 'Duplex'
  ];

  const budgetRanges = [
    '0 - 100k FCFA',
    '100k - 200k FCFA', 
    '200k - 300k FCFA',
    '300k - 500k FCFA',
    '500k - 1M FCFA',
    '1M+ FCFA'
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulation de recherche
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSearch?.(filters);
    setIsSearching(false);
  };

  const clearFilters = () => {
    setFilters({
      city: 'Ouagadougou',
      type: '',
      budget: '',
      neighborhood: ''
    });
  };

  return (
    <div className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-sahel-green via-sahel-green-600 to-sahel-green-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F9B208' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Slogan Principal */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Votre maison,
              <br />
              <span className="text-sun-gold">votre confiance</span>,
              <br />
              votre <span className="text-burkina-red">Faso</span>.
            </h1>
            <p className="font-body text-xl md:text-2xl text-faso-beige-100 max-w-2xl mx-auto leading-relaxed">
              La première plateforme immobilière 100% burkinabè.
              Trouvez votre foyer parfait avec la confiance de votre terre.
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-organic-lg p-6 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-sun-gold mb-2">
                {totalProperties}+
              </div>
              <div className="font-body text-lg text-faso-beige-100">
                Propriétés disponibles
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-organic-lg p-6 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-sun-gold mb-2">
                13
              </div>
              <div className="font-body text-lg text-faso-beige-100">
                Quartiers de Ouagadougou
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-organic-lg p-6 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-sun-gold mb-2">
                4
              </div>
              <div className="font-body text-lg text-faso-beige-100">
                Opérateurs Mobile Money
              </div>
            </div>
          </div>

          {/* Barre de Recherche Principale */}
          <div className="bg-white rounded-organic-2xl p-6 shadow-earth-xl animate-slide-up">
            {/* Bouton Toggle Filtres Mobile */}
            <div className="md:hidden mb-4">
              <ButtonMzaka
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                icon={showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                fullWidth
              >
                {showFilters ? 'Masquer les filtres' : 'Afficher tous les filtres'}
              </ButtonMzaka>
            </div>

            {/* Filtres de base */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
              {/* Ville */}
              <div className="relative">
                <label className="font-body font-semibold text-earth-dark text-lg mb-2 block">
                  Ville
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sahel-green" />
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters({...filters, city: e.target.value})}
                    className="input-mzaka pl-10"
                  >
                    <option value="Ouagadougou">Ouagadougou</option>
                    <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                    <option value="Koudougou">Koudougou</option>
                    <option value="Ouahigouya">Ouahigouya</option>
                  </select>
                </div>
              </div>

              {/* Type */}
              <div className="relative">
                <label className="font-body font-semibold text-earth-dark text-lg mb-2 block">
                  Type
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sahel-green" />
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="input-mzaka pl-10"
                  >
                    <option value="">Tous les types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="relative">
                <label className="font-body font-semibold text-earth-dark text-lg mb-2 block">
                  Budget
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sahel-green" />
                  <select
                    value={filters.budget}
                    onChange={(e) => setFilters({...filters, budget: e.target.value})}
                    className="input-mzaka pl-10"
                  >
                    <option value="">Tous budgets</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quartier */}
              <div className="relative">
                <label className="font-body font-semibold text-earth-dark text-lg mb-2 block">
                  Quartier
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sahel-green" />
                  <select
                    value={filters.neighborhood}
                    onChange={(e) => setFilters({...filters, neighborhood: e.target.value})}
                    className="input-mzaka pl-10"
                  >
                    <option value="">Tous les quartiers</option>
                    {popularLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Actions de recherche */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <ButtonMzaka
                variant="primary"
                size="lg"
                onClick={handleSearch}
                isLoading={isSearching}
                icon={<Search className="w-6 h-6" />}
                fullWidth
                className="flex-1"
              >
                Rechercher
              </ButtonMzaka>
              
              <ButtonMzaka
                variant="ghost"
                size="lg"
                onClick={clearFilters}
                className="flex-1 sm:flex-none"
              >
                Effacer
              </ButtonMzaka>
            </div>
          </div>

          {/* Lieux populaires */}
          <div className="mt-8 animate-fade-in">
            <p className="font-body text-faso-beige-200 text-lg mb-4">
              Quartiers les plus recherchés :
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => setFilters({...filters, neighborhood: location})}
                  className="bg-white/20 backdrop-blur-sm text-faso-beige-100 px-4 py-2 rounded-organic-lg font-body text-base hover:bg-burkina-red hover:text-white transition-all duration-200 touch-target"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-sun-gold/20 rounded-organic-lg transform rotate-12 animate-bounce-organic"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-burkina-red/20 rounded-organic-lg transform -rotate-12 animate-pulse"></div>
    </div>
  );
};

export default HeroSectionMzaka;