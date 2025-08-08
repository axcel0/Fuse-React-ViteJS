import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAutoRefreshProps {
	onRefresh: () => void | Promise<void>;
	defaultInterval?: number;
	defaultEnabled?: boolean;
}

interface UseAutoRefreshReturn {
	isAutoRefreshEnabled: boolean;
	setIsAutoRefreshEnabled: (enabled: boolean) => void;
	refreshInterval: number;
	setRefreshInterval: (interval: number) => void;
	isRefreshing: boolean;
	lastRefreshTime: Date | undefined;
	triggerManualRefresh: () => void;
	nextRefreshIn: number;
}

export const useAutoRefresh = ({
	onRefresh,
	defaultInterval = 10,
	defaultEnabled = false
}: UseAutoRefreshProps): UseAutoRefreshReturn => {
	const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(defaultEnabled);
	const [refreshInterval, setRefreshInterval] = useState(defaultInterval);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [lastRefreshTime, setLastRefreshTime] = useState<Date>();
	const [nextRefreshIn, setNextRefreshIn] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const countdownRef = useRef<NodeJS.Timeout | null>(null);

	// Manual refresh function
	const triggerManualRefresh = useCallback(async () => {
		if (isRefreshing) return;
		
		setIsRefreshing(true);
		try {
			await onRefresh();
			setLastRefreshTime(new Date());
		} catch (error) {
			console.error('Manual refresh failed:', error);
		} finally {
			setIsRefreshing(false);
		}
	}, [onRefresh, isRefreshing]);

	// Auto refresh function
	const triggerAutoRefresh = useCallback(async () => {
		if (isRefreshing) return;
		
		setIsRefreshing(true);
		try {
			await onRefresh();
			setLastRefreshTime(new Date());
		} catch (error) {
			console.error('Auto refresh failed:', error);
		} finally {
			setIsRefreshing(false);
		}
	}, [onRefresh, isRefreshing]);

	// Update countdown timer
	const updateCountdown = useCallback(() => {
		if (!isAutoRefreshEnabled || !lastRefreshTime) {
			setNextRefreshIn(0);
			return;
		}

		const now = new Date();
		const timeSinceLastRefresh = Math.floor((now.getTime() - lastRefreshTime.getTime()) / 1000);
		const timeUntilNext = Math.max(0, refreshInterval - timeSinceLastRefresh);
		setNextRefreshIn(timeUntilNext);
	}, [isAutoRefreshEnabled, lastRefreshTime, refreshInterval]);

	// Setup auto refresh interval
	useEffect(() => {
		// Clear existing intervals
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		if (countdownRef.current) {
			clearInterval(countdownRef.current);
		}

		if (isAutoRefreshEnabled) {
			// Set up auto refresh interval
			intervalRef.current = setInterval(triggerAutoRefresh, refreshInterval * 1000);
			
			// Set up countdown update interval (every second)
			countdownRef.current = setInterval(updateCountdown, 1000);
			
			// Initial countdown update
			updateCountdown();
		} else {
			setNextRefreshIn(0);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			if (countdownRef.current) {
				clearInterval(countdownRef.current);
			}
		};
	}, [isAutoRefreshEnabled, refreshInterval, triggerAutoRefresh, updateCountdown]);

	// Update countdown when dependencies change
	useEffect(() => {
		updateCountdown();
	}, [updateCountdown]);

	return {
		isAutoRefreshEnabled,
		setIsAutoRefreshEnabled,
		refreshInterval,
		setRefreshInterval,
		isRefreshing,
		lastRefreshTime,
		triggerManualRefresh,
		nextRefreshIn
	};
};
