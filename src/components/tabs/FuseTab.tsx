import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import type { TabProps } from '@mui/material/Tab';
import type { ComponentType } from 'react';

type StyledTabProps = TabProps;

const FuseTab: ComponentType<TabProps> = styled((props: StyledTabProps) => (
	<Tab
		disableRipple
		{...props}
	/>
))(() => ({
	height: 36,
	maxHeight: 36,
	minHeight: 'auto!important',
	minWidth: 64,
	padding: '0 12px!important',
	fontSize: 13,
	borderRadius: 8,
	fontWeight: 'semibold',
	'&:hover': {
		opacity: 0.8
	},
	'&.Mui-selected': {}
}));

export default FuseTab;
