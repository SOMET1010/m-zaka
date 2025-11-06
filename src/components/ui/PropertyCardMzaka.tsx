import React, { useState } from 'react';
import { Heart, MapPin, Home, Car, Wifi, Shield, Zap, Droplets, Eye, Phone } from 'lucide-react';
import ButtonMzaka from './ButtonMzaka';

interface PropertyCardMzakaProps {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  neighborhood: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  features?: string[];
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onView?: (id: string) => void;
  onContact?: (id: string) => void;
  distance?: string;
  rating?: number;
  reviews?: number;
  available?: boolean;
  waterAccess?: 'good' | 'average' | 'poor';
  electricityAccess?: 'good' | 'average' | 'poor';
  securityLevel?: 'high' | 'medium' | 'low';
}

const PropertyCardMzaka: React.FC<PropertyCardMzakaProps> = ({
  id,
  title,
  type,
  price,
  location,
  neighborhood,
  image,
  bedrooms,
  bathrooms,
  surface,
  features = [],
  isFavorite = false,
  onFavoriteToggle,
  onView,
  onContact,
  distance = '',
  rating = 0,
  reviews = 0,
  available = true,
  waterAccess = 'average',
  electricityAccess = 'average',
  securityLevel = 'medium',
}) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Formatage du prix en FCFA
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('XOF', 'FCFA');
  };

  // Couleurs des indicateurs de qualité
  const getQualityColor = (quality: 'good' | 'average' | 'poor') => {
    switch (quality) {
      case 'good': return 'text-sahel-green';
      case 'average': return 'text-sun-gold';
      case 'poor': return 'text-burkina-red';
      default: return 'text-earth-dark-400';
    }
  };

  const getSecurityColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'text-sahel-green';
      case 'medium': return 'text-sun-gold';
      case 'low': return 'text-burkina-red';
      default: return 'text-earth-dark-400';
    }
  };

  return (
    <div className="card-mzaka group relative overflow-hidden animate-fade-in">
      {/* Image avec overlay prix */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-organic-lg mb-4">
        {isImageLoading && (
          <div className="absolute inset-0 bg-faso-beige-200 animate-pulse flex items-center justify-center">
            <Home className="w-12 h-12 text-faso-beige-400" />
          </div>
        )}
        {!imageError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={() => setIsImageLoading(false)}
            onError={() => {
              setImageError(true);
              setIsImageLoading(false);
            }}
          />
        ) : (
          <div className="w-full h-full bg-faso-beige-200 flex items-center justify-center">
            <Home className="w-12 h-12 text-faso-beige-400" />
          </div>
        )}
        
        {/* Badge statut */}
        <div className="absolute top-3 left-3">
          {available ? (
            <span className="bg-sahel-green text-white px-3 py-1 rounded-organic font-body font-medium text-sm">
              Disponible
            </span>
          ) : (
            <span className="bg-earth-dark text-white px-3 py-1 rounded-organic font-body font-medium text-sm">
              Occupé
            </span>
          )}
        </div>

        {/* Prix sur fond doré */}
        <div className="absolute top-3 right-3">
          <div className="bg-sun-gold text-earth-dark px-3 py-2 rounded-organic font-display font-bold text-lg shadow-gold">
            {formatPrice(price)}
          </div>
        </div>

        {/* Bouton favoris */}
        <button
          onClick={() => onFavoriteToggle?.(id)}
          className={`absolute bottom-3 right-3 p-2 rounded-organic-lg transition-all duration-200 touch-target ${
            isFavorite
              ? 'bg-burkina-red text-white shadow-red'
              : 'bg-white/80 text-earth-dark hover:bg-burkina-red hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Indicateurs de qualité */}
        <div className="absolute bottom-3 left-3 flex space-x-2">
          <div className="flex items-center space-x-1 bg-white/80 px-2 py-1 rounded-organic">
            <Droplets className={`w-4 h-4 ${getQualityColor(waterAccess)}`} />
          </div>
          <div className="flex items-center space-x-1 bg-white/80 px-2 py-1 rounded-organic">
            <Zap className={`w-4 h-4 ${getQualityColor(electricityAccess)}`} />
          </div>
          <div className="flex items-center space-x-1 bg-white/80 px-2 py-1 rounded-organic">
            <Shield className={`w-4 h-4 ${getSecurityColor(securityLevel)}`} />
          </div>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="space-y-3">
        {/* Titre et type */}
        <div>
          <h3 className="font-display text-xl font-bold text-earth-dark line-clamp-1 group-hover:text-burkina-red transition-colors">
            {title}
          </h3>
          <p className="font-body text-earth-dark-600 text-lg">{type}</p>
        </div>

        {/* Localisation */}
        <div className="flex items-center space-x-2 text-earth-dark-600">
          <MapPin className="w-5 h-5 text-sahel-green flex-shrink-0" />
          <span className="font-body text-lg">{neighborhood}, {location}</span>
          {distance && (
            <span className="font-body text-sm text-sun-gold">• {distance}</span>
          )}
        </div>

        {/* Caractéristiques */}
        <div className="flex items-center space-x-4 text-earth-dark-600">
          <div className="flex items-center space-x-1">
            <span className="font-body text-lg font-semibold">{bedrooms}</span>
            <span className="font-body text-sm">ch</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-body text-lg font-semibold">{bathrooms}</span>
            <span className="font-body text-sm">sdb</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-body text-lg font-semibold">{surface}</span>
            <span className="font-body text-sm">m²</span>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-faso-beige-200 text-earth-dark px-3 py-1 rounded-organic font-body text-sm"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="bg-sun-gold text-earth-dark px-3 py-1 rounded-organic font-body text-sm font-semibold">
                +{features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Note et avis */}
        {rating > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < rating ? 'text-sun-gold' : 'text-earth-dark-200'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="font-body text-sm text-earth-dark-600">
              {rating}/5 ({reviews} avis)
            </span>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex space-x-3 pt-2">
          <ButtonMzaka
            variant="primary"
            size="md"
            onClick={() => onView?.(id)}
            icon={<Eye className="w-5 h-5" />}
            className="flex-1"
          >
            Voir Détails
          </ButtonMzaka>
          <ButtonMzaka
            variant="secondary"
            size="md"
            onClick={() => onContact?.(id)}
            icon={<Phone className="w-5 h-5" />}
            className="flex-1"
          >
            Contacter
          </ButtonMzaka>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardMzaka;