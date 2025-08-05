import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import {
	Card,
	CardContent,
	Typography,
	Grid,
	Box,
	Avatar,
	Chip,
	LinearProgress,
	Button
} from '@mui/material';
import {
	TrendingUp,
	Group,
	Assessment,
	Notifications,
	Dashboard as DashboardIcon
} from '@mui/icons-material';
import useUser from '@auth/useUser';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {
		padding: theme.spacing(3)
	}
}));

const StatsCard = styled(Card)(({ theme }) => ({
	height: '100%',
	transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
	'&:hover': {
		transform: 'translateY(-4px)',
		boxShadow: theme.shadows[8]
	}
}));

function Dashboard() {
	const { t } = useTranslation('navigation');
	const user = useUser();

	const statsData = [
		{
			title: 'Total Users',
			value: '1,234',
			change: '+12%',
			icon: <Group />,
			color: 'primary'
		},
		{
			title: 'Active Sessions',
			value: '456',
			change: '+8%',
			icon: <TrendingUp />,
			color: 'success'
		},
		{
			title: 'Reports',
			value: '89',
			change: '+23%',
			icon: <Assessment />,
			color: 'info'
		},
		{
			title: 'Notifications',
			value: '12',
			change: '-5%',
			icon: <Notifications />,
			color: 'warning'
		}
	];

	return (
		<Root
			header={
				<Box className="flex items-center justify-between p-6">
					<Box className="flex items-center space-x-3">
						<DashboardIcon className="text-2xl text-blue-500" />
						<Typography variant="h4" className="font-bold">
							{t('DASHBOARD')}
						</Typography>
					</Box>
					<Chip 
						label={`Welcome, ${user.data?.displayName || 'User'}`} 
						color="primary" 
						variant="outlined"
					/>
				</Box>
			}
			content={
				<Box>
					{/* Welcome Section */}
					<Card className="mb-6">
						<CardContent>
							<Box className="flex items-center space-x-4">
								<Avatar 
									sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}
								>
									{user.data?.displayName?.charAt(0) || 'U'}
								</Avatar>
								<Box>
									<Typography variant="h5" className="font-semibold">
										Welcome back, {user.data?.displayName || 'User'}!
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Email: {user.data?.email}
									</Typography>
									<Box className="flex space-x-2 mt-2">
										{Array.isArray(user.data?.role) && user.data.role.map((role) => (
											<Chip 
												key={role}
												label={role} 
												size="small" 
												color="secondary"
											/>
										))}
									</Box>
								</Box>
							</Box>
						</CardContent>
					</Card>

					{/* Stats Cards */}
					<Grid container spacing={3} className="mb-6">
						{statsData.map((stat) => (
							<Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
								<StatsCard>
									<CardContent>
										<Box className="flex items-center justify-between">
											<Box>
												<Typography color="text.secondary" variant="body2">
													{stat.title}
												</Typography>
												<Typography variant="h4" className="font-bold">
													{stat.value}
												</Typography>
												<Chip 
													label={stat.change} 
													size="small" 
													color={stat.change.startsWith('+') ? 'success' : 'error'}
													variant="outlined"
												/>
											</Box>
											<Avatar 
												sx={{ 
													bgcolor: `${stat.color}.main`,
													width: 56,
													height: 56
												}}
											>
												{stat.icon}
											</Avatar>
										</Box>
									</CardContent>
								</StatsCard>
							</Grid>
						))}
					</Grid>

					{/* Quick Actions */}
					<Grid container spacing={3}>
						<Grid size={{ xs: 12, md: 8 }}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4 font-semibold">
										Quick Actions
									</Typography>
									<Grid container spacing={2}>
										<Grid size={{ xs: 12, sm: 6 }}>
											<Button
												variant="outlined"
												fullWidth
												startIcon={<Assessment />}
												href="/example"
												className="h-12"
											>
												View Example Page
											</Button>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4 font-semibold">
										System Status
									</Typography>
									<Box className="space-y-3">
										<Box>
											<Typography variant="body2" color="text.secondary">
												CPU Usage
											</Typography>
											<LinearProgress 
												variant="determinate" 
												value={65} 
												color="primary"
												className="mt-1"
											/>
											<Typography variant="caption">65%</Typography>
										</Box>
										<Box>
											<Typography variant="body2" color="text.secondary">
												Memory Usage
											</Typography>
											<LinearProgress 
												variant="determinate" 
												value={43} 
												color="success"
												className="mt-1"
											/>
											<Typography variant="caption">43%</Typography>
										</Box>
										<Box>
											<Typography variant="body2" color="text.secondary">
												Storage
											</Typography>
											<LinearProgress 
												variant="determinate" 
												value={78} 
												color="warning"
												className="mt-1"
											/>
											<Typography variant="caption">78%</Typography>
										</Box>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			}
		/>
	);
}

export default Dashboard;
