import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Home,
  DollarSign,
  Shield,
  Car,
  Wifi,
  Droplets,
  Zap,
  TreePine,
  Users,
  AlertTriangle,
  CheckCircle,
  Camera,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

// Critères de notation adaptés au contexte burkinabé
export interface BurkinabeReviewCriteria {
  quality: number;          // Qualité générale du bien (1-5)
  neighborhood: number;     // Qualité du quartier (1-5)
  valueForMoney: number;    // Rapport qualité-prix (1-5)
  proximity: number;        // Proximité des commodités (1-5)
  security: number;         // Sécurité (1-5)
  waterAccess: number;      // Accès à l'eau (1-5)
  electricity: number;      // Accès à l'électricité (1-5)
  internet: number;         // Qualité Internet/WiFi (1-5)
  parking: number;          // Stationnement (1-5)
  landlordRelation: number; // Relation avec le propriétaire (1-5)
}

export interface BurkinabeReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  propertyId: string;
  propertyTitle: string;
  propertyType: string;
  neighborhood: string;
  leaseDuration: string; // Durée du bail
  criteria: BurkinabeReviewCriteria;
  overallRating: number; // Moyenne pondérée
  comment: string;
  photos?: string[];
  wouldRecommend: boolean;
  leaseStartDate: string;
  leaseEndDate?: string;
  reviewDate: string;
  helpfulVotes: number;
  verified: boolean; // Locataire vérifié par ANSUT
}

// Catégories de commodités importantes au Burkina Faso
const IMPORTANT_AMENITIES = [
  { key: 'waterAccess', label: 'Accès à l\'eau', icon: Droplets, weight: 0.15 },
  { key: 'electricity', label: 'Électricité', icon: Zap, weight: 0.15 },
  { key: 'security', label: 'Sécurité', icon: Shield, weight: 0.12 },
  { key: 'neighborhood', label: 'Qualité du quartier', icon: MapPin, weight: 0.10 },
  { key: 'valueForMoney', label: 'Rapport qualité-prix', icon: DollarSign, weight: 0.10 },
  { key: 'quality', label: 'Qualité du logement', icon: Home, weight: 0.08 },
  { key: 'internet', label: 'Internet/WiFi', icon: Wifi, weight: 0.08 },
  { key: 'parking', label: 'Stationnement', icon: Car, weight: 0.08 },
  { key: 'proximity', label: 'Proximité commodités', icon: TreePine, weight: 0.07 },
  { key: 'landlordRelation', label: 'Relation propriétaire', icon: Users, weight: 0.07 }
];

// Données de démonstration pour les avis
const DEMO_REVIEWS: BurkinabeReview[] = [
  {
    id: '1',
    reviewerId: 'user1',
    reviewerName: 'Aminata Traoré',
    propertyId: 'prop1',
    propertyTitle: 'Appartement moderne Basilea',
    propertyType: 'appartement',
    neighborhood: 'Basilea',
    leaseDuration: '12 mois',
    criteria: {
      quality: 4,
      neighborhood: 5,
      valueForMoney: 4,
      proximity: 4,
      security: 5,
      waterAccess: 4,
      electricity: 5,
      internet: 3,
      parking: 4,
      landlordRelation: 5
    },
    overallRating: 4.3,
    comment: 'Excellent appartement dans un quartier sécurisé. L\'eau et l\'électricité sont fiables. Le propriétaire est très arrangeant. Seulement quelques souci avec l\'internet parfois.',
    wouldRecommend: true,
    leaseStartDate: '2024-01-15',
    reviewDate: '2024-11-01',
    helpfulVotes: 12,
    verified: true
  },
  {
    id: '2',
    reviewerId: 'user2',
    reviewerName: 'Ibrahim Ouédraogo',
    propertyId: 'prop2',
    propertyTitle: 'Maison familiale Koulouba',
    propertyType: 'maison',
    neighborhood: 'Koulouba',
    leaseDuration: '24 mois',
    criteria: {
      quality: 3,
      neighborhood: 4,
      valueForMoney: 3,
      proximity: 5,
      security: 3,
      waterAccess: 2,
      electricity: 4,
      internet: 2,
      parking: 5,
      landlordRelation: 4
    },
    overallRating: 3.5,
    comment: 'Maison bien située mais problèmes d\'eau réguliers. Le loyer est correct pour la localisation. Parking sécurisé, ce qui est un plus.',
    wouldRecommend: false,
    leaseStartDate: '2023-06-01',
    reviewDate: '2024-10-15',
    helpfulVotes: 8,
    verified: true
  },
  {
    id: '3',
    reviewerId: 'user3',
    reviewerName: 'Fatou Kone',
    propertyId: 'prop3',
    propertyTitle: 'Studio meublé Ouaga 2000',
    propertyType: 'studio',
    neighborhood: 'Ouaga 2000',
    leaseDuration: '6 mois',
    criteria: {
      quality: 5,
      neighborhood: 5,
      valueForMoney: 3,
      proximity: 4,
      security: 5,
      waterAccess: 5,
      electricity: 5,
      internet: 5,
      parking: 4,
      landlordRelation: 4
    },
    overallRating: 4.4,
    comment: 'Studio de qualité dans le quartier le plus moderne d\'Ouaga. Un peu cher mais le service est à la hauteur. Je recommande pour les professionnels.',
    wouldRecommend: true,
    leaseStartDate: '2024-03-01',
    reviewDate: '2024-11-05',
    helpfulVotes: 15,
    verified: true
  }
];

