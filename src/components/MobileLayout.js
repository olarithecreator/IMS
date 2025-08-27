import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import {
  Home,
  QrCodeScanner,
  Inventory2,
  Assessment,
} from '@mui/icons-material';

function MobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const bottomNavItems = [
    { label: 'Home', icon: <Home />, path: '/dashboard' },
    { label: 'Scan', icon: <QrCodeScanner />, path: '/dashboard/scan' },
    { label: 'Products', icon: <Inventory2 />, path: '/dashboard/products' },
    { label: 'Sales', icon: <Assessment />, path: '/dashboard/sales' },
  ];

  const getCurrentBottomNavValue = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/dashboard/') return 0;
    if (path.includes('/scan')) return 1;
    if (path.includes('/product')) return 2;
    if (path.includes('/sales')) return 3;
    return 0;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#fafafa' }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 10, // Space for bottom navigation
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>

      {/* Bottom Navigation */}
      <Paper
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1300,
          borderTop: '1px solid #e0e0e0',
        }}
        elevation={0}
      >
        <BottomNavigation
          value={getCurrentBottomNavValue()}
          onChange={(event, newValue) => {
            navigate(bottomNavItems[newValue].path);
          }}
          showLabels
          sx={{
            height: 80,
            '& .MuiBottomNavigationAction-root': {
              color: '#9e9e9e',
              '&.Mui-selected': {
                color: '#1976d2',
              },
            },
          }}
        >
          {bottomNavItems.map((item, index) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              sx={{
                minWidth: 'auto',
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.75rem',
                  fontWeight: 500,
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default MobileLayout;