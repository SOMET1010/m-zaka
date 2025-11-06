import React from 'react';
import { Menu, X, Home, User, MessageCircle, Heart, Bell, Settings } from 'lucide-react';

interface HeaderMzakaProps {
  userType?: 'locataire' | 'proprietaire' | 'agence';
  userName?: string;
  notifications?: number;
  onMenuToggle?: () => void;
  onNotificationClick?: () => void;
  isMenuOpen?: boolean;
}

const HeaderMzaka: React.FC<HeaderMzakaProps> = ({
  userType = 'locataire',
  userName = 'Utilisateur',
  notifications = 0,
  onMenuToggle,
  onNotificationClick,
  isMenuOpen = false
}) => {
  return (
    <header className="header-mzaka">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo M'ZAKA */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Logo stylisé inspiré Faso Dan Fani */}
              <div className="w-10 h-10 bg-burkina-red rounded-organic-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  M'ZAKA
                </h1>
                <p className="font-body text-xs text-faso-beige-400">
                  by Infosec Burkina
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Accueil</span>
            </a>
            <a 
              href="/properties" 
              className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Propriétés</span>
            </a>
            <a 
              href="/dashboard" 
              className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-2"
            >
              <User className="w-5 h-5" />
              <span>Mon Espace</span>
            </a>
            <a 
              href="/messages" 
              className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </a>
          </nav>

          {/* Actions Utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Bouton Favoris */}
            <button className="hidden md:flex p-3 text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 rounded-organic-lg hover:bg-white/10 touch-target">
              <Heart className="w-6 h-6" />
            </button>

            {/* Notifications */}
            <button 
              onClick={onNotificationClick}
              className="relative p-3 text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 rounded-organic-lg hover:bg-white/10 touch-target"
            >
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-burkina-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>

            {/* Profil Utilisateur */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="font-body font-semibold text-white text-lg">{userName}</p>
                <p className="font-body text-sm text-faso-beige-300 capitalize">
                  {userType === 'locataire' ? 'Locataire' : 
                   userType === 'proprietaire' ? 'Propriétaire' : 'Agence'}
                </p>
              </div>
              <div className="w-10 h-10 bg-sun-gold rounded-organic-lg flex items-center justify-center">
                <User className="w-6 h-6 text-earth-dark" />
              </div>
            </div>

            {/* Menu Mobile */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-3 text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 rounded-organic-lg hover:bg-white/10 touch-target"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              <a 
                href="/" 
                className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-3 p-3 rounded-organic-lg hover:bg-white/10"
              >
                <Home className="w-5 h-5" />
                <span>Accueil</span>
              </a>
              <a 
                href="/properties" 
                className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-3 p-3 rounded-organic-lg hover:bg-white/10"
              >
                <Home className="w-5 h-5" />
                <span>Propriétés</span>
              </a>
              <a 
                href="/dashboard" 
                className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-3 p-3 rounded-organic-lg hover:bg-white/10"
              >
                <User className="w-5 h-5" />
                <span>Mon Espace</span>
              </a>
              <a 
                href="/messages" 
                className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-3 p-3 rounded-organic-lg hover:bg-white/10"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Messages</span>
              </a>
              <a 
                href="/favoris" 
                className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-3 p-3 rounded-organic-lg hover:bg-white/10"
              >
                <Heart className="w-5 h-5" />
                <span>Mes Favoris</span>
              </a>
              <a 
                href="/settings" 
                className="font-body text-lg text-faso-beige-100 hover:text-sun-gold transition-colors duration-200 touch-target flex items-center space-x-3 p-3 rounded-organic-lg hover:bg-white/10"
              >
                <Settings className="w-5 h-5" />
                <span>Paramètres</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderMzaka;