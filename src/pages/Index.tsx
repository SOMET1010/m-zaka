import { MainLayout } from "@/components/layout/MainLayout";
import { DynamicHeroSection } from "@/components/home/DynamicHeroSection";
import { PropertyGrid } from "@/components/PropertyGrid";
import FeaturedProperties from "@/components/FeaturedProperties";
import { KeyStats } from "@/components/KeyStats";
import OnboardingModal from "@/components/OnboardingModal";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ShieldCheck, Home, Users, MapPin } from "lucide-react";

const Index = () => {
  console.log('[Index] Rendering MZAKA Index page with Burkina Faso design');
  return (
    <MainLayout>
      <Helmet>
        <title>MZAKA - Plateforme Immobilière Ouagadougou | Biens Certifiés Faso Dan Fani</title>
        <meta 
          name="description" 
          content="Trouvez votre logement idéal à Ouagadougou. Biens vérifiés, e-Bail digital, paiements Mobile Money. Plus de 520+ propriétés dans 10 quartiers de la capitale burkinabè." 
        />
        <link rel="canonical" href="https://mzaka.bf" />
      </Helmet>

      <main role="main">
        {/* Hero avec image Ouagadougou */}
        <DynamicHeroSection />
        
        {/* 3 Cartes Valeurs - Transparence, Sécurité, Support */}
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-earth-dark">
                Pourquoi choisir MZAKA ?
              </h2>
              <p className="text-lg text-earth-500 max-w-2xl mx-auto">
                La plateforme immobilière qui confiance et transparence avec l'identité Faso Dan Fani
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface p-8 rounded-organic-lg shadow-earth text-center">
                <div className="w-16 h-16 bg-sun-gold-50 rounded-organic-xl mx-auto mb-6 flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-sun-gold-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-earth-dark">Transparence Mobile Money</h3>
                <p className="text-earth-500">
                  Paiements sécurisés via Orange Money, Moov Money, Coris Money et Wave. Frais transparents 0.8%-1.2%.
                </p>
              </div>
              <div className="bg-surface p-8 rounded-organic-lg shadow-earth text-center">
                <div className="w-16 h-16 bg-sahel-green-50 rounded-organic-xl mx-auto mb-6 flex items-center justify-center">
                  <Home className="h-8 w-8 text-sahel-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-earth-dark">Sécurité e-Bail eIDAS</h3>
                <p className="text-earth-500">
                  Contrats de bail numériques conformes aux standards eIDAS/UEMOA. Signature électronique sécurisée.
                </p>
              </div>
              <div className="bg-surface p-8 rounded-organic-lg shadow-earth text-center">
                <div className="w-16 h-16 bg-burkina-red-50 rounded-organic-xl mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-8 w-8 text-burkina-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-earth-dark">Support Local 24/7</h3>
                <p className="text-earth-500">
                  Équipe locale à Ouagadougou pour vous accompagner. Assistance en français et langues locales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Propriétés Vedettes */}
        <section className="py-16 bg-faso-beige-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-earth-dark">
                Propriétés Vedettes
              </h2>
              <p className="text-lg text-earth-500 max-w-2xl mx-auto">
                Découvrez notre sélection premium dans les quartiers les plus recherchés d'Ouagadougou
              </p>
            </div>
            <FeaturedProperties limit={4} />
            <div className="text-center mt-8">
              <Link to="/recherche">
                <Button size="lg" className="bg-burkina-red-500 hover:bg-burkina-red-600 text-white">
                  Voir tous les biens
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quartiers Populaires */}
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-earth-dark">
                Quartiers Populaires
              </h2>
              <p className="text-lg text-earth-500 max-w-2xl mx-auto">
                Explorez les 10 quartiers d'Ouagadougou avec nos données en temps réel
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Ouaga 2000', price: '350k FCFA', score: 9, color: 'bg-violet-500' },
                { name: 'Kombissiri', price: '250k FCFA', score: 8, color: 'bg-burkina-red-500' },
                { name: 'Basilea', price: '200k FCFA', score: 8, color: 'bg-sun-gold-500' },
                { name: 'Gounghin', price: '190k FCFA', score: 7, color: 'bg-sahel-green-500' },
                { name: 'Azimmo', price: '180k FCFA', score: 7, color: 'bg-blue-500' },
              ].map((quartier, index) => (
                <div key={index} className="bg-surface p-6 rounded-organic-lg shadow-earth text-center hover:shadow-earth-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 ${quartier.color} rounded-organic mx-auto mb-4 flex items-center justify-center`}>
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-earth-dark mb-2">{quartier.name}</h3>
                  <p className="text-sun-gold-500 font-semibold">{quartier.price}</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-sm text-earth-500 mr-1">Score:</span>
                    <span className="text-sm font-bold text-earth-dark">{quartier.score}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA e-Bail Module */}
        <section className="py-16 bg-gradient-to-r from-sahel-green-500 to-sahel-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              e-Bail Digital - L'Innovation Faso Dan Fani
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Révolutionnez vos transactions locatives avec notre module e-Bail en 4 étapes : 
              <strong>Génération</strong> → <strong>Signature Électronique</strong> → <strong>Paiement Mobile Money</strong> → <strong>Quittance Automatique</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guide">
                <Button size="lg" className="bg-white text-sahel-green-600 hover:bg-gray-100 min-w-[220px]">
                  Découvrir e-Bail
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 min-w-[220px]">
                  Créer mon compte
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <OnboardingModal />
    </MainLayout>
  );
};

export default Index;