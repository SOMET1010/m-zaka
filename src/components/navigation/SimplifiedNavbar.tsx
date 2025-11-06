import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Search,
  MapPin,
  Plus,
  User,
  Bell,
  Menu,
  X,
  Star,
  TrendingUp,
  Phone,
  MessageCircle,
  Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
}

interface SimplifiedNavbarProps {
  className?: string;
}

// Navigation principale optimisée pour les habitudes de navigation burkinabé
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Accueil',
    href: '/',
    icon: Home,
    description: 'Page d\'accueil M\'ZAKA'
  },
  {
    label: 'Explorer',
    href: '/explorer',
    icon: Search,
    description: 'Rechercher des logements à Ouagadougou'
  },
  {
    label: 'Cartes',
    href: '/carte',
    icon: MapPin,
    description: 'Voir les propriétés sur la carte'
  },
  {
    label: 'Mes Favoris',
    href: '/favoris',
    icon: Star,
    description: 'Logements favoris'
  },
  {
    label: 'Tableau de bord',
    href: '/dashboard',
    icon: TrendingUp,
    description: 'Statistiques et gestion'
  }
];

// Actions rapides pour les utilisateurs connectés
const QUICK_ACTIONS: NavigationItem[] = [
  {
    label: 'Publier',
    href: '/publier',
    icon: Plus,
    description: 'Mettre en location'
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageCircle,
    badge: '3',
    description: 'Boîte de réception'
  }
];

export const SimplifiedNavbar: React.FC<SimplifiedNavbarProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={cn(
      "bg-white border-b-2 border-primary sticky top-0 z-50 shadow-md",
      "font-medium text-base", // Texte plus large par défaut
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo M'ZAKA */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-primary">M'ZAKA</div>
              <div className="text-xs text-gray-600 hidden sm:block">Le logement en toute confiance</div>
            </div>
          </Link>

          {/* Navigation desktop - Version simplifiée */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    "text-base font-medium hover:bg-primary-50",
                    active
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-1 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-3">
            {/* Connexion ou profil */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-secondary">
                    2
                  </Badge>
                </Button>
                
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block">
                    {user.user_metadata?.full_name || 'Mon profil'}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/connexion">
                  <Button variant="outline" size="sm" className="text-sm font-medium">
                    Se connecter
                  </Button>
                </Link>
                <Link to="/inscription">
                  <Button size="sm" className="text-sm font-medium bg-secondary hover:bg-secondary-dark">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}

            {/* Menu mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Actions rapides - Section dédiée */}
        {user && (
          <div className="hidden md:flex items-center space-x-2 pb-3 border-b border-gray-200">
            <span className="text-sm text-gray-600 font-medium">Actions rapides:</span>
            {QUICK_ACTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-primary-50 text-primary hover:bg-primary-100 transition-colors text-sm font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-1 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-base font-medium",
                      active
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div>{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Actions rapides mobile */}
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 font-medium mb-2">Actions rapides:</div>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-50 text-primary hover:bg-primary-100 transition-colors text-sm font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact d'urgence - Caractéristique burkinabé */}
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Support M'ZAKA</span>
              </div>
              <div className="text-sm text-orange-700 mt-1">
                Besoin d'aide ? Appelez le +226 XX XX XX XX
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SimplifiedNavbar;