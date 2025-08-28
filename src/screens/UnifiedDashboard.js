import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Paper,
  Stack,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  KeyboardArrowRight,
  Store,
  Group,
  Analytics,
  Settings,
  Today,
  Notifications,
} from '@mui/icons-material';
import { getCurrentUser, getProducts, getSales, getSettings, initializeUserData } from '../utils/localStorage';

// Enhanced Metric Card Component
const MetricCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary', onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
          borderColor: `${color}.200`,
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: { xs: 2, lg: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 0.5, color: `${color}.main` }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.100`, color: `${color}.600`, width: { xs: 48, lg: 56 }, height: { xs: 48, lg: 56 } }}>
            {icon}
          </Avatar>
        </Box>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {trend === 'up' ? (
              <TrendingUp sx={{ color: 'success.main', fontSize: 20, mr: 0.5 }} />
            ) : (
              <TrendingDown sx={{ color: 'error.main', fontSize: 20, mr: 0.5 }} />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                color: trend === 'up' ? 'success.main' : 'error.main',
                fontWeight: 600 
              }}
            >
              {trendValue}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Quick Action Component
const QuickActionCard = ({ label, icon, color = 'primary', onClick, disabled = false }) => {
  return (
    <Card 
      sx={{ 
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': !disabled ? {
          transform: 'scale(1.02)',
          boxShadow: 4,
          borderColor: `${color}.200`,
        } : {},
      }}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent sx={{ textAlign: 'center', py: { xs: 2, lg: 2.5 } }}>
        <Avatar
          sx={{
            bgcolor: `${color}.100`,
            color: `${color}.600`,
            width: { xs: 40, lg: 48 },
            height: { xs: 40, lg: 48 },
            mx: 'auto',
            mb: 1.5,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', lg: '0.875rem' } }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

function UnifiedDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalStock: 0,
    totalValue: 0,
    lowStockCount: 0,
    todaySales: 0,
    todaySalesAmount: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Load user data
      const user = getCurrentUser();
      console.log('Current user:', user);
      setCurrentUser(user);
      
      // Initialize user data if needed
      if (user?.id) {
        initializeUserData(user.id);
      }
      
      // Load dashboard data
      const products = getProducts();
      const sales = getSales();
      const settings = getSettings();
      
      console.log('Products loaded:', products.length);
      console.log('Sales loaded:', sales.length);
      
      const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
      const totalValue = products.reduce((sum, product) => sum + ((product.price || 0) * (product.stock || 0)), 0);
      const lowStockThreshold = settings.lowStockThreshold || 10;
      const lowStock = products.filter(product => (product.stock || 0) <= lowStockThreshold);
      
      const today = new Date().toDateString();
      const todaySales = sales.filter(sale => new Date(sale.date).toDateString() === today);
      const todaySalesAmount = todaySales.reduce((sum, sale) => sum + (sale.total || 0), 0);
      
      const data = {
        totalStock,
        totalValue,
        lowStockCount: lowStock.length,
        todaySales: todaySales.length,
        todaySalesAmount,
      };
      
      console.log('Dashboard data calculated:', data);
      
      setDashboardData(data);
      setLowStockProducts(lowStock);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
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
    }).format(amount || 0);
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

  if (currentUser?.role === 'owner') {
    quickActions.push(
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
      }
    );
  }

  const recentActivities = [
    {
      title: 'New sale completed',
      details: '₦25,000 • iPhone 13 Pro',
      time: '2 minutes ago',
      status: 'Completed',
      statusColor: 'success',
      icon: <ShoppingCart fontSize="small" />,
      color: 'success',
    },
    {
      title: 'Stock updated',
      details: '+50 units • Samsung Galaxy S21',
      time: '1 hour ago',
      status: 'Updated',
      statusColor: 'info',
      icon: <Inventory2 fontSize="small" />,
      color: 'primary',
    },
    {
      title: 'Low stock alert',
      details: '5 units left • Nike Air Max 270',
      time: '3 hours ago',
      status: 'Warning',
      statusColor: 'warning',
      icon: <Warning fontSize="small" />,
      color: 'warning',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="h6">Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
              {getGreeting()}, {currentUser?.firstName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {currentUser?.role === 'owner' ? 'Here\'s your business overview for today' : 
               currentUser?.role === 'manager' ? 'Here\'s your store overview for today' : 
               'Here\'s your sales dashboard for today'}
            </Typography>
          </Box>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={<Today />}
                label={new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
              <IconButton 
                sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}
                onClick={() => navigate('/dashboard/notifications')}
              >
                <Notifications />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} lg={3}>
          <MetricCard
            title="Total Products"
            value={dashboardData.totalStock.toLocaleString()}
            subtitle="Active inventory"
            icon={<Inventory2 />}
            onClick={() => navigate('/dashboard/products')}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <MetricCard
            title="Inventory Value"
            value={formatCurrency(dashboardData.totalValue)}
            subtitle="Total stock value"
            icon={<AttachMoney />}
            color="success"
            onClick={() => navigate('/dashboard/products')}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <MetricCard
            title="Today's Sales"
            value={dashboardData.todaySales.toString()}
            subtitle={formatCurrency(dashboardData.todaySalesAmount)}
            icon={<ShoppingCart />}
            color="primary"
            trend="up"
            trendValue="+12% from yesterday"
            onClick={() => navigate('/dashboard/sales')}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <MetricCard
            title="Low Stock Items"
            value={dashboardData.lowStockCount.toString()}
            subtitle="Require attention"
            icon={<Warning />}
            color="warning"
            onClick={() => navigate('/dashboard/alerts')}
          />
        </Grid>
      </Grid>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 4, borderRadius: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => navigate('/dashboard/alerts')}
              sx={{ textTransform: 'none' }}
            >
              View All ({lowStockProducts.length})
            </Button>
          }
        >
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            Low Stock Alert
          </Typography>
          <Typography variant="body2">
            {lowStockProducts.length} products are running low on stock and need restocking.
          </Typography>
        </Alert>
      )}

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <QuickActionCard {...action} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recent Activity */}
      <Paper sx={{ borderRadius: 2 }}>
        <Box sx={{ p: 3, pb: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Recent Activity
            </Typography>
            <Button 
              size="small" 
              onClick={() => navigate('/dashboard/notifications')}
              endIcon={<KeyboardArrowRight />}
              sx={{ textTransform: 'none' }}
            >
              View All
            </Button>
          </Box>
        </Box>
        
        {isMobile ? (
          // Mobile: Stack layout
          <Box sx={{ p: 3, pt: 0 }}>
            <Stack spacing={2}>
              {recentActivities.map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Avatar sx={{ bgcolor: `${activity.color}.100`, color: `${activity.color}.600`, width: 32, height: 32, mr: 2 }}>
                    {activity.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {activity.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.details} • {activity.time}
                    </Typography>
                  </Box>
                  <Chip 
                    label={activity.status}
                    color={activity.statusColor}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        ) : (
          // Desktop: Table layout
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: `${activity.color}.100`, color: `${activity.color}.600`, width: 32, height: 32, mr: 2 }}>
                          {activity.icon}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {activity.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {activity.details}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={activity.status}
                        color={activity.statusColor}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
    </Box>
  );
}

export default UnifiedDashboard;