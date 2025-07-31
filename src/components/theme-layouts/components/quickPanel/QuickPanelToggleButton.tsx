import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import { useQuickPanel } from './QuickPanelContext';

type QuickPanelToggleButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props: QuickPanelToggleButtonProps) {
	const { className = '', children = <FuseSvgIcon size={20}>heroicons-outline:bookmark</FuseSvgIcon> } = props;
	const { togglePanel } = useQuickPanel();

	return (
		<IconButton onClick={() => togglePanel()} className={clsx('border border-divider', className)}>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
