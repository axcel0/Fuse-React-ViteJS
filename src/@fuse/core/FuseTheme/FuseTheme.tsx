import { alpha, ThemeProvider } from '@mui/material/styles';
import { memo, ReactNode, useEffect, useLayoutEffect } from 'react';
import type { Theme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * The useEnhancedEffect function is used to conditionally use the useLayoutEffect hook if the window object is defined.
 * Otherwise, it uses the useEffect hook.
 */
const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type FuseThemeProps = {
	children: ReactNode;
	theme: Theme;
	root?: boolean;
};

const inputGlobalStyles = (
	<GlobalStyles
		styles={(theme) => ({
			html: {
				backgroundColor: `${theme.palette.background.default}!important`,
				color: `${theme.palette.text.primary}!important`
			},
			body: {
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary
			},
			/*  'code:not([class*="language-"])': {
        color: theme.palette.secondary.dark,
        backgroundColor:
          theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)',
        padding: '2px 3px',
        borderRadius: 2,
        lineHeight: 1.7,
      }, */
			'& .MuiOutlinedInput-root': {
				backgroundColor: theme.palette.background.paper
			},
			'& .border-divider ': {
				borderColor: `${theme.palette.divider}!important`
			},
			'table.simple tbody tr th': {
				borderColor: theme.palette.divider
			},
			'table.simple thead tr th': {
				borderColor: theme.palette.divider
			},
			'a:not([role=button]):not(.MuiButtonBase-root)': {
				color: theme.palette.secondary.main,
				textDecoration: 'underline',
				'&:hover': {}
			},
			'a.link, a:not([role=button])[target=_blank]': {
				background: alpha(theme.palette.secondary.main, 0.2),
				color: 'inherit',
				borderBottom: `1px solid ${theme.palette.divider}`,
				textDecoration: 'none',
				'&:hover': {
					background: alpha(theme.palette.secondary.main, 0.3),
					textDecoration: 'none'
				}
			},
			'[class^="border"]': {
				borderColor: theme.palette.divider
			},
			'[class*="border"]': {
				borderColor: theme.palette.divider
			},
			'[class*="divide-"] > :not([hidden])': {
				borderColor: theme.palette.divider
			},
			hr: {
				borderColor: theme.palette.divider
			},
			'::-webkit-scrollbar-thumb': {
				boxShadow: `inset 0 0 0 20px ${
					theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
				}`
			},
			'::-webkit-scrollbar-thumb:active': {
				boxShadow: `inset 0 0 0 20px ${
					theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
				}`
			}
		})}
	/>
);

/**
 * The FuseTheme component is responsible for rendering the MUI ThemeProvider component with the specified theme and direction.
 * It also sets the direction of the document body and adds a class to the documentElement based on the current theme mode.
 * Enhanced with Tailwind CSS v4 dark mode support and system theme detection.
 * The component is memoized to prevent unnecessary re-renders.
 */
function FuseTheme(props: FuseThemeProps) {
	const { theme, children, root = false } = props;
	const { mode } = theme.palette;
	const langDirection = theme.direction;

	useEnhancedEffect(() => {
		if (root) {
			document.documentElement.dir = langDirection;
		}
	}, [langDirection]);

	useEffect(() => {
		if (root) {
			// Apply theme mode to documentElement for better Tailwind CSS v4 integration
			document.documentElement.classList.add(mode === 'light' ? 'light' : 'dark');
			document.documentElement.classList.remove(mode === 'light' ? 'dark' : 'light');
			
			// Maintain backward compatibility with body classes
			document.body.classList.add(mode === 'light' ? 'light' : 'dark');
			document.body.classList.remove(mode === 'light' ? 'dark' : 'light');
			
			// Set color-scheme for better browser integration
			document.documentElement.style.colorScheme = mode;
		}
	}, [mode, root]);

	// console.warn('FuseTheme:: rendered',mainTheme);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
			{root && inputGlobalStyles}
		</ThemeProvider>
	);
}

export default memo(FuseTheme);
