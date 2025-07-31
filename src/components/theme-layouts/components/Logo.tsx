import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import MainProjectSelection from '@/components/MainProjectSelection';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut,
		}),
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut,
		}),
	},
}));

// Modern P logo with circle background like F logo
const PLogoIcon = styled(Box)(({ theme }) => ({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	backgroundColor: theme.palette.mode === 'dark' ? '#f44336' : '#d32f2f', // Red background
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#ffffff',
	fontWeight: 700,
	fontSize: '18px',
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	transition: theme.transitions.create(['background-color'], {
		duration: theme.transitions.duration.shortest,
		easing: theme.transitions.easing.easeInOut,
	}),
	'&:hover': {
		backgroundColor: theme.palette.mode === 'dark' ? '#f57c00' : '#e64a19', // Slightly different red on hover
	},
}));

/**
 * The modern P logo component.
 */
function Logo() {
	return (
		<Root className="flex flex-1 items-center space-x-3">
			<div className="flex flex-1 items-center space-x-2 px-2.5">
				<PLogoIcon className="logo-icon">P</PLogoIcon>
			</div>
			<MainProjectSelection />
		</Root>
	);
}

export default Logo;
