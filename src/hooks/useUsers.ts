import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';

// Types
export interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	role: string;
}

export interface CreateUserData {
	name: string;
	email: string;
	role: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
	id: string;
}

// Query Keys
export const userKeys = {
	all: ['users'] as const,
	lists: () => [...userKeys.all, 'list'] as const,
	list: (filters: Record<string, unknown>) => [...userKeys.lists(), { filters }] as const,
	details: () => [...userKeys.all, 'detail'] as const,
	detail: (id: string) => [...userKeys.details(), id] as const
};

// API Functions
const userApi = {
	getUsers: async (filters?: Record<string, unknown>): Promise<User[]> => {
		const searchParams = new URLSearchParams();

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					searchParams.append(key, String(value));
				}
			});
		}

		const response = await httpClient.get(`users?${searchParams.toString()}`);
		return response.json();
	},

	getUser: async (id: string): Promise<User> => {
		const response = await httpClient.get(`users/${id}`);
		return response.json();
	},

	createUser: async (data: CreateUserData): Promise<User> => {
		const response = await httpClient.post('users', { json: data });
		return response.json();
	},

	updateUser: async ({ id, ...data }: UpdateUserData): Promise<User> => {
		const response = await httpClient.put(`users/${id}`, { json: data });
		return response.json();
	},

	deleteUser: async (id: string): Promise<void> => {
		await httpClient.delete(`users/${id}`);
	}
};

// Custom Hooks

/**
 * Hook to fetch all users with optional filters
 */
export const useUsers = (filters?: Record<string, unknown>) => {
	return useQuery({
		queryKey: userKeys.list(filters || {}),
		queryFn: () => userApi.getUsers(filters),
		staleTime: 5 * 60 * 1000 // 5 minutes
	});
};

/**
 * Hook to fetch a single user by ID
 */
export const useUser = (id: string) => {
	return useQuery({
		queryKey: userKeys.detail(id),
		queryFn: () => userApi.getUser(id),
		enabled: !!id // Only run query if ID exists
	});
};

/**
 * Hook to create a new user
 */
export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: userApi.createUser,
		onSuccess: () => {
			// Invalidate and refetch users list
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
		}
	});
};

/**
 * Hook to update an existing user
 */
export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: userApi.updateUser,
		onSuccess: (updatedUser) => {
			// Update the specific user in cache
			queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
			// Invalidate users list to ensure consistency
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
		}
	});
};

/**
 * Hook to delete a user
 */
export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: userApi.deleteUser,
		onSuccess: (_, deletedUserId) => {
			// Remove user from cache
			queryClient.removeQueries({ queryKey: userKeys.detail(deletedUserId) });
			// Invalidate users list
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
		}
	});
};
