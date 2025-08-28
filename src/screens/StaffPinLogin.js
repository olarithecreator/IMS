import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../utils/localStorage';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock,
  ArrowBack,
  Store,
} from '@mui/icons-material';

function StaffPinLogin() {
  const [store, setStore] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load available stores from companies
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    const allStores = companies.flatMap(company => 
      company.stores?.map(store => ({
        ...store,
        companyName: company.name,
        companyId: company.id,
      })) || []
    );
    setStores(allStores);
  }, []);

  const handleLogin = () => {
    setError('');

    if (!store) {
      setError('Please select a store');
      return;
    }

    if (!pin) {
      setError('Please enter your PIN');
      return;
    }

    // Find approved staff members
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const approvedStaff = users.filter(user => 
      (user.role === 'staff' || user.role === 'manager') && 
      user.status === 'approved' &&
      user.pin === pin
    );

    if (approvedStaff.length === 0) {
      setError('Invalid PIN or you are not authorized for this store');
      return;
    }

    // Find the staff member assigned to this specific store
    const selectedStore = stores.find(s => s.id.toString() === store);
    const staffMember = approvedStaff.find(staff => 
      staff.companyId === selectedStore?.companyId &&
      (staff.storeId === selectedStore?.id || staff.role === 'manager') // Managers can access any store in their company
    );

    if (!staffMember) {
      setError('You are not authorized to access this store');
      return;
    }

    // Login the staff member
    const loginUser = {
      ...staffMember,
      currentStoreId: selectedStore.id,
      currentStoreName: selectedStore.name,
    };

    saveUser(loginUser);
    navigate('/dashboard');
  };

  const handleForgotPin = () => {
    setError('Please contact your manager or business owner to reset your PIN.');
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 4 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/register')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Staff Login
        </Typography>
      </Box>

      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Store Selection */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Store
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Select
            value={store}
            onChange={(e) => setStore(e.target.value)}
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <Store />
              </InputAdornment>
            }
          >
            <MenuItem value="">
              <em>Select Store</em>
            </MenuItem>
            {stores.map((storeItem) => (
              <MenuItem key={storeItem.id} value={storeItem.id.toString()}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {storeItem.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {storeItem.companyName}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* PIN Input */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          PIN
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your 4-digit PIN"
          type={showPin ? 'text' : 'password'}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          inputProps={{ maxLength: 4, pattern: '[0-9]*' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPin(!showPin)}>
                  {showPin ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 1 }}
        />

        <Button variant="text" onClick={handleForgotPin} sx={{ mb: 3 }}>
          Forgot PIN/Password?
        </Button>

        <Button 
          fullWidth 
          size="large" 
          variant="contained" 
          onClick={handleLogin}
          sx={{ py: 1.5 }}
        >
          Login
        </Button>

        {/* Info Card */}
        <Card sx={{ mt: 3, bgcolor: 'info.50' }}>
          <CardContent sx={{ py: 2 }}>
            <Typography variant="body2" color="info.main">
              <strong>Don't have a PIN?</strong> Ask your manager or business owner to create your staff account and provide your PIN.
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}

export default StaffPinLogin;