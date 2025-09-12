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
  ListItemIcon,
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
  TableRow
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Remove,
  ShoppingCart,
  Inventory,
  History,
  Settings,
  ArrowBack,
  Save,
  Cancel,
  QrCode,
  LocalOffer,
  Category,
  Business,
  Description,
  AttachMoney,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';

const ProductPage = () => {
  const { step = '9.0' } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Mock product data
  const [product, setProduct] = useState({
    id: '1',
    name: 'iPhone 14 Pro Max',
    sku: 'IPH14PM-256GB',
    barcode: '1234567890123',
    description: 'Latest iPhone with advanced camera system and A16 Bionic chip',
    price: 1099.99,
    cost: 850.00,
    stock: 25,
    minStock: 5,
    maxStock: 100,
    category: 'Electronics',
    brand: 'Apple',
    supplier: 'Apple Inc.',
    location: 'Warehouse A, Shelf B1',
    weight: '0.5 kg',
    dimensions: '160.7 x 77.6 x 7.85 mm',
    tags: ['Smartphone', 'iOS', '5G', 'Premium'],
    images: [
      'https://via.placeholder.com/400x300?text=iPhone+Front',
      'https://via.placeholder.com/400x300?text=iPhone+Back',
      'https://via.placeholder.com/400x300?text=iPhone+Side'
    ],
    variants: [
      { color: 'Space Black', stock: 10, price: 1099.99 },
      { color: 'Silver', stock: 8, price: 1099.99 },
      { color: 'Gold', stock: 7, price: 1099.99 }
    ]
  });

  const [editData, setEditData] = useState({ ...product });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setEditData({ ...product });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProduct(editData);
    setIsEditing(false);
    setEditDialogOpen(false);
  };

  const handleCancel = () => {
    setEditData({ ...product });
    setIsEditing(false);
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    // Delete logic here
    console.log('Deleting product:', product.id);
    setDeleteDialogOpen(false);
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (step) {
      case '9.0':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Product Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Complete product information and current status.
            </Typography>
            
            {/* Product Header */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.images[0]}
                      alt={product.name}
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h4" gutterBottom>
                        {product.name}
                      </Typography>
                      <Box>
                        <IconButton onClick={handleEdit} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => setDeleteDialogOpen(true)} color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Typography variant="h5" color="primary" gutterBottom>
                      ${product.price}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    
                    <Box display="flex" gap={1} mb={2}>
                      {product.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          SKU: {product.sku}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Category: {product.category}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Brand: {product.brand}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Supplier: {product.supplier}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Stock Status */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Stock Status
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="primary">
                        {product.stock}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Current Stock
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="warning.main">
                        {product.minStock}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Min Stock Level
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="info.main">
                        {product.maxStock}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Max Stock Level
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color={product.stock <= product.minStock ? 'error.main' : 'success.main'}>
                        {product.stock <= product.minStock ? 'Low' : 'Good'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stock Status
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      case '9.1':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Product Details & Specifications
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Comprehensive product specifications and technical details.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Basic Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Category />
                        </ListItemIcon>
                        <ListItemText primary="Category" secondary={product.category} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Business />
                        </ListItemIcon>
                        <ListItemText primary="Brand" secondary={product.brand} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <QrCode />
                        </ListItemIcon>
                        <ListItemText primary="Barcode" secondary={product.barcode} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LocalOffer />
                        </ListItemIcon>
                        <ListItemText primary="SKU" secondary={product.sku} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Physical Specifications
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Weight" secondary={product.weight} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Dimensions" secondary={product.dimensions} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Inventory />
                        </ListItemIcon>
                        <ListItemText primary="Location" secondary={product.location} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Product Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This product offers cutting-edge technology and premium features designed for professional use.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case '9.2':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Inventory Management
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Monitor stock levels, set alerts, and manage inventory operations.
            </Typography>
            
            {/* Stock Levels */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Stock Levels by Variant
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Variant</TableCell>
                        <TableCell align="right">Current Stock</TableCell>
                        <TableCell align="right">Min Stock</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.variants.map((variant, index) => (
                        <TableRow key={index}>
                          <TableCell>{variant.color}</TableCell>
                          <TableCell align="right">{variant.stock}</TableCell>
                          <TableCell align="right">{product.minStock}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={variant.stock <= product.minStock ? 'Low Stock' : 'In Stock'} 
                              color={variant.stock <= product.minStock ? 'warning' : 'success'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" color="primary">
                              <Add />
                            </IconButton>
                            <IconButton size="small" color="secondary">
                              <Remove />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Stock Alerts */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Stock Alerts
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Minimum Stock Level"
                      type="number"
                      value={product.minStock}
                      onChange={(e) => setProduct({...product, minStock: parseInt(e.target.value)})}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maximum Stock Level"
                      type="number"
                      value={product.maxStock}
                      onChange={(e) => setProduct({...product, maxStock: parseInt(e.target.value)})}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      case '9.3':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Pricing & Cost Analysis
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Analyze pricing strategies, costs, and profit margins.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Pricing Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <AttachMoney />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Selling Price" 
                          secondary={`$${product.price}`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <AttachMoney />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Cost Price" 
                          secondary={`$${product.cost}`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUp />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Profit Margin" 
                          secondary={`${((product.price - product.cost) / product.price * 100).toFixed(2)}%`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <AttachMoney />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Profit per Unit" 
                          secondary={`$${(product.price - product.cost).toFixed(2)}`} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Bulk Pricing
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Set different prices for bulk orders to encourage larger purchases.
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="1-10 units" 
                          secondary={`$${product.price} each`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="11-50 units" 
                          secondary={`$${(product.price * 0.95).toFixed(2)} each (5% off)`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="51+ units" 
                          secondary={`$${(product.price * 0.90).toFixed(2)} each (10% off)`} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case '9.4':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Product Images & Media
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Manage product images, videos, and media content.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Product Images
                    </Typography>
                    <Grid container spacing={2}>
                      {product.images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="200"
                              image={image}
                              alt={`${product.name} - Image ${index + 1}`}
                            />
                            <CardContent>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2">
                                  Image {index + 1}
                                </Typography>
                                <Box>
                                  <IconButton size="small" color="primary">
                                    <Edit />
                                  </IconButton>
                                  <IconButton size="small" color="error">
                                    <Delete />
                                  </IconButton>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                      <Grid item xs={12} sm={6} md={4}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            height: 200, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { borderColor: 'primary.main' }
                          }}
                        >
                          <Box textAlign="center">
                            <Add sx={{ fontSize: 40, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              Add Image
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
              {step === '9.0' ? 'Product Overview' : 
               step === '9.1' ? 'Product Details' :
               step === '9.2' ? 'Inventory Management' :
               step === '9.3' ? 'Pricing & Costs' : 'Product Media'}
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
            <Tab label="Overview" onClick={() => navigate('/dashboard/product/9.0')} />
            <Tab label="Details" onClick={() => navigate('/dashboard/product/9.1')} />
            <Tab label="Inventory" onClick={() => navigate('/dashboard/product/9.2')} />
            <Tab label="Pricing" onClick={() => navigate('/dashboard/product/9.3')} />
            <Tab label="Media" onClick={() => navigate('/dashboard/product/9.4')} />
          </Tabs>
        </Box>

        {/* Step Content */}
        {renderStepContent()}

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  value={editData.sku}
                  onChange={(e) => setEditData({...editData, sku: e.target.value})}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({...editData, price: parseFloat(e.target.value)})}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  value={editData.stock}
                  onChange={(e) => setEditData({...editData, stock: parseInt(e.target.value)})}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save Changes</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ProductPage;


