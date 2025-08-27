import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, saveProduct } from '../utils/localStorage';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Chip,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  ViewModule,
  ViewList,
  FilterList,
} from '@mui/icons-material';

function ProductPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [addStockDialog, setAddStockDialog] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [costPerUnit, setCostPerUnit] = useState('');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products from localStorage
    const productData = getProducts().map(product => ({
      ...product,
      status: product.stock === 0 ? 'Out of Stock' : product.stock <= 10 ? 'Low Stock' : 'In Stock',
      statusColor: product.stock === 0 ? 'error' : product.stock <= 10 ? 'warning' : 'success',
      image: getProductIcon(product.category),
    }));
    setProducts(productData);
  }, []);

  const getProductIcon = (category) => {
    const icons = {
      'Electronics': '📱',
      'Furniture': '🪑',
      'Clothing': '👕',
      'Food': '🍎',
      'Books': '📚',
      'default': '📦',
    };
    return icons[category] || icons.default;
  };

  const handleProductClick = (product) => {
    if (bulkMode) {
      toggleProductSelection(product.id);
    } else {
      navigate(`/dashboard/product-details/${product.id}`);
    }
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddProduct = () => {
    navigate('/dashboard/add-product');
  };

  const handleBulkAddStock = () => {
    if (selectedProducts.length > 0) {
      setAddStockDialog(true);
    }
  };

  const addStockToSelected = () => {
    // Update stock for selected products
    const updatedProducts = products.map(product => {
      if (selectedProducts.includes(product.id)) {
        const updatedProduct = { 
          ...product, 
          stock: product.stock + parseInt(stockQuantity) 
        };
        // Save to localStorage
        saveProduct(updatedProduct);
        return updatedProduct;
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setAddStockDialog(false);
    setBulkMode(false);
    setSelectedProducts([]);
    setStockQuantity(1);
    setCostPerUnit('');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductCard = ({ product }) => (
    <Card
      sx={{
        borderRadius: 2,
        cursor: 'pointer',
        border: selectedProducts.includes(product.id) ? 2 : 0,
        borderColor: 'primary.main',
        '&:hover': {
          boxShadow: 2,
        },
      }}
      onClick={() => handleProductClick(product)}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ mr: 2, fontSize: '2rem', bgcolor: 'transparent' }}>
            {product.image}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {product.name}
            </Typography>
            <Chip
              label={product.status}
              size="small"
              color={product.statusColor}
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          SKU: {product.sku}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          ₦{product.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }) => (
    <Card
      sx={{
        mb: 1,
        borderRadius: 2,
        cursor: 'pointer',
        border: selectedProducts.includes(product.id) ? 2 : 0,
        borderColor: 'primary.main',
        '&:hover': {
          boxShadow: 1,
        },
      }}
      onClick={() => handleProductClick(product)}
    >
      <CardContent sx={{ py: 2, px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.status} ({product.stock})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SKU: {product.sku}
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ₦{product.price.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 2, position: 'relative' }}>
      {/* Header Controls */}
      <Box sx={{ mb: 2 }}>
        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />

        {/* Filter and View Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small">Category</Button>
            <Button variant="outlined" size="small">Top Selling</Button>
            <Button variant="outlined" size="small">Price</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              size="small"
            >
              {viewMode === 'grid' ? <ViewList /> : <ViewModule />}
            </IconButton>
          </Box>
        </Box>

        {/* Bulk Mode Controls */}
        {bulkMode && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2">
              {selectedProducts.length} Selected
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={handleBulkAddStock}
                disabled={selectedProducts.length === 0}
              >
                Add Stock
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setBulkMode(false);
                  setSelectedProducts([]);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        {!bulkMode && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              All
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => setBulkMode(true)}
            >
              {selectedProducts.length} Selected
            </Button>
          </Box>
        )}
      </Box>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {filteredProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </Box>
      )}

      {/* Add Product FAB */}
      <Fab
        color="primary"
        onClick={handleAddProduct}
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Add />
      </Fab>

      {/* Add Stock Dialog */}
      <Dialog
        open={addStockDialog}
        onClose={() => setAddStockDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Quantity</Typography>
            <TextField
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              fullWidth
              variant="outlined"
              InputProps={{
                inputProps: { min: 1 },
              }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Add cost per unit</Typography>
            <TextField
              label="₦ 0.00"
              value={costPerUnit}
              onChange={(e) => setCostPerUnit(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddStockDialog(false)}>Cancel</Button>
          <Button onClick={addStockToSelected} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProductPage;