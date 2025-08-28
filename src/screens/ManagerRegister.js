import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers } from '../utils/localStorage';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import { 
  Email, 
  Visibility, 
  VisibilityOff, 
  Person,
  Business,
  ArrowBack,
  Search,
} from '@mui/icons-material';

function ManagerRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    requestMessage: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load companies from localStorage
    const companiesData = JSON.parse(localStorage.getItem('companies') || '[]');
    setCompanies(companiesData);
    setFilteredCompanies(companiesData);
  }, []);

  const updateField = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'companyName') {
      // Filter companies based on search
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  const validateEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.companyName?.trim()) {
      setError('Please select or enter a company name');
      return;
    }

    const users = getUsers();
    const existing = users.find(u => String(u.email).toLowerCase() === formData.email.toLowerCase());
    if (existing) {
      setError('Email is already registered. Please sign in.');
      return;
    }

    // Find the company
    const selectedCompany = companies.find(c => 
      c.name.toLowerCase() === formData.companyName.toLowerCase()
    );

    // Create manager request
    const managerRequest = {
      id: Date.now(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: 'manager',
      provider: 'email',
      status: 'pending', // Pending approval from owner
      companyName: formData.companyName.trim(),
      companyId: selectedCompany?.id || null,
      requestMessage: formData.requestMessage.trim(),
      requestedAt: new Date().toISOString(),
    };

    try {
      // Store the request for admin approval
      const requests = JSON.parse(localStorage.getItem('managerRequests') || '[]');
      requests.push(managerRequest);
      localStorage.setItem('managerRequests', JSON.stringify(requests));

      setSuccess('Request submitted successfully! The business owner will review your application.');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to submit request. Please try again.');
    }
  };

  const selectCompany = (company) => {
    setFormData({ ...formData, companyName: company.name });
    setFilteredCompanies([company]);
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
                Join as Manager
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Request to join an existing business
              </Typography>
            </Box>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Personal Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
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

            {/* Company Selection */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Company Information
            </Typography>
            <TextField
              name="companyName"
              label="Search Company Name"
              fullWidth
              value={formData.companyName}
              onChange={updateField}
              placeholder="Start typing to search for companies..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            {/* Company Suggestions */}
            {formData.companyName && filteredCompanies.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Select from existing companies:
                </Typography>
                {filteredCompanies.slice(0, 3).map((company) => (
                  <Card 
                    key={company.id} 
                    sx={{ 
                      mb: 1, 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => selectCompany(company)}
                  >
                    <CardContent sx={{ py: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {company.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {company.stores?.length || 0} store(s)
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            <TextField
              name="requestMessage"
              label="Message to Business Owner (Optional)"
              fullWidth
              multiline
              rows={3}
              value={formData.requestMessage}
              onChange={updateField}
              placeholder="Tell the owner why you want to join their business..."
              sx={{ mb: 3 }}
            />

            {/* Password */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Account Security
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
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

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.5 }}>
              Submit Request
            </Button>
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

export default ManagerRegister;