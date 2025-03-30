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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import {
  deleteCustomer,
  getCustomers,
  searchCustomerByName,
  updateCustomer,
} from '@/store/slices/customerSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import EditCustomer from './EditCustomer';

interface Customer {
  name: string;
  img: string;
  emailSubscription: 'Subscribed' | 'Not Subscribed' | 'Pending';
  location: string;
  orders: string;
  amountSpent: string;
}

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
  const dispatch = useDispatch<AppDispatch>();
  const customerStore = useSelector(
    (state: any) => state?.customers?.customers
  );
  const customers = customerStore?.data || [];
  const loading = customerStore?.loading;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      dispatch(searchCustomerByName(value));
    }, 300);

    setSearchTimeout(timeout as unknown as number);
  };

  const getSelectedCustomer = (id: string) => {
    const customer = customers.find((cust) => cust.id === id);
    setSelectedCustomer(customer);
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    getSelectedCustomer(id);
  };

  const handleOpenEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    handleClose();
    // setSelectedCustomer(null)
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleClose();
  };

  const handleDeleteConfirm = (id) => {
    console.log(id);
    handleDelete(id); 
    setOpenDialog(false);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateCustomer = async (updatedData: any) => {
    handleCloseEditModal();
    try {
      await dispatch(updateCustomer(updatedData)); // Replace with your Redux action or API call
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  if (!customers || loading) {
    return <FuseLoading></FuseLoading>;
  }

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
    <Box bgcolor={'white'}>
      <Grid
        container
        borderRadius={2}
        sx={{
          marginBottom: '5px',
          flexDirection: { xs: 'column', sm: 'row' },
          border: 0.5,
          borderRadius: 2,
        }}
      >
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            padding: 1,
            backgroundColor: '#F9F9F9',
            borderRadius: 2,
            marginBottom: { xs: '5px', sm: '0' },
          }}
          xs={12}
          sm={1.5}
        >
          1 customer
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          xs={12}
          sm={10.5}
          p={1}
          sx={{ backgroundColor: 'white', borderRadius: 2 }}
        >
          <Typography fontWeight="bold" fontSize={{ xs: '14px', sm: '16px' }}>
            100% of your customer base
          </Typography>
          <Button
            sx={{
              padding: '8px',
              backgroundColor: '#F9F9F9',
              fontSize: { xs: '12px', sm: '14px' },
            }}
          >
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
              bgcolor: 'white',
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Customer"
              value={searchQuery}
              onChange={handleSearchChange}
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
              marginRight: '5px',
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
        <Table sx={{ bgcolor: 'white' }}>
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
                <TableCell sx={{ cursor: 'pointer' }}>
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/customer-detail/${customer.id}`);
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Avatar alt={customer.name} />
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
                <TableCell
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/customer-detail/${customer.id}`);
                  }}
                >
                  {customer.location}
                </TableCell>
                <TableCell
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/customer-detail/${customer.id}`);
                  }}
                >
                  {customer.orders} orders
                </TableCell>
                <TableCell
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/customer-detail/${customer.id}`);
                  }}
                >
                  $ {customer.amountSpent}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      handleClick(e, customer.id);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    elevation={0} 
                    sx={{
                      '& .MuiPaper-root': {
                        boxShadow: 'none',
                      },
                      
                    }}
                  >
                    <MenuItem
                      sx={{ boxShadow: 'none' }}
                      onClick={() => handleOpenEditModal(customer)}
                    >
                      Edit
                    </MenuItem>
                    <EditCustomer
                      open={isEditModalOpen}
                      onClose={handleCloseEditModal}
                      customer={selectedCustomer || {}}
                      onSubmit={handleUpdateCustomer}
                    />
                    <MenuItem
                      onClick={handleOpenDialog}
                      sx={{ color: 'red', boxShadow: 'none' }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="delete-confirmation-dialog"
                    BackdropProps={{
                      style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black
                      },
                    }}
                  >
                    <DialogTitle id="delete-confirmation-dialog">
                      Delete Customer
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this customer? This
                        action cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleDeleteConfirm(selectedCustomer.id)
                        }}
                        color="error"
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
