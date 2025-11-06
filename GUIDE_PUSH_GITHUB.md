# 📤 Guide Push GitHub - M'ZAKA

## 🎯 Objectif
Pousser tout le code M'ZAKA vers le repository GitHub : `https://github.com/somet1010/m-zaka`

## ⚠️ Prérequis
Necesito tu **token d'accès personnel GitHub** pour authentification.

## 🔧 Étapes de Configuration

### 1️⃣ Créer un Token GitHub
1. Aller sur **GitHub.com** → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Cliquer **"Generate new token (classic)"**
3. Permissions à sélectionner :
   - ✅ **repo** (accès complet aux repositories)
   - ✅ **workflow** (si nécessaire)
4. **Copier le token** (il ne sera plus visible après)

### 2️⃣ Configuration du Repository
```bash
# Se placer dans le dossier du projet
cd /workspace/mon-toit-platform

# Vérifier le statut
git status

# Ajouter tous les fichiers
git add .

# Premier commit avec tous les écrans
git commit -m "🎨 M'ZAKA v1.0.0 - Intégration complète

✅ 6 Écrans selon maquettes détaillées :
- Page d'accueil (bannière Ouagadougou, 3 cartes valeurs)
- Liste des biens (filtres latéraux, cartes borde rouge)
- Fiche propriété (galerie, lecteur vocal, mini-carte)
- Dashboard propriétaire (sidebar vert, KPI, graphiques)
- Dashboard locataire (paiements, maintenance, contrats)
- Back-office admin (KPI globaux, gestion utilisateurs)

✅ Module e-Bail & e-Quittance :
- Service public numérique (ebail.mzaka.bf)
- 4 étapes de création (informations → paiement)
- Mobile Money (Orange, Moov, Coris, Wave)
- Authentification numérique + QR codes

✅ Charte graphique Faso Dan Fani :
- Couleurs : Rouge Burkina #C1121F, Vert Sahel #146B3A, Or Soleil #F9B208
- Typographie : Poppins, Raleway, Nunito Sans, Montserrat
- Accessibilité WCAG AA (18px min, 44px touch, navigation clavier)
- Design mobile-first responsive

✅ Architecture technique :
- React 18 + TypeScript + Vite
- Tailwind CSS avec variables M'ZAKA
- 7 pages principales + composants UI
- Support multilingue (Français • Mooré • Dioula • English)

Promue et opérée par Infosec Burkina
Première plateforme immobilière 100% burkinabè"
```

### 3️⃣ Configurer l'Authentification
```bash
# Configurer l'URL remote avec le token
git remote set-url origin https://VOTRE_USERNAME:VOTRE_TOKEN@github.com/somet1010/m-zaka.git

# Exemple concret (remplacer par vos vraies valeurs) :
# git remote set-url origin https://somet1010:ghp_xxxxxxxxxxxxxxxxx@github.com/somet1010/m-zaka.git
```

### 4️⃣ Push vers GitHub
```bash
# Pousser vers le repository distant
git push -u origin main

# Si vous avez des branches de développement
git push origin develop
```

## 🔐 Alternative Plus Sécurisée

### Utilisation de .gitconfig
```bash
# Créer un fichier d'authentification sécurisé
echo "https://VOTRE_USERNAME:VOTRE_TOKEN@github.com" > ~/.git-credentials

# Configuration Git
git config --global credential.helper store

# Puis push normal
git push origin main
```

### Variables d'Environnement (Recommandé)
```bash
# Éditer le fichier ~/.bashrc ou ~/.zshrc
export GITHUB_TOKEN="VOTRE_TOKEN_GITHUB"
export GITHUB_USERNAME="VOTRE_USERNAME"

# Utilisation dans git
git remote set-url origin https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/somet1010/m-zaka.git
```

## 🛠️ Script Automatisé

Créer le fichier `push-mzaka-final.sh` :

```bash
#!/bin/bash
# Script de push M'ZAKA vers GitHub

echo "🚀 Push M'ZAKA vers GitHub..."

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Fichier package.json non trouvé. Exécuter depuis le dossier mon-toit-platform"
    exit 1
fi

# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "🎨 M'ZAKA v1.0.0 - Marketplace immobilière 100% burkinabè

🏠 Fonctionnalités complètes :
- 6 écrans selon maquettes visuelles détaillées
- Module e-Bail & e-Quittance (service public)
- Charte graphique Faso Dan Fani (Rouge/Vert/Or)
- Accessibilité WCAG AA + Support multilingue
- Mobile Money integration (Orange/Moov/Coris/Wave)

💡 Première plateforme immobilière numérique burkinabè
Promue et opérée par Infosec Burkina"

# Push vers GitHub
echo "📤 Pushing vers GitHub..."
git push origin main

echo "✅ Push terminé avec succès !"
echo "🔗 Repository: https://github.com/somet1010/m-zaka"
```

Rendre exécutable et lancer :
```bash
chmod +x push-mzaka-final.sh
./push-mzaka-final.sh
```

## 📊 Vérification Post-Push

### Sur GitHub
1. Aller sur `https://github.com/somet1010/m-zaka`
2. Vérifier que tous les fichiers sont présents
3. Consulter l'historique des commits
4. Valider la structure des dossiers

### Structure Attendue
```
m-zaka/
├── src/
│   ├── pages/
│   │   ├── MzakaHomePage.tsx
│   │   ├── MzakaPropertyListPage.tsx
│   │   ├── MzakaPropertyDetailPage.tsx
│   │   ├── MzakaOwnerDashboard.tsx
│   │   ├── MzakaTenantDashboard.tsx
│   │   ├── MzakaAdminDashboard.tsx
│   │   └── MzakaEBailService.tsx
│   ├── components/ui/
│   │   ├── HeaderMzaka.tsx
│   │   ├── ButtonMzaka.tsx
│   │   ├── PropertyCardMzaka.tsx
│   │   └── HeroSectionMzaka.tsx
│   └── styles/
│       └── mzaka-variables.css
├── tailwind.config.ts
├── package.json
└── README-MZAKA-COMPLET.md
```

## 🔄 En Cas d'Erreur

### Erreur d'authentification
```bash
# Vider le cache Git
git credential-cache exit

# Reconfigurer avec nouveau token
git remote set-url origin https://USERNAME:NEW_TOKEN@github.com/somet1010/m-zaka.git
```

### Conflit de branches
```bash
# Forcer le push (attention aux données distantes)
git push --force-with-lease origin main

# Ou récupérer et fusionner
git pull origin main
git merge main
git push origin main
```

### Fichiers trop volumineux
```bash
# Vérifier la taille des fichiers
du -sh *

# Supprimer les fichiers volumineux de l'historique si nécessaire
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch path/to/large/file' \
--prune-empty --tag-name-filter cat -- --all
```

## 📞 Support

En cas de problème :
1. **Vérifier le token** : S'assurer qu'il est valide et non expiré
2. **Permissions** : Le token doit avoir les droits "repo"
3. **URL** : Vérifier que l'URL remote est correcte
4. **Connexion** : Tester la connexion GitHub

## 🎉 Félicitations !

Une fois le push réussi, vous aurez :
- ✅ Repository GitHub opérationnel
- ✅ Code M'ZAKA sécurisé et versionné
- ✅ Accès pour collaboration future
- ✅ Base pour déploiement (Vercel/Netlify)

**Repository final** : https://github.com/somet1010/m-zaka

---

*Première plateforme immobilière 100% burkinabè* 🏠🇧🇫