import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';

function CreateOrder() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Order
      </Typography>
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Order Creation Form
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This screen will contain the order creation form with product selection, quantities, and customer details.
        </Typography>
      </Paper>
    </Box>
  );
}

export default CreateOrder; 