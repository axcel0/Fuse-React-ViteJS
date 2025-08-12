import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import {
	Typography,
	Box,
	Button,
	Alert,
	CircularProgress
} from '@mui/material';
import {
	Refresh as RefreshIcon,
	GetApp as ExportIcon
} from '@mui/icons-material';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePageTitle } from 'src/contexts/PageTitleContext';

// Import TanStack Query hooks - back to real API
import { useContainerStatus, useRefreshContainerData } from 'src/hooks/useApi';

// Import components and types
import { ContainerStatus, ActivityLog, ContainerStats } from './types';
import { useExportCSV } from './hooks/useExportCSV';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import ContainerStatsCard from './components/ContainerStatsCard';
import ContainerFilters from './components/ContainerFilters';
import ContainerDataTable from './components/ContainerDataTable';
import ContainerDetailDialog from './components/ContainerDetailDialog';

// Simple Material-UI styling with full-width layout
const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-content': {
		backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff'
	},
	'& .FusePageSimple-contentWrapper': {
		padding: 0,
		maxWidth: 'none',
		width: '100%'
	}
}));

function Container() {
	const { t } = useTranslation('navigation');
	const { setPageTitle } = usePageTitle();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedContainer, setSelectedContainer] = useState<ContainerStatus | null>(null);
	const [detailDialogOpen, setDetailDialogOpen] = useState(false);
	const [statusFilter, setStatusFilter] = useState<string>('all');

	// TanStack Query hooks - back to real API
	const {
		data: containerData = [],
		isLoading,
		error: queryError,
		refetch
	} = useContainerStatus();
	
	const refreshMutation = useRefreshContainerData();	// Set page title when component mounts
	useEffect(() => {
		setPageTitle('CONTAINER STATUS');
	}, [setPageTitle]);

	// Use custom hook for CSV export
	const { downloadCSV } = useExportCSV();

	// Manual refresh function that uses TanStack Query
	const handleManualRefresh = useCallback(async () => {
		try {
			await refreshMutation.mutateAsync();
		} catch (error) {
			console.error('Manual refresh failed:', error);
		}
	}, [refreshMutation]);

	// Use auto refresh hook with TanStack Query refetch
	const {
		isAutoRefreshEnabled,
		setIsAutoRefreshEnabled,
		refreshInterval,
		setRefreshInterval,
		isRefreshing,
		lastRefreshTime,
		triggerManualRefresh
	} = useAutoRefresh({
		onRefresh: handleManualRefresh,
		defaultInterval: 10,
		defaultEnabled: false
	});

	// Filter data based on search term and status filter using useMemo to prevent infinite re-renders
	const filteredData = useMemo(() => {
		let filtered = containerData;

		// Apply search filter if there's a search term
		if (searchTerm) {
			filtered = filtered.filter(container => 
				container.imageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				container.containerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				container.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
				container.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
				container.kafkaConnection.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Apply status filter
		if (statusFilter !== 'all') {
			if (statusFilter === 'connected') {
				filtered = filtered.filter(container => container.kafkaConnection === 'connected');
			} else if (statusFilter === 'ok') {
				filtered = filtered.filter(container => container.status === 'ok');
			} else if (statusFilter === 'failed') {
				filtered = filtered.filter(container => 
					container.status === 'failed' || container.status === 'request timeout'
				);
			}
		}

		return filtered;
	}, [containerData, searchTerm, statusFilter]);

	// Event handlers - memoized to prevent unnecessary re-renders
	const handleViewLogs = useCallback((container: ContainerStatus) => {
		setSelectedContainer(container);
		setDetailDialogOpen(true);
	}, []);

	const handleRefreshContainer = useCallback((container: ContainerStatus) => {
		// Refresh specific container or all containers using TanStack Query
		handleManualRefresh();
	}, [handleManualRefresh]);

	const handleDownloadCSV = useCallback(() => {
		downloadCSV(filteredData, 'container-status');
	}, [downloadCSV, filteredData]);

	// Error message from TanStack Query
	const errorMessage = queryError 
		? `Failed to fetch container data: ${queryError instanceof Error ? queryError.message : 'Unknown error'}`
		: null;

	return (
		<Root
			content={
				<Box sx={{ 
					px: { xs: 1, sm: 2 }, 
					py: 1, 
					width: '100%', 
					maxWidth: '100%',
					margin: 0
				}}>
					{errorMessage && (
						<Alert 
							severity="error" 
							sx={{ mb: 2 }}
							onClose={() => {/* TanStack Query will handle retry */}}
						>
							{errorMessage}
						</Alert>
					)}

					{isLoading ? (
						<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
							<CircularProgress size={40} />
						</Box>
					) : (
						<Box sx={{ px: 0 }}>
							{/* Statistics Cards */}
							<ContainerStatsCard containerData={containerData} />

							{/* Export CSV button moved to filter bar via ContainerFilters props */}

							{/* Filters - Now with TanStack Query integration */}
							<ContainerFilters
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
								statusFilter={statusFilter}
								setStatusFilter={setStatusFilter}
								filteredDataLength={filteredData.length}
								totalDataLength={containerData.length}
								isAutoRefreshEnabled={isAutoRefreshEnabled}
								setIsAutoRefreshEnabled={setIsAutoRefreshEnabled}
								refreshInterval={refreshInterval}
								setRefreshInterval={setRefreshInterval}
								onManualRefresh={triggerManualRefresh}
								isRefreshing={isLoading || isRefreshing || refreshMutation.isPending}
								lastRefreshTime={lastRefreshTime}
								onExportCSV={handleDownloadCSV}
							/>

							{/* Data Table */}
							<ContainerDataTable
								filteredData={filteredData}
								onViewLogs={handleViewLogs}
								isLoading={isLoading}
							/>

							{/* Detail Dialog */}
							<ContainerDetailDialog
								open={detailDialogOpen}
								onClose={() => setDetailDialogOpen(false)}
								container={selectedContainer}
							/>
						</Box>
					)}
				</Box>
			}
		/>
	);
}

export default Container;