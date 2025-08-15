import { useState, useEffect, useCallback } from 'react';
import httpClient from '@/lib/http-client';

/**
 * Simple User Hooks - No React Query dependency
 */

// Types
export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: string[];
	settings?: Record<string, unknown>;
}

export interface UserUpdateData {
	name?: string;
	avatar?: string;
	settings?: Record<string, unknown>;
}

// Get current user (replaces user reducer state)
export function useUser() {
	const [data, setData] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchUser = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			
			const response = await httpClient.get('auth/me');
			const userData = await response.json() as User;
			setData(userData);
			
		} catch (error) {
			console.error('Failed to fetch user:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			setData(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return {
		data,
		loading,
		error,
		refetch: fetchUser
	};
}

// Update user profile
export function useUpdateUser() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateUser = useCallback(async (userData: UserUpdateData): Promise<User | null> => {
		try {
			setLoading(true);
			setError(null);
			
			const response = await httpClient.put('auth/me', { json: userData });
			const updatedUser = await response.json() as User;
			
			// Trigger custom event to refresh user data
			window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
			
			return updatedUser;
			
		} catch (error) {
			console.error('Failed to update user:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		updateUser,
		loading,
		error
	};
}

// Update user settings
export function useUpdateUserSettings() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateSettings = useCallback(async (settings: Record<string, unknown>): Promise<User | null> => {
		try {
			setLoading(true);
			setError(null);
			
			const response = await httpClient.put('auth/me/settings', {
				json: { settings }
			});
			const updatedUser = await response.json() as User;
			
			// Trigger custom event to refresh user data
			window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
			
			return updatedUser;
			
		} catch (error) {
			console.error('Failed to update user settings:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		updateSettings,
		loading,
		error
	};
}

// Example: Get users list (for admin functionality)
export function useUsers(filters: Record<string, string> = {}) {
	const [data, setData] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = useCallback(async () => {
		if (Object.keys(filters).length === 0) {
			return; // Only run if filters are provided
		}

		try {
			setLoading(true);
			setError(null);
			
			const searchParams = new URLSearchParams(filters);
			const response = await httpClient.get(`users?${searchParams.toString()}`);
			const users = await response.json() as User[];
			setData(users);
			
		} catch (error) {
			console.error('Failed to fetch users:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			setData([]);
		} finally {
			setLoading(false);
		}
	}, [filters]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return {
		data,
		loading,
		error,
		refetch: fetchUsers
	};
}

// Get specific user by ID
export function useUserById(userId: string) {
	const [data, setData] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUserById = useCallback(async () => {
		if (!userId) return;

		try {
			setLoading(true);
			setError(null);
			
			const response = await httpClient.get(`users/${userId}`);
			const user = await response.json() as User;
			setData(user);
			
		} catch (error) {
			console.error('Failed to fetch user by ID:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [userId]);

	useEffect(() => {
		fetchUserById();
	}, [fetchUserById]);

	return {
		data,
		loading,
		error,
		refetch: fetchUserById
	};
}
