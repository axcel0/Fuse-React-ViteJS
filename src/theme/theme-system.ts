/**
 * Dynamic Theme System for Tailwind CSS v4
 * Supports light/dark mode with system preference detection
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    'text-secondary': string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface Theme {
  name: string;
  tokens: ThemeTokens;
}

// Light theme tokens
export const lightTheme: Theme = {
  name: 'light',
  tokens: {
    colors: {
      primary: 'oklch(0.56 0.20 240)',      // Blue 500
      secondary: 'oklch(0.48 0.18 300)',    // Purple 600
      accent: 'oklch(0.705 0.213 47.604)',  // Orange 500
      background: 'oklch(1 0 0)',           // White
      surface: 'oklch(0.985 0.002 247.839)', // Gray 50
      text: 'oklch(0.21 0.034 264.665)',    // Gray 900
      'text-secondary': 'oklch(0.446 0.03 256.802)', // Gray 600
      border: 'oklch(0.872 0.01 258.338)',  // Gray 300
      error: 'oklch(0.637 0.237 25.331)',   // Red 500
      warning: 'oklch(0.795 0.184 86.047)', // Yellow 500
      success: 'oklch(0.723 0.219 149.579)', // Green 500
      info: 'oklch(0.685 0.169 237.323)',   // Sky 500
    },
    spacing: {
      xs: '0.5rem',   // 8px
      sm: '0.75rem',  // 12px
      md: '1rem',     // 16px
      lg: '1.5rem',   // 24px
      xl: '2rem',     // 32px
      '2xl': '3rem',  // 48px
      '3xl': '4rem',  // 64px
    },
    radius: {
      sm: '0.25rem',  // 4px
      md: '0.375rem', // 6px
      lg: '0.5rem',   // 8px
      xl: '0.75rem',  // 12px
      '2xl': '1rem',  // 16px
    },
    shadows: {
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
};

// Dark theme tokens
export const darkTheme: Theme = {
  name: 'dark',
  tokens: {
    colors: {
      primary: 'oklch(0.707 0.165 254.624)',    // Blue 400
      secondary: 'oklch(0.673 0.182 276.935)',  // Indigo 400
      accent: 'oklch(0.75 0.183 55.934)',       // Orange 400
      background: 'oklch(0.129 0.042 264.695)', // Slate 950
      surface: 'oklch(0.208 0.042 265.755)',    // Slate 900
      text: 'oklch(0.984 0.003 247.858)',       // Slate 50
      'text-secondary': 'oklch(0.704 0.04 256.788)', // Slate 400
      border: 'oklch(0.372 0.044 257.287)',     // Slate 700
      error: 'oklch(0.704 0.191 22.216)',       // Red 400
      warning: 'oklch(0.852 0.199 91.936)',     // Yellow 400
      success: 'oklch(0.792 0.209 151.711)',    // Green 400
      info: 'oklch(0.746 0.16 232.661)',        // Sky 400
    },
    spacing: {
      xs: '0.5rem',   // 8px
      sm: '0.75rem',  // 12px
      md: '1rem',     // 16px
      lg: '1.5rem',   // 24px
      xl: '2rem',     // 32px
      '2xl': '3rem',  // 48px
      '3xl': '4rem',  // 64px
    },
    radius: {
      sm: '0.25rem',  // 4px
      md: '0.375rem', // 6px
      lg: '0.5rem',   // 8px
      xl: '0.75rem',  // 12px
      '2xl': '1rem',  // 16px
    },
    shadows: {
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
    },
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

/**
 * Apply theme tokens to CSS variables
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  
  // Apply color tokens
  Object.entries(theme.tokens.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Apply spacing tokens
  Object.entries(theme.tokens.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
  
  // Apply radius tokens
  Object.entries(theme.tokens.radius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
  
  // Apply shadow tokens
  Object.entries(theme.tokens.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
}

/**
 * Get system color scheme preference
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * Resolve the actual theme based on mode
 */
export function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return getSystemTheme();
  }
  return mode;
}

/**
 * Theme manager class for handling theme switching
 */
export class ThemeManager {
  private currentMode: ThemeMode = 'system';
  private mediaQuery: MediaQueryList | null = null;
  private listeners: Array<(mode: ThemeMode, resolvedTheme: 'light' | 'dark') => void> = [];
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
      
      // Load saved theme or default to system
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
      this.currentMode = savedMode || 'system';
      
      // Apply initial theme immediately
      this.applyCurrentTheme();
    }
  }
  
  private handleSystemThemeChange = (): void => {
    if (this.currentMode === 'system') {
      this.applyCurrentTheme();
      this.notifyListeners();
    }
  };
  
  private applyCurrentTheme(): void {
    const resolvedTheme = resolveTheme(this.currentMode);
    const theme = themes[resolvedTheme];
    
    // Update HTML class for Tailwind's dark mode
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    
    // Apply custom theme tokens
    applyTheme(theme);
  }
  
  private notifyListeners(): void {
    const resolvedTheme = resolveTheme(this.currentMode);
    this.listeners.forEach(listener => listener(this.currentMode, resolvedTheme));
  }
  
  public setMode(mode: ThemeMode, save: boolean = true): void {
    this.currentMode = mode;
    
    if (save && typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode);
    }
    
    this.applyCurrentTheme();
    this.notifyListeners();
  }
  
  public getMode(): ThemeMode {
    return this.currentMode;
  }
  
  public getResolvedTheme(): 'light' | 'dark' {
    return resolveTheme(this.currentMode);
  }
  
  public forceRefresh(): void {
    this.applyCurrentTheme();
    this.notifyListeners();
  }
  
  public addListener(listener: (mode: ThemeMode, resolvedTheme: 'light' | 'dark') => void): void {
    this.listeners.push(listener);
  }
  
  public removeListener(listener: (mode: ThemeMode, resolvedTheme: 'light' | 'dark') => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
  
  public destroy(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
    }
    this.listeners = [];
  }
}

// Global theme manager instance
export const themeManager = new ThemeManager();
