import React, { useState } from 'react';
import { FileText, CreditCard, Download, Share, CheckCircle, QrCode, Smartphone, Shield, Clock, AlertCircle } from 'lucide-react';
import { HeaderMzaka } from '../components/ui/HeaderMzaka';
import { ButtonMzaka } from '../components/ui/ButtonMzaka';

const MzakaEBailService: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [documentType, setDocumentType] = useState<'bail' | 'quittance'>('bail');
  const [formData, setFormData] = useState({
    // Bailleur
    bailleurNom: '',
    bailleurPhone: '',
    bailleurEmail: '',
    // Locataire  
    locataireNom: '',
    locatairePhone: '',
    locataireEmail: '',
    // Bien
    adresseBien: '',
    ville: 'Ouagadougou',
    typeBien: 'Appartement',
    surface: '',
    // Contrat
    montantLoyer: '',
    depot: '',
    dureeMois: '12',
    dateDebut: '',
    // Paiement
    paiementEffectue: false,
    montantPaiement: 0
  });

  // Tarifs selon maquette
  const tarifs = {
    bail: 1000,
    quittance: 500,
    packAnnuel: 5000
  };

  // Méthodes de paiement Mobile Money
  const paiementMethods = [
    { id: 'orange', name: 'Orange Money', logo: '🟠', color: 'text-orange-600' },
    { id: 'moov', name: 'Moov Money', logo: '🔵', color: 'text-blue-600' },
    { id: 'coris', name: 'Coris Money', logo: '🟢', color: 'text-green-600' },
    { id: 'wave', name: 'Wave', logo: '💙', color: 'text-blue-500' }
  ];

  // Documents générés demo
  const documentsGeneres = [
    {
      id: 1,
      type: 'Bail',
      titre: 'Bail Appartement T3 - Ouaga 2000',
      date: '25/10/2025',
      montant: 200000,
      statut: 'Valide',
      qrCode: 'QR-20251025-BAIL-001'
    },
    {
      id: 2,
      type: 'Quittance',
      titre: 'Quittance Octobre 2025',
      date: '25/10/2025',
      montant: 200000,
      statut: 'Validé',
      qrCode: 'QR-20251025-QUIT-001'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = (method: string) => {
    setFormData(prev => ({ 
      ...prev, 
      paiementEffectue: true,
      montantPaiement: documentType === 'bail' ? tarifs.bail : tarifs.quittance
    }));
  };

  const generateDocument = () => {
    // TODO: Implémenter la génération de PDF avec signature numérique
    alert('Document généré avec succès ! Vérification par QR code disponible.');
  };

  return (
    <div className="min-h-screen bg-beige-faso">
      <HeaderMzaka userType="locataire" userName="Utilisateur" />
      
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
          <div className="mt-4 p-4 bg-vert-sahel/10 rounded-lg inline-block">
            <p className="text-vert-sahel font-nunito text-sm">
              🔗 Portail dédié: <span className="font-mono">https://ebail.mzaka.bf</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Génération de documents */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-poppins font-bold text-terre-sombre mb-6 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Générer un document
              </h2>
              
              {/* Sélecteur de type de document selon maquette */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setDocumentType('bail')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    documentType === 'bail' 
                      ? 'border-rouge-burkina bg-rouge-burkina/5' 
                      : 'border-gris-clair hover:border-rouge-burkina/50'
                  }`}
                >
                  <div className="text-center">
                    <FileText className={`h-12 w-12 mx-auto mb-3 ${
                      documentType === 'bail' ? 'text-rouge-burkina' : 'text-terre-sombre/40'
                    }`} />
                    <h3 className="font-poppins font-bold text-terre-sombre mb-2">
                      🧾 Créer un bail
                    </h3>
                    <p className="text-terre-sombre/60 font-nunito text-sm">
                      Bail électronique légal avec signature numérique
                    </p>
                    <p className="text-rouge-burkina font-poppins font-bold mt-2">
                      {tarifs.bail} FCFA
                    </p>
                  </div>
                </button>
                
                <button
                  onClick={() => setDocumentType('quittance')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    documentType === 'quittance' 
                      ? 'border-vert-sahel bg-vert-sahel/5' 
                      : 'border-gris-clair hover:border-vert-sahel/50'
                  }`}
                >
                  <div className="text-center">
                    <CreditCard className={`h-12 w-12 mx-auto mb-3 ${
                      documentType === 'quittance' ? 'text-vert-sahel' : 'text-terre-sombre/40'
                    }`} />
                    <h3 className="font-poppins font-bold text-terre-sombre mb-2">
                      💳 Générer une quittance
                    </h3>
                    <p className="text-terre-sombre/60 font-nunito text-sm">
                      Quittance mensuelle avec QR code vérifiable
                    </p>
                    <p className="text-vert-sahel font-poppins font-bold mt-2">
                      {tarifs.quittance} FCFA
                    </p>
                  </div>
                </button>
              </div>
              
              {/* Étapes du processus selon maquette */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {['Informations', 'Adresse', 'Montant', 'Paiement'].map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep > index + 1 
                          ? 'bg-vert-sahel text-white' 
                          : currentStep === index + 1
                          ? 'bg-rouge-burkina text-white'
                          : 'bg-gris-clair text-terre-sombre/40'
                      }`}>
                        {currentStep > index + 1 ? '✓' : index + 1}
                      </div>
                      <span className={`ml-2 text-sm font-nunito ${
                        currentStep >= index + 1 ? 'text-terre-sombre' : 'text-terre-sombre/40'
                      }`}>
                        {step}
                      </span>
                      {index < 3 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          currentStep > index + 1 ? 'bg-vert-sahel' : 'bg-gris-clair'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Formulaires selon les étapes */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="font-poppins font-bold text-terre-sombre">1️⃣ Informations bailleur/locataire</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bailleur */}
                    <div>
                      <h4 className="font-nunito font-semibold text-terre-sombre mb-3">Bailleur</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nom complet"
                          value={formData.bailleurNom}
                          onChange={(e) => handleInputChange('bailleurNom', e.target.value)}
                          className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                        />
                        <input
                          type="tel"
                          placeholder="Téléphone"
                          value={formData.bailleurPhone}
                          onChange={(e) => handleInputChange('bailleurPhone', e.target.value)}
                          className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.bailleurEmail}
                          onChange={(e) => handleInputChange('bailleurEmail', e.target.value)}
                          className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    {/* Locataire */}
                    <div>
                      <h4 className="font-nunito font-semibold text-terre-sombre mb-3">Locataire</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nom complet"
                          value={formData.locataireNom}
                          onChange={(e) => handleInputChange('locataireNom', e.target.value)}
                          className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                        />
                        <input
                          type="tel"
                          placeholder="Téléphone"
                          value={formData.locatairePhone}
                          onChange={(e) => handleInputChange('locatairePhone', e.target.value)}
                          className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.locataireEmail}
                          onChange={(e) => handleInputChange('locataireEmail', e.target.value)}
                          className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="font-poppins font-bold text-terre-sombre">2️⃣ Adresse du bien</h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Adresse complète du bien"
                      value={formData.adresseBien}
                      onChange={(e) => handleInputChange('adresseBien', e.target.value)}
                      className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <select
                        value={formData.ville}
                        onChange={(e) => handleInputChange('ville', e.target.value)}
                        className="p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                      >
                        <option value="Ouagadougou">Ouagadougou</option>
                        <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                        <option value="Koudougou">Koudougou</option>
                        <option value="Ouahigouya">Ouahigouya</option>
                      </select>
                      
                      <select
                        value={formData.typeBien}
                        onChange={(e) => handleInputChange('typeBien', e.target.value)}
                        className="p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                      >
                        <option value="Appartement">Appartement</option>
                        <option value="Maison">Maison</option>
                        <option value="Studio">Studio</option>
                        <option value="Bureau">Bureau</option>
                      </select>
                      
                      <input
                        type="text"
                        placeholder="Surface (m²)"
                        value={formData.surface}
                        onChange={(e) => handleInputChange('surface', e.target.value)}
                        className="p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="font-poppins font-bold text-terre-sombre">3️⃣ Montant et période</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Loyer mensuel (FCFA)"
                      value={formData.montantLoyer}
                      onChange={(e) => handleInputChange('montantLoyer', e.target.value)}
                      className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                    />
                    
                    <input
                      type="text"
                      placeholder="Dépôt de garantie (FCFA)"
                      value={formData.depot}
                      onChange={(e) => handleInputChange('depot', e.target.value)}
                      className="w-full p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                      value={formData.dureeMois}
                      onChange={(e) => handleInputChange('dureeMois', e.target.value)}
                      className="p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                    >
                      <option value="6">6 mois</option>
                      <option value="12">12 mois</option>
                      <option value="24">24 mois</option>
                      <option value="36">36 mois</option>
                    </select>
                    
                    <input
                      type="date"
                      placeholder="Date de début"
                      value={formData.dateDebut}
                      onChange={(e) => handleInputChange('dateDebut', e.target.value)}
                      className="p-3 border border-gris-clair rounded-lg font-nunito focus:ring-2 focus:ring-vert-sahel focus:border-transparent"
                    />
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="font-poppins font-bold text-terre-sombre">4️⃣ Paiement Mobile Money</h3>
                  
                  {!formData.paiementEffectue ? (
                    <div>
                      <div className="text-center mb-6 p-4 bg-rouge-burkina/10 rounded-lg">
                        <p className="text-rouge-burkina font-poppins font-bold text-lg">
                          Montant à payer: {documentType === 'bail' ? tarifs.bail : tarifs.quittance} FCFA
                        </p>
                        <p className="text-terre-sombre/60 font-nunito text-sm">
                          Paiement sécurisé via Mobile Money
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {paiementMethods.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => handlePayment(method.id)}
                            className="p-4 border-2 border-gris-clair rounded-lg hover:border-vert-sahel transition-colors text-left"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{method.logo}</span>
                              <div>
                                <p className="font-nunito font-medium text-terre-sombre">
                                  {method.name}
                                </p>
                                <p className="text-terre-sombre/60 text-sm">
                                  Paiement instantané
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-vert-sahel/10 rounded-lg">
                      <CheckCircle className="h-16 w-16 text-vert-sahel mx-auto mb-4" />
                      <h3 className="font-poppins font-bold text-vert-sahel mb-2">
                        Paiement confirmé !
                      </h3>
                      <p className="text-terre-sombre/80 font-nunito">
                        Référence: PM-{Date.now()}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Boutons de navigation */}
              <div className="flex justify-between mt-8">
                <ButtonMzaka
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Précédent
                </ButtonMzaka>
                
                {currentStep < 4 ? (
                  <ButtonMzaka
                    variant="primary"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Suivant
                  </ButtonMzaka>
                ) : formData.paiementEffectue ? (
                  <ButtonMzaka
                    variant="primary"
                    onClick={generateDocument}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    ✅ Générer le PDF
                  </ButtonMzaka>
                ) : null}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Informations et archives */}
          <div className="space-y-6">
            {/* Authentification et vérification */}
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
                💰 Modèle économique
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
                  <span className="font-nunito text-terre-sombre/80">Pack annuel (12quit)</span>
                  <span className="font-poppins font-bold text-or-soleil">5 000 FCFA</span>
                </div>
              </div>
            </div>
            
            {/* Historique des documents */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-poppins font-bold text-terre-sombre mb-4">
                📂 Mes documents
              </h3>
              
              <div className="space-y-3">
                {documentsGeneres.map((doc) => (
                  <div key={doc.id} className="p-3 bg-beige-faso rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-nunito text-terre-sombre/60">{doc.type}</span>
                      <span className="text-xs font-nunito text-terre-sombre/40">{doc.date}</span>
                    </div>
                    <p className="font-nunito text-terre-sombre text-sm mb-2">{doc.titre}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-poppins font-bold text-rouge-burkina text-sm">
                        {doc.montant.toLocaleString()} FCFA
                      </span>
                      <div className="flex space-x-1">
                        <ButtonMzaka variant="outline" className="p-1 text-xs">
                          <Download className="h-3 w-3" />
                        </ButtonMzaka>
                        <ButtonMzaka variant="outline" className="p-1 text-xs">
                          <Share className="h-3 w-3" />
                        </ButtonMzaka>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MzakaEBailService;