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
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Remove,
  Delete,
  QrCodeScanner,
  Notifications,
  MoreVert,
} from '@mui/icons-material';

function NewSale() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [saleNumber, setSaleNumber] = useState('Sale 1');
  const [items, setItems] = useState([
    { id: 1, name: 'Soup', price: 230, quantity: 2, total: 460, image: '🍲' },
    { id: 2, name: 'Milk', price: 400, quantity: 4, total: 1600, image: '🥛' },
    { id: 3, name: 'Bag', price: 300, quantity: 1, total: 300, image: '👜' },
    { id: 4, name: 'Shoes leather shoes', price: 1520, quantity: 5, total: 7600, image: '👞' },
  ]);
  const [discount, setDiscount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discount ? (discountType === 'percentage' ? (subtotal * parseFloat(discount)) / 100 : parseFloat(discount)) : 0;
  const total = subtotal - discountAmount;

  const updateQuantity = (itemId, change) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity, total: newQuantity * item.price };
      }
      return item;
    }));
  };

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleDiscountApply = () => {
    setDiscount(discountValue);
    setShowDiscountDialog(false);
  };

  const handleCompleteSale = () => {
    // Create sale record
    const sale = {
      id: Date.now(),
      items: items,
      subtotal: subtotal,
      discount: discountAmount,
      total: total,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
      saleNumber: saleNumber,
      customer: 'Walk-in Customer',
      staff: 'Current User',
      status: 'completed',
    };

    // Store in localStorage
    const sales = JSON.parse(localStorage.getItem('sales') || '[]');
    sales.push(sale);
    localStorage.setItem('sales', JSON.stringify(sales));

    // Navigate to receipt
    navigate(`/dashboard/sales/receipt/${sale.id}`, { state: { sale, fromNewSale: true } });
  };

  const handleBack = () => {
    navigate('/dashboard/sales');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 'none', p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <IconButton 
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          New Sale
        </Typography>
        <IconButton>
          <QrCodeScanner />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
      </Box>

      {/* Sale Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={0} variant="scrollable" scrollButtons="auto">
          <Tab label="Sale 1" sx={{ backgroundColor: 'primary.main', color: 'white', borderRadius: 3, mx: 0.5 }} />
          <Tab label="Sale 2" />
          <Tab label="Sale 3" />
          <Tab label="Sale 4" />
          <Tab label="+ Sale" />
        </Tabs>
      </Box>

      {/* Add Manually Button */}
      <Button
        variant="outlined"
        startIcon={<QrCodeScanner />}
        fullWidth
        sx={{ mb: 2, py: 1.5, borderRadius: 2 }}
      >
        Add Manually
      </Button>

      {/* Items List */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Items in Cart
      </Typography>

      <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
        {items.map((item) => (
          <Card key={item.id} sx={{ mb: 2, borderRadius: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ fontSize: '2rem', mr: 2 }}>{item.image}</Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₦{item.price} / item
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ₦{item.total}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => removeItem(item.id)}>
                  <Delete />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}>
                    <Remove />
                  </IconButton>
                  <Typography variant="body1" sx={{ minWidth: 20, textAlign: 'center' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}>
                    <Add />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Summary */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">₦{subtotal.toLocaleString()}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Button
            variant="text"
            size="small"
            onClick={() => setShowDiscountDialog(true)}
            sx={{ textTransform: 'none', color: 'primary.main' }}
          >
            Discount / Promo
          </Button>
          {discountAmount > 0 && (
            <Typography variant="body1" color="error">
              -₦{discountAmount.toLocaleString()}
            </Typography>
          )}
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Payment Method"
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Transfer">Transfer</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">₦{total.toLocaleString()}</Typography>
        </Box>
      </Paper>

      {/* Complete Sale Button */}
      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleCompleteSale}
        sx={{
          py: 2,
          borderRadius: 3,
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Complete Sale
      </Button>

      {/* Discount Dialog */}
      <Dialog open={showDiscountDialog} onClose={() => setShowDiscountDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Discount / Promo</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Quantity</Typography>
            <TextField
              type="number"
              defaultValue="1"
              fullWidth
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body2" sx={{ mb: 1 }}>Discount by percentage</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {['5', '10', '15'].map((percent) => (
              <Button
                key={percent}
                variant="outlined"
                size="small"
                onClick={() => setDiscountValue(percent)}
                sx={{ borderRadius: 2 }}
              >
                {percent}%
              </Button>
            ))}
          </Box>

          <Typography variant="body2" sx={{ mb: 1 }}>Discount by price</Typography>
          <TextField
            label="₦ 0.00"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDiscountDialog(false)}>Cancel</Button>
          <Button onClick={handleDiscountApply} variant="contained">Apply</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default NewSale;