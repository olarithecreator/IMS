import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Person,
  Store,
  ChevronRight,
  Add as AddIcon,
  Lock,
  Edit,
} from '@mui/icons-material';

function OwnerProfileView({ user }) {
  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      {/* Header avatar */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar sx={{ width: 92, height: 92, mx: 'auto' }}>
            <Person sx={{ fontSize: 56 }} />
          </Avatar>
          <Box sx={{ position: 'absolute', right: -2, bottom: -2, bgcolor: 'background.paper', borderRadius: '50%', p: 0.5 }}>
            <Chip size="small" color="warning" label="Owner" />
          </Box>
        </Box>
        <Typography sx={{ mt: 1.5, fontWeight: 800 }}>{user?.firstName || 'Esther'} {user?.lastName || 'Howard'}</Typography>
        <Typography variant="body2" color="text.secondary">{user?.email || 'kenzi.lawson@example.com'}</Typography>
      </Box>

      {/* Your Plan */}
      <Paper sx={{ p: 2, borderRadius: 3, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Your Plan</Typography>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip size="small" color="warning" label="Complete pro - Single User" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Monthly Subscription</Typography>
          </Box>
          <Button size="small" variant="contained" color="error">See All</Button>
        </Paper>
      </Paper>

      {/* Menu Cards */}
      <Paper sx={{ p: 1.5, borderRadius: 3, mb: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary="My Profile" secondary="Owner" />
              <ChevronRight />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><Store /></ListItemIcon>
              <ListItemText primary="My Store" secondary="123, Allen Avenue, Ikeja, Lagos" />
              <ChevronRight />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><Store /></ListItemIcon>
              <ListItemText primary="My Store" secondary="45, Admiralty Way, Lekki Phase 1, Lagos" />
              <ChevronRight />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      {/* Other stores */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Other Stores</Typography>
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Button startIcon={<AddIcon />} variant="outlined">Add Store</Button>
      </Paper>
    </Box>
  );
}

function ManagerProfileView({ user }) {
  const name = `${user?.firstName || 'Funmilayo'} ${user?.lastName || 'Ransome'}`.trim();
  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Typography align="center" variant="h6" sx={{ fontWeight: 700, mb: 2 }}>My Profile</Typography>
        <Box sx={{ textAlign: 'center', mb: 2, position: 'relative' }}>
          <Avatar sx={{ width: 92, height: 92, mx: 'auto' }}>
            <Person sx={{ fontSize: 56 }} />
          </Avatar>
          <IconButton size="small" sx={{ position: 'absolute', right: 'calc(50% - 46px)', bottom: 4, bgcolor: 'primary.main', color: 'common.white', '&:hover': { bgcolor: 'primary.dark' } }}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        <Typography align="center" sx={{ fontWeight: 800 }}>{name}</Typography>
        <Typography align="center" variant="body2" color="text.secondary" sx={{ mb: 3 }}>{user?.email || 'funmi.wo@example.com'}</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Full Name" defaultValue={name} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" defaultValue={user?.phone || '+234 809 876 5432'} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email Address" type="email" defaultValue={user?.email || 'funmilayo.r@example.com'} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Assigned Store" value={user?.company || 'Mainland Branch'} disabled helperText="123, Funmilayo Ransome-Kuti Rd, Lagos" />
          </Grid>
        </Grid>

        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lock />
              <Typography>Change Password</Typography>
            </Box>
            <ChevronRight />
          </Box>
        </Paper>

        <Button fullWidth size="large" variant="contained" sx={{ mt: 3 }}>Save Changes</Button>
      </Paper>
    </Box>
  );
}

function Profile() {
  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); } catch { return null; }
  }, []);

  const role = currentUser?.role || 'admin';

  if (role === 'manager' || role === 'staff') {
    return <ManagerProfileView user={currentUser} />;
  }
  return <OwnerProfileView user={currentUser} />;
}

export default Profile;