// Composant d'étoile interactive
interface InteractiveStarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const InteractiveStarRating: React.FC<InteractiveStarRatingProps> = ({
  rating,
  onRatingChange,
  size = 'md',
  disabled = false
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const currentRating = hoverRating || rating;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className={`${sizeClasses[size]} ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          } transition-colors`}
        >
          <Star
            className={`${
              star <= currentRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

// Composant de critères de notation
interface ReviewCriteriaFormProps {
  criteria: BurkinabeReviewCriteria;
  onChange: (criteria: BurkinabeReviewCriteria) => void;
  disabled?: boolean;
}

const ReviewCriteriaForm: React.FC<ReviewCriteriaFormProps> = ({
  criteria,
  onChange,
  disabled = false
}) => {
  const updateCriterion = (key: keyof BurkinabeReviewCriteria, value: number) => {
    onChange({
      ...criteria,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 mb-4">Notez chaque aspect de votre location</h4>
      
      {IMPORTANT_AMENITIES.map(({ key, label, icon: Icon, weight }) => (
        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5 text-gray-600" />
            <div>
              <Label className="font-medium text-gray-900">{label}</Label>
              <p className="text-xs text-gray-500">Pondération: {Math.round(weight * 100)}%</p>
            </div>
          </div>
          <InteractiveStarRating
            rating={criteria[key as keyof BurkinabeReviewCriteria]}
            onRatingChange={(value) => updateCriterion(key as keyof BurkinabeReviewCriteria, value)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

// Calcul de la note globale pondérée
function calculateOverallRating(criteria: BurkinabeReviewCriteria): number {
  let totalWeight = 0;
  let weightedSum = 0;

  IMPORTANT_AMENITIES.forEach(({ key, weight }) => {
    totalWeight += weight;
    weightedSum += criteria[key as keyof BurkinabeReviewCriteria] * weight;
  });

  return Math.round((weightedSum / totalWeight) * 10) / 10;
}

// Composant principal du système d'avis
interface BurkinabeReviewSystemProps {
  propertyId?: string;
  reviews?: BurkinabeReview[];
  onSubmitReview?: (review: Partial<BurkinabeReview>) => void;
  className?: string;
}

export const BurkinabeReviewSystem: React.FC<BurkinabeReviewSystemProps> = ({
  propertyId,
  reviews = DEMO_REVIEWS,
  onSubmitReview,
  className
}) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState<Partial<BurkinabeReview>>({
    criteria: {
      quality: 0,
      neighborhood: 0,
      valueForMoney: 0,
      proximity: 0,
      security: 0,
      waterAccess: 0,
      electricity: 0,
      internet: 0,
      parking: 0,
      landlordRelation: 0
    },
    comment: '',
    wouldRecommend: true
  });

  // Calculer les statistiques d'avis
  const reviewStats = {
    total: reviews.length,
    averageRating: reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length,
    recommendationRate: reviews.filter(r => r.wouldRecommend).length / reviews.length * 100,
    verifiedReviews: reviews.filter(r => r.verified).length
  };

  const handleSubmitReview = () => {
    if (!newReview.criteria) return;

    const overallRating = calculateOverallRating(newReview.criteria);
    const review: Partial<BurkinabeReview> = {
      ...newReview,
      overallRating,
      reviewDate: new Date().toISOString(),
      propertyId: propertyId || 'unknown',
      helpfulVotes: 0,
      verified: true
    };

    onSubmitReview?.(review);
    setShowReviewForm(false);
    setNewReview({
      criteria: {
        quality: 0,
        neighborhood: 0,
        valueForMoney: 0,
        proximity: 0,
        security: 0,
        waterAccess: 0,
        electricity: 0,
        internet: 0,
        parking: 0,
        landlordRelation: 0
      },
      comment: '',
      wouldRecommend: true
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Vue d'ensemble des avis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Avis des locataires</span>
                <Badge variant="secondary">{reviewStats.total} avis</Badge>
              </CardTitle>
              <CardDescription>
                Retours d'expérience authentiques sur les logements d'Ouagadougou
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-primary hover:bg-primary-dark"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Laisser un avis
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {reviewStats.averageRating.toFixed(1)}/5
              </div>
              <div className="flex items-center justify-center mt-1">
                <InteractiveStarRating rating={Math.round(reviewStats.averageRating)} disabled size="sm" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Note moyenne</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(reviewStats.recommendationRate)}%
              </div>
              <p className="text-sm text-gray-600 mt-1">Recommandent</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {reviewStats.verifiedReviews}
              </div>
              <p className="text-sm text-gray-600 mt-1">Avis vérifiés</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Certifiés ANSUT</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire d'avis */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Partagez votre expérience</CardTitle>
              <CardDescription>
                Votre avis aide d'autres locataires à faire le bon choix
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ReviewCriteriaForm
                criteria={newReview.criteria!}
                onChange={(criteria) => setNewReview({ ...newReview, criteria })}
              />
              
              <div className="space-y-2">
                <Label htmlFor="comment">Votre avis général</Label>
                <Textarea
                  id="comment"
                  placeholder="Décrivez votre expérience de location, les points positifs et négatifs..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Recommanderiez-vous ce logement ?</Label>
                <div className="flex space-x-4">
                  <Button
                    variant={newReview.wouldRecommend ? "default" : "outline"}
                    onClick={() => setNewReview({ ...newReview, wouldRecommend: true })}
                    className="flex items-center space-x-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Oui, je recommande</span>
                  </Button>
                  <Button
                    variant={!newReview.wouldRecommend ? "destructive" : "outline"}
                    onClick={() => setNewReview({ ...newReview, wouldRecommend: false })}
                    className="flex items-center space-x-2"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>Non, je ne recommande pas</span>
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={!newReview.criteria || Object.values(newReview.criteria).every(v => v === 0)}
                >
                  Publier mon avis
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Liste des avis */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="reviews">Tous les avis ({reviews.length})</TabsTrigger>
          <TabsTrigger value="criteria">Analyse par critères</TabsTrigger>
          <TabsTrigger value="photos">Avis avec photos</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{review.reviewerName}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Vérifié
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {review.propertyType} à {review.neighborhood} • {review.leaseDuration}
                      </p>
                      <div className="flex items-center space-x-2">
                        <InteractiveStarRating rating={Math.round(review.overallRating)} disabled size="sm" />
                        <span className="text-sm font-medium">{review.overallRating}/5</span>
                        <Badge variant={review.wouldRecommend ? "default" : "destructive"}>
                          {review.wouldRecommend ? 'Recommande' : 'Ne recommande pas'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{new Date(review.reviewDate).toLocaleDateString('fr-FR')}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{review.helpfulVotes} utile</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  {/* Détail par critères */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                    {IMPORTANT_AMENITIES.slice(0, 5).map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="text-xs text-gray-600">{label}</div>
                          <InteractiveStarRating 
                            rating={review.criteria[key as keyof BurkinabeReviewCriteria]} 
                            disabled 
                            size="sm" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="criteria">
          <Card>
            <CardHeader>
              <CardTitle>Notes moyennes par critère</CardTitle>
              <CardDescription>
                Moyennes calculées sur tous les avis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {IMPORTANT_AMENITIES.map(({ key, label, icon: Icon, weight }) => {
                  const avgRating = reviews.reduce((sum, r) => 
                    sum + r.criteria[key as keyof BurkinabeReviewCriteria], 0) / reviews.length;
                  
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium">{label}</h4>
                          <p className="text-xs text-gray-500">Pondération: {Math.round(weight * 100)}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <InteractiveStarRating rating={Math.round(avgRating)} disabled size="sm" />
                        <span className="text-sm font-medium text-gray-700">
                          {avgRating.toFixed(1)}/5
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <div className="text-center py-8 text-gray-500">
            <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun avis avec photo pour le moment</p>
            <p className="text-sm">Les locataires pourront bientôt ajouter des photos de leurs logements</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BurkinabeReviewSystem;