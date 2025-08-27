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
  Paper,
  Grid,
} from '@mui/material';
import {
  Warning,
  Add,
  ChevronRight,
  ArrowCircleRight,
  Menu as MenuIcon,
  Notifications,
  CloudDone,
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

  const handleNavigate = (path) => {
    navigate(path);
  };

  const ActionCard = ({ title, icon, color = 'primary.main', highlighted = false, onClick }) => (
    <Card 
      onClick={onClick}
      sx={{ 
        borderRadius: 3, 
        bgcolor: highlighted ? 'primary.main' : 'background.paper',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', py: 3 }}>
        <Box sx={{
          width: 48, 
          height: 48, 
          borderRadius: '50%', 
          mx: 'auto', 
          mb: 1.5,
          bgcolor: highlighted ? 'rgba(255,255,255,0.2)' : 'action.hover',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: highlighted ? 'white' : color,
        }}>
          {icon}
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600,
            color: highlighted ? 'white' : 'text.primary',
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here's your inventory snapshot.
          </Typography>
        </Box>
        <Chip 
          label={userRole} 
          color="warning" 
          sx={{ 
            fontWeight: 'bold',
            '& .MuiChip-label': {
              color: 'white',
            },
          }}
        />
      </Box>

      {/* Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
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
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Total Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ₦{dashboardData.totalValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Low Stock Alert */}
      <Card sx={{ 
        borderRadius: 3, 
        bgcolor: '#ffebee', 
        border: '1px solid #f44336',
        mb: 3,
        cursor: 'pointer',
      }} onClick={() => navigate('/dashboard/alerts')}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Warning sx={{ color: 'error.main', mr: 1 }} />
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
      </Card>

      {/* Today's Sales */}
      <Card sx={{ borderRadius: 3, mb: 3, cursor: 'pointer' }} onClick={() => navigate('/dashboard/sales')}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                <AttachMoney />
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
      </Card>

      {/* Quick Actions */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <ActionCard
            title="Add Stock"
            icon={<Add />}
            onClick={() => navigate('/dashboard/add-product')}
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Sell"
            icon={<ArrowCircleRight />}
            highlighted={true}
            onClick={() => navigate('/dashboard/sales/new')}
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Update Price"
            icon={<PriceChange />}
            onClick={() => navigate('/dashboard/products')}
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Report"
            icon={<InsertChart />}
            onClick={() => navigate('/dashboard/reports')}
          />
        </Grid>
      </Grid>

      {/* Sync Status */}
      <Card sx={{ borderRadius: 3, bgcolor: '#e8f5e8' }}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CloudDone sx={{ color: 'success.main', mr: 1 }} />
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              Synced
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Dashboard;