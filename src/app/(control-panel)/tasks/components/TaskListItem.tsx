import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { format } from 'date-fns';

function TaskListItem({ task, index }) {
  // Helper function to format dates
  const formatDate = (timestamp) => {
    return timestamp ? format(new Date(timestamp), 'dd/MM/yyyy HH:mm') : 'N/A';
  };

  return (
    <Box 
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 2,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        backgroundColor: task.status === 'ACTIVE' ? '#f0f0f0' : '#e6e6e6'
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {task.name || 'Unnamed Task'}
        </Typography>
        <Chip 
          label={task.status} 
          color={task.status === 'ACTIVE' ? 'primary' : 'default'}
          size="small"
        />
      </Stack>

      <Typography variant="body2" color="text.secondary">
        {task.description || 'No description available'}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Typography variant="body2">
          <strong>Type:</strong> {task.type || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Job:</strong> {task.meta?.applicationId || 'N/A'}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography variant="body2">
          <strong>Start:</strong> {formatDate(task.startDate)}
        </Typography>
        <Typography variant="body2">
          <strong>End:</strong> {formatDate(task.endDate)}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2">
          <strong>Priority:</strong> {task.priority}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created: {formatDate(task.createdDate)}
        </Typography>
      </Stack>
    </Box>
  );
}

export default TaskListItem;