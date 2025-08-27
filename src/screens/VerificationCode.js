import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  TextField,
  Link,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function VerificationCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const phoneNumber = location.state?.phoneNumber || '+234 801 234 5678';

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      // Store verification in localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.verified = true;
      localStorage.setItem('userData', JSON.stringify(userData));
      
      navigate('/store-setup');
    }
  };

  const handleResend = () => {
    // Simulate resending code
    console.log('Resending verification code...');
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
          Enter Verification Code
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          We've sent a 6-digit code to {phoneNumber}.
        </Typography>

        {/* Code Input */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3 }}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              id={`code-${index}`}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              variant="outlined"
              sx={{
                width: 48,
                height: 48,
                '& .MuiOutlinedInput-root': {
                  height: 48,
                  borderRadius: 2,
                },
                '& .MuiOutlinedInput-input': {
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                },
              }}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' },
              }}
            />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Didn't get a code?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={handleResend}
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Resend
            </Link>
          </Typography>
        </Box>

        {/* Verify Button */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleVerify}
          disabled={code.join('').length !== 6}
          sx={{
            py: 2,
            borderRadius: 3,
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Verify
        </Button>
      </Box>
    </Container>
  );
}

export default VerificationCode;