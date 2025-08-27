import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Close } from '@mui/icons-material';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSendReset = () => {
    if (email) {
      // Store email for reset flow
      localStorage.setItem('resetEmail', email);
      navigate('/reset-password');
    }
  };

  return (
    <Dialog open={true} onClose={() => navigate('/login')} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <Container maxWidth="sm" sx={{ py: 4, px: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={() => navigate('/login')}>
              <Close />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Forgot Password
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 4 }}>
              Enter your email or employee ID
            </Typography>

            <TextField
              fullWidth
              placeholder="Email or Employee ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                },
              }}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSendReset}
              disabled={!email}
              sx={{
                py: 2,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Send Reset Link
            </Button>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPassword;