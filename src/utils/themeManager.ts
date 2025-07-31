/**
 * Enhanced Theme Management Utility for Tailwind CSS v4
 * Supports light mode, dark mode, and system preference with localStorage persistence
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export class ThemeManager {
	private static instance: ThemeManager;
	private currentMode: ThemeMode = 'system';
	private listeners = new Set<(mode: ThemeMode) => void>();

	private constructor() {
		this.initializeTheme();
		this.setupSystemThemeListener();
	}

	public static getInstance(): ThemeManager {
		if (!ThemeManager.instance) {
			ThemeManager.instance = new ThemeManager();
		}

		return ThemeManager.instance;
	}

	/**
	 * Initialize theme from localStorage or system preference
	 */
	private initializeTheme(): void {
		if (typeof window === 'undefined') return;

		const savedTheme = localStorage.getItem('theme') as ThemeMode;

		if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
			this.currentMode = savedTheme;
		} else {
			this.currentMode = 'system';
		}

		this.applyTheme();
	}

	/**
	 * Set up listener for system theme changes
	 */
	private setupSystemThemeListener(): void {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			if (this.currentMode === 'system') {
				this.applyTheme();
			}
		});
	}

	/**
	 * Apply the current theme to the document
	 */
	private applyTheme(): void {
		if (typeof window === 'undefined') return;

		const documentElement = document.documentElement;
		const body = document.body;

		// Remove existing theme classes
		documentElement.classList.remove('light', 'dark');
		body.classList.remove('light', 'dark');

		// Determine effective theme
		const effectiveTheme = this.resolveEffectiveTheme();

		// Apply theme classes
		documentElement.classList.add(effectiveTheme);
		body.classList.add(effectiveTheme);

		// Set color-scheme for browser integration
		documentElement.style.colorScheme = effectiveTheme;

		// Notify listeners
		this.notifyListeners();
	}

	/**
	 * Get the effective theme (resolves 'system' to 'light' or 'dark')
	 */
	private resolveEffectiveTheme(): 'light' | 'dark' {
		if (this.currentMode === 'system') {
			if (typeof window !== 'undefined') {
				return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			}

			return 'light'; // fallback
		}

		return this.currentMode;
	}

	/**
	 * Set theme mode
	 */
	public setTheme(mode: ThemeMode): void {
		this.currentMode = mode;

		// Persist to localStorage
		if (typeof window !== 'undefined') {
			if (mode === 'system') {
				localStorage.removeItem('theme');
			} else {
				localStorage.setItem('theme', mode);
			}
		}

		this.applyTheme();
	}

	/**
	 * Get current theme mode
	 */
	public getTheme(): ThemeMode {
		return this.currentMode;
	}

	/**
	 * Get effective theme (what's actually applied)
	 */
	public getEffectiveTheme(): 'light' | 'dark' {
		return this.resolveEffectiveTheme();
	}

	/**
	 * Toggle between light and dark mode
	 */
	public toggleTheme(): void {
		const effectiveTheme = this.resolveEffectiveTheme();
		this.setTheme(effectiveTheme === 'light' ? 'dark' : 'light');
	}

	/**
	 * Add listener for theme changes
	 */
	public addListener(listener: (mode: ThemeMode) => void): void {
		this.listeners.add(listener);
	}

	/**
	 * Remove listener for theme changes
	 */
	public removeListener(listener: (mode: ThemeMode) => void): void {
		this.listeners.delete(listener);
	}

	/**
	 * Notify all listeners of theme change
	 */
	private notifyListeners(): void {
		this.listeners.forEach((listener) => listener(this.currentMode));
	}

	/**
	 * Check if system prefers dark mode
	 */
	public isSystemDarkMode(): boolean {
		if (typeof window === 'undefined') return false;

		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
}

// Export default instance
export const themeManager = ThemeManager.getInstance();

// Utility functions for easier use
export const setTheme = (mode: ThemeMode) => themeManager.setTheme(mode);
export const getTheme = () => themeManager.getTheme();
export const getEffectiveTheme = () => themeManager.getEffectiveTheme();
export const toggleTheme = () => themeManager.toggleTheme();
export const addThemeListener = (listener: (mode: ThemeMode) => void) => themeManager.addListener(listener);
export const removeThemeListener = (listener: (mode: ThemeMode) => void) => themeManager.removeListener(listener);

// FOUC Prevention Script (to be added to index.html head)
export const foucPreventionScript = `
(function() {
  const theme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (!theme && systemDark);
  
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('light', !isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
})();
`;
