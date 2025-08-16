import React, { useState } from 'react';
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
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Store,
  Business,
  LocationOn,
  Settings,
  ArrowForward,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';

const StoreSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [storeData, setStoreData] = useState({
    storeName: '',
    storeType: '',
    industry: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    currency: 'USD',
    timezone: 'UTC',
    taxRate: '',
    enableNotifications: true,
    enableAnalytics: true,
    enableMultiLocation: false,
    enableBarcodeScanning: true,
    enableAutomatedReordering: false
  });

  const steps = [
    'Basic Information',
    'Location & Contact',
    'Business Settings',
    'Features & Preferences'
  ];

  const handleInputChange = (field, value) => {
    setStoreData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete setup and navigate to dashboard
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/login');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Basic Store Information
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Let's start with the essential details about your store.
            </Typography>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Store Name"
                  value={storeData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Store Type</InputLabel>
                  <Select
                    value={storeData.storeType}
                    label="Store Type"
                    onChange={(e) => handleInputChange('storeType', e.target.value)}
                  >
                    <MenuItem value="retail">Retail Store</MenuItem>
                    <MenuItem value="ecommerce">E-commerce</MenuItem>
                    <MenuItem value="wholesale">Wholesale</MenuItem>
                    <MenuItem value="restaurant">Restaurant</MenuItem>
                    <MenuItem value="service">Service Business</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Industry"
                  value={storeData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website (Optional)"
                  value={storeData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  variant="outlined"
                  placeholder="https://yourstore.com"
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Location & Contact Details
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Where is your store located and how can customers reach you?
            </Typography>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={storeData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={storeData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={storeData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  value={storeData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={storeData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={storeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  variant="outlined"
                  type="email"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Business Settings
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Configure your business preferences and operational settings.
            </Typography>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={storeData.currency}
                    label="Currency"
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                    <MenuItem value="CAD">CAD (C$)</MenuItem>
                    <MenuItem value="AUD">AUD (A$)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={storeData.timezone}
                    label="Timezone"
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="EST">Eastern Time</MenuItem>
                    <MenuItem value="CST">Central Time</MenuItem>
                    <MenuItem value="MST">Mountain Time</MenuItem>
                    <MenuItem value="PST">Pacific Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tax Rate (%)"
                  value={storeData.taxRate}
                  onChange={(e) => handleInputChange('taxRate', e.target.value)}
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 0, max: 100, step: 0.01 }}
                  placeholder="8.25"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={storeData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Features & Preferences
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Choose which features you'd like to enable for your store.
            </Typography>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6">Notifications</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Get alerts for low stock, sales, and important updates
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={storeData.enableNotifications}
                            onChange={(e) => handleInputChange('enableNotifications', e.target.checked)}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6">Analytics</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Track sales performance and business insights
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={storeData.enableAnalytics}
                            onChange={(e) => handleInputChange('enableAnalytics', e.target.checked)}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6">Barcode Scanning</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Scan products for quick inventory management
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={storeData.enableBarcodeScanning}
                            onChange={(e) => handleInputChange('enableBarcodeScanning', e.target.checked)}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6">Multi-Location</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Manage multiple store locations
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={storeData.enableMultiLocation}
                            onChange={(e) => handleInputChange('enableMultiLocation', e.target.checked)}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, bgcolor: 'primary.main' }}>
            <Store sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom color="primary">
            Store Setup
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your store settings and preferences
          </Typography>
        </Box>

        {/* Stepper */}
        <Box mb={4}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation */}
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            {currentStep === 0 ? 'Back to Login' : 'Previous'}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={currentStep === steps.length - 1 ? <CheckCircle /> : <ArrowForward />}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default StoreSetup;


