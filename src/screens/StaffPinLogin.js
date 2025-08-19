import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, InputAdornment, IconButton, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';

function StaffPinLogin() {
  const [store, setStore] = useState('');
  const [pin, setPin] = useState('');
  const [show, setShow] = useState(false);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Staff Login</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Store</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select value={store} onChange={e=>setStore(e.target.value)} displayEmpty>
            <MenuItem value=""><em>Select Store</em></MenuItem>
            <MenuItem value="Main Street Store">Main Street Store</MenuItem>
            <MenuItem value="Outlet Branch">Outlet Branch</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>PIN</Typography>
        <TextField fullWidth placeholder="Enter PIN" type={show ? 'text' : 'password'} value={pin} onChange={e=>setPin(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>setShow(!show)}>{show ? <VisibilityOff /> : <Visibility />}</IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 1 }}
        />
        <Button variant="text" sx={{ mb: 3 }}>Forgot PIN/Password</Button>

        <Button fullWidth size="large" variant="contained">Login</Button>
      </Paper>
    </Container>
  );
}

export default StaffPinLogin;


