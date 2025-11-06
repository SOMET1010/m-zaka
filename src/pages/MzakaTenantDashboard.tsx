import React, { useState } from 'react';
import { Calendar, DollarSign, Home, Download, MessageCircle, Phone, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';

const MzakaTenantDashboard: React.FC = () => {
  // Données demo pour le dashboard locataire
  const nextPayment = {
    amount: 200000,
    dueDate: "25 novembre 2025",
    method: "Orange Money",
    property: "Appartement T3 - Ouaga 2000"
  };

  const currentContract = {
    startDate: "12 septembre 2025",
    duration: "12 mois",
    monthlyRent: 200000,
    deposit: 400000,
    landlord: "Immobilière Faso Real"
  };

  const paymentHistory = [
    { date: "25/10/2025", amount: 200000, method: "Orange Money", status: "Reçu", receipt: "QR-20251025-001" },
    { date: "25/09/2025", amount: 200000, method: "Moov Money", status: "Reçu", receipt: "QR-20250925-001" },
    { date: "25/08/2025", amount: 200000, method: "Orange Money", status: "Reçu", receipt: "QR-20250825-001" }
  ];

  const maintenanceRequests = [
    {
      id: 1,
      title: "Robinet cassé dans la cuisine",
      status: "En cours",
      priority: "Moyenne",
      date: "20/10/2025",
      description: "Le robinet de l'évier fuit constamment"
    },
    {
      id: 2,
      title: "Climatisation ne fonctionne pas",
      status: "Résolu", 
      priority: "Haute",
      date: "15/10/2025",
      description: "Réparé par le technicien le 18/10"
    }
  ];

  const monthlySpending = [
    { month: "Août", amount: 200000 },
    { month: "Septembre", amount: 200000 },
    { month: "Octobre", amount: 200000 }
  ];

  return (
    <div className="min-h-screen bg-beige-faso">
      <HeaderMzaka userType="locataire" userName="Paul KONÉ" notifications={2} />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* En-tête avec informations contractuelles selon maquette */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prochain paiement */}
            <div className="text-center p-4 bg-gradient-to-br from-rouge-burkina/10 to-rouge-burkina/5 rounded-lg">
              <Calendar className="h-8 w-8 text-rouge-burkina mx-auto mb-2" />
              <h3 className="font-poppins font-bold text-terre-sombre mb-1">
                Prochain paiement
              </h3>
              <p className="text-2xl font-poppins font-bold text-rouge-burkina mb-1">
                {nextPayment.amount.toLocaleString()} FCFA
              </p>
              <p className="text-terre-sombre/60 font-nunito text-sm">
                {nextPayment.dueDate}
              </p>
              <p className="text-terre-sombre/80 font-nunito text-sm">
                via {nextPayment.method}
              </p>
            </div>
            
            {/* Contrat actif */}
            <div className="text-center p-4 bg-gradient-to-br from-vert-sahel/10 to-vert-sahel/5 rounded-lg">
              <Home className="h-8 w-8 text-vert-sahel mx-auto mb-2" />
              <h3 className="font-poppins font-bold text-terre-sombre mb-1">
                Contrat actif
              </h3>
              <p className="text-terre-sombre/80 font-nunito text-sm mb-1">
                Signé le {currentContract.startDate}
              </p>
              <p className="text-terre-sombre/80 font-nunito text-sm">
                Durée: {currentContract.duration}
              </p>
            </div>
            
            {/* Propriétaire */}
            <div className="text-center p-4 bg-gradient-to-br from-or-soleil/10 to-or-soleil/5 rounded-lg">
              <Phone className="h-8 w-8 text-or-soleil mx-auto mb-2" />
              <h3 className="font-poppins font-bold text-terre-sombre mb-1">
                Propriétaire
              </h3>
              <p className="text-terre-sombre/80 font-nunito text-sm">
                {currentContract.landlord}
              </p>
              <ButtonMzaka variant="outline" className="mt-3 text-xs">
                <MessageCircle className="h-3 w-3 mr-1" />
                Contacter
              </ButtonMzaka>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Paiements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Historique des paiements */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gris-clair/20">
                <h2 className="text-xl font-poppins font-bold text-terre-sombre flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Historique des paiements
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-beige-faso rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-vert-sahel/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-vert-sahel" />
                        </div>
                        <div>
                          <p className="font-nunito font-medium text-terre-sombre">
                            {payment.date}
                          </p>
                          <p className="text-terre-sombre/60 font-nunito text-sm">
                            {payment.method} • Reçu #{payment.receipt}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-poppins font-bold text-rouge-burkina">
                          {payment.amount.toLocaleString()} FCFA
                        </p>
                        <ButtonMzaka variant="outline" className="mt-2 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          🧾 Télécharger reçu
                        </ButtonMzaka>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Graphique des dépenses mensuelles */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gris-clair/20">
                <h2 className="text-xl font-poppins font-bold text-terre-sombre flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Dépenses mensuelles
                </h2>
              </div>
              
              <div className="p-6">
                <div className="h-48 bg-gradient-to-br from-beige-faso to-or-soleil/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="h-16 w-16 text-or-soleil mx-auto mb-2" />
                    <p className="text-terre-sombre/60 font-nunito">Graphique des dépenses</p>
                    <p className="text-terre-sombre/40 font-nunito text-sm">Stable à 200K FCFA/mois</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne droite - Maintenance et actions */}
          <div className="space-y-6">
            {/* Maintenance en cours selon maquette */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gris-clair/20">
                <h2 className="text-lg font-poppins font-bold text-terre-sombre flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Maintenance
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                {maintenanceRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-beige-faso rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-nunito font-medium text-terre-sombre text-sm">
                        {request.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'En cours' 
                          ? 'bg-or-soleil/20 text-or-soleil'
                          : 'bg-vert-sahel/20 text-vert-sahel'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-terre-sombre/60 font-nunito text-xs mb-2">
                      {request.description}
                    </p>
                    <p className="text-terre-sombre/40 font-nunito text-xs">
                      Signalé le {request.date}
                    </p>
                  </div>
                ))}
                
                <ButtonMzaka variant="outline" className="w-full">
                  <Wrench className="h-4 w-4 mr-2" />
                  Signaler un problème
                </ButtonMzaka>
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gris-clair/20">
                <h2 className="text-lg font-poppins font-bold text-terre-sombre">
                  Actions rapides
                </h2>
              </div>
              
              <div className="p-6 space-y-3">
                <ButtonMzaka variant="primary" className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Payer le loyer
                </ButtonMzaka>
                
                <ButtonMzaka variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter le propriétaire
                </ButtonMzaka>
                
                <ButtonMzaka variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger mes reçus
                </ButtonMzaka>
              </div>
            </div>
            
            {/* Traduction instantanée selon maquette */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gris-clair/20">
                <h2 className="text-lg font-poppins font-bold text-terre-sombre flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  🌍 Multilingue
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-terre-sombre/60 font-nunito text-sm mb-4">
                  Interface disponible en:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['Français', 'Mooré', 'Dioula', 'English'].map((lang) => (
                    <button
                      key={lang}
                      className="p-2 text-center text-sm font-nunito text-terre-sombre/80 hover:bg-beige-faso rounded-lg transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-beige-faso rounded-lg text-center">
                  <p className="text-terre-sombre/60 font-nunito text-xs">
                    🎧 Assistant vocal disponible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MzakaTenantDashboard;