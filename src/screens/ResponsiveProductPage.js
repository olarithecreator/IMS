import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Paper,
  Stack,
  Fab,
  useTheme,
  useMediaQuery,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  Sort,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Warning,
  CheckCircle,
  QrCodeScanner,
  GridView,
  ViewList,
  LocalOffer,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import { getProducts, getCurrentUser, getSettings } from '../utils/localStorage';

// Product Card Component
const ProductCard = ({ product, onEdit, onView, onDelete, viewMode = 'grid' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const settings = getSettings();
  const lowStockThreshold = settings.lowStockThreshold || 10;
  
  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'Out of Stock', color: 'error' };
    if (product.stock <= lowStockThreshold) return { label: 'Low Stock', color: 'warning' };
    return { label: 'In Stock', color: 'success' };
  };

  const stockStatus = getStockStatus();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (viewMode === 'list') {
    return (
      <Card sx={{ mb: 1, borderRadius: 2 }}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant="rounded"
              src={product.image}
              sx={{ 
                width: 60, 
                height: 60, 
                mr: 2,
                bgcolor: 'grey.100'
              }}
            >
              {product.name.charAt(0)}
            </Avatar>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {product.category} • ₦{product.price?.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <Chip
                  label={`${product.stock} units`}
                  color={stockStatus.color}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={stockStatus.label}
                  color={stockStatus.color}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>

            <IconButton onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        position: 'relative',
      }}
    >
      {/* Stock Status Badge */}
      <Chip
        label={stockStatus.label}
        color={stockStatus.color}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 1,
          fontWeight: 600,
        }}
      />

      {/* More Options */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: 'rgba(255,255,255,0.9)',
          '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
        }}
        onClick={handleMenuClick}
      >
        <MoreVert />
      </IconButton>

      <CardMedia
        component="img"
        height={isMobile ? 140 : 180}
        image={product.image || '/api/placeholder/300/200'}
        alt={product.name}
        sx={{ 
          objectFit: 'cover',
          bgcolor: 'grey.100',
        }}
      />
      
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.3,
            height: { xs: '2.6rem', sm: '3rem' },
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.category}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            ₦{product.price?.toLocaleString()}
          </Typography>
          <Chip
            label={`${product.stock} left`}
            color={stockStatus.color}
            variant="outlined"
            size="small"
          />
        </Box>

        <Button
          fullWidth
          variant="outlined"
          size="small"
          onClick={() => onView(product)}
          sx={{ textTransform: 'none' }}
        >
          View Details
        </Button>
      </CardContent>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 160 }
        }}
      >
        <MenuItem onClick={() => { onView(product); handleMenuClose(); }}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { onEdit(product); handleMenuClose(); }}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit Product</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { onDelete(product); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

function ResponsiveProductPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load data
    const user = getCurrentUser();
    setCurrentUser(user);
    
    const productData = getProducts();
    setProducts(productData);
    setFilteredProducts(productData);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter and sort products
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'stock':
          return b.stock - a.stock;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const settings = getSettings();
  const lowStockProducts = products.filter(p => p.stock <= (settings.lowStockThreshold || 10));

  const handleProductView = (product) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  const handleProductEdit = (product) => {
    navigate(`/dashboard/products/edit/${product.id}`);
  };

  const handleProductDelete = (product) => {
    // Implementation for delete
    console.log('Delete product:', product);
  };

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={180} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="text" height={24} width="40%" />
                    <Skeleton variant="rectangular" height={24} width="30%" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
              Products
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {filteredProducts.length} of {products.length} products
            </Typography>
          </Box>
          
          {!isMobile && (
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/dashboard/products/add')}
                sx={{ textTransform: 'none' }}
              >
                Add Product
              </Button>
              <Button
                variant="outlined"
                startIcon={<QrCodeScanner />}
                onClick={() => navigate('/dashboard/scan')}
                sx={{ textTransform: 'none' }}
              >
                Scan
              </Button>
            </Stack>
          )}
        </Box>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Alert 
            severity="warning" 
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button 
                color="inherit" 
                size="small"
                onClick={() => navigate('/dashboard/alerts')}
              >
                View All
              </Button>
            }
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {lowStockProducts.length} products are running low on stock
            </Typography>
          </Alert>
        )}
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'background.default' }}
            />
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              select
              fullWidth
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ bgcolor: 'background.default' }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              select
              fullWidth
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ bgcolor: 'background.default' }}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="stock">Stock</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </TextField>
          </Grid>

          {!isMobile && (
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <IconButton
                  color={viewMode === 'grid' ? 'primary' : 'default'}
                  onClick={() => setViewMode('grid')}
                >
                  <GridView />
                </IconButton>
                <IconButton
                  color={viewMode === 'list' ? 'primary' : 'default'}
                  onClick={() => setViewMode('list')}
                >
                  <ViewList />
                </IconButton>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchQuery || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first product'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/dashboard/products/add')}
            sx={{ textTransform: 'none' }}
          >
            Add Product
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {filteredProducts.map((product) => (
            <Grid 
              item 
              xs={viewMode === 'list' ? 12 : 12} 
              sm={viewMode === 'list' ? 12 : 6} 
              md={viewMode === 'list' ? 12 : 4} 
              lg={viewMode === 'list' ? 12 : 3} 
              key={product.id}
            >
              <ProductCard
                product={product}
                onView={handleProductView}
                onEdit={handleProductEdit}
                onDelete={handleProductDelete}
                viewMode={viewMode}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Mobile FAB */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add product"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: theme.zIndex.speedDial,
          }}
          onClick={() => navigate('/dashboard/products/add')}
        >
          <Add />
        </Fab>
              )}
    </Box>
  );
}

export default ResponsiveProductPage;