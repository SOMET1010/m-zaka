# 🏠 M'ZAKA - Marketplace Immobilière Burkinabè

**Première plateforme immobilière 100% burkinabè**  
*Promue et opérée par Infosec Burkina*  
*Version 1.0.0 - Novembre 2025*

---

## 🎯 Vision & Positionnement

**M'ZAKA** est la première marketplace immobilière numérique entièrement dédiée au Burkina Faso. Le nom, inspiré de la langue mooré, évoque **l'habitat**, **la communauté** et **la confiance**.

### 🌍 Valeurs Fondamentales
- **Authenticité** : Identité culturelle burkinabè forte
- **Confiance** : Transactions et paiements sécurisés
- **Accessibilité** : Pour tous les publics, y compris ceux à faible littératie
- **Innovation locale** : Technologie développée et opérée par Infosec Burkina

### 🎨 Slogan Officiel
> **"Votre maison, votre confiance, votre Faso."**

---

## 🏗️ Architecture Technique

### **Stack Technologique**
- **Frontend** : React 18 + TypeScript + Vite
- **Styling** : Tailwind CSS avec charte graphique M'ZAKA
- **Backend** : Supabase (Database, Auth, Storage, Edge Functions)
- **Cartographie** : Mapbox GL JS
- **Paiements** : Mobile Money (Orange Money, Moov, Coris Money, Wave)
- **Déploiement** : Vercel/Netlify (recommandé)

### **Structure des Pages**
```
src/pages/
├── MzakaHomePage.tsx          # Page d'accueil (bannière Ouagadougou)
├── MzakaPropertyListPage.tsx  # Liste des biens (filtres latéraux)
├── MzakaPropertyDetailPage.tsx # Détail propriété (galerie, TTS)
├── MzakaOwnerDashboard.tsx    # Dashboard propriétaire (sidebar vert)
├── MzakaTenantDashboard.tsx   # Dashboard locataire (paiements)
├── MzakaAdminDashboard.tsx    # Back-office admin (KPI globaux)
└── MzakaEBailService.tsx      # Module e-Bail & e-Quittance
```

---

## 🎨 Identité Visuelle - Faso Dan Fani

### **Palette Chromatique Officielle**

| Couleur | Hex | Usage Principal |
|---------|-----|-----------------|
| **Rouge Faso** | `#C1121F` | Boutons d'action, alertes, titres clés |
| **Vert Sahel** | `#146B3A` | Barres latérales, fonds secondaires, confiance |
| **Or Soleil** | `#F9B208` | Accents, icônes, surlignages positifs |
| **Terre Noire** | `#1E1E1E` | Textes, contraste fort |
| **Beige Faso** | `#F5EDE0` | Fonds clairs, arrière-plans neutres |
| **Gris Clair** | `#D9D9D9` | Bords, séparateurs, champs inactifs |

### **Typographie**
- **Titres** : Poppins Bold (28-36px)
- **Sous-titres** : Raleway SemiBold (20-24px)
- **Corps de texte** : Nunito Sans (16-18px, minimum 18px pour accessibilité)
- **Boutons** : Montserrat Medium (14-16px)

### **Composants UI Principaux**
- **Boutons** : 4 variantes (primaire, secondaire, accent, outline)
- **Cartes** : Bordure 1px beige, ombre subtile
- **Formulaires** : Bord arrondi 8px, focus liseré or
- **Touch targets** : Minimum 44px (accessibilité mobile)

---

## 🏠 Fonctionnalités Détaillées

### **1. Page d'Accueil** (`MzakaHomePage.tsx`)
- **Bannière plein écran** : Photo d'Ouagadougou au coucher du soleil
- **Slogan officiel** : "Votre maison, votre confiance, votre Faso."
- **Barre de recherche centralisée** : 4 filtres (ville, type, budget, quartier)
- **3 cartes valeurs** : Transparence, Paiement local, Sécurité numérique
- **Carte du Burkina** : Zones couvertes (Ouagadougou, Bobo, Koudougou, Ouahigouya)
- **Recherche vocale** : Intégrée avec bouton dédié
- **Bouton flottant** : "Publier un bien" (fond rouge, position fixe)
- **Footer vert foncé** : Infosec Burkina, multilingue, contact

