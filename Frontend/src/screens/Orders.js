import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Add,
  ShoppingCart,
} from '@mui/icons-material';

function Orders() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Orders
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
        >
          Create Order
        </Button>
      </Box>

      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Orders Management
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This screen will display order management functionality including order creation, tracking, and history.
        </Typography>
        <Chip label="Coming Soon" color="primary" />
      </Paper>
    </Box>
  );
}

export default Orders; 