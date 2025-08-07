import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Inventory,
  ShoppingCart,
} from '@mui/icons-material';

function Reports() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports & Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Assessment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Sales Reports
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View sales performance, revenue trends, and product analytics.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Inventory sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Inventory Reports
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track stock levels, low inventory alerts, and turnover rates.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Order Reports
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Analyze order patterns, customer behavior, and fulfillment metrics.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Performance Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor KPIs, growth metrics, and business performance indicators.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports; 