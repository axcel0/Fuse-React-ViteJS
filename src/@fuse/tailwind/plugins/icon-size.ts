/* eslint-disable */
// eslint-disable-next-line import/no-extraneous-dependencies
import plugin from 'tailwindcss/plugin';

/**
 * The iconSize function is a Tailwind CSS plugin that generates utility classes for setting the size of icons.
 */
const iconSize = plugin(({ addUtilities, theme, matchUtilities }) => {
	const spacingScale = theme('spacing');

	// Using addUtilities to dynamically add icon-size utilities
	addUtilities({
		'.icon-size-0': {
			'& svg': {
				width: '0',
				height: '0',
			},
		},
	});

	// Using matchUtilities for dynamic values
	matchUtilities(
		{
			'icon-size': (value: string) => ({
				'& svg': {
					width: value,
					height: value,
				},
			}),
		},
		{
			values: spacingScale,
		},
	);

	matchUtilities(
		{
			'icon-size': (value: string) => ({
				'& svg': {
					width: value,
					height: value,
				},
			}),
		},
		{
			type: ['length', 'number'],
		},
	);
});

export default iconSize;
