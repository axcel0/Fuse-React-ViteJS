import { useState, useEffect, useCallback } from 'react';

// Performance monitoring utilities
interface PerformanceMetrics {
	pageLoadTime: number;
	renderTime: number;
	apiCallsCount: number;
	memoryUsage: number;
	domNodes: number;
	bundleSize: number;
}

interface ApiMetrics {
	totalCalls: number;
	averageResponseTime: number;
	successRate: number;
	timeoutRate: number;
	errorRate: number;
}

// Global performance state
let performanceData: PerformanceMetrics = {
	pageLoadTime: 0,
	renderTime: 0,
	apiCallsCount: 0,
	memoryUsage: 0,
	domNodes: 0,
	bundleSize: 0
};

let apiMetrics: ApiMetrics = {
	totalCalls: 0,
	averageResponseTime: 0,
	successRate: 0,
	timeoutRate: 0,
	errorRate: 0
};

// Hook untuk monitoring performa aplikasi secara real-time
export function usePerformanceMonitor() {
	const [metrics, setMetrics] = useState<PerformanceMetrics>(performanceData);
	const [isMonitoring, setIsMonitoring] = useState(false);

	const startMonitoring = useCallback(() => {
		setIsMonitoring(true);
		
		// Monitor initial page load
		if (performance.navigation) {
			performanceData.pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
		}

		// Monitor memory usage (if available)
		if ('memory' in performance) {
			const memInfo = (performance as any).memory;
			performanceData.memoryUsage = Math.round(memInfo.usedJSHeapSize / 1024 / 1024); // MB
		}

		// Monitor DOM nodes
		performanceData.domNodes = document.querySelectorAll('*').length;

		// Update state
		setMetrics({ ...performanceData });

		// Set up interval for continuous monitoring
		const interval = setInterval(() => {
			// Update DOM nodes count
			performanceData.domNodes = document.querySelectorAll('*').length;
			
			// Update memory if available
			if ('memory' in performance) {
				const memInfo = (performance as any).memory;
				performanceData.memoryUsage = Math.round(memInfo.usedJSHeapSize / 1024 / 1024);
			}

			setMetrics({ ...performanceData });
		}, 2000); // Update every 2 seconds

		return () => clearInterval(interval);
	}, []);

	const stopMonitoring = useCallback(() => {
		setIsMonitoring(false);
	}, []);

	const getPerformanceReport = useCallback(() => {
		const report = {
			...metrics,
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			url: window.location.href,
			recommendations: generateRecommendations(metrics)
		};
		
		console.log('🔍 Performance Report:', report);
		return report;
	}, [metrics]);

	useEffect(() => {
		// Auto-start monitoring when component mounts
		const cleanup = startMonitoring();
		return cleanup;
	}, [startMonitoring]);

	return {
		metrics,
		isMonitoring,
		startMonitoring,
		stopMonitoring,
		getPerformanceReport
	};
}

// Hook for network performance specifically
export function useNetworkPerformance() {
	const [networkMetrics, setNetworkMetrics] = useState<ApiMetrics>(apiMetrics);

	const updateNetworkMetrics = useCallback((duration: number, success: boolean, timeout: boolean = false) => {
		apiMetrics.totalCalls++;
		
		// Update success/error/timeout rates
		if (timeout) {
			// Timeout case
		} else if (success) {
			// Success case
		} else {
			// Error case
		}

		// Calculate rates
		const totalCalls = apiMetrics.totalCalls;
		apiMetrics.successRate = Math.round(((totalCalls - (apiMetrics.totalCalls - totalCalls)) / totalCalls) * 100);
		
		setNetworkMetrics({ ...apiMetrics });
	}, []);

	const getNetworkReport = useCallback(() => {
		console.log('📡 Network Performance Report:', networkMetrics);
		return networkMetrics;
	}, [networkMetrics]);

	return {
		networkMetrics,
		updateNetworkMetrics,
		getNetworkReport
	};
}

// Generate performance recommendations
function generateRecommendations(metrics: PerformanceMetrics): string[] {
	const recommendations: string[] = [];

	if (metrics.pageLoadTime > 3000) {
		recommendations.push('Page load time is slow (>3s). Consider code splitting and lazy loading.');
	}

	if (metrics.memoryUsage > 100) {
		recommendations.push('High memory usage detected (>100MB). Check for memory leaks.');
	}

	if (metrics.domNodes > 5000) {
		recommendations.push('Large DOM size detected (>5000 nodes). Consider virtualization for large lists.');
	}

	if (metrics.apiCallsCount > 20) {
		recommendations.push('High number of API calls. Consider data caching and request batching.');
	}

	if (recommendations.length === 0) {
		recommendations.push('Performance looks good! 🚀');
	}

	return recommendations;
}

// Performance optimization utilities
export const PerformanceUtils = {
	// Debounce utility for search inputs
	debounce: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
		let timeoutId: NodeJS.Timeout;
		return ((...args: any[]) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		}) as T;
	},

	// Throttle utility for scroll events
	throttle: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
		let lastCall = 0;
		return ((...args: any[]) => {
			const now = Date.now();
			if (now - lastCall >= delay) {
				lastCall = now;
				func(...args);
			}
		}) as T;
	},

	// Memory cleanup utility
	cleanupMemory: () => {
		// Force garbage collection if available
		if (window.gc) {
			window.gc();
		}
		
		// Clear any cached data that's not needed
		if (window.caches) {
			window.caches.keys().then(names => {
				names.forEach(name => {
					if (name.includes('old-') || name.includes('temp-')) {
						window.caches.delete(name);
					}
				});
			});
		}
	},

	// Check if running in dev tunnel
	isDevTunnel: () => {
		return window.location.hostname.includes('devtunnels.ms') || 
			   window.location.hostname.includes('tunnel') ||
			   window.location.hostname.includes('ngrok');
	},

	// Get connection quality
	getConnectionType: () => {
		if ('connection' in navigator) {
			const conn = (navigator as any).connection;
			return {
				effectiveType: conn.effectiveType || 'unknown',
				downlink: conn.downlink || 0,
				rtt: conn.rtt || 0
			};
		}
		return { effectiveType: 'unknown', downlink: 0, rtt: 0 };
	}
};

export default usePerformanceMonitor;
