#!/bin/bash

# Script de configuration GitHub avec token d'accès personnel
# Usage : ./configurer-github.sh VOTRE_TOKEN

TOKEN=$1
REPO_OWNER="somet1010"
REPO_NAME="m-zaka"

if [ -z "$TOKEN" ]; then
    echo "❌ Erreur: Vous devez fournir votre token GitHub"
    echo "Usage: $0 VOTRE_TOKEN"
    exit 1
fi

echo "🔧 Configuration de l'authentification GitHub..."

# Configuration de l'URL remote avec token
REMOTE_URL="https://$TOKEN@github.com/$REPO_OWNER/$REPO_NAME.git"

# Vérifier si on est dans le bon dossier
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce script doit être exécuté dans le dossier du repository git"
    exit 1
fi

# Configurer l'URL remote
git remote set-url origin "$REMOTE_URL"

echo "✅ Remote origin configuré avec authentification"
echo "📤 Prêt pour le push final !"

# Afficher le statut
echo ""
echo "📊 Statut du repository :"
git status --porcelain | head -5

echo ""
echo "🚀 Pour pousser, utilisez :"
echo "git push origin main"