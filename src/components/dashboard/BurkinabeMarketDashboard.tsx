import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  Home,
  DollarSign,
  MapPin,
  Users,
  Star,
  Calendar,
  Award,
  BarChart3,
  PieChart,
  Target,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

// Données statistiques du marché immobilier d'Ouagadougou
export const OUAGA_MARKET_DATA = {
  priceRanges: [
    { range: '< 50k', count: 45, avgPrice: 35000, color: '#10b981' },
    { range: '50k-100k', count: 120, avgPrice: 75000, color: '#22c55e' },
    { range: '100k-200k', count: 180, avgPrice: 150000, color: '#f59e0b' },
    { range: '200k-300k', count: 95, avgPrice: 250000, color: '#f97316' },
    { range: '300k+', count: 80, avgPrice: 450000, color: '#ef4444' }
  ],
  
  neighborhoodStats: [
    {
      name: 'Nonsin',
      avgPrice: 75000,
      trend: 'stable',
      properties: 130,
      popularity: 85,
      growth: 0
    },
    {
      name: 'Koulouba',
      avgPrice: 120000,
      trend: 'up',
      properties: 95,
      popularity: 92,
      growth: 8
    },
    {
      name: 'Basilea',
      avgPrice: 200000,
      trend: 'up',
      properties: 42,
      popularity: 88,
      growth: 12
    },
    {
      name: 'Ouaga 2000',
      avgPrice: 450000,
      trend: 'up',
      properties: 15,
      popularity: 78,
      growth: 15
    },
    {
      name: 'Gaoua',
      avgPrice: 85000,
      trend: 'stable',
      properties: 78,
      popularity: 65,
      growth: 2
    },
    {
      name: 'Kombissiri',
      avgPrice: 250000,
      trend: 'up',
      properties: 28,
      popularity: 82,
      growth: 10
    }
  ],
  
  propertyTypes: [
    { type: 'Appartement', count: 280, percentage: 54, avgPrice: 120000 },
    { type: 'Maison', count: 150, percentage: 29, avgPrice: 180000 },
    { type: 'Studio', count: 60, percentage: 12, avgPrice: 65000 },
    { type: 'Villa', count: 30, percentage: 5, avgPrice: 350000 }
  ],
  
  monthlyTrends: [
    { month: 'Jan', properties: 95, avgPrice: 165000, demand: 88 },
    { month: 'Fév', properties: 110, avgPrice: 172000, demand: 92 },
    { month: 'Mar', properties: 125, avgPrice: 168000, demand: 95 },
    { month: 'Avr', properties: 140, avgPrice: 175000, demand: 90 },
    { month: 'Mai', properties: 130, avgPrice: 180000, demand: 85 },
    { month: 'Jun', properties: 115, avgPrice: 185000, demand: 82 }
  ]
};

// Couleurs du marché burkinabé
export const MARKET_COLORS = {
  primary: '#2256A3',      // Bleu ANSUT
  secondary: '#F08224',    // Orange burkinabé
  success: '#10B981',      // Vert croissance
  warning: '#F59E0B',      // Orange attention
  danger: '#EF4444',       // Rouge alerte
  affordable: '#059669',   // Vert abordable
  mid: '#0891B2',          // Bleu moyen
  premium: '#7C3AED'       // Violet premium
};

interface MarketStatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  color?: string;
}

const MarketStatsCard: React.FC<MarketStatsCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
  color = MARKET_COLORS.primary
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-danger" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-danger';
    return 'text-gray-500';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4" style={{ color }} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change !== undefined && (
          <div className="flex items-center text-sm space-x-1">
            {getTrendIcon()}
            <span className={getTrendColor()}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-gray-500">vs mois dernier</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

interface BurkinabeMarketDashboardProps {
  className?: string;
  userType?: 'locataire' | 'proprietaire' | 'agence';
}

