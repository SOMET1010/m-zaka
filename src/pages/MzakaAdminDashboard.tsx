import React, { useState } from 'react';
import { Users, Home, DollarSign, Bell, TrendingUp, Shield, Eye, Ban, CheckCircle, AlertTriangle, Download, Send } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';

const MzakaAdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('tableau-global');

  // KPI principaux selon maquette
  const kpis = {
    newUsers: 124,
    validatedProperties: 58,
    totalRevenue: 12500000,
    monthlyGrowth: 15.2,
    activeProperties: 847,
    pendingValidations: 23,
    systemUptime: 99.8,
    fraudAttempts: 3
  };

  const recentUsers = [
    { id: 1, name: "Paul KONÉ", type: "Locataire", status: "Vérifié", date: "25/10/2025", location: "Ouagadougou" },
    { id: 2, name: "Aminata TRAORE", type: "Propriétaire", status: "En attente", date: "24/10/2025", location: "Bobo-Dioulasso" },
    { id: 3, name: "Sarl FasoTech", type: "Agence", status: "Vérifié", date: "23/10/2025", location: "Ouagadougou" },
    { id: 4, name: "Ibrahim SAWADOGO", type: "Locataire", status: "Suspendu", date: "22/10/2025", location: "Koudougou" }
  ];

  const recentProperties = [
    { id: 1, title: "Appartement T3 - Ouaga 2000", owner: "Paul KONÉ", status: "Validé", date: "25/10/2025", price: 250000 },
    { id: 2, title: "Villa - Koulouba", owner: "Aminata TRAORE", status: "En attente", date: "24/10/2025", price: 450000 },
    { id: 3, title: "Studio - Gounghin", owner: "Ibrahim SAWADOGO", status: "Rejeté", date: "23/10/2025", price: 85000 }
  ];

  const recentPayments = [
    { id: 1, user: "Paul KONÉ", amount: 250000, method: "Orange Money", status: "Confirmé", date: "25/10/2025" },
    { id: 2, user: "Aminata TRAORE", amount: 150000, method: "Moov Money", status: "En cours", date: "24/10/2025" },
    { id: 3, user: "Sarl FasoTech", amount: 500000, method: "Wave", status: "Confirmé", date: "23/10/2025" }
  ];

  const systemAlerts = [
    { id: 1, type: "info", message: "Système de paiement Orange Money mis à jour", time: "Il y a 2h" },
    { id: 2, type: "warning", message: "15 propriétés en attente de validation", time: "Il y a 4h" },
    { id: 3, type: "error", message: "Tentative de fraude détectée - IP bloquée", time: "Il y a 6h" }
  ];

  const sidebarMenu = [
    { id: 'tableau-global', label: '📊 Tableau global', icon: TrendingUp },
    { id: 'utilisateurs', label: '👥 Utilisateurs', icon: Users },
    { id: 'biens', label: '🏘️ Biens', icon: Home },
    { id: 'paiements', label: '💳 Paiements', icon: DollarSign },
    { id: 'notifications', label: '📨 Notifications', icon: Bell },
    { id: 'securite', label: '🛡️ Sécurité', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-beige-faso">
      <HeaderMzaka userType="admin" userName="Admin M'ZAKA" notifications={7} />
      
      <div className="flex">
        {/* Sidebar sombre selon maquette */}
        <aside className="w-80 bg-terre-sombre text-white p-6 min-h-screen">
          <div className="mb-8">
            <h2 className="text-xl font-poppins font-bold mb-2">Back-office</h2>
            <p className="text-white/80 font-nunito text-sm">Administration système</p>
          </div>
          
          <nav className="space-y-2">
            {sidebarMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    activeSection === item.id 
                      ? 'bg-rouge-burkina/20 text-white border border-rouge-burkina/30' 
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
          {activeSection === 'tableau-global' && (
            <div>
              {/* KPI principaux selon maquette */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Nouveaux utilisateurs</p>
                      <p className="text-2xl font-poppins font-bold text-rouge-burkina">
                        {kpis.newUsers}
                      </p>
                    </div>
                    <div className="bg-rouge-burkina/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-rouge-burkina" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-vert-sahel mr-1" />
                    <span className="text-vert-sahel">+{kpis.monthlyGrowth}% ce mois</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Biens validés</p>
                      <p className="text-2xl font-poppins font-bold text-vert-sahel">
                        {kpis.validatedProperties}
                      </p>
                    </div>
                    <div className="bg-vert-sahel/10 p-3 rounded-full">
                      <Home className="h-6 w-6 text-vert-sahel" />
                    </div>
                  </div>
                  <p className="text-sm text-terre-sombre/60">{kpis.pendingValidations} en attente</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Revenus totaux</p>
                      <p className="text-2xl font-poppins font-bold text-or-soleil">
                        {(kpis.totalRevenue / 1000000).toFixed(1)}M FCFA
                      </p>
                    </div>
                    <div className="bg-or-soleil/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-or-soleil" />
                    </div>
                  </div>
                  <p className="text-sm text-terre-sombre/60">Objectif: 15M FCFA</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-terre-sombre/60 font-nunito text-sm">Disponibilité système</p>
                      <p className="text-2xl font-poppins font-bold text-vert-sahel">
                        {kpis.systemUptime}%
                      </p>
                    </div>
                    <div className="bg-vert-sahel/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-vert-sahel" />
                    </div>
                  </div>
                  <p className="text-sm text-terre-sombre/60">Dernière mise à jour: OK</p>
                </div>
              </div>
              
              {/* Graphiques colorés selon maquette */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-4">Évolution utilisateurs</h3>
                  <div className="h-32 bg-gradient-to-br from-rouge-burkina/20 to-rouge-burkina/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-rouge-burkina mx-auto mb-1" />
                      <p className="text-terre-sombre/60 font-nunito text-sm">Croissance soutenue</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-4">Revenus mensuels</h3>
                  <div className="h-32 bg-gradient-to-br from-vert-sahel/20 to-vert-sahel/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 text-vert-sahel mx-auto mb-1" />
                      <p className="text-terre-sombre/60 font-nunito text-sm">Tendance positive</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-poppins font-bold text-terre-sombre mb-4">Performance système</h3>
                  <div className="h-32 bg-gradient-to-br from-or-soleil/20 to-or-soleil/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-or-soleil mx-auto mb-1" />
                      <p className="text-terre-sombre/60 font-nunito text-sm">99.8% uptime</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions administratives selon maquette */}
              <div className="flex flex-wrap gap-4 mb-8">
                <ButtonMzaka variant="primary" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter Excel
                </ButtonMzaka>
                <ButtonMzaka variant="outline" className="flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer notification
                </ButtonMzaka>
                <ButtonMzaka variant="outline" className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Audit sécurité
                </ButtonMzaka>
              </div>
              
              {/* Alertes système */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gris-clair/20">
                  <h3 className="font-poppins font-bold text-terre-sombre flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-or-soleil" />
                    Alertes système
                  </h3>
                </div>
                
                <div className="p-6 space-y-3">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 bg-beige-faso rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'error' ? 'bg-rouge-burkina' :
                        alert.type === 'warning' ? 'bg-or-soleil' : 'bg-vert-sahel'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-nunito text-terre-sombre text-sm">{alert.message}</p>
                        <p className="text-terre-sombre/40 font-nunito text-xs">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'utilisateurs' && (
            <div>
              <h2 className="text-2xl font-poppins font-bold text-terre-sombre mb-6">Gestion des utilisateurs</h2>
              
              <div className="bg-white rounded-xl shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-beige-faso">
                      <tr>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Utilisateur</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Type</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Statut</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Localisation</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Date</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gris-clair/10 hover:bg-beige-faso/50">
                          <td className="p-4">
                            <div className="font-nunito font-medium text-terre-sombre">{user.name}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 bg-vert-sahel/20 text-vert-sahel rounded-full text-xs font-medium">
                              {user.type}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'Vérifié' ? 'bg-vert-sahel/20 text-vert-sahel' :
                              user.status === 'En attente' ? 'bg-or-soleil/20 text-or-soleil' :
                              'bg-rouge-burkina/20 text-rouge-burkina'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 font-nunito text-terre-sombre/80">{user.location}</td>
                          <td className="p-4 font-nunito text-terre-sombre/80">{user.date}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <ButtonMzaka variant="outline" className="p-2">
                                <Eye className="h-4 w-4" />
                              </ButtonMzaka>
                              {user.status === 'En attente' && (
                                <ButtonMzaka variant="primary" className="p-2">
                                  <CheckCircle className="h-4 w-4" />
                                </ButtonMzaka>
                              )}
                              {user.status !== 'Vérifié' && (
                                <ButtonMzaka variant="outline" className="p-2">
                                  <Ban className="h-4 w-4" />
                                </ButtonMzaka>
                              )}
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
          
          {activeSection === 'biens' && (
            <div>
              <h2 className="text-2xl font-poppins font-bold text-terre-sombre mb-6">Validation des biens</h2>
              
              <div className="bg-white rounded-xl shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-beige-faso">
                      <tr>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Propriété</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Propriétaire</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Prix</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Statut</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Date</th>
                        <th className="text-left p-4 font-nunito font-semibold text-terre-sombre">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProperties.map((property) => (
                        <tr key={property.id} className="border-b border-gris-clair/10">
                          <td className="p-4">
                            <div className="font-nunito font-medium text-terre-sombre">{property.title}</div>
                          </td>
                          <td className="p-4 font-nunito text-terre-sombre/80">{property.owner}</td>
                          <td className="p-4">
                            <span className="font-poppins font-bold text-rouge-burkina">
                              {property.price.toLocaleString()} FCFA
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              property.status === 'Validé' ? 'bg-vert-sahel/20 text-vert-sahel' :
                              property.status === 'En attente' ? 'bg-or-soleil/20 text-or-soleil' :
                              'bg-rouge-burkina/20 text-rouge-burkina'
                            }`}>
                              {property.status}
                            </span>
                          </td>
                          <td className="p-4 font-nunito text-terre-sombre/80">{property.date}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <ButtonMzaka variant="outline" className="p-2">
                                <Eye className="h-4 w-4" />
                              </ButtonMzaka>
                              {property.status === 'En attente' && (
                                <>
                                  <ButtonMzaka variant="primary" className="p-2">
                                    <CheckCircle className="h-4 w-4" />
                                  </ButtonMzaka>
                                  <ButtonMzaka variant="outline" className="p-2">
                                    <Ban className="h-4 w-4" />
                                  </ButtonMzaka>
                                </>
                              )}
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
        </main>
      </div>
    </div>
  );
};

export default MzakaAdminDashboard;