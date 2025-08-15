import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled, alpha } from '@mui/material/styles';
import {
	Card,
	CardContent,
	Typography,
	Box,
	Avatar,
	Chip,
	LinearProgress,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Divider,
	IconButton,
	Alert,
	CircularProgress,
	Paper,
	Fab
} from '@mui/material';
import {
	TrendingUp,
	Group,
	Assessment,
	Notifications,
	Dashboard as DashboardIcon,
	Widgets as ContainerIcon,
	CloudQueue as CloudIcon,
	Storage as DatabaseIcon,
	CheckCircle as SuccessIcon,
	Error as ErrorIcon,
	Warning as WarningIcon,
	Timeline as ActivityIcon,
	Refresh as RefreshIcon,
	Launch as LaunchIcon,
	Speed as SpeedIcon,
	Memory as MemoryIcon,
	NetworkCheck as NetworkIcon,
	ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import useUser from '@auth/useUser';
import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from 'src/contexts/PageTitleContext';

// Import hooks dari useApi - menggunakan token dari Keycloak authentication
import { ContainerStatus } from '../container/types';
import { useDashboardData } from 'src/hooks/useApi';
import ContainerCard from 'src/components/common/ContainerCard';
import ServiceStatus from 'src/components/common/ServiceStatus';
import PerformanceDashboard from 'src/components/dashboard/PerformanceDashboard';

// Styled components

const StatsCard = styled(Card)(({ theme }) => ({
	height: '100%',
	transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
	background: theme.palette.mode === 'dark' ? '#0f172a' : '#1e293b',
	color: '#ffffff',
	border: theme.palette.mode === 'dark' ? '1px solid #334155' : 'none',
	'&:hover': {
		transform: 'translateY(-4px)',
		boxShadow: theme.shadows[12]
	}
}));

const ActionCard = styled(Card)(({ theme }) => ({
	height: '100%',
	transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
	backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
	'&:hover': {
		transform: 'translateY(-2px)',
		boxShadow: theme.shadows[8]
	}
}));

// Interface definitions
interface ActivityLog {
	id: string;
	source: string;
	description: string;
	createdAt: string;
	severity: 'info' | 'warning' | 'error' | 'success';
}

interface ContainerStats {
	total: number;
	healthy: number;
	failed: number;
	connected: number;
	lastUpdate: string;
}

interface SystemMetrics {
	cpuUsage: number;
	memoryUsage: number;
	diskUsage: number;
	networkLatency: number;
}

function Dashboard() {
	const { t } = useTranslation('navigation');
	const { setPageTitle } = usePageTitle();
	const user = useUser();
	const navigate = useNavigate();

	// Set page title when component mounts
	useEffect(() => {
		setPageTitle('Dashboard');
	}, [setPageTitle]);
	
	// Native hooks - menggunakan token dari Keycloak
	const { 
		data: dashboardData, 
		loading: isLoading, 
		error: queryError,
		refetch,
		containerStatuses
	} = useDashboardData();
	
	// State management for UI components
	const [searchTerm, setSearchTerm] = useState('');
	const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
		cpuUsage: 0,
		memoryUsage: 0,
		diskUsage: 0,
		networkLatency: 0
	});

	// Response times untuk monitoring performa - simplified
	const responseTimes: Record<string, number> = {};
	
	// Container data dari dashboard API
	const allContainers = dashboardData?.containers || [];

	// Filter containers berdasarkan search term
	const filteredContainers = allContainers.filter((container: any) => 
		container.name?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Scroll functionality
	const [showScrollTop, setShowScrollTop] = useState(false);

	const scrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Manual refresh function
	const handleRefresh = useCallback(async () => {
		try {
			await refetch();
		} catch (error) {
			console.error('Manual refresh failed:', error);
		}
	}, [refetch]);

	// Process dashboard data for display
	const containerStats: ContainerStats = {
		total: dashboardData?.totalContainers || 0,
		healthy: dashboardData?.connectedContainers || 0,
		failed: (dashboardData?.failedContainers || 0) + (dashboardData?.timeoutContainers || 0),
		connected: dashboardData?.connectedContainers || 0,
		lastUpdate: new Date().toISOString()
	};

	// Enhanced container summary for display
	const enhancedContainerStats = {
		...containerStats,
		maintenance: dashboardData?.maintenanceContainers || 0,
		timeout: dashboardData?.timeoutContainers || 0,
		offline: dashboardData?.failedContainers || 0
	};

	const recentActivities: ActivityLog[] = (dashboardData?.activityLogs || [])
		.slice(0, 10)
		.map(log => ({
			id: log.id || `${log.source}-${Date.now()}`,
			source: log.source || 'Unknown',
			description: log.description || log.action || 'No description',
			createdAt: log.timestamp || log.createdAt || new Date().toISOString(),
			severity: 'info' as const
		}));

	// Error message dari native hooks
	const errorMessage = queryError 
		? `Failed to fetch dashboard data: ${typeof queryError === 'string' ? queryError : 'Unknown error'}`
		: null;

	// Generate realistic system metrics for demo
	useEffect(() => {
		setSystemMetrics({
			cpuUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
			memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
			diskUsage: Math.floor(Math.random() * 20) + 60, // 60-80%
			networkLatency: Math.floor(Math.random() * 50) + 10 // 10-60ms
		});
	}, []);

	// Get severity icon and color
	const getSeverityIcon = (severity: string) => {
		switch (severity) {
			case 'success': return <SuccessIcon fontSize="small" color="success" />;
			case 'error': return <ErrorIcon fontSize="small" color="error" />;
			case 'warning': return <WarningIcon fontSize="small" color="warning" />;
			default: return <ActivityIcon fontSize="small" color="info" />;
		}
	};

	const getMetricColor = (value: number, type: 'cpu' | 'memory' | 'disk' | 'network') => {
		if (type === 'network') {
			return value > 100 ? 'error' : value > 50 ? 'warning' : 'success';
		}
		return value > 80 ? 'error' : value > 60 ? 'warning' : 'success';
	};

	return (
		<div>
			<FusePageSimple
				content={
					<Box sx={{ 
						px: { xs: 1, sm: 2 }, 
						py: 1, 
						width: '100%', 
						maxWidth: '100%',
						margin: 0
					}}>
					{/* Welcome Section - Compact */}
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
						<Chip 
							label={`Welcome, ${user.data?.displayName || 'User'}`} 
							sx={{ 
								bgcolor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(59, 130, 246, 0.2)' 
									: 'rgba(59, 130, 246, 0.1)',
								color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
								border: (theme) => theme.palette.mode === 'dark' 
									? '1px solid rgba(59, 130, 246, 0.3)'
									: '1px solid rgba(59, 130, 246, 0.2)',
								fontWeight: 600
							}}
						/>
						<IconButton
							onClick={handleRefresh}
							disabled={isLoading}
							sx={{
								color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
								bgcolor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(59, 130, 246, 0.1)' 
									: 'rgba(59, 130, 246, 0.05)',
								'&:hover': {
									bgcolor: (theme) => theme.palette.mode === 'dark' 
										? 'rgba(59, 130, 246, 0.2)' 
										: 'rgba(59, 130, 246, 0.1)'
								}
							}}
						>
							{isLoading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
						</IconButton>
					</Box>
					
					{errorMessage && (
						<Alert 
							severity="error" 
							sx={{ mb: 2 }} 
							onClose={() => {/* TanStack Query will handle retry */}}
						>
							{errorMessage}
						</Alert>
					)}
					
					{/* Performance Dashboard - Development Only */}
					{import.meta.env.DEV && <PerformanceDashboard />}
					
					{/* Container Status Overview */}
					<Box sx={{ 
						display: 'grid', 
						gridTemplateColumns: { 
							xs: '1fr', 
							sm: 'repeat(2, 1fr)', 
							md: 'repeat(3, 1fr)',
							lg: 'repeat(5, 1fr)'
						}, 
						gap: 3, 
						mb: 4 
					}}>
						<StatsCard>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<Box>
										<Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
											Total Containers
										</Typography>
										<Typography variant="h3" sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
											{containerStats.total}
										</Typography>
										<Chip 
											label="Active" 
											size="small" 
											sx={{ 
												bgcolor: 'rgba(76, 175, 80, 0.2)',
												color: '#4caf50',
												border: '1px solid rgba(76, 175, 80, 0.3)'
											}}
										/>
									</Box>
									<Avatar 
										sx={{ 
											bgcolor: 'rgba(33, 150, 243, 0.2)',
											width: 64,
											height: 64,
											border: '2px solid rgba(33, 150, 243, 0.3)'
										}}
									>
										<ContainerIcon sx={{ fontSize: 32, color: '#2196f3' }} />
									</Avatar>
								</Box>
							</CardContent>
						</StatsCard>
						
						<StatsCard>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<Box>
										<Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
											Healthy Containers
										</Typography>
										<Typography variant="h3" sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
											{containerStats.healthy}
										</Typography>
										<Chip 
											label={`${Math.round((containerStats.healthy / containerStats.total) * 100)}%`}
											size="small" 
											sx={{ 
												bgcolor: 'rgba(76, 175, 80, 0.2)',
												color: '#4caf50',
												border: '1px solid rgba(76, 175, 80, 0.3)'
											}}
										/>
									</Box>
									<Avatar 
										sx={{ 
											bgcolor: 'rgba(76, 175, 80, 0.2)',
											width: 64,
											height: 64,
											border: '2px solid rgba(76, 175, 80, 0.3)'
										}}
									>
										<SuccessIcon sx={{ fontSize: 32, color: '#4caf50' }} />
									</Avatar>
								</Box>
							</CardContent>
						</StatsCard>
						
						<StatsCard>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<Box>
										<Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
											Kafka Connected
										</Typography>
										<Typography variant="h3" sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
											{containerStats.connected}
										</Typography>
										<Chip 
											label="Connected" 
											size="small" 
											sx={{ 
												bgcolor: 'rgba(76, 175, 80, 0.2)',
												color: '#4caf50',
												border: '1px solid rgba(76, 175, 80, 0.3)'
											}}
										/>
									</Box>
									<Avatar 
										sx={{ 
											bgcolor: 'rgba(76, 175, 80, 0.2)',
											width: 64,
											height: 64,
											border: '2px solid rgba(76, 175, 80, 0.3)'
										}}
									>
										<CloudIcon sx={{ fontSize: 32, color: '#4caf50' }} />
									</Avatar>
								</Box>
							</CardContent>
						</StatsCard>
						
						<StatsCard>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<Box>
										<Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
											Failed/Issues
										</Typography>
										<Typography variant="h3" sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
											{containerStats.failed}
										</Typography>
										<Chip 
											label={containerStats.failed > 0 ? "Needs Attention" : "All Good"} 
											size="small" 
											sx={{ 
												bgcolor: containerStats.failed > 0 ? 'rgba(244, 67, 54, 0.2)' : 'rgba(76, 175, 80, 0.2)',
												color: containerStats.failed > 0 ? '#f44336' : '#4caf50',
												border: `1px solid ${containerStats.failed > 0 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(76, 175, 80, 0.3)'}`
											}}
										/>
									</Box>
									<Avatar 
										sx={{ 
											bgcolor: containerStats.failed > 0 ? 'rgba(244, 67, 54, 0.2)' : 'rgba(76, 175, 80, 0.2)',
											width: 64,
											height: 64,
											border: `2px solid ${containerStats.failed > 0 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(76, 175, 80, 0.3)'}`
										}}
									>
										{containerStats.failed > 0 ? 
											<ErrorIcon sx={{ fontSize: 32, color: '#f44336' }} /> : 
											<SuccessIcon sx={{ fontSize: 32, color: '#4caf50' }} />
										}
									</Avatar>
								</Box>
							</CardContent>
						</StatsCard>
						
						{/* Maintenance containers card */}
						<StatsCard>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<Box>
										<Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
											Maintenance
										</Typography>
										<Typography variant="h3" sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
											{enhancedContainerStats.maintenance}
										</Typography>
										<Chip 
											label={enhancedContainerStats.maintenance > 0 ? "Under Maintenance" : "None"} 
											size="small" 
											sx={{ 
												bgcolor: enhancedContainerStats.maintenance > 0 ? 'rgba(255, 193, 7, 0.2)' : 'rgba(76, 175, 80, 0.2)',
												color: enhancedContainerStats.maintenance > 0 ? '#ffc107' : '#4caf50',
												border: `1px solid ${enhancedContainerStats.maintenance > 0 ? 'rgba(255, 193, 7, 0.3)' : 'rgba(76, 175, 80, 0.3)'}`
											}}
										/>
									</Box>
									<Avatar 
										sx={{ 
											bgcolor: enhancedContainerStats.maintenance > 0 ? 'rgba(255, 193, 7, 0.2)' : 'rgba(76, 175, 80, 0.2)',
											width: 64,
											height: 64,
											border: `2px solid ${enhancedContainerStats.maintenance > 0 ? 'rgba(255, 193, 7, 0.3)' : 'rgba(76, 175, 80, 0.3)'}`
										}}
									>
										{enhancedContainerStats.maintenance > 0 ? 
											<WarningIcon sx={{ fontSize: 32, color: '#ffc107' }} /> : 
											<SuccessIcon sx={{ fontSize: 32, color: '#4caf50' }} />
										}
									</Avatar>
								</Box>
							</CardContent>
						</StatsCard>
					</Box>

					{/* Main Content Grid */}
					<Box sx={{ 
						display: 'grid', 
						gridTemplateColumns: { 
							xs: '1fr', 
							lg: '1fr 1.5fr 1fr'
						}, 
						gap: 3 
					}}>
						{/* System Metrics */}
						<ActionCard>
							<CardContent>
								<Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
									<SpeedIcon color="primary" />
									System Performance
								</Typography>
									<Box sx={{ mb: 3 }}>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
											<Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
												<SpeedIcon fontSize="small" />
												CPU Usage
											</Typography>
											<Typography variant="body2" fontWeight="600">
												{systemMetrics.cpuUsage}%
											</Typography>
										</Box>
										<LinearProgress 
											variant="determinate" 
											value={systemMetrics.cpuUsage} 
											color={getMetricColor(systemMetrics.cpuUsage, 'cpu') as any}
											sx={{ height: 8, borderRadius: 4 }}
										/>
									</Box>
									
									<Box sx={{ mb: 3 }}>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
											<Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
												<MemoryIcon fontSize="small" />
												Memory Usage
											</Typography>
											<Typography variant="body2" fontWeight="600">
												{systemMetrics.memoryUsage}%
											</Typography>
										</Box>
										<LinearProgress 
											variant="determinate" 
											value={systemMetrics.memoryUsage} 
											color={getMetricColor(systemMetrics.memoryUsage, 'memory') as any}
											sx={{ height: 8, borderRadius: 4 }}
										/>
									</Box>
									
									<Box sx={{ mb: 3 }}>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
											<Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
												<DatabaseIcon fontSize="small" />
												Disk Usage
											</Typography>
											<Typography variant="body2" fontWeight="600">
												{systemMetrics.diskUsage}%
											</Typography>
										</Box>
										<LinearProgress 
											variant="determinate" 
											value={systemMetrics.diskUsage} 
											color={getMetricColor(systemMetrics.diskUsage, 'disk') as any}
											sx={{ height: 8, borderRadius: 4 }}
										/>
									</Box>
									
									<Box>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
											<Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
												<NetworkIcon fontSize="small" />
												Network Latency
											</Typography>
											<Typography variant="body2" fontWeight="600">
												{systemMetrics.networkLatency}ms
											</Typography>
										</Box>
										<LinearProgress 
											variant="determinate" 
											value={Math.min(systemMetrics.networkLatency, 100)} 
											color={getMetricColor(systemMetrics.networkLatency, 'network') as any}
											sx={{ height: 8, borderRadius: 4 }}
										/>
									</Box>
								</CardContent>
							</ActionCard>
						
						{/* Recent Activities */}
						<ActionCard>
							<CardContent>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
									<Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
										<ActivityIcon color="primary" />
										Recent Activities ({recentActivities.length})
									</Typography>
									<Typography variant="caption" color="text.secondary">
										Last updated: {format(new Date(containerStats.lastUpdate), 'HH:mm:ss', { locale: localeId })}
									</Typography>
								</Box>
								
								{recentActivities.length > 0 ? (
									<List sx={{ maxHeight: 400, overflow: 'auto' }}>
										{recentActivities.map((activity, index) => (
											<Box key={activity.id}>
												<ListItem sx={{ px: 0, py: 1 }}>
													<ListItemIcon sx={{ minWidth: 36 }}>
														{getSeverityIcon(activity.severity)}
													</ListItemIcon>
													<ListItemText
														primary={
															<Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
																{activity.description}
															</Typography>
														}
														secondary={
															<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
																<Typography variant="caption" color="text.secondary">
																	{activity.source}
																</Typography>
																<Typography variant="caption" color="text.secondary">
																	{format(new Date(activity.createdAt), 'HH:mm:ss', { locale: localeId })}
																</Typography>
															</Box>
														}
													/>
												</ListItem>
												{index < recentActivities.length - 1 && <Divider />}
											</Box>
										))}
									</List>
								) : (
									<Box sx={{ textAlign: 'center', py: 4 }}>
										<ActivityIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
										<Typography variant="body2" color="text.secondary">
											No recent activities
										</Typography>
									</Box>
								)}
							</CardContent>
						</ActionCard>

						{/* Quick Actions */}
						<ActionCard>
							<CardContent>
								<Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
									<LaunchIcon color="primary" />
									Quick Actions
								</Typography>
								
								<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
									<Button
										variant="outlined"
										fullWidth
										startIcon={<ContainerIcon />}
										onClick={() => navigate('/container')}
										sx={{ 
											justifyContent: 'flex-start',
											textTransform: 'none',
											py: 1.5
										}}
									>
										View Container Status
									</Button>
									
									<Button
										variant="outlined"
										fullWidth
										startIcon={<Assessment />}
										onClick={() => navigate('/reports')}
										sx={{ 
											justifyContent: 'flex-start',
											textTransform: 'none',
											py: 1.5
										}}
									>
										Generate Reports
									</Button>
									
									<Button
										variant="outlined"
										fullWidth
										startIcon={<CloudIcon />}
										onClick={() => navigate('/monitoring')}
										sx={{ 
											justifyContent: 'flex-start',
											textTransform: 'none',
											py: 1.5
										}}
									>
										System Monitoring
									</Button>
									
									<Divider sx={{ my: 1 }} />
									
									<Paper sx={{ p: 2, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }}>
										<Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
											System Status
										</Typography>
										<Typography variant="caption" color="text.secondary">
											{containerStats.failed === 0 ? 
												'All systems operational' : 
												`${containerStats.failed} containers need attention`
											}
										</Typography>
									</Paper>
								</Box>
							</CardContent>
						</ActionCard>
					</Box>

					{/* Container Status Detail */}
					<Typography variant="h5" component="h2" sx={{ mb: 3, mt: 4, fontWeight: 600 }}>
						Container Health Details
					</Typography>
					<Box sx={{ 
						display: 'grid', 
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
						gap: 3,
						mb: 4 
					}}>
						{filteredContainers.length > 0 ? (
							filteredContainers.map((container) => (
								<Box key={container.name}>
									<ContainerCard 
										name={container.name}
										status={container.status || 'loading'}
										responseTime={responseTimes[container.name] || container.responseTime}
										errorMessage={container.errorMessage}
										lastUpdated={container.lastUpdated ? new Date(container.lastUpdated) : undefined}
										cpuUsage={container.cpuUsage}
										memoryUsage={container.memoryUsage}
									/>
								</Box>
							))
						) : (
							<Box sx={{ gridColumn: '1 / -1' }}>
								<Paper sx={{ p: 4, textAlign: 'center', bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1) }}>
									<Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
										No containers found
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{searchTerm ? 
											`No containers match the search "${searchTerm}"` : 
											'No containers are currently running'
										}
									</Typography>
								</Paper>
							</Box>
						)}
					</Box>					{/* User Info Footer */}
					<Card sx={{ mt: 4, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05) }}>
						<CardContent>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
								<Avatar 
									sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}
								>
									{user.data?.displayName?.charAt(0) || 'U'}
								</Avatar>
								<Box sx={{ flex: 1 }}>
									<Typography variant="h6" sx={{ fontWeight: 600 }}>
										Welcome back, {user.data?.displayName || 'User'}!
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Email: {user.data?.email}
									</Typography>
									<Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
										{Array.isArray(user.data?.role) && user.data.role.map((role) => (
											<Chip 
												key={role}
												label={role} 
												size="small" 
												color="primary"
												variant="outlined"
											/>
										))}
									</Box>
								</Box>
								<Box sx={{ textAlign: 'right' }}>
									<Typography variant="caption" color="text.secondary">
										Last login
									</Typography>
									<Typography variant="body2" sx={{ fontWeight: 600 }}>
										{format(new Date(), 'dd MMM yyyy, HH:mm', { locale: localeId })}
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>

					{/* Using Keycloak token automatically - no auth setup needed */}
					</Box>
				}
			/>
			
			{/* Scroll to top button */}
			<Fab
				color="primary"
				size="small"
				onClick={scrollToTop}
				sx={{
					position: 'fixed',
					bottom: 16,
					right: 16,
					transition: 'opacity 0.3s ease-in-out',
					opacity: showScrollTop ? 1 : 0,
					pointerEvents: showScrollTop ? 'auto' : 'none',
					zIndex: 1000
				}}
			>
				<ExpandLessIcon />
			</Fab>
		</div>
	);
}

export default Dashboard;
