import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Building, Heart, Star, Phone } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';

const MzakaHomePage: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    ville: 'Ouagadougou',
    type: 'Tous',
    budget: 'Tous',
    quartier: 'Tous'
  });

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Données demo pour 3 cartes valeurs
  const valueCards = [
    {
      icon: <Home className="h-8 w-8 text-vert-sahel" />,
      title: "Transparence",
      description: "Prix, conditions et procédures entièrement transparentes pour tous nos utilisateurs.",
      color: "bg-gradient-to-br from-vert-sahel/10 to-vert-sahel/5"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-rouge-burkina" />,
      title: "Paiement Local", 
      description: "Orange Money, Moov Africa, Coris Money et Wave pour des transactions sécurisées.",
      color: "bg-gradient-to-br from-rouge-burkina/10 to-rouge-burkina/5"
    },
    {
      icon: <Phone className="h-8 w-8 text-or-soleil" />,
      title: "Sécurité Numérique",
      description: "Protection avancée des données et assistance technique 24h/24.",
      color: "bg-gradient-to-br from-or-soleil/10 to-or-soleil/5"
    }
  ];

  // Villes couvertes selon la maquette
  const cities = [
    { name: "Ouagadougou", status: "active" },
    { name: "Bobo-Dioulasso", status: "active" },
    { name: "Koudougou", status: "active" },
    { name: "Ouahigouya", status: "active" },
    { name: "Banfora", status: "coming_soon" }
  ];

  return (
    <div className="min-h-screen bg-beige-faso">
      {/* Header selon maquette */}
      <HeaderMzaka userType="locataire" userName="Paul" notifications={3} />
      
      {/* Bannière plein écran - Ouagadougou au coucher du soleil */}
      <section className="relative h-[70vh] bg-gradient-to-r from-rouge-burkina/20 to-or-soleil/30">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero/ouagadougou-sunset.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rouge-burkina/60 to-vert-sahel/40" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          {/* Slogan officiel */}
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6 max-w-4xl">
            Votre maison, votre confiance, votre Faso.
          </h1>
          
          {/* Barre de recherche central selon maquette */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-vert-sahel" />
                <select
                  value={searchFilters.ville}
                  onChange={(e) => setSearchFilters({...searchFilters, ville: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gris-clair rounded-lg text-terre-sombre font-nunito focus:ring-2 focus:ring-or-soleil focus:border-transparent"
                >
                  <option value="Ouagadougou">Ouagadougou</option>
                  <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                  <option value="Koudougou">Koudougou</option>
                  <option value="Ouahigouya">Ouahigouya</option>
                </select>
              </div>
              
              <div className="relative">
                <Home className="absolute left-3 top-3 h-5 w-5 text-vert-sahel" />
                <select
                  value={searchFilters.type}
                  onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gris-clair rounded-lg text-terre-sombre font-nunito focus:ring-2 focus:ring-or-soleil focus:border-transparent"
                >
                  <option value="Tous">Tous types</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Maison">Maison</option>
                  <option value="Bureau">Bureau</option>
                  <option value="Magasin">Magasin</option>
                </select>
              </div>
              
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-vert-sahel" />
                <select
                  value={searchFilters.budget}
                  onChange={(e) => setSearchFilters({...searchFilters, budget: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gris-clair rounded-lg text-terre-sombre font-nunito focus:ring-2 focus:ring-or-soleil focus:border-transparent"
                >
                  <option value="Tous">Tous budgets</option>
                  <option value="50000-100000">50K - 100K FCFA</option>
                  <option value="100000-200000">100K - 200K FCFA</option>
                  <option value="200000-500000">200K - 500K FCFA</option>
                  <option value="500000+">500K+ FCFA</option>
                </select>
              </div>
              
              <ButtonMzaka variant="primary" className="py-3">
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </ButtonMzaka>
            </div>
            
            {/* Recherche vocale selon maquette */}
            <div className="flex justify-center">
              <ButtonMzaka variant="outline" className="flex items-center">
                🎤 Recherche vocale disponible
              </ButtonMzaka>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3 cartes valeurs alignées selon maquette */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueCards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} rounded-2xl p-8 text-center border border-gris-clair/20 hover:shadow-lg transition-all duration-300`}
              >
                <div className="mb-4 flex justify-center">
                  {card.icon}
                </div>
                <h3 className="text-xl font-poppins font-bold text-terre-sombre mb-3">
                  {card.title}
                </h3>
                <p className="text-terre-sombre/80 font-nunito leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Carte du Burkina avec zones couvertes */}
      <section className="py-16 px-4 bg-vert-sahel/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-poppins font-bold text-terre-sombre mb-8">
            Zones Couvertes au Burkina Faso
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="relative w-full h-96 bg-gradient-to-br from-beige-faso to-vert-sahel/10 rounded-xl">
              {/* Simulation carte du Burkina */}
              <div className="absolute inset-4 flex flex-col justify-center items-center">
                <div className="text-center mb-6">
                  <div className="text-2xl font-poppins font-bold text-vert-sahel mb-2">
                    🇧🇫 RÉPUBLIQUE DU BURKINA FASO
                  </div>
                  <p className="text-terre-sombre/80 font-nunito">
                    Plateforme 100% locale, opérée par Infosec Burkina
                  </p>
                </div>
                
                {/* Villes selon maquette */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-2xl">
                  {cities.map((city, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        city.status === 'active' 
                          ? 'bg-vert-sahel text-white' 
                          : 'bg-gris-clair text-terre-sombre/60'
                      }`}
                    >
                      <div className="font-nunito font-medium text-sm">
                        {city.name}
                      </div>
                      <div className="text-xs mt-1">
                        {city.status === 'active' ? '✓ Opérationnel' : 'Bientôt'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bouton flottant "Publier un bien" selon maquette */}
      <div className="fixed bottom-6 right-6 z-50">
        <ButtonMzaka variant="primary" className="rounded-full w-16 h-16 shadow-2xl">
          <Home className="h-6 w-6" />
        </ButtonMzaka>
      </div>
      
      {/* Footer vert foncé selon maquette */}
      <footer className="bg-vert-sahel text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-poppins font-bold mb-2">© Infosec Burkina</h3>
              <p className="text-white/80">Première plateforme immobilière 100% burkinabè</p>
            </div>
            <div>
              <h3 className="font-poppins font-bold mb-2">🇧🇫 Multilingue</h3>
              <p className="text-white/80">Français • Mooré • Dioula • English</p>
            </div>
            <div>
              <h3 className="font-poppins font-bold mb-2">Contact</h3>
              <p className="text-white/80">support@mzaka.bf • +226 XX XX XX XX</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MzakaHomePage;