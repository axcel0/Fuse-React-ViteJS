import { tailwindTokens } from '../design-system/utils.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '.dark'],
  theme: {
    ...tailwindTokens,
    extend: {
      ...tailwindTokens.extend,
      fontFamily: {
        'geist': ['Geist', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        ...tailwindTokens.extend.fontFamily,
      },
      colors: {
        ...tailwindTokens.extend.colors,
        'fuse': {
          'primary': 'var(--fuse-primary)',
          'secondary': 'var(--fuse-secondary)',
          'surface': 'var(--fuse-surface)',
          'background': 'var(--fuse-background)',
          'text-primary': 'var(--fuse-text-primary)',
          'text-secondary': 'var(--fuse-text-secondary)',
          'border': 'var(--fuse-border)',
        }
      },
      breakpoints: {
        'xs': '0px',
        'sm': '600px',
        'md': '960px',
        'lg': '1280px',
        'xl': '1440px',
        '2xl': '1920px',
      },
      // Enhanced animation system
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
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
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      // Enhanced utilities
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
