import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import PublishIcon from '@mui/icons-material/Publish';

export const CustomerHeader = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{ boxShadow: 'none' }}
			>
				<Toolbar sx={{ backgroundColor: '#F4F4F4' }}>
					<Typography
						variant="h5"
						component="div"
						sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}
					>
						Customer
					</Typography>
					<Box>
						<Button sx={{ backgroundColor: '#f0edf0', margin: 1, color: "black" }}>
							<PlayForWorkIcon />
							Import
						</Button>
						<Button sx={{ backgroundColor: '#f0edf0', margin: 1, color: "black" }}>
							<PublishIcon />
							Export
						</Button>
						<Button sx={{ backgroundColor: '#8a3fd1', margin: 1 }}>Add Customer</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
