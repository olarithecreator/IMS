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
  Fab,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  FlashlightOn,
  ShoppingCart,
  Remove,
  CropFree,
} from '@mui/icons-material';

function ScanProduct() {
  const navigate = useNavigate();
  const [scannerActive, setScannerActive] = useState(true);
  const [cartItems, setCartItems] = useState([]);
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
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'background.paper' }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
          Scan
        </Typography>
      </Box>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <Card sx={{ m: 2, borderRadius: 2 }} onClick={viewCart}>
          <CardContent sx={{ py: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {totalItems} items in cart
              </Typography>
              <IconButton size="small">
                <ShoppingCart />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Scanner View */}
      <Box sx={{ flex: 1, position: 'relative', bgcolor: '#000', overflow: 'hidden' }}>
        {/* Scanner Frame */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 250,
            height: 250,
            border: '2px solid white',
            borderRadius: 2,
            zIndex: 2,
          }}
        >
          {/* Corner indicators */}
          <Box
            sx={{
              position: 'absolute',
              top: -2,
              left: -2,
              width: 20,
              height: 20,
              borderTop: '4px solid white',
              borderLeft: '4px solid white',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 20,
              height: 20,
              borderTop: '4px solid white',
              borderRight: '4px solid white',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              left: -2,
              width: 20,
              height: 20,
              borderBottom: '4px solid white',
              borderLeft: '4px solid white',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 20,
              height: 20,
              borderBottom: '4px solid white',
              borderRight: '4px solid white',
            }}
          />
        </Box>

        {/* Scanning Line Animation */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 2,
            bgcolor: 'primary.main',
            opacity: 0.8,
            animation: 'scan 2s ease-in-out infinite',
            '@keyframes scan': {
              '0%': { transform: 'translate(-50%, -150px)' },
              '50%': { transform: 'translate(-50%, 0px)' },
              '100%': { transform: 'translate(-50%, 150px)' },
            },
          }}
        />

        {/* Instructions */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white',
            px: 2,
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            Move the product slowly to capture all angles.
          </Typography>
          <Typography variant="body2">
            Center the product in the guide box.
          </Typography>
        </Box>

        {/* Bottom Controls */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Zoom Slider */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'white' }}>-</Typography>
            <Slider
              defaultValue={50}
              sx={{
                width: 100,
                color: 'white',
                '& .MuiSlider-thumb': {
                  bgcolor: 'primary.main',
                },
              }}
            />
            <Typography variant="body2" sx={{ color: 'white' }}>+</Typography>
          </Box>

          {/* Controls */}
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            <Add />
          </IconButton>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            <FlashlightOn />
          </IconButton>
          <IconButton sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <ShoppingCart />
          </IconButton>
        </Box>
      </Box>

      {/* Live Matches */}
      <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Live Match
        </Typography>
        <List sx={{ p: 0 }}>
          {liveMatches.map((item) => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <Card key={item.id} sx={{ mb: 1, borderRadius: 2 }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Avatar sx={{ mr: 2, fontSize: '1.5rem', bgcolor: 'transparent' }}>
                        {item.image}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="primary">
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
                          >
                            <Remove />
                          </IconButton>
                          <Typography variant="body1" sx={{ minWidth: 20, textAlign: 'center' }}>
                            {quantity}
                          </Typography>
                        </>
                      )}
                      <IconButton
                        size="small"
                        onClick={() => addToCart(item)}
                        sx={{ bgcolor: 'primary.main', color: 'white' }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}

export default ScanProduct;