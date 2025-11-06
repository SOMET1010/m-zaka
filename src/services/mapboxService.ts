import { logger } from './logger';

/**
 * Service pour gérer le token Mapbox - MZAKA Burkina Faso
 * Utilise directement la clé API pour une approche simple et fiable
 */

// Clé API Mapbox fournie pour MZAKA
export const MAPBOX_TOKEN = 'pk.eyJ1IjoicHNvbWV0IiwiYSI6ImNtYTgwZ2xmMzEzdWcyaXM2ZG45d3A4NmEifQ.MYXzdc5CREmcvtBLvfV0Lg';

let cachedToken: string | null = MAPBOX_TOKEN;

/**
 * Récupère le token Mapbox directement depuis la configuration
 * Pas besoin de cache car c'est une valeur statique
 */
export const getMapboxToken = (): string | null => {
  if (cachedToken) {
    logger.info('Token Mapbox MZAKA chargé directement depuis la configuration');
    return cachedToken;
  }

  logger.error('Token Mapbox MZAKA non disponible');
  return null;
};

/**
 * Réinitialise le cache du token (utile pour forcer un refresh)
 */
export const clearMapboxTokenCache = () => {
  cachedToken = MAPBOX_TOKEN;
  logger.info('Cache du token Mapbox MZAKA réinitialisé');
};

