import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers, saveUser } from '../utils/localStorage';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Step,
  Stepper,
  StepLabel,
} from '@mui/material';
import { 
  Google, 
  Apple, 
  Email, 
  Visibility, 
  VisibilityOff, 
  Person,
  Business,
  ArrowBack,
} from '@mui/icons-material';

function OwnerRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    storeName: '',
    address: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const steps = ['Personal Info', 'Business Details', 'Account Setup'];

  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const handleNext = () => {
    setError('');
    
    if (activeStep === 0) {
      // Validate personal info
      if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!formData.email || !validateEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
    } else if (activeStep === 1) {
      // Validate business info
      if (!formData.companyName?.trim() || !formData.storeName?.trim()) {
        setError('Please enter your company and store name');
        return;
      }
    }
    
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Final validation
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = getUsers();
    const existing = users.find(u => String(u.email).toLowerCase() === formData.email.toLowerCase());
    if (existing) {
      setError('Email is already registered. Please sign in.');
      return;
    }

    // Create owner user
    const newUser = {
      id: Date.now(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: 'owner',
      provider: 'email',
      verified: true,
      companyId: Date.now(),
      companyName: formData.companyName.trim(),
      permissions: ['all'], // Full permissions for owner
    };

    // Create company/store record
    const company = {
      id: newUser.companyId,
      name: formData.companyName.trim(),
      owner: newUser.id,
      stores: [{
        id: Date.now(),
        name: formData.storeName.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        managerId: newUser.id,
      }],
      createdAt: new Date().toISOString(),
    };

    try {
      // Save user
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Save company
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      companies.push(company);
      localStorage.setItem('companies', JSON.stringify(companies));

      setSuccess('Business account created successfully! Please login to continue.');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to create account. Please try again.');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={updateField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={updateField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                fullWidth
                value={formData.email}
                onChange={updateField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="companyName"
                label="Company Name"
                fullWidth
                value={formData.companyName}
                onChange={updateField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="storeName"
                label="Store Name"
                fullWidth
                value={formData.storeName}
                onChange={updateField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Store Address (Optional)"
                fullWidth
                multiline
                rows={2}
                value={formData.address}
                onChange={updateField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                label="Phone Number (Optional)"
                fullWidth
                value={formData.phone}
                onChange={updateField}
              />
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={formData.password}
                onChange={updateField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                value={formData.confirmPassword}
                onChange={updateField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 2, sm: 6 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ width: '100%', borderRadius: 3, p: { xs: 2, sm: 4 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/register')} sx={{ mr: 1 }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Create Business Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Register as a business owner
              </Typography>
            </Box>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button type="submit" variant="contained">
                  Create Account
                </Button>
              ) : (
                <Button onClick={handleNext} variant="contained">
                  Next
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default OwnerRegister;