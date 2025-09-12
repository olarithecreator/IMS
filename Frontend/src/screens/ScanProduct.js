import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  QrCodeScanner,
  Search,
  CameraAlt,
  Barcode,
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';

const ScanProduct = () => {
  const { step = '8.0' } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const videoRef = useRef(null);

  // Mock product data
  const mockProducts = [
    {
      id: '1',
      name: 'iPhone 14 Pro',
      sku: 'IPH14P-128GB',
      barcode: '1234567890123',
      price: 999.99,
      stock: 25,
      category: 'Electronics',
      image: 'https://via.placeholder.com/80x80?text=iPhone'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23',
      sku: 'SGS23-256GB',
      barcode: '9876543210987',
      price: 899.99,
      stock: 18,
      category: 'Electronics',
      image: 'https://via.placeholder.com/80x80?text=Galaxy'
    },
    {
      id: '3',
      name: 'MacBook Air M2',
      sku: 'MBA-M2-512GB',
      barcode: '4567891230456',
      price: 1199.99,
      stock: 12,
      category: 'Computers',
      image: 'https://via.placeholder.com/80x80?text=MacBook'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const results = mockProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery)
    );
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const randomBarcode = Math.random().toString(36).substring(2, 15);
      setScannedCode(randomBarcode);
      setIsScanning(false);
      
      // Auto-search for scanned product
      setSearchQuery(randomBarcode);
      handleSearch();
    }, 2000);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= selectedProduct.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { product: selectedProduct, quantity });
    // Navigate to next step or show success message
  };

  const renderStepContent = () => {
    switch (step) {
      case '8.0':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Scan or Search Products
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Use the barcode scanner or search manually to find products in your inventory.
            </Typography>
            
            {/* Search Section */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Manual Search
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Search by name, SKU, or barcode"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      variant="outlined"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSearch}
                      disabled={!searchQuery.trim() || isSearching}
                      startIcon={isSearching ? <CircularProgress size={20} /> : <Search />}
                      sx={{ py: 1.5 }}
                    >
                      {isSearching ? 'Searching...' : 'Search'}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Scan Section */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Barcode Scanner
                </Typography>
                <Box textAlign="center" py={3}>
                  <IconButton
                    size="large"
                    onClick={handleScan}
                    disabled={isScanning}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      border: 2, 
                      borderColor: 'primary.main',
                      '&:hover': { borderColor: 'primary.dark' }
                    }}
                  >
                    {isScanning ? (
                      <CircularProgress size={60} />
                    ) : (
                      <QrCodeScanner sx={{ fontSize: 60, color: 'primary.main' }} />
                    )}
                  </IconButton>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {isScanning ? 'Scanning...' : 'Tap to scan barcode'}
                  </Typography>
                </Box>
                {scannedCode && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Scanned: {scannedCode}
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Search Results ({searchResults.length})
                  </Typography>
                  <List>
                    {searchResults.map((product) => (
                      <React.Fragment key={product.id}>
                        <ListItem 
                          button 
                          onClick={() => handleProductSelect(product)}
                          sx={{ 
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={product.image} alt={product.name} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.name}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  SKU: {product.sku} • Category: {product.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Price: ${product.price} • Stock: {product.stock}
                                </Typography>
                              </Box>
                            }
                          />
                          <Chip 
                            label={product.stock > 0 ? 'In Stock' : 'Out of Stock'} 
                            color={product.stock > 0 ? 'success' : 'error'}
                            size="small"
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {searchResults.length === 0 && searchQuery && !isSearching && (
              <Alert severity="info">
                No products found matching "{searchQuery}". Try a different search term.
              </Alert>
            )}
          </Box>
        );

      case '8.1':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Product Details & Quantity
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Review the selected product and specify the quantity you want to add.
            </Typography>
            
            {selectedProduct ? (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <Avatar 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        sx={{ width: 120, height: 120, mx: 'auto' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Typography variant="h5" gutterBottom>
                        {selectedProduct.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        SKU: {selectedProduct.sku} • Category: {selectedProduct.category}
                      </Typography>
                      <Typography variant="h4" color="primary" gutterBottom>
                        ${selectedProduct.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Available Stock: {selectedProduct.stock} units
                      </Typography>
                      
                      {/* Quantity Selector */}
                      <Box display="flex" alignItems="center" mt={2}>
                        <Typography variant="h6" mr={2}>
                          Quantity:
                        </Typography>
                        <IconButton
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          value={quantity}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 1;
                            handleQuantityChange(newQty);
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ width: 80, mx: 1 }}
                          inputProps={{ min: 1, max: selectedProduct.stock }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= selectedProduct.stock}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      
                      {/* Total Price */}
                      <Typography variant="h6" color="primary" mt={2}>
                        Total: ${(selectedProduct.price * quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <Alert severity="warning">
                No product selected. Please go back and select a product first.
              </Alert>
            )}

            {/* Action Buttons */}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard/scan-product/8.0')}
                startIcon={<ArrowBack />}
              >
                Back to Search
              </Button>
              <Button
                variant="contained"
                onClick={handleAddToCart}
                disabled={!selectedProduct}
                endIcon={<ShoppingCart />}
                size="large"
              >
                Add to Cart
              </Button>
            </Box>
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
          <Typography variant="h4" gutterBottom color="primary">
            {step === '8.0' ? 'Product Scanner' : 'Product Details'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {step === '8.0' ? 'Find products by scanning or searching' : 'Review and add products to cart'}
          </Typography>
        </Box>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation */}
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            startIcon={<ArrowBack />}
          >
            Back to Dashboard
          </Button>
          {step === '8.0' && searchResults.length > 0 && (
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard/scan-product/8.1')}
              endIcon={<ArrowForward />}
              disabled={!selectedProduct}
            >
              Continue
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ScanProduct;


