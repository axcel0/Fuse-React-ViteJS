import { QueryClient } from '@tanstack/react-query';

/**
 * React Query Client Configuration
 */
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Time in milliseconds that unused/inactive cache data remains in memory
			staleTime: 5 * 60 * 1000, // 5 minutes
			// Time in milliseconds that the cache should remain in memory before being garbage collected
			gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)
			// Retry failed requests
			retry: (failureCount, error: { status?: number } | unknown) => {
				// Don't retry on 4xx errors (client errors)
				if (error && typeof error === 'object' && 'status' in error) {
					const errorWithStatus = error as { status: number };
					if (errorWithStatus.status >= 400 && errorWithStatus.status < 500) {
						return false;
					}
				}

				// Retry up to 3 times for other errors
				return failureCount < 3;
			},
			// Refetch on window focus
			refetchOnWindowFocus: false,
			// Refetch on reconnect
			refetchOnReconnect: true
		},
		mutations: {
			// Retry failed mutations
			retry: false
		}
	}
});
