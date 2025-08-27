import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getProducts, getSales, getSettings } from '../utils/localStorage';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Avatar,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import {
  Warning,
  Add,
  ChevronRight,
  ArrowForward,
  Menu as MenuIcon,
  Notifications,
  CloudDone,
  MonetizationOn,
  AttachMoney,
  PriceChange,
  InsertChart,
} from '@mui/icons-material';

function Dashboard() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('Owner');
  const [dashboardData, setDashboardData] = useState({
    totalStock: 0,
    totalValue: 0,
    lowStockCount: 0,
    todaySales: 0,
    todaySalesAmount: 0,
  });

  useEffect(() => {
    // Get user data
    const currentUser = getCurrentUser();
    if (currentUser?.role) {
      setUserRole(currentUser.role === 'admin' ? 'Owner' : currentUser.role);
    }

    // Calculate dashboard metrics
    const products = getProducts();
    const sales = getSales();
    const settings = getSettings();

    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const lowStockCount = products.filter(product => product.stock <= settings.lowStockThreshold).length;

    // Today's sales
    const today = new Date().toDateString();
    const todaySales = sales.filter(sale => new Date(sale.date).toDateString() === today);
    const todaySalesAmount = todaySales.reduce((sum, sale) => sum + sale.total, 0);

    setDashboardData({
      totalStock,
      totalValue,
      lowStockCount,
      todaySales: todaySales.length,
      todaySalesAmount,
    });
  }, []);

  // Different views based on role
  const renderOwnerDashboard = () => (
    <Container maxWidth="sm" sx={{ py: 0, px: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/dashboard/stores')} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label="Synced" 
            color="success"
            size="small"
            icon={<CloudDone />}
            sx={{ fontSize: '0.75rem' }}
          />
          <IconButton onClick={() => navigate('/dashboard/notifications')}>
            <Notifications />
          </IconButton>
        </Box>
      </Box>

      {/* Welcome Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Here's your inventory snapshot.
        </Typography>
        <Chip 
          label={userRole} 
          color="warning" 
          sx={{ 
            fontWeight: 'bold',
            bgcolor: '#ff9800',
            color: 'white',
          }}
        />
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: 2, textAlign: 'center' }}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Total Stock
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {dashboardData.totalStock.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: 2, textAlign: 'center' }}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Total Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                ₦{Math.floor(dashboardData.totalValue / 1000)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Low Stock Alert */}
      <Paper sx={{ 
        borderRadius: 2, 
        bgcolor: '#ffebee', 
        border: '1px solid #ffcdd2',
        mb: 3,
        cursor: 'pointer',
      }} onClick={() => navigate('/dashboard/alerts')}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Warning sx={{ color: 'error.main', mr: 2 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                  Low Stock Alert
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dashboardData.lowStockCount} items are running low
                </Typography>
              </Box>
            </Box>
            <ChevronRight sx={{ color: 'error.main' }} />
          </Box>
        </CardContent>
      </Paper>

      {/* Today's Sales */}
      <Paper sx={{ borderRadius: 2, mb: 3, cursor: 'pointer' }} onClick={() => navigate('/dashboard/sales')}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                <MonetizationOn />
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Total Sales Today
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dashboardData.todaySales} sales • ₦{dashboardData.todaySalesAmount.toLocaleString()}
                </Typography>
              </Box>
            </Box>
            <ChevronRight color="action" />
          </Box>
        </CardContent>
      </Paper>

      {/* Quick Actions */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/add-product')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <Add />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Add Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/sales/new')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
              }}>
                <ArrowForward />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                Sell
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/products')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <PriceChange />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Update Price
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/reports')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <InsertChart />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Report
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  const renderManagerDashboard = () => (
    <Container maxWidth="sm" sx={{ py: 0, px: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label="Synced" 
            color="success"
            size="small"
            icon={<CloudDone />}
          />
          <IconButton onClick={() => navigate('/dashboard/notifications')}>
            <Notifications />
          </IconButton>
        </Box>
      </Box>

      {/* Welcome Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Inventory Overview.
        </Typography>
        <Chip 
          label="Manager" 
          color="secondary" 
          sx={{ 
            fontWeight: 'bold',
            bgcolor: '#9c27b0',
            color: 'white',
          }}
        />
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: 2, textAlign: 'center' }}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Total Stock
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {dashboardData.totalStock.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: 2, textAlign: 'center' }}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Low Stock
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                {dashboardData.lowStockCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Today's Sales */}
      <Paper sx={{ borderRadius: 2, mb: 3, cursor: 'pointer' }} onClick={() => navigate('/dashboard/sales')}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                <MonetizationOn />
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Today's Sales
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dashboardData.todaySales}
                </Typography>
              </Box>
            </Box>
            <ChevronRight color="action" />
          </Box>
        </CardContent>
      </Paper>

      {/* Quick Actions */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/add-product')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <Add />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Add Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/sales/new')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
              }}>
                <ArrowForward />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                Sell
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/products')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <PriceChange />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Update Price
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/reports')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <InsertChart />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Report
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  const renderSalesClerkDashboard = () => (
    <Container maxWidth="sm" sx={{ py: 0, px: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label="Synced" 
            color="success"
            size="small"
            icon={<CloudDone />}
          />
          <IconButton onClick={() => navigate('/dashboard/notifications')}>
            <Notifications />
          </IconButton>
        </Box>
      </Box>

      {/* Welcome Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Inventory Overview.
        </Typography>
        <Chip 
          label="Sales Clerk" 
          color="default" 
          sx={{ 
            fontWeight: 'bold',
            bgcolor: '#757575',
            color: 'white',
          }}
        />
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: 2, textAlign: 'center' }}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Total Stock
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {dashboardData.totalStock.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: 2, textAlign: 'center' }}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Low Stock
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                {dashboardData.lowStockCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Today's Sales */}
      <Paper sx={{ borderRadius: 2, mb: 3, cursor: 'pointer' }} onClick={() => navigate('/dashboard/sales')}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                <MonetizationOn />
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Today's Sales
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dashboardData.todaySales}
                </Typography>
              </Box>
            </Box>
            <ChevronRight color="action" />
          </Box>
        </CardContent>
      </Paper>

      {/* Quick Actions */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/add-product')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <Add />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Add Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/sales/new')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
              }}>
                <ArrowForward />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                Sell
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/products')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <PriceChange />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Update Price
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card 
            onClick={() => navigate('/dashboard/reports')}
            sx={{ 
              borderRadius: 2, 
              cursor: 'pointer',
              bgcolor: '#e3f2fd',
              '&:hover': { boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: 'primary.main',
              }}>
                <InsertChart />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Report
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  // Render based on user role
  if (userRole === 'Manager') {
    return renderManagerDashboard();
  } else if (userRole === 'Sales Clerk' || userRole === 'Clerk') {
    return renderSalesClerkDashboard();
  } else {
    return renderOwnerDashboard();
  }
}

export default Dashboard;