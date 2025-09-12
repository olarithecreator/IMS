import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Chip,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import {
  Store,
  ShoppingCart,
  Analytics,
  Security,
  CheckCircle,
  ArrowForward,
  ArrowBack,
  Business,
  Person,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Onboarding = () => {
  const { step = '1.0' } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    location: '',
    email: '',
    phone: '',
    employeeCount: '',
    annualRevenue: '',
    goals: [],
    features: []
  });

  const steps = [
    { id: '1.0', label: 'Welcome', title: 'Welcome to IMS', description: 'Your Inventory Management Solution' },
    { id: '1.1', label: 'Business Info', title: 'Tell us about your business', description: 'Help us customize your experience' },
    { id: '1.2', label: 'Business Type', title: 'What type of business?', description: 'Select your business category' },
    { id: '1.3', label: 'Location', title: 'Where are you located?', description: 'Set your business location' },
    { id: '2.0', label: 'Goals', title: 'What are your goals?', description: 'Choose your primary objectives' },
    { id: '2.1', label: 'Features', title: 'Key features you need', description: 'Select essential features' },
    { id: '2.2', label: 'Team Size', title: 'How big is your team?', description: 'Number of employees' },
    { id: '2.3', label: 'Complete', title: 'You\'re all set!', description: 'Ready to get started' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);
  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1].id;
      navigate(`/onboarding/${nextStep}`);
    } else {
      navigate('/register');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1].id;
      navigate(`/onboarding/${prevStep}`);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (step) {
      case '1.0':
        return (
          <Box textAlign="center" py={4}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, bgcolor: 'primary.main' }}>
              <Store sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" gutterBottom color="primary">
              Welcome to IMS
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Your complete Inventory Management Solution
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Streamline your inventory, track sales, and grow your business with our powerful platform.
            </Typography>
            <Box mt={4}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item>
                  <Card sx={{ textAlign: 'center', p: 2 }}>
                    <ShoppingCart sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">Inventory Management</Typography>
                  </Card>
                </Grid>
                <Grid item>
                  <Card sx={{ textAlign: 'center', p: 2 }}>
                    <Analytics sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">Sales Analytics</Typography>
                  </Card>
                </Grid>
                <Grid item>
                  <Card sx={{ textAlign: 'center', p: 2 }}>
                    <Security sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">Secure & Reliable</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );

      case '1.1':
        return (
          <Box py={4}>
            <Typography variant="h4" gutterBottom>
              Tell us about your business
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              This helps us customize your experience and provide relevant features.
            </Typography>
            <Grid container spacing={3} mt={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Business Name"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Description"
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Briefly describe what your business does..."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case '1.2':
        return (
          <Box py={4}>
            <Typography variant="h4" gutterBottom>
              What type of business do you run?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Select the category that best describes your business.
            </Typography>
            <Grid container spacing={3} mt={3}>
              {['Retail Store', 'E-commerce', 'Wholesale', 'Manufacturing', 'Restaurant', 'Service Business', 'Other'].map((type) => (
                <Grid item xs={12} sm={6} md={4} key={type}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: formData.businessType === type ? 2 : 1,
                      borderColor: formData.businessType === type ? 'primary.main' : 'divider',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                    onClick={() => handleInputChange('businessType', type)}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Business sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6">{type}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case '1.3':
        return (
          <Box py={4}>
            <Typography variant="h4" gutterBottom>
              Where is your business located?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              This helps us provide location-specific features and support.
            </Typography>
            <Grid container spacing={3} mt={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State/Province"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Address"
                  variant="outlined"
                  placeholder="Street address, building, etc."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case '2.0':
        return (
          <Box py={4}>
            <Typography variant="h4" gutterBottom>
              What are your primary business goals?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Select all that apply to help us prioritize features for you.
            </Typography>
            <Grid container spacing={3} mt={3}>
              {[
                'Increase sales and revenue',
                'Reduce inventory costs',
                'Improve customer satisfaction',
                'Streamline operations',
                'Better financial tracking',
                'Expand to new markets',
                'Improve team productivity'
              ].map((goal) => (
                <Grid item xs={12} sm={6} key={goal}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.goals.includes(goal)}
                        onChange={(e) => {
                          const newGoals = e.target.checked
                            ? [...formData.goals, goal]
                            : formData.goals.filter(g => g !== goal);
                          handleInputChange('goals', newGoals);
                        }}
                      />
                    }
                    label={goal}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case '2.1':
        return (
          <Box py={4}>
            <Typography variant="h4" gutterBottom>
              Which features are most important to you?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Choose the features that will have the biggest impact on your business.
            </Typography>
            <Grid container spacing={3} mt={3}>
              {[
                'Real-time inventory tracking',
                'Sales analytics and reporting',
                'Customer management',
                'Supplier management',
                'Multi-location support',
                'Mobile app access',
                'Barcode scanning',
                'Automated reordering'
              ].map((feature) => (
                <Grid item xs={12} sm={6} key={feature}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.features.includes(feature)}
                        onChange={(e) => {
                          const newFeatures = e.target.checked
                            ? [...formData.features, feature]
                            : formData.features.filter(f => f !== feature);
                          handleInputChange('features', newFeatures);
                        }}
                      />
                    }
                    label={feature}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case '2.2':
        return (
          <Box py={4}>
            <Typography variant="h4" gutterBottom>
              How many employees work in your business?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              This helps us determine the right plan and features for your team size.
            </Typography>
            <Grid container spacing={3} mt={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  >
                    {[
                      '1-5 employees',
                      '6-20 employees',
                      '21-50 employees',
                      '51-100 employees',
                      '100+ employees'
                    ].map((count) => (
                      <FormControlLabel
                        key={count}
                        value={count}
                        control={<Radio />}
                        label={count}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case '2.3':
        return (
          <Box textAlign="center" py={4}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            <Typography variant="h3" gutterBottom color="success.main">
              You're all set!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              We've gathered all the information we need to customize your IMS experience.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Your personalized dashboard and features are ready. Let's get you started!
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                endIcon={<ArrowForward />}
                sx={{ px: 4, py: 1.5 }}
              >
                Create Your Account
              </Button>
            </Box>
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
          <Typography variant="h4" color="primary" gutterBottom>
            {currentStep.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentStep.description}
          </Typography>
        </Box>

        {/* Stepper */}
        <Box mb={4}>
          <Stepper activeStep={currentStepIndex} alternativeLabel>
            {steps.map((stepItem) => (
              <Step key={stepItem.id}>
                <StepLabel>{stepItem.label}</StepLabel>
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
            disabled={currentStepIndex === 0}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={currentStepIndex === steps.length - 1 ? null : <ArrowForward />}
          >
            {currentStepIndex === steps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Onboarding;
