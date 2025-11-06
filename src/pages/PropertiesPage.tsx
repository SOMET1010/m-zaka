import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DynamicBreadcrumb } from '@/components/navigation/DynamicBreadcrumb';
import { KentePattern } from '@/components/ui/african-patterns';
import PropertyFiltersComponent, { PropertyFilters } from '@/components/PropertyFilters';
import MobileFilters from '@/components/properties/MobileFilters';
import { PullToRefresh } from '@/components/properties/PullToRefresh';
import PropertyMap from '@/components/PropertyMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Grid, List, Map, Search as SearchIcon, Eye, CheckCircle2, Lock, 
  Home, Filter, SlidersHorizontal, ArrowUpDown, Star, MapPin 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useProperties } from '@/hooks/useProperties';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { useIsMobile } from '@/hooks/use-mobile';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyCardSkeleton } from '@/components/properties/PropertyCardSkeleton';
import { RecommendationsSection } from '@/components/recommendations/RecommendationsSection';
import { hasCoordinates } from '@/lib/geo';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

type ViewMode = 'grid' | 'list' | 'map';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { data: properties = [], isLoading, error, refetch } = useProperties({ currentUserId: user?.id });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'popular'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const { filteredProperties, handleFilterChange, handleLocationSearch, handleReset } = 
    usePropertyFilters(properties);

  // Configuration des métadonnées de la page
  useDocumentHead({
    title: 'Biens immobiliers - MZAKA',
    description: 'Découvrez notre sélection de biens immobiliers au Burkina Faso. Appartements, villas, bureaux et plus encore.',
    keywords: 'immobilier, biens, appartements, villas, bureaux, location, vente, Burkina Faso'
  });

  // Tri des propriétés
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return (a.rent_price || 0) - (b.rent_price || 0);
      case 'price_desc':
        return (b.rent_price || 0) - (a.rent_price || 0);
      case 'popular':
        return (b.view_count || 0) - (a.view_count || 0);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleNavigateToProperty = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as any);
  };

  const getPropertyStatusBadge = (property: any) => {
    switch (property.status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>;
      case 'rented':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Loué</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Statut inconnu</Badge>;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Une erreur s'est produite lors du chargement des biens immobiliers. 
              Veuillez réessayer.
            </AlertDescription>
          </Alert>
          <Button onClick={() => refetch()} className="mt-4">
            Réessayer
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section avec pattern Kente */}
      <section className="relative bg-gradient-to-r from-orange-50 to-red-50 py-12">
        <KentePattern className="absolute inset-0 opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Biens Immobiliers
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de biens immobiliers de qualité au Burkina Faso
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>{filteredProperties.length} biens disponibles</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Ouagadougou & Environs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <DynamicBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Biens Immobiliers' }
          ]}
        />

        {/* Filtres et contrôles */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Résultats et tri */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">
                  {isLoading ? 'Chargement...' : `${filteredProperties.length} biens trouvés`}
                </h2>
              </div>
              
              {/* Tri */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Plus récents</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="popular">Plus populaires</option>
                </select>
              </div>
            </div>

            {/* Contrôles de vue et filtres */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtres
              </Button>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('map')}
                  className="rounded-l-none"
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres mobiles */}
        {isMobile && (
          <div className="lg:hidden mb-6">
            <MobileFilters
              properties={properties}
              onFilterChange={handleFilterChange}
              onLocationSearch={handleLocationSearch}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Filtres desktop */}
        {!isMobile && showFilters && (
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyFiltersComponent
                  properties={properties}
                  onFilterChange={handleFilterChange}
                  onLocationSearch={handleLocationSearch}
                  onReset={handleReset}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contenu principal */}
        {isLoading ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
            viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1'
          }`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} viewMode={viewMode} />
            ))}
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun bien trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <Button onClick={handleReset} variant="outline">
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Grille/Liste des propriétés */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
              viewMode === 'list' ? 'grid-cols-1' : 'hidden'
            }`}>
              {sortedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={isFavorite(property.id)}
                  onToggleFavorite={() => toggleFavorite(property.id)}
                  onViewDetails={() => handleNavigateToProperty(property.id)}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Carte des propriétés */}
            {viewMode === 'map' && (
              <div className="h-[600px] rounded-lg overflow-hidden">
                <PropertyMap
                  properties={sortedProperties.filter(hasCoordinates)}
                  onPropertyClick={(property) => handleNavigateToProperty(property.id)}
                />
              </div>
            )}
          </div>
        )}

        {/* Section de recommandations */}
        {!isLoading && filteredProperties.length > 0 && (
          <div className="mt-12">
            <RecommendationsSection
              currentPropertyId={null}
              userLocation={null}
              properties={filteredProperties}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertiesPage;