import React, { useState } from 'react';
import { FileText, User, Home, Calculator, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { ButtonMzaka } from '../ui/ButtonMzaka';

interface LeaseGeneratorProps {
  onLeaseGenerated: (leaseData: any) => void;
}

export const DigitalLeaseGenerator: React.FC<LeaseGeneratorProps> = ({ onLeaseGenerated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [leaseData, setLeaseData] = useState({
    // Étape 1: Identités
    bailleur: {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      adresse: '',
      pieceIdentite: '',
      numeroPiece: ''
    },
    locataire: {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      adresse: '',
      pieceIdentite: '',
      numeroPiece: ''
    },
    // Étape 2: Bien immobilier
    bien: {
      adresse: '',
      ville: 'Ouagadougou',
      type: 'Appartement',
      surface: '',
      nombrePieces: '',
      etage: '',
      equipements: [] as string[],
      description: ''
    },
    // Étape 3: Conditions financières
    conditions: {
      montantLoyer: '',
      depotGarantie: '',
      dureeMois: '12',
      dateDebut: '',
      dateFin: '',
      charges: '',
      indexInitialCompteur: ''
    },
    // Étape 4: Clauses spéciales
    clauses: {
      animaux: false,
      fumeur: false,
      sousLocation: false,
      travaux: '',
      responsabilite: '',
      autresClauses: ''
    }
  });

  const [signatureMethod, setSignatureMethod] = useState<'email' | 'sms'>('email');
  const [generatedLease, setGeneratedLease] = useState<any>(null);

  const handleInputChange = (section: string, field: string, value: any) => {
    setLeaseData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const generateLease = async () => {
    // Simulation de génération de bail
    const leaseId = `BAIL-${Date.now()}`;
    const documentHash = `hash_${Math.random().toString(36).substr(2, 9)}`;
    const qrCodeUrl = `https://verify.mzaka.bf/${leaseId}`;

    const lease = {
      id: leaseId,
      documentHash,
      qrCodeUrl,
      ...leaseData,
      dateGeneration: new Date().toISOString(),
      status: 'actif',
      signatureStatus: 'en_attente',
      documentUrl: `https://ebail.mzaka.bf/documents/${leaseId}.pdf`
    };

    setGeneratedLease(lease);
    onLeaseGenerated(lease);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else generateLease();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (generatedLease) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bail Numérique Généré</h2>
          <p className="text-gray-600">Votre contrat a été créé avec succès</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Informations du Document</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">ID Document:</span> {generatedLease.id}</p>
              <p><span className="font-medium">Date:</span> {new Date(generatedLease.dateGeneration).toLocaleDateString('fr-FR')}</p>
              <p><span className="font-medium">Statut:</span> 
                <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">En attente signature</span>
              </p>
              <p><span className="font-medium">Locataire:</span> {generatedLease.locataire.prenom} {generatedLease.locataire.nom}</p>
              <p><span className="font-medium">Loyer:</span> {generatedLease.conditions.montantLoyer} FCFA/mois</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Authentification</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                  <QrCode className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">QR Code de vérification</p>
              </div>
              <p className="text-sm text-center text-gray-600">
                Vérifiez l'authenticité: {generatedLease.qrCodeUrl}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <ButtonMzaka variant="primary" className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Télécharger PDF</span>
          </ButtonMzaka>
          <ButtonMzaka variant="secondary" className="flex items-center space-x-2">
            <Share className="w-5 h-5" />
            <span>Partager</span>
          </ButtonMzaka>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header avec modèle juridique */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <FileText className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-800">Générateur de Bail Numérique</h1>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <Shield className="w-4 h-4 inline mr-2" />
            Modèle juridique conforme - Infosec Burkina | Signature numérique validée | QR code d'authenticité
          </p>
        </div>
      </div>

      {/* Indicateur d'étapes */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === currentStep ? 'bg-red-600 text-white' :
              step < currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Formulaire par étapes */}
      <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Étape 1: Identités des Parties
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bailleur */}
              <div className="space-y-4">
                <h3 className="font-semibold text-green-700">🏠 Propriétaire (Bailleur)</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nom de famille"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.bailleur.nom}
                    onChange={(e) => handleInputChange('bailleur', 'nom', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Prénom(s)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.bailleur.prenom}
                    onChange={(e) => handleInputChange('bailleur', 'prenom', e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.bailleur.telephone}
                    onChange={(e) => handleInputChange('bailleur', 'telephone', e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Adresse email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.bailleur.email}
                    onChange={(e) => handleInputChange('bailleur', 'email', e.target.value)}
                  />
                </div>
              </div>

              {/* Locataire */}
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700">👤 Locataire</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nom de famille"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.locataire.nom}
                    onChange={(e) => handleInputChange('locataire', 'nom', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Prénom(s)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.locataire.prenom}
                    onChange={(e) => handleInputChange('locataire', 'prenom', e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.locataire.telephone}
                    onChange={(e) => handleInputChange('locataire', 'telephone', e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Adresse email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={leaseData.locataire.email}
                    onChange={(e) => handleInputChange('locataire', 'email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Home className="w-6 h-6 mr-2 text-green-600" />
              Étape 2: Adresse du Bien
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Adresse complète du bien"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.bien.adresse}
                  onChange={(e) => handleInputChange('bien', 'adresse', e.target.value)}
                />
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.bien.ville}
                  onChange={(e) => handleInputChange('bien', 'ville', e.target.value)}
                >
                  <option value="Ouagadougou">Ouagadougou</option>
                  <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                  <option value="Koudougou">Koudougou</option>
                  <option value="Ouahigouya">Ouahigouya</option>
                </select>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.bien.type}
                  onChange={(e) => handleInputChange('bien', 'type', e.target.value)}
                >
                  <option value="Appartement">Appartement</option>
                  <option value="Maison">Maison</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                  <option value="Boutique">Boutique</option>
                  <option value="Bureau">Bureau</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Surface (m²)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.bien.surface}
                  onChange={(e) => handleInputChange('bien', 'surface', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Nombre de pièces"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.bien.nombrePieces}
                  onChange={(e) => handleInputChange('bien', 'nombrePieces', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Étage (si applicable)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.bien.etage}
                  onChange={(e) => handleInputChange('bien', 'etage', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description et équipements
              </label>
              <textarea
                rows={4}
                placeholder="Décrivez le bien et ses équipements (eau, électricité, mobilier, etc.)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={leaseData.bien.description}
                onChange={(e) => handleInputChange('bien', 'description', e.target.value)}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-yellow-600" />
              Étape 3: Montants et Durée
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Montant du loyer mensuel (FCFA)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 150000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.conditions.montantLoyer}
                  onChange={(e) => handleInputChange('conditions', 'montantLoyer', e.target.value)}
                />
                
                <label className="block text-sm font-medium text-gray-700">
                  Dépôt de garantie (FCFA)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 300000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.conditions.depotGarantie}
                  onChange={(e) => handleInputChange('conditions', 'depotGarantie', e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700">
                  Durée du bail (mois)
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.conditions.dureeMois}
                  onChange={(e) => handleInputChange('conditions', 'dureeMois', e.target.value)}
                >
                  <option value="6">6 mois</option>
                  <option value="12">12 mois</option>
                  <option value="24">24 mois</option>
                  <option value="36">36 mois</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Date de début du bail
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.conditions.dateDebut}
                  onChange={(e) => handleInputChange('conditions', 'dateDebut', e.target.value)}
                />
                
                <label className="block text-sm font-medium text-gray-700">
                  Charges complémentaires (FCFA/mois)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 5000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.conditions.charges}
                  onChange={(e) => handleInputChange('conditions', 'charges', e.target.value)}
                />
                
                <label className="block text-sm font-medium text-gray-700">
                  Index initial compteur (optionnel)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 1250"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.conditions.indexInitialCompteur}
                  onChange={(e) => handleInputChange('conditions', 'indexInitialCompteur', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-red-600" />
              Étape 4: Clauses et Signature
            </h2>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Clauses spéciales</h3>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={leaseData.clauses.animaux}
                    onChange={(e) => handleInputChange('clauses', 'animaux', e.target.checked)}
                  />
                  <span className="text-sm">Animaux domestiques autorisés</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={leaseData.clauses.fumeur}
                    onChange={(e) => handleInputChange('clauses', 'fumeur', e.target.checked)}
                  />
                  <span className="text-sm">Fumer autorisé dans le logement</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={leaseData.clauses.sousLocation}
                    onChange={(e) => handleInputChange('clauses', 'sousLocation', e.target.checked)}
                  />
                  <span className="text-sm">Sous-location autorisée</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clauses spécifiques / Travaux
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez les travaux, responsabilités, ou clauses particulières..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={leaseData.clauses.travaux}
                  onChange={(e) => handleInputChange('clauses', 'travaux', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3">Méthode de signature électronique</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="signatureMethod"
                    value="email"
                    checked={signatureMethod === 'email'}
                    onChange={(e) => setSignatureMethod(e.target.value as 'email')}
                    className="mr-3"
                  />
                  <span className="text-sm">Signature par email avec OTP (recommandé)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="signatureMethod"
                    value="sms"
                    checked={signatureMethod === 'sms'}
                    onChange={(e) => setSignatureMethod(e.target.value as 'sms')}
                    className="mr-3"
                  />
                  <span className="text-sm">Signature par SMS avec code</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <ButtonMzaka
            type="button"
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Précédent
          </ButtonMzaka>
          
          <ButtonMzaka
            type="submit"
            variant="primary"
            className="flex items-center space-x-2"
          >
            {currentStep === 4 ? (
              <>
                <Clock className="w-5 h-5" />
                <span>Générer le Bail (1000 FCFA)</span>
              </>
            ) : (
              <>
                <span>Suivant</span>
                <span>→</span>
              </>
            )}
          </ButtonMzaka>
        </div>
      </form>
    </div>
  );
};