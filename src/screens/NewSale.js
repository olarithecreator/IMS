import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
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
  Grid,
  Avatar,
  Badge,
  Stack,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  Fab,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Remove,
  Delete,
  QrCodeScanner,
  Search,
  ShoppingCart,
  Receipt,
  Payment,
  ExpandMore,
  LocalOffer,
  PersonAdd,
  CheckCircle,
  Clear,
  AttachMoney,
  CreditCard,
  AccountBalance,
  Smartphone,
} from '@mui/icons-material';
import { getStoreProducts, getCurrentStore, getCurrentUser } from '../utils/localStorage';

function NewSale() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Core state
  const [currentStore, setCurrentStore] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  // Customer and payment
  const [customer, setCustomer] = useState({ name: 'Walk-in Customer', phone: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashReceived, setCashReceived] = useState('');
  
  // Discount
  const [discount, setDiscount] = useState({ type: 'none', value: 0 });
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [discountInput, setDiscountInput] = useState({ type: 'percentage', value: '' });
  
  // Dialogs
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    try {
      const user = getCurrentUser();
      const store = getCurrentStore();
      
      setCurrentUser(user);
      setCurrentStore(store);
      
      if (store) {
        const storeProducts = getStoreProducts(store.id);
        setProducts(storeProducts);
        setFilteredProducts(storeProducts);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter products based on search
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode?.includes(searchQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    if (product.stock <= 0) {
      setSnackbar({
        open: true,
        message: `${product.name} is out of stock`,
        severity: 'error'
      });
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        setSnackbar({
          open: true,
          message: `Only ${product.stock} units available`,
          severity: 'warning'
        });
        return;
      }
      
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity,
        sku: product.sku,
        stock: product.stock
      }]);
    }
    
    setSnackbar({
      open: true,
      message: `${product.name} added to cart`,
      severity: 'success'
    });
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    const product = products.find(p => p.id === id);
    if (product && newQuantity > product.stock) {
      setSnackbar({
        open: true,
        message: `Only ${product.stock} units available`,
        severity: 'warning'
      });
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discount.type === 'percentage' 
    ? (subtotal * discount.value) / 100 
    : discount.type === 'fixed' 
    ? discount.value 
    : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const change = paymentMethod === 'cash' && cashReceived ? Math.max(0, parseFloat(cashReceived) - total) : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const handleBack = () => {
    navigate('/dashboard/sales');
  };

  const handleScanProduct = () => {
    navigate('/dashboard/scan');
  };

  const handleApplyDiscount = () => {
    if (discountInput.value && !isNaN(discountInput.value)) {
      setDiscount({
        type: discountInput.type,
        value: parseFloat(discountInput.value)
      });
      setShowDiscountDialog(false);
      setSnackbar({
        open: true,
        message: 'Discount applied',
        severity: 'success'
      });
    }
  };

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      setSnackbar({
        open: true,
        message: 'Add items to cart before completing sale',
        severity: 'warning'
      });
      return;
    }

    if (paymentMethod === 'cash' && (!cashReceived || parseFloat(cashReceived) < total)) {
      setSnackbar({
        open: true,
        message: 'Cash received is less than total amount',
        severity: 'error'
      });
      return;
    }

    // Create sale record
    const sale = {
      id: Date.now(),
      items: cart,
      customer: customer.name,
      customerDetails: customer,
      subtotal: subtotal,
      discount: discountAmount,
      total: total,
      paymentMethod: paymentMethod,
      cashReceived: paymentMethod === 'cash' ? parseFloat(cashReceived) : total,
      change: change,
      date: new Date().toISOString(),
      staff: currentUser?.firstName + ' ' + currentUser?.lastName || 'Staff',
      storeId: currentStore?.id,
      status: 'completed',
    };

    // Store in localStorage
    const sales = JSON.parse(localStorage.getItem('sales') || '[]');
    sales.push(sale);
    localStorage.setItem('sales', JSON.stringify(sales));

    // Navigate to receipt
    navigate(`/dashboard/sales/receipt/${sale.id}`, { state: { sale, fromNewSale: true } });
  };

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: <AttachMoney /> },
    { value: 'card', label: 'Card', icon: <CreditCard /> },
    { value: 'transfer', label: 'Bank Transfer', icon: <AccountBalance /> },
    { value: 'mobile', label: 'Mobile Payment', icon: <Smartphone /> },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 'none', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper sx={{ 
        p: 2, 
        mb: 2,
        borderRadius: 0,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 'bold' }}>
                New Sale
              </Typography>
              {currentStore && (
                <Typography variant="body2" color="text.secondary">
                  {currentStore.name}
                </Typography>
              )}
            </Box>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<QrCodeScanner />}
              onClick={handleScanProduct}
              size="small"
            >
              Scan
            </Button>
            
            <Badge badgeContent={cart.length} color="primary">
              <IconButton>
                <ShoppingCart />
              </IconButton>
            </Badge>
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ flex: 1, display: 'flex', gap: 2, p: 2, overflow: 'hidden' }}>
        {/* Left Panel - Products */}
        <Box sx={{ 
          flex: isMobile ? 1 : 2, 
          display: 'flex', 
          flexDirection: 'column',
          minWidth: 0
        }}>
          {/* Product Search */}
          <TextField
            fullWidth
            placeholder="Search products by name, SKU, or barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ mb: 2 }}
          />

          {/* Products Grid */}
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 1
          }}>
            {filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  {searchQuery ? 'No products found' : 'No products in store'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchQuery ? 'Try different search terms' : 'Add products to your store inventory'}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard/products/add')}
                  sx={{ mt: 2 }}
                >
                  Add Product
                </Button>
              </Box>
            ) : (
              <Grid container spacing={1}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                          borderColor: 'primary.main',
                        }
                      }}
                      onClick={() => addToCart(product)}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar
                            sx={{
                              bgcolor: 'primary.100',
                              color: 'primary.600',
                              width: 40,
                              height: 40,
                              mr: 1.5,
                              fontSize: '1.2rem'
                            }}
                          >
                            {product.name.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 600,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {product.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              SKU: {product.sku}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(product.price)}
                          </Typography>
                          <Chip
                            label={`Stock: ${product.stock}`}
                            size="small"
                            color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>

        {/* Right Panel - Cart & Checkout */}
        <Paper sx={{ 
          flex: 1,
          minWidth: isMobile ? 0 : 400,
          maxWidth: isMobile ? 'none' : 500,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Cart Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Cart ({cart.length})
              </Typography>
              {cart.length > 0 && (
                <Button
                  size="small"
                  onClick={clearCart}
                  startIcon={<Clear />}
                  color="error"
                >
                  Clear
                </Button>
              )}
            </Box>
            
            {/* Customer Info */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 1, 
                bgcolor: 'grey.50', 
                borderRadius: 1,
                cursor: 'pointer'
              }}
              onClick={() => setShowCustomerDialog(true)}
            >
              <PersonAdd sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ flex: 1 }}>
                {customer.name}
              </Typography>
              <Typography variant="caption" color="primary.main">
                Edit
              </Typography>
            </Box>
          </Box>

          {/* Cart Items */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
            {cart.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <ShoppingCart sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add products to start a sale
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {cart.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      p: 1
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {formatCurrency(item.price)} × {item.quantity}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {formatCurrency(item.total)}
                          </Typography>
                        </Box>
                      }
                    />
                    
                    <ListItemSecondaryAction>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconButton
                          size="small"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            minWidth: 24, 
                            textAlign: 'center',
                            fontWeight: 600
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        
                        <IconButton
                          size="small"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                        
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              {/* Subtotal */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
              </Box>

              {/* Discount */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">Discount:</Typography>
                  <IconButton
                    size="small"
                    onClick={() => setShowDiscountDialog(true)}
                    sx={{ ml: 0.5 }}
                  >
                    <LocalOffer fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="success.main">
                  -{formatCurrency(discountAmount)}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Total */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatCurrency(total)}
                </Typography>
              </Box>

              {/* Payment Method Selection */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label="Payment Method"
                  size="small"
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {method.icon}
                        <Typography sx={{ ml: 1 }}>{method.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Cash Payment Input */}
              {paymentMethod === 'cash' && (
                <TextField
                  fullWidth
                  label="Cash Received"
                  type="number"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  size="small"
                  sx={{ mb: 2 }}
                  helperText={change > 0 ? `Change: ${formatCurrency(change)}` : ''}
                />
              )}

              {/* Complete Sale Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Receipt />}
                onClick={handleCompleteSale}
                disabled={cart.length === 0}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                Complete Sale
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Customer Dialog */}
      <Dialog open={showCustomerDialog} onClose={() => setShowCustomerDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Customer Information</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Customer Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email Address"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCustomerDialog(false)}>Cancel</Button>
          <Button onClick={() => setShowCustomerDialog(false)} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Discount Dialog */}
      <Dialog open={showDiscountDialog} onClose={() => setShowDiscountDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply Discount</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <InputLabel>Discount Type</InputLabel>
            <Select
              value={discountInput.type}
              onChange={(e) => setDiscountInput({ ...discountInput, type: e.target.value })}
              label="Discount Type"
            >
              <MenuItem value="percentage">Percentage (%)</MenuItem>
              <MenuItem value="fixed">Fixed Amount (₦)</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label={discountInput.type === 'percentage' ? 'Percentage (%)' : 'Amount (₦)'}
            type="number"
            value={discountInput.value}
            onChange={(e) => setDiscountInput({ ...discountInput, value: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDiscountDialog(false)}>Cancel</Button>
          <Button onClick={handleApplyDiscount} variant="contained">Apply</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Mobile FAB for Scan */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="scan"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: theme.zIndex.speedDial,
          }}
          onClick={handleScanProduct}
        >
          <QrCodeScanner />
        </Fab>
      )}
    </Box>
  );
}

export default NewSale;