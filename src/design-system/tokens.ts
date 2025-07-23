/**
 * Material Design 3 Enhanced Design Tokens System
 * Comprehensive design system for consistent UI components
 */

// ===== SPACING SYSTEM =====
export const spacing = {
  xs: '0.25rem',     // 4px
  sm: '0.5rem',      // 8px  
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
  '2xl': '2rem',     // 32px
  '3xl': '3rem',     // 48px
  '4xl': '4rem',     // 64px
  '5xl': '6rem',     // 96px
} as const;

// ===== TYPOGRAPHY SYSTEM =====
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
    display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

// ===== COLOR SYSTEM =====
export const colors = {
  // Primary Colors - Material Design 3
  primary: {
    50: 'rgb(239 246 255)',   // Very light
    100: 'rgb(219 234 254)',  // Light
    200: 'rgb(191 219 254)',  // Light accent
    300: 'rgb(147 197 253)',  // Medium light
    400: 'rgb(96 165 250)',   // Medium
    500: 'rgb(59 130 246)',   // Base - primary
    600: 'rgb(37 99 235)',    // Medium dark
    700: 'rgb(29 78 216)',    // Dark
    800: 'rgb(30 64 175)',    // Very dark
    900: 'rgb(30 58 138)',    // Darkest
    950: 'rgb(23 37 84)',     // Ultra dark
  },
  
  // Secondary Colors
  secondary: {
    50: 'rgb(255 251 235)',
    100: 'rgb(254 243 199)', 
    200: 'rgb(253 230 138)',
    300: 'rgb(252 211 77)',
    400: 'rgb(251 191 36)',
    500: 'rgb(245 158 11)',  // Base - secondary
    600: 'rgb(217 119 6)',
    700: 'rgb(180 83 9)',
    800: 'rgb(146 64 14)',
    900: 'rgb(120 53 15)',
    950: 'rgb(69 26 3)',
  },

  // Neutral/Gray Colors
  neutral: {
    50: 'rgb(250 250 250)',
    100: 'rgb(245 245 245)',
    200: 'rgb(229 229 229)',
    300: 'rgb(212 212 212)',
    400: 'rgb(163 163 163)',
    500: 'rgb(115 115 115)',
    600: 'rgb(82 82 82)',
    700: 'rgb(64 64 64)',
    800: 'rgb(38 38 38)',
    900: 'rgb(23 23 23)',
    950: 'rgb(10 10 10)',
  },

  // Semantic Colors
  success: {
    50: 'rgb(240 253 244)',
    100: 'rgb(220 252 231)',
    500: 'rgb(34 197 94)',   // Base
    600: 'rgb(22 163 74)',
    700: 'rgb(21 128 61)',
    900: 'rgb(20 83 45)',
  },

  warning: {
    50: 'rgb(255 251 235)',
    100: 'rgb(254 243 199)',
    500: 'rgb(245 158 11)',  // Base
    600: 'rgb(217 119 6)',
    700: 'rgb(180 83 9)',
    900: 'rgb(120 53 15)',
  },

  error: {
    50: 'rgb(254 242 242)',
    100: 'rgb(254 226 226)',
    500: 'rgb(239 68 68)',   // Base
    600: 'rgb(220 38 38)',
    700: 'rgb(185 28 28)',
    900: 'rgb(127 29 29)',
  },

  info: {
    50: 'rgb(240 249 255)',
    100: 'rgb(224 242 254)',
    500: 'rgb(59 130 246)',  // Base
    600: 'rgb(37 99 235)',
    700: 'rgb(29 78 216)',
    900: 'rgb(30 58 138)',
  },
} as const;

// ===== ELEVATION SYSTEM =====
export const elevation = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// ===== BORDER RADIUS SYSTEM =====
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',    // Full circle
} as const;

// ===== ANIMATION SYSTEM =====
export const animation = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ===== BREAKPOINT SYSTEM =====
export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px', 
  lg: '1280px',
  xl: '1440px',
  '2xl': '1920px',
} as const;

// ===== Z-INDEX SYSTEM =====
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ===== COMPONENT VARIANTS =====
export const variants = {
  button: {
    sizes: {
      sm: {
        padding: `${spacing.sm} ${spacing.md}`,
        fontSize: typography.fontSize.sm[0],
        borderRadius: borderRadius.md,
      },
      md: {
        padding: `${spacing.md} ${spacing.xl}`,
        fontSize: typography.fontSize.base[0],
        borderRadius: borderRadius.md,
      },
      lg: {
        padding: `${spacing.lg} ${spacing['2xl']}`,
        fontSize: typography.fontSize.lg[0],
        borderRadius: borderRadius.lg,
      },
    },
    variants: {
      primary: {
        backgroundColor: colors.primary[500],
        color: 'white',
        '&:hover': {
          backgroundColor: colors.primary[600],
        },
        '&:active': {
          backgroundColor: colors.primary[700],
        },
      },
      secondary: {
        backgroundColor: colors.secondary[500],
        color: 'white',
        '&:hover': {
          backgroundColor: colors.secondary[600],
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderColor: colors.primary[500],
        color: colors.primary[500],
        '&:hover': {
          backgroundColor: colors.primary[50],
        },
      },
    },
  },
  card: {
    variants: {
      elevated: {
        backgroundColor: 'white',
        boxShadow: elevation.md,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
      },
      outlined: {
        backgroundColor: 'white',
        borderWidth: '1px',
        borderColor: colors.neutral[200],
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
      },
      filled: {
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
      },
    },
  },
} as const;

// ===== ACCESSIBILITY HELPERS =====
export const a11y = {
  focusRing: {
    outline: `2px solid ${colors.primary[500]}`,
    outlineOffset: '2px',
  },
  screenReader: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
} as const;

// ===== TYPE EXPORTS =====
export type Spacing = keyof typeof spacing;
export type Colors = typeof colors;
export type Elevation = keyof typeof elevation;
export type BorderRadius = keyof typeof borderRadius;
export type Animation = typeof animation;
export type Breakpoints = keyof typeof breakpoints;
export type ZIndex = keyof typeof zIndex;

// ===== MAIN DESIGN TOKENS EXPORT =====
export const designTokens = {
  spacing,
  typography,
  colors,
  elevation,
  borderRadius,
  animation,
  breakpoints,
  zIndex,
} as const;
