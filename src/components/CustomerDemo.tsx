/* eslint-disable prettier/prettier */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Checkbox,
  Box,
  Typography,
  Button,
  Grid,
  InputBase,
} from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Customer {
  name: string;
  img: string;
  emailSubscription: 'Subscribed' | 'Not Subscribed' | 'Pending';
  location: string;
  orders: string;
  amountSpent: string;
}

const customers: Customer[] = [
  {
    name: 'Esther Howard',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Subscribed',
    location: 'Great Falls, Maryland',
    orders: '2 Orders',
    amountSpent: '$250.00',
  },
  {
    name: 'Leslie Alexander',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Not Subscribed',
    location: 'Pasadena, Oklahoma',
    orders: '3 Orders',
    amountSpent: '$350.00',
  },
  {
    name: 'Guy Hawkins',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Pending',
    location: 'Corona, Michigan',
    orders: 'N/A',
    amountSpent: '$0.00',
  },
  {
    name: 'Savannah Nguyen',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Subscribed',
    location: 'Syracuse, Connecticut',
    orders: 'N/A',
    amountSpent: '$0.00',
  },
  {
    name: 'Bessie Cooper',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Not Subscribed',
    location: 'Lansing, Illinois',
    orders: '1 Orders',
    amountSpent: '$470.00',
  },
  {
    name: 'Ronald Richards',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Pending',
    location: 'Great Falls, Maryland',
    orders: '2 Orders',
    amountSpent: '$250.00',
  },
  {
    name: 'Marvin McKinney',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Subscribed',
    location: 'Coppell, Virginia',
    orders: '2 Orders',
    amountSpent: '$150.00',
  },
  {
    name: 'Kathryn Murphy',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Not Subscribed',
    location: 'Lafayette, California',
    orders: '3 Orders',
    amountSpent: '$250.00',
  },
  {
    name: 'Eleanor Pena',
    img: 'https://via.placeholder.com/40',
    emailSubscription: 'Pending',
    location: 'Corona, Michigan',
    orders: '1 Orders',
    amountSpent: '$250.00',
  },
];

const getChipColor = (status: string) => {
  switch (status) {
    case 'Subscribed':
      return 'success';
    case 'Not Subscribed':
      return 'error';
    case 'Pending':
      return 'warning';
    default:
      return 'default';
  }
};

export const CustomerDemo = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(customers.map((_, index) => index)); // Select all indexes
    } else {
      setSelectedRows([]); // Unselect all
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows(
      (prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index) // Uncheck
          : [...prevSelected, index] // Check
    );
  };

  return (
    <Box>
      <Grid
        container
        borderRadius={2}
        sx={{ backgroundColor: '#F4F4F4', marginBottom: '5px' }}
      >
        <Grid
          item
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ padding: '10px', backgroundColor: 'white' }}
          xs={1.5}
          borderRadius={2}
        >
          1 customer
        </Grid>
        <Grid
          item
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          xs={10.5}
          p={1}
        >
          <Typography fontWeight="bold">100% of your customer base</Typography>
          <Button sx={{ padding: '10px', backgroundColor: 'white' }}>
            Add filter <KeyboardArrowDownIcon />
          </Button>
        </Grid>
      </Grid>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
		alignItems={'center'}
        borderRadius={2}
        sx={{ marginBottom: '5px' }}
      >
        <Grid
          item
          // display={'flex'}
          // alignItems={'center'}
          // justifyContent={'center'}
          // sx={{ padding: '10px', backgroundColor: 'white' }}
          // xs={1.5}
          // borderRadius={2}
        >
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 200,
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Customer"
              inputProps={{ 'aria-label': 'search customer' }}
            />
          </Paper>
        </Grid>
        <Grid
          item
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          xs={10.5}
          p={1}
        >
          <Button
            sx={{
              backgroundColor: 'white',
              width: '40px', // Adjust size as needed
              height: '40px', // Equal width and height to make it square
              minWidth: '40px', // Ensures it doesn't shrink
              borderRadius: '8px', // Slight rounding for a clean look
			  marginRight: "5px",
              boxShadow: 1,
            }}
          >
            <ImportExportIcon />
          </Button>
          <Button
            sx={{
              backgroundColor: 'white',
              width: '40px',
              height: '40px',
              minWidth: '40px',
              borderRadius: '8px',
              boxShadow: 1,
            }}
          >
            <MoreHorizIcon />
          </Button>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedRows.length === customers.length}
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < customers.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Customers</TableCell>
              <TableCell>Email Subscription</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Amount Spent</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Avatar src={customer.img} alt={customer.name} />
                    {customer.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    variant="outlined"
                    label={
                      <span>
                        <FiberManualRecordIcon fontSize="inherit" />{' '}
                        {customer.emailSubscription}
                      </span>
                    }
                    color={getChipColor(customer.emailSubscription)}
                    sx={{ borderRadius: '10px' }}
                  />
                </TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.amountSpent}</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
