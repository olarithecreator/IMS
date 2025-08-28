import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers, saveUser, initializeUserData } from '../utils/localStorage';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  Grid,
  Alert,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Google, 
  Apple,
  Store,
  Smartphone,
} from '@mui/icons-material';

function ResponsiveLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      const users = getUsers();
      const user = users.find(u => 
        String(u.email).toLowerCase() === formData.email.toLowerCase() && 
        u.password === formData.password
      );

      if (!user) {
        setError('Invalid email or password');
        return;
      }

      if (!user.verified) {
        setError('Please verify your account first');
        return;
      }

      // Save logged in user
      saveUser(user);
      
      // Initialize sample data for new users
      initializeUserData(user.id);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError(`${provider} login is coming soon!`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
        backgroundImage: isMobile ? 'none' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', py: { xs: 2, sm: 4 } }}>
        <Grid container spacing={0} sx={{ minHeight: { md: '80vh' } }}>
          {/* Left Side - Branding (Hidden on mobile) */}
          {!isMobile && (
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ color: 'white', p: { sm: 4, md: 6 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Store sx={{ fontSize: 48, mr: 2 }} />
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    InventoryPro
                  </Typography>
                </Box>
                
                <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                  Streamline Your Business Operations
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4, opacity: 0.8, lineHeight: 1.6 }}>
                  Manage inventory, track sales, monitor staff performance, and grow your business with our comprehensive management platform.
                </Typography>

                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                      }}
                    >
                      <Store />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Multi-Store Management
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Manage multiple locations from one dashboard
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                      }}
                    >
                      <Smartphone />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Mobile Optimized
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Access your business data anywhere, anytime
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          )}

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Paper
              elevation={isMobile ? 0 : 20}
              sx={{
                width: '100%',
                maxWidth: 480,
                mx: 'auto',
                p: { xs: 3, sm: 4, md: 6 },
                borderRadius: { xs: 0, sm: 4 },
                bgcolor: 'background.paper',
              }}
            >
              {/* Mobile Header */}
              {isMobile && (
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Store sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    InventoryPro
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Welcome back! Please sign in to continue.
                  </Typography>
                </Box>
              )}

              {!isMobile && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Please sign in to your account
                  </Typography>
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={updateField}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={updateField}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'text.secondary' }} />
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
                />

                <Box sx={{ textAlign: 'right', mb: 3 }}>
                  <Link 
                    to="/forgot-password" 
                    style={{ 
                      textDecoration: 'none', 
                      color: theme.palette.primary.main,
                      fontSize: '0.875rem',
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mb: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Divider sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    or continue with
                  </Typography>
                </Divider>

                {/* Social Login Buttons */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Google />}
                      onClick={() => handleSocialLogin('Google')}
                      sx={{ 
                        py: 1.2, 
                        borderRadius: 2,
                        textTransform: 'none',
                      }}
                    >
                      Google
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Apple />}
                      onClick={() => handleSocialLogin('Apple')}
                      sx={{ 
                        py: 1.2, 
                        borderRadius: 2,
                        textTransform: 'none',
                      }}
                    >
                      Apple
                    </Button>
                  </Grid>
                </Grid>

                {/* Quick Login Options */}
                <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                      Quick Access
                    </Typography>
                    <Stack spacing={1}>
                      <Button
                        fullWidth
                        variant="text"
                        size="small"
                        onClick={() => navigate('/staff-login')}
                        sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                      >
                        Staff/Employee Login
                      </Button>
                      <Button
                        fullWidth
                        variant="text"
                        size="small"
                        onClick={() => navigate('/register')}
                        sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                      >
                        Create New Business Account
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Sign Up Link */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      style={{ 
                        textDecoration: 'none', 
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ResponsiveLogin;