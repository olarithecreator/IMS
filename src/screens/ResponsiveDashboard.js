import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Paper,
  Stack,
  Divider,
  Alert,
  Fab,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Inventory2,
  AttachMoney,
  Warning,
  ShoppingCart,
  Add,
  QrCodeScanner,
  Assessment,
  Notifications,
  KeyboardArrowRight,
  LocalShipping,
  Group,
  Store,
} from '@mui/icons-material';
import { getCurrentUser, getProducts, getSales, getSettings } from '../utils/localStorage';

// Metric Card Component
const MetricCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary', onClick, action }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {title}
            </Typography>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.100`, color: `${color}.600`, width: 48, height: 48 }}>
            {icon}
          </Avatar>
        </Box>
        
        {(trend || action) && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {trend === 'up' ? (
                  <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                )}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: trend === 'up' ? 'success.main' : 'error.main',
                    fontWeight: 600 
                  }}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
            {action && (
              <IconButton size="small" sx={{ ml: 'auto' }}>
                <KeyboardArrowRight />
              </IconButton>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ label, icon, color = 'primary', onClick, disabled = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card 
      sx={{ 
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        '&:hover': !disabled ? {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[4],
        } : {},
      }}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent sx={{ textAlign: 'center', py: { xs: 2, sm: 3 } }}>
        <Avatar
          sx={{
            bgcolor: `${color}.100`,
            color: `${color}.600`,
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            mx: 'auto',
            mb: 1.5,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Low Stock Alert Component
const LowStockAlert = ({ products, onViewAll }) => {
  const theme = useTheme();
  const lowStockProducts = products.slice(0, 3); // Show first 3
  
  if (lowStockProducts.length === 0) return null;
  
  return (
    <Alert 
      severity="warning" 
      sx={{ 
        borderRadius: 2,
        '& .MuiAlert-message': { width: '100%' }
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Low Stock Alert
        </Typography>
        <Stack spacing={1}>
          {lowStockProducts.map((product, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                {product.name}
              </Typography>
              <Chip 
                label={`${product.stock} left`}
                size="small"
                color="warning"
                variant="outlined"
              />
            </Box>
          ))}
        </Stack>
        {products.length > 3 && (
          <Button 
            size="small" 
            onClick={onViewAll}
            sx={{ mt: 1, fontSize: '0.75rem' }}
          >
            View All ({products.length})
          </Button>
        )}
      </Box>
    </Alert>
  );
};

function ResponsiveDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalStock: 0,
    totalValue: 0,
    lowStockCount: 0,
    todaySales: 0,
    todaySalesAmount: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    // Load user data
    const user = getCurrentUser();
    setCurrentUser(user);
    
    // Load dashboard data
    const products = getProducts();
    const sales = getSales();
    const settings = getSettings();
    
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const lowStockThreshold = settings.lowStockThreshold || 10;
    const lowStock = products.filter(product => product.stock <= lowStockThreshold);
    
    const today = new Date().toDateString();
    const todaySales = sales.filter(sale => new Date(sale.date).toDateString() === today);
    const todaySalesAmount = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    
    setDashboardData({
      totalStock,
      totalValue,
      lowStockCount: lowStock.length,
      todaySales: todaySales.length,
      todaySalesAmount,
    });
    
    setLowStockProducts(lowStock);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const quickActions = [
    {
      label: 'New Sale',
      icon: <ShoppingCart />,
      color: 'primary',
      onClick: () => navigate('/dashboard/sales/new'),
    },
    {
      label: 'Scan Product',
      icon: <QrCodeScanner />,
      color: 'secondary',
      onClick: () => navigate('/dashboard/scan'),
    },
    {
      label: 'Add Product',
      icon: <Add />,
      color: 'success',
      onClick: () => navigate('/dashboard/products/add'),
      disabled: currentUser?.role === 'staff',
    },
    {
      label: 'View Reports',
      icon: <Assessment />,
      color: 'info',
      onClick: () => navigate('/dashboard/reports'),
      disabled: currentUser?.role === 'staff',
    },
  ];

  const ownerActions = [
    {
      label: 'Manage Stores',
      icon: <Store />,
      color: 'warning',
      onClick: () => navigate('/dashboard/stores'),
    },
    {
      label: 'Staff & Roles',
      icon: <Group />,
      color: 'info',
      onClick: () => navigate('/dashboard/staff'),
    },
  ];

  if (currentUser?.role === 'owner') {
    quickActions.push(...ownerActions);
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
          {getGreeting()}, {currentUser?.firstName || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {currentUser?.role === 'owner' ? 'Here\'s your business overview' : 
           currentUser?.role === 'manager' ? 'Here\'s your store overview' : 
           'Here\'s your sales dashboard'}
        </Typography>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={6} md={3}>
          <MetricCard
            title="Total Products"
            value={dashboardData.totalStock.toLocaleString()}
            icon={<Inventory2 />}
            onClick={() => navigate('/dashboard/products')}
            action
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <MetricCard
            title="Inventory Value"
            value={formatCurrency(dashboardData.totalValue)}
            icon={<AttachMoney />}
            color="success"
            onClick={() => navigate('/dashboard/products')}
            action
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <MetricCard
            title="Today's Sales"
            value={dashboardData.todaySales.toString()}
            subtitle={formatCurrency(dashboardData.todaySalesAmount)}
            icon={<ShoppingCart />}
            color="primary"
            trend="up"
            trendValue="+12% from yesterday"
            onClick={() => navigate('/dashboard/sales')}
            action
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <MetricCard
            title="Low Stock Items"
            value={dashboardData.lowStockCount.toString()}
            icon={<Warning />}
            color="warning"
            onClick={() => navigate('/dashboard/alerts')}
            action
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 3, sm: 4 }, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {quickActions.map((action, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <QuickActionButton {...action} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <LowStockAlert 
            products={lowStockProducts}
            onViewAll={() => navigate('/dashboard/alerts')}
          />
        </Box>
      )}

      {/* Recent Activity */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Recent Activity
          </Typography>
          <Button 
            size="small" 
            onClick={() => navigate('/dashboard/notifications')}
            endIcon={<KeyboardArrowRight />}
          >
            View All
          </Button>
        </Box>
        
        <Stack spacing={2} divider={<Divider />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'success.100', color: 'success.600', width: 32, height: 32, mr: 2 }}>
              <ShoppingCart fontSize="small" />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                New sale completed
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ₦25,000 • 2 minutes ago
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.100', color: 'primary.600', width: 32, height: 32, mr: 2 }}>
              <Inventory2 fontSize="small" />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Stock updated for Samsung Galaxy S21
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +50 units • 1 hour ago
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'warning.100', color: 'warning.600', width: 32, height: 32, mr: 2 }}>
              <Warning fontSize="small" />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Low stock alert for iPhone 13
              </Typography>
              <Typography variant="caption" color="text.secondary">
                5 units left • 3 hours ago
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="new sale"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: theme.zIndex.speedDial,
          }}
          onClick={() => navigate('/dashboard/sales/new')}
        >
          <Add />
        </Fab>
      )}
    </Container>
  );
}

export default ResponsiveDashboard;