import { Box, IconButton, InputBase } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const tabs = [
	{ value: '1', label: 'Activities' },
	{ value: '2', label: 'Notes' },
	{ value: '3', label: 'Emails' },
	{ value: '4', label: 'Calls' },
	{ value: '5', label: 'Tasks' },
	{ value: '6', label: 'Meetings' }
];

export const CustomerDetailDemo = () => {
	const [value, setValue] = useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<>
			<Box
				component="form"
				sx={{
					p: '2px 4px',
					display: 'flex',
					alignItems: 'center',
					border: 1,
					borderRadius: 2,
					borderColor: 'gray'
					// width: "full"
				}}
			>
				<IconButton
					type="button"
					sx={{ p: '10px' }}
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search activites, notes, ema"
					inputProps={{ 'aria-label': 'Search activites, notes, ema' }}
				/>
			</Box>
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList
							onChange={handleChange}
							aria-label="lab API tabs example"
							variant="scrollable"
							scrollButtons="auto"
						>
							{tabs.map((tab) => (
								<Tab
									key={tab.value}
									label={tab.label}
									value={tab.value}
									sx={{ whiteSpace: 'nowrap' }}
								/>
							))}
						</TabList>
					</Box>
					<TabPanel value="1">Item One</TabPanel>
					<TabPanel value="2">Item Two</TabPanel>
					<TabPanel value="3">Item Three</TabPanel>
					<TabPanel value="4">Item Four</TabPanel>
					<TabPanel value="5">Item Five</TabPanel>
					<TabPanel value="6">Item Six</TabPanel>
				</TabContext>
			</Box>
		</>
	);
};
