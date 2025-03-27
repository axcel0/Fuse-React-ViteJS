import { CustomerDemo } from '@/components/CustomerDemo';
import { CustomerHeader } from '@/components/CustomerHeader';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Customer() {
	return (
		<Root
			header={<CustomerHeader />}
			content={
				<div className="p-6">
					<h4>Customer</h4>
					<br />
					<CustomerDemo />
				</div>
			}
		/>
	);
}

export default Customer;
