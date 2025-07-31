// ===== DESIGN SYSTEM EXPORTS =====

// Tokens
export * from './tokens';

// Utils
export * from './utils';
export * from './lib/utils';

// Components
export { default as Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { default as Card } from './components/Card';
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card';
export type { CardProps } from './components/Card';

export { default as Input, Textarea, Select } from './components/Input';
export type { InputProps, TextareaProps, SelectProps } from './components/Input';

// ===== COMPONENT COLLECTIONS =====
export const DesignSystem = {
	Button: () => import('./components/Button'),
	Card: () => import('./components/Card'),
	Input: () => import('./components/Input')
};

export const Components = {
	Button: () => import('./components/Button'),
	Card: () => import('./components/Card'),
	Input: () => import('./components/Input'),
	Textarea: () => import('./components/Input').then((m) => ({ default: m.Textarea })),
	Select: () => import('./components/Input').then((m) => ({ default: m.Select }))
};

// ===== THEME INTEGRATION =====
export { createMuiTokens } from './utils';
export { designTokens } from './tokens';
