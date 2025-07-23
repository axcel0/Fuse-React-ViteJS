import type { Config } from 'tailwindcss';
import iconSizePlugin from './src/@fuse/tailwind/plugins/icon-size';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '.dark'],
  theme: {
    extend: {
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
