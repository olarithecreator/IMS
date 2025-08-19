import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Grid,
  Avatar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import {
  Email,
  CheckCircle,
  ArrowForward,
  Replay,
  Timer,
  Lock
} from '@mui/icons-material';

const Verification = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit code
      if (code === '123456') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setCountdown(30);
    setError('');
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message or handle accordingly
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: { xs: 64, sm: 80 }, color: 'success.main', mb: 3 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            Email Verified!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Your email has been successfully verified. Redirecting you to login...
          </Typography>
          <CircularProgress size={24} sx={{ mt: 2 }} />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Avatar sx={{ width: { xs: 64, sm: 80 }, height: { xs: 64, sm: 80 }, mx: 'auto', mb: 3, bgcolor: 'primary.main' }}>
            <Email sx={{ fontSize: { xs: 32, sm: 40 } }} />
          </Avatar>
          <Typography variant="h4" gutterBottom>
            Verify Your Email
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We've sent a 6-digit verification code to your email address.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please check your inbox and enter the code below.
          </Typography>
        </Box>

        {/* Verification Code Input */}
        <Box mb={{ xs: 3, sm: 4 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Enter Verification Code
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {verificationCode.map((digit, index) => (
              <Grid item key={index}>
                <TextField
                  data-index={index}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  variant="outlined"
                  size="small"
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center', fontSize: '1.25rem' }
                  }}
                  sx={{
                    width: { xs: 48, sm: 60 },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: digit ? 'primary.main' : 'divider',
                      },
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Error/Success Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Verify Button */}
        <Box textAlign="center" mb={3}>
          <Button
            variant="contained"
            size="large"
            onClick={handleVerify}
            disabled={!isCodeComplete || isLoading}
            endIcon={isLoading ? <CircularProgress size={20} /> : <ArrowForward />}
            sx={{ px: 4, py: 1.5, minWidth: 200 }}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        {/* Resend Code */}
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Didn't receive the code?
          </Typography>
          <Button
            variant="text"
            onClick={handleResend}
            disabled={!canResend}
            startIcon={canResend ? <Replay /> : <Timer />}
            sx={{ minWidth: 150 }}
          >
            {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
          </Button>
        </Box>

        {/* Back to Register */}
        <Box textAlign="center" mt={3}>
          <Button
            variant="text"
            onClick={() => navigate('/register')}
            sx={{ textTransform: 'none' }}
          >
            ← Back to Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Verification;


