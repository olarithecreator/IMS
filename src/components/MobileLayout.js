import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Avatar,
  Paper,
} from '@mui/material';
import {
  ArrowBack,
  Notifications,
  Menu as MenuIcon,
  Home,
  QrCodeScanner,
  Inventory2,
  Assessment,
  AccountCircle,
} from '@mui/icons-material';

function MobileLayout({ 
  title = "Dashboard", 
  showBackButton = false, 
  showBottomNav = true,
  rightAction = null 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBackClick = () => {
    navigate(-1);
  };

  const bottomNavItems = [
    { label: 'Home', icon: <Home />, path: '/dashboard' },
    { label: 'Scan', icon: <QrCodeScanner />, path: '/dashboard/scan' },
    { label: 'Products', icon: <Inventory2 />, path: '/dashboard/products' },
    { label: 'Sales', icon: <Assessment />, path: '/dashboard/sales' },
  ];

  const getCurrentBottomNavValue = () => {
    const path = location.pathname;
    if (path.includes('/scan')) return 1;
    if (path.includes('/product')) return 2;
    if (path.includes('/sales')) return 3;
    return 0;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBackClick}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
          )}
          
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {title}
          </Typography>
          
          {rightAction || (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8, // AppBar height
          pb: showBottomNav ? 8 : 2, // BottomNav height
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300 }}
          elevation={3}
        >
          <BottomNavigation
            value={getCurrentBottomNavValue()}
            onChange={(event, newValue) => {
              navigate(bottomNavItems[newValue].path);
            }}
            showLabels
          >
            {bottomNavItems.map((item, index) => (
              <BottomNavigationAction
                key={item.label}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
}

export default MobileLayout;