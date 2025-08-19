import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

function ConfirmInvite() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Manager');
  const [store, setStore] = useState("Mama's Groceries");
  const [pin, setPin] = useState('');

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Typography align="center" variant="overline" color="text.secondary">Welcome</Typography>
        <Typography align="center" variant="h5" sx={{ mb: 3, fontWeight: 800 }}>Confirm your details</Typography>
        <TextField fullWidth label="Name" sx={{ mb: 2 }} value={name} onChange={e=>setName(e.target.value)} />
        <TextField fullWidth label="Email (Optional)" sx={{ mb: 2 }} value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField fullWidth label="Phone Number (Optional)" sx={{ mb: 2 }} value={phone} onChange={e=>setPhone(e.target.value)} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select value={role} label="Role" onChange={e=>setRole(e.target.value)}>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Clerk">Clerk</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Store</InputLabel>
          <Select value={store} label="Store" onChange={e=>setStore(e.target.value)}>
            <MenuItem value="Mama's Groceries">Mama's Groceries</MenuItem>
            <MenuItem value="Mainland Branch">Mainland Branch</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="PIN or Password" placeholder="Create PIN or Password" sx={{ mb: 3 }} value={pin} onChange={e=>setPin(e.target.value)} />
        <Button fullWidth size="large" variant="contained">Continue</Button>
      </Paper>
    </Container>
  );
}

export default ConfirmInvite;


