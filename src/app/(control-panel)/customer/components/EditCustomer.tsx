import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Customer {
	id: string;
	name: string;
	img: string;
	emailSubscription: string;
	location: string;
	orders: string;
	amountSpent: string;
	email: string;
	phone: string;
	jobTitle: string;
	contactOwner: string;
	companyName: string;
	natureOfRelationship: string;
	instagramAccount: string;
	tiktokAccount: string;
}

interface EditCustomerModalProps {
	open: boolean;
	customer: Customer;
	onClose: () => void;
	onSubmit: (data: Customer) => void;
}

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	phone: yup.string().required('Phone number is required'),
	jobTitle: yup.string().required('Job title is required'),
	companyName: yup.string().required('Company name is required'),
	location: yup.string().required('Location is required')
});

const EditCustomer: React.FC<EditCustomerModalProps> = ({ open, customer, onClose, onSubmit }) => {
	const { handleSubmit, control } = useForm<Customer>({
		defaultValues: customer,
		resolver: yupResolver(schema),
		mode: 'onBlur'
	});

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>Edit Customer</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={2}
					>
						{customer &&
							Object.keys(customer).map(
								(key) =>
									key !== 'id' && (
										<Grid
											item
											xs={12}
											sm={6}
											key={key}
										>
											<Controller
												name={key as keyof Customer}
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														label={key.charAt(0).toUpperCase() + key.slice(1)}
														fullWidth
														variant="outlined"
														onBlur={(e) => {
															field.onBlur(); // Trigger blur event for validation
														}}
													/>
												)}
											/>
										</Grid>
									)
							)}
					</Grid>
					<DialogActions>
						<Button
							onClick={onClose}
							color="secondary"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Save
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditCustomer;
