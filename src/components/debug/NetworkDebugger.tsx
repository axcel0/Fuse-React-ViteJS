import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { getNetworkStats, resetNetworkStats, clearRequestQueue } from '../../hooks/useApi';

// Component untuk monitoring network performance khusus dev tunnel
const NetworkDebugger: React.FC = () => {
	const [stats, setStats] = useState(getNetworkStats());
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setStats(getNetworkStats());
		}, 1000); // Update every second

		return () => clearInterval(interval);
	}, []);

	const successRate = stats.totalRequests > 0 
		? Math.round((stats.successfulRequests / stats.totalRequests) * 100) 
		: 0;
	
	const timeoutRate = stats.totalRequests > 0 
		? Math.round((stats.timeoutRequests / stats.totalRequests) * 100) 
		: 0;

	const errorRate = stats.totalRequests > 0 
		? Math.round((stats.failedRequests / stats.totalRequests) * 100) 
		: 0;

	if (!isVisible) {
		return (
			<Box
				sx={{
					position: 'fixed',
					bottom: 16,
					right: 16,
					zIndex: 9999,
				}}
			>
				<Button
					variant="contained"
					size="small"
					onClick={() => setIsVisible(true)}
					sx={{ 
						backgroundColor: '#2196f3', 
						color: 'white',
						minWidth: 'auto',
						padding: '8px 12px'
					}}
				>
					📊 Network Debug
				</Button>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: 16,
				right: 16,
				zIndex: 9999,
				width: 320,
			}}
		>
			<Paper 
				elevation={8} 
				sx={{ 
					p: 2, 
					backgroundColor: 'rgba(0,0,0,0.9)', 
					color: 'white',
					borderRadius: 2
				}}
			>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
					<Typography variant="h6" sx={{ fontSize: '1rem' }}>
						🔍 Network Monitor
					</Typography>
					<Button
						size="small"
						onClick={() => setIsVisible(false)}
						sx={{ color: 'white', minWidth: 'auto' }}
					>
						✕
					</Button>
				</Box>

				<Box sx={{ display: 'flex', gap: 2 }}>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="lightgray">
							Total Requests
						</Typography>
						<Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
							{stats.totalRequests}
						</Typography>
					</Box>
					<Box sx={{ flex: 1 }}>
						<Typography variant="body2" color="lightgray">
							Avg Response
						</Typography>
						<Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
							{stats.avgResponseTime}ms
						</Typography>
					</Box>
				</Box>

				<Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
					<Chip
						label={`✅ ${successRate}%`}
						size="small"
						sx={{ 
							backgroundColor: successRate > 80 ? '#4caf50' : '#ff9800',
							color: 'white',
							fontWeight: 'bold'
						}}
					/>
					<Chip
						label={`⏰ ${timeoutRate}%`}
						size="small"
						sx={{ 
							backgroundColor: timeoutRate > 20 ? '#f44336' : '#4caf50',
							color: 'white',
							fontWeight: 'bold'
						}}
					/>
					<Chip
						label={`❌ ${errorRate}%`}
						size="small"
						sx={{ 
							backgroundColor: errorRate > 10 ? '#f44336' : '#4caf50',
							color: 'white',
							fontWeight: 'bold'
						}}
					/>
				</Box>

				<Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
					<Button
						variant="outlined"
						size="small"
						onClick={resetNetworkStats}
						sx={{ 
							color: 'white', 
							borderColor: 'white',
							'&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
						}}
					>
						🔄 Reset Stats
					</Button>
					<Button
						variant="outlined"
						size="small"
						onClick={clearRequestQueue}
						sx={{ 
							color: 'white', 
							borderColor: 'white',
							'&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
						}}
					>
						🧹 Clear Queue
					</Button>
					<Button
						variant="outlined"
						size="small"
						onClick={() => {
							const stats = getNetworkStats();
							console.log('📊 Current Network Stats:', stats);
						}}
						sx={{ 
							color: 'white', 
							borderColor: 'white',
							'&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
						}}
					>
						📋 Log Stats
					</Button>
				</Box>

				{/* Performance indicators */}
				<Box sx={{ mt: 2 }}>
					<Typography variant="body2" color="lightgray" sx={{ mb: 1 }}>
						Performance Status:
					</Typography>
					{stats.avgResponseTime < 2000 && (
						<Chip
							label="🚀 Fast Network"
							size="small"
							sx={{ backgroundColor: '#4caf50', color: 'white' }}
						/>
					)}
					{stats.avgResponseTime >= 2000 && stats.avgResponseTime < 5000 && (
						<Chip
							label="🐌 Slow Network"
							size="small"
							sx={{ backgroundColor: '#ff9800', color: 'white' }}
						/>
					)}
					{stats.avgResponseTime >= 5000 && (
						<Chip
							label="🔥 Very Slow Network"
							size="small"
							sx={{ backgroundColor: '#f44336', color: 'white' }}
						/>
					)}
				</Box>
			</Paper>
		</Box>
	);
};

export default NetworkDebugger;
