import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { ArrowBack, Share, Download, Print, ShoppingCart } from '@mui/icons-material';

function Receipt() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Get sale data from location state or localStorage
  const saleData = location.state?.sale || JSON.parse(localStorage.getItem('sales') || '[]').find(s => s.id.toString() === id);
  const fromNewSale = location.state?.fromNewSale;

  if (!saleData) {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">Receipt not found</Typography>
      </Container>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Receipt',
        text: `Receipt for Order #${saleData.id}`,
      });
    }
  };

  const handleDownload = () => {
    // Simulate download functionality
    console.log('Downloading receipt...');
  };

  const handleBack = () => {
    if (fromNewSale) {
      navigate('/dashboard/sales');
    } else {
      navigate(-1);
    }
  };

  const handleNewSale = () => {
    navigate('/dashboard/sales/new');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 2
      }}>
        <IconButton 
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Receipt
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleShare} title="Share">
            <Share />
          </IconButton>
          <IconButton onClick={handleDownload} title="Download">
            <Download />
          </IconButton>
          <IconButton onClick={() => window.print()} title="Print">
            <Print />
          </IconButton>
        </Stack>
      </Box>

      {/* Receipt Content */}
      <Paper sx={{ flex: 1, p: 3, borderRadius: 2, mx: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Order Details
        </Typography>

        {/* Order Info */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Order ID</Typography>
            <Typography variant="body2">#{saleData.id || '12345'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Date</Typography>
            <Typography variant="body2">
              {new Date(saleData.date || Date.now()).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Staff</Typography>
            <Typography variant="body2" sx={{ color: 'primary.main' }}>Ade</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Payment Method</Typography>
            <Typography variant="body2">{saleData.paymentMethod || 'Cash'}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Items */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Items
        </Typography>

        {saleData.items?.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                ₦{item.total?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                {item.quantity} x ₦{item.price?.toLocaleString() || '0'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discount: -₦0
              </Typography>
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Summary */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Summary
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">₦{saleData.subtotal?.toLocaleString() || '0'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Discount</Typography>
            <Typography variant="body1" color="error">
              ₦{saleData.discount?.toLocaleString() || '0'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">VAT</Typography>
            <Typography variant="body1">₦0</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ₦{saleData.total?.toLocaleString() || '0'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={handleNewSale}
          sx={{
            py: 2,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          New Sale
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Share />}
            onClick={handleShare}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Share
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Download />}
            onClick={handleDownload}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Print />}
            onClick={() => window.print()}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Print
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Receipt;