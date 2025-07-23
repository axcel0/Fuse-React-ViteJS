import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';

/**
 * Example User Query Hooks - Replace Redux user state management
 */

// Types
export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: string[];
	settings?: Record<string, any>;
}

export interface UserUpdateData {
	name?: string;
	avatar?: string;
	settings?: Record<string, any>;
}

// Query Keys
export const userKeys = {
	all: ['users'] as const,
	lists: () => [...userKeys.all, 'list'] as const,
	list: (filters: Record<string, any>) => [...userKeys.lists(), { filters }] as const,
	details: () => [...userKeys.all, 'detail'] as const,
	detail: (id: string) => [...userKeys.details(), id] as const,
	me: () => [...userKeys.all, 'me'] as const,
};

// Get current user (replaces user reducer state)
export function useUser() {
	return useQuery({
		queryKey: userKeys.me(),
		queryFn: async (): Promise<User> => {
			const response = await httpClient.get('auth/me');
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: (failureCount, error: any) => {
			// Don't retry if unauthorized
			if (error?.response?.status === 401) {
				return false;
			}
			return failureCount < 3;
		},
	});
}

// Update user profile
export function useUpdateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (userData: UserUpdateData): Promise<User> => {
			const response = await httpClient.put('auth/me', { json: userData });
			return response.json();
		},
		onSuccess: (updatedUser) => {
			// Update the user cache
			queryClient.setQueryData(userKeys.me(), updatedUser);
			
			// Optionally invalidate related queries
			queryClient.invalidateQueries({ queryKey: userKeys.details() });
		},
		onError: (error) => {
			console.error('Failed to update user:', error);
		},
	});
}

// Update user settings
export function useUpdateUserSettings() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (settings: Record<string, any>): Promise<User> => {
			const response = await httpClient.put('auth/me/settings', { json: { settings } });
			return response.json();
		},
		onSuccess: (updatedUser) => {
			queryClient.setQueryData(userKeys.me(), updatedUser);
		},
	});
}

// Example: Get users list (for admin functionality)
export function useUsers(filters: Record<string, any> = {}) {
	return useQuery({
		queryKey: userKeys.list(filters),
		queryFn: async (): Promise<User[]> => {
			const searchParams = new URLSearchParams(filters);
			const response = await httpClient.get(`users?${searchParams.toString()}`);
			return response.json();
		},
		enabled: Object.keys(filters).length > 0, // Only run if filters are provided
	});
}

// Get specific user by ID
export function useUserById(userId: string) {
	return useQuery({
		queryKey: userKeys.detail(userId),
		queryFn: async (): Promise<User> => {
			const response = await httpClient.get(`users/${userId}`);
			return response.json();
		},
		enabled: !!userId,
	});
}
