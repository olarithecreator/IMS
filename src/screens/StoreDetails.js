import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Avatar,
  Chip,
  Paper,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Store,
  Edit,
  LocationOn,
  Phone,
  Email,
  Person,
  TrendingUp,
  Assessment,
  Inventory2,
  Group,
  AttachMoney,
  ShoppingCart,
  Warning,
} from '@mui/icons-material';
import { getCurrentUser, getCompanies, getProducts, getSales } from '../utils/localStorage';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`store-tabpanel-${index}`}
      aria-labelledby={`store-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function StoreDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { storeId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [currentUser, setCurrentUser] = useState(null);
  const [store, setStore] = useState(null);
  const [company, setCompany] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [storeStats, setStoreStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStockItems: 0,
    staffCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoreData();
  }, [storeId]);

  const loadStoreData = () => {
    try {
      const user = getCurrentUser();
      setCurrentUser(user);
      
      const companies = getCompanies();
      const userCompany = companies.find(c => c.owner === user?.id || c.id === user?.companyId);
      
      if (userCompany) {
        setCompany(userCompany);
        const foundStore = userCompany.stores?.find(s => s.id === parseInt(storeId));
        if (foundStore) {
          setStore(foundStore);
          calculateStoreStats(foundStore);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading store data:', error);
      setLoading(false);
    }
  };

  const calculateStoreStats = (storeData) => {
    // Mock calculations - in real app, filter by store
    const products = getProducts();
    const sales = getSales();
    
    const stats = {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum, sale) => sum + (sale.total || 0), 0),
      totalProducts: products.length,
      lowStockItems: products.filter(p => (p.stock || 0) <= 10).length,
      staffCount: 5, // Mock staff count
    };
    
    setStoreStats(stats);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const recentSales = [
    { id: 1, customer: 'John Doe', amount: 25000, items: 2, date: '2024-01-15', time: '10:30 AM' },
    { id: 2, customer: 'Jane Smith', amount: 45000, items: 1, date: '2024-01-15', time: '11:15 AM' },
    { id: 3, customer: 'Mike Johnson', amount: 12000, items: 3, date: '2024-01-15', time: '2:45 PM' },
  ];

  const topProducts = [
    { id: 1, name: 'iPhone 13 Pro', sales: 25, revenue: 8750000 },
    { id: 2, name: 'Samsung Galaxy S21', sales: 18, revenue: 5040000 },
    { id: 3, name: 'AirPods Pro', sales: 30, revenue: 2550000 },
  ];

  const staffMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Store Manager', status: 'active', sales: 45 },
    { id: 2, name: 'Bob Smith', role: 'Sales Associate', status: 'active', sales: 32 },
    { id: 3, name: 'Carol Brown', role: 'Cashier', status: 'active', sales: 28 },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="h6">Loading store details...</Typography>
      </Box>
    );
  }

  if (!store) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Store not found
        </Typography>
        <Button onClick={() => navigate('/dashboard/stores')}>
          Back to Stores
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton 
            onClick={() => navigate('/dashboard/stores')}
            sx={{ mr: 1 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold' }}>
            {store.name}
          </Typography>
        </Box>
        
        {/* Store Info Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.100',
                    color: 'primary.600',
                    width: 64,
                    height: 64,
                    mr: 3,
                  }}
                >
                  <Store sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {store.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      label={store.status || 'active'}
                      size="small"
                      color={store.status === 'active' ? 'success' : 'default'}
                    />
                    <Chip
                      label={store.type || 'retail'}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              </Box>
              
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => navigate(`/dashboard/stores/edit/${store.id}`)}
              >
                Edit Store
              </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  {store.address && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
                      <Typography variant="body2">{store.address}</Typography>
                    </Box>
                  )}
                  {store.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Phone sx={{ mr: 2, color: 'text.secondary' }} />
                      <Typography variant="body2">{store.phone}</Typography>
                    </Box>
                  )}
                  {store.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Email sx={{ mr: 2, color: 'text.secondary' }} />
                      <Typography variant="body2">{store.email}</Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.50' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {storeStats.totalSales}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Sales
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.50' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        {formatCurrency(storeStats.totalRevenue).slice(0, -3)}K
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Revenue
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.50' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                        {storeStats.totalProducts}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Products
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.50' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                        {storeStats.staffCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Staff
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label="Sales" />
          <Tab label="Products" />
          <Tab label="Staff" />
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Key Metrics */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Key Metrics
              </Typography>
              <Stack spacing={2}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.100', color: 'primary.600', mr: 2 }}>
                    <ShoppingCart />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Today's Sales
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(125000)}
                    </Typography>
                  </Box>
                </Paper>
                
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'success.100', color: 'success.600', mr: 2 }}>
                    <TrendingUp />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      This Month
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(2750000)}
                    </Typography>
                  </Box>
                </Paper>
                
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'warning.100', color: 'warning.600', mr: 2 }}>
                    <Warning />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Low Stock Items
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {storeStats.lowStockItems}
                    </Typography>
                  </Box>
                </Paper>
              </Stack>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Recent Activity
              </Typography>
              <Stack spacing={2}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    New sale completed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₦25,000 • iPhone 13 Pro • 10 minutes ago
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Stock updated
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +50 units • Samsung Galaxy S21 • 1 hour ago
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Staff member clocked in
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alice Johnson • 3 hours ago
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Sales Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Recent Sales
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.id} hover>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{formatCurrency(sale.amount)}</TableCell>
                    <TableCell>{sale.items}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Products Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Top Selling Products
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Units Sold</TableCell>
                  <TableCell>Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>{formatCurrency(product.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Staff Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Staff Members
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Sales This Month</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffMembers.map((staff) => (
                  <TableRow key={staff.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                          {staff.name.charAt(0)}
                        </Avatar>
                        {staff.name}
                      </Box>
                    </TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={staff.status}
                        size="small"
                        color={staff.status === 'active' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{staff.sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default StoreDetails;