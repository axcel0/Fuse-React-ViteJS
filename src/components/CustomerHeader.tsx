import { AppBar, Box, Button, Grid, Modal, TextField, Toolbar, Typography } from '@mui/material';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { addNewCustomer } from '@/store/slices/customerSlice';

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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: 2
};

export const CustomerHeader = () => {
	const dispatch = useDispatch<AppDispatch>();
	const customerStore = useSelector((state: any) => state);
	const customers = customerStore?.data || [];
	const loading = customerStore?.loading;

	// console.log(customerStore)

	const [open, setOpen] = useState(false);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors, isValid }
	} = useForm({
		mode: 'all',
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {
		try {
			dispatch(addNewCustomer(data));
			alert('Customer added successfully!');
			handleClose();
		} catch (error) {
			alert('Error adding customer!');
			console.error(error);
		}
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		reset();
	};

	const formatLabel = (fieldName: string) => {
		return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
	};

	const isFieldRequired = (fieldName: string) => {
		const fieldSchema = schema.fields[fieldName];
		return fieldSchema?.describe()?.tests.some((test: any) => test.name === 'required');
	};

	return (
		<Box sx={{ flexGrow: 1, bgcolor: 'white' }}>
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
						<Button sx={{ backgroundColor: '#f0edf0', margin: 1, color: 'black' }}>
							<PlayForWorkIcon />
							Import
						</Button>
						<Button sx={{ backgroundColor: '#f0edf0', margin: 1, color: 'black' }}>
							<PublishIcon />
							Export
						</Button>
						<Button
							sx={{ backgroundColor: '#8a3fd1', margin: 1 }}
							onClick={handleOpen}
						>
							Add Customer
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography
									variant="h4"
									gutterBottom
									align="center"
								>
									Add New Customer
								</Typography>
								<Box
									component="form"
									onSubmit={handleSubmit(onSubmit)}
									noValidate
									sx={{ mt: 2 }}
								>
									<Grid
										container
										spacing={2}
									>
										{[
											'name',
											'img',
											'emailSubscription',
											'location',
											'orders',
											'amountSpent',
											'email',
											'phone',
											'jobTitle',
											'contactOwner',
											'companyName',
											'natureOfRelationship',
											'instagramAccount',
											'tiktokAccount'
										].map((field) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={field}
											>
												<Controller
													name={field}
													control={control}
													defaultValue=""
													render={({ field }) => (
														<TextField
															{...field}
															label={
																<>
																	<span>{formatLabel(field.name)}</span>{' '}
																	{isFieldRequired(field.name) && (
																		<span style={{ color: 'red' }}>*</span>
																	)}
																</>
															}
															fullWidth
															variant="outlined"
															error={!!errors[field.name]}
															helperText={errors[field.name]?.message}
															onBlur={(e) => {
																field.onBlur();
															}}
														/>
													)}
												/>
											</Grid>
										))}
										<Grid
											item
											xs={12}
										>
											<Button
												type="submit"
												variant="contained"
												color="primary"
												fullWidth
												disabled={!isValid}
											>
												Add Customer
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Modal>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
