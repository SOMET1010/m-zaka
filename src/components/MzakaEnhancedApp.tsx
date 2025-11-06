import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Import des composants améliorés
import SimplifiedNavbar from '@/components/navigation/SimplifiedNavbar';
import BurkinabeMarketDashboard from '@/components/dashboard/BurkinabeMarketDashboard';
import BurkinabeReviewSystem from '@/components/reviews/BurkinabeReviewSystem';
import PropertyGrid from '@/components/PropertyGrid';
import { OUAGADOUGOU_NEIGHBORHOODS } from '@/data/ouagadougouNeighborhoods';

// Pages existantes
import Home from '@/pages/Index';
import Explorer from '@/pages/Explorer';
import About from '@/pages/AboutPage';
import Help from '@/pages/Aide';
import Dashboard from '@/pages/Dashboard';

// Styles optimisés
import '@/styles/mzaka-burkina.css';

// Configuration du client de requêtes
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

/**
 * Composant principal M'ZAKA avec améliorations UX/UI
 * Intègre toutes les optimisations pour le marché burkinabé
 */
function MzakaEnhancedApp() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {/* Navigation améliorée */}
            <SimplifiedNavbar />
            
            {/* Contenu principal */}
            <main className="flex-1">
              <Routes>
                {/* Page d'accueil avec hero optimisé */}
                <Route path="/" element={<Home />} />
                
                {/* Explorer avec filtres améliorés */}
                <Route 
                  path="/explorer" 
                  element={
                    <div className="container mx-auto px-4 py-8">
                      <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                          🏠 Logements à Ouagadougou
                        </h1>
                        <p className="text-lg text-gray-600">
                          Découvrez {520}+ propriétés dans {OUAGADOUGOU_NEIGHBORHOODS.length} quartiers d'Ouagadougou
                        </p>
                      </div>
                      <PropertyGrid limit={20} showFilters={true} />
                    </div>
                  } 
                />
                
                {/* Dashboard avec statistiques locales */}
                <Route 
                  path="/dashboard" 
                  element={
                    <div className="container mx-auto px-4 py-8">
                      <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                          📊 Tableau de bord - Marché d'Ouagadougou
                        </h1>
                        <p className="text-lg text-gray-600">
                          Statistiques et analyses du marché immobilier burkinabé
                        </p>
                      </div>
                      <BurkinabeMarketDashboard />
                    </div>
                  } 
                />
                
                {/* Page d'avis avec système local */}
                <Route 
                  path="/avis/:propertyId?" 
                  element={
                    <div className="container mx-auto px-4 py-8">
                      <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                          ⭐ Avis des locataires
                        </h1>
                        <p className="text-lg text-gray-600">
                          Retours d'expérience authentiques sur les logements d'Ouagadougou
                        </p>
                      </div>
                      <BurkinabeReviewSystem />
                    </div>
                  } 
                />
                
                {/* À propos adapté au contexte local */}
                <Route 
                  path="/a-propos" 
                  element={
                    <div className="container mx-auto px-4 py-8">
                      <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                          <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            M'ZAKA - Le logement en toute confiance
                          </h1>
                          <p className="text-xl text-gray-600">
                            La première plateforme immobilière certifiée ANSUT pour le Burkina Faso
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3 text-primary">
                              🎯 Notre mission
                            </h3>
                            <p className="text-gray-700">
                              Faciliter l'accès au logement au Burkina Faso en offrant une plateforme 
                              transparente, sécurisée et adaptée aux réalités locales.
                            </p>
                          </div>
                          
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3 text-secondary">
                              🏆 Nos valeurs
                            </h3>
                            <ul className="text-gray-700 space-y-1">
                              <li>• Transparence et confiance</li>
                              <li>• Innovation locale</li>
                              <li>• Service client de qualité</li>
                              <li>• Sécurité des transactions</li>
                            </ul>
                          </div>
                        </div>

                        <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
                          <h3 className="text-xl font-semibold mb-3 text-primary">
                            📍 Couverture géographique
                          </h3>
                          <p className="text-gray-700 mb-4">
                            M'ZAKA couvre actuellement {OUAGADOUGOU_NEIGHBORHOODS.length} quartiers d'Ouagadougou :
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {OUAGADOUGOU_NEIGHBORHOODS.map((quarter) => (
                              <div key={quarter.id} className="bg-white px-3 py-2 rounded text-sm text-center">
                                {quarter.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  } 
                />
                
                {/* Aide avec contexte local */}
                <Route 
                  path="/aide" 
                  element={
                    <div className="container mx-auto px-4 py-8">
                      <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                          <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            ❓ Centre d'aide M'ZAKA
                          </h1>
                          <p className="text-lg text-gray-600">
                            Tout ce que vous devez savoir sur l'utilisation de la plateforme
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3 text-primary">
                              🏠 Pour les locataires
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                              <li>• Comment rechercher un logement</li>
                              <li>• Comment postuler à une location</li>
                              <li>• Critères de sélection ANSUT</li>
                              <li>• Processus de signature de bail</li>
                            </ul>
                          </div>
                          
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3 text-secondary">
                              🏢 Pour les propriétaires
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                              <li>• Comment publier un bien</li>
                              <li>• Certification ANSUT</li>
                              <li>• Gestion des candidatures</li>
                              <li>• Outils de gestion locative</li>
                            </ul>
                          </div>
                          
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3 text-green-600">
                              💳 Paiements et facturation
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                              <li>• Mobile Money (Orange, Moov)</li>
                              <li>• Virements bancaires</li>
                              <li>• Garanties et dépôts</li>
                              <li>• Facturation automatique</li>
                            </ul>
                          </div>
                          
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3 text-orange-600">
                              🛡️ Sécurité et protection
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                              <li>• Vérification d'identité</li>
                              <li>• Protection des données</li>
                              <li>• Signalement d'arnaques</li>
                              <li>• Support client 24/7</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <h3 className="text-xl font-semibold mb-3 text-orange-800">
                            📞 Contact support
                          </h3>
                          <div className="text-orange-700">
                            <p className="mb-2">
                              <strong>Téléphone :</strong> +226 XX XX XX XX (Gratuit)
                            </p>
                            <p className="mb-2">
                              <strong>Email :</strong> support@mzaka.bf
                            </p>
                            <p>
                              <strong>Heures d'ouverture :</strong> Lundi - Vendredi, 8h - 18h
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  } 
                />
                
                {/* Routes existantes */}
                <Route path="/aide" element={<Help />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* 404 Page */}
                <Route 
                  path="*" 
                  element={
                    <div className="container mx-auto px-4 py-16 text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
                      <a 
                        href="/" 
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Retour à l'accueil
                      </a>
                    </div>
                  } 
                />
              </Routes>
            </main>
            
            {/* Footer amélioré */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">M'ZAKA</h3>
                    <p className="text-gray-300">
                      Le logement en toute confiance au Burkina Faso
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Services</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li><a href="/explorer" className="hover:text-white">Rechercher</a></li>
                      <li><a href="/publier" className="hover:text-white">Publier</a></li>
                      <li><a href="/dashboard" className="hover:text-white">Tableau de bord</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Support</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li><a href="/aide" className="hover:text-white">Aide</a></li>
                      <li><a href="/contact" className="hover:text-white">Contact</a></li>
                      <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Légal</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li><a href="/conditions" className="hover:text-white">Conditions</a></li>
                      <li><a href="/confidentialite" className="hover:text-white">Confidentialité</a></li>
                      <li><a href="/mentions" className="hover:text-white">Mentions légales</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                  <p>&copy; 2024 M'ZAKA. Tous droits réservés. | Certifié ANSUT</p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
        
        {/* Notifications */}
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MzakaEnhancedApp;