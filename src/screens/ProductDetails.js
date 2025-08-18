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
            {/* Basic Information */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
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
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
              </Paper>
            </Grid>

            {/* Stock Information */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Stock Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Current Stock"
                      secondary={`${product.stock} units`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Minimum Stock"
                      secondary={`${product.minStock} units`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Maximum Stock"
                      secondary={`${product.maxStock} units`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Last Updated"
                      secondary={product.lastUpdated}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Specifications */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Specifications
                </Typography>
                <List dense>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemText
                        primary={key}
                        secondary={value}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Additional Details */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Additional Details
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Weight"
                      secondary={`${product.weight} kg`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Dimensions"
                      secondary={product.dimensions}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Barcode"
                      secondary={product.barcode}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Tags"
                      secondary={product.tags.join(', ')}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
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
    </Box>
  );
}

export default ProductDetails; 