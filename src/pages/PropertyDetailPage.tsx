import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DynamicBreadcrumb } from '@/components/navigation/DynamicBreadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, MapPin, Bed, Bath, Maximize, Home, CheckCircle2, 
  ArrowLeft, MessageCircle, Calendar, DollarSign, Edit, Users,
  Eye, Star, FileText, TrendingUp, Clock, Lock, ExternalLink, Building2, Info,
  Phone, Mail, User, Shield, Award, Check
} from 'lucide-react';
import { getPropertyStatusLabel } from '@/constants';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { toast } from '@/hooks/use-toast';
import { RecommendationsSection } from '@/components/recommendations/RecommendationsSection';
import { MediaGallery } from '@/components/property/MediaGallery';
import { LocationSection } from '@/components/property/LocationSection';
import { VerificationGuard } from '@/components/application/VerificationGuard';
import { GuestContactForm } from '@/components/messaging/GuestContactForm';
import { TitleDeedSection } from '@/components/property/TitleDeedSection';
import { WorkStatusSection } from '@/components/property/WorkStatusSection';
import { logger } from '@/services/logger';
import { sanitizePropertyDescription, sanitizeText } from '@/lib/sanitize';
import type { Property, Application, PropertyStats } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface PropertyOwner {
  id: string;
  full_name: string;
  user_type: string;
  phone: string | null;
}

interface ApplicationDisplay extends Application {
  profiles: {
    full_name: string;
    phone: string | null;
  };
}

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { canEditProperty } = usePermissions();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [owner, setOwner] = useState<PropertyOwner | null>(null);
  const [applications, setApplications] = useState<ApplicationDisplay[]>([]);
  const [stats, setStats] = useState<PropertyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'location' | 'owner'>('overview');
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);

  // Configuration des métadonnées de la page
  useDocumentHead({
    title: property ? `${property.title} - MZAKA` : 'Détail du bien - MZAKA',
    description: property ? `Découvrez ${property.title}, ${property.property_type} situé à ${property.city}. ${property.description?.substring(0, 100)}...` : 'Détails du bien immobilier',
    keywords: property ? `${property.property_type}, ${property.city}, immobilier, MZAKA, ${property.title}` : 'immobilier, bien, MZAKA'
  });

  useEffect(() => {
    if (!id) {
      setError('Identifiant du bien manquant');
      setIsLoading(false);
      return;
    }

    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Charger les détails de la propriété
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select(`
          *,
          profiles!properties_owner_id_fkey (
            id,
            full_name,
            user_type,
            phone,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (propertyError) {
        throw new Error(propertyError.message);
      }

      if (!propertyData) {
        throw new Error('Bien introuvable');
      }

      setProperty(propertyData);
      setOwner(propertyData.profiles);

      // Charger les applications (si l'utilisateur est le propriétaire)
      if (user && propertyData.owner_id === user.id) {
        const { data: applicationsData, error: applicationsError } = await supabase
          .from('applications')
          .select(`
            *,
            profiles!applications_user_id_fkey (
              full_name,
              phone
            )
          `)
          .eq('property_id', id)
          .order('created_at', { ascending: false });

        if (!applicationsError) {
          setApplications(applicationsData || []);
        }
      }

      // Charger les statistiques
      const { data: statsData, error: statsError } = await supabase
        .from('property_stats')
        .select('*')
        .eq('property_id', id)
        .single();

      if (!statsError) {
        setStats(statsData);
      }

      // Incrémenter le compteur de vues
      await supabase.rpc('increment_property_views', { property_id: id });

    } catch (err: any) {
      console.error('Erreur lors du chargement du bien:', err);
      setError(err.message || 'Erreur lors du chargement du bien');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactOwner = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour contacter le propriétaire.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    setShowContactDialog(true);
  };

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour candidater.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    setShowApplicationDialog(true);
  };

  const handleFavoriteToggle = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour sauvegarder vos favoris.",
        variant: "destructive"
      });
      return;
    }
    toggleFavorite(id!);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert className="mb-6">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              {error || 'Bien introuvable'}
            </AlertDescription>
          </Alert>
          <div className="flex gap-4">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <Button onClick={() => navigate('/properties')}>
              Voir tous les biens
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isOwner = user?.id === property.owner_id;
  const canEdit = canEditProperty(property);
  const canContact = user && user.id !== property.owner_id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <DynamicBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Biens', href: '/properties' },
            { label: property.title }
          ]}
        />

        {/* En-tête avec actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{property.address}, {property.city}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavoriteToggle}
              className="gap-2"
            >
              <Heart className={`w-4 h-4 ${isFavorite(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
              {isFavorite(property.id) ? 'Sauvegardé' : 'Sauvegarder'}
            </Button>
            
            {canContact && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleContactOwner}
                  className="gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contacter
                </Button>
                <Button
                  onClick={handleApply}
                  className="gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Candidater
                </Button>
              </>
            )}
            
            {canEdit && (
              <Button
                variant="outline"
                onClick={() => navigate(`/biens/${property.id}/modifier`)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </Button>
            )}
          </div>
        </div>

        {/* Statut du bien */}
        <div className="mb-6">
          {getPropertyStatusBadge(property)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galerie photos */}
            <Card>
              <MediaGallery 
                property={property}
                onImageClick={(index) => {
                  // TODO: Implement lightbox
                  console.log('Image clicked:', index);
                }}
              />
            </Card>

            {/* Onglets */}
            <Card>
              <div className="border-b">
                <nav className="flex space-x-8 px-6 pt-4">
                  {[
                    { id: 'overview', label: 'Aperçu', icon: Home },
                    { id: 'details', label: 'Détails', icon: Info },
                    { id: 'location', label: 'Localisation', icon: MapPin },
                    { id: 'owner', label: 'Propriétaire', icon: User }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
              
              <CardContent className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Caractéristiques principales */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {property.bedrooms && (
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <div className="text-sm text-gray-600">Chambres</div>
                          <div className="text-lg font-semibold">{property.bedrooms}</div>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Bath className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <div className="text-sm text-gray-600">Salles de bain</div>
                          <div className="text-lg font-semibold">{property.bathrooms}</div>
                        </div>
                      )}
                      {property.surface && (
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Maximize className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <div className="text-sm text-gray-600">Surface</div>
                          <div className="text-lg font-semibold">{property.surface} m²</div>
                        </div>
                      )}
                      {property.year_built && (
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Building2 className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <div className="text-sm text-gray-600">Année</div>
                          <div className="text-lg font-semibold">{property.year_built}</div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <div 
                        className="prose prose-sm max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ 
                          __html: sanitizePropertyDescription(property.description || '') 
                        }}
                      />
                    </div>

                    {/* Équipements */}
                    {property.amenities && property.amenities.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Équipements & Services</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {property.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <TitleDeedSection property={property} />
                    <WorkStatusSection property={property} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Type de bien</h4>
                        <p className="text-gray-600">{property.property_type}</p>
                      </div>
                      {property.furnished && (
                        <div>
                          <h4 className="font-semibold mb-2">Meublé</h4>
                          <p className="text-gray-600">Oui</p>
                        </div>
                      )}
                      {property.pet_friendly && (
                        <div>
                          <h4 className="font-semibold mb-2">Animaux acceptés</h4>
                          <p className="text-gray-600">Oui</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <LocationSection property={property} />
                )}

                {activeTab === 'owner' && owner && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback>
                          {owner.full_name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{owner.full_name}</h3>
                        <p className="text-gray-600 capitalize">{owner.user_type}</p>
                      </div>
                    </div>
                    
                    {owner.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{owner.phone}</span>
                      </div>
                    )}
                    
                    {/* Badges de vérification */}
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="w-3 h-3" />
                        Vérifié
                      </Badge>
                      {owner.user_type === 'agence' && (
                        <Badge variant="secondary" className="gap-1">
                          <Award className="w-3 h-3" />
                          Agence partenaire
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section de recommandations */}
            <RecommendationsSection
              currentPropertyId={property.id}
              userLocation={property.coordinates}
              properties={[]}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prix et informations principales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {property.rent_price ? (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-6 h-6" />
                      {property.rent_price.toLocaleString()} FCFA/mois
                    </span>
                  ) : (
                    'Prix sur demande'
                  )}
                </CardTitle>
                {stats && (
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {stats.view_count} vues
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {stats.favorite_count} favoris
                    </span>
                  </CardDescription>
                )}
              </CardHeader>
            </Card>

            {/* Actions rapides */}
            {canContact && (
              <Card>
                <CardHeader>
                  <CardTitle>Intéressé par ce bien ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleContactOwner} className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contacter le propriétaire
                  </Button>
                  <Button onClick={handleApply} variant="outline" className="w-full gap-2">
                    <FileText className="w-4 h-4" />
                    Soumettre une candidature
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Calendar className="w-4 h-4" />
                    Planifier une visite
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Statistiques pour le propriétaire */}
            {isOwner && (
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques de votre bien</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Vues totales</span>
                    <span className="font-semibold">{stats?.view_count || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Favoris</span>
                    <span className="font-semibold">{stats?.favorite_count || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Candidatures</span>
                    <span className="font-semibold">{applications.length}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Dialogs */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contacter le propriétaire</DialogTitle>
            <DialogDescription>
              Envoyez un message au propriétaire de ce bien.
            </DialogDescription>
          </DialogHeader>
          <GuestContactForm 
            propertyId={property.id}
            ownerId={owner?.id}
            onSuccess={() => setShowContactDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Soumettre une candidature</DialogTitle>
            <DialogDescription>
              Candidatez pour ce bien immobilier.
            </DialogDescription>
          </DialogHeader>
          <VerificationGuard>
            <Button onClick={() => navigate(`/application/${property.id}`)}>
              Continuer la candidature
            </Button>
          </VerificationGuard>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Fonction pour obtenir le badge de statut
function getPropertyStatusBadge(property: Property) {
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
}

export default PropertyDetailPage;