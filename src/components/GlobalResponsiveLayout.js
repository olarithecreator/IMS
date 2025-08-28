import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import StoreSwitcher from './StoreSwitcher';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
  Container,
  Chip,
  Stack,
  Hidden,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  QrCodeScanner,
  Inventory2,
  Assessment,
  Notifications,
  Person,
  Store,
  Group,
  HelpOutline,
  Logout,
  Settings,
  Add,
  Business,
  Dashboard,
} from '@mui/icons-material';
import { getCurrentUser, logout } from '../utils/localStorage';

const drawerWidth = 280;

function GlobalResponsiveLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Global responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // < 992px
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 768px - 992px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // >= 992px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('xl')); // >= 1200px
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({
    inventory: true,
    sales: false,
    stores: false,
    staff: false,
  });

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuExpand = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get container max width based on screen size
  const getMaxWidth = () => {
    if (isLargeDesktop) return 'xl'; // 1200px
    if (isDesktop) return 'lg'; // 960px
    if (isTablet) return 'md'; // 720px
    return 'sm'; // 540px
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/dashboard/') return 'Dashboard';
    if (path.includes('/scan')) return 'Scan Product';
    if (path.includes('/product')) return 'Products';
    if (path.includes('/sales')) return 'Sales';
    if (path.includes('/notifications')) return 'Notifications';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/profile')) return 'Profile';
    if (path.includes('/stores')) return 'Stores';
    if (path.includes('/staff')) return 'Staff';
    if (path.includes('/help')) return 'Help & Support';
    return 'InventoryPro';
  };

  // Navigation items
  const getNavigationItems = () => {
    const baseItems = [
      {
        label: 'Dashboard',
        icon: <Dashboard />,
        path: '/dashboard',
        active: location.pathname === '/dashboard' || location.pathname === '/dashboard/',
      },
      {
        label: 'Scan Product',
        icon: <QrCodeScanner />,
        path: '/dashboard/scan',
        active: location.pathname.includes('/scan'),
      },
      {
        label: 'Products',
        icon: <Inventory2 />,
        path: '/dashboard/products',
        active: location.pathname.includes('/product'),
      },
      {
        label: 'Sales',
        icon: <Assessment />,
        path: '/dashboard/sales',
        active: location.pathname.includes('/sales'),
      },
    ];

    // Add role-specific items
    if (currentUser?.role === 'owner' || currentUser?.role === 'admin') {
      baseItems.push(
        {
          label: 'Stores',
          icon: <Store />,
          path: '/dashboard/stores',
          active: location.pathname.includes('/stores'),
        },
        {
          label: 'Staff & Roles',
          icon: <Group />,
          path: '/dashboard/staff',
          active: location.pathname.includes('/staff'),
        }
      );
    }

    baseItems.push(
      {
        label: 'Notifications',
        icon: <Notifications />,
        path: '/dashboard/notifications',
        badge: 3,
        active: location.pathname.includes('/notifications'),
      },
      {
        label: 'Settings',
        icon: <Settings />,
        path: '/dashboard/settings',
        active: location.pathname.includes('/settings'),
      },
      {
        label: 'Profile',
        icon: <Person />,
        path: '/dashboard/profile',
        active: location.pathname.includes('/profile'),
      },
      {
        label: 'Help & Support',
        icon: <HelpOutline />,
        path: '/dashboard/help',
        active: location.pathname.includes('/help'),
      }
    );

    return baseItems;
  };

  const navigationItems = getNavigationItems();
  const bottomNavItems = navigationItems.slice(0, 4); // First 4 for bottom nav

  const renderDrawerContent = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Business sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            InventoryPro
          </Typography>
        </Box>
        
        {/* User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              mr: 2,
              bgcolor: 'primary.main',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {currentUser?.firstName?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
              {currentUser?.firstName} {currentUser?.lastName}
            </Typography>
            <Chip
              label={currentUser?.role?.charAt(0)?.toUpperCase() + currentUser?.role?.slice(1) || 'User'}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: '0.6875rem', height: 20 }}
            />
          </Box>
        </Box>
        
        {/* Store Switcher for Desktop */}
        <Box sx={{ mt: 2 }}>
          <StoreSwitcher />
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                selected={item.active}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: item.active ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: 'error.main',
              '&:hover': {
                bgcolor: 'error.50',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
              <Logout />
            </ListItemIcon>
            <ListItemText 
              primary="Logout"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Mobile/Tablet App Bar */}
      <Hidden lgUp>
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              {getPageTitle()}
            </Typography>
            
            {/* Store Switcher for Mobile */}
            <Box sx={{ mr: 1 }}>
              <StoreSwitcher />
            </Box>
            
            <IconButton 
              color="inherit"
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>

      {/* Desktop Sidebar */}
      <Hidden lgDown>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            },
          }}
        >
          {renderDrawerContent()}
        </Drawer>
      </Hidden>

      {/* Mobile/Tablet Drawer */}
      <Hidden lgUp>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
            },
          }}
        >
          {renderDrawerContent()}
        </Drawer>
      </Hidden>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          overflow: 'auto',
          height: '100vh',
          // Mobile: account for app bar and bottom nav
          mt: { xs: 7, sm: 8, lg: 0 },
          pb: { xs: 9, lg: 0 },
          // Desktop: account for sidebar
          width: { lg: `calc(100vw - ${drawerWidth}px)` },
        }}
      >
        {/* Responsive Container */}
        <Container 
          maxWidth={getMaxWidth()}
          sx={{ 
            py: { xs: 2, sm: 3, lg: 4 },
            px: { xs: 2, sm: 3, lg: 4 },
            width: '100%',
          }}
        >
          <Outlet />
        </Container>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Hidden lgUp>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
          elevation={8}
        >
          <BottomNavigation
            value={
              location.pathname === '/dashboard' || location.pathname === '/dashboard/' ? 0 :
              location.pathname.includes('/scan') ? 1 :
              location.pathname.includes('/product') ? 2 :
              location.pathname.includes('/sales') ? 3 : 0
            }
            onChange={(event, newValue) => {
              navigate(bottomNavItems[newValue].path);
            }}
            showLabels
            sx={{
              height: 70,
              '& .MuiBottomNavigationAction-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    fontSize: '0.75rem',
                  },
                },
              },
            }}
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
      </Hidden>
    </Box>
  );
}

export default GlobalResponsiveLayout;