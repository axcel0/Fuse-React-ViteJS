import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled, alpha } from '@mui/material/styles';
import {
	Card,
	CardContent,
	Typography,
	Grid,
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
	Paper
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
	NetworkCheck as NetworkIcon
} from '@mui/icons-material';
import useUser from '@auth/useUser';
import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from 'src/contexts/PageTitleContext';

// Import TanStack Query hooks - back to real API
import { useDashboardData, useRefreshDashboardData } from 'src/hooks/useApi';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		color: '#ffffff'
	},
	'& .FusePageSimple-content': {
		padding: 0,
		backgroundColor: theme.palette.background.default
	}
}));

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
		setPageTitle('DASHBOARD');
	}, [setPageTitle]);
	
	// TanStack Query hooks - back to real API
	const { 
		data: dashboardData, 
		isLoading, 
		error: queryError,
		refetch 
	} = useDashboardData();
	
	const refreshMutation = useRefreshDashboardData();
	
	// State management for UI components
	const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
		cpuUsage: 0,
		memoryUsage: 0,
		diskUsage: 0,
		networkLatency: 0
	});

	// Manual refresh function
	const handleRefresh = useCallback(async () => {
		try {
			await refreshMutation.mutateAsync();
		} catch (error) {
			console.error('Manual refresh failed:', error);
		}
	}, [refreshMutation]);

	// Process dashboard data for display
	const containerStats: ContainerStats = {
		total: dashboardData?.totalContainers || 0,
		healthy: dashboardData?.connectedContainers || 0,
		failed: dashboardData?.failedContainers || 0,
		connected: dashboardData?.connectedContainers || 0,
		lastUpdate: new Date().toISOString()
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

	// Error message from TanStack Query
	const errorMessage = queryError 
		? `Failed to fetch dashboard data: ${queryError instanceof Error ? queryError.message : 'Unknown error'}`
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
		<Root
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
							disabled={isLoading || refreshMutation.isPending}
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
							{(isLoading || refreshMutation.isPending) ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
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
					{/* Container Status Overview */}
					<Grid container spacing={3} sx={{ mb: 4 }}>
						<Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
						</Grid>
						
						<Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
						</Grid>
						
						<Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
						</Grid>
						
						<Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
						</Grid>
					</Grid>

					{/* Main Content Grid */}
					<Grid container spacing={3}>
						{/* System Metrics */}
						<Grid size={{ xs: 12, lg: 4 }}>
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
						</Grid>

						{/* Recent Activities */}
						<Grid size={{ xs: 12, lg: 5 }}>
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
						</Grid>

						{/* Quick Actions */}
						<Grid size={{ xs: 12, lg: 3 }}>
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
						</Grid>
					</Grid>

					{/* User Info Footer */}
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
				</Box>
			}
		/>
	);
}

export default Dashboard;
