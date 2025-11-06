import { Shield, Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import mzakaLogo from "@/assets/logo/mzaka-logo.png";

const Footer = () => {
  return (
    <footer className="py-8 bg-gradient-to-r from-orange-100 via-orange-50 to-stone-50 border-t border-orange-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-sm">
          
          {/* Zone gauche : Logo + Copyright + Badge ANSUT */}
          <div className="flex items-center gap-4">
            <img src={mzakaLogo} alt="MZAKA" className="h-6 w-auto" />
            <span className="text-gray-700">© 2025 MZAKA</span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-burkina-red-600 border border-burkina-red-700 rounded">
              <Shield className="h-3 w-3 text-white" />
              <span className="text-xs text-white">Faso Dan Fani</span>
            </div>
          </div>

          {/* Zone centrale : Liens essentiels */}
          <nav className="flex flex-wrap justify-center gap-3 md:gap-6" aria-label="Footer navigation">
            <Link to="/mentions-legales" className="text-gray-700 hover:text-gray-900 transition-colors">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="text-gray-700 hover:text-gray-900 transition-colors">
              Confidentialité
            </Link>
            <Link to="/aide" className="text-gray-700 hover:text-gray-900 transition-colors">
              Aide
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Zone droite : Icônes réseaux sociaux */}
          <div className="flex gap-4" aria-label="Réseaux sociaux">
            <a 
              href="https://facebook.com/mzaka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com/mzaka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/company/mzaka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
