import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  LinearProgress
} from '@mui/material';
import {
  ShoppingCart,
  Add,
  Remove,
  Delete,
  Search,
  FilterList,
  TrendingUp,
  AttachMoney,
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  ArrowBack,
  ArrowForward,
  Receipt,
  Person,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Sales = () => {
  const { step = '10.0' } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderNotes, setOrderNotes] = useState('');

  // Mock data
  const mockProducts = [
    {
      id: '1',
      name: 'iPhone 14 Pro',
      price: 999.99,
      stock: 25,
      image: 'https://via.placeholder.com/80x80?text=iPhone',
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23',
      price: 899.99,
      stock: 18,
      image: 'https://via.placeholder.com/80x80?text=Galaxy',
      category: 'Electronics'
    },
    {
      id: '3',
      name: 'MacBook Air M2',
      price: 1199.99,
      stock: 12,
      image: 'https://via.placeholder.com/80x80?text=MacBook',
      category: 'Computers'
    }
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      date: '2024-01-15',
      total: 1999.98,
      status: 'completed',
      items: 2
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      date: '2024-01-14',
      total: 899.99,
      status: 'pending',
      items: 1
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      date: '2024-01-13',
      total: 2399.97,
      status: 'processing',
      items: 3
    }
  ];

  const addToCart = (product) => {
    const existingItem = selectedProducts.find(item => item.id === product.id);
    if (existingItem) {
      setSelectedProducts(selectedProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setSelectedProducts(selectedProducts.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalAmount = () => {
    return selectedProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderStepContent = () => {
    switch (step) {
      case '10.0':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Sales Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Overview of sales performance and recent orders.
            </Typography>
            
            {/* Sales Summary Cards */}
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <TrendingUp />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" color="primary">
                          $12,450
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Today's Sales
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                        <ShoppingCart />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" color="success.main">
                          24
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Orders Today
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                        <LocalShipping />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" color="warning.main">
                          8
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pending Orders
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                        <AttachMoney />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" color="info.main">
                          $89,230
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Month to Date
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Recent Orders */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Orders
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell align="right">${order.total}</TableCell>
                          <TableCell>
                            <Chip 
                              label={order.status} 
                              color={
                                order.status === 'completed' ? 'success' :
                                order.status === 'pending' ? 'warning' :
                                'info'
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        );

      case '10.1':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Create New Sale
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Add products to cart and process customer orders.
            </Typography>
            
            <Grid container spacing={3}>
              {/* Product Selection */}
              <Grid item xs={12} md={8}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Available Products
                    </Typography>
                    <TextField
                      fullWidth
                      label="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      variant="outlined"
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: <Search />
                      }}
                    />
                    <Grid container spacing={2}>
                      {mockProducts
                        .filter(product => 
                          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((product) => (
                          <Grid item xs={12} sm={6} key={product.id}>
                            <Card variant="outlined">
                              <CardContent>
                                <Box display="flex" alignItems="center">
                                  <Avatar 
                                    src={product.image} 
                                    alt={product.name}
                                    sx={{ mr: 2, width: 60, height: 60 }}
                                  />
                                  <Box flex={1}>
                                    <Typography variant="h6" gutterBottom>
                                      {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      {product.category}
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                      ${product.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Stock: {product.stock}
                                    </Typography>
                                  </Box>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock === 0}
                                  >
                                    Add to Cart
                                  </Button>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Shopping Cart */}
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Shopping Cart ({selectedProducts.length})
                    </Typography>
                    {selectedProducts.length === 0 ? (
                      <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                        No products in cart
                      </Typography>
                    ) : (
                      <>
                        <List dense>
                          {selectedProducts.map((item) => (
                            <ListItem key={item.id}>
                              <ListItemAvatar>
                                <Avatar src={item.image} alt={item.name} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={item.name}
                                secondary={`$${item.price} x ${item.quantity}`}
                              />
                              <Box display="flex" alignItems="center">
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Remove />
                                </IconButton>
                                <Typography variant="body2" sx={{ mx: 1 }}>
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock}
                                >
                                  <Add />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-between" mb={2}>
                          <Typography variant="h6">Total:</Typography>
                          <Typography variant="h6" color="primary">
                            ${getTotalAmount().toFixed(2)}
                          </Typography>
                        </Box>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => navigate('/dashboard/sales/10.2')}
                          disabled={selectedProducts.length === 0}
                        >
                          Continue to Customer Info
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case '10.2':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Customer Information
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Enter customer details for the order.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Customer Details
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Customer Name"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Shipping Address"
                          multiline
                          rows={3}
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Summary
                    </Typography>
                    <List dense>
                      {selectedProducts.map((item) => (
                        <ListItem key={item.id}>
                          <ListItemText
                            primary={item.name}
                            secondary={`$${item.price} x ${item.quantity}`}
                          />
                          <Typography variant="body2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary">
                        ${getTotalAmount().toFixed(2)}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate('/dashboard/sales/10.3')}
                      disabled={!customerInfo.name}
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case '10.3':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Payment & Order Completion
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Select payment method and complete the order.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Payment Method
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Select Payment Method</InputLabel>
                      <Select
                        value={paymentMethod}
                        label="Select Payment Method"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="card">Credit/Debit Card</MenuItem>
                        <MenuItem value="bank">Bank Transfer</MenuItem>
                        <MenuItem value="digital">Digital Wallet</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <Typography variant="h6" gutterBottom>
                      Order Notes
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Add any special instructions or notes for this order..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      variant="outlined"
                    />
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Final Order Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Customer Name:
                        </Typography>
                        <Typography variant="body1">
                          {customerInfo.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method:
                        </Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                          {paymentMethod}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Total Items:
                        </Typography>
                        <Typography variant="body1">
                          {selectedProducts.reduce((total, item) => total + item.quantity, 0)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Order Total:
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ${getTotalAmount().toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Items
                    </Typography>
                    <List dense>
                      {selectedProducts.map((item) => (
                        <ListItem key={item.id}>
                          <ListItemAvatar>
                            <Avatar src={item.image} alt={item.name} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name}
                            secondary={`$${item.price} x ${item.quantity}`}
                          />
                          <Typography variant="body2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="h6">Subtotal:</Typography>
                      <Typography variant="body1">
                        ${getTotalAmount().toFixed(2)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="body2">Tax (8.25%):</Typography>
                      <Typography variant="body2">
                        ${(getTotalAmount() * 0.0825).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={3}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary">
                        ${(getTotalAmount() * 1.0825).toFixed(2)}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/dashboard/sales/10.4')}
                    >
                      Complete Order
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case '10.4':
        return (
          <Box textAlign="center" py={4}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            <Typography variant="h3" gutterBottom color="success.main">
              Order Completed!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Your order has been successfully processed and confirmed.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Order ID: ORD-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              A confirmation email has been sent to {customerInfo.email || 'the customer'}.
            </Typography>
            
            <Box mt={4}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard/sales/10.5')}
                    endIcon={<Receipt />}
                  >
                    View Receipt
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/dashboard/sales/10.1')}
                  >
                    Create New Order
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );

      case '10.5':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Order Receipt
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Detailed receipt for the completed order.
            </Typography>
            
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h4" color="primary">
                    IMS Store
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receipt #{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Customer Information
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {customerInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {customerInfo.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {customerInfo.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {customerInfo.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Order Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Date: {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Time: {new Date().toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Payment: {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedProducts.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body1">Subtotal:</Typography>
                      <Typography variant="body1" sx={{ ml: 4 }}>
                        ${getTotalAmount().toFixed(2)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body1">Tax (8.25%):</Typography>
                      <Typography variant="body1" sx={{ ml: 4 }}>
                        ${(getTotalAmount() * 0.0825).toFixed(2)}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary" sx={{ ml: 4 }}>
                        ${(getTotalAmount() * 1.0825).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {orderNotes && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom>
                      Order Notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {orderNotes}
                    </Typography>
                  </>
                )}
                
                <Box textAlign="center" mt={4}>
                  <Typography variant="body2" color="text.secondary">
                    Thank you for your purchase!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    For support, contact us at support@imsstore.com
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" color="primary">
              {step === '10.0' ? 'Sales Dashboard' : 
               step === '10.1' ? 'Create Sale' :
               step === '10.2' ? 'Customer Information' :
               step === '10.3' ? 'Payment & Completion' :
               step === '10.4' ? 'Order Confirmation' : 'Order Receipt'}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              startIcon={<ArrowBack />}
            >
              Back to Dashboard
            </Button>
          </Box>
          
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Dashboard" onClick={() => navigate('/dashboard/sales/10.0')} />
            <Tab label="Create Sale" onClick={() => navigate('/dashboard/sales/10.1')} />
            <Tab label="Customer Info" onClick={() => navigate('/dashboard/sales/10.2')} />
            <Tab label="Payment" onClick={() => navigate('/dashboard/sales/10.3')} />
            <Tab label="Confirmation" onClick={() => navigate('/dashboard/sales/10.4')} />
            <Tab label="Receipt" onClick={() => navigate('/dashboard/sales/10.5')} />
          </Tabs>
        </Box>

        {/* Step Content */}
        {renderStepContent()}
      </Paper>
    </Container>
  );
};

export default Sales;


