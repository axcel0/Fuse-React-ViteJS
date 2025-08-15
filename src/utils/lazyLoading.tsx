import { lazy } from 'react';

// Lazy load komponen-komponen besar untuk meningkatkan performa
export const LazyContainerPage = lazy(() => import('../app/(control-panel)/container/Container'));
export const LazyDashboardPage = lazy(() => import('../app/(control-panel)/dashboard/Dashboard'));
export const LazyPerformanceDashboard = lazy(() => import('../components/dashboard/PerformanceDashboard'));
export const LazyNetworkDebugger = lazy(() => import('../components/debug/NetworkDebugger'));

// Lazy load komponen container sub-components
export const LazyContainerDataTable = lazy(() => import('../app/(control-panel)/container/components/ContainerDataTable'));
export const LazyContainerDetailDialog = lazy(() => import('../app/(control-panel)/container/components/ContainerDetailDialog'));
export const LazyContainerStatsCard = lazy(() => import('../app/(control-panel)/container/components/ContainerStatsCard'));
export const LazyContainerFilters = lazy(() => import('../app/(control-panel)/container/components/ContainerFilters'));

// Fallback component untuk loading state
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingFallback: React.FC<{ name?: string }> = ({ name = 'Component' }) => (
	<Box 
		sx={{ 
			display: 'flex', 
			flexDirection: 'column',
			justifyContent: 'center', 
			alignItems: 'center', 
			minHeight: 200,
			gap: 2
		}}
	>
		<CircularProgress size={40} />
		<Typography variant="body2" color="text.secondary">
			Loading {name}...
		</Typography>
	</Box>
);

// Error boundary untuk lazy loaded components
export class LazyLoadErrorBoundary extends React.Component<
	{ children: React.ReactNode; fallback?: React.ReactNode },
	{ hasError: boolean; error?: Error }
> {
	constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Lazy load error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback || (
				<Box sx={{ p: 3, textAlign: 'center' }}>
					<Typography color="error" variant="h6">
						Failed to load component
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
						{this.state.error?.message || 'Unknown error occurred'}
					</Typography>
				</Box>
			);
		}

		return this.props.children;
	}
}

export default {
	LazyContainerPage,
	LazyDashboardPage,
	LazyPerformanceDashboard,
	LazyNetworkDebugger,
	LazyContainerDataTable,
	LazyContainerDetailDialog,
	LazyContainerStatsCard,
	LazyContainerFilters,
	LoadingFallback,
	LazyLoadErrorBoundary
};
