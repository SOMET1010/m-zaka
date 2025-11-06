/**
 * M'ZAKA - Configuration Tailwind CSS
 * Identité Visuelle Infosec Burkina
 * Version 1.0.0 - Novembre 2025
 * Modernité ancrée dans les valeurs locales
 */

import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // 🏠 M'ZAKA - Identité Visuelle Infosec Burkina
        // Palette inspirée du drapeau et Faso Dan Fani
        'burkina-red': {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#C1121F', // Rouge Burkina principal
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#651F1F',
          950: '#450A0A',
        },
        'sahel-green': {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#146B3A', // Vert Sahel principal
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        'sun-gold': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F9B208', // Or Soleil principal
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        'earth-dark': {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#1E1E1E', // Terre sombre principal
        },
        'faso-beige': {
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FDF8F3',
          300: '#FBF2E8',
          400: '#F8EBDB',
          500: '#F5EDE0', // Beige clair principal
          600: '#E8D4B8',
          700: '#D4B894',
          800: '#B8996A',
          900: '#9B7D4D',
          950: '#5D4229',
        },

        // Aliases pour la compatibilité
        primary: {
          DEFAULT: '#C1121F', // Rouge Burkina
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#C1121F',
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#651F1F',
        },
        secondary: {
          DEFAULT: '#146B3A', // Vert Sahel
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#146B3A',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        accent: {
          DEFAULT: '#F9B208', // Or Soleil
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F9B208',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        neutral: {
          DEFAULT: '#F5EDE0', // Beige Faso
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FDF8F3',
          300: '#FBF2E8',
          400: '#F8EBDB',
          500: '#F5EDE0',
          600: '#E8D4B8',
          700: '#D4B894',
          800: '#B8996A',
          900: '#1E1E1E',
        },
        dark: {
          DEFAULT: '#1E1E1E', // Terre sombre
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#1E1E1E',
        },
      },
      fontFamily: {
        // 🎨 Typographie M'ZAKA
        'display': ['Poppins', 'sans-serif'], // Titres
        'body': ['Nunito Sans', 'sans-serif'], // Texte
        'sans': ['Nunito Sans', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Tailles adaptées au contexte burkinabé
        'xs': ['12px', { lineHeight: '18px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }], // Taille minimum 18px
        'xl': ['20px', { lineHeight: '30px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
        '6xl': ['60px', { lineHeight: '1' }],
      },
      spacing: {
        // Zones tactiles 44px minimum
        'touch': '44px',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        // Angles doux inspirés du tissage Faso Dan Fani
        'organic': '8px',
        'organic-lg': '12px',
        'organic-xl': '16px',
        'organic-2xl': '24px',
      },
      boxShadow: {
        // Ombres inspirées de la terre
        'earth': '0 4px 12px rgba(30, 30, 30, 0.1)',
        'earth-lg': '0 8px 24px rgba(30, 30, 30, 0.15)',
        'earth-xl': '0 12px 32px rgba(30, 30, 30, 0.2)',
        'red': '0 4px 12px rgba(193, 18, 31, 0.2)',
        'red-lg': '0 8px 24px rgba(193, 18, 31, 0.3)',
        'green': '0 4px 12px rgba(20, 107, 58, 0.2)',
        'green-lg': '0 8px 24px rgba(20, 107, 58, 0.3)',
        'gold': '0 4px 12px rgba(249, 178, 8, 0.2)',
        'gold-lg': '0 8px 24px rgba(249, 178, 8, 0.3)',
      },
      animation: {
        // Animations inspirées de la culture locale
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-organic': 'bounceOrganic 1s infinite',
        'pulse-red': 'pulseRed 2s infinite',
        'pulse-green': 'pulseGreen 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceOrganic: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-8px)' },
          '70%': { transform: 'translateY(-4px)' },
          '90%': { transform: 'translateY(-2px)' },
        },
        pulseRed: {
          '0%, 100%': { 
            backgroundColor: '#C1121F',
            boxShadow: '0 0 0 0 rgba(193, 18, 31, 0.7)'
          },
          '70%': { 
            backgroundColor: '#B91C1C',
            boxShadow: '0 0 0 10px rgba(193, 18, 31, 0)'
          },
        },
        pulseGreen: {
          '0%, 100%': { 
            backgroundColor: '#146B3A',
            boxShadow: '0 0 0 0 rgba(20, 107, 58, 0.7)'
          },
          '70%': { 
            backgroundColor: '#059669',
            boxShadow: '0 0 0 10px rgba(20, 107, 58, 0)'
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
} satisfies Config;