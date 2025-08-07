import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';

function OrderDetails() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Order Details
      </Typography>
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Order Information
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This screen will display detailed order information including items, quantities, pricing, and status.
        </Typography>
      </Paper>
    </Box>
  );
}

export default OrderDetails; 