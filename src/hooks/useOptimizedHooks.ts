import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';

// Custom hook untuk debouncing yang lebih optimized
export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

// Hook untuk memoized callbacks yang stabil
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
	const ref = useRef<T>(callback);
	
	// Update ref to latest callback
	ref.current = callback;
	
	// Return memoized callback that calls the latest version
	return useCallback((...args: any[]) => ref.current(...args), []) as T;
}

// Hook untuk memoized values yang mahal untuk dihitung
export function useMemoizedValue<T>(factory: () => T, deps: React.DependencyList): T {
	return useMemo(factory, deps);
}

// Hook untuk tracking perubahan value sebelumnya
export function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T | undefined>(undefined);
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

// Hook untuk interval yang bersih
export function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef(callback);

	// Remember the latest callback
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval
	useEffect(() => {
		if (delay !== null) {
			const id = setInterval(() => savedCallback.current(), delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

// Hook untuk mounting state tracking
export function useMountedState(): () => boolean {
	const mountedRef = useRef(false);
	const get = useCallback(() => mountedRef.current, []);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	return get;
}

// Hook untuk async operations yang aman
export function useSafeAsyncOperation() {
	const isMounted = useMountedState();

	return useCallback(
		<T>(operation: () => Promise<T>): Promise<T | null> => {
			return operation().then(
				(result) => (isMounted() ? result : null),
				(error) => {
					if (isMounted()) {
						throw error;
					}
					return null;
				}
			);
		},
		[isMounted]
	);
}

// Hook untuk localStorage yang reactive
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T) => {
			try {
				setStoredValue(value);
				window.localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.warn(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key]
	);

	return [storedValue, setValue];
}

// Hook untuk window size tracking
export function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}

// Hook untuk throttling
export function useThrottle<T>(value: T, delay: number): T {
	const [throttledValue, setThrottledValue] = useState<T>(value);
	const lastRan = useRef(Date.now());

	useEffect(() => {
		const handler = setTimeout(() => {
			if (Date.now() - lastRan.current >= delay) {
				setThrottledValue(value);
				lastRan.current = Date.now();
			}
		}, delay - (Date.now() - lastRan.current));

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return throttledValue;
}

export default {
	useDebounce,
	useStableCallback,
	useMemoizedValue,
	usePrevious,
	useInterval,
	useMountedState,
	useSafeAsyncOperation,
	useLocalStorage,
	useWindowSize,
	useThrottle
};
