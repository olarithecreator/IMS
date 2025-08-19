import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

function AddStaff() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [roleType, setRoleType] = useState('clerk');
  const [customRole, setCustomRole] = useState('');
  const [permissions, setPermissions] = useState({ inventory: false, sales: false, staff: false });
  const [store, setStore] = useState('Main Street Store');

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add New Staff</Typography>

        <TextField fullWidth label="Staff Name" sx={{ mb: 2 }} value={name} onChange={e => setName(e.target.value)} />
        <TextField fullWidth label="Phone Number (Optional)" sx={{ mb: 3 }} value={phone} onChange={e => setPhone(e.target.value)} />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Role Assignment</Typography>
        <Box sx={{ display: 'grid', gap: 2, mb: 2 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: roleType==='clerk'?'primary.main':'divider' }}>
            <FormControlLabel control={<Radio checked={roleType==='clerk'} onChange={()=>setRoleType('clerk')} />} label={<Box>
              <Typography sx={{ fontWeight: 700 }}>Clerk</Typography>
              <Typography variant="body2" color="text.secondary">Can manage inventory and sales</Typography>
            </Box>} />
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: roleType==='manager'?'primary.main':'divider' }}>
            <FormControlLabel control={<Radio checked={roleType==='manager'} onChange={()=>setRoleType('manager')} />} label={<Box>
              <Typography sx={{ fontWeight: 700 }}>Manager</Typography>
              <Typography variant="body2" color="text.secondary">Can manage staff, inventory, and sales</Typography>
            </Box>} />
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: roleType==='other'?'primary.main':'divider' }}>
            <FormControlLabel control={<Radio checked={roleType==='other'} onChange={()=>setRoleType('other')} />} label={<Box>
              <Typography sx={{ fontWeight: 700 }}>Other</Typography>
              <Typography variant="body2" color="text.secondary">Assign custom role and permissions</Typography>
            </Box>} />
            <TextField fullWidth placeholder="Enter Role Name (e.g., Sales Manager)" sx={{ mt: 1 }} disabled={roleType!=='other'} value={customRole} onChange={e=>setCustomRole(e.target.value)} />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>Permissions</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={permissions.inventory} onChange={e=>setPermissions({ ...permissions, inventory: e.target.checked })} />} label="Manage Inventory" />
              <FormControlLabel control={<Checkbox checked={permissions.sales} onChange={e=>setPermissions({ ...permissions, sales: e.target.checked })} />} label="Manage Sales" />
              <FormControlLabel control={<Checkbox checked={permissions.staff} onChange={e=>setPermissions({ ...permissions, staff: e.target.checked })} />} label="Manage Staff" />
            </FormGroup>
          </Paper>
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Select Store</Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Store</InputLabel>
          <Select value={store} label="Store" onChange={e => setStore(e.target.value)}>
            <MenuItem value="Main Street Store">Main Street Store</MenuItem>
            <MenuItem value="Outlet Branch">Outlet Branch</MenuItem>
          </Select>
        </FormControl>

        <Button fullWidth variant="contained" size="large">Send Invite</Button>
      </Paper>
    </Container>
  );
}

export default AddStaff;


