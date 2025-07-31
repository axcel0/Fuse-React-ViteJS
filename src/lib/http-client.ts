import ky from 'ky';

/**
 * HTTP Client Configuration using ky
 */
export const httpClient = ky.create({
	// Base URL for API requests
	prefixUrl: process.env.VITE_API_BASE_URL || '/api',

	// Default timeout for requests (30 seconds)
	timeout: 30000,

	// Default headers
	headers: {
		'Content-Type': 'application/json',
	},

	// Hooks for request/response interceptors
	hooks: {
		beforeRequest: [
			(request) => {
				// Add auth token if available
				const token = localStorage.getItem('accessToken');

				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
		beforeError: [
			(error) => {
				// Handle 401 errors (unauthorized)
				if (error.response?.status === 401) {
					// Clear stored auth data
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					// Redirect to login or trigger logout
					window.location.href = '/sign-in';
				}

				return error;
			},
		],
	},

	// Retry configuration
	retry: {
		limit: 3,
		methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
		statusCodes: [408, 413, 429, 500, 502, 503, 504],
	},
});

export default httpClient;
