#!/usr/bin/env node

/**
 * Tailwind CSS Migration Tool - TypeScript Edition
 * Migrates Tailwind CSS classes from v3 to v4 format
 *
 * This script automatically updates Tailwind CSS class names in your codebase
 * to be compatible with Tailwind CSS v4.x syntax and naming conventions.
 *
 * Based on the official Tailwind CSS v3 → v4 upgrade guide:
 * - Handles deprecated utility replacements (bg-opacity-*, flex-shrink-*, etc.)
 * - Updates shadow, blur, and border-radius scales
 * - Converts CSS variables in arbitrary values from [--var] to (--var)
 * - Warns about patterns that need manual attention (space-*, gradients, etc.)
 * - Supports opacity modifier syntax (bg-red-500/50)
 * - Handles variant stacking order changes
 *
 * Usage: npx tsx migrate-tw-classes.ts [directory-path]
 * Example: npx tsx migrate-tw-classes.ts ./src
 *
 * Note: Always review changes carefully and test your application after migration.
 * Some changes may require manual adjustment, especially for complex patterns.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI Colors for better terminal output
const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	bright: '\x1b[1m',
	dim: '\x1b[2m'
} as const;

// Enhanced logger with colors
const logger = {
	error: (message: string) => console.error(`${colors.red}${colors.bright}❌ ${message}${colors.reset}`),
	success: (message: string) => console.log(`${colors.green}${colors.bright}✅ ${message}${colors.reset}`),
	info: (message: string) => console.log(`${colors.blue}${colors.bright}ℹ️  ${message}${colors.reset}`),
	warning: (message: string) => console.log(`${colors.yellow}${colors.bright}⚠️  ${message}${colors.reset}`),
	debug: (message: string) => console.log(`${colors.dim}${colors.cyan}🔍 ${message}${colors.reset}`),
	progress: (message: string) => console.log(`${colors.cyan}🔄 ${message}${colors.reset}`)
};

// Get directory path from command line argument, or default to current directory
const directoryPath: string = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

// Validate if the directory exists
if (!fs.existsSync(directoryPath)) {
	logger.error(`Directory "${directoryPath}" does not exist`);
	process.exit(1);
}

logger.info(`Starting Tailwind CSS v3 → v4 migration in: ${directoryPath}`);

// Project-specific spacing properties that need numeric value conversion (divide by 4)
// Note: This is not part of the official v3→v4 migration, but appears to be project-specific
const spacingProperties: string[] = [
	'text', // text-size
	'p',
	'px',
	'py',
	'pt',
	'pr',
	'pb',
	'pl', // padding
	'm',
	'mx',
	'my',
	'mt',
	'mr',
	'mb',
	'ml', // margin
	'gap',
	'gap-x',
	'gap-y', // gap
	'space-x',
	'space-y', // space
	'w',
	'h', // width, height
	'max-w',
	'max-h', // max-width, max-height
	'min-w',
	'min-h', // min-width, min-height
	'inset',
	'top',
	'right',
	'bottom',
	'left', // positioning
	'translate-x',
	'translate-y', // translate
	'icon-size' // custom icon-size
];

// Tailwind v4 class replacements mapping (based on official v3 → v4 migration guide)
const tailwindV4Replacements: Record<string, string> = {
	// Deprecated utilities - direct replacements as per official docs
	// Opacity utilities (bg-opacity-*, text-opacity-*, etc.) handled separately in opacity patterns

	// Flex utilities - renamed in v4
	'flex-shrink-0': 'shrink-0',
	'flex-shrink': 'shrink',
	'flex-grow-0': 'grow-0',
	'flex-grow': 'grow',

	// Text utilities
	'overflow-ellipsis': 'text-ellipsis',

	// Decoration utilities
	'decoration-slice': 'box-decoration-slice',
	'decoration-clone': 'box-decoration-clone',

	// Shadow utilities - updated scale (official v4 changes)
	'shadow-sm': 'shadow-xs',
	shadow: 'shadow-sm',

	// Drop shadow utilities - updated scale
	'drop-shadow-sm': 'drop-shadow-xs',
	'drop-shadow': 'drop-shadow-sm',

	// Blur utilities - updated scale
	'blur-sm': 'blur-xs',
	blur: 'blur-sm',
	'backdrop-blur-sm': 'backdrop-blur-xs',
	'backdrop-blur': 'backdrop-blur-sm',

	// Border radius utilities - updated scale
	'rounded-sm': 'rounded-xs',
	rounded: 'rounded-sm',

	// Outline utilities - major change in v4
	'outline-none': 'outline-hidden',

	// Ring utilities - width change (3px → 1px default, so ring → ring-3)
	ring: 'ring-3',

	// Custom text size utilities (project-specific, not in official docs)
	'text-10': 'text-xs',
	'text-11': 'text-sm',
	'text-12': 'text-base',
	'text-13': 'text-base',
	'text-14': 'text-lg',
	'text-15': 'text-lg',
	'text-16': 'text-xl',
	'text-17': 'text-xl',
	'text-18': 'text-2xl',
	'text-19': 'text-2xl',
	'text-20': 'text-3xl',
	'text-48': 'text-7xl',

	// Leading utilities (project-specific)
	'leading-1': 'leading-none',
	'leading-normal': 'leading-[1.5]',
	'leading-tight': 'leading-[1.25]',
	'leading-snug': 'leading-[1.375]',
	'leading-relaxed': 'leading-[1.625]',
	'leading-loose': 'leading-[2]',
	'leading-24': 'leading-[2]',

	// Width utilities - semantic naming updates (project-specific)
	'w-md': 'w-xl',
	'max-w-md': 'max-w-xl',
	'w-lg': 'w-2xl',
	'max-w-lg': 'max-w-2xl',
	'w-xl': 'w-3xl',
	'max-w-xl': 'max-w-3xl',
	'w-2xl': 'w-4xl',
	'max-w-2xl': 'max-w-4xl',
	'w-3xl': 'w-5xl',
	'max-w-3xl': 'max-w-5xl',
	'w-4xl': 'w-6xl',
	'max-w-4xl': 'max-w-6xl',
	'w-5xl': 'w-7xl',
	'max-w-5xl': 'max-w-7xl',

	// Font weight utilities (project-specific)
	'font-500': 'font-medium',
	'font-600': 'font-semibold',
	'font-700': 'font-bold',
	'font-800': 'font-extrabold',
	'font-900': 'font-black'
};

/**
 * Checks for patterns that may require manual attention according to v4 migration guide
 */
