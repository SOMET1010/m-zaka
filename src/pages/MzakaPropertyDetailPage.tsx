import React, { useState } from 'react';
import { ArrowLeft, MapPin, Home, Maximize2, Bed, Bath, DollarSign, Star, Heart, Phone, MessageCircle, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';

const MzakaPropertyDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Images de galerie
  const images = [
    "/property-images/appartement-moderne-abidjan.jpg",
    "/property-images/building-moderne.jpg", 
    "/property-images/residence-standing.jpg"
  ];

  // Propriété demo
  const property = {
    id: 1,
    title: "Appartement T3 Moderne - Ouaga 2000",
    type: "Appartement",
    price: 250000,
    priceUnit: "mois",
    currency: "FCFA",
    surface: 120,
    bedrooms: 3,
    bathrooms: 2,
    location: "Ouaga 2000, Ouagadougou",
    description: "Magnifique appartement T3 situé dans le quartier résidentiel d'Ouaga 2000. Cet appartement moderne offre un cadre de vie exceptionnel avec des finitions de qualité. Il dispose d'un salon spacieux, d'une cuisine équipée, de 3 chambres confortables et de 2 salles de bain modernes. L'immeuble dispose d'un parking, d'un système de sécurité 24h/24 et d'un ascenseur. Proche des commodités : école, pharmacie, supermarkets.",
    available: true,
    verified: true,
    images: images,
    landlord: {
      name: "Immobilière Faso Real",
      phone: "+226 XX XX XX XX",
      verified: true,
      responseTime: "Moins de 2h",
      propertiesCount: 12
    },
    neighborhood: {
      rating: 4.2,
      waterQuality: 5,
      electricityQuality: 4,
      securityRating: 4,
      comments: "Quartier sécurisé avec bonnes commodités"
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleTTS = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implémenter la lecture audio TTS en français/mooré/dioula
  };

  return (
    <div className="min-h-screen bg-beige-faso">
      <HeaderMzaka userType="locataire" userName="Paul" />
      
      {/* Galerie photos défilante selon maquette */}
      <section className="relative h-96 bg-terre-sombre">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation galerie */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Indicateurs */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-or-soleil' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Titre + Quartier + Prix selon maquette */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-poppins font-bold text-terre-sombre mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-terre-sombre/60">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-nunito">{property.location}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-poppins font-bold text-rouge-burkina">
                    {property.price.toLocaleString()} {property.currency}
                  </div>
                  <div className="text-terre-sombre/60 font-nunito">
                    par {property.priceUnit}
                  </div>
                </div>
              </div>
              
              {/* Détails rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gris-clair/20">
                <div className="text-center">
                  <Maximize2 className="h-5 w-5 text-vert-sahel mx-auto mb-1" />
                  <div className="font-nunito font-medium text-terre-sombre">{property.surface} m²</div>
                  <div className="text-xs text-terre-sombre/60">Surface</div>
                </div>
                <div className="text-center">
                  <Bed className="h-5 w-5 text-vert-sahel mx-auto mb-1" />
                  <div className="font-nunito font-medium text-terre-sombre">{property.bedrooms}</div>
                  <div className="text-xs text-terre-sombre/60">Chambres</div>
                </div>
                <div className="text-center">
                  <Bath className="h-5 w-5 text-vert-sahel mx-auto mb-1" />
                  <div className="font-nunito font-medium text-terre-sombre">{property.bathrooms}</div>
                  <div className="text-xs text-terre-sombre/60">Salles de bain</div>
                </div>
                <div className="text-center">
                  <DollarSign className="h-5 w-5 text-vert-sahel mx-auto mb-1" />
                  <div className="font-nunito font-medium text-terre-sombre">
                    {(property.price / property.surface).toFixed(0)}
                  </div>
                  <div className="text-xs text-terre-sombre/60">FCFA/m²</div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h2 className="text-xl font-poppins font-bold text-terre-sombre mb-4">
                Description
              </h2>
              <p className="text-terre-sombre/80 font-nunito leading-relaxed mb-4">
                {property.description}
              </p>
              
              {/* Bouton "Écouter l'annonce" selon maquette */}
              <ButtonMzaka
                variant="outline"
                onClick={toggleTTS}
                className="flex items-center"
              >
                <Volume2 className={`h-4 w-4 mr-2 ${isPlaying ? 'text-rouge-burkina' : ''}`} />
                {isPlaying ? 'Arrêter la lecture' : 'Écouter l\'annonce'}
                <span className="ml-2 text-xs text-terre-sombre/60">
                  (Français • Mooré • Dioula)
                </span>
              </ButtonMzaka>
            </div>
            
            {/* Propriétaire / Agence selon maquette */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h2 className="text-xl font-poppins font-bold text-terre-sombre mb-4">
                Propriétaire / Agence
              </h2>
              
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-vert-sahel/10 rounded-full flex items-center justify-center">
                    <Home className="h-8 w-8 text-vert-sahel" />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-poppins font-bold text-terre-sombre mr-2">
                        {property.landlord.name}
                      </h3>
                      {property.landlord.verified && (
                        <span className="bg-vert-sahel text-white px-2 py-1 rounded-full text-xs">
                          ✓ Profil vérifié
                        </span>
                      )}
                    </div>
                    <p className="text-terre-sombre/60 font-nunito text-sm mb-2">
                      {property.landlord.propertiesCount} propriétés • 
                      Réponse moyenne: {property.landlord.responseTime}
                    </p>
                    <p className="text-terre-sombre/60 font-nunito text-sm">
                      {property.landlord.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <ButtonMzaka variant="outline" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </ButtonMzaka>
                  <ButtonMzaka variant="primary" className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    💬 Contacter
                  </ButtonMzaka>
                </div>
              </div>
            </div>
            
            {/* Avis du Quartier avec étoiles colorées selon maquette */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-poppins font-bold text-terre-sombre mb-4">
                Avis du Quartier
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <h3 className="font-nunito font-medium text-terre-sombre mb-2">Eau</h3>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < property.neighborhood.waterQuality 
                            ? 'text-vert-sahel fill-current' 
                            : 'text-gris-clair'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-terre-sombre/60 font-nunito text-sm">
                    Eau potable 24h/24
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="font-nunito font-medium text-terre-sombre mb-2">Électricité</h3>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < property.neighborhood.electricityQuality 
                            ? 'text-or-soleil fill-current' 
                            : 'text-gris-clair'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-terre-sombre/60 font-nunito text-sm">
                    Electricité stable
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="font-nunito font-medium text-terre-sombre mb-2">Sécurité</h3>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < property.neighborhood.securityRating 
                            ? 'text-rouge-burkina fill-current' 
                            : 'text-gris-clair'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-terre-sombre/60 font-nunito text-sm">
                    Quartier sécurisé
                  </p>
                </div>
              </div>
              
              <div className="bg-beige-faso rounded-lg p-4">
                <p className="text-terre-sombre/80 font-nunito italic">
                  "{property.neighborhood.comments}"
                </p>
                <p className="text-terre-sombre/60 font-nunito text-sm mt-2">
                  Moyenne générale: {property.neighborhood.rating}/5 ⭐
                </p>
              </div>
            </div>
          </div>
          
          {/* Sidebar avec mini-carte et CTA */}
          <div className="lg:col-span-1">
            {/* Prix et CTA principal */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-poppins font-bold text-rouge-burkina mb-1">
                  {property.price.toLocaleString()}
                </div>
                <div className="text-terre-sombre/60 font-nunito">
                  {property.currency} par {property.priceUnit}
                </div>
              </div>
              
              <div className="space-y-3">
                <ButtonMzaka variant="primary" className="w-full">
                  Candidater maintenant
                </ButtonMzaka>
                <ButtonMzaka 
                  variant={isLiked ? "primary" : "outline"} 
                  className="w-full"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </ButtonMzaka>
              </div>
            </div>
            
            {/* Mini-carte Mapbox selon maquette */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-poppins font-bold text-terre-sombre mb-4">
                Localisation
              </h3>
              
              <div className="h-48 bg-gradient-to-br from-vert-sahel/20 to-beige-faso rounded-lg relative overflow-hidden">
                {/* Simulation carte */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-rouge-burkina mx-auto mb-2" />
                    <p className="font-nunito text-sm text-terre-sombre/80">
                      {property.location}
                    </p>
                    <p className="font-nunito text-xs text-terre-sombre/60 mt-1">
                      Carte interactive disponible
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <ButtonMzaka variant="outline" className="w-full">
                  Voir sur la carte
                </ButtonMzaka>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommandations de biens similaires selon maquette */}
        <div className="mt-12">
          <h2 className="text-2xl font-poppins font-bold text-terre-sombre mb-6">
            Propriétés similaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Simulation de 3 propriétés similaires */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-vert-sahel/20 to-beige-faso"></div>
                <div className="p-4">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-2">
                    Appartement T3 - Ouaga 2000
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-rouge-burkina font-poppins font-bold">
                      200 000 FCFA/mois
                    </span>
                    <ButtonMzaka variant="outline" className="text-xs">
                      Voir
                    </ButtonMzaka>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MzakaPropertyDetailPage;