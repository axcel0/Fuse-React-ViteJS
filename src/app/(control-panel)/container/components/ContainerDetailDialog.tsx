import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
	Chip,
	Divider,
	Card,
	CardContent,
	Stack,
	IconButton
} from '@mui/material';
import {
	Close as CloseIcon,
	ContentCopy as ContentCopyIcon,
	CalendarToday as CalendarIcon,
	Computer as ComputerIcon,
	Storage as StorageIcon,
	NetworkCheck as NetworkIcon
} from '@mui/icons-material';
import { ContainerStatus } from '../types';

interface ContainerDetailDialogProps {
	open: boolean;
	onClose: () => void;
	container: ContainerStatus | null;
}

export default function ContainerDetailDialog({
	open,
	onClose,
	container
}: ContainerDetailDialogProps) {
	if (!container) return null;

	const getStatusConfig = (status: string) => {
		switch (status) {
			case 'connected':
			case 'ok':
				return {
					color: 'success' as const,
					bgColor: (theme) => theme.palette.mode === 'dark' ? '#059669' : '#dcfce7',
					textColor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#166534'
				};
			case 'failed':
				return {
					color: 'error' as const,
					bgColor: (theme) => theme.palette.mode === 'dark' ? '#dc2626' : '#fee2e2',
					textColor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#991b1b'
				};
			default:
				return {
					color: 'default' as const,
					bgColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6',
					textColor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#374151'
				};
		}
	};

	const statusConfig = getStatusConfig(container.status);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			slotProps={{
				backdrop: {
					sx: {
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						backdropFilter: 'blur(4px)'
					}
				}
			}}
			sx={{
				'& .MuiDialog-paper': {
					backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
					backgroundImage: 'none',
					borderRadius: 3,
					border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
					maxHeight: '90vh',
					boxShadow: (theme) => theme.palette.mode === 'dark' 
						? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
						: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
					backdropFilter: 'blur(10px)',
					background: (theme) => theme.palette.mode === 'dark' 
						? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))'
						: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))'
				}
			}}
		>
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
					color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b',
					borderBottom: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
					pb: 2
				}}
			>
				<Box>
					<Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
						Container Details
					</Typography>
					<Typography variant="body2" sx={{ 
						color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)',
						mt: 0.5
					}}>
						{container.imageName} / {container.containerName}
					</Typography>
				</Box>
				<IconButton
					onClick={onClose}
					sx={{
						color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b',
						'&:hover': {
							backgroundColor: (theme) => theme.palette.mode === 'dark' 
								? 'rgba(255, 255, 255, 0.1)' 
								: 'rgba(30, 41, 59, 0.1)'
						}
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent sx={{ 
				p: 3,
				backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
				color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'
			}}>
			{/* Container Info Cards */}
			<Box sx={{ 
				display: 'grid', 
				gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, 
				gap: 3, 
				mb: 3 
			}}>
				<Card sx={{ 
					borderRadius: 3,
					bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
					border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
					boxShadow: (theme) => theme.palette.mode === 'dark' 
						? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
						: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
					backdropFilter: 'blur(10px)',
					background: (theme) => theme.palette.mode === 'dark' 
						? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))'
						: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9))'
				}}>
					<CardContent>
						<Stack direction="row" alignItems="center" spacing={2}>
							<ComputerIcon sx={{ 
								color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6' 
							}} />
							<Box>
								<Typography variant="body2" sx={{ 
									color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)'
								}}>
									Image Name
								</Typography>
								<Typography variant="body1" sx={{ fontWeight: 600 }}>
									{container.imageName}
								</Typography>
							</Box>
							<IconButton
								size="small"
								onClick={() => copyToClipboard(container.imageName)}
								sx={{ ml: 'auto' }}
							>
								<ContentCopyIcon fontSize="small" />
							</IconButton>
						</Stack>
					</CardContent>
				</Card>

				<Card sx={{ 
					borderRadius: 3,
					bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
					border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
					boxShadow: (theme) => theme.palette.mode === 'dark' 
						? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
						: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
					backdropFilter: 'blur(10px)',
					background: (theme) => theme.palette.mode === 'dark' 
						? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))'
						: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9))'
				}}>
					<CardContent>
						<Stack direction="row" alignItems="center" spacing={2}>
							<StorageIcon sx={{ 
								color: (theme) => theme.palette.mode === 'dark' ? '#34d399' : '#059669' 
							}} />
							<Box>
								<Typography variant="body2" sx={{ 
									color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)'
								}}>
									Container Name
								</Typography>
								<Typography variant="body1" sx={{ fontWeight: 600 }}>
									{container.containerName}
								</Typography>
							</Box>
							<IconButton
								size="small"
								onClick={() => copyToClipboard(container.containerName)}
								sx={{ ml: 'auto' }}
							>
								<ContentCopyIcon fontSize="small" />
							</IconButton>
						</Stack>
					</CardContent>
				</Card>

				<Card sx={{ 
					borderRadius: 3,
					bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
					border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
					boxShadow: (theme) => theme.palette.mode === 'dark' 
						? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
						: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
					backdropFilter: 'blur(10px)',
					background: (theme) => theme.palette.mode === 'dark' 
						? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))'
						: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9))'
				}}>
					<CardContent>
						<Stack direction="row" alignItems="center" spacing={2}>
							<NetworkIcon sx={{ 
								color: statusConfig.color === 'success' 
									? (theme) => theme.palette.mode === 'dark' ? '#34d399' : '#059669'
									: (theme) => theme.palette.mode === 'dark' ? '#f87171' : '#dc2626'
							}} />
							<Box>
								<Typography variant="body2" sx={{ 
									color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)'
								}}>
									Status
								</Typography>
								<Chip
									label={container.status}
									color={statusConfig.color}
									variant="filled"
									size="small"
									sx={{
										backgroundColor: statusConfig.bgColor,
										color: statusConfig.textColor,
										fontWeight: 600,
										textTransform: 'capitalize',
										mt: 0.5
									}}
								/>
							</Box>
						</Stack>
					</CardContent>
				</Card>

				<Card sx={{ 
					borderRadius: 3,
					bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
					border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
					boxShadow: (theme) => theme.palette.mode === 'dark' 
						? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
						: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
					backdropFilter: 'blur(10px)',
					background: (theme) => theme.palette.mode === 'dark' 
						? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))'
						: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9))'
				}}>
					<CardContent>
						<Stack direction="row" alignItems="center" spacing={2}>
							<CalendarIcon sx={{ 
								color: (theme) => theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706' 
							}} />
							<Box>
								<Typography variant="body2" sx={{ 
									color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)'
								}}>
									Last Heartbeat
								</Typography>
								<Typography variant="body1" sx={{ fontWeight: 600 }}>
									{container.lastHeartbeat}
								</Typography>
							</Box>
						</Stack>
					</CardContent>
				</Card>
			</Box>				<Divider sx={{ 
					my: 3,
					borderColor: (theme) => theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'
				}} />

			{/* Additional Details */}
			<Box sx={{ mb: 3 }}>
				<Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
					Technical Details
				</Typography>
				<Box sx={{ 
					display: 'grid', 
					gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, 
					gap: 2 
				}}>
					<Box sx={{ 
						p: 2, 
						bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc', 
						borderRadius: 3,
						border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
					}}>
						<Typography variant="body2" sx={{ 
							color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)',
							mb: 1
						}}>
							Version
						</Typography>
						<Typography variant="body1" sx={{ fontWeight: 600 }}>
							{container.version}
						</Typography>
					</Box>
					<Box sx={{ 
						p: 2, 
						bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc', 
						borderRadius: 3,
						border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
					}}>
						<Typography variant="body2" sx={{ 
							color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)',
							mb: 1
						}}>
							Kafka Connection
						</Typography>
						<Typography variant="body1" sx={{ fontWeight: 600, wordBreak: 'break-all' }}>
							{container.kafkaConnection}
						</Typography>
					</Box>
				</Box>
			</Box>

				<Divider sx={{ 
					my: 3,
					borderColor: (theme) => theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'
				}} />

				{/* JSON Response Section */}
				<Box>
					<Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
						JSON Response
					</Typography>
					<Card sx={{ 
						borderRadius: 3,
						bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
						border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
						boxShadow: (theme) => theme.palette.mode === 'dark' 
							? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
							: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
						backdropFilter: 'blur(10px)',
						background: (theme) => theme.palette.mode === 'dark' 
							? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))'
							: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9))'
					}}>
						<CardContent>
							<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
								<Typography variant="body2" sx={{ 
									color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)',
									fontWeight: 600
								}}>
									Complete Container Data
								</Typography>
								<IconButton
									size="small"
									onClick={() => copyToClipboard(JSON.stringify(container, null, 2))}
									sx={{
										color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
										'&:hover': {
											backgroundColor: (theme) => theme.palette.mode === 'dark' 
												? 'rgba(96, 165, 250, 0.1)'
												: 'rgba(59, 130, 246, 0.1)'
										}
									}}
								>
									<ContentCopyIcon fontSize="small" />
								</IconButton>
							</Stack>
							<Box sx={{ 
								p: 2, 
								bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
								borderRadius: 2,
								border: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
								maxHeight: 400,
								overflowY: 'auto',
								overflowX: 'auto'
							}}>
								<pre style={{
									margin: 0,
									fontFamily: 'Consolas, Monaco, "Courier New", monospace',
									fontSize: '0.875rem',
									lineHeight: '1.5',
									color: 'inherit',
									whiteSpace: 'pre-wrap',
									wordBreak: 'break-word'
								}}>
									{JSON.stringify(container, null, 2)}
								</pre>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</DialogContent>

			<DialogActions sx={{ 
				p: 3, 
				backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
				borderTop: (theme) => theme.palette.mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
				justifyContent: 'flex-end'
			}}>
				<Button
					onClick={onClose}
					variant="contained"
					sx={{
						backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#3b82f6' : '#3b82f6',
						color: '#ffffff',
						'&:hover': {
							backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2563eb' : '#2563eb'
						}
					}}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
