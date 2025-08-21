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
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Apple,
} from '@mui/icons-material';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = (user) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Check credentials against stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      // Approval check for non-admins
      if (user.role !== 'admin') {
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const company = companies.find(c => c.name.toLowerCase() === String(user.company || '').toLowerCase());
        const approved = company?.users?.some(u => u.email === user.email);
        if (!approved) {
          setError('Your account is pending approval by your company admin.');
          return;
        }
      }

      loginUser(user);
    } else {
      setError('Invalid email or password');
    }
  };

  const validateEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const handleSocialLogin = (provider) => {
    setError('');
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
    loginUser(user);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 3,
          }}
        >
          <Typography component="h1" sx={{ typography: { xs: 'h5', sm: 'h4' } }} gutterBottom>
            Inventory Management System
          </Typography>
          <Typography component="h2" sx={{ typography: { xs: 'subtitle1', sm: 'h6' } }} color="textSecondary" gutterBottom>
            Sign in to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ width: '100%', textAlign: 'right', mt: 1 }}>
              <Link to="/dashboard/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">Forgot password?</Typography>
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: { xs: 1, sm: 1.25 } }}
            >
              Sign In
            </Button>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 1 }}>OR</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button fullWidth variant="outlined" startIcon={<Google />} onClick={() => handleSocialLogin('google')}>Google</Button>
              <Button fullWidth variant="outlined" startIcon={<Apple />} onClick={() => handleSocialLogin('apple')}>Apple</Button>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login; 