function checkForManualAttentionNeeded(filePath: string, content: string): void {
	const relativePath = path.relative(directoryPath, filePath);

	// Check for space-between utilities that may have behavior changes
	const spacePattern = /\bspace-[xy]-\d+\b/g;
	const spaceMatches = content.match(spacePattern);

	if (spaceMatches) {
		logger.warning(
			`${relativePath}: Found space-* utilities that may behave differently in v4: ${spaceMatches.join(', ')}`
		);
		logger.info(`Consider migrating to flex/grid with gap utilities for better consistency`);
	}

	// Check for gradient patterns that may need attention
	const gradientPattern = /\bbg-gradient-to-[rltb]\b.*?\b(?:dark:|hover:)from-/g;
	const gradientMatches = content.match(gradientPattern);

	if (gradientMatches) {
		logger.warning(
			`${relativePath}: Found gradient with variants - check if via-none is needed for proper color resets`
		);
	}

	// Check for outline utilities with custom colors that may need transition updates
	const outlineTransitionPattern = /\btransition\b.*?\boutline-\w+/g;
	const outlineTransitionMatches = content.match(outlineTransitionPattern);

	if (outlineTransitionMatches) {
		logger.warning(
			`${relativePath}: Found transition with outline - may need to set outline-color unconditionally to avoid color transitions`
		);
	}

	// Check for hover utilities that may not work on touch devices
	const hoverPattern = /\bhover:\w+/g;
	const hoverMatches = content.match(hoverPattern);

	if (hoverMatches && hoverMatches.length > 3) {
		logger.info(
			`${relativePath}: Consider that hover styles now only apply when primary input supports hover (excludes most touch devices)`
		);
	}
}

