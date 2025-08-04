import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useTheme } from '@mui/material/styles';
import JwtSignInForm from '@auth/services/jwt/components/JwtSignInForm';

function jwtSignInTab() {
	const theme = useTheme();
	const isDark = theme.palette.mode === 'dark';

	return (
		<div className="w-full">
			<JwtSignInForm />

			<div className="mt-6 flex items-center">
				<div className="flex-auto border-t border-gray-300 dark:border-gray-400" />
				<Typography
					className="mx-4 text-sm font-medium text-gray-600 dark:text-gray-300"
				>
					Or continue with
				</Typography>
				<div className="flex-auto border-t border-gray-300 dark:border-gray-400" />
			</div>

			<div className="mt-4 flex items-center space-x-3">
				<Button
					variant="outlined"
					className="flex-auto h-12"
					sx={{
						borderColor: isDark ? '#6B7280' : '#D1D5DB',
						color: isDark ? '#D1D5DB' : '#6B7280',
						'&:hover': {
							borderColor: isDark ? '#60A5FA' : '#3B82F6',
							backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
						}
					}}
				>
					<FuseSvgIcon
						size={20}
						sx={{ 
							color: `${isDark ? '#FFFFFF' : '#374151'} !important`,
							filter: isDark ? 'brightness(1.5) contrast(1.2)' : 'none'
						}}
						style={{
							color: isDark ? '#FFFFFF' : '#374151'
						}}
					>
						feather:facebook
					</FuseSvgIcon>
				</Button>
				<Button
					variant="outlined"
					className="flex-auto h-12"
					sx={{
						borderColor: isDark ? '#6B7280' : '#D1D5DB',
						color: isDark ? '#D1D5DB' : '#6B7280',
						'&:hover': {
							borderColor: isDark ? '#60A5FA' : '#3B82F6',
							backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
						}
					}}
				>
					<FuseSvgIcon
						size={20}
						sx={{ 
							color: `${isDark ? '#FFFFFF' : '#374151'} !important`,
							filter: isDark ? 'brightness(1.5) contrast(1.2)' : 'none'
						}}
						style={{
							color: isDark ? '#FFFFFF' : '#374151'
						}}
					>
						feather:twitter
					</FuseSvgIcon>
				</Button>
				<Button
					variant="outlined"
					className="flex-auto h-12"
					sx={{
						borderColor: isDark ? '#6B7280' : '#D1D5DB',
						color: isDark ? '#D1D5DB' : '#6B7280',
						'&:hover': {
							borderColor: isDark ? '#60A5FA' : '#3B82F6',
							backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
						}
					}}
				>
					<FuseSvgIcon
						size={20}
						sx={{ 
							color: `${isDark ? '#FFFFFF' : '#374151'} !important`,
							filter: isDark ? 'brightness(1.5) contrast(1.2)' : 'none'
						}}
						style={{
							color: isDark ? '#FFFFFF' : '#374151'
						}}
					>
						feather:github
					</FuseSvgIcon>
				</Button>
			</div>
		</div>
	);
}

export default jwtSignInTab;
