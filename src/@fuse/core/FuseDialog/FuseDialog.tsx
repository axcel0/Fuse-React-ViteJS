import Dialog from '@mui/material/Dialog';
import { useFuseDialog } from '@fuse/core/FuseDialog/FuseDialogContext';

/**
 * FuseDialog component
 * This component renders a material UI Dialog component
 * with properties pulled from the FuseDialogContext
 */
function FuseDialog() {
	const { dialogState, closeDialog } = useFuseDialog();

	return (
		<Dialog
			onClose={() => closeDialog()}
			aria-labelledby="fuse-dialog-title"
			classes={{
				paper: 'rounded-lg',
			}}
			open={dialogState.open}
		>
			{dialogState.children}
		</Dialog>
	);
}

export default FuseDialog;