/**
 * Opacity pattern interface for type safety
 */
interface OpacityPattern {
	type: string;
	regex: RegExp;
	replacement: string | ((match: string, ...groups: string[]) => string);
}

/**
 * Processes a single file for Tailwind CSS class migrations
 */
function replaceClassesInFile(filePath: string): void {
	// Skip the migration script itself
	if (filePath === __filename) {
		logger.debug('Skipping migration script file');
		return;
	}

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			logger.error(`Error reading file ${filePath}: ${err.message}`);
			return;
		}

		let result = data;

		// Handle opacity patterns first (v3 → v4 opacity syntax)
		const opacityPatterns: OpacityPattern[] = [
			{
				type: 'bg',
				regex: /bg-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d+)?)\s+(?:group-hover:)?bg-opacity-(\d+)|group-hover:bg-opacity-(\d+)/g,
				replacement: (match: string, color: string, opacity1: string, opacity2: string) => {
					if (!color) {
						// Handle standalone group-hover:bg-opacity case
						return `group-hover:bg-black/${opacity2}`;
					}

					const hover = match.includes('group-hover:') ? 'group-hover:' : '';
					return `${hover}bg-${color}/${opacity1}`;
				}
			},
			{
				type: 'text',
				regex: /text-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d+)?)\s+text-opacity-(\d+)/g,
				replacement: 'text-$1/$2'
			},
			{
				type: 'border',
				regex: /border-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d+)?)\s+border-opacity-(\d+)/g,
				replacement: 'border-$1/$2'
			},
			{
				type: 'divide',
				regex: /divide-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d+)?)\s+divide-opacity-(\d+)/g,
				replacement: 'divide-$1/$2'
			},
			{
				type: 'ring',
				regex: /ring-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d+)?)\s+ring-opacity-(\d+)/g,
				replacement: 'ring-$1/$2'
			},
			{
				type: 'placeholder',
				regex: /placeholder-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d+)?)\s+placeholder-opacity-(\d+)/g,
				replacement: 'placeholder-$1/$2'
			}
		];

		// Apply opacity pattern transformations
		opacityPatterns.forEach(({ regex, replacement }) => {
			if (typeof replacement === 'function') {
				result = result.replace(regex, replacement);
			} else {
				result = result.replace(regex, replacement);
			}
		});

		// Handle CSS variables in arbitrary values (v3 → v4 syntax change)
		// v3: bg-[--brand-color] → v4: bg-(--brand-color)
		result = result.replace(/\b(\w+)-\[(--.+?)\]/g, '$1-($2)');

		// Handle variant stacking order changes (right-to-left → left-to-right)
		// This is complex and may need manual review, so we'll log warnings
		const variantStackingPattern =
			/\b(?:first|last|even|odd):\*:(?:first|last|even|odd|pt-\d+|pb-\d+|pl-\d+|pr-\d+)/g;
		const variantMatches = result.match(variantStackingPattern);

		if (variantMatches) {
			logger.warning(
				`File ${path.relative(directoryPath, filePath)}: Found variant stacking that may need manual review: ${variantMatches.join(', ')}`
			);
		}

		// Check for patterns that may need manual attention
		checkForManualAttentionNeeded(filePath, result);

		// Find all className patterns in React/Vue components
		const classPatterns: RegExp[] = [
			/className=["']([^"']+)["']/g,
			/className={["']([^"']+)["']}/g,
			/className={`([^`]+)`}/g,
			/(?:clsx|cn)\\(([\\s\\S]*?)\\)/g,
			/classes=\\{?\\{[^}]*[\\w]+:\\s*["']([^"']+)["'][^}]*\\}?\\}/g
		];

		classPatterns.forEach((pattern) => {
			result = result.replace(pattern, (match, classString) => {
				// Handle clsx/cn function calls specially
				if (match.startsWith('clsx(') || match.startsWith('cn(')) {
					const stringMatches = classString.match(/["']([^"']+)["']/g);

					if (!stringMatches) return match;

					return match.replace(/["']([^"']+)["']/g, (m, classes) => {
						const updatedClasses = transformClasses(classes);
						return m.replace(classes, updatedClasses);
					});
				}

				// Regular className handling
				const updatedClassString = transformClasses(classString);
				return match.replace(classString, updatedClassString);
			});
		});

		// Write the updated file
		fs.writeFile(filePath, result, 'utf8', (err) => {
			if (err) {
				logger.error(`Error writing file ${filePath}: ${err.message}`);
			} else {
				logger.success(`Updated: ${path.relative(directoryPath, filePath)}`);
			}
		});
	});
}

/**
 * Transforms individual classes according to Tailwind v4 rules
 */
function transformClasses(classString: string): string {
	return classString
		.split(/\s+/)
		.map((singleClass) => {
			let replaced = singleClass;
			const colonIndex = singleClass.lastIndexOf(':');

			if (colonIndex !== -1) {
				// Handle variant prefixes (hover:, focus:, etc.)
				const prefix = singleClass.substring(0, colonIndex + 1);
				const baseClass = singleClass.substring(colonIndex + 1);

				// Apply transformations to base class
				replaced = `${prefix}${transformSingleClass(baseClass)}`;
			} else {
				// No variant prefix
				replaced = transformSingleClass(singleClass);
			}

			return replaced;
		})
		.join(' ');
}

/**
 * Transforms a single class (without variant prefixes)
 */
function transformSingleClass(className: string): string {
	// First check tailwindV4Replacements
	if (tailwindV4Replacements[className]) {
		return tailwindV4Replacements[className];
	}

	// Then check spacing patterns (numeric value conversion)
	for (const prop of spacingProperties) {
		// Positive values
		const match = className.match(new RegExp(`^${prop}-(\\d+(?:\\.\\d+)?)$`));

		if (match) {
			const newValue = (parseFloat(match[1]) / 4).toString();
			return `${prop}-${newValue}`;
		}

		// Negative values
		const negMatch = className.match(new RegExp(`^-${prop}-(\\d+(?:\\.\\d+)?)$`));

		if (negMatch) {
			const newValue = (parseFloat(negMatch[1]) / 4).toString();
			return `-${prop}-${newValue}`;
		}
	}

	// Return unchanged if no transformation applies
	return className;
}

/**
 * Recursively traverses directory and processes files
 */
function traverseDirectory(directory: string): void {
	fs.readdir(directory, (err, files) => {
		if (err) {
			logger.error(`Error reading directory ${directory}: ${err.message}`);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(directory, file);

			fs.stat(filePath, (err, stats) => {
				if (err) {
					logger.error(`Error getting stats of file ${filePath}: ${err.message}`);
					return;
				}

				if (stats.isDirectory()) {
					// Skip node_modules and .git directories
					if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
						traverseDirectory(filePath);
					}
				} else if (/\.(js|jsx|ts|tsx|vue|svelte)$/.test(filePath)) {
					replaceClassesInFile(filePath);
				}
			});
		});
	});
}

// Main execution
logger.info('🚀 Starting Tailwind CSS v3 → v4 migration...');
logger.info(`📁 Target directory: ${directoryPath}`);
logger.info('🔍 Processing files...');

traverseDirectory(directoryPath);

logger.info('✨ Migration process initiated! Check the output for results.');

export default { transformClasses, transformSingleClass };