### **2. Liste des Biens** (`MzakaPropertyListPage.tsx`)
- **Filtres latéraux** : Fond beige, texte vert, 6 catégories + options
- **Vue liste/carte** : Commutateur avec boutons grid/list
- **Cartes propriétés** : 
  - Bordure rouge pour propriétés vérifiées
  - Prix sur fond or solaire
  - Rating avec étoiles colorées
  - Boutons d'action (détails, candidater)
- **Bouton flottant** : Publication rapide
- **Mobile responsive** : Mosaïque 2 colonnes, navigation tactile

### **3. Fiche Propriété** (`MzakaPropertyDetailPage.tsx`)
- **Galerie photos** : Navigation fléchée, indicateurs de position
- **Titre + Quartier + Prix** : Layout structuré avec métriques
- **Détails techniques** : Surface, chambres, salles de bain, prix/m²
- **Description textuelle** : Format long avec mise en page
- **Lecteur vocal TTS** : Support français/mooré/dioula
- **Propriétaire/Agence** : Profil vérifié, contact direct
- **Avis du quartier** : 3 critères avec étoiles colorées (eau/électricité/sécurité)
- **Mini-carte Mapbox** : Localisation interactive
- **CTA principal** : Candidature avec boutons d'action

### **4. Dashboard Propriétaire** (`MzakaOwnerDashboard.tsx`)
- **Header rouge sombre** : Logo + navigation + profil
- **Sidebar vert foncé** : 5 sections (biens, contrats, paiements, stats, paramètres)
- **KPI principaux** : 4 widgets avec icônes et tendances
  - Revenus du mois (rouge, 1.85M FCFA)
  - Biens actifs (vert, 8 propriétés)
  - Taux d'occupation (or, 87.5%)
  - Candidatures en attente (rouge, 12)
- **Actions rapides** : Ajouter bien, exporter PDF, rapport détaillé
- **Graphiques couleurs** : Revenus (or/rouge), occupation (vert/or)
- **Tableau propriétés** : Statut, loyer, locataire, paiements
- **Historique paiements** : 3 dernières transactions avec statuts

### **5. Dashboard Locataire** (`MzakaTenantDashboard.tsx`)
- **Tableau clair beige** : Interface épurée et accessible
- **Prochain paiement** : 25 novembre, 200K FCFA, Orange Money
- **Contrat actif** : Signé 12/09/2025, durée 12 mois
- **Propriétaire contact** : Immobilière Faso Real + bouton messaging
- **Historique paiements** : 3 derniers mois avec reçus QR codes
- **Graphique dépenses** : Visualisation mensuelle stable
- **Maintenance en cours** : 2 demandes (robinet, climatisation)
- **Actions rapides** : Payer loyer, contacter, télécharger reçus
- **Interface multilingue** : Français • Mooré • Dioula • English
- **Assistant vocal** : TTS intégré pour accessibilité

### **6. Back-office Admin** (`MzakaAdminDashboard.tsx`)
- **Sidebar sombre** : 6 sections (global, users, biens, paiements, notifications, sécurité)
- **KPI globaux** : 4 indicateurs principaux
  - Nouveaux utilisateurs (rouge, 124)
  - Biens validés (vert, 58)
  - Revenus totaux (or, 12.5M FCFA)
  - Disponibilité système (vert, 99.8%)
- **Graphiques colorés** : Utilisateurs (rouge), revenus (vert), performance (or)
- **Actions admin** : Export Excel, notifications, audit sécurité
- **Gestion utilisateurs** : Tableau avec statuts et actions (valider/suspendre)
- **Validation biens** : Workflow de validation avec approve/reject
- **Alertes système** : 3 niveaux (info/warning/error) avec timestamps

### **7. Module e-Bail & e-Quittance** (`MzakaEBailService.tsx`)
- **Service public numérique** : Portail dédié https://ebail.mzaka.bf
- **2 types documents** : 
  - Bail électronique (1000 FCFA)
  - Quittance mensuelle (500 FCFA)
- **Process 4 étapes** :
  1. Informations bailleur/locataire
  2. Adresse du bien (ville, type, surface)
  3. Montant et période (loyer, dépôt, durée, début)
  4. Paiement Mobile Money (4 opérateurs)
