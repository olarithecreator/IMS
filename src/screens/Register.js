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
import { Phone, Google, Apple, Email } from '@mui/icons-material';

function Register() {
  const [countryCode, setCountryCode] = useState('+234');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();
    setError('');
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      setError('Enter a valid phone number');
      return;
    }
    localStorage.setItem('pendingPhone', JSON.stringify({ countryCode, phone: phoneDigits }));
    setSuccess(true);
    setTimeout(() => navigate('/verification'), 800);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 2, sm: 6 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ width: '100%', borderRadius: 3, p: { xs: 2, sm: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 800 }}>Create your Account</Typography>
            <Typography variant="body2" color="text.secondary">
              Let's get you started on managing your inventory.
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Code sent!</Alert>}

          <Box component="form" onSubmit={handleSendCode}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>Phone Number</Typography>
            <Grid container spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              <Grid item xs={4} sm={3}>
                <TextField
                  fullWidth
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  inputProps={{ maxLength: 5 }}
                />
              </Grid>
              <Grid item xs={8} sm={9}>
                <TextField
                  fullWidth
                  placeholder="801 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth color="primary" sx={{ mt: 2 }}>Send Code</Button>
          </Box>

          <Divider sx={{ my: 3 }}><Typography variant="caption" color="text.secondary">OR CONTINUE WITH</Typography></Divider>

          <Grid container spacing={2}>
            <Grid item xs={4}><Button fullWidth variant="outlined" startIcon={<Google />}>Google</Button></Grid>
            <Grid item xs={4}><Button fullWidth variant="outlined" startIcon={<Apple />}>Apple</Button></Grid>
            <Grid item xs={4}><Button fullWidth variant="outlined" startIcon={<Email />}>Email</Button></Grid>
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