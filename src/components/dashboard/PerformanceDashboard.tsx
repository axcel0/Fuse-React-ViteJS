import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	Paper,
	Chip,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	List,
	ListItem,
	ListItemText,
	Alert
} from '@mui/material';
import {
	ExpandMore as ExpandMoreIcon,
	Memory as MemoryIcon,
	Speed as SpeedIcon,
	NetworkCheck as NetworkIcon,
	BugReport as BugIcon
} from '@mui/icons-material';
import { usePerformanceMonitor, PerformanceUtils } from '../../hooks/usePerformanceMonitor';
import { getNetworkStats } from '../../hooks/useApi';

// Performance monitoring component for dashboard
const PerformanceDashboard: React.FC = () => {
	const { metrics, getPerformanceReport } = usePerformanceMonitor();
	const [networkStats, setNetworkStats] = useState(getNetworkStats());
	const [connectionInfo, setConnectionInfo] = useState(PerformanceUtils.getConnectionType());
	const [showDetails, setShowDetails] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setNetworkStats(getNetworkStats());
			setConnectionInfo(PerformanceUtils.getConnectionType());
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const getPerformanceLevel = () => {
		const { pageLoadTime, memoryUsage, domNodes } = metrics;
		const { avgResponseTime } = networkStats;

		let score = 100;
		
		// Deduct points for slow performance
		if (pageLoadTime > 3000) score -= 20;
		if (avgResponseTime > 2000) score -= 25;
		if (memoryUsage > 100) score -= 15;
		if (domNodes > 5000) score -= 10;

		if (score >= 80) return { level: 'Excellent', color: '#4caf50' };
		if (score >= 60) return { level: 'Good', color: '#ff9800' };
		if (score >= 40) return { level: 'Fair', color: '#ff5722' };
		return { level: 'Poor', color: '#f44336' };
	};

	const performanceLevel = getPerformanceLevel();

	const handleDownloadReport = () => {
		const report = getPerformanceReport();
		const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const isDevTunnel = PerformanceUtils.isDevTunnel();

	return (
		<Paper elevation={2} sx={{ p: 3, mb: 3 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<SpeedIcon />
					Performance Monitor
				</Typography>
				<Chip
					label={performanceLevel.level}
					sx={{ 
						backgroundColor: performanceLevel.color, 
						color: 'white',
						fontWeight: 'bold'
					}}
				/>
			</Box>

			{/* Dev Tunnel Warning */}
			{isDevTunnel && (
				<Alert severity="info" sx={{ mb: 2 }}>
					🔗 Running in dev tunnel - expect slower performance than production
				</Alert>
			)}

			{/* Quick Stats Grid */}
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 2 }}>
				<Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
					<Typography variant="body2" color="text.secondary">
						Page Load
					</Typography>
					<Typography variant="h6" color={metrics.pageLoadTime > 3000 ? 'error.main' : 'success.main'}>
						{metrics.pageLoadTime}ms
					</Typography>
				</Box>
				<Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
					<Typography variant="body2" color="text.secondary">
						Memory Usage
					</Typography>
					<Typography variant="h6" color={metrics.memoryUsage > 100 ? 'error.main' : 'success.main'}>
						{metrics.memoryUsage}MB
					</Typography>
				</Box>
				<Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
					<Typography variant="body2" color="text.secondary">
						API Avg Response
					</Typography>
					<Typography variant="h6" color={networkStats.avgResponseTime > 2000 ? 'error.main' : 'success.main'}>
						{networkStats.avgResponseTime}ms
					</Typography>
				</Box>
				<Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
					<Typography variant="body2" color="text.secondary">
						DOM Nodes
					</Typography>
					<Typography variant="h6" color={metrics.domNodes > 5000 ? 'error.main' : 'success.main'}>
						{metrics.domNodes.toLocaleString()}
					</Typography>
				</Box>
			</Box>

			{/* Network Quality */}
			<Box sx={{ mb: 2 }}>
				<Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
					<NetworkIcon fontSize="small" />
					Network Quality
				</Typography>
				<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
					<Chip size="small" label={`Connection: ${connectionInfo.effectiveType}`} />
					<Chip size="small" label={`Success Rate: ${Math.round((networkStats.successfulRequests / Math.max(networkStats.totalRequests, 1)) * 100)}%`} />
					<Chip size="small" label={`Total Requests: ${networkStats.totalRequests}`} />
				</Box>
			</Box>

			{/* Action Buttons */}
			<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
				<Button
					variant="outlined"
					size="small"
					onClick={() => setShowDetails(!showDetails)}
				>
					{showDetails ? 'Hide Details' : 'Show Details'}
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={handleDownloadReport}
				>
					Download Report
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={PerformanceUtils.cleanupMemory}
				>
					Cleanup Memory
				</Button>
			</Box>

			{/* Detailed Performance Info */}
			{showDetails && (
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<BugIcon fontSize="small" />
							Performance Recommendations
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List dense>
							{metrics.pageLoadTime > 3000 && (
								<ListItem>
									<ListItemText
										primary="Slow Page Load"
										secondary="Consider implementing code splitting and lazy loading for better initial load performance"
									/>
								</ListItem>
							)}
							{metrics.memoryUsage > 100 && (
								<ListItem>
									<ListItemText
										primary="High Memory Usage"
										secondary="Check for memory leaks, especially in useEffect hooks and event listeners"
									/>
								</ListItem>
							)}
							{networkStats.avgResponseTime > 2000 && (
								<ListItem>
									<ListItemText
										primary="Slow API Responses"
										secondary="Consider implementing request caching, reducing payload size, or optimizing server endpoints"
									/>
								</ListItem>
							)}
							{metrics.domNodes > 5000 && (
								<ListItem>
									<ListItemText
										primary="Large DOM Size"
										secondary="Consider virtualization for large lists and tables to improve rendering performance"
									/>
								</ListItem>
							)}
							{isDevTunnel && (
								<ListItem>
									<ListItemText
										primary="Dev Tunnel Environment"
										secondary="Performance may be slower than production due to tunneling overhead. Test in production environment for accurate metrics."
									/>
								</ListItem>
							)}
						</List>
					</AccordionDetails>
				</Accordion>
			)}
		</Paper>
	);
};

export default PerformanceDashboard;
