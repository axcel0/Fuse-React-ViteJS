import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { 
	Typography, 
	Chip, 
	Button, 
	Box, 
	Card, 
	CardContent 
} from '@mui/material';
import { VisibilityRounded } from '@mui/icons-material';
import { ContainerStatus } from '../types';

interface ContainerDataTableProps {
	filteredData: ContainerStatus[];
	onViewLogs: (container: ContainerStatus) => void;
	isLoading: boolean;
}

export default function ContainerDataTable({
	filteredData,
	onViewLogs,
	isLoading
}: ContainerDataTableProps) {
	// Define columns for the data grid
	const columns: GridColDef[] = [
		{
			field: 'no',
			headerName: 'No',
			width: 80,
			sortable: true,
			renderCell: (params: GridRenderCellParams) => {
				const index = filteredData.findIndex(item => item.id === params.row.id);
				return (
					<Typography
						variant="body2"
						sx={{
							fontWeight: 600,
							color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6'
						}}
					>
						{index + 1}
					</Typography>
				);
			}
		},
		{
			field: 'containerName',
			headerName: 'Container',
			width: 250,
			flex: 1,
			minWidth: 200,
			sortable: true,
			renderCell: (params: GridRenderCellParams) => (
				<Typography variant="body2" sx={{ fontWeight: 500 }}>
					{params.value}
				</Typography>
			)
		},
		{
			field: 'kafkaConnection',
			headerName: 'Kafka Connection',
			width: 200,
			flex: 1,
			minWidth: 160,
			sortable: true,
			renderCell: (params: GridRenderCellParams) => {
				const connection = params.value || 'unconnected';
				const isConnected = connection === 'connected';
				
				return (
					<Chip
						label={connection}
						color={isConnected ? 'success' : 'default'}
						variant="filled"
						size="small"
						sx={{
							backgroundColor: isConnected 
								? 'rgba(34, 197, 94, 0.9)'
								: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(100, 116, 139, 0.3)' 
									: 'rgba(148, 163, 184, 0.3)',
							color: isConnected 
								? 'white'
								: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.8)' 
									: 'rgba(71, 85, 105, 0.9)',
							fontWeight: 600,
							textTransform: 'capitalize',
							border: '1px solid',
							borderColor: isConnected
								? 'rgba(34, 197, 94, 0.4)'
								: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(100, 116, 139, 0.2)' 
									: 'rgba(148, 163, 184, 0.3)',
							backdropFilter: 'blur(8px)',
							boxShadow: isConnected
								? '0 2px 8px rgba(34, 197, 94, 0.3)'
								: (theme) => theme.palette.mode === 'dark' 
									? '0 2px 8px rgba(0, 0, 0, 0.2)' 
									: '0 2px 8px rgba(0, 0, 0, 0.08)'
						}}
					/>
				);
			}
		},
		{
			field: 'version',
			headerName: 'Version',
			width: 120,
			flex: 0.8,
			minWidth: 100,
			sortable: true
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 130,
			flex: 0.8,
			minWidth: 120,
			sortable: true,
			renderCell: (params: GridRenderCellParams) => {
				const status = params.value || 'unknown';
				const getStatusConfig = (status: string) => {
					switch (status.toLowerCase()) {
						case 'ok':
						case 'running':
						case 'active':
							return {
								color: 'success' as const,
								bgColor: 'rgba(34, 197, 94, 0.9)',
								textColor: 'white',
								borderColor: 'rgba(34, 197, 94, 0.4)',
								shadowColor: 'rgba(34, 197, 94, 0.3)'
							};
						case 'failed':
						case 'error':
						case 'stopped':
							return {
								color: 'error' as const,
								bgColor: 'rgba(239, 68, 68, 0.9)',
								textColor: 'white',
								borderColor: 'rgba(239, 68, 68, 0.4)',
								shadowColor: 'rgba(239, 68, 68, 0.3)'
							};
						case 'pending':
						case 'starting':
							return {
								color: 'warning' as const,
								bgColor: 'rgba(245, 158, 11, 0.9)',
								textColor: 'white',
								borderColor: 'rgba(245, 158, 11, 0.4)',
								shadowColor: 'rgba(245, 158, 11, 0.3)'
							};
						default:
							return {
								color: 'default' as const,
								bgColor: 'rgba(100, 116, 139, 0.3)',
								textColor: 'rgba(255, 255, 255, 0.8)',
								borderColor: 'rgba(100, 116, 139, 0.2)',
								shadowColor: 'rgba(0, 0, 0, 0.2)'
							};
					}
				};

				const config = getStatusConfig(status);
				return (
					<Chip
						label={status}
						color={config.color}
						variant="filled"
						size="small"
						sx={{
							backgroundColor: config.bgColor,
							color: config.textColor,
							fontWeight: 600,
							textTransform: 'capitalize',
							border: '1px solid',
							borderColor: config.borderColor,
							backdropFilter: 'blur(8px)',
							boxShadow: `0 2px 8px ${config.shadowColor}`
						}}
					/>
				);
			}
		},
		{
			field: 'lastHeartbeat',
			headerName: 'Last Heartbeat',
			width: 180,
			flex: 1,
			minWidth: 160,
			sortable: true,
			renderCell: (params: GridRenderCellParams) => (
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>
					{params.value}
				</Typography>
			)
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 120,
			flex: 0.6,
			minWidth: 100,
			sortable: false,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params: GridRenderCellParams) => (
				<Box 
					sx={{ 
						display: 'flex', 
						alignItems: 'center', 
						justifyContent: 'center',
						width: '100%',
						height: '100%'
					}}
				>
					<Button
						size="small"
						variant="outlined"
						startIcon={<VisibilityRounded sx={{ fontSize: '16px' }} />}
						onClick={() => onViewLogs(params.row)}
						sx={{
							borderRadius: 2,
							textTransform: 'none',
							fontSize: '0.75rem',
							px: 1.5,
							py: 0.5,
							minHeight: 32,
							color: (theme) => theme.palette.mode === 'dark' 
								? 'rgba(56, 189, 248, 0.9)' 
								: 'rgba(59, 130, 246, 0.9)',
							borderColor: (theme) => theme.palette.mode === 'dark' 
								? 'rgba(56, 189, 248, 0.3)' 
								: 'rgba(59, 130, 246, 0.3)',
							backgroundColor: (theme) => theme.palette.mode === 'dark' 
								? 'rgba(56, 189, 248, 0.05)' 
								: 'rgba(59, 130, 246, 0.05)',
							backdropFilter: 'blur(8px)',
							fontWeight: 600,
							boxShadow: (theme) => theme.palette.mode === 'dark' 
								? '0 2px 8px rgba(56, 189, 248, 0.1)' 
								: '0 2px 8px rgba(59, 130, 246, 0.1)',
							'&:hover': {
								backgroundColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.15)' 
									: 'rgba(59, 130, 246, 0.15)',
								borderColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.5)' 
									: 'rgba(59, 130, 246, 0.5)',
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 1)' 
									: 'rgba(59, 130, 246, 1)',
								boxShadow: (theme) => theme.palette.mode === 'dark' 
									? '0 4px 12px rgba(56, 189, 248, 0.2)' 
									: '0 4px 12px rgba(59, 130, 246, 0.2)'
							}
						}}
					>
						Logs
					</Button>
				</Box>
			)
		}
	];

	return (
		<Card sx={{ 
			borderRadius: 3,
			// Futuristic cyber-space theme background
			bgcolor: 'transparent',
			border: '1px solid',
			borderColor: (theme) => theme.palette.mode === 'dark' 
				? 'rgba(56, 189, 248, 0.2)' 
				: 'rgba(59, 130, 246, 0.25)',
			boxShadow: (theme) => theme.palette.mode === 'dark' 
				? `0 8px 32px rgba(6, 182, 212, 0.15), 
				   0 4px 16px rgba(14, 165, 233, 0.1),
				   inset 0 1px 0 rgba(56, 189, 248, 0.1)`
				: `0 8px 32px rgba(59, 130, 246, 0.12), 
				   0 4px 16px rgba(99, 102, 241, 0.08),
				   inset 0 1px 0 rgba(147, 197, 253, 0.15)`,
			backdropFilter: 'blur(20px)',
			WebkitBackdropFilter: 'blur(20px)',
			// Bright and vibrant gradient - NO MORE BLACK!
			background: (theme) => theme.palette.mode === 'dark' 
				? `linear-gradient(135deg, 
					rgba(56, 189, 248, 0.8) 0%, 
					rgba(14, 165, 233, 0.7) 15%,
					rgba(6, 182, 212, 0.75) 35%,
					rgba(34, 197, 94, 0.6) 55%,
					rgba(168, 85, 247, 0.65) 75%,
					rgba(99, 102, 241, 0.7) 90%,
					rgba(59, 130, 246, 0.8) 100%
				)`
				: `linear-gradient(135deg, 
					rgba(248, 250, 252, 0.95) 0%, 
					rgba(241, 245, 249, 0.9) 15%,
					rgba(226, 232, 240, 0.85) 35%,
					rgba(203, 213, 225, 0.8) 55%,
					rgba(226, 232, 240, 0.85) 75%,
					rgba(241, 245, 249, 0.9) 90%,
					rgba(248, 250, 252, 0.95) 100%
				)`,
			// Enhanced hover and interaction effects
			transition: (theme) => theme.transitions.create([
				'box-shadow',
				'border-color',
				'background'
			], {
				duration: theme.transitions.duration.standard
			}),
			'&:hover': {
				borderColor: (theme) => theme.palette.mode === 'dark' 
					? 'rgba(56, 189, 248, 0.4)' 
					: 'rgba(59, 130, 246, 0.4)',
				boxShadow: (theme) => theme.palette.mode === 'dark' 
					? `0 12px 40px rgba(6, 182, 212, 0.25), 
					   0 6px 20px rgba(14, 165, 233, 0.15),
					   inset 0 1px 0 rgba(56, 189, 248, 0.15)`
					: `0 12px 40px rgba(59, 130, 246, 0.18), 
					   0 6px 20px rgba(99, 102, 241, 0.12),
					   inset 0 1px 0 rgba(147, 197, 253, 0.2)`
			},
			// Futuristic overlay effect
			position: 'relative',
			overflow: 'hidden',
			'&::before': {
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: (theme) => theme.palette.mode === 'dark'
					? `radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.6) 0%, transparent 40%),
					   radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.5) 0%, transparent 40%),
					   radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.7) 0%, transparent 40%),
					   radial-gradient(circle at 60% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 40%),
					   radial-gradient(circle at 30% 60%, rgba(34, 197, 94, 0.5) 0%, transparent 35%),
					   radial-gradient(circle at 70% 40%, rgba(99, 102, 241, 0.3) 0%, transparent 30%)`
					: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
					   radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
					   radial-gradient(circle at 40% 80%, rgba(147, 197, 253, 0.06) 0%, transparent 40%),
					   radial-gradient(circle at 60% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 40%),
					   radial-gradient(circle at 30% 60%, rgba(34, 197, 94, 0.04) 0%, transparent 35%)`,
				pointerEvents: 'none',
				zIndex: 0
			},
			// Subtle animated border effect
			'&::after': {
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				borderRadius: 'inherit',
				padding: '1px',
				background: (theme) => theme.palette.mode === 'dark'
					? `linear-gradient(45deg, 
						rgba(56, 189, 248, 0.1), 
						rgba(14, 165, 233, 0.05), 
						rgba(6, 182, 212, 0.1)
					)`
					: `linear-gradient(45deg, 
						rgba(59, 130, 246, 0.15), 
						rgba(99, 102, 241, 0.08), 
						rgba(147, 197, 253, 0.12)
					)`,
				mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
				maskComposite: 'xor',
				WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
				WebkitMaskComposite: 'xor',
				pointerEvents: 'none',
				zIndex: 1
			}
		}}>
			<CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, position: 'relative', zIndex: 2 }}>
				<Box sx={{ width: '100%' }}>
					<DataGrid
						rows={filteredData}
						columns={columns}
						loading={isLoading}
						disableRowSelectionOnClick
						pageSizeOptions={[5, 10, 15, 20]}
						initialState={{
							pagination: {
								paginationModel: { pageSize: 10 }
							}
						}}
						autoHeight
						disableVirtualization
						disableColumnResize
						disableColumnMenu
						hideFooterSelectedRowCount
						getRowId={(row) => `${row.imageName}-${row.containerName}`}
						sx={{
							border: 'none',
							overflow: 'hidden',
							// Futuristic elegant DataGrid styling
							'& .MuiDataGrid-root': {
								backgroundColor: 'transparent',
								overflow: 'hidden',
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.9)' 
									: 'rgba(30, 41, 59, 0.9)'
							},
							'& .MuiDataGrid-main': {
								backgroundColor: 'transparent',
								overflow: 'hidden'
							},
							'& .MuiDataGrid-cell': {
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.85)' 
									: 'rgba(30, 41, 59, 0.8)',
								borderColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.08)' 
									: 'rgba(59, 130, 246, 0.12)',
								fontSize: '0.875rem',
								fontWeight: 400,
								padding: '14px 16px',
								display: 'flex',
								alignItems: 'center'
							},
							// Elegant futuristic column headers - BRIGHT BLUE BACKGROUND
							'& .MuiDataGrid-columnHeaders': {
								background: (theme) => theme.palette.mode === 'dark'
									? `linear-gradient(135deg, 
										rgba(30, 58, 88, 0.95) 0%, 
										rgba(15, 23, 42, 0.9) 50%,
										rgba(51, 65, 85, 0.92) 100%
									) !important`
									: `linear-gradient(135deg, 
										rgba(56, 189, 248, 0.95) 0%, 
										rgba(14, 165, 233, 0.9) 50%,
										rgba(6, 182, 212, 0.92) 100%
									) !important`,
								backgroundColor: (theme) => theme.palette.mode === 'dark'
									? 'rgba(30, 58, 88, 0.95) !important'
									: 'rgba(56, 189, 248, 0.95) !important',
								borderColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.15)' 
									: 'rgba(59, 130, 246, 0.2)',
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.95)' 
									: 'rgba(30, 41, 59, 0.9)',
								overflow: 'hidden !important',
								borderBottom: (theme) => theme.palette.mode === 'dark' 
									? '2px solid rgba(56, 189, 248, 0.2)' 
									: '2px solid rgba(59, 130, 246, 0.25)',
								position: 'relative',
								'&::after': {
									content: '""',
									position: 'absolute',
									bottom: 0,
									left: 0,
									right: 0,
									height: '1px',
									background: (theme) => theme.palette.mode === 'dark'
										? 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent)'
										: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)'
								}
							},
							'& .MuiDataGrid-columnHeader': {
								fontWeight: 700,
								fontSize: '0.9rem',
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.95)' 
									: 'rgba(30, 58, 88, 0.9)',
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
								backgroundColor: 'transparent !important'
							},
							'& .MuiDataGrid-columnHeaderTitle': {
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.95)' 
									: 'rgba(30, 58, 88, 0.9)',
								fontWeight: 700
							},
							// Enhanced elegant row styling - NO MORE TRANSPARENT!
							'& .MuiDataGrid-row': {
								backgroundColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.25)' 
									: 'rgba(248, 250, 252, 0.8)',
								borderColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.06)' 
									: 'rgba(59, 130, 246, 0.08)',
								transition: (theme) => theme.transitions.create([
									'background-color',
									'box-shadow'
								], {
									duration: theme.transitions.duration.short
								}),
								'&:hover': {
									backgroundColor: (theme) => theme.palette.mode === 'dark' 
										? 'rgba(56, 189, 248, 0.4)' 
										: 'rgba(59, 130, 246, 0.15)',
									boxShadow: (theme) => theme.palette.mode === 'dark' 
										? '0 4px 12px rgba(6, 182, 212, 0.2)' 
										: '0 4px 12px rgba(59, 130, 246, 0.15)'
								},
								'&.Mui-selected': {
									backgroundColor: (theme) => theme.palette.mode === 'dark' 
										? 'rgba(56, 189, 248, 0.5)' 
										: 'rgba(59, 130, 246, 0.2)',
									borderColor: (theme) => theme.palette.mode === 'dark' 
										? 'rgba(56, 189, 248, 0.3)' 
										: 'rgba(59, 130, 246, 0.3)',
									'&:hover': {
										backgroundColor: (theme) => theme.palette.mode === 'dark' 
											? 'rgba(56, 189, 248, 0.6)' 
											: 'rgba(59, 130, 246, 0.25)'
									}
								}
							},
							// Enhanced elegant footer styling
							'& .MuiDataGrid-footerContainer': {
								borderColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(51, 65, 85, 0.3)' 
									: 'rgba(59, 130, 246, 0.2)',
								background: (theme) => theme.palette.mode === 'dark'
									? `linear-gradient(135deg, 
										rgba(30, 58, 88, 0.95) 0%, 
										rgba(15, 23, 42, 0.9) 50%,
										rgba(51, 65, 85, 0.92) 100%
									)`
									: `linear-gradient(135deg, 
										rgba(241, 245, 249, 0.95) 0%, 
										rgba(226, 232, 240, 0.9) 50%,
										rgba(203, 213, 225, 0.85) 100%
									)`,
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.9)' 
									: 'rgba(30, 41, 59, 0.9)',
								borderTop: (theme) => theme.palette.mode === 'dark' 
									? '2px solid rgba(56, 189, 248, 0.2)' 
									: '2px solid rgba(59, 130, 246, 0.25)',
								position: 'relative',
								'&::before': {
									content: '""',
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									height: '1px',
									background: (theme) => theme.palette.mode === 'dark'
										? 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent)'
										: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)'
								}
							},
							'& .MuiTablePagination-root': {
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.9)' 
									: 'rgba(30, 41, 59, 0.9)'
							},
							'& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.8)' 
									: 'rgba(30, 41, 59, 0.8)',
								fontWeight: 500
							},
							'& .MuiTablePagination-select': {
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.9)' 
									: 'rgba(30, 41, 59, 0.9)'
							},
							'& .MuiTablePagination-actions button': {
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.8)' 
									: 'rgba(30, 41, 59, 0.8)',
								'&:hover': {
									backgroundColor: (theme) => theme.palette.mode === 'dark' 
										? 'rgba(56, 189, 248, 0.1)' 
										: 'rgba(59, 130, 246, 0.1)',
									color: (theme) => theme.palette.mode === 'dark' 
										? 'white' 
										: 'rgba(30, 41, 59, 0.95)'
								},
								'&.Mui-disabled': {
									color: (theme) => theme.palette.mode === 'dark' 
										? 'rgba(255, 255, 255, 0.3)' 
										: 'rgba(30, 41, 59, 0.3)'
								}
							},
							// Enhanced loading and overlay states
							'& .MuiDataGrid-overlay': {
								backgroundColor: 'transparent',
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.9)' 
									: 'rgba(30, 41, 59, 0.9)',
								backdropFilter: 'blur(10px)'
							},
							'& .MuiCircularProgress-root': {
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.8)' 
									: 'rgba(59, 130, 246, 0.8)'
							},
							'& .MuiLinearProgress-root': {
								backgroundColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(56, 189, 248, 0.1)' 
									: 'rgba(59, 130, 246, 0.1)',
								'& .MuiLinearProgress-bar': {
									backgroundColor: (theme) => theme.palette.mode === 'dark' 
										? 'rgba(56, 189, 248, 0.6)' 
										: 'rgba(59, 130, 246, 0.6)'
								}
							},
							// Hide scrollbars for clean elegant look
							'& .MuiDataGrid-virtualScroller': {
								overflow: 'hidden !important'
							},
							'& .MuiDataGrid-virtualScrollerContent': {
								overflow: 'hidden !important'
							},
							'& .MuiDataGrid-virtualScrollerRenderZone': {
								overflow: 'hidden !important'
							},
							'& .MuiDataGrid-scrollArea': {
								display: 'none !important'
							},
							'& .MuiDataGrid-scrollArea--left': {
								display: 'none !important'
							},
							'& .MuiDataGrid-scrollArea--right': {
								display: 'none !important'
							}
						}}
						slots={{
							toolbar: () => null
						}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
}
