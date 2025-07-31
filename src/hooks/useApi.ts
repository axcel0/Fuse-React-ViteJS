import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';

/**
 * Example API Hooks - Replace Redux API calls with TanStack Query
 */

// Example: Products API (replace Redux product slice)
export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	image?: string;
	category: string;
	inStock: boolean;
}

export const productKeys = {
	all: ['products'] as const,
	lists: () => [...productKeys.all, 'list'] as const,
	list: (filters: Record<string, any>) => [...productKeys.lists(), { filters }] as const,
	details: () => [...productKeys.all, 'detail'] as const,
	detail: (id: string) => [...productKeys.details(), id] as const
};

// Get products list
export function useProducts(filters: Record<string, any> = {}) {
	return useQuery({
		queryKey: productKeys.list(filters),
		queryFn: async (): Promise<Product[]> => {
			const searchParams = new URLSearchParams(filters);
			const response = await httpClient.get(`products?${searchParams.toString()}`);
			return response.json();
		}
	});
}

// Get single product
export function useProduct(id: string) {
	return useQuery({
		queryKey: productKeys.detail(id),
		queryFn: async (): Promise<Product> => {
			const response = await httpClient.get(`products/${id}`);
			return response.json();
		},
		enabled: !!id
	});
}

// Create product
export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (productData: Omit<Product, 'id'>): Promise<Product> => {
			const response = await httpClient.post('products', { json: productData });
			return response.json();
		},
		onSuccess: () => {
			// Invalidate products list to refetch with new data
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
		}
	});
}

// Update product
export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...productData }: Partial<Product> & { id: string }): Promise<Product> => {
			const response = await httpClient.put(`products/${id}`, {
				json: productData
			});
			return response.json();
		},
		onSuccess: (updatedProduct) => {
			// Update specific product in cache
			queryClient.setQueryData(productKeys.detail(updatedProduct.id), updatedProduct);
			// Invalidate lists to refresh
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
		}
	});
}

// Delete product
export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string): Promise<void> => {
			await httpClient.delete(`products/${id}`);
		},
		onSuccess: (_, deletedId) => {
			// Remove product from cache
			queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
			// Invalidate lists
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
		}
	});
}

// Example: Dashboard/Analytics API
export interface DashboardStats {
	totalUsers: number;
	totalOrders: number;
	revenue: number;
	growth: number;
}

export function useDashboardStats() {
	return useQuery({
		queryKey: ['dashboard', 'stats'],
		queryFn: async (): Promise<DashboardStats> => {
			const response = await httpClient.get('dashboard/stats');
			return response.json();
		},
		staleTime: 2 * 60 * 1000, // 2 minutes
		refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
	});
}