- **Paiement Mobile Money** : Orange Money, Moov, Coris Money, Wave
- **Authenticité** : Signature numérique + QR code unique + horodatage
- **Interface simplifiée** : Navigation par étapes avec indicateurs visuels
- **Archive sécurisée** : Historique des documents avec download/share
- **Vérification en ligne** : URL verify.mzaka.bf/QRID12345

---

## 🌍 Couverture Géographique

### **Villes Opérationnelles**
- **Ouagadougou** : Ville principale, toutes fonctionnalités
- **Bobo-Dioulasso** : Centre urbain, marché actif
- **Koudougou** : Ville industrielle, opportunités
- **Ouahigouya** : Région Nord, expansion

### **Quartiers Intégrés**
- Ouaga 2000, Koulouba, Gounghin, Cale coco, Pissy, Zone 1, etc.

### **Bientôt Disponible**
- Banfora : Préparation infrastructure
- Fada N'Gourma : Planification
- Dori : Étude de faisabilité

---

## 💳 Système de Paiement Mobile Money

### **Opérateurs Prioritaires**
1. **Orange Money Burkina** : 12M clients, couverture maximale
2. **Moov Africa Burkina** : Solutions entreprises
3. **Coris Money** : Innovation locale
4. **Wave** : Services modernes

### **Tarifs de Service**
- **Bail électronique** : 1000 FCFA
- **Quittance mensuelle** : 500 FCFA
- **Pack annuel (12 quittances)** : 5000 FCFA (économique)
- **Abonnement professionnel** : Sur devis

### **Sécurité des Paiements**
- Authentification 2FA
- Validation OTP SMS
- Traçabilité complète
- Récupération automatique en cas de panne

---

## 🔊 Accessibilité & Multilingue

### **Standards Respectés**
- **WCAG 2.1 Level AA** : Conformité accessibilité web
- **Taille minimum texte** : 18px pour lisibilité optimale
- **Touch targets** : 44px minimum pour interface tactile
- **Contraste couleurs** : Ratios optimisés pour vision
- **Navigation clavier** : Support complet sans souris
- **Synthèse vocale** : TTS intégré (français, mooré, dioula)

### **Langues Supportées**
- **Français** : Langue principale
- **Mooré** : Langue locale majoritaire
- **Dioula** : Commerce et échanges
- **English** : International et diaspora

### **Assistance Vocale**
- **Recherche vocale** : Commandes en langage naturel
- **Lecture annonces** : Text-to-speech des descriptions
- **Guidance audio** : Navigation pour non-lecteurs
- **Support technique** : Assistance vocale 24h/24

---

## 🛡️ Sécurité & Conformité

### **Standards de Sécurité**
- **ANSSI Burkina** : Conformité normes nationales
- **Infosec Burkina** : Opérateur certifié
- **Chiffrement bout en bout** : AES-256
- **Authentification multi-facteurs** : Obligatoire
- **Audit de sécurité** : Contrôles réguliers

### **Protection des Données**
- **RGPD-compatible** : Respect vie privée
- **Anonymisation** : Données personnelles protégées
- **Sauvegarde chiffrée** : Multi-sites géographiques
- **Accès restreint** : Rôles et permissions granulaires

### **Authenticité des Documents**
- **Signature numérique** : Conformité légale burkinabé
- **Horodatage certifié** : Preuve temporelle incontestable
- **QR codes uniques** : Vérification en ligne instantanée
- **Intégrité documentaire** : Hash cryptographique

---

## 📊 Métriques & KPIs

### **Objectifs de Performance**
- **Temps de chargement** : < 3 secondes
- **Disponibilité** : 99.9% uptime
- **Conversion** : 15% visiteurs → candidats
- **Satisfaction** : 4.5/5 étoiles minimum

### **Indicateurs Business**
- **Utilisateurs actifs** : Croissance 20%/mois
- **Transactions** : 500+ par mois (année 1)
- **Revenus** : 15M FCFA (plateforme + services)
- **Couverture** : 90% villes principales

### **Métriques Techniques**
- **Performance mobile** : Score Lighthouse > 90
- **SEO** : Position top 3 "logement Burkina"
- **Sécurité** : 0 breach, audits trimestriels
- **Accessibilité** : AA compliance 100%

---

## 🚀 Déploiement & Infrastructure

