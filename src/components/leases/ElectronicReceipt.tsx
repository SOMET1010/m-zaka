import React, { useState, useEffect } from 'react';
import { Receipt, Download, Share, CheckCircle, Calendar, User, Home, QrCode, Smartphone } from 'lucide-react';
import { ButtonMzaka } from '../ui/ButtonMzaka';

interface ElectronicReceiptProps {
  leaseId?: string;
  paymentData: {
    montant: number;
    mois: string;
    annee: number;
    modePaiement: string;
    referenceTransaction: string;
  };
  onReceiptGenerated: (receipt: any) => void;
}

export const ElectronicReceipt: React.FC<ElectronicReceiptProps> = ({ 
  leaseId, 
  paymentData, 
  onReceiptGenerated 
}) => {
  const [generatedReceipt, setGeneratedReceipt] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulation de génération de quittance après paiement Mobile Money
  const generateReceipt = async () => {
    setIsGenerating(true);
    
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const receiptId = `QUIT-${Date.now()}`;
    const documentHash = `hash_${Math.random().toString(36).substr(2, 9)}`;
    const qrCodeUrl = `https://verify.mzaka.bf/receipt/${receiptId}`;
    
    const receipt = {
      id: receiptId,
      leaseId: leaseId || 'BAIL-DEMO-001',
      documentHash,
      qrCodeUrl,
      paymentData,
      dateGeneration: new Date().toISOString(),
      datePaiement: new Date().toISOString(),
      montant: paymentData.montant,
      moisPayer: paymentData.mois,
      annee: paymentData.annee,
      statut: 'paye',
      signatureProprietaire: {
        nom: 'Traoré Moussa',
        email: 'traore@example.bf',
        dateSignature: new Date().toISOString(),
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0...'
      },
      documentUrl: `https://ebail.mzaka.bf/receipts/${receiptId}.pdf`,
      codeVerification: `MZAKA-${receiptId.slice(-8)}`
    };

    setGeneratedReceipt(receipt);
    onReceiptGenerated(receipt);
    setIsGenerating(false);
  };

  // Auto-génération si des données de paiement sont fournies
  useEffect(() => {
    if (paymentData && paymentData.referenceTransaction) {
      generateReceipt();
    }
  }, [paymentData]);

  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Génération en cours...</h3>
        <p className="text-gray-600">Création de votre quittance électronique</p>
      </div>
    );
  }

  if (generatedReceipt) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quittance Électronique</h2>
          <p className="text-gray-600">Document généré avec succès</p>
        </div>

        {/* En-tête de la quittance */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-red-600">M'ZAKA</h1>
            <p className="text-sm text-gray-600">Plateforme Immobilière - Infosec Burkina</p>
            <p className="text-xs text-gray-500">Quittance Électronique de Loyer</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🏠 Locataire</h3>
              <p>Traoré A.</p>
              <p>BP 1234 Ouagadougou</p>
              <p>+226 XX XX XX XX</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">👤 Propriétaire</h3>
              <p>{generatedReceipt.signatureProprietaire.nom}</p>
              <p>{generatedReceipt.signatureProprietaire.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">🏠 Bien Loué</h3>
            <p>Maison T3 Ouagadougou 2000</p>
            <p>Adresse: Avenue Nelson Mandela, Secteur 12</p>
          </div>
        </div>

        {/* Détails du paiement */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-blue-600" />
            Détails du Paiement
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><span className="font-medium">Mois payé:</span> {generatedReceipt.moisPayer} {generatedReceipt.annee}</p>
              <p><span className="font-medium">Montant:</span> {generatedReceipt.montant.toLocaleString('fr-FR')} FCFA</p>
              <p><span className="font-medium">Date paiement:</span> {new Date(generatedReceipt.datePaiement).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">Mode:</span> {paymentData.modePaiement}</p>
              <p><span className="font-medium">Référence:</span> {paymentData.referenceTransaction}</p>
              <p><span className="font-medium">Statut:</span> 
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">✅ Payé</span>
              </p>
            </div>
          </div>
        </div>

        {/* Signature et authentification */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Signature Électronique</h4>
            <div className="text-xs space-y-1 text-blue-700">
              <p><span className="font-medium">Signé le:</span> {new Date(generatedReceipt.signatureProprietaire.dateSignature).toLocaleString('fr-FR')}</p>
              <p><span className="font-medium">Propriétaire:</span> {generatedReceipt.signatureProprietaire.nom}</p>
              <p><span className="font-medium">IP:</span> {generatedReceipt.signatureProprietaire.ipAddress}</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
              <QrCode className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">QR Code de Vérification</p>
            <p className="text-xs text-blue-600 font-mono">{generatedReceipt.codeVerification}</p>
          </div>
        </div>

        {/* Pied de page légal */}
        <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
          <p className="mb-2">
            <span className="font-medium">Document authentique généré par M'ZAKA</span> | 
            ID: {generatedReceipt.id} | 
            Hash: {generatedReceipt.documentHash.slice(0, 16)}...
          </p>
          <p className="mb-2">
            Vérifiez l'authenticité: <span className="text-blue-600 font-mono">{generatedReceipt.qrCodeUrl}</span>
          </p>
          <p>
            Conforme à la législation burkinabé | Horodatage certifié | Signature numérique validée
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-6">
          <ButtonMzaka variant="primary" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Télécharger PDF</span>
          </ButtonMzaka>
          <ButtonMzaka variant="secondary" className="flex items-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Partager</span>
          </ButtonMzaka>
          <ButtonMzaka variant="accent" className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4" />
            <span>Envoyer par SMS</span>
          </ButtonMzaka>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Quittance Électronique</h3>
      <p className="text-gray-600 mb-4">Génération automatique après paiement</p>
      <ButtonMzaka 
        variant="primary" 
        onClick={generateReceipt}
        className="flex items-center space-x-2"
      >
        <Calendar className="w-5 h-5" />
        <span>Générer Quittance</span>
      </ButtonMzaka>
    </div>
  );
};