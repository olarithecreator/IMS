import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateOrder() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard/sales/10.1', { replace: true });
  }, [navigate]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Order
      </Typography>
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress size={28} />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Redirecting to Create Sale...
        </Typography>
      </Paper>
    </Box>
  );
}

export default CreateOrder; 