export const BurkinabeMarketDashboard: React.FC<BurkinabeMarketDashboardProps> = ({
  className,
  userType = 'locataire'
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Indicateurs clés du marché */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MarketStatsCard
          title="Prix moyen à Ouagadougou"
          value="175,000 FCFA"
          change={3.2}
          trend="up"
          icon={DollarSign}
          description="Loyer mensuel moyen"
          color={MARKET_COLORS.secondary}
        />
        
        <MarketStatsCard
          title="Logements disponibles"
          value="520"
          change={8.5}
          trend="up"
          icon={Home}
          description="Biens actifs sur M'ZAKA"
          color={MARKET_COLORS.primary}
        />
        
        <MarketStatsCard
          title="Quartiers couverts"
          value="10"
          change={0}
          trend="stable"
          icon={MapPin}
          description="Zones d'Ouagadougou"
          color={MARKET_COLORS.success}
        />
        
        <MarketStatsCard
          title="Taux d'occupation"
          value="78%"
          change={-2.1}
          trend="down"
          icon={Users}
          description="Logements loués"
          color={MARKET_COLORS.warning}
        />
      </div>

      {/* Tabs pour différentes vues */}
      <Tabs defaultValue="quartiers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quartiers">Quartiers</TabsTrigger>
          <TabsTrigger value="prix">Prix & Tendances</TabsTrigger>
          <TabsTrigger value="types">Types de biens</TabsTrigger>
          <TabsTrigger value="analyse">Analyse détaillée</TabsTrigger>
        </TabsList>

        {/* Vue Quartiers */}
        <TabsContent value="quartiers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classement des quartiers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Quartiers les plus demandés</span>
                </CardTitle>
                <CardDescription>
                  Classement par popularité et prix moyen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {OUAGA_MARKET_DATA.neighborhoodStats.map((quarter, index) => (
                    <div key={quarter.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{quarter.name}</h4>
                          <p className="text-sm text-gray-500">{quarter.properties} propriétés</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {quarter.avgPrice.toLocaleString()} FCFA
                        </div>
                        <div className="flex items-center space-x-1">
                          {quarter.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : quarter.trend === 'down' ? (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          ) : (
                            <Activity className="h-3 w-3 text-gray-500" />
                          )}
                          <span className={`text-xs ${
                            quarter.trend === 'up' ? 'text-green-600' : 
                            quarter.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {quarter.trend === 'up' ? '+' : ''}{quarter.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Carte des prix par quartier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Répartition des prix</span>
                </CardTitle>
                <CardDescription>
                  Distribution des loyers par tranche
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={OUAGA_MARKET_DATA.priceRanges}
                      dataKey="count"
                      nameKey="range"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ range, percentage }) => `${range}: ${percentage}%`}
                    >
                      {OUAGA_MARKET_DATA.priceRanges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} propriétés`, 'Nombre']}
                      labelFormatter={(label) => `Tranche: ${label}`}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vue Prix & Tendances */}
        <TabsContent value="prix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Évolution des prix et de la demande</span>
              </CardTitle>
              <CardDescription>
                Tendances du marché immobilier d'Ouagadougou (6 derniers mois)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={OUAGA_MARKET_DATA.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'avgPrice' ? `${value.toLocaleString()} FCFA` : value,
                      name === 'avgPrice' ? 'Prix moyen' : 
                      name === 'properties' ? 'Nouvelles propriétés' : 'Indice de demande'
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="properties" fill={MARKET_COLORS.primary} name="Nouvelles propriétés" />
                  <Line yAxisId="right" type="monotone" dataKey="avgPrice" stroke={MARKET_COLORS.secondary} strokeWidth={2} name="Prix moyen (FCFA)" />
                  <Line yAxisId="right" type="monotone" dataKey="demand" stroke={MARKET_COLORS.success} strokeWidth={2} name="Demande (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vue Types de biens */}
        <TabsContent value="types" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Types de propriétés les plus recherchés</CardTitle>
                <CardDescription>
                  Répartition par type de logement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {OUAGA_MARKET_DATA.propertyTypes.map((type) => (
                    <div key={type.type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{type.type}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {type.count} propriétés
                          </span>
                          <Badge variant="secondary">{type.percentage}%</Badge>
                        </div>
                      </div>
                      <Progress value={type.percentage} className="h-2" />
                      <div className="text-sm text-gray-500">
                        Prix moyen: {type.avgPrice.toLocaleString()} FCFA/mois
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse comparative des prix</CardTitle>
                <CardDescription>
                  Prix moyens par type de propriété
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={OUAGA_MARKET_DATA.propertyTypes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} FCFA`, 'Prix moyen']} />
                    <Bar dataKey="avgPrice" fill={MARKET_COLORS.secondary} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vue Analyse détaillée */}
        <TabsContent value="analyse" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Opportunités d'investissement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800">Quartiers en croissance</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Pabre, Somgandé - Potentiel d'investissement élevé
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Marché équilibré</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Azimmo, Gounghin - Prix stables, demande constante
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-800">Marché premium</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Ouaga 2000, Basilea - Clientèle haut de gamme
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Recommandations M'ZAKA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pour les primo-accédants</h4>
                      <p className="text-sm text-gray-600">Nonsin, Gaoua - Prix abordables</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pour les familles</h4>
                      <p className="text-sm text-gray-600">Kombissiri, Basilea - Quartiers résidentiels</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pour les professionnels</h4>
                      <p className="text-sm text-gray-600">Koulouba, Ouaga 2000 - Proche centre</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BurkinabeMarketDashboard;