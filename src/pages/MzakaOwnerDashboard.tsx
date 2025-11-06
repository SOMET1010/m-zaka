import React, { useState } from 'react';
import { Home, FileText, DollarSign, Settings, TrendingUp, Calendar, Users, Plus, Download, Eye, MessageCircle, BarChart3, PieChart } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';

const MzakaOwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('biens');

  // Données demo pour le dashboard propriétaire
  const monthlyStats = {
    revenue: 1850000,
    activeProperties: 8,
    occupancyRate: 87.5,
    pendingApplications: 12
  };

  const properties = [
    {
      id: 1,
      title: "Appartement T3 - Ouaga 2000",
      rent: 250000,
      status: "Occupé",
      lastPayment: "15/10/2025",
      tenant: "Paul KONÉ",
      nextPayment: "15/11/2025"
    },
    {
      id: 2,
      title: "Villa - Koulouba", 
      rent: 450000,
      status: "Libre",
      lastPayment: "N/A",
      tenant: "N/A",
      nextPayment: "N/A"
    },
    {
      id: 3,
      title: "Studio - Gounghin",
      rent: 85000,
      status: "Occupé", 
      lastPayment: "01/10/2025",
      tenant: "Aminata TRAORE",
      nextPayment: "01/11/2025"
    }
  ];

  const recentPayments = [
    { date: "15/10/2025", property: "Appartement T3 - Ouaga 2000", amount: 250000, tenant: "Paul KONÉ", status: "Reçu" },
    { date: "01/10/2025", property: "Studio - Gounghin", amount: 85000, tenant: "Aminata TRAORE", status: "Reçu" },
    { date: "28/09/2025", property: "Bureau - Centre-ville", amount: 150000, tenant: "Sarl FasoTech", status: "En retard" }
  ];

  const sidebarMenu = [
    { id: 'biens', label: '🏠 Biens', icon: Home },
    { id: 'contrats', label: '📜 Contrats', icon: FileText },
    { id: 'paiements', label: '💰 Paiements', icon: DollarSign },
    { id: 'statistiques', label: '📊 Statistiques', icon: BarChart3 },
    { id: 'parametres', label: '⚙️ Paramètres', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-beige-faso">
      <HeaderMzaka userType="proprietaire" userName="Paul KONÉ" notifications={5} />
      
      <div className="flex">
        {/* Sidebar verte selon maquette */}
        <aside className="w-80 bg-vert-sahel text-white p-6 min-h-screen">
          <div className="mb-8">
            <h2 className="text-xl font-poppins font-bold mb-2">Tableau de bord</h2>
            <p className="text-white/80 font-nunito text-sm">Gestion de vos propriétés</p>
          </div>
          
          <nav className="space-y-2">
            {sidebarMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    activeTab === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-nunito">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        
        {/* Contenu principal */}
        <main className="flex-1 p-6">
          {activeTab === 'biens' && (
            <div>
              {/* Statistiques selon maquette */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Revenus du mois</p>
                      <p className="text-2xl font-poppins font-bold text-rouge-burkina">
                        {monthlyStats.revenue.toLocaleString()} FCFA
                      </p>
                    </div>
                    <div className="bg-rouge-burkina/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-rouge-burkina" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-vert-sahel mr-1" />
                    <span className="text-vert-sahel">+12% vs mois dernier</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Biens actifs</p>
                      <p className="text-2xl font-poppins font-bold text-vert-sahel">
                        {monthlyStats.activeProperties}
                      </p>
                    </div>
                    <div className="bg-vert-sahel/10 p-3 rounded-full">
                      <Home className="h-6 w-6 text-vert-sahel" />
                    </div>
                  </div>
                  <p className="text-sm text-terre-sombre/60">7 ocupés, 1 libre</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Taux d'occupation</p>
                      <p className="text-2xl font-poppins font-bold text-or-soleil">
                        {monthlyStats.occupancyRate}%
                      </p>
                    </div>
                    <div className="bg-or-soleil/10 p-3 rounded-full">
                      <BarChart3 className="h-6 w-6 text-or-soleil" />
                    </div>
                  </div>
                  <div className="w-full bg-gris-clair rounded-full h-2">
                    <div 
                      className="bg-or-soleil h-2 rounded-full" 
                      style={{ width: `${monthlyStats.occupancyRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Candidatures</p>
                      <p className="text-2xl font-poppins font-bold text-rouge-burkina">
                        {monthlyStats.pendingApplications}
                      </p>
                    </div>
                    <div className="bg-rouge-burkina/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-rouge-burkina" />
                    </div>
                  </div>
                  <p className="text-sm text-terre-sombre/60">En attente de review</p>
                </div>
              </div>
              
              {/* Actions rapides */}
              <div className="flex flex-wrap gap-4 mb-8">
                <ButtonMzaka variant="primary" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un bien
                </ButtonMzaka>
                <ButtonMzaka variant="outline" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter PDF
                </ButtonMzaka>
                <ButtonMzaka variant="outline" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Rapport détaillé
                </ButtonMzaka>
              </div>
              
              {/* Graphiques or/rouge selon maquette */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Graphique revenus mensuels */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-4">Revenus mensuels</h3>
                  <div className="h-48 bg-gradient-to-br from-or-soleil/10 to-rouge-burkina/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-or-soleil mx-auto mb-2" />
                      <p className="text-terre-sombre/60 font-nunito">Graphique revenus</p>
                      <p className="text-terre-sombre/40 font-nunito text-sm">Tendance croissante</p>
                    </div>
                  </div>
                </div>
                
                {/* Graphique taux d'occupation */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-4">Taux d'occupation</h3>
                  <div className="h-48 bg-gradient-to-br from-vert-sahel/10 to-or-soleil/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-vert-sahel mx-auto mb-2" />
                      <p className="text-terre-sombre/60 font-nunito">87.5% occupé</p>
                      <p className="text-terre-sombre/40 font-nunito text-sm">4.5% en dessous objectif</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Liste des propriétés selon maquette */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gris-clair/20">
                  <h3 className="font-poppins font-bold text-terre-sombre">Mes propriétés</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-beige-faso">
                      <tr>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Bien</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Loyer</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Statut</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Locataire</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Dernier paiement</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr key={property.id} className="border-b border-gris-clair/10 hover:bg-beige-faso/50">
                          <td className="p-4">
                            <div className="font-nunito font-medium text-terre-sombre">{property.title}</div>
                          </td>
                          <td className="p-4">
                            <span className="font-poppins font-bold text-rouge-burkina">
                              {property.rent.toLocaleString()} FCFA
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              property.status === 'Occupé' 
                                ? 'bg-vert-sahel/20 text-vert-sahel' 
                                : 'bg-or-soleil/20 text-or-soleil'
                            }`}>
                              {property.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-nunito text-terre-sombre/80">{property.tenant}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-nunito text-terre-sombre/80">{property.lastPayment}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <ButtonMzaka variant="outline" className="p-2">
                                <Eye className="h-4 w-4" />
                              </ButtonMzaka>
                              <ButtonMzaka variant="outline" className="p-2">
                                <MessageCircle className="h-4 w-4" />
                              </ButtonMzaka>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'paiements' && (
            <div>
              <h2 className="text-2xl font-poppins font-bold text-terre-sombre mb-6">Historique des paiements</h2>
              
              <div className="bg-white rounded-xl shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-beige-faso">
                      <tr>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Date</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Propriété</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Locataire</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Montant</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.map((payment, index) => (
                        <tr key={index} className="border-b border-gris-clair/10">
                          <td className="p-4 font-nunito text-terre-sombre">{payment.date}</td>
                          <td className="p-4 font-nunito text-terre-sombre/80">{payment.property}</td>
                          <td className="p-4 font-nunito text-terre-sombre/80">{payment.tenant}</td>
                          <td className="p-4 font-poppins font-bold text-rouge-burkina">
                            {payment.amount.toLocaleString()} FCFA
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'Reçu' 
                                ? 'bg-vert-sahel/20 text-vert-sahel' 
                                : 'bg-rouge-burkina/20 text-rouge-burkina'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'statistiques' && (
            <div>
              <h2 className="text-2xl font-poppins font-bold text-terre-sombre mb-6">Statistiques détaillées</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-4">Performance mensuelle</h3>
                  <div className="h-64 bg-gradient-to-br from-rouge-burkina/5 to-or-soleil/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-rouge-burkina mx-auto mb-2" />
                      <p className="text-terre-sombre/60 font-nunito">Graphique de performance</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-4">Répartition des revenus</h3>
                  <div className="h-64 bg-gradient-to-br from-or-soleil/5 to-vert-sahel/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-or-soleil mx-auto mb-2" />
                      <p className="text-terre-sombre/60 font-nunito">Graphique de répartition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MzakaOwnerDashboard;