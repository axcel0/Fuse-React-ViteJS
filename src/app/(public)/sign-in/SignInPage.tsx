import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CardContent from '@mui/material/CardContent';
import { useTheme, useMediaQuery, Container, Card, Chip, IconButton, Grid } from '@mui/material';
import { Brightness4, Brightness7, LoginRounded, ArrowForward } from '@mui/icons-material';
import _ from 'lodash';
import { lighten, alpha } from '@mui/material/styles';
import { useTheme as useTailwindTheme } from 'src/hooks/useTheme';
import JwtSignInTab from './tabs/JwtSignInTab';
import FirebaseSignInTab from './tabs/FirebaseSignInTab';
import AwsSignInTab from './tabs/AwsSignInTab';

const tabs = [
	{
		id: 'jwt',
		title: 'JWT',
		logo: '/assets/images/logo/jwt.svg',
		logoClass: 'h-9 p-1 bg-black rounded-lg'
	},
	{
		id: 'firebase',
		title: 'Firebase',
		logo: '/assets/images/logo/firebase.svg',
		logoClass: 'h-9'
	},
	{
		id: 'aws',
		title: 'AWS',
		logo: '/assets/images/logo/aws-amplify.svg',
		logoClass: 'h-9'
	}
];

/**
 * The sign in page with responsive design, dark mode support, and modern UI.
 * Implements Material Design principles with excellent ergonomics and accessibility.
 * Auto-detects system theme preferences for seamless dark/light mode switching.
 */
function SignInPage() {
	const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
	const theme = useTheme();
	const { effectiveTheme, isDark } = useTailwindTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

	function handleSelectTab(id: string) {
		setSelectedTabId(id);
	}

	return (
		<Box
			className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
			sx={{
				position: 'relative',
				overflow: 'hidden'
			}}
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10 dark:opacity-5">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.4%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23111827%27 fill-opacity=%270.3%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
			</div>

			<Container maxWidth="xl" className="relative z-10">
				<Grid container spacing={0} sx={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
					{/* Left Side - Sign In Form */}
					<Grid size={{ xs: 12, md: 6, lg: 5 }}>
						<Box
							className="flex flex-col items-center justify-center min-h-screen md:min-h-0 p-6"
						>
							<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
								{/* Header Section */}
								<div className="text-center pt-8 pb-6 px-6">
									{/* Logo */}
									<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-6 shadow-lg">
										<LoginRounded 
											sx={{ 
												fontSize: 40, 
												color: 'white',
											}} 
										/>
									</div>

									{/* Title */}
									<h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
										Welcome Back
									</h1>

									{/* Subtitle */}
									<p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-4">
										Sign in to continue to your dashboard
									</p>

									{/* Sign Up Link */}
									<div className="flex items-center justify-center gap-2 text-sm">
										<span className="text-gray-500 dark:text-gray-400">
											Don't have an account?
										</span>
										<Link
											to="/sign-up"
											className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors duration-200"
										>
											Sign up
											<ArrowForward sx={{ fontSize: 16 }} />
										</Link>
									</div>
								</div>

								<div className="px-6 pb-8">
									{/* Demo Info Banner */}
									<div className="mb-6 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
										<p className="text-blue-700 dark:text-blue-300 text-center font-medium text-sm">
											🚀 You are browsing <strong>Fuse React Demo</strong>. Click "Sign in" to access the Demo and Documentation.
										</p>
									</div>

									{/* Authentication Method Tabs */}
									<div className="mb-6">
										<p className="text-gray-600 dark:text-gray-400 text-center font-medium mb-4 text-sm">
											Choose your authentication method
										</p>
										
										<Tabs
											value={_.findIndex(tabs, { id: selectedTabId })}
											variant="fullWidth"
											className="bg-gray-50 dark:bg-gray-700 rounded-xl"
											sx={{
												minHeight: 48,
												'& .MuiTabs-indicator': {
													height: 3,
													borderRadius: 1.5,
													background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
												},
												'& .MuiTab-root': {
													textTransform: 'none',
													fontWeight: 600,
													fontSize: '0.875rem',
													minHeight: 48,
													transition: 'all 0.2s ease-in-out',
													color: isDark ? '#E5E7EB' : '#6B7280',
													'&:hover': {
														backgroundColor: alpha(theme.palette.primary.main, 0.04),
														color: isDark ? '#F3F4F6' : '#374151',
													},
													'&.Mui-selected': {
														color: theme.palette.primary.main,
													}
												}
											}}
										>
											{tabs.map((item) => (
												<Tab
													disableRipple
													onClick={() => handleSelectTab(item.id)}
													key={item.id}
													icon={
														<div className={`flex items-center justify-center w-8 h-8 rounded-lg mb-1 transition-all duration-200 ${
															selectedTabId === item.id 
																? 'bg-blue-100 dark:bg-blue-900/30' 
																: 'bg-transparent'
														}`}>
															<img
																src={item.logo}
																alt={item.title}
																className={`w-6 h-6 transition-all duration-200 ${
																	selectedTabId === item.id 
																		? 'filter-none' 
																		: isDark 
																			? 'brightness-75' 
																			: 'brightness-50'
																}`}
															/>
														</div>
													}
													label={item.title}
													iconPosition="top"
												/>
											))}
										</Tabs>
									</div>

									{/* Form Content */}
									<div className="relative">
										{selectedTabId === 'jwt' && <JwtSignInTab />}
										{selectedTabId === 'firebase' && <FirebaseSignInTab />}
										{selectedTabId === 'aws' && <AwsSignInTab />}
									</div>
								</div>
							</div>
						</Box>
					</Grid>

					{/* Right Side - Welcome Section */}
					<Grid size={{ xs: 12, md: 6, lg: 7 }}>
						<div className="hidden md:flex flex-col items-center justify-center min-h-screen p-8 text-center relative">
							{/* Decorative Elements */}
							<div className="absolute top-[10%] right-[10%] w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-2xl"></div>
							<div className="absolute bottom-[20%] left-[15%] w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div>

							{/* Main Content */}
							<div className="relative z-10 max-w-2xl">
								{/* Welcome Text */}
								<h2 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
									<span className="text-gray-900 dark:text-white">Welcome to our</span>
									<br />
									<span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
										Community
									</span>
								</h2>

								{/* Description */}
								<p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
									Fuse helps developers build organized and well-coded dashboards full of beautiful and rich modules. Join us and start building your application today.
								</p>

								{/* Community Stats */}
								<div className="mb-8">
									<div className="flex items-center justify-center gap-4 mb-4">
										<AvatarGroup
											max={5}
											sx={{
												'& .MuiAvatar-root': {
													borderColor: isDark ? '#374151' : 'white',
													borderWidth: 3,
													width: { md: 56, lg: 64 },
													height: { md: 56, lg: 64 },
													boxShadow: isDark 
														? '0 8px 32px rgba(0,0,0,0.5)' 
														: '0 8px 32px rgba(0,0,0,0.15)',
												}
											}}
										>
											<Avatar src="/assets/images/avatars/female-18.jpg" />
											<Avatar src="/assets/images/avatars/female-11.jpg" />
											<Avatar src="/assets/images/avatars/male-09.jpg" />
											<Avatar src="/assets/images/avatars/male-16.jpg" />
											<Avatar 
												className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold"
											>
												+
											</Avatar>
										</AvatarGroup>
									</div>

									<p className="text-xl text-gray-700 dark:text-gray-200 font-semibold">
										More than <strong className="text-blue-600 dark:text-blue-400">17k+ developers</strong> joined us, it's your turn
									</p>
								</div>

								{/* Feature Chips */}
								<div className="flex gap-3 justify-center flex-wrap">
									{['Modern UI', 'Dark Mode', 'Responsive', 'TypeScript'].map((feature) => (
										<span
											key={feature}
											className="px-4 py-2 bg-white/20 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-semibold text-sm rounded-full border border-gray-300/30 dark:border-gray-600/30 backdrop-blur-sm transition-all duration-200 hover:bg-white/30 dark:hover:bg-gray-700/50"
										>
											{feature}
										</span>
									))}
								</div>
							</div>
						</div>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default SignInPage;
