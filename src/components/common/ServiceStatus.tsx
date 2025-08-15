import React from 'react';
import { Box, Chip, CircularProgress, Tooltip } from '@mui/material';
import { 
	CheckCircle, 
	Error, 
	Warning, 
	ConstructionOutlined,
	NetworkCheck
} from '@mui/icons-material';

interface ServiceStatusProps {
	serviceName: string;
	isLoading: boolean;
	isError: boolean;
	errorMessage?: string;
	responseTime?: number;
}

// Container yang diketahui sering maintenance menurut tim backend
const MAINTENANCE_CONTAINERS = ['evbackup', 'systemapp', 'evrestore'];

const ServiceStatus: React.FC<ServiceStatusProps> = ({ 
	serviceName, 
	isLoading, 
	isError, 
	errorMessage,
	responseTime 
}) => {
	const isMaintenanceContainer = MAINTENANCE_CONTAINERS.includes(serviceName.toLowerCase());
	
	// Determine status
	const getStatusConfig = () => {
		if (isLoading) {
			return {
				label: 'Loading...',
				color: 'default' as const,
				icon: <CircularProgress size={16} />,
				tooltip: 'Fetching data...'
			};
		}
		
		if (isError) {
			// Timeout pada container maintenance dianggap normal
			if (isMaintenanceContainer && errorMessage?.includes('AbortError')) {
				return {
					label: 'Maintenance',
					color: 'warning' as const,
					icon: <ConstructionOutlined />,
					tooltip: `${serviceName} is under maintenance or temporarily offline. This is expected behavior.`
				};
			}
			
			// Timeout pada container aktif
			if (errorMessage?.includes('AbortError')) {
				return {
					label: 'Timeout',
					color: 'error' as const,
					icon: <NetworkCheck />,
					tooltip: `${serviceName} is taking too long to respond. May be experiencing issues.`
				};
			}
			
			// Error lainnya
			return {
				label: 'Error',
				color: 'error' as const,
				icon: <Error />,
				tooltip: errorMessage || 'Service error'
			};
		}
		
		// Success
		const isSlowResponse = responseTime && responseTime > 2000;
		return {
			label: isSlowResponse ? `OK (${Math.round(responseTime)}ms)` : 'Online',
			color: isSlowResponse ? 'warning' as const : 'success' as const,
			icon: isSlowResponse ? <Warning /> : <CheckCircle />,
			tooltip: responseTime ? 
				`${serviceName} responded in ${Math.round(responseTime)}ms` : 
				`${serviceName} is online and responding`
		};
	};

	const status = getStatusConfig();

	return (
		<Tooltip title={status.tooltip} arrow>
			<Box display="inline-flex" alignItems="center" gap={0.5}>
				<Chip
					size="small"
					label={status.label}
					color={status.color}
					icon={status.icon}
					variant="outlined"
					sx={{
						fontSize: '0.75rem',
						height: 24,
						'& .MuiChip-icon': {
							fontSize: 16
						}
					}}
				/>
			</Box>
		</Tooltip>
	);
};

export default ServiceStatus;
