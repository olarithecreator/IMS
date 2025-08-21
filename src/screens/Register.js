import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Chip
} from '@mui/material';
import { Google, Apple, Email, Visibility, VisibilityOff, Person } from '@mui/icons-material';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const persistAndLogin = (user) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      company: user.company,
      role: user.role,
      provider: user.provider
    }));
    navigate('/dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Enter a valid email address');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existing = users.find(u => String(u.email).toLowerCase() === formData.email.toLowerCase());
    if (existing) {
      setError('Email is already registered. Please sign in.');
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      company: '',
      role: 'admin',
      provider: 'password'
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setSuccess('Account created successfully');
    persistAndLogin(newUser);
  };

  const handleSocialSignIn = (provider) => {
    setError('');
    setSuccess('');
    const inputEmail = window.prompt(`Enter your ${provider === 'google' ? 'Google' : 'Apple'} email to continue:`) || '';
    const email = inputEmail.trim();
    if (!email) return;
    if (!validateEmail(email)) {
      setError('Enter a valid email address');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => String(u.email).toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: Date.now(),
        firstName: 'New',
        lastName: 'User',
        email,
        password: '',
        company: '',
        role: 'admin',
        provider
      };
      localStorage.setItem('users', JSON.stringify([...users, user]));
    }
    persistAndLogin(user);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 2, sm: 6 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ width: '100%', borderRadius: 3, p: { xs: 2, sm: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 800 }}>Create your Account</Typography>
            <Typography variant="body2" color="text.secondary">
              Sign up with your email, Google or Apple.
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleRegister}>
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
              <Grid item xs={12} sm={6}>
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
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" aria-label="toggle confirm password visibility">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth color="primary" variant="contained" sx={{ mt: 3 }}>Create Account</Button>
          </Box>

          <Divider sx={{ my: 3 }}><Typography variant="caption" color="text.secondary">OR CONTINUE WITH</Typography></Divider>

          <Grid container spacing={2}>
            <Grid item xs={6}><Button fullWidth variant="outlined" startIcon={<Google />} onClick={() => handleSocialSignIn('google')}>Google</Button></Grid>
            <Grid item xs={6}><Button fullWidth variant="outlined" startIcon={<Apple />} onClick={() => handleSocialSignIn('apple')}>Apple</Button></Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2">Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Sign In</Link></Typography>
            <Box sx={{ mt: 1 }}>
              <Link to="/dashboard/staff-login" style={{ textDecoration: 'none' }}>
                <Chip label="Store Staff Login" variant="outlined" />
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;