import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Alert,
  AlertTitle,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Email,
  Lock,
  Security,
  CheckCircle,
  Warning,
  Info,
  Visibility,
  VisibilityOff,
  Refresh,
  Timer,
  Send,
  Key
} from '@mui/icons-material';

const AlertForgetPassword = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(parseInt(step) || 27);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const steps = [
    { label: 'Enter Email', value: 27 },
    { label: 'Verify Code', value: 27.1 },
    { label: 'Reset Password', value: 27.2 },
    { label: 'Success', value: 27.3 }
  ];

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextStep = Math.min(activeStep + 0.1, 27.3);
      setActiveStep(nextStep);
      navigate(`/forgot-password/${nextStep}`);
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(activeStep - 0.1, 27);
    setActiveStep(prevStep);
    navigate(`/forgot-password/${prevStep}`);
  };

  const handleStepClick = (stepValue) => {
    setActiveStep(stepValue);
    navigate(`/forgot-password/${stepValue}`);
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch (activeStep) {
      case 27: // Email
        if (!email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
      case 27.1: // Verification Code
        if (!verificationCode.trim()) {
          newErrors.verificationCode = 'Verification code is required';
        } else if (verificationCode.length !== 6) {
          newErrors.verificationCode = 'Verification code must be 6 digits';
        }
        break;
      case 27.2: // New Password
        if (!newPassword) {
          newErrors.newPassword = 'New password is required';
        } else if (newPassword.length < 8) {
          newErrors.newPassword = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
          newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
        }
        if (newPassword !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setCountdown(60);
      handleNext();
      
    } catch (error) {
      setErrors({ email: 'Failed to send verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setErrors({ verificationCode: 'Please enter the verification code' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      handleNext();
      
    } catch (error) {
      setErrors({ verificationCode: 'Invalid verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validateCurrentStep()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      handleNext();
      
    } catch (error) {
      setErrors({ general: 'Failed to reset password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setCountdown(60);
    setVerificationCode('');
    setErrors({});
  };

  const renderEnterEmail = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        Forgot Password?
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Don't worry! It happens. Please enter the email address associated with your account.
      </Typography>

      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardContent>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            placeholder="Enter your email address"
          />

          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>What happens next?</AlertTitle>
            We'll send a 6-digit verification code to your email address. 
            You can use this code to reset your password.
          </Alert>

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} /> : <Send />}
            onClick={handleSendCode}
            disabled={isLoading}
          >
            {isLoading ? 'Sending Code...' : 'Send Verification Code'}
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderVerifyCode = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        Verify Your Email
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        We've sent a verification code to <strong>{email}</strong>
      </Typography>

      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardContent>
          <TextField
            fullWidth
            label="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            error={!!errors.verificationCode}
            helperText={errors.verificationCode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Security />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            placeholder="Enter 6-digit code"
            inputProps={{ maxLength: 6 }}
          />

          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Code Expiration</AlertTitle>
            The verification code will expire in {countdown} seconds. 
            If you don't receive the code, check your spam folder.
          </Alert>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={isLoading ? <CircularProgress size={20} /> : <CheckCircle />}
                onClick={handleVerifyCode}
                disabled={isLoading || !verificationCode.trim()}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={handleResendCode}
              disabled={countdown > 0}
              startIcon={countdown > 0 ? <Timer /> : <Refresh />}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderResetPassword = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        Reset Your Password
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Create a new password for your account. Make sure it's secure and easy to remember.
      </Typography>

      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardContent>
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            placeholder="Enter new password"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            placeholder="Confirm new password"
          />

          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Password Requirements</AlertTitle>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {newPassword.length >= 8 ? <CheckCircle color="success" /> : <Info color="action" />}
                </ListItemIcon>
                <ListItemText primary="At least 8 characters long" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {/(?=.*[a-z])/.test(newPassword) ? <CheckCircle color="success" /> : <Info color="action" />}
                </ListItemIcon>
                <ListItemText primary="Contains lowercase letter" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {/(?=.*[A-Z])/.test(newPassword) ? <CheckCircle color="success" /> : <Info color="action" />}
                </ListItemIcon>
                <ListItemText primary="Contains uppercase letter" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {/(?=.*\d)/.test(newPassword) ? <CheckCircle color="success" /> : <Info color="action" />}
                </ListItemIcon>
                <ListItemText primary="Contains number" />
              </ListItem>
            </List>
          </Alert>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={isLoading ? <CircularProgress size={20} /> : <Key />}
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );

  const renderSuccess = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        Password Reset Successful!
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Your password has been successfully reset. You can now log in with your new password.
      </Typography>

      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <CheckCircle color="success" sx={{ fontSize: 64 }} />
          </Box>
          
          <Alert severity="success" sx={{ mb: 3 }}>
            <AlertTitle>Success!</AlertTitle>
            Your password has been updated successfully. Please keep it secure and don't share it with anyone.
          </Alert>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            startIcon={<Lock />}
          >
            Go to Login
          </Button>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Having trouble? <Button variant="text" onClick={() => setOpenDialog(true)}>Contact Support</Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderContent = () => {
    switch (activeStep) {
      case 27: return renderEnterEmail();
      case 27.1: return renderVerifyCode();
      case 27.2: return renderResetPassword();
      case 27.3: return renderSuccess();
      default: return renderEnterEmail();
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      p: 3,
      bgcolor: 'grey.50'
    }}>
      {/* Stepper */}
      <Paper sx={{ p: 2, mb: 3, maxWidth: 800, mx: 'auto', width: '100%' }}>
        <Stepper activeStep={steps.findIndex(step => step.value === activeStep)}>
          {steps.map((stepItem) => (
            <Step key={stepItem.value}>
              <StepLabel
                onClick={() => handleStepClick(stepItem.value)}
                sx={{ cursor: 'pointer' }}
              >
                {stepItem.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      {renderContent()}

      {/* Support Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Support</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            If you're experiencing issues with password reset, please contact our support team:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="support@company.com" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Live chat available 24/7" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertForgetPassword;


