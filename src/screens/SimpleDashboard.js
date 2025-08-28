import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  Paper,
  Stack,
} from '@mui/material';
import {
  Inventory2,
  ShoppingCart,
  AttachMoney,
  Warning,
  Add,
} from '@mui/icons-material';
import { getCurrentUser, getProducts, getSales, initializeUserData } from '../utils/localStorage';

function SimpleDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    value: 0,
    lowStock: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('SimpleDashboard: Loading user data...');
      
      // Get current user
      const user = getCurrentUser();
      console.log('SimpleDashboard: Current user:', user);
      setCurrentUser(user);

      // Initialize data for user
      if (user?.id) {
        console.log('SimpleDashboard: Initializing user data...');
        initializeUserData(user.id);
      }

      // Get dashboard stats
      const products = getProducts();
      const sales = getSales();
      
      console.log('SimpleDashboard: Products loaded:', products.length);
      console.log('SimpleDashboard: Sales loaded:', sales.length);

      const totalProducts = products.length;
      const totalSales = sales.length;
      const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);
      const lowStockCount = products.filter(p => (p.stock || 0) <= 10).length;

      setStats({
        products: totalProducts,
        sales: totalSales,
        value: totalValue,
        lowStock: lowStockCount,
      });

      console.log('SimpleDashboard: Stats calculated:', {
        products: totalProducts,
        sales: totalSales,
        value: totalValue,
        lowStock: lowStockCount,
      });

    } catch (err) {
      console.error('SimpleDashboard: Error loading data:', err);
      setError(err.message);
    }
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount || 0);
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading dashboard: {error}
        </Alert>
        <Button onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Reload Page
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Welcome, {currentUser?.firstName || 'User'}!
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory2 sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Products</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.products}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total products
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 2, color: 'success.main' }} />
                <Typography variant="h6">Value</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(stats.value)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inventory value
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCart sx={{ mr: 2, color: 'info.main' }} />
                <Typography variant="h6">Sales</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.sales}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total sales
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Warning sx={{ mr: 2, color: 'warning.main' }} />
                <Typography variant="h6">Low Stock</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.lowStock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Items low on stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {stats.lowStock > 0 && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          You have {stats.lowStock} items that are low on stock. Consider restocking soon.
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Quick Actions
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/dashboard/sales/new')}
          >
            New Sale
          </Button>
          <Button
            variant="outlined"
            startIcon={<Inventory2 />}
            onClick={() => navigate('/dashboard/products')}
          >
            View Products
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShoppingCart />}
            onClick={() => navigate('/dashboard/sales')}
          >
            View Sales
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard/scan')}
          >
            Scan Product
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Debug Info:</strong> User ID: {currentUser?.id}, Products: {stats.products}, Sales: {stats.sales}
        </Typography>
      </Box>
    </Box>
  );
}

export default SimpleDashboard;