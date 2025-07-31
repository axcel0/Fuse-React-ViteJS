import { useState, useEffect } from 'react';
import { themeManager, ThemeMode } from '../utils/themeManager';

/**
 * React hook for theme management with Tailwind CSS v4
 * Provides theme state and controls with automatic updates
 */
export function useTheme() {
	const [theme, setTheme] = useState<ThemeMode>(themeManager.getTheme());
	const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(themeManager.getEffectiveTheme());

	useEffect(() => {
		const handleThemeChange = (newTheme: ThemeMode) => {
			setTheme(newTheme);
			setEffectiveTheme(themeManager.getEffectiveTheme());
		};

		themeManager.addListener(handleThemeChange);

		// Initial sync
		setTheme(themeManager.getTheme());
		setEffectiveTheme(themeManager.getEffectiveTheme());

		return () => {
			themeManager.removeListener(handleThemeChange);
		};
	}, []);

	const setThemeMode = (mode: ThemeMode) => {
		themeManager.setTheme(mode);
	};

	const toggleTheme = () => {
		themeManager.toggleTheme();
	};

	return {
		theme,
		effectiveTheme,
		setTheme: setThemeMode,
		toggleTheme,
		isSystemDarkMode: themeManager.isSystemDarkMode(),
		isDark: effectiveTheme === 'dark',
		isLight: effectiveTheme === 'light',
		isSystem: theme === 'system',
	};
}

/**
 * Hook to sync Material-UI theme with Tailwind CSS theme
 */
export function useMuiThemeSync() {
	const { effectiveTheme } = useTheme();

	useEffect(() => {
		// This can be used to trigger Material-UI theme updates
		// when Tailwind theme changes
		const event = new CustomEvent('tailwind-theme-change', {
			detail: { theme: effectiveTheme },
		});
		window.dispatchEvent(event);
	}, [effectiveTheme]);

	return effectiveTheme;
}
