import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import clsx from 'clsx';
import { memo } from 'react';
import { useFooterTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { useTheme } from '../../../../theme/useTheme';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

type FooterLayout2Props = {
	className?: string;
};

/**
 * The footer layout 2 with modern design inspired by KOG JKI Immanuel
 */
function FooterLayout2(props: FooterLayout2Props) {
	const { className = '' } = props;
	const footerTheme = useFooterTheme();
	const { resolvedTheme } = useTheme();

	const isDark = resolvedTheme === 'dark';
	const bgColor = isDark ? '#1f2937' : '#f8fafc'; // gray-800 : gray-50
	const textColor = isDark ? '#f9fafb' : '#1f2937'; // gray-50 : gray-800
	const mutedTextColor = isDark ? '#9ca3af' : '#6b7280'; // gray-400 : gray-500
	
	// Polytron brand colors (red-orange gradient)
	const polytronPrimary = isDark ? '#ef4444' : '#dc2626'; // red-500 : red-600
	const polytronSecondary = isDark ? '#f97316' : '#ea580c'; // orange-500 : orange-600

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx('relative z-20 shadow-lg', className)}
				component="footer"
				position="static"
				elevation={0}
				sx={{ 
					backgroundColor: bgColor,
					color: textColor,
					borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` // gray-700 : gray-200
				}}
			>
				<Box className="container mx-auto">
					{/* Main Footer Content */}
					<Toolbar className="flex flex-col sm:flex-row justify-between items-start gap-8 py-8 px-4 sm:px-6">
						{/* Brand Section */}
						<Box className="flex flex-col items-start">
							<Box className="flex items-center gap-3 mb-4">
								{/* Polytron TV/Electronics Icon */}
								<Box 
									className="flex items-center justify-center w-12 h-12 rounded-lg"
									sx={{ 
										background: `linear-gradient(135deg, ${polytronPrimary}, ${polytronSecondary})`,
										color: 'white',
										boxShadow: isDark ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 4px 12px rgba(220, 38, 38, 0.3)'
									}}
								>
									<FuseSvgIcon size={24}>heroicons-outline:tv</FuseSvgIcon>
								</Box>
								<Box>
									<Typography 
										variant="h6" 
										className="font-bold text-lg"
										sx={{ color: textColor }}
									>
										Polytron
									</Typography>
									<Typography 
										variant="body2" 
										sx={{ color: mutedTextColor }}
									>
										Electronics & Technology
									</Typography>
								</Box>
							</Box>
							
							{/* Navigation Links */}
							<Box className="flex flex-col gap-2">
								<Button 
									size="small" 
									sx={{ 
										color: mutedTextColor, 
										justifyContent: 'flex-start',
										textTransform: 'none',
										'&:hover': { color: polytronPrimary }
									}}
								>
									Product Support
								</Button>
								<Button 
									size="small" 
									sx={{ 
										color: mutedTextColor, 
										justifyContent: 'flex-start',
										textTransform: 'none',
										'&:hover': { color: polytronPrimary }
									}}
								>
									Service Center
								</Button>
								<Button 
									size="small" 
									sx={{ 
										color: mutedTextColor, 
										justifyContent: 'flex-start',
										textTransform: 'none',
										'&:hover': { color: polytronPrimary }
									}}
								>
									Warranty Info
								</Button>
								<Button 
									size="small" 
									sx={{ 
										color: mutedTextColor, 
										justifyContent: 'flex-start',
										textTransform: 'none',
										'&:hover': { color: polytronPrimary }
									}}
								>
									Contact Us
								</Button>
							</Box>
						</Box>

						{/* Right Section - Social & Downloads */}
						<Box className="flex flex-col items-start sm:items-end">
							{/* Follow Section */}
							<Typography 
								variant="subtitle1" 
								className="font-semibold mb-4"
								sx={{ color: textColor }}
							>
								Connect with Polytron
							</Typography>
							
							{/* Social Icons */}
							<Box className="flex gap-2 mb-6">
								<IconButton 
									size="small"
									sx={{ 
										color: mutedTextColor,
										'&:hover': { 
											color: polytronPrimary,
											backgroundColor: isDark ? '#374151' : '#fee2e2'
										}
									}}
								>
									<FuseSvgIcon size={20}>heroicons-outline:globe-alt</FuseSvgIcon>
								</IconButton>
								<IconButton 
									size="small"
									sx={{ 
										color: mutedTextColor,
										'&:hover': { 
											color: polytronPrimary,
											backgroundColor: isDark ? '#374151' : '#fee2e2'
										}
									}}
								>
									<FuseSvgIcon size={20}>heroicons-outline:camera</FuseSvgIcon>
								</IconButton>
								<IconButton 
									size="small"
									sx={{ 
										color: mutedTextColor,
										'&:hover': { 
											color: polytronPrimary,
											backgroundColor: isDark ? '#374151' : '#fee2e2'
										}
									}}
								>
									<FuseSvgIcon size={20}>heroicons-outline:play</FuseSvgIcon>
								</IconButton>
								<IconButton 
									size="small"
									sx={{ 
										color: mutedTextColor,
										'&:hover': { 
											color: polytronPrimary,
											backgroundColor: isDark ? '#374151' : '#fee2e2'
										}
									}}
								>
									<FuseSvgIcon size={20}>heroicons-outline:chat-bubble-left-ellipsis</FuseSvgIcon>
								</IconButton>
							</Box>

							{/* Download Section */}
							<Typography 
								variant="body2" 
								className="mb-3"
								sx={{ color: mutedTextColor }}
							>
								Get Polytron Smart Apps
							</Typography>
							
							<Box className="flex gap-3">
								<Button
									variant="outlined"
									size="small"
									startIcon={<FuseSvgIcon size={16}>heroicons-outline:device-phone-mobile</FuseSvgIcon>}
									sx={{
										borderColor: polytronPrimary,
										color: polytronPrimary,
										textTransform: 'none',
										'&:hover': {
											borderColor: polytronSecondary,
											backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.05)',
											color: polytronSecondary
										}
									}}
								>
									Polytron Smart
								</Button>
								<Button
									variant="outlined"
									size="small"
									startIcon={<FuseSvgIcon size={16}>heroicons-outline:tv</FuseSvgIcon>}
									sx={{
										borderColor: polytronPrimary,
										color: polytronPrimary,
										textTransform: 'none',
										'&:hover': {
											borderColor: polytronSecondary,
											backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.05)',
											color: polytronSecondary
										}
									}}
								>
									Remote Control
								</Button>
							</Box>
						</Box>
					</Toolbar>

					{/* Divider */}
					<Divider sx={{ borderColor: isDark ? '#374151' : '#e5e7eb' }} />
					
					{/* Copyright Section */}
					<Box className="py-4 px-4 sm:px-6">
						<Typography 
							variant="body2" 
							align="center"
							sx={{ color: mutedTextColor }}
						>
							© 2025 Polytron | All Rights Reserved
						</Typography>
					</Box>
				</Box>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout2);
