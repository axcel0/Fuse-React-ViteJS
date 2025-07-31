/* eslint-disable */
// eslint-disable-next-line import/no-extraneous-dependencies
import plugin from 'tailwindcss/plugin';

/**
 * The iconSize function is a Tailwind CSS plugin that generates utility classes for setting the size of icons.
 * This plugin creates comprehensive icon sizing utilities with support for:
 * - Standard spacing scale (icon-size-1, icon-size-2, etc.)
 * - Arbitrary values (icon-size-[24px], icon-size-[2rem], etc.)
 * - Multiple sizing properties for consistent icon display
 */
const iconSize = plugin(({ addUtilities, theme, matchUtilities }) => {
	const spacingScale = theme('spacing');

	/**
	 * Creates comprehensive icon styles for consistent sizing
	 */
	const createIconStyles = (value: string) => ({
		width: value,
		height: value,
		minWidth: value,
		minHeight: value,
		fontSize: value,
		lineHeight: value,
		'& svg': {
			width: value,
			height: value
		}
	});

	// Generate standard spacing scale utilities (icon-size-0, icon-size-1, etc.)
	addUtilities(
		Object.entries(spacingScale).reduce((acc, [key, value]) => {
			acc[`.icon-size-${key}`] = createIconStyles(value as string);
			return acc;
		}, {} as Record<string, any>)
	);

	// Support for arbitrary values (icon-size-[24px], icon-size-[2rem], etc.)
	matchUtilities(
		{
			'icon-size': (value: string) => createIconStyles(value)
		},
		{ 
			values: spacingScale,
			type: ['length', 'number']
		}
	);
});

export default iconSize;
