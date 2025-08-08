import { useMemo } from 'react';
import {
	Card,
	CardContent,
	Typography,
	Box,
	Avatar,
	Stack
} from '@mui/material';
import {
	Assessment as ContainerIcon,
	CloudQueue as CloudIcon,
	CheckCircle as SuccessIcon,
	Error as ErrorIcon
} from '@mui/icons-material';
import { ContainerStatus, ContainerStats } from '../types';

interface ContainerStatsCardProps {
	containerData: ContainerStatus[];
}

export default function ContainerStatsCard({ containerData }: ContainerStatsCardProps) {
	// Container stats for dashboard overview - memoized
	const containerStats: ContainerStats = useMemo(() => ({
		total: containerData.length,
		connected: containerData.filter(c => c.kafkaConnection === 'connected').length,
		ok: containerData.filter(c => c.status === 'ok').length,
		failed: containerData.filter(c => c.status === 'failed' || c.status === 'request timeout').length
	}), [containerData]);

	const statsCards = [
		{
			title: 'Total Containers',
			value: containerStats.total,
			icon: <ContainerIcon sx={{ fontSize: 32 }} />,
			color: '#3b82f6',
			bgColor: 'rgba(59, 130, 246, 0.1)'
		},
		{
			title: 'Kafka Connected',
			value: containerStats.connected,
			icon: <CloudIcon sx={{ fontSize: 32 }} />,
			color: '#10b981',
			bgColor: 'rgba(16, 185, 129, 0.1)'
		},
		{
			title: 'Healthy',
			value: containerStats.ok,
			icon: <SuccessIcon sx={{ fontSize: 32 }} />,
			color: '#10b981',
			bgColor: 'rgba(16, 185, 129, 0.1)'
		},
		{
			title: 'Failed',
			value: containerStats.failed,
			icon: <ErrorIcon sx={{ fontSize: 32 }} />,
			color: '#ef4444',
			bgColor: 'rgba(239, 68, 68, 0.1)'
		}
	];

	return (
		<Box sx={{ 
			display: 'grid', 
			gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
			gap: 3, 
			mb: 3 
		}}>
			{statsCards.map((stat, index) => (
				<Card key={index} sx={{
						background: (theme) => theme.palette.mode === 'dark' 
							? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
							: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
						borderRadius: 3,
						border: (theme) => theme.palette.mode === 'dark' 
							? '1px solid rgba(51, 65, 85, 0.3)'
							: '1px solid rgba(226, 232, 240, 0.5)',
						boxShadow: (theme) => theme.palette.mode === 'dark'
							? '0 10px 25px rgba(0, 0, 0, 0.3)'
							: '0 4px 12px rgba(0, 0, 0, 0.08)',
						transition: 'all 0.3s ease',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: (theme) => theme.palette.mode === 'dark'
								? '0 20px 40px rgba(0, 0, 0, 0.4)'
								: '0 8px 24px rgba(0, 0, 0, 0.12)'
						}
					}}>
						<CardContent sx={{ p: 3 }}>
							<Stack direction="row" alignItems="center" spacing={2}>
								<Avatar sx={{
									bgcolor: stat.bgColor,
									color: stat.color,
									width: 56,
									height: 56,
									border: `2px solid ${stat.color}20`
								}}>
									{stat.icon}
								</Avatar>
								<Box sx={{ flex: 1 }}>
									<Typography 
										variant="h4" 
										sx={{ 
											fontWeight: 600,
											mb: 0.5,
											color: (theme) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b'
										}}
									>
										{stat.value}
									</Typography>
									<Typography 
										variant="body2" 
										sx={{ 
											color: (theme) => theme.palette.mode === 'dark' 
												? 'rgba(241, 245, 249, 0.7)'
												: 'rgba(30, 41, 59, 0.7)',
											fontWeight: 500
										}}
									>
										{stat.title}
									</Typography>
								</Box>
							</Stack>
						</CardContent>
					</Card>
			))}
		</Box>
	);
}
