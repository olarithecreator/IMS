import React, { useState } from 'react';
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
  Slider,
  AppBar,
  Toolbar,
  Badge,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  FlashlightOn,
  ShoppingCart,
  Remove,
  CropFree,
  Notifications,
  Delete,
  HelpOutline,
} from '@mui/icons-material';

function ScanProduct() {
  const navigate = useNavigate();
  const [scannerActive, setScannerActive] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [liveMatches] = useState([
    { id: 1, name: 'Handbag', price: 25000, image: '👜' },
    { id: 2, name: 'Running Shoe', price: 15500, image: '👟' },
    { id: 3, name: 'Gold Necklace', price: 50000, image: '📿' },
  ]);

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

  const addToCart = (product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const viewCart = () => {
    navigate('/dashboard/sales/new', { state: { cartItems } });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#000' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Scan
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <Box sx={{ position: 'absolute', top: 80, left: 16, right: 16, zIndex: 10 }}>
          <Card sx={{ borderRadius: 2 }} onClick={viewCart}>
            <CardContent sx={{ py: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {totalItems} items in cart
                </Typography>
                <IconButton size="small">
                  <ArrowBack sx={{ transform: 'rotate(180deg)' }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Scanner View */}
      <Box sx={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Scanner Frame */}
        <Box
          sx={{
            width: 280,
            height: 280,
            border: '3px solid white',
            borderRadius: 3,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Corner indicators */}
          <Box
            sx={{
              position: 'absolute',
              top: -3,
              left: -3,
              width: 30,
              height: 30,
              borderTop: '6px solid white',
              borderLeft: '6px solid white',
              borderTopLeftRadius: 8,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: -3,
              right: -3,
              width: 30,
              height: 30,
              borderTop: '6px solid white',
              borderRight: '6px solid white',
              borderTopRightRadius: 8,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -3,
              left: -3,
              width: 30,
              height: 30,
              borderBottom: '6px solid white',
              borderLeft: '6px solid white',
              borderBottomLeftRadius: 8,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -3,
              right: -3,
              width: 30,
              height: 30,
              borderBottom: '6px solid white',
              borderRight: '6px solid white',
              borderBottomRightRadius: 8,
            }}
          />

          {/* Scanning animation line */}
          <Box
            sx={{
              position: 'absolute',
              width: '80%',
              height: 3,
              bgcolor: '#1976d2',
              borderRadius: 1,
              animation: 'scan 2s ease-in-out infinite',
              '@keyframes scan': {
                '0%': { top: '10%', opacity: 0.8 },
                '50%': { top: '50%', opacity: 1 },
                '100%': { top: '90%', opacity: 0.8 },
              },
            }}
          />
        </Box>

        {/* Instructions */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 200,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white',
            px: 4,
          }}
        >
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Move the product slowly to capture
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            all angles.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Center the product in the guide box.
          </Typography>
        </Box>

        {/* Bottom Controls */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 140,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Zoom Slider */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'white', fontSize: '18px' }}>-</Typography>
            <Slider
              defaultValue={50}
              sx={{
                width: 120,
                color: 'white',
                '& .MuiSlider-thumb': {
                  bgcolor: '#1976d2',
                  width: 20,
                  height: 20,
                },
                '& .MuiSlider-track': {
                  bgcolor: 'white',
                },
                '& .MuiSlider-rail': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                },
              }}
            />
            <Typography variant="body2" sx={{ color: 'white', fontSize: '18px' }}>+</Typography>
          </Box>

          {/* Control Buttons */}
          <IconButton 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              width: 48,
              height: 48,
            }}
          >
            <Add />
          </IconButton>
          <IconButton 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              width: 48,
              height: 48,
            }}
          >
            <FlashlightOn />
          </IconButton>
          <IconButton 
            sx={{ 
              bgcolor: '#1976d2', 
              color: 'white',
              width: 56,
              height: 56,
            }}
          >
            <ShoppingCart />
          </IconButton>
        </Box>
      </Box>

      {/* Live Matches Section */}
      <Box sx={{ bgcolor: 'white', minHeight: 300, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Live Match
          </Typography>
          
          {liveMatches.map((item) => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <Card key={item.id} sx={{ mb: 2, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Avatar sx={{ mr: 2, width: 50, height: 50, fontSize: '1.8rem', bgcolor: 'transparent' }}>
                        {item.image}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                          ₦{item.price.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {quantity > 0 && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, -1)}
                            sx={{ 
                              bgcolor: '#f5f5f5',
                              width: 32,
                              height: 32,
                            }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography variant="body1" sx={{ 
                            minWidth: 30, 
                            textAlign: 'center',
                            fontWeight: 'bold',
                            bgcolor: '#1976d2',
                            color: 'white',
                            borderRadius: 1,
                            px: 1,
                            py: 0.5,
                          }}>
                            {quantity}
                          </Typography>
                        </>
                      )}
                      <IconButton
                        size="small"
                        onClick={() => addToCart(item)}
                        sx={{ 
                          bgcolor: '#1976d2', 
                          color: 'white',
                          width: 32,
                          height: 32,
                          '&:hover': {
                            bgcolor: '#1565c0',
                          },
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Container>
      </Box>
    </Box>
  );
}

export default ScanProduct;