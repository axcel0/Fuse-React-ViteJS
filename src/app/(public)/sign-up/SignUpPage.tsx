import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import _ from 'lodash';
import { useTheme } from '../../../hooks/useTheme';
import JwtSignUpTab from './tabs/JwSignUpTab';
import FirebaseSignUpTab from './tabs/FirebaseSignUpTab';
import AwsSignUpTab from './tabs/AwsSignUpTab';

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
 * The sign up page with responsive design, dark mode support, and modern UI.
 * Implements Material Design principles with excellent ergonomics and accessibility.
 */
function SignUpPage() {
	const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
	const { isDark } = useTheme();

	function handleSelectTab(id: string) {
		setSelectedTabId(id);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
			<div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
				{/* Left Panel - Sign Up Form */}
				<Paper 
					className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300"
					elevation={0}
				>
					<div className="p-8 lg:p-12">
						{/* Logo */}
						<div className="flex justify-center lg:justify-start mb-8">
							<img
								className="h-10 w-auto transition-transform duration-300 hover:scale-105"
								src="/assets/images/logo/logo.svg"
								alt="Fuse Logo"
							/>
						</div>

						{/* Header */}
						<div className="text-center lg:text-left mb-8">
							<Typography 
								variant="h3" 
								className="text-gray-900 dark:text-gray-100 font-bold mb-3 transition-colors duration-300"
							>
								Create Account
							</Typography>
							<div className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
								<Typography className="inline">Already have an account?</Typography>
								<Link
									className="ml-2 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
									to="/sign-in"
								>
									Sign in here
								</Link>
							</div>
						</div>

						{/* Auth Provider Tabs */}
						<div className="mb-8">
							<Tabs
								value={_.findIndex(tabs, { id: selectedTabId })}
								variant="fullWidth"
								className="mb-6"
								classes={{
									indicator: 'hidden'
								}}
								sx={{
									'& .MuiTabs-flexContainer': {
										gap: 1,
									},
									'& .MuiTab-root': {
										borderRadius: 2,
										border: '1px solid',
										borderColor: isDark ? 'rgb(55 65 81)' : 'rgb(229 231 235)',
										backgroundColor: isDark ? 'rgb(31 41 55)' : 'rgb(249 250 251)',
										color: isDark ? 'rgb(156 163 175)' : 'rgb(107 114 128)',
										transition: 'all 0.2s',
										'&:hover': {
											backgroundColor: isDark ? 'rgb(55 65 81)' : 'rgb(243 244 246)',
										},
										'&.Mui-selected': {
											backgroundColor: isDark ? 'rgb(59 130 246)' : 'rgb(37 99 235)',
											borderColor: isDark ? 'rgb(59 130 246)' : 'rgb(37 99 235)',
											color: 'white',
											'&:hover': {
												backgroundColor: isDark ? 'rgb(29 78 216)' : 'rgb(29 78 216)',
											}
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
											<img
												className={`${item.logoClass} transition-all duration-200`}
												src={item.logo}
												alt={item.title}
											/>
										}
										label={item.title}
										className="min-h-[80px] text-sm font-medium"
									/>
								))}
							</Tabs>

							{/* Tab Content */}
							<div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 transition-colors duration-300">
								{selectedTabId === 'jwt' && <JwtSignUpTab />}
								{selectedTabId === 'firebase' && <FirebaseSignUpTab />}
								{selectedTabId === 'aws' && <AwsSignUpTab />}
							</div>
						</div>
					</div>
				</Paper>

				{/* Right Panel - Marketing Content */}
				<div className="hidden lg:block">
					<Box
						className="relative h-full min-h-[600px] flex flex-col justify-center overflow-hidden rounded-2xl p-12"
						sx={{ 
							background: isDark 
								? 'linear-gradient(135deg, rgb(30 41 59) 0%, rgb(15 23 42) 100%)'
								: 'linear-gradient(135deg, rgb(37 99 235) 0%, rgb(29 78 216) 100%)',
							color: 'white'
						}}
					>
						{/* Background Pattern */}
						<svg
							className="absolute inset-0 w-full h-full opacity-10"
							viewBox="0 0 960 540"
							preserveAspectRatio="xMidYMax slice"
							xmlns="http://www.w3.org/2000/svg"
						>
							<defs>
								<pattern
									id="hero-pattern"
									x="0"
									y="0"
									width="40"
									height="40"
									patternUnits="userSpaceOnUse"
								>
									<circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.5" />
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#hero-pattern)" />
						</svg>

						{/* Floating Elements */}
						<div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
						<div className="absolute bottom-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

						{/* Content */}
						<div className="relative z-10">
							<div className="mb-8">
								<Typography variant="h2" className="font-bold leading-tight mb-4">
									Join Our
									<br />
									<span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
										Innovation Hub
									</span>
								</Typography>
								<Typography variant="h6" className="text-white/90 leading-relaxed max-w-lg">
									Build incredible dashboards with our comprehensive toolkit. 
									Join thousands of developers creating amazing experiences.
								</Typography>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-3 gap-6 mb-8">
								<div className="text-center">
									<div className="text-2xl font-bold text-yellow-400 mb-1">50K+</div>
									<div className="text-sm text-white/80">Active Users</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-green-400 mb-1">99.9%</div>
									<div className="text-sm text-white/80">Uptime</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
									<div className="text-sm text-white/80">Support</div>
								</div>
							</div>

							{/* Community Avatars */}
							<div className="flex items-center gap-4">
								<AvatarGroup
									max={5}
									sx={{
										'& .MuiAvatar-root': {
											borderColor: 'white',
											borderWidth: 2,
											width: 48,
											height: 48
										}
									}}
								>
									<Avatar src="/assets/images/avatars/female-18.jpg" />
									<Avatar src="/assets/images/avatars/female-11.jpg" />
									<Avatar src="/assets/images/avatars/male-09.jpg" />
									<Avatar src="/assets/images/avatars/male-16.jpg" />
									<Avatar>+</Avatar>
								</AvatarGroup>
								<div className="flex flex-col">
									<div className="text-white font-semibold">Join 50,000+ developers</div>
									<div className="text-white/80 text-sm">Building the future together</div>
								</div>
							</div>
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;
