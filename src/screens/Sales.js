import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Fab,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  ChevronRight,
  Receipt,
  TrendingUp,
  AttachMoney,
  Today,
  Close,
  ShoppingCart,
} from '@mui/icons-material';
import { getSales, getCurrentStore } from '../utils/localStorage';

function Sales() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    startDate: '',
    endDate: '',
    paymentMethod: 'All',
    staff: 'All',
  });
  const [sales, setSales] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSalesData();
  }, []);

  const loadSalesData = () => {
    try {
      // Get current store context
      const store = getCurrentStore();
      setCurrentStore(store);
      
      // Load sales from localStorage
      const savedSales = getSales();
      
      if (savedSales.length > 0) {
        const formattedSales = savedSales.map(sale => ({
          id: sale.id,
          items: sale.items?.map(item => `${item.quantity} x ${item.name}`).join(', ') || 'Items',
          customer: sale.customer || 'Walk-in Customer',
          amount: sale.total || 0,
          date: new Date(sale.date),
          time: new Date(sale.date).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          paymentMethod: sale.paymentMethod || 'Cash',
          staff: sale.staff || 'Staff',
          status: sale.status || 'completed',
        }));
        setSales(formattedSales);
      } else {
        // Sample data if no sales exist
        setSales([
          {
            id: 1,
            items: '3 x Coke 50cl, 2 x Biscuit',
            customer: 'Walk-in Customer',
            amount: 1500,
            date: new Date(),
            time: '10:30 AM',
            paymentMethod: 'Cash',
            staff: 'Cashier',
            status: 'completed',
          },
          {
            id: 2,
            items: '1 x Bread, 1 x Milk',
            customer: 'John Doe',
            amount: 750,
            date: new Date(),
            time: '11:15 AM',
            paymentMethod: 'Card',
            staff: 'Sales Rep',
            status: 'completed',
          },
        ]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading sales data:', error);
      setLoading(false);
    }
  };

  const handleNewSale = () => {
    navigate('/dashboard/sales/new');
  };

  const handleSaleClick = (sale) => {
    navigate(`/dashboard/sales/receipt/${sale.id}`);
  };

  const applyFilter = () => {
    setFilterOpen(false);
    // Apply filter logic here
  };

  const clearFilter = () => {
    setFilterData({
      startDate: '',
      endDate: '',
      paymentMethod: 'All',
      staff: 'All',
    });
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPayment = filterData.paymentMethod === 'All' || 
                          sale.paymentMethod === filterData.paymentMethod;
    
    const matchesStaff = filterData.staff === 'All' || 
                        sale.staff === filterData.staff;
    
    let matchesDate = true;
    if (filterData.startDate && filterData.endDate) {
      const saleDate = sale.date;
      const startDate = new Date(filterData.startDate);
      const endDate = new Date(filterData.endDate);
      matchesDate = saleDate >= startDate && saleDate <= endDate;
    }
    
    return matchesSearch && matchesPayment && matchesStaff && matchesDate;
  });

  const calculateTotalSales = () => {
    return filteredSales.reduce((total, sale) => total + sale.amount, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="h6">Loading sales...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 'none', p: { xs: 2, sm: 3 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
          Sales Overview
        </Typography>
        {currentStore && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {currentStore.name} • {filteredSales.length} transactions
          </Typography>
        )}
        
        {/* Sales Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Receipt sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {filteredSales.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Sales
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent sx={{ p: '16px !important' }}>
                <AttachMoney sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(calculateTotalSales()).slice(0, -3)}K
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Revenue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent sx={{ p: '16px !important' }}>
                <TrendingUp sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {filteredSales.length > 0 ? Math.round(calculateTotalSales() / filteredSales.length) : 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg Sale
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Today sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Today
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        gap: 2, 
        mb: 3,
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <TextField
          fullWidth
          placeholder="Search sales by items or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 1, minWidth: { sm: 'auto' } }}>
          <IconButton
            onClick={() => setFilterOpen(true)}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
          >
            <FilterList />
          </IconButton>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleNewSale}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              minWidth: { xs: 'auto', sm: 140 },
              whiteSpace: 'nowrap',
            }}
          >
            {isMobile ? '' : 'New Sale'}
          </Button>
        </Box>
      </Box>

      {/* Sales List */}
      {filteredSales.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <ShoppingCart sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No sales found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm ? 'Try adjusting your search terms' : 'Start by making your first sale'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleNewSale}
            sx={{ borderRadius: 2 }}
          >
            Create New Sale
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {filteredSales.map((sale) => (
            <Grid item xs={12} sm={6} lg={4} key={sale.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8],
                    borderColor: 'primary.200',
                  },
                }}
                onClick={() => handleSaleClick(sale)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.100',
                        color: 'primary.600',
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Receipt />
                    </Avatar>
                    
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={sale.paymentMethod}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={sale.status}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </Stack>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatCurrency(sale.amount)}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {sale.items}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Customer
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {sale.customer}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Time
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {sale.time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Filter Dialog */}
      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: { borderRadius: isMobile ? 0 : 2 },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontWeight: 'bold',
        }}>
          Filter Sales
          <IconButton onClick={() => setFilterOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                value={filterData.startDate}
                onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                value={filterData.endDate}
                onChange={(e) => setFilterData({ ...filterData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={filterData.paymentMethod}
                  onChange={(e) => setFilterData({ ...filterData, paymentMethod: e.target.value })}
                  label="Payment Method"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="Transfer">Transfer</MenuItem>
                  <MenuItem value="Mobile">Mobile Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Staff Member</InputLabel>
                <Select
                  value={filterData.staff}
                  onChange={(e) => setFilterData({ ...filterData, staff: e.target.value })}
                  label="Staff Member"
                >
                  <MenuItem value="All">All Staff</MenuItem>
                  <MenuItem value="Cashier">Cashier</MenuItem>
                  <MenuItem value="Sales Rep">Sales Rep</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={clearFilter}
            sx={{ borderRadius: 2 }}
          >
            Clear Filters
          </Button>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={applyFilter}
            sx={{ borderRadius: 2 }}
          >
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mobile FAB */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add sale"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: theme.zIndex.speedDial,
          }}
          onClick={handleNewSale}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
}

export default Sales;