import {
	Card,
	CardContent,
	TextField,
	InputAdornment,
	Button,
	ButtonGroup,
	Typography,
	Box,
	Stack,
	IconButton,
	Chip,
	Switch,
	FormControlLabel,
	Select,
	MenuItem,
	FormControl,
	Tooltip,
	Divider
} from '@mui/material';
import { 
	Search as SearchIcon, 
	Close as CloseIcon, 
	Refresh as RefreshIcon,
	PlayArrow as PlayIcon,
	Pause as PauseIcon,
	Schedule as ScheduleIcon,
	FileDownload as ExportIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Enhanced Search Component with full-width luxury design
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.spacing(2), // Slightly less rounded for wider feel
	backgroundColor: theme.palette.mode === 'dark' 
		? 'rgba(255, 255, 255, 0.12)'
		: 'rgba(30, 41, 59, 0.08)',
	backdropFilter: 'blur(20px)', // Enhanced glass effect
	border: `1px solid ${theme.palette.mode === 'dark' 
		? 'rgba(255, 255, 255, 0.2)'
		: 'rgba(30, 41, 59, 0.2)'}`,
	boxShadow: theme.palette.mode === 'dark'
		? '0 4px 16px rgba(0, 0, 0, 0.2)'
		: '0 4px 16px rgba(0, 0, 0, 0.1)',
	'&:hover': {
		backgroundColor: theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, 0.18)'
			: 'rgba(30, 41, 59, 0.12)',
		borderColor: theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, 0.3)'
			: 'rgba(30, 41, 59, 0.3)',
		transform: 'translateY(-1px)',
		boxShadow: theme.palette.mode === 'dark'
			? '0 6px 20px rgba(0, 0, 0, 0.25)'
			: '0 6px 20px rgba(0, 0, 0, 0.15)'
	},
	'&:focus-within': {
		backgroundColor: theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, 0.2)'
			: 'rgba(30, 41, 59, 0.15)',
		borderColor: theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, 0.4)'
			: 'rgba(59, 130, 246, 0.5)',
		boxShadow: theme.palette.mode === 'dark'
			? '0 0 0 3px rgba(255, 255, 255, 0.1)'
			: '0 0 0 3px rgba(59, 130, 246, 0.1)'
	},
	width: '100%', // Full width by default
	transition: theme.transitions.create(['background-color', 'border-color', 'transform', 'box-shadow'], {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.easeInOut
	})
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2.5),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: theme.palette.mode === 'dark' 
		? 'rgba(255, 255, 255, 0.7)'
		: 'rgba(30, 41, 59, 0.7)',
	fontSize: '1.25rem' // Slightly larger for better visibility
}));

const StyledSearchInput = styled('input')(({ theme }) => ({
	color: theme.palette.mode === 'dark' ? 'white' : '#1e293b',
	fontWeight: 400,
	fontSize: '0.95rem',
	border: 'none',
	outline: 'none',
	background: 'transparent',
	padding: theme.spacing(1.5, 1.5, 1.5, 0),
	paddingLeft: `calc(1em + ${theme.spacing(5)})`, // More space for icon
	width: '100%',
	fontFamily: theme.typography.fontFamily,
	'&::placeholder': {
		color: theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, 0.6)'
			: 'rgba(30, 41, 59, 0.6)',
		fontWeight: 300
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '1rem'
	}
}));

interface ContainerFiltersProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	statusFilter: string;
	setStatusFilter: (filter: string) => void;
	filteredDataLength: number;
	totalDataLength: number;
	// Auto refresh props
	isAutoRefreshEnabled: boolean;
	setIsAutoRefreshEnabled: (enabled: boolean) => void;
	refreshInterval: number;
	setRefreshInterval: (interval: number) => void;
	onManualRefresh: () => void;
	isRefreshing: boolean;
	lastRefreshTime?: Date;
	onExportCSV: () => void;
}

