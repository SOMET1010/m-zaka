import React, { useState, useEffect } from 'react';
import { FileText, Eye, Edit, Download, Plus, Search, Filter, Calendar, User, Home, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { ButtonMzaka } from '../ui/ButtonMzaka';

interface Lease {
  id: string;
  bien: string;
  locataire: string;
  loyer: number;
  debut: string;
  fin: string;
  statut: 'actif' | 'en_renouvellement' | 'resilie';
  type: 'bail' | 'quittance';
  dateGeneration?: string;
  montant?: number;
}

interface LeaseManagementProps {
  userType: 'proprietaire' | 'locataire';
}

export const LeaseManagement: React.FC<LeaseManagementProps> = ({ userType }) => {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [filteredLeases, setFilteredLeases] = useState<Lease[]>([]);
  const [activeTab, setActiveTab] = useState<'tous' | 'baux' | 'quittances'>('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');

  // Données de démonstration
  useEffect(() => {
    const demoLeases: Lease[] = [
      {
        id: 'BAIL-001',
        bien: 'Maison T3 Ouagadougou 2000',
        locataire: 'Traoré A.',
        loyer: 250000,
        debut: '01/08/2025',
        fin: '01/08/2026',
        statut: 'actif',
        type: 'bail'
      },
      {
        id: 'BAIL-002',
        bien: 'Appartement F2 Koulouba',
        locataire: 'Kaboré M.',
        loyer: 180000,
        debut: '15/09/2025',
        fin: '15/09/2026',
        statut: 'actif',
        type: 'bail'
      },
      {
        id: 'QUIT-001',
        bien: 'Maison T3 Ouagadougou 2000',
        locataire: 'Traoré A.',
        loyer: 250000,
        debut: '01/10/2025',
        fin: '31/10/2025',
        statut: 'actif',
        type: 'quittance',
        dateGeneration: '02/11/2025',
        montant: 250000
      },
      {
        id: 'QUIT-002',
        bien: 'Maison T3 Ouagadougou 2000',
        locataire: 'Traoré A.',
        loyer: 250000,
        debut: '01/09/2025',
        fin: '30/09/2025',
        statut: 'actif',
        type: 'quittance',
        dateGeneration: '02/10/2025',
        montant: 250000
      }
    ];
    setLeases(demoLeases);
    setFilteredLeases(demoLeases);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = leases;

    // Filtrage par type
    if (activeTab !== 'tous') {
      filtered = filtered.filter(lease => lease.type === activeTab);
    }

    // Filtrage par statut
    if (statusFilter !== 'tous') {
      filtered = filtered.filter(lease => lease.statut === statusFilter);
    }

    // Recherche textuelle
    if (searchTerm) {
      filtered = filtered.filter(lease =>
        lease.bien.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.locataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeases(filtered);
  }, [leases, activeTab, statusFilter, searchTerm]);

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'actif':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Actif
          </span>
        );
      case 'en_renouvellement':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            En renouvellement
          </span>
        );
      case 'resilie':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center">
            <XCircle className="w-3 h-3 mr-1" />
            Résilié
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <FileText className="w-8 h-8 mr-3 text-red-600" />
          {userType === 'proprietaire' ? 'Mes Contrats' : 'Mes Baux et Quittances'}
        </h1>
        <p className="text-gray-600">
          {userType === 'proprietaire' 
            ? 'Gérez vos contrats de location et suivez les paiements'
            : 'Consultez vos baux et téléchargez vos quittances'
          }
        </p>
      </div>

      {/* Actions rapides */}
      <div className="flex flex-wrap gap-4 mb-6">
        {userType === 'proprietaire' && (
          <ButtonMzaka variant="primary" className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Créer un bail</span>
          </ButtonMzaka>
        )}
        <ButtonMzaka variant="secondary" className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Exporter PDF</span>
        </ButtonMzaka>
        <ButtonMzaka variant="accent" className="flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filtres avancés</span>
        </ButtonMzaka>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Baux actifs</p>
              <p className="text-2xl font-bold text-gray-800">
                {leases.filter(l => l.type === 'bail' && l.statut === 'actif').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Quittances</p>
              <p className="text-2xl font-bold text-gray-800">
                {leases.filter(l => l.type === 'quittance').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">En règle</p>
              <p className="text-2xl font-bold text-gray-800">
                {leases.filter(l => l.statut === 'actif').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">À renouveler</p>
              <p className="text-2xl font-bold text-gray-800">
                {leases.filter(l => l.statut === 'en_renouvellement').length}
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
                placeholder="Rechercher un bien, locataire, ou numéro..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filtre par type */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'tous', label: 'Tous' },
              { key: 'baux', label: 'Baux' },
              { key: 'quittances', label: 'Quittances' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filtre par statut */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="tous">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="en_renouvellement">En renouvellement</option>
            <option value="resilie">Résilié</option>
          </select>
        </div>
      </div>

      {/* Tableau des contrats */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'quittances' ? 'Mois' : 'Bien'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'quittances' ? 'Locataire' : 'Locataire'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'quittances' ? 'Montant' : 'Loyer'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeases.map((lease) => (
                <tr key={lease.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        {lease.type === 'bail' ? 
                          <FileText className="w-4 h-4 text-red-600" /> :
                          <Calendar className="w-4 h-4 text-blue-600" />
                        }
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {activeTab === 'quittances' ? lease.debut.split('/')[1] + '/' + lease.debut.split('/')[2] : lease.bien}
                        </div>
                        <div className="text-sm text-gray-500">{lease.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{lease.locataire}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(lease.montant || lease.loyer)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lease.debut} - {lease.fin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(lease.statut)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </button>
                      <button className="text-green-600 hover:text-green-900 flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </button>
                      {lease.type === 'bail' && userType === 'proprietaire' && (
                        <button className="text-gray-600 hover:text-gray-900 flex items-center">
                          <Edit className="w-4 h-4 mr-1" />
                          Modifier
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeases.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun contrat trouvé</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'tous' || activeTab !== 'tous'
                ? 'Aucun résultat ne correspond à vos critères de recherche.'
                : userType === 'proprietaire'
                ? 'Vous n\'avez pas encore créé de contrats de location.'
                : 'Vous n\'avez pas encore de baux actifs.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pied de page avec informations légales */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Conformité légale</p>
            <ul className="space-y-1 text-xs">
              <li>• Tous les documents sont conformes à la législation burkinabé</li>
              <li>• Signature électronique validée avec horodatage certifié</li>
              <li>• QR codes de vérification pour l'authenticité des documents</li>
              <li>• Archive sécurisée avec métadonnées complètes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};