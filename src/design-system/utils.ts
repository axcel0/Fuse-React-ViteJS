/**
 * Design System Integration Utilities
 * Bridges design tokens with Tailwind CSS and Material-UI
 */

import { colors, spacing, typography, borderRadius, elevation, animation } from './tokens';

// ===== TAILWIND CSS INTEGRATION =====
export const tailwindTokens = {
	extend: {
		colors: {
			// Primary colors
			primary: {
				50: colors.primary[50],
				100: colors.primary[100],
				200: colors.primary[200],
				300: colors.primary[300],
				400: colors.primary[400],
				500: colors.primary[500],
				600: colors.primary[600],
				700: colors.primary[700],
				800: colors.primary[800],
				900: colors.primary[900],
				950: colors.primary[950],
				DEFAULT: colors.primary[500],
			},
			// Secondary colors
			secondary: {
				50: colors.secondary[50],
				100: colors.secondary[100],
				200: colors.secondary[200],
				300: colors.secondary[300],
				400: colors.secondary[400],
				500: colors.secondary[500],
				600: colors.secondary[600],
				700: colors.secondary[700],
				800: colors.secondary[800],
				900: colors.secondary[900],
				950: colors.secondary[950],
				DEFAULT: colors.secondary[500],
			},
			// Neutral colors
			neutral: {
				50: colors.neutral[50],
				100: colors.neutral[100],
				200: colors.neutral[200],
				300: colors.neutral[300],
				400: colors.neutral[400],
				500: colors.neutral[500],
				600: colors.neutral[600],
				700: colors.neutral[700],
				800: colors.neutral[800],
				900: colors.neutral[900],
				950: colors.neutral[950],
				DEFAULT: colors.neutral[500],
			},
			// Semantic colors
			success: colors.success,
			warning: colors.warning,
			error: colors.error,
			info: colors.info,
		},
		spacing: {
			xs: spacing.xs,
			sm: spacing.sm,
			md: spacing.md,
			lg: spacing.lg,
			xl: spacing.xl,
			'2xl': spacing['2xl'],
			'3xl': spacing['3xl'],
			'4xl': spacing['4xl'],
			'5xl': spacing['5xl'],
		},
		fontFamily: typography.fontFamily,
		fontSize: typography.fontSize,
		fontWeight: typography.fontWeight,
		borderRadius: {
			xs: borderRadius.sm,
			sm: borderRadius.base,
			base: borderRadius.md,
			md: borderRadius.lg,
			lg: borderRadius.xl,
			xl: borderRadius['2xl'],
			'2xl': borderRadius['3xl'],
			full: borderRadius.full,
		},
		boxShadow: {
			'elevation-1': elevation.sm,
			'elevation-2': elevation.base,
			'elevation-3': elevation.md,
			'elevation-4': elevation.lg,
			'elevation-5': elevation.xl,
			'elevation-6': elevation['2xl'],
		},
		transitionDuration: animation.duration,
		transitionTimingFunction: animation.easing,
	},
};

// ===== MATERIAL-UI THEME INTEGRATION =====
export const createMuiTokens = (mode: 'light' | 'dark') => ({
	palette: {
		mode,
		primary: {
			50: colors.primary[50],
			100: colors.primary[100],
			200: colors.primary[200],
			300: colors.primary[300],
			400: colors.primary[400],
			500: colors.primary[500],
			600: colors.primary[600],
			700: colors.primary[700],
			800: colors.primary[800],
			900: colors.primary[900],
			main: colors.primary[500],
			light: colors.primary[300],
			dark: colors.primary[700],
			contrastText: '#ffffff',
		},
		secondary: {
			50: colors.secondary[50],
			100: colors.secondary[100],
			200: colors.secondary[200],
			300: colors.secondary[300],
			400: colors.secondary[400],
			500: colors.secondary[500],
			600: colors.secondary[600],
			700: colors.secondary[700],
			800: colors.secondary[800],
			900: colors.secondary[900],
			main: colors.secondary[500],
			light: colors.secondary[300],
			dark: colors.secondary[700],
			contrastText: '#ffffff',
		},
		error: {
			50: colors.error[50],
			100: colors.error[100],
			500: colors.error[500],
			600: colors.error[600],
			700: colors.error[700],
			900: colors.error[900],
			main: colors.error[500],
			light: colors.error[100],
			dark: colors.error[700],
			contrastText: '#ffffff',
		},
		warning: {
			50: colors.warning[50],
			100: colors.warning[100],
			500: colors.warning[500],
			600: colors.warning[600],
			700: colors.warning[700],
			900: colors.warning[900],
			main: colors.warning[500],
			light: colors.warning[100],
			dark: colors.warning[700],
			contrastText: '#ffffff',
		},
		info: {
			50: colors.info[50],
			100: colors.info[100],
			500: colors.info[500],
			600: colors.info[600],
			700: colors.info[700],
			900: colors.info[900],
			main: colors.info[500],
			light: colors.info[100],
			dark: colors.info[700],
			contrastText: '#ffffff',
		},
		success: {
			50: colors.success[50],
			100: colors.success[100],
			500: colors.success[500],
			600: colors.success[600],
			700: colors.success[700],
			900: colors.success[900],
			main: colors.success[500],
			light: colors.success[100],
			dark: colors.success[700],
			contrastText: '#ffffff',
		},
		grey: {
			50: colors.neutral[50],
			100: colors.neutral[100],
			200: colors.neutral[200],
			300: colors.neutral[300],
			400: colors.neutral[400],
			500: colors.neutral[500],
			600: colors.neutral[600],
			700: colors.neutral[700],
			800: colors.neutral[800],
			900: colors.neutral[900],
		},
		background: {
			default: mode === 'light' ? colors.neutral[50] : colors.neutral[900],
			paper: mode === 'light' ? '#ffffff' : colors.neutral[800],
		},
		text: {
			primary: mode === 'light' ? colors.neutral[900] : colors.neutral[100],
			secondary: mode === 'light' ? colors.neutral[600] : colors.neutral[400],
			disabled: mode === 'light' ? colors.neutral[400] : colors.neutral[600],
		},
		divider: mode === 'light' ? colors.neutral[200] : colors.neutral[700],
	},
	typography: {
		fontFamily: typography.fontFamily.sans.join(','),
		h1: {
			fontSize: typography.fontSize['4xl'][0],
			fontWeight: typography.fontWeight.bold,
			lineHeight: typography.fontSize['4xl'][1].lineHeight,
		},
		h2: {
			fontSize: typography.fontSize['3xl'][0],
			fontWeight: typography.fontWeight.bold,
			lineHeight: typography.fontSize['3xl'][1].lineHeight,
		},
		h3: {
			fontSize: typography.fontSize['2xl'][0],
			fontWeight: typography.fontWeight.semibold,
			lineHeight: typography.fontSize['2xl'][1].lineHeight,
		},
		h4: {
			fontSize: typography.fontSize.xl[0],
			fontWeight: typography.fontWeight.semibold,
			lineHeight: typography.fontSize.xl[1].lineHeight,
		},
		h5: {
			fontSize: typography.fontSize.lg[0],
			fontWeight: typography.fontWeight.medium,
			lineHeight: typography.fontSize.lg[1].lineHeight,
		},
		h6: {
			fontSize: typography.fontSize.base[0],
			fontWeight: typography.fontWeight.medium,
			lineHeight: typography.fontSize.base[1].lineHeight,
		},
		body1: {
			fontSize: typography.fontSize.base[0],
			fontWeight: typography.fontWeight.normal,
			lineHeight: typography.fontSize.base[1].lineHeight,
		},
		body2: {
			fontSize: typography.fontSize.sm[0],
			fontWeight: typography.fontWeight.normal,
			lineHeight: typography.fontSize.sm[1].lineHeight,
		},
		caption: {
			fontSize: typography.fontSize.xs[0],
			fontWeight: typography.fontWeight.normal,
			lineHeight: typography.fontSize.xs[1].lineHeight,
		},
	},
	shape: {
		borderRadius: parseInt(borderRadius.md),
	},
	shadows: [
		'none',
		elevation.sm,
		elevation.base,
		elevation.md,
		elevation.lg,
		elevation.xl,
		elevation['2xl'],
		// Add more shadow levels as needed
	],
	transitions: {
		duration: {
			shortest: parseInt(animation.duration.fast),
			shorter: parseInt(animation.duration.normal),
			short: parseInt(animation.duration.slow),
			standard: parseInt(animation.duration.slower),
		},
		easing: {
			easeInOut: animation.easing['ease-in-out'],
			easeOut: animation.easing['ease-out'],
			easeIn: animation.easing['ease-in'],
			sharp: animation.easing.ease,
		},
	},
});

