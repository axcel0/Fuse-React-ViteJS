import { useState, useEffect, useCallback } from 'react';
import { themeManager, type ThemeMode } from './theme-system';

export interface UseThemeReturn {
	mode: ThemeMode;
	resolvedTheme: 'light' | 'dark';
	setMode: (mode: ThemeMode) => void;
	toggleMode: () => void;
	isSystemMode: boolean;
}

/**
 * Hook for managing theme state and switching
 */
export function useTheme(): UseThemeReturn {
	const [mode, setModeState] = useState<ThemeMode>('system');
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		// Initialize with current theme manager state
		setModeState(themeManager.getMode());
		setResolvedTheme(themeManager.getResolvedTheme());

		// Force refresh to ensure correct initial theme
		themeManager.forceRefresh();

		const handleThemeChange = (newMode: ThemeMode, newResolvedTheme: 'light' | 'dark') => {
			setModeState(newMode);
			setResolvedTheme(newResolvedTheme);
		};

		themeManager.addListener(handleThemeChange);

		return () => {
			themeManager.removeListener(handleThemeChange);
		};
	}, []);

	const setMode = useCallback((newMode: ThemeMode) => {
		themeManager.setMode(newMode);
	}, []);

	const toggleMode = useCallback(() => {
		// Cycle through: light -> dark -> system -> light
		switch (mode) {
			case 'light':
				setMode('dark');
				break;
			case 'dark':
				setMode('system');
				break;
			case 'system':
				setMode('light');
				break;
		}
	}, [mode, setMode]);

	return {
		mode,
		resolvedTheme,
		setMode,
		toggleMode,
		isSystemMode: mode === 'system',
	};
}
