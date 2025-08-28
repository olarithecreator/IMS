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
  Paper,
  Stack,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
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
  Analytics,
  Today,
} from '@mui/icons-material';
import { getCurrentUser, getProducts, getSales, getSettings } from '../utils/localStorage';

// Enhanced Metric Card for Desktop
const DesktopMetricCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary', onClick, change }) => {
  const theme = useTheme();
  
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
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0.5, color: `${color}.main` }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.100`, color: `${color}.600`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
        
        {(trend || change) && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            {change && (
              <Typography variant="caption" color="text.secondary">
                {change}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Quick Actions Grid
const QuickActionsGrid = ({ actions, userRole }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card 
              sx={{ 
                cursor: action.disabled ? 'not-allowed' : 'pointer',
                opacity: action.disabled ? 0.6 : 1,
                transition: 'all 0.2s ease',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': !action.disabled ? {
                  transform: 'scale(1.02)',
                  boxShadow: 4,
                  borderColor: `${action.color}.200`,
                } : {},
              }}
              onClick={action.disabled ? undefined : action.onClick}
            >
              <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
                <Avatar
                  sx={{
                    bgcolor: `${action.color}.100`,
                    color: `${action.color}.600`,
                    width: 48,
                    height: 48,
                    mx: 'auto',
                    mb: 1.5,
                  }}
                >
                  {action.icon}
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {action.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

// Recent Activity Table
const RecentActivityTable = ({ activities, onViewAll }) => {
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Recent Activity
          </Typography>
          <Button 
            size="small" 
            onClick={onViewAll}
            endIcon={<KeyboardArrowRight />}
            sx={{ textTransform: 'none' }}
          >
            View All
          </Button>
        </Box>
      </Box>
      
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
            {activities.map((activity, index) => (
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
    </Paper>
  );
};

function DesktopDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalStock: 0,
    totalValue: 0,
    lowStockCount: 0,
    todaySales: 0,
    todaySalesAmount: 0,
    monthSales: 0,
    monthSalesAmount: 0,
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
    const thisMonth = new Date().getMonth();
    const todaySales = sales.filter(sale => new Date(sale.date).toDateString() === today);
    const monthSales = sales.filter(sale => new Date(sale.date).getMonth() === thisMonth);
    const todaySalesAmount = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const monthSalesAmount = monthSales.reduce((sum, sale) => sum + sale.total, 0);
    
    setDashboardData({
      totalStock,
      totalValue,
      lowStockCount: lowStock.length,
      todaySales: todaySales.length,
      todaySalesAmount,
      monthSales: monthSales.length,
      monthSalesAmount,
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
    {
      label: 'Analytics',
      icon: <Analytics />,
      color: 'primary',
      onClick: () => navigate('/dashboard/reports'),
    },
    {
      label: 'Settings',
      icon: <Inventory2 />,
      color: 'secondary',
      onClick: () => navigate('/dashboard/settings'),
    },
  ];

  if (currentUser?.role === 'owner') {
    quickActions.push(...ownerActions);
  }

  const recentActivities = [
    {
      title: 'New sale completed',
      details: '₦25,000 • Samsung Galaxy S21',
      time: '2 minutes ago',
      status: 'Completed',
      statusColor: 'success',
      icon: <ShoppingCart fontSize="small" />,
      color: 'success',
    },
    {
      title: 'Stock updated',
      details: '+50 units • iPhone 13 Pro',
      time: '1 hour ago',
      status: 'Updated',
      statusColor: 'info',
      icon: <Inventory2 fontSize="small" />,
      color: 'primary',
    },
    {
      title: 'Low stock alert',
      details: '5 units left • MacBook Air',
      time: '3 hours ago',
      status: 'Warning',
      statusColor: 'warning',
      icon: <Warning fontSize="small" />,
      color: 'warning',
    },
    {
      title: 'New staff request',
      details: 'John Doe applied as Manager',
      time: '5 hours ago',
      status: 'Pending',
      statusColor: 'secondary',
      icon: <Group fontSize="small" />,
      color: 'secondary',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', width: '100%' }}>
      <Container maxWidth="xl" sx={{ py: 4, width: '100%', maxWidth: 'none' }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {getGreeting()}, {currentUser?.firstName || 'User'}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentUser?.role === 'owner' ? 'Here\'s your business overview for today' : 
                 currentUser?.role === 'manager' ? 'Here\'s your store overview for today' : 
                 'Here\'s your sales dashboard for today'}
              </Typography>
            </Box>
            
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
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <DesktopMetricCard
              title="Total Products"
              value={dashboardData.totalStock.toLocaleString()}
              subtitle="Active inventory"
              icon={<Inventory2 />}
              onClick={() => navigate('/dashboard/products')}
              change="View all products"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <DesktopMetricCard
              title="Inventory Value"
              value={formatCurrency(dashboardData.totalValue)}
              subtitle="Total stock value"
              icon={<AttachMoney />}
              color="success"
              onClick={() => navigate('/dashboard/products')}
              change="Current valuation"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <DesktopMetricCard
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
          <Grid item xs={12} sm={6} lg={3}>
            <DesktopMetricCard
              title="Low Stock Items"
              value={dashboardData.lowStockCount.toString()}
              subtitle="Require attention"
              icon={<Warning />}
              color="warning"
              onClick={() => navigate('/dashboard/alerts')}
              change="Update stock levels"
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
        <Box sx={{ mb: 4 }}>
          <QuickActionsGrid actions={quickActions} userRole={currentUser?.role} />
        </Box>

        {/* Recent Activity */}
        <RecentActivityTable 
          activities={recentActivities}
          onViewAll={() => navigate('/dashboard/notifications')}
        />
      </Container>
    </Box>
  );
}

export default DesktopDashboard;