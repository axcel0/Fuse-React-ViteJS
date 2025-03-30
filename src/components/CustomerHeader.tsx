import { AppBar, Box, Button, Grid, Modal, TextField, Toolbar, Typography } from '@mui/material';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { borderRadius } from '@mui/system';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { addNewCustomer } from '@/store/slices/customerSlice';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	img: yup.string().url('Invalid URL').required('Image URL is required'),
	emailSubscription: yup.string().required('Email subscription is required'),
	location: yup.string().required('Location is required'),
	orders: yup.string().required('Orders are required'),
	amountSpent: yup.string().required('Amount spent is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	phone: yup.string().required('Phone number is required'),
	jobTitle: yup.string().required('Job title is required'),
	contactOwner: yup.string().required('Contact owner is required'),
	companyName: yup.string().required('Company name is required'),
	natureOfRelationship: yup.string().required('Nature of relationship is required'),
	instagramAccount: yup.string().url('Invalid URL').required('Instagram account is required'),
	tiktokAccount: yup.string().url('Invalid URL').required('TikTok account is required')
});

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
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
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {
		try {
			dispatch(addNewCustomer(data))
			alert('Customer added successfully!');
			handleClose()
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
		return fieldName
			.replace(/([A-Z])/g, ' $1') // Add space before capital letters
			.replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
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
															fullWidth
															label={formatLabel(field.name)}
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
