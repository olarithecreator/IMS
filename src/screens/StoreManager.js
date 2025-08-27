import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  Store,
  People,
  Help,
  Settings,
  Notifications,
  Logout,
  Add,
  ChevronRight,
  Close,
} from '@mui/icons-material';

function StoreManager() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const stores = [
    { id: 1, name: 'Store 1', active: true },
    { id: 2, name: 'Store 2', active: false },
  ];

  const currentUser = {
    name: 'Esther Howard',
    email: 'kenzi.lawson@example.com',
    plan: 'Complete pro - Single User',
    subscription: 'Monthly Subscription',
    avatar: '👩‍💼',
  };

  const userStores = [
    { name: 'My Store', address: '123, Allen Avenue, Ikeja, Lagos' },
    { name: 'My Store', address: '45, Admiralty Way, Lekki Phase 1, Lagos' },
  ];

  const menuItems = [
    { text: 'My Store/Profile', icon: <Store />, path: '/dashboard/profile' },
    { text: 'Roles & Staff', icon: <People />, path: '/dashboard/roles-staff' },
    { text: 'Help & Support', icon: <Help />, path: '/dashboard/help-support' },
    { text: 'Activities', icon: <Notifications />, path: '/dashboard/notifications' },
    { text: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
  ];

  const handleStoreSelect = (store) => {
    // Update current store in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.currentStore = store;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    setDrawerOpen(false);
    navigate('/dashboard');
  };

  const handleAddStore = () => {
    navigate('/store-setup');
  };

  if (drawerOpen) {
    return (
      <Drawer
        anchor="left"
        open={drawerOpen}
        variant="persistent"
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: 400,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* Store Selection */}
          <Box sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center', overflowX: 'auto' }}>
            {stores.map((store) => (
              <Avatar
                key={store.id}
                onClick={() => handleStoreSelect(store)}
                sx={{
                  bgcolor: store.active ? 'primary.main' : 'success.light',
                  border: store.active ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                  cursor: 'pointer',
                }}
              >
                {store.id}
              </Avatar>
            ))}
            <Avatar 
              onClick={handleAddStore}
              sx={{ bgcolor: 'action.hover', cursor: 'pointer' }}
            >
              <Add />
            </Avatar>
          </Box>

          <Divider />

          {/* Menu Items */}
          <List sx={{ flex: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Logout */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboard/logout')}>
                <ListItemIcon><Logout /></ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {/* User Profile Card */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, fontSize: '2rem' }}>
            {currentUser.avatar}
          </Avatar>
          
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            {currentUser.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {currentUser.email}
          </Typography>

          <Paper sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {currentUser.plan}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.subscription}
                </Typography>
              </Box>
              <Button variant="contained" size="small" sx={{ borderRadius: 2 }}>
                See All
              </Button>
            </Box>
          </Paper>

          <Card sx={{ textAlign: 'left', mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Store sx={{ mr: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  My Profile
                </Typography>
                <ChevronRight sx={{ ml: 'auto' }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Owner
              </Typography>
            </CardContent>
          </Card>

          {/* User Stores */}
          {userStores.map((store, index) => (
            <Card key={index} sx={{ textAlign: 'left', mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Store sx={{ mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {store.name}
                  </Typography>
                  <ChevronRight sx={{ ml: 'auto' }} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {store.address}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {/* Other Stores */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
            Other Stores
          </Typography>

          <Card sx={{ textAlign: 'left' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Add sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1" sx={{ color: 'primary.main' }}>
                  Add Store
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
}

export default StoreManager;