import { CustomerDetailDemo } from '@/app/(control-panel)/customer-detail/components/CustomerDetailDemo';
import { CustomerDetailLeftBar } from '@/app/(control-panel)/customer-detail/components/CustomerDetailLeftBar';
import { CustomerDetailRightBar } from '@/app/(control-panel)/customer-detail/components/CustomerDetailRightBar';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useThemeMediaQuery } from '@fuse/hooks';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import CloseIcon from '@mui/icons-material/Close';
import reducer from './store';
import withReducer from '@/store/withReducer';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {
		backgroundColor: 'white'
	},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {
		backgroundColor: 'white'
	}
}));

function CustomerDetail() {
	const isLgUp = useThemeMediaQuery((theme) => theme.breakpoints.up('lg'));
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

	const toggleRightSidebar = () => {
		setRightSidebarOpen(!rightSidebarOpen);
	};

	const toggleLeftSidebar = () => {
		setLeftSidebarOpen(!leftSidebarOpen);
	};

	return (
		<Root
			leftSidebarContent={<CustomerDetailLeftBar />}
			leftSidebarOpen={isLgUp || leftSidebarOpen}
			rightSidebarContent={<CustomerDetailRightBar />}
			leftSidebarWidth={320}
			rightSidebarWidth={300}
			rightSidebarVariant={isLgUp ? 'permanent' : 'temporary'}
			leftSidebarVariant={isLgUp ? 'permanent' : 'temporary'}
			rightSidebarOpen={isLgUp || rightSidebarOpen} 
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
			leftSidebarOnClose={() => setLeftSidebarOpen(false)}
			header={
				<Box
					display={'flex'}
					justifyContent={'space-between'}
				>
					{!isLgUp && (
						<IconButton
							onClick={toggleLeftSidebar}
							color="primary"
						>
							{leftSidebarOpen ? <CloseIcon /> : <FormatAlignLeftIcon />}
						</IconButton>
					)}
					{!isLgUp && ( 
						<IconButton
							onClick={toggleRightSidebar}
							color="primary"
						>
							{rightSidebarOpen ? <CloseIcon /> : <FormatAlignRightIcon />}
						</IconButton>
					)}
				</Box>
			}
			content={
				<div className="p-6">
					<CustomerDetailDemo />
				</div>
			}
		/>
	);
}

export default withReducer('customerDetail', reducer)(CustomerDetail);

