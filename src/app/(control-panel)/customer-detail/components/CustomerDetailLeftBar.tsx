/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Box, Avatar, Typography, Tabs, Tab, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import NoteIcon from '@mui/icons-material/Note';
import TaskIcon from '@mui/icons-material/Task';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getCustomerById } from '@/store/slices/customer-detailSlice';
import FuseLoading from '@fuse/core/FuseLoading';

export const CustomerDetailLeftBar = () => {
  const {id} = useParams()
  const dispatch = useDispatch<AppDispatch>();
  const customerStore = useSelector((state: any) => state?.customerDetail?.customerDetail);
  const customerDetail = customerStore?.data || null;
  const loading = customerStore?.loading;
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCustomerById(id))
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!customerDetail || loading) {
    return <FuseLoading></FuseLoading>;
  }

  return (
    <Box sx={{ padding: 2, borderRight: '1px solid #e0e0e0' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // mb={2}
      >
        <Box display={'flex'} alignItems={'center'} sx={{cursor: "pointer"}} onClick={() => {navigate("/customer")}}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontSize={'10px'}>
            Back to leads
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} sx={{cursor: "pointer"}}>
          <Typography variant="h6" fontSize={'10px'}>
            Actions
          </Typography>

          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
        <Avatar sx={{ width: 50, height: 50, marginRight: '5px' }} />
        <Box>
          <Typography variant="h6" fontSize={'15px'} fontWeight={'bold'}>{customerDetail?.name}</Typography>
          <Typography variant="body2" fontSize={'10px'} color="text.secondary">
            {customerDetail?.jobTitle}
          </Typography>
          <Typography variant="body2" fontSize={'10px'} color="text.secondary">
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton>
          <NoteIcon />
        </IconButton>
        <Typography fontSize={'10px'} fontWeight={'bold'}>Notes</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton>
          <EmailIcon />
        </IconButton>
        <Typography fontSize={'10px'} fontWeight={'bold'}>Emails</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton>
          <CallIcon />
        </IconButton>
        <Typography fontSize={'10px'} fontWeight={'bold'}>Calls</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton>
          <TaskIcon />
        </IconButton>
        <Typography fontSize={'10px'} fontWeight={'bold'}>Tasks</Typography>
        </Box>
        <IconButton>
        <MoreVertIcon />
        </IconButton>
      </Box>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Activity" />
        <Tab label="Appointments" />
      </Tabs>
      <Box p={2}>
        {value === 0 && (
          <Box fontSize={'12px'}>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Email</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail?.email}</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Phone number</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail?.phone}</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Job title</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail?.jobTitle}</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Contact Owner</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail.contactOwner ? customerDetail.contactOwner : '-'}</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Last contacted</Typography>
                <Typography variant="body1">{customerDetail.lastContacted ? customerDetail.lastContacted : '-'}</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Company name</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail?.companyName}</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Nature of relationship</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail.natureOfRelationship ? customerDetail.natureOfRelationship : '-'}</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">Instagram account</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail.instagramAccount ? customerDetail.instagramAccount : '-'}</Typography>
            </Box>
            <Box>
                <Typography variant="body2" color="textSecondary">Tiktok account</Typography>
                <Typography variant="body1" fontWeight="bold">{customerDetail.tiktokAccount ? customerDetail.tiktokAccount : '-'}</Typography>
            </Box>
          </Box>
        )}
        {value === 1 && <Typography>Appointments content</Typography>}   
      </Box>
    </Box>
  );
};