// ===== UTILITY FUNCTIONS =====

/**
 * Get color with opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
	// Convert RGB to RGBA
	if (color.startsWith('rgb(')) {
		return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
	}

	return color;
};

/**
 * Get contrasting text color
 */
export const getContrastColor = (backgroundColor: string): string => {
	// Simple contrast calculation - in production, use a proper contrast algorithm
	const isDark = backgroundColor.includes('900') || backgroundColor.includes('800');
	return isDark ? colors.neutral[100] : colors.neutral[900];
};

/**
 * Responsive utility classes generator
 */
export const responsive = {
	sm: (classes: string) => `sm:${classes}`,
	md: (classes: string) => `md:${classes}`,
	lg: (classes: string) => `lg:${classes}`,
	xl: (classes: string) => `xl:${classes}`,
	'2xl': (classes: string) => `2xl:${classes}`,
};

/**
 * Dark mode utility classes generator
 */
export const darkMode = (classes: string) => `dark:${classes}`;

/**
 * Focus states utility
 */
export const focusStates = {
	ring: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
	outline: 'focus:outline-none focus:outline-2 focus:outline-primary-500 focus:outline-offset-2',
};

/**
 * Hover states utility
 */
export const hoverStates = {
	scale: 'hover:scale-105 transition-transform duration-200',
	shadow: 'hover:shadow-lg transition-shadow duration-200',
	brightness: 'hover:brightness-110 transition-all duration-200',
};

/**
 * Animation presets
 */
export const animations = {
	fadeIn: 'animate-fade-in',
	slideUp: 'animate-slide-up',
	bounce: 'animate-bounce',
	pulse: 'animate-pulse',
	spin: 'animate-spin',
};

// ===== COMPONENT CLASS BUILDERS =====

/**
 * Button class builder
 */
export const buttonClasses = {
	base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

	variants: {
		primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white focus:ring-primary-500',
		secondary: 'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white focus:ring-secondary-500',
		outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
		ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
		danger: 'bg-error-500 hover:bg-error-600 active:bg-error-700 text-white focus:ring-error-500',
	},

	sizes: {
		sm: 'px-3 py-1.5 text-sm rounded-md',
		md: 'px-4 py-2 text-base rounded-md',
		lg: 'px-6 py-3 text-lg rounded-lg',
	},
};

/**
 * Card class builder
 */
export const cardClasses = {
	base: 'rounded-lg overflow-hidden transition-all duration-200',

	variants: {
		elevated: 'bg-white shadow-elevation-3 hover:shadow-elevation-4 dark:bg-neutral-800',
		outlined: 'bg-white border border-neutral-200 hover:border-neutral-300 dark:bg-neutral-800 dark:border-neutral-700',
		filled: 'bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700',
	},

	padding: {
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8',
	},
};

/**
 * Input class builder
 */
export const inputClasses = {
	base: 'block w-full rounded-md border-neutral-300 shadow-sm transition-all duration-200 focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100',

	variants: {
		default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
		error: 'border-error-500 focus:border-error-500 focus:ring-error-500',
		success: 'border-success-500 focus:border-success-500 focus:ring-success-500',
	},

	sizes: {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-3 py-2 text-base',
		lg: 'px-4 py-3 text-lg',
	},
};

export default {
	tailwindTokens,
	createMuiTokens,
	withOpacity,
	getContrastColor,
	responsive,
	darkMode,
	focusStates,
	hoverStates,
	animations,
	buttonClasses,
	cardClasses,
	inputClasses,
};