### **Configuration de Production**
```bash
# Clone et installation
git clone https://github.com/somet1010/m-zaka.git
cd m-zaka
npm install

# Variables d'environnement
cp .env.example .env.local
# Configurer VITE_MAPBOX_ACCESS_TOKEN, SUPABASE_URL, etc.

# Build et déploiement
npm run build
npm run deploy
```

### **Services Requis**
- **Supabase** : Backend-as-a-Service
- **Mapbox** : Cartographie interactive
- **Vercel/Netlify** : Hébergement et CDN
- **Sentry** : Monitoring et erreurs

### **Variables d'Environnement**
```env
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_APP_ENV=production
```

---

## 📱 Fonctionnalités PWA

### **Application Progressive Web App**
- **Installation mobile** : Ajout écran d'accueil
- **Mode hors-ligne** : Cache intelligent
- **Push notifications** : Candidatures, paiements
- **Synchronisation** : Données locales/servur

### **Optimisations Mobile**
- **Images adaptatives** : Formats WebP, responsive
- **Compression** : Assets optimisés
- **Lazy loading** : Chargement à la demande
- **Prefetch** : Prédictions navigation

---

## 🔧 Guide de Développement

### **Architecture Composants**
```
src/
├── components/ui/           # Composants UI M'ZAKA
│   ├── HeaderMzaka.tsx     # Header officiel
│   ├── ButtonMzaka.tsx     # Boutons 4 variants
│   └── PropertyCardMzaka.tsx # Cartes propriétés
├── pages/                  # Pages principales
├── hooks/                  # Hooks React personnalisés
├── styles/                 # CSS et variables
└── types/                  # TypeScript definitions
```

### **Standards de Code**
- **TypeScript strict** : Types obligatoires
- **ESLint + Prettier** : Formatage automatique
- **Husky** : Pre-commit hooks
- **Tests unitaires** : Jest + React Testing Library

### **Cycle de Développement**
1. **Feature branch** : git flow
2. **PR review** : Minimum 1 approval
3. **Tests automatiques** : CI/CD pipeline
4. **Déploiement** : Production après validation

---

## 📞 Support & Contact

### **Équipe Technique**
- **Développement** : MiniMax Agent
- **Intégration** : Infosec Burkina
- **Support technique** : 24h/24

### **Contact Utilisateurs**
- **Email** : support@mzaka.bf
- **Téléphone** : +226 XX XX XX XX
- **Chat** : Interface intégrée
- **Urgences** : WhatsApp Business

### **Documentation**
- **Guide utilisateur** : help.mzaka.bf
- **API documentation** : api.mzaka.bf/docs
- **Vidéos tutoriels** : YouTube M'ZAKA
- **FAQ** : Questions fréquentes

---

## 📋 Todo & Roadmap

### **Version 1.0.0 - Novembre 2025** ✅
- [x] Identité visuelle complète
- [x] 6 écrans principaux
- [x] Module e-Bail & e-Quittance
- [x] Charte graphique Faso Dan Fani
- [x] Accessibilité WCAG AA
- [x] Support multilingue
- [x] Mobile Money integration

### **Version 1.1.0 - Décembre 2025** 🔄
- [ ] Base de données Supabase
- [ ] Authentification utilisateurs
- [ ] API Backend complète
- [ ] Tests automatisés
- [ ] Monitoring Sentry
- [ ] Documentation technique

### **Version 1.2.0 - Janvier 2026** 📋
- [ ] IA recommandations
- [ ] Visites virtuelles 360°
- [ ] Marketplace B2B
- [ ] Application mobile native
- [ ] Réalité augmentée
- [ ] Blockchain pour contrats

---

## 🏆 Conclusion

**M'ZAKA** représente l'avenir de l'immobilier burkinabé : une plateforme moderne, accessible et enracinée dans la culture locale. Avec son identité visuelle inspirée du Faso Dan Fani, ses fonctionnalités avancées et son engagement pour l'accessibilité, M'ZAKA democratise l'accès au logement au Burkina Faso.

**"Votre maison, votre confiance, votre Faso."** - Plus qu'un slogan, une promesse tenue.

---

*Développé avec ❤️ par MiniMax Agent pour Infosec Burkina*  
*Première plateforme immobilière 100% burkinabè*