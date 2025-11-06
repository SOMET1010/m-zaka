import React, { useState } from 'react';
import { FileText, CreditCard, Download, Share, CheckCircle, QrCode, Smartphone, Shield, Clock, AlertCircle, Home, User, Receipt, Settings } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';
import { DigitalLeaseGenerator } from '../components/leases/DigitalLeaseGenerator';
import { ElectronicSignature } from '../components/leases/ElectronicSignature';
import { ElectronicReceipt } from '../components/leases/ElectronicReceipt';
import { LeaseManagement } from '../components/leases/LeaseManagement';
import { ReceiptManagement } from '../components/leases/ReceiptManagement';

const MzakaEBailService: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'sign' | 'management' | 'receipts'>('generator');
  const [userType, setUserType] = useState<'proprietaire' | 'locataire'>('proprietaire');
  const [generatedLease, setGeneratedLease] = useState<any>(null);
  const [generatedReceipt, setGeneratedReceipt] = useState<any>(null);

  // Tarifs selon spécifications
  const tarifs = {
    bail: 1000,
    quittance: 500,
    packAnnuel: 5000
  };

  // Gestionnaires d'événements pour les nouveaux composants
  const handleLeaseGenerated = (leaseData: any) => {
    setGeneratedLease(leaseData);
    setActiveTab('sign');
  };

  const handleReceiptGenerated = (receiptData: any) => {
    setGeneratedReceipt(receiptData);
  };

  const handleSignatureCompleted = (signatureData: any) => {
    console.log('Signature complétée:', signatureData);
    // Rediriger vers la gestion ou confirmer
  };

  const handleSignatureFailed = () => {
    console.log('Signature échouée');
  };

  return (
    <div className="min-h-screen bg-beige-faso">
      <HeaderMzaka userType={userType} userName="Utilisateur" />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* En-tête du service */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-poppins font-bold text-terre-sombre mb-4">
            🧾 MZAKA e-Bail & e-Quittance
          </h1>
          <p className="text-terre-sombre/80 font-nunito text-lg max-w-2xl mx-auto">
            Service public numérique pour générer vos baux électroniques et quittances légales. 
            <span className="text-rouge-burkina font-semibold"> 100% conforme aux standards burkinabés.</span>
          </p>
        </div>

        {/* Sélecteur de type d'utilisateur */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setUserType('proprietaire')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === 'proprietaire'
                  ? 'bg-rouge-burkina text-white shadow-sm'
                  : 'text-terre-sombre hover:text-rouge-burkina'
              }`}
            >
              👤 Propriétaire
            </button>
            <button
              onClick={() => setUserType('locataire')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === 'locataire'
                  ? 'bg-rouge-burkina text-white shadow-sm'
                  : 'text-terre-sombre hover:text-rouge-burkina'
              }`}
            >
              🏠 Locataire
            </button>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'generator', label: 'Générateur', icon: FileText },
              { id: 'sign', label: 'Signature', icon: Shield },
              { id: 'management', label: 'Contrats', icon: Home },
              { id: 'receipts', label: 'Quittances', icon: Receipt }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-rouge-burkina text-rouge-burkina bg-red-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">
            {activeTab === 'generator' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Générateur de Documents</h2>
                  <p className="text-gray-600">Créez vos baux électroniques et quittances en quelques étapes</p>
                </div>

                {/* Choix du type de document */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
                    <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      🧾 Créer un bail
                    </h3>
                    <p className="text-red-700/80 text-sm mb-4">
                      Bail électronique légal avec signature numérique
                    </p>
                    <p className="text-red-600 font-bold text-lg">
                      {tarifs.bail} FCFA
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <Receipt className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      💳 Générer une quittance
                    </h3>
                    <p className="text-blue-700/80 text-sm mb-4">
                      Quittance mensuelle avec QR code vérifiable
                    </p>
                    <p className="text-blue-600 font-bold text-lg">
                      {tarifs.quittance} FCFA
                    </p>
                  </div>
                </div>

                {/* Générateur de bail numérique */}
                <DigitalLeaseGenerator onLeaseGenerated={handleLeaseGenerated} />

                {/* Générateur de quittance (démo) */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Générateur de Quittance</h3>
                  <ElectronicReceipt
                    paymentData={{
                      montant: 250000,
                      mois: 'Novembre',
                      annee: 2025,
                      modePaiement: 'Orange Money',
                      referenceTransaction: 'OM789456123'
                    }}
                    onReceiptGenerated={handleReceiptGenerated}
                  />
                </div>
              </div>
            )}

            {activeTab === 'sign' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Signature Électronique</h2>
                  <p className="text-gray-600">Validez vos documents avec une signature électronique sécurisée</p>
                </div>

                {generatedLease ? (
                  <ElectronicSignature
                    documentType="bail"
                    documentData={{
                      id: generatedLease.id,
                      signataire: {
                        nom: generatedLease.locataire.nom,
                        prenom: generatedLease.locataire.prenom,
                        telephone: generatedLease.locataire.telephone,
                        email: generatedLease.locataire.email,
                        role: 'locataire'
                      },
                      documentName: `Bail - ${generatedLease.bien.adresse}`
                    }}
                    onSignatureCompleted={handleSignatureCompleted}
                    onSignatureFailed={handleSignatureFailed}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document à signer</h3>
                    <p className="text-gray-500 mb-6">
                      Générez d'abord un bail ou une quittance pour procéder à la signature électronique.
                    </p>
                    <ButtonMzaka
                      variant="primary"
                      onClick={() => setActiveTab('generator')}
                    >
                      Générer un document
                    </ButtonMzaka>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'management' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Contrats</h2>
                  <p className="text-gray-600">
                    {userType === 'proprietaire' 
                      ? 'Gérez vos contrats de location et suivez les paiements'
                      : 'Consultez vos baux et suivez vos engagements'
                    }
                  </p>
                </div>

                <LeaseManagement userType={userType} />
              </div>
            )}

            {activeTab === 'receipts' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Quittances</h2>
                  <p className="text-gray-600">
                    {userType === 'proprietaire' 
                      ? 'Téléchargez et partagez les quittances de vos locataires'
                      : 'Téléchargez vos quittances de loyer payées'
                    }
                  </p>
                </div>

                <ReceiptManagement userType={userType} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar d'informations */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Authenticité et sécurité */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-poppins font-bold text-terre-sombre mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              🔒 Authenticité
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-vert-sahel" />
                <span className="font-nunito text-terre-sombre/80">Signature numérique</span>
              </div>
              <div className="flex items-center space-x-2">
                <QrCode className="h-4 w-4 text-or-soleil" />
                <span className="font-nunito text-terre-sombre/80">QR code unique</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-rouge-burkina" />
                <span className="font-nunito text-terre-sombre/80">Horodatage certifié</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-beige-faso rounded-lg">
              <p className="text-terre-sombre/60 font-nunito text-xs">
                Vérification: <span className="font-mono text-terre-sombre">verify.mzaka.bf/QR12345</span>
              </p>
            </div>
          </div>
          
          {/* Modèle économique */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-poppins font-bold text-terre-sombre mb-4">
              💰 Tarification
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-nunito text-terre-sombre/80">Bail simple</span>
                <span className="font-poppins font-bold text-rouge-burkina">1 000 FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="font-nunito text-terre-sombre/80">Quittance mensuelle</span>
                <span className="font-poppins font-bold text-rouge-burkina">500 FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="font-nunito text-terre-sombre/80">Pack annuel (12 quit.)</span>
                <span className="font-poppins font-bold text-or-soleil">5 000 FCFA</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-green-700 text-xs font-medium">
                💡 Économisez 40% avec le pack annuel !
              </p>
            </div>
          </div>
          
          {/* Support et aide */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-poppins font-bold text-terre-sombre mb-4">
              🆘 Support
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <span className="font-nunito text-terre-sombre/80">+226 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <span className="font-nunito text-terre-sombre/80">support@mzaka.bf</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 text-xs">
                📞 Assistance 24h/24 pour la génération et signature de documents
              </p>
            </div>
          </div>
        </div>

        {/* Informations légales en pied de page */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1" />
            <div className="text-sm text-blue-800">
              <h4 className="font-semibold mb-2">Conformité légale et sécurité</h4>
              <ul className="space-y-1 text-xs">
                <li>• Conformité totale à la législation burkinabé sur les transactions électroniques</li>
                <li>• Opéré par Infosec Burkina, opérateur certifié ANSSI</li>
                <li>• Signature électronique avec certificat numérique et horodatage certifié</li>
                <li>• QR codes de vérification pour l'authenticité de tous les documents</li>
                <li>• Archive sécurisée avec métadonnées complètes et traçabilité</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MzakaEBailService;