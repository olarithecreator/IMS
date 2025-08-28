import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
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
  useTheme,
  useMediaQuery,
  Badge,
  Fab,
  Collapse,
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
  ExpandLess,
  ExpandMore,
  Dashboard,
  TrendingUp,
  ShoppingCart,
  LocalShipping,
} from '@mui/icons-material';
import { getCurrentUser, logout } from '../utils/localStorage';

function ResponsiveLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});

  const drawerWidth = 280;

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

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <Home />,
        path: '/dashboard',
        mobile: true,
      },
      {
        id: 'scan',
        label: 'Scan',
        icon: <QrCodeScanner />,
        path: '/dashboard/scan',
        mobile: true,
      },
      {
        id: 'inventory',
        label: 'Inventory',
        icon: <Inventory2 />,
        path: '/dashboard/products',
        mobile: true,
        submenu: [
          { label: 'All Products', path: '/dashboard/products', icon: <Inventory2 /> },
          { label: 'Add Product', path: '/dashboard/products/add', icon: <Add /> },
          { label: 'Low Stock', path: '/dashboard/alerts', icon: <TrendingUp /> },
        ]
      },
      {
        id: 'sales',
        label: 'Sales',
        icon: <Assessment />,
        path: '/dashboard/sales',
        mobile: true,
        submenu: [
          { label: 'All Sales', path: '/dashboard/sales', icon: <Assessment /> },
          { label: 'New Sale', path: '/dashboard/sales/new', icon: <Add /> },
          { label: 'Reports', path: '/dashboard/reports', icon: <TrendingUp /> },
        ]
      },
    ];

    // Add role-specific items
    if (currentUser?.role === 'owner' || currentUser?.role === 'admin') {
      baseItems.push(
        {
          id: 'stores',
          label: 'Stores',
          icon: <Store />,
          path: '/dashboard/stores',
          submenu: [
            { label: 'All Stores', path: '/dashboard/stores', icon: <Store /> },
            { label: 'Add Store', path: '/dashboard/stores/add', icon: <Add /> },
          ]
        },
        {
          id: 'staff',
          label: 'Staff & Roles',
          icon: <Group />,
          path: '/dashboard/staff',
          submenu: [
            { label: 'All Staff', path: '/dashboard/staff', icon: <Group /> },
            { label: 'Pending Requests', path: '/dashboard/staff/requests', icon: <Person /> },
            { label: 'Add Staff', path: '/dashboard/staff/add', icon: <Add /> },
          ]
        }
      );
    }

    baseItems.push(
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <Notifications />,
        path: '/dashboard/notifications',
        badge: 3,
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: <Person />,
        path: '/dashboard/profile',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings />,
        path: '/dashboard/settings',
      },
      {
        id: 'help',
        label: 'Help & Support',
        icon: <HelpOutline />,
        path: '/dashboard/help',
      }
    );

    return baseItems;
  };

  const navigationItems = getNavigationItems();
  const mobileNavItems = navigationItems.filter(item => item.mobile);

  const getCurrentBottomNavValue = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/dashboard/') return 0;
    if (path.includes('/scan')) return 1;
    if (path.includes('/product')) return 2;
    if (path.includes('/sales')) return 3;
    return 0;
  };

  const renderDesktopDrawer = () => (
    <Box sx={{ overflow: 'auto', height: '100%' }}>
      {/* User Profile Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              mr: 2,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {currentUser?.firstName?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
              {currentUser?.firstName} {currentUser?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {currentUser?.role?.charAt(0)?.toUpperCase() + currentUser?.role?.slice(1) || 'User'}
            </Typography>
            {currentUser?.companyName && (
              <Typography variant="caption" color="text.secondary" noWrap>
                {currentUser.companyName}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 1 }}>
        {navigationItems.map((item) => (
          <Box key={item.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.submenu) {
                    handleMenuExpand(item.id);
                  } else {
                    navigate(item.path);
                    if (isMobile) setMobileOpen(false);
                  }
                }}
                selected={location.pathname === item.path}
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
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
                {item.submenu && (
                  expandedMenus[item.id] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>

            {/* Submenu */}
            {item.submenu && (
              <Collapse in={expandedMenus[item.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem key={subItem.path} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(subItem.path);
                          if (isMobile) setMobileOpen(false);
                        }}
                        selected={location.pathname === subItem.path}
                        sx={{
                          pl: 6,
                          borderRadius: 2,
                          mb: 0.5,
                          '&.Mui-selected': {
                            bgcolor: 'primary.50',
                            color: 'primary.main',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.label}
                          primaryTypographyProps={{
                            fontSize: '0.8125rem',
                            fontWeight: location.pathname === subItem.path ? 600 : 400,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Logout Button */}
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
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { xs: 'block', md: 'none' },
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          },
        }}
        open
      >
        {renderDesktopDrawer()}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'background.paper',
          },
        }}
      >
        {renderDesktopDrawer()}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: 0 },
          mt: { xs: 8, md: 0 }, // Account for mobile app bar
          pb: { xs: 9, md: 0 }, // Account for mobile bottom nav
          bgcolor: 'background.default',
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar,
          }}
          elevation={3}
        >
          <BottomNavigation
            value={getCurrentBottomNavValue()}
            onChange={(event, newValue) => {
              navigate(mobileNavItems[newValue].path);
            }}
            showLabels
          >
            {mobileNavItems.slice(0, 4).map((item, index) => (
              <BottomNavigationAction
                key={item.id}
                label={item.label}
                icon={
                  item.badge ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )
                }
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}

      {/* Floating Action Button for Quick Actions */}
      {(isMobile || isTablet) && location.pathname.includes('/dashboard') && (
        <Fab
          color="primary"
          aria-label="quick action"
          sx={{
            position: 'fixed',
            bottom: { xs: 90, md: 20 },
            right: 20,
            zIndex: theme.zIndex.speedDial,
          }}
          onClick={() => {
            if (location.pathname.includes('/products')) {
              navigate('/dashboard/products/add');
            } else if (location.pathname.includes('/sales')) {
              navigate('/dashboard/sales/new');
            } else {
              navigate('/dashboard/sales/new'); // Default to new sale
            }
          }}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
}

export default ResponsiveLayout;