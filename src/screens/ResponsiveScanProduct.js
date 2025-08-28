import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  Avatar,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Badge,
  Chip,
  Stack,
  Grid,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  FlashlightOn,
  FlashlightOff,
  ShoppingCart,
  Remove,
  CropFree,
  Delete,
  HelpOutline,
  Camera,
  PhotoLibrary,
  Search,
  Inventory2,
} from '@mui/icons-material';
import { getProducts } from '../utils/localStorage';

function ResponsiveScanProduct() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [scannerActive, setScannerActive] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [helpDialog, setHelpDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [cameraStream, setCameraStream] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    // Load products
    const productData = getProducts();
    setProducts(productData);
    
    // Simulate live matches for demo
    setLiveMatches([
      { id: 1, name: 'iPhone 13 Pro', price: 350000, image: '📱', stock: 25 },
      { id: 2, name: 'Samsung Galaxy S21', price: 280000, image: '📱', stock: 18 },
      { id: 3, name: 'MacBook Air M1', price: 450000, image: '💻', stock: 12 },
      { id: 4, name: 'AirPods Pro', price: 85000, image: '🎧', stock: 30 },
    ]);
    
    return () => {
      // Cleanup camera stream on unmount
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setCameraStream(stream);
      setScannerActive(true);
      
      setSnackbar({
        open: true,
        message: 'Camera started! Point at a barcode or QR code',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error starting camera:', error);
      setSnackbar({
        open: true,
        message: 'Unable to access camera. Please check permissions.',
        severity: 'error'
      });
    } finally {
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setScannerActive(false);
    setFlashOn(false);
    
    setSnackbar({
      open: true,
      message: 'Camera stopped',
      severity: 'info'
    });
  };

  const toggleFlash = async () => {
    if (!cameraStream) return;
    
    try {
      const videoTrack = cameraStream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();
      
      if (capabilities.torch) {
        await videoTrack.applyConstraints({
          advanced: [{ torch: !flashOn }]
        });
        setFlashOn(!flashOn);
      } else {
        setSnackbar({
          open: true,
          message: 'Flash not supported on this device',
          severity: 'warning'
        });
      }
    } catch (error) {
      console.error('Error toggling flash:', error);
    }
  };

  const addToCart = (product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...items, { ...product, quantity: 1 }];
      }
    });
    
    setSnackbar({
      open: true,
      message: `${product.name} added to cart`,
      severity: 'success'
    });
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === itemId);
      if (existingItem) {
        const newQuantity = Math.max(0, existingItem.quantity + change);
        if (newQuantity === 0) {
          return items.filter(item => item.id !== itemId);
        }
        return items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
      }
      return items;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    setSnackbar({
      open: true,
      message: 'Item removed from cart',
      severity: 'info'
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToSale = () => {
    if (cartItems.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please add items to cart first',
        severity: 'warning'
      });
      return;
    }
    
    navigate('/dashboard/sales/new', { state: { cartItems } });
  };

  const simulateScan = (product) => {
    // Simulate barcode scan detection
    setSnackbar({
      open: true,
      message: `Scanned: ${product.name}`,
      severity: 'success'
    });
    
    setTimeout(() => {
      addToCart(product);
    }, 500);
  };

  return (
    <Box sx={{ width: '100%' }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
            Scan Products
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use your camera to scan barcodes or QR codes
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Scanner Section */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 2 }}>
              {/* Camera View */}
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 250, sm: 300, md: 400 },
                  bgcolor: 'grey.900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {scannerActive ? (
                  <>
                    <video
                      ref={videoRef}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      autoPlay
                      playsInline
                      muted
                    />
                    
                    {/* Scanning Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 200, sm: 250 },
                        height: { xs: 120, sm: 150 },
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -1,
                          left: -1,
                          right: -1,
                          bottom: -1,
                          border: '2px solid',
                          borderColor: 'primary.main',
                          borderRadius: 2,
                          animation: 'scan 2s infinite',
                        },
                        '@keyframes scan': {
                          '0%': { opacity: 1, transform: 'scaleX(1)' },
                          '50%': { opacity: 0.5, transform: 'scaleX(1.1)' },
                          '100%': { opacity: 1, transform: 'scaleX(1)' },
                        },
                      }}
                    />
                    
                    {/* Scanner Controls */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        right: 16,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                      }}
                    >
                      <IconButton
                        onClick={toggleFlash}
                        sx={{
                          bgcolor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                        }}
                      >
                        {flashOn ? <FlashlightOff /> : <FlashlightOn />}
                      </IconButton>
                      
                      <IconButton
                        onClick={stopCamera}
                        sx={{
                          bgcolor: 'rgba(255,0,0,0.7)',
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255,0,0,0.8)' },
                        }}
                      >
                        <CropFree />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center', color: 'white', p: 3 }}>
                    <Camera sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Camera Ready
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, opacity: 0.7 }}>
                      Tap start to begin scanning
                    </Typography>
                    
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="contained"
                        onClick={startCamera}
                        disabled={scanning}
                        startIcon={<Camera />}
                        sx={{ borderRadius: 2 }}
                      >
                        {scanning ? 'Starting...' : 'Start Camera'}
                      </Button>
                      
                      <IconButton
                        onClick={() => setHelpDialog(true)}
                        sx={{ color: 'white' }}
                      >
                        <HelpOutline />
                      </IconButton>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Paper>

            {/* Live Matches */}
            {scannerActive && (
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Live Matches
                </Typography>
                <Grid container spacing={1}>
                  {liveMatches.map((product) => (
                    <Grid item xs={6} sm={4} md={3} key={product.id}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': { transform: 'scale(1.02)' }
                        }}
                        onClick={() => simulateScan(product)}
                      >
                        <CardContent sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h4" sx={{ mb: 1 }}>
                            {product.image}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }} noWrap>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="primary">
                            ₦{product.price?.toLocaleString()}
                          </Typography>
                          <Chip
                            label={`${product.stock} left`}
                            size="small"
                            color={product.stock > 10 ? 'success' : 'warning'}
                            sx={{ mt: 0.5, fontSize: '0.6rem' }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Grid>

          {/* Cart Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 2, height: 'fit-content' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Cart
                </Typography>
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCart />
                </Badge>
              </Box>

              {cartItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ShoppingCart sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Cart is empty
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Scan products to add them
                  </Typography>
                </Box>
              ) : (
                <>
                  <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {cartItems.map((item) => (
                      <ListItem
                        key={item.id}
                        sx={{
                          px: 0,
                          py: 1,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => removeFromCart(item.id)}
                              sx={{ color: 'error.main' }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="primary">
                              ₦{item.price?.toLocaleString()}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Remove fontSize="small" />
                              </IconButton>
                              <Typography variant="body2" sx={{ mx: 1, minWidth: 20, textAlign: 'center' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Add fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Total:
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        ₦{getTotalPrice().toLocaleString()}
                      </Typography>
                    </Box>
                    
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={proceedToSale}
                      startIcon={<ShoppingCart />}
                      sx={{ borderRadius: 2 }}
                    >
                      Proceed to Sale
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Help Dialog */}
        <Dialog open={helpDialog} onClose={() => setHelpDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>How to Scan</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>1. Position your device:</strong> Hold your phone steady and point the camera at the barcode or QR code.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>2. Maintain distance:</strong> Keep the camera 4-8 inches away from the code for best results.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>3. Ensure good lighting:</strong> Use the flash button if the area is too dark.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>4. Wait for detection:</strong> The app will automatically detect and add products to your cart.
            </Typography>
            <Typography variant="body2">
              <strong>5. Manual selection:</strong> You can also tap on the live matches below the camera to add products manually.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHelpDialog(false)}>Got it</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Floating Action Button for Mobile */}
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
            onClick={scannerActive ? stopCamera : startCamera}
          >
            {scannerActive ? <CropFree /> : <Camera />}
          </Fab>
        )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Box>
  );
}

export default ResponsiveScanProduct;