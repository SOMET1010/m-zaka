# 🏠 M'ZAKA - Plateforme Immobilière Burkina Faso

> **M'ZAKA** est la plateforme immobilière révolutionnaire dédiée au marché burkinabé, adaptée spécifiquement aux besoins et aux habitudes des utilisateurs du Burkina Faso.

## 🎯 Vision

M'ZAKA vise à révolutionner le marché immobilier au Burkina Faso en offrant une expérience utilisateur optimisée et des solutions adaptées au contexte local, notamment les systèmes de paiement Mobile Money.

## ✨ Fonctionnalités Clés

### 🗺️ **Adaptation Géographique Complète**
- **13 quartiers de Ouagadougou** avec données GPS précises
- **Centres d'intérêt (POI)** adaptés à la capitale burkinabé
- **Cartographie interactive** avec Mapbox GL

### 💰 **Système de Paiement Mobile Money**
- **Orange Money BF** (12M d'abonnés, frais 1%)
- **Moov Africa** (frais 1.2%)
- **Coris Money** (frais 0.8%)
- **Wave** (frais 1%)

### 🏠 **Données Immobilières Réalistes**
- **520 propriétés** générées pour la démonstration
- **Prix adaptés** au marché de Ouagadougou
- **Répartition par quartiers** avec caractéristiques détaillées

### 📱 **Interface Optimisée Burkina Faso**
- **Design mobile-first** pour smartphone
- **Accessibilité** (WCAG 2.1)
- **Couleurs culturelles** (bleu=confiance, rouge=terre, jaune=prospérité)
- **Système de reviews** avec 10 critères locaux

## 🛠️ Technologies

- **Frontend :** React 18 + TypeScript + Vite
- **Styling :** TailwindCSS + Radix UI
- **Cartographie :** Mapbox GL JS
- **Mobile :** Capacitor (iOS/Android)
- **Backend :** Supabase (Database, Auth, Storage)
- **Build :** PWA (Progressive Web App)

## 🚀 Démarrage Rapide

```bash
# Cloner le repository
git clone https://github.com/SOMET1010/m-zaka.git
cd m-zaka

# Installer les dépendances
npm install

# Configuration
cp .env.example .env.local
# Éditez .env.local avec vos clés API

# Lancer en développement
npm run dev
```

## 📊 Structure des Données

### Quartiers de Ouagadougou
1. **Ouaga 2000** - Premium (25-60k FCFA/m²)
2. **Koulouba** - Centre-ville (20-45k FCFA/m²)
3. **Dapoya** - Résidentiel (18-40k FCFA/m²)
4. **Gounghin** - Commercial (15-35k FCFA/m²)
5. **Pissy** - Familial (12-30k FCFA/m²)
6. **Et 8 autres quartiers**

### Types de Propriétés
- **F2/F3/F4** - Appartements familiaux
- **Villa** - Maisons avec jardin
- **Bureau** - Espaces professionnels
- **Local commercial** - Boutiques et commerces
- **Terrain** - Parcelles à construire
- **Studio** - Appartements compacts

## 🎨 Système de Design

### Couleurs Culturelles Burkina Faso
- **Bleu principal** (#1E40AF) - Confiance et stabilité
- **Rouge accent** (#DC2626) - Terre et tradition
- **Jaune highlight** (#EAB308) - Prospérité et soleil
- **Vert succès** (#16A34A) - Nature et croissance

### Accessibilité
- **Zones tactiles** : 44px minimum
- **Contraste** : WCAG 2.1 AA
- **Navigation clavier** : Support complet
- **Lecteurs d'écran** : Aria labels optimisés

## 📈 Métriques du Marché

- **Prix moyen** : 93,638 - 297,145 FCFA/mois
- **Quartier le plus cher** : Ouaga 2000 (297k FCFA)
- **Quartier le plus abordable** : Somgandé (94k FCFA)
- **Types les plus recherchés** : F2, F3, Villas

## 🔧 Développement

### Scripts Disponibles
```bash
npm run dev          # Développement local
npm run build        # Build de production
npm run preview      # Preview du build
npm run test         # Tests unitaires
npm run lint         # Linting du code
```

### Variables d'Environnement
```env
VITE_MAPBOX_ACCESS_TOKEN=pk.xxxxxx
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxx
```

## 🌟 Fonctionnalités en Cours

- [ ] **Système de messagerie** propriétaire-locataire
- [ ] **Visite virtuelle** en 360°
- [ ] **Calculatrice de crédit** immobilier
- [ ] **Notifications push** sur mobile
- [ ] **Mode hors-ligne** PWA amélioré

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le repository
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📞 Contact

**Développé par :** MiniMax Agent  
**Date :** Novembre 2025  
**Version :** 1.0.0  

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

<div align="center">

**🏠 M'ZAKA - Votre partenaire immobilier au Burkina Faso**

*Adapté avec ❤️ pour le marché burkinabé*

</div>