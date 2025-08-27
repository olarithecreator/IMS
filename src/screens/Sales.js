import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Fab,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  ChevronRight,
  Notifications,
} from '@mui/icons-material';

function Sales() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    startDate: '',
    endDate: '',
    paymentMethod: 'All',
    staff: 'All',
  });

  // Sample sales data - in real app this would come from localStorage or API
  const [sales, setSales] = useState([
    {
      id: 1,
      items: '3 x Coke 50 cl, 2 x Biscuit...',
      customer: 'Ade',
      amount: 1500,
      time: '10:30 AM',
      avatar: '👨‍💼',
    },
    {
      id: 2,
      items: '1 x Bread, 1 x Milk',
      customer: 'Chidi',
      amount: 750,
      time: '11:15 AM',
      avatar: '👩‍💼',
    },
    {
      id: 3,
      items: '2 x Water 1L, 1 x Juice',
      customer: 'Ade',
      amount: 1200,
      time: '12:45 PM',
      avatar: '👨‍💼',
    },
    {
      id: 4,
      items: '4 x Snacks, 2 x Soda',
      customer: 'Chidi',
      amount: 2000,
      time: '01:30 PM',
      avatar: '👩‍💼',
    },
    {
      id: 5,
      items: '1 x Rice, 1 x Beans',
      customer: 'Ade',
      amount: 1800,
      time: '02:15 PM',
      avatar: '👨‍💼',
    },
  ]);

  useEffect(() => {
    // Load sales from localStorage
    const savedSales = JSON.parse(localStorage.getItem('sales') || '[]');
    if (savedSales.length > 0) {
      setSales(savedSales.map(sale => ({
        id: sale.id,
        items: sale.items?.map(item => `${item.quantity} x ${item.name}`).join(', ') || 'Items',
        customer: 'Customer',
        amount: sale.total || 0,
        time: new Date(sale.date).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: '👤',
      })));
    }
  }, []);

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

  const filteredSales = sales.filter(sale =>
    sale.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Sales
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ flex: 1, py: 2, overflow: 'auto' }}>
        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#f5f5f5',
              },
            }}
          />
          <IconButton
            onClick={() => setFilterOpen(true)}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              bgcolor: '#f5f5f5',
            }}
          >
            <FilterList />
          </IconButton>
        </Box>

        {/* Sales List */}
        <List sx={{ px: 0 }}>
          {filteredSales.map((sale) => (
            <Paper
              key={sale.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
              onClick={() => handleSaleClick(sale)}
            >
              <ListItem sx={{ py: 2 }}>
                <Avatar sx={{ mr: 2, width: 50, height: 50, fontSize: '1.5rem', bgcolor: '#e3f2fd' }}>
                  {sale.avatar}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {sale.items}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    by {sale.customer}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                      ₦{sale.amount?.toLocaleString() || '0'} • {sale.time}
                    </Typography>
                    <ChevronRight color="action" />
                  </Box>
                </Box>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Container>

      {/* New Sale Button */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Add />}
          onClick={handleNewSale}
          sx={{
            py: 2,
            borderRadius: 3,
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            mb: 8, // Space for bottom navigation
          }}
        >
          New Sale
        </Button>
      </Box>

      {/* Filter Dialog */}
      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', pb: 1 }}>
          Filter
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Start Date"
              type="date"
              value={filterData.startDate}
              onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="End Date"
              type="date"
              value={filterData.endDate}
              onChange={(e) => setFilterData({ ...filterData, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>All</Typography>
            <Box sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: '#1976d2',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'white',
              },
            }} />
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={filterData.paymentMethod}
              onChange={(e) => setFilterData({ ...filterData, paymentMethod: e.target.value })}
              label="Payment Method"
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="Transfer">Transfer</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Staff</InputLabel>
            <Select
              value={filterData.staff}
              onChange={(e) => setFilterData({ ...filterData, staff: e.target.value })}
              label="Staff"
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Ade">Ade</MenuItem>
              <MenuItem value="Chidi">Chidi</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={clearFilter}
              sx={{ 
                borderRadius: 3,
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Clear
            </Button>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={applyFilter}
              sx={{ 
                borderRadius: 3,
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Apply
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Sales;