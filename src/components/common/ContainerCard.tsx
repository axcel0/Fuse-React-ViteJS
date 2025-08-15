import React from 'react';
import { 
	Card, 
	CardContent, 
	Typography, 
	Grid, 
	Box,
	LinearProgress,
	Chip,
	List,
	ListItem,
	ListItemText,
	ListItemIcon
} from '@mui/material';
import { 
	CheckCircle, 
	Error, 
	Warning, 
	ConstructionOutlined,
	NetworkCheck,
	Timer,
	CloudQueue
} from '@mui/icons-material';
import ServiceStatus from '../common/ServiceStatus';

interface ContainerCardProps {
	name: string;
	status: 'loading' | 'success' | 'error' | 'timeout' | 'maintenance';
	responseTime?: number;
	errorMessage?: string;
	lastUpdated?: Date;
	cpuUsage?: number;
	memoryUsage?: number;
}

const ContainerCard: React.FC<ContainerCardProps> = ({
	name,
	status,
	responseTime,
	errorMessage,
	lastUpdated,
	cpuUsage,
	memoryUsage
}) => {
	const isLoading = status === 'loading';
	const isError = status === 'error' || status === 'timeout' || status === 'maintenance';

	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardContent sx={{ flex: 1 }}>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h6" component="h3">
						{name}
					</Typography>
					<ServiceStatus
						serviceName={name}
						isLoading={isLoading}
						isError={isError}
						errorMessage={errorMessage}
						responseTime={responseTime}
					/>
				</Box>

				{/* Performance Metrics - only show if container is healthy */}
				{status === 'success' && (cpuUsage !== undefined || memoryUsage !== undefined) && (
					<Box mb={2}>
						{cpuUsage !== undefined && (
							<Box mb={1}>
								<Box display="flex" justifyContent="space-between" mb={0.5}>
									<Typography variant="body2" color="text.secondary">
										CPU Usage
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{cpuUsage}%
									</Typography>
								</Box>
								<LinearProgress
									variant="determinate"
									value={cpuUsage}
									color={cpuUsage > 80 ? 'error' : cpuUsage > 60 ? 'warning' : 'primary'}
									sx={{ height: 6, borderRadius: 3 }}
								/>
							</Box>
						)}

						{memoryUsage !== undefined && (
							<Box>
								<Box display="flex" justifyContent="space-between" mb={0.5}>
									<Typography variant="body2" color="text.secondary">
										Memory Usage
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{memoryUsage}%
									</Typography>
								</Box>
								<LinearProgress
									variant="determinate"
									value={memoryUsage}
									color={memoryUsage > 80 ? 'error' : memoryUsage > 60 ? 'warning' : 'primary'}
									sx={{ height: 6, borderRadius: 3 }}
								/>
							</Box>
						)}
					</Box>
				)}

				{/* Response Time Display */}
				{responseTime && status === 'success' && (
					<Box display="flex" alignItems="center" gap={1} mb={1}>
						<Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
						<Typography variant="body2" color="text.secondary">
							Response: {Math.round(responseTime)}ms
						</Typography>
					</Box>
				)}

				{/* Last Updated */}
				{lastUpdated && (
					<Typography variant="caption" color="text.secondary">
						Last updated: {lastUpdated.toLocaleTimeString()}
					</Typography>
				)}

				{/* Error Details */}
				{errorMessage && isError && (
					<Box mt={1}>
						<Typography variant="body2" color="error.main" sx={{ fontSize: '0.75rem' }}>
							{errorMessage}
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default ContainerCard;
