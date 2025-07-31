import clsx from 'clsx';
import { ClassValue } from 'clsx';

/**
 * Combines class names with clsx and applies Tailwind merge
 * @param inputs - Class values to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]): string {
	return clsx(inputs);
}

/**
 * Focuses an element and scrolls it into view
 * @param element - The element to focus
 */
export function focusElement(element: HTMLElement): void {
	element.focus();
	element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Creates a focus trap for modal dialogs
 * @param container - The container element
 */
export function createFocusTrap(container: HTMLElement): () => void {
	const focusableElements = container.querySelectorAll(
		'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
	);

	const firstElement = focusableElements[0] as HTMLElement;
	const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Tab') {
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement.focus();
					e.preventDefault();
				}
			}
		}
	}

	container.addEventListener('keydown', handleKeyDown);
	firstElement?.focus();

	return () => {
		container.removeEventListener('keydown', handleKeyDown);
	};
}

/**
 * Formats a value as currency
 * @param value - The numeric value
 * @param currency - The currency code (default: USD)
 * @param locale - The locale (default: en-US)
 */
export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	}).format(value);
}

/**
 * Formats a date string
 * @param date - The date to format
 * @param locale - The locale (default: en-US)
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDate(
	date: Date | string,
	locale = 'en-US',
	options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}
): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Debounces a function
 * @param func - The function to debounce
 * @param wait - The delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;

	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Throttles a function
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
	let inThrottle: boolean;

	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}
