import '@i18n/i18n';
import './styles/index.css';
import './styles/dark-mode-fixes.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/configs/routesConfig';
import { worker } from '@mock-utils/mswMockAdapter';
import { API_BASE_URL } from '@/utils/apiFetch';

async function mockSetup() {
	// Only run MSW if it's enabled via environment variable
	if (import.meta.env.VITE_ENABLE_MSW === 'true') {
		console.log('🚀 Starting MSW with API_BASE_URL:', API_BASE_URL);
		
		return worker.start({
			onUnhandledRequest: 'bypass',
			serviceWorker: {
				url: '/mockServiceWorker.js'
			}
		});
	} else {
		console.log('🔒 MSW disabled - using real authentication');
		return Promise.resolve();
	}
}

/**
 * The root element of the application.
 */
const container = document.getElementById('app');

if (!container) {
	throw new Error('Failed to find the root element');
}

mockSetup().then(() => {
	/**
	 * The root component of the application.
	 */
	const root = createRoot(container, {
		onUncaughtError: (error, errorInfo) => {
			console.error('UncaughtError error', error, errorInfo.componentStack);
		},
		onCaughtError: (error, errorInfo) => {
			console.error('Caught error', error, errorInfo.componentStack);
		}
	});

	const router = createBrowserRouter(routes);

	root.render(<RouterProvider router={router} />);
});