export default function ContainerFilters({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter,
	filteredDataLength,
	totalDataLength,
	// Auto refresh props
	isAutoRefreshEnabled,
	setIsAutoRefreshEnabled,
	refreshInterval,
	setRefreshInterval,
	onManualRefresh,
	isRefreshing,
	lastRefreshTime,
	onExportCSV
}: ContainerFiltersProps) {
	const formatLastRefreshTime = () => {
		if (!lastRefreshTime) return 'Never';
		const now = new Date();
		const diff = Math.floor((now.getTime() - lastRefreshTime.getTime()) / 1000);
		
		if (diff < 60) return `${diff}s ago`;
		if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
		return lastRefreshTime.toLocaleTimeString();
	};
	return (
		<Card sx={{ 
			mb: 3, 
			borderRadius: 3,
			bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
			border: (theme) => theme.palette.mode === 'dark' ? '1px solid' : '1px solid',
			borderColor: (theme) => theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
			boxShadow: (theme) => theme.palette.mode === 'dark' 
				? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
				: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			backdropFilter: 'blur(10px)',
			background: (theme) => theme.palette.mode === 'dark' 
				? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))'
				: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))'
		}}>
			<CardContent sx={{ px: 3, py: 2 }}>
								 <Stack spacing={3}>
									{/* Top bar removed, Export CSV will be placed in filter summary below */}
					{/* Enhanced Search Section with full-width layout */}
					<Box>
						<Typography 
							variant="subtitle2" 
							sx={{ 
								mb: 2,
								color: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.9)'
									: 'rgba(30, 41, 59, 0.9)',
								fontWeight: 600,
								fontSize: '1rem'
							}}
						>
							🔍 Search & Filter Containers
						</Typography>
						
						{/* Full-width search with enhanced layout */}
						<Box sx={{ 
							display: 'flex', 
							flexDirection: { xs: 'column', md: 'row' },
							gap: 2,
							alignItems: { xs: 'stretch', md: 'center' }
						}}>
							{/* Enhanced search input - takes most space */}
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Search>
									<SearchIconWrapper>
										<SearchIcon />
									</SearchIconWrapper>
									<StyledSearchInput
										placeholder="Search by name, status, version, kafka connection, or any container details..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
									{/* Clear button when there's text */}
									{searchTerm && (
										<IconButton
											size="small"
											onClick={() => setSearchTerm('')}
											sx={{
												position: 'absolute',
												right: 8,
												top: '50%',
												transform: 'translateY(-50%)',
												color: (theme) => theme.palette.mode === 'dark'
													? 'rgba(255, 255, 255, 0.7)'
													: 'rgba(30, 41, 59, 0.7)',
												'&:hover': {
													color: (theme) => theme.palette.mode === 'dark'
														? 'white'
														: '#1e293b',
													backgroundColor: (theme) => theme.palette.mode === 'dark'
														? 'rgba(255, 255, 255, 0.1)'
														: 'rgba(30, 41, 59, 0.1)'
												}
											}}
										>
											<CloseIcon sx={{ fontSize: '1rem' }} />
										</IconButton>
									)}
								</Search>
							</Box>

							{/* Quick stats display */}
							<Box sx={{ 
								display: 'flex',
								alignItems: 'center',
								gap: 2,
								flexShrink: 0,
								px: { xs: 0, md: 2 },
								py: { xs: 1, md: 0 },
								borderLeft: { xs: 'none', md: '1px solid' },
								borderTop: { xs: '1px solid', md: 'none' },
								borderColor: (theme) => theme.palette.mode === 'dark' 
									? 'rgba(255, 255, 255, 0.1)'
									: 'rgba(30, 41, 59, 0.1)',
								minWidth: { xs: 'auto', md: '200px' }
							}}>
								<Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
									<Typography 
										variant="body2" 
										sx={{ 
											color: (theme) => theme.palette.mode === 'dark' 
												? 'rgba(255, 255, 255, 0.9)'
												: 'rgba(30, 41, 59, 0.9)',
											fontWeight: 600,
											lineHeight: 1.2
										}}
									>
										{filteredDataLength} / {totalDataLength}
									</Typography>
									<Typography 
										variant="caption" 
										sx={{ 
											color: (theme) => theme.palette.mode === 'dark' 
												? 'rgba(255, 255, 255, 0.7)'
												: 'rgba(30, 41, 59, 0.7)',
											display: 'block',
											lineHeight: 1.2
										}}
									>
										containers found
									</Typography>
								</Box>
								
								{searchTerm && (
									<Box sx={{ 
										backgroundColor: (theme) => theme.palette.mode === 'dark'
											? 'rgba(59, 130, 246, 0.2)'
											: 'rgba(59, 130, 246, 0.1)',
										color: (theme) => theme.palette.mode === 'dark'
											? '#60a5fa'
											: '#3b82f6',
										px: 1.5,
										py: 0.5,
										borderRadius: 2,
										border: '1px solid',
										borderColor: (theme) => theme.palette.mode === 'dark'
											? 'rgba(59, 130, 246, 0.3)'
											: 'rgba(59, 130, 246, 0.2)'
									}}>
										<Typography variant="caption" sx={{ fontWeight: 500 }}>
											Filtered
										</Typography>
									</Box>
								)}
							</Box>
						</Box>
					</Box>

					{/* Auto Refresh Section */}
					<Box sx={{ 
						borderTop: '1px solid',
						borderBottom: '1px solid',
						borderColor: (theme) => theme.palette.mode === 'dark' 
							? 'rgba(255, 255, 255, 0.1)'
							: 'rgba(30, 41, 59, 0.1)',
						py: 2
					}}>
						<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
							{/* Auto Refresh Toggle Section */}
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
								<Typography 
									variant="subtitle2" 
									sx={{ 
										color: (theme) => theme.palette.mode === 'dark' 
											? 'rgba(255, 255, 255, 0.9)'
											: 'rgba(30, 41, 59, 0.9)',
										fontWeight: 600,
										display: 'flex',
										alignItems: 'center',
										gap: 1
									}}
								>
									<ScheduleIcon sx={{ fontSize: '1.1rem' }} />
									Auto Refresh
								</Typography>
								
								<FormControlLabel
									control={
										<Switch
											checked={isAutoRefreshEnabled}
											onChange={(e) => setIsAutoRefreshEnabled(e.target.checked)}
											size="small"
											sx={{
												'& .MuiSwitch-switchBase.Mui-checked': {
													color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
													'&:hover': {
														backgroundColor: (theme) => theme.palette.mode === 'dark' 
															? 'rgba(96, 165, 250, 0.04)' 
															: 'rgba(59, 130, 246, 0.04)',
													},
												},
												'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
													backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#3b82f6' : '#60a5fa',
												},
											}}
										/>
									}
									label={
										<Typography variant="body2" sx={{ 
											color: (theme) => theme.palette.mode === 'dark' 
												? 'rgba(255, 255, 255, 0.8)'
												: 'rgba(30, 41, 59, 0.8)',
											fontWeight: 500
										}}>
											{isAutoRefreshEnabled ? 'ON' : 'OFF'}
										</Typography>
									}
									sx={{ margin: 0 }}
								/>

								{/* Interval Selector */}
								{isAutoRefreshEnabled && (
									<FormControl size="small" sx={{ minWidth: 100 }}>
										<Select
											value={refreshInterval}
											onChange={(e) => setRefreshInterval(Number(e.target.value))}
											sx={{
												color: (theme) => theme.palette.mode === 'dark' 
													? 'rgba(255, 255, 255, 0.9)'
													: 'rgba(30, 41, 59, 0.9)',
												'& .MuiOutlinedInput-notchedOutline': {
													borderColor: (theme) => theme.palette.mode === 'dark' 
														? 'rgba(255, 255, 255, 0.3)'
														: 'rgba(30, 41, 59, 0.3)',
												},
												'&:hover .MuiOutlinedInput-notchedOutline': {
													borderColor: (theme) => theme.palette.mode === 'dark' 
														? 'rgba(255, 255, 255, 0.6)'
														: 'rgba(30, 41, 59, 0.6)',
												},
												'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
													borderColor: (theme) => theme.palette.mode === 'dark' 
														? '#60a5fa'
														: '#3b82f6',
												},
												'& .MuiSelect-icon': {
													color: (theme) => theme.palette.mode === 'dark' 
														? 'rgba(255, 255, 255, 0.7)'
														: 'rgba(30, 41, 59, 0.7)',
												}
											}}
										>
											<MenuItem value={5}>5s</MenuItem>
											<MenuItem value={10}>10s</MenuItem>
											<MenuItem value={30}>30s</MenuItem>
											<MenuItem value={60}>1m</MenuItem>
										</Select>
									</FormControl>
								)}

								{/* Status Indicator */}
								<Chip
									icon={isAutoRefreshEnabled ? 
										(isRefreshing ? <RefreshIcon sx={{ fontSize: '0.9rem', animation: 'spin 1s linear infinite' }} /> : <PlayIcon sx={{ fontSize: '0.9rem' }} />) : 
										<PauseIcon sx={{ fontSize: '0.9rem' }} />
									}
									label={isAutoRefreshEnabled ? 
										(isRefreshing ? 'Refreshing...' : `Every ${refreshInterval}s`) : 
										'Paused'
									}
									size="small"
									sx={{
										backgroundColor: isAutoRefreshEnabled ? 
											(isRefreshing ? 
												(theme) => theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)' :
												(theme) => theme.palette.mode === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'
											) :
											(theme) => theme.palette.mode === 'dark' ? 'rgba(100, 116, 139, 0.2)' : 'rgba(148, 163, 184, 0.1)',
										color: isAutoRefreshEnabled ? 
											(isRefreshing ? 
												(theme) => theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706' :
												(theme) => theme.palette.mode === 'dark' ? '#10b981' : '#059669'
											) :
											(theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(107, 114, 128, 0.8)',
										border: '1px solid',
										borderColor: isAutoRefreshEnabled ? 
											(isRefreshing ? 
												(theme) => theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.2)' :
												(theme) => theme.palette.mode === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'
											) :
											(theme) => theme.palette.mode === 'dark' ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.2)',
										fontWeight: 500
									}}
								/>
							</Box>

							  {/* Manual Refresh, Last Update, and Total Containers */}
							  <Box sx={{ 
								  display: 'flex', 
								  alignItems: 'center', 
								  gap: 2,
								  flexShrink: 0,
								  pl: { xs: 0, md: 2 },
								  borderLeft: { xs: 'none', md: '1px solid' },
								  borderTop: { xs: '1px solid', md: 'none' },
								  borderColor: (theme) => theme.palette.mode === 'dark' 
									  ? 'rgba(255, 255, 255, 0.1)'
									  : 'rgba(30, 41, 59, 0.1)',
								  pt: { xs: 2, md: 0 }
							  }}>
								  {/* Last Refresh Time and Total Containers */}
								  <Box sx={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 2 }}>
									  <Typography 
										  variant="caption" 
										  sx={{ 
											  color: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.6)'
												  : 'rgba(30, 41, 59, 0.6)',
											  display: 'block',
											  lineHeight: 1.2
										  }}
									  >
										  Last update:
									  </Typography>
									  <Typography 
										  variant="body2" 
										  sx={{ 
											  color: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.9)'
												  : 'rgba(30, 41, 59, 0.9)',
											  fontWeight: 500,
											  lineHeight: 1.2
										  }}
									  >
										  {formatLastRefreshTime()}
									  </Typography>
									  {/* Total containers info here */}
									  <Typography 
										  variant="body2" 
										  sx={{ 
											  color: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.8)'
												  : 'rgba(30, 41, 59, 0.8)',
											  fontWeight: 500,
											  ml: 2
										  }}
									  >
										  📊 Total: {filteredDataLength} containers{statusFilter !== 'all' && ` (${statusFilter})`}
									  </Typography>
								  </Box>

								  {/* Manual Refresh Button */}
								  <Tooltip title="Manual refresh" arrow>
									  <IconButton
										  onClick={onManualRefresh}
										  disabled={isRefreshing}
										  sx={{
											  color: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.8)'
												  : 'rgba(30, 41, 59, 0.8)',
											  backgroundColor: (theme) => theme.palette.mode === 'dark'
												  ? 'rgba(255, 255, 255, 0.05)'
												  : 'rgba(30, 41, 59, 0.05)',
											  border: '1px solid',
											  borderColor: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.2)'
												  : 'rgba(30, 41, 59, 0.2)',
											  '&:hover': {
												  backgroundColor: (theme) => theme.palette.mode === 'dark'
													  ? 'rgba(255, 255, 255, 0.1)'
													  : 'rgba(30, 41, 59, 0.1)',
												  borderColor: (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.4)'
													  : 'rgba(30, 41, 59, 0.4)',
												  color: (theme) => theme.palette.mode === 'dark' 
													  ? 'white'
													  : '#1e293b'
											  },
											  '&.Mui-disabled': {
												  color: (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.3)'
													  : 'rgba(30, 41, 59, 0.3)',
												  borderColor: (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.1)'
													  : 'rgba(30, 41, 59, 0.1)'
											  }
										  }}
									  >
										  <RefreshIcon 
											  sx={{ 
												  fontSize: '1.2rem',
												  animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
											  }} 
										  />
									  </IconButton>
								  </Tooltip>
							  </Box>
						</Stack>

						{/* Global CSS for spin animation */}
						<Box
							component="style"
							sx={{
								'@keyframes spin': {
									from: { transform: 'rotate(0deg)' },
									to: { transform: 'rotate(360deg)' }
								}
							}}
						/>
					</Box>

					  {/* Enhanced Filters Section with improved layout */}
					  <Box sx={{ pt: 2 }}>
						  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between">
							  {/* Status Filter Buttons */}
							  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
								  <Typography 
									  variant="subtitle2" 
									  sx={{ 
										  color: (theme) => theme.palette.mode === 'dark' 
											  ? 'rgba(255, 255, 255, 0.9)'
											  : 'rgba(30, 41, 59, 0.9)',
										  fontWeight: 600,
										  mr: 1,
										  minWidth: 'fit-content'
									  }}
								  >
									  Status:
								  </Typography>
								  <ButtonGroup variant="outlined" size="small" sx={{ flexWrap: 'wrap' }}>
									  <Button
										  onClick={() => setStatusFilter('all')}
										  variant={statusFilter === 'all' ? 'contained' : 'outlined'}
										  sx={{
											  minWidth: '60px',
											  color: (theme) => statusFilter === 'all' 
												  ? (theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff')
												  : (theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'),
											  borderColor: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.3)'
												  : 'rgba(30, 41, 59, 0.3)',
											  '&:hover': {
												  borderColor: (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.6)'
													  : 'rgba(30, 41, 59, 0.6)',
												  backgroundColor: statusFilter !== 'all' ? (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.1)'
													  : 'rgba(30, 41, 59, 0.1)' : undefined
											  },
											  '&.MuiButton-contained': {
												  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#3b82f6',
												  color: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
												  '&:hover': {
													  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#2563eb'
												  }
											  }
										  }}
									  >
										  All
									  </Button>
									  <Button
										  onClick={() => setStatusFilter('connected')}
										  variant={statusFilter === 'connected' ? 'contained' : 'outlined'}
										  sx={{
											  minWidth: '80px',
											  color: (theme) => statusFilter === 'connected' 
												  ? (theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff')
												  : (theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'),
											  borderColor: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.3)'
												  : 'rgba(30, 41, 59, 0.3)',
											  '&:hover': {
												  borderColor: (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.6)'
													  : 'rgba(30, 41, 59, 0.6)',
												  backgroundColor: statusFilter !== 'connected' ? (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.1)'
													  : 'rgba(30, 41, 59, 0.1)' : undefined
											  },
											  '&.MuiButton-contained': {
												  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#10b981',
												  color: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
												  '&:hover': {
													  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#059669'
												  }
											  }
										  }}
									  >
										  Connected
									  </Button>
									  <Button
										  onClick={() => setStatusFilter('ok')}
										  variant={statusFilter === 'ok' ? 'contained' : 'outlined'}
										  sx={{
											  minWidth: '70px',
											  color: (theme) => statusFilter === 'ok' 
												  ? (theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff')
												  : (theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'),
											  borderColor: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.3)'
												  : 'rgba(30, 41, 59, 0.3)',
											  '&:hover': {
												  borderColor: (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.6)'
													  : 'rgba(30, 41, 59, 0.6)',
												  backgroundColor: statusFilter !== 'ok' ? (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.1)'
													  : 'rgba(30, 41, 59, 0.1)' : undefined
											  },
											  '&.MuiButton-contained': {
												  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#10b981',
												  color: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
												  '&:hover': {
													  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#059669'
												  }
											  }
										  }}
									  >
										  Healthy
									  </Button>
									  <Button
										  onClick={() => setStatusFilter('failed')}
										  variant={statusFilter === 'failed' ? 'contained' : 'outlined'}
										  sx={{
											  minWidth: '60px',
											  color: (theme) => statusFilter === 'failed' 
												  ? (theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff')
												  : (theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'),
											  borderColor: (theme) => theme.palette.mode === 'dark' 
												  ? 'rgba(255, 255, 255, 0.3)'
												  : 'rgba(30, 41, 59, 0.3)',
											  '&:hover': {
												  borderColor: (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.6)'
													  : 'rgba(30, 41, 59, 0.6)',
												  backgroundColor: statusFilter !== 'failed' ? (theme) => theme.palette.mode === 'dark' 
													  ? 'rgba(255, 255, 255, 0.1)'
													  : 'rgba(30, 41, 59, 0.1)' : undefined
											  },
											  '&.MuiButton-contained': {
												  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#ef4444',
												  color: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
												  '&:hover': {
													  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#dc2626'
												  }
											  }
										  }}
									  >
										  Failed
									  </Button>
								  </ButtonGroup>
							  </Box>

							  {/* Export CSV button next to status filter */}
							  <Button
								  variant="outlined"
								  startIcon={<ExportIcon />}
								  onClick={onExportCSV}
								  sx={{
									  color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b',
									  borderColor: (theme) => theme.palette.mode === 'dark' 
										  ? 'rgba(255, 255, 255, 0.3)'
										  : 'rgba(30, 41, 59, 0.3)',
									  '&:hover': {
										  borderColor: (theme) => theme.palette.mode === 'dark' 
											  ? 'rgba(255, 255, 255, 0.6)'
											  : 'rgba(30, 41, 59, 0.6)',
										  backgroundColor: (theme) => theme.palette.mode === 'dark' 
											  ? 'rgba(255, 255, 255, 0.1)' 
											  : 'rgba(30, 41, 59, 0.1)'
									  }
								  }}
							  >
								  Export CSV
							  </Button>
						  </Stack>
					  </Box>
				</Stack>
			</CardContent>
		</Card>
	);
}