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
	img: yup.string().url('Invalid URL'),
	emailSubscription: yup.string().required('Email subscription is required'),
	location: yup.string().required('Location is required'),
	orders: yup.string().matches(/^\d+$/, 'Orders must be a valid number').required('Order is required'),
	amountSpent: yup
		.string()
		.matches(/^\d+(\.\d+)?$/, 'Amount spent must be a valid number')
		.required('Amount spent is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	phone: yup
		.string()
		.matches(/^\d{9,15}$/, 'Phone number must be between 9 and 15 digits')
		.required('Phone number is required'),
	jobTitle: yup.string().required('Job title is required'),
	contactOwner: yup.string(),
	companyName: yup.string().required('Company name is required'),
	natureOfRelationship: yup.string(),
	instagramAccount: yup.string().url('Invalid URL'),
	tiktokAccount: yup.string().url('Invalid URL')
});

const EditCustomer: React.FC<EditCustomerModalProps> = ({ open, customer, onClose, onSubmit }) => {
	const {
		handleSubmit,
		control,
		formState: { errors, isValid }
	} = useForm<Customer>({
		defaultValues: customer,
		resolver: yupResolver(schema),
		mode: 'all'
	});

	const formatLabel = (fieldName: string) => {
		return fieldName
			.replace(/([A-Z])/g, ' $1') // Add space before capital letters
			.replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
	};

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
						sx={{ pt: 1 }}
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
														label={
															<>
																<span>{formatLabel(field.name)}</span>{' '}
																{schema.fields[field.name]?.tests.some(
																	(test) => test.OPTIONS?.name === 'required'
																) && <span style={{ color: 'red' }}>*</span>}
															</>
														}
														fullWidth
														variant="outlined"
														error={!!errors[field.name]}
														helperText={errors[field.name]?.message}
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
							disabled={!isValid}
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
