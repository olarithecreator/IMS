import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  Inventory,
  AttachMoney,
  Category,
  Business,
  QrCode,
  LocalShipping,
  TrendingUp,
  Warning,
} from '@mui/icons-material';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [addStockOpen, setAddStockOpen] = useState(false);
  const [updatePriceOpen, setUpdatePriceOpen] = useState(false);
  const [qtyToAdd, setQtyToAdd] = useState(1);
  const [costPerUnit, setCostPerUnit] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    // Simulate loading product data
    setTimeout(() => {
      setProduct({
        id: 1,
        name: 'iPhone 13 Pro',
        sku: 'IP13P-256-BLK',
        category: 'Electronics',
        supplier: 'Apple Inc',
        description: 'Latest iPhone model with advanced features and camera system. Features A15 Bionic chip, Pro camera system, and Super Retina XDR display.',
        price: 999.99,
        cost: 750.00,
        stock: 45,
        minStock: 10,
        maxStock: 100,
        weight: 0.174,
        dimensions: '14.7 x 7.1 x 0.8 cm',
        barcode: '1234567890123',
        tags: ['smartphone', 'apple', 'ios', 'camera'],
        status: 'In Stock',
        lastUpdated: '2024-01-15',
        image: 'https://via.placeholder.com/300x300?text=iPhone+13+Pro',
        specifications: {
          'Screen Size': '6.1 inches',
          'Storage': '256GB',
          'Color': 'Black',
          'Processor': 'A15 Bionic',
          'Camera': 'Triple 12MP',
          'Battery': 'Up to 22 hours',
        },
        history: [
          { date: '2024-01-15', action: 'Stock updated', quantity: 45, user: 'John Doe' },
          { date: '2024-01-10', action: 'Price changed', oldPrice: 1099.99, newPrice: 999.99, user: 'Jane Smith' },
          { date: '2024-01-05', action: 'Product added', user: 'Admin' },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/edit-product/${id}`);
  };

  const handleDelete = () => {
    // Handle delete logic
    console.log('Delete product:', id);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Alert severity="error">
        Product not found
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard/inventory')}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            Product Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Product Image and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', maxWidth: 300, height: 'auto', borderRadius: 8 }}
            />
            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              {product.name}
            </Typography>
            <Chip
              label={product.status}
              color={getStatusColor(product.status)}
              sx={{ mb: 2 }}
            />
            <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
              ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cost: ${product.cost}
            </Typography>
          </Paper>
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Core Details */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Core Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <QrCode sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        SKU: {product.sku}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Category sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Category: {product.category}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Business sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Supplier: {product.supplier}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Inventory sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Stock: {product.stock} units
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>{product.description}</Typography>
              </Paper>
            </Grid>

            {/* Stock Alerts & Expiry */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Stock Alerts & Expiry</Typography>
                <List dense>
                  <ListItem><ListItemText primary="Low-Stock Alert (pcs)" secondary={product.minStock} /></ListItem>
                  <ListItem><ListItemText primary="Expiry Date" secondary="Select date" /></ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Pricing */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Pricing</Typography>
                <List dense>
                  <ListItem><ListItemText primary="Cost Price" secondary={`₦${product.cost}`} /></ListItem>
                  <ListItem><ListItemText primary="Selling Price" secondary={`₦${product.price}`} /></ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Additional Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Supplier Name"
                      secondary={product.supplier}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Description"
                      secondary={product.description}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Color / Size"
                      secondary="Not set"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Audit & History */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Audit & History</Typography>
                <List dense>
                  {product.history.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={item.action}
                        secondary={`${item.date} by ${item.user}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Sticky bottom actions */}
      <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0, mt: 2, p: 2, borderRadius: 3 }} elevation={2}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => setAddStockOpen(true)}>Add Stock</Button>
          <Button variant="outlined" onClick={() => setUpdatePriceOpen(true)}>Update Price</Button>
        </Box>
      </Paper>

      {/* Add Stock Dialog */}
      <Dialog open={addStockOpen} onClose={() => setAddStockOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <TextField fullWidth type="number" label="Qty" value={qtyToAdd} onChange={(e) => setQtyToAdd(Math.max(1, parseInt(e.target.value)||1))} sx={{ mb: 2 }} />
          <TextField fullWidth label="Cost per Unit" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start">₦</InputAdornment> }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddStockOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddStockOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Update Price Dialog */}
      <Dialog open={updatePriceOpen} onClose={() => setUpdatePriceOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Update Price</DialogTitle>
        <DialogContent>
          <List dense>
            <ListItem><ListItemText primary="Cost Price" secondary={`₦${product.cost}`} /></ListItem>
            <ListItem><ListItemText primary="Current Price" secondary={`₦${product.price}`} /></ListItem>
          </List>
          <TextField fullWidth label="New Price ₦" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdatePriceOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setUpdatePriceOpen(false)}>Update Price</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProductDetails; 