import type { Config } from 'tailwindcss';
import iconSizePlugin from './src/@fuse/tailwind/plugins/icon-size';
import { tailwindTokens } from './src/design-system/utils';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '.dark'],
  theme: {
    ...tailwindTokens,
    extend: {
      ...tailwindTokens.extend,
      screens: {
        'xs': '0px',
        'sm': '600px',
        'md': '960px',
        'lg': '1280px',
        'xl': '1440px',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xs': '16rem',
          'xs': '20rem',
          'sm': '24rem',
          'md': '28rem',
          'lg': '32rem',
          'xl': '36rem',
          '2xl': '42rem',
          '3xl': '48rem',
          '4xl': '56rem',
          '5xl': '64rem',
          '6xl': '72rem',
          '7xl': '80rem',
        }
      },
      fontSize: {
        'xs': ['0.5625rem', { lineHeight: 'calc(1 / 0.5625)' }],  // 9px
        'sm': ['0.6875rem', { lineHeight: 'calc(1.25 / 0.6875)' }], // 11px
        'md': ['0.75rem', { lineHeight: 'calc(1.25 / 0.75)' }],     // 12px
        'base': ['0.8125rem', { lineHeight: 'calc(1.5 / 0.8125)' }], // 13px
        'lg': ['0.875rem', { lineHeight: 'calc(1.5 / 0.875)' }],    // 14px
        'xl': ['1rem', { lineHeight: 'calc(1.5 / 1)' }],            // 16px
        '2xl': ['1.125rem', { lineHeight: 'calc(1.75 / 1.125)' }],  // 18px
        '3xl': ['1.375rem', { lineHeight: 'calc(1.75 / 1.375)' }],  // 22px
        '4xl': ['1.5rem', { lineHeight: 'calc(2 / 1.5)' }],         // 24px
        '5xl': ['1.75rem', { lineHeight: 'calc(2 / 1.75)' }],       // 28px
        '6xl': ['2.25rem', { lineHeight: 'calc(2 / 2.25)' }],       // 36px
        '7xl': ['3rem', { lineHeight: 'calc(2 / 3)' }],             // 48px
        '8xl': ['3.5rem', { lineHeight: 'calc(2 / 3.5)' }],         // 56px
        '9xl': ['4rem', { lineHeight: 'calc(2 / 4)' }],             // 64px
        '10xl': ['5rem', { lineHeight: 'calc(2 / 5)' }],            // 80px
      },
      fontFamily: {
        'geist': ['Geist', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        ...tailwindTokens.extend.fontFamily,
      },
      colors: {
        // Design system colors from tokens
        ...tailwindTokens.extend.colors,
        // Theme-aware color tokens using CSS variables
        'theme': {
          'primary': 'var(--color-primary)',
          'secondary': 'var(--color-secondary)',
          'accent': 'var(--color-accent)',
          'background': 'var(--color-background)',
          'surface': 'var(--color-surface)',
          'text': 'var(--color-text)',
          'text-secondary': 'var(--color-text-secondary)',
          'border': 'var(--color-border)',
          'error': 'var(--color-error)',
          'warning': 'var(--color-warning)',
          'success': 'var(--color-success)',
          'info': 'var(--color-info)',
        },
        // Fuse-specific colors (legacy support)
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
      spacing: {
        // Theme-aware spacing tokens
        'theme-xs': 'var(--spacing-xs)',
        'theme-sm': 'var(--spacing-sm)',
        'theme-md': 'var(--spacing-md)',
        'theme-lg': 'var(--spacing-lg)',
        'theme-xl': 'var(--spacing-xl)',
        'theme-2xl': 'var(--spacing-2xl)',
        'theme-3xl': 'var(--spacing-3xl)',
      },
      borderRadius: {
        // Theme-aware radius tokens
        'theme-xs': 'var(--radius-xs)',
        'theme-sm': 'var(--radius-sm)',
        'theme-md': 'var(--radius-md)',
        'theme-lg': 'var(--radius-lg)',
        'theme-xl': 'var(--radius-xl)',
        'theme-2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        // Theme-aware shadow tokens
        'theme-xs': 'var(--shadow-xs)',
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)',
        'theme-xl': 'var(--shadow-xl)',
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
    iconSizePlugin,
  ],
};

export default config;
