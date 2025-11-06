import React, { useState, useEffect } from 'react';
import { Receipt, Download, Share, Search, Filter, Calendar, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
import { ButtonMzaka } from '../ui/ButtonMzaka';

interface ReceiptData {
  id: string;
  mois: string;
  annee: number;
  montant: number;
  statut: 'paye' | 'en_attente' | 'retard';
  documentUrl: string;
  datePaiement?: string;
  modePaiement: string;
  referenceTransaction: string;
  codeVerification: string;
  bien: string;
  proprietaire: string;
}

interface ReceiptManagementProps {
  userType: 'proprietaire' | 'locataire';
}

export const ReceiptManagement: React.FC<ReceiptManagementProps> = ({ userType }) => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [filteredReceipts, setFilteredReceipts] = useState<ReceiptData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [yearFilter, setYearFilter] = useState<string>('tous');

  // Données de démonstration
  useEffect(() => {
    const demoReceipts: ReceiptData[] = [
      {
        id: 'QUIT-2025-11-001',
        mois: 'Novembre',
        annee: 2025,
        montant: 250000,
        statut: 'paye',
        documentUrl: 'https://ebail.mzaka.bf/receipts/QUIT-2025-11-001.pdf',
        datePaiement: '2025-11-02',
        modePaiement: 'Orange Money',
        referenceTransaction: 'OM789456123',
        codeVerification: 'MZAKA-Q2025-11-001',
        bien: 'Maison T3 Ouagadougou 2000',
        proprietaire: 'Traoré Moussa'
      },
      {
        id: 'QUIT-2025-10-001',
        mois: 'Octobre',
        annee: 2025,
        montant: 250000,
        statut: 'paye',
        documentUrl: 'https://ebail.mzaka.bf/receipts/QUIT-2025-10-001.pdf',
        datePaiement: '2025-10-02',
        modePaiement: 'Moov Money',
        referenceTransaction: 'MM456789123',
        codeVerification: 'MZAKA-Q2025-10-001',
        bien: 'Maison T3 Ouagadougou 2000',
        proprietaire: 'Traoré Moussa'
      },
      {
        id: 'QUIT-2025-09-001',
        mois: 'Septembre',
        annee: 2025,
        montant: 250000,
        statut: 'paye',
        documentUrl: 'https://ebail.mzaka.bf/receipts/QUIT-2025-09-001.pdf',
        datePaiement: '2025-09-02',
        modePaiement: 'Orange Money',
        referenceTransaction: 'OM123456789',
        codeVerification: 'MZAKA-Q2025-09-001',
        bien: 'Maison T3 Ouagadougou 2000',
        proprietaire: 'Traoré Moussa'
      },
      {
        id: 'QUIT-2025-12-001',
        mois: 'Décembre',
        annee: 2025,
        montant: 250000,
        statut: 'en_attente',
        documentUrl: '',
        modePaiement: '',
        referenceTransaction: '',
        codeVerification: 'MZAKA-Q2025-12-001',
        bien: 'Maison T3 Ouagadougou 2000',
        proprietaire: 'Traoré Moussa'
      }
    ];
    setReceipts(demoReceipts);
    setFilteredReceipts(demoReceipts);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = receipts;

    // Filtrage par statut
    if (statusFilter !== 'tous') {
      filtered = filtered.filter(receipt => receipt.statut === statusFilter);
    }

    // Filtrage par année
    if (yearFilter !== 'tous') {
      filtered = filtered.filter(receipt => receipt.annee.toString() === yearFilter);
    }

    // Recherche textuelle
    if (searchTerm) {
      filtered = filtered.filter(receipt =>
        receipt.mois.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.bien.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.codeVerification.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReceipts(filtered);
  }, [receipts, statusFilter, yearFilter, searchTerm]);

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'paye':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Payé
          </span>
        );
      case 'en_attente':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            En attente
          </span>
        );
      case 'retard':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            Retard
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const getUniqueYears = () => {
    const years = [...new Set(receipts.map(r => r.annee))].sort((a, b) => b - a);
    return years;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <Receipt className="w-8 h-8 mr-3 text-blue-600" />
          {userType === 'proprietaire' ? 'Mes Quittances Émises' : 'Mes Quittances'}
        </h1>
        <p className="text-gray-600">
          {userType === 'proprietaire' 
            ? 'Téléchargez et partagez les quittances de vos locataires'
            : 'Téléchargez vos quittances de loyer payées'
          }
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Payées</p>
              <p className="text-2xl font-bold text-gray-800">
                {receipts.filter(r => r.statut === 'paye').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-800">
                {receipts.filter(r => r.statut === 'en_attente').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total collecté</p>
              <p className="text-lg font-bold text-gray-800">
                {formatCurrency(receipts.filter(r => r.statut === 'paye').reduce((sum, r) => sum + r.montant, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Ce mois</p>
              <p className="text-lg font-bold text-gray-800">
                {formatCurrency(receipts.filter(r => r.mois === 'Novembre' && r.statut === 'paye').reduce((sum, r) => sum + r.montant, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Recherche */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un mois, bien, ou référence..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filtre par année */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="tous">Toutes les années</option>
            {getUniqueYears().map(year => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>

          {/* Filtre par statut */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="tous">Tous les statuts</option>
            <option value="paye">Payées</option>
            <option value="en_attente">En attente</option>
            <option value="retard">En retard</option>
          </select>
        </div>
      </div>

      {/* Liste des quittances */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mois
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bien
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReceipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Receipt className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {receipt.mois} {receipt.annee}
                        </div>
                        <div className="text-sm text-gray-500">{receipt.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{receipt.bien}</div>
                    {userType === 'locataire' && (
                      <div className="text-sm text-gray-500">Propriétaire: {receipt.proprietaire}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(receipt.montant)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(receipt.statut)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {receipt.statut === 'paye' ? (
                      <div>
                        <div className="flex items-center">
                          <Smartphone className="w-4 h-4 mr-1 text-green-600" />
                          <span className="text-green-600">{receipt.modePaiement}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {receipt.datePaiement && new Date(receipt.datePaiement).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-gray-400">
                          Réf: {receipt.referenceTransaction}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {receipt.statut === 'paye' ? (
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Télécharger
                        </button>
                        <button className="text-green-600 hover:text-green-900 flex items-center">
                          <Share className="w-4 h-4 mr-1" />
                          Partager
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">En attente de paiement</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReceipts.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune quittance trouvée</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'tous' || yearFilter !== 'tous'
                ? 'Aucune quittance ne correspond à vos critères de recherche.'
                : 'Aucune quittance disponible pour le moment.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Informations légales */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <Receipt className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Quittances électroniques authentiques</p>
            <ul className="space-y-1 text-xs">
              <li>• Génération automatique après paiement Mobile Money confirmé</li>
              <li>• Signature électronique du propriétaire avec horodatage certifié</li>
              <li>• QR code unique de vérification pour chaque document</li>
              <li>• Archive sécurisée avec métadonnées de transaction</li>
              <li>• Envoi automatique par email/SMS au locataire</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};