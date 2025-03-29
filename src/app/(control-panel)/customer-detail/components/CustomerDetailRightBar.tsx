/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Card,
	CardContent,
	Typography,
	Chip,
	AccordionActions,
	Button,
	Avatar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCompanies } from '@/store/slices/customer-detailSlice';
import FuseLoading from '@fuse/core/FuseLoading';

const companies = [
	{
		name: 'Zetaha Studios',
		website: 'Zetaha.io',
		email: 'Zetaha@gmail.com',
		phone: '034623252'
	},
	{
		name: 'Zetaha',
		website: 'Zetaha.io',
		email: 'Zetaha@gmail.com',
		phone: '034623252'
	}
];

export const CustomerDetailRightBar = () => {
	const dispatch = useDispatch<AppDispatch>();
	  const customerStore = useSelector((state: any) => state?.customerDetail?.customerDetail);
	  const companies = customerStore?.company || null;
	  const loading = customerStore?.loading;
	const [expanded, setExpanded] = useState(true);

	useEffect(() => {
		dispatch(getCompanies())
	}, [])

	const toggleExpand = () => {
		setExpanded((prev) => !prev);
	};

	if (!companies || loading) {
		return <FuseLoading></FuseLoading>;
	  }


	console.log(companies)

	return (
		<Box sx={{ width: '100%' }}>
			<Accordion sx={{ background: 'white' }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					<Typography
						component="span"
						display={'flex'}
					>
						Companies{' '}
						<Chip
							component={'span'}
							label="2"
							size="small"
							sx={{
								width: 24,
								height: 24,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 1,
								marginLeft: 1
							}}
						/>
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{companies.map((company) => (
						<Card
							sx={{ maxWidth: 270, mb: 2, borderRadius: 2, border: 1, borderColor: 'gray' }}
							key={company.name}
						>
							<CardContent sx={{ bgcolor: 'white', p: 1, pb: 1 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<Avatar sx={{ bgcolor: '#e0e0e0', mr: 1 }}>🏢</Avatar>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
										fontSize={12}
									>
										{company.name}
									</Typography>
								</Box>
								<Box sx={{ bgcolor: '#f1f5f9', border: 1, borderRadius: '10px', borderColor: 'gray' }}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
											p: 1,
											mb: 0.5
										}}
									>
										<LanguageIcon
											fontSize="small"
											sx={{ color: 'gray' }}
										/>
										<Typography>{company.website}</Typography>
									</Box>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
											p: 1,
											mb: 0.5
										}}
									>
										<EmailIcon
											fontSize="small"
											sx={{ color: 'gray' }}
										/>
										<Typography>{company.email}</Typography>
									</Box>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
											p: 1
										}}
									>
										<PhoneIcon
											fontSize="small"
											sx={{ color: 'gray' }}
										/>
										<Typography>{company.phone}</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					))}
				</AccordionDetails>
			</Accordion>
			<Accordion sx={{ background: 'white' }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2-content"
					id="panel2-header"
				>
						
                        <Typography component="span" display={'flex'}>
						Deals
						<Chip
							component={'span'}
							label="2"
							size="small"
							sx={{
								width: 24,
								height: 24,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 1,
								marginLeft: 1
							}}
						/>
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
					blandit leo lobortis eget.
				</AccordionDetails>
			</Accordion>
			<Accordion sx={{ background: 'white' }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3-content"
					id="panel3-header"
				>
					<Typography component="span" display={'flex'}>
						Tickets
						<Chip
							component={'span'}
							label="2"
							size="small"
							sx={{
								width: 24,
								height: 24,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 1,
								marginLeft: 1
							}}
						/>
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
					blandit leo lobortis eget.
				</AccordionDetails>
				<AccordionActions>
					<Button>Cancel</Button>
					<Button>Agree</Button>
				</AccordionActions>
			</Accordion>
		</Box>
	);
};
