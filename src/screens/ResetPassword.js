import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';

function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState('verification'); // 'verification', 'newPassword', 'success'
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`reset-code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerifyCode = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      setStep('newPassword');
    }
  };

  const handleSetNewPassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      setStep('success');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (step === 'verification') {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Verification
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
            Enter the code we just sent to your email
          </Typography>

          {/* Code Input */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3, mt: 4 }}>
            {code.map((digit, index) => (
              <TextField
                key={index}
                id={`reset-code-${index}`}
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
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'underline' }}>
              Didn't receive a code?
            </Typography>
          </Box>

          {/* Verify Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleVerifyCode}
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

  if (step === 'newPassword') {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
          <IconButton onClick={() => setStep('verification')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            New password
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2 }}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: '#f5f5f5',
              },
            }}
          />

          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
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
            onClick={handleSetNewPassword}
            disabled={!newPassword || newPassword !== confirmPassword}
            sx={{
              py: 2,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            Set new password
          </Button>
        </Box>
      </Container>
    );
  }

  if (step === 'success') {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
          <IconButton onClick={handleBackToLogin}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Reset password
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Password reset
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your password has been successfully reset.
            You can now log in with your new password.
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleBackToLogin}
            sx={{
              py: 2,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            Back to login
          </Button>
        </Box>
      </Container>
    );
  }
}

export default ResetPassword;