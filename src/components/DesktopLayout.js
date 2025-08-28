import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Collapse,
  IconButton,
  Badge,
  Paper,
  useTheme,
  Chip,
  Stack,
} from '@mui/material';
import {
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
  Business,
} from '@mui/icons-material';
import { getCurrentUser, logout } from '../utils/localStorage';

const drawerWidth = 280;

function DesktopLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({
    inventory: true, // Keep inventory expanded by default
    sales: false,
    stores: false,
    staff: false,
  });

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

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
        icon: <Dashboard />,
        path: '/dashboard',
        active: location.pathname === '/dashboard' || location.pathname === '/dashboard/',
      },
      {
        id: 'inventory',
        label: 'Inventory',
        icon: <Inventory2 />,
        path: '/dashboard/products',
        active: location.pathname.includes('/product') || location.pathname.includes('/scan'),
        submenu: [
          { 
            label: 'All Products', 
            path: '/dashboard/products', 
            icon: <Inventory2 />,
            active: location.pathname === '/dashboard/products',
          },
          { 
            label: 'Add Product', 
            path: '/dashboard/products/add', 
            icon: <Add />,
            active: location.pathname.includes('/products/add'),
          },
          { 
            label: 'Scan Product', 
            path: '/dashboard/scan', 
            icon: <QrCodeScanner />,
            active: location.pathname.includes('/scan'),
          },
          { 
            label: 'Low Stock', 
            path: '/dashboard/alerts', 
            icon: <TrendingUp />,
            active: location.pathname.includes('/alerts'),
          },
        ]
      },
      {
        id: 'sales',
        label: 'Sales',
        icon: <Assessment />,
        path: '/dashboard/sales',
        active: location.pathname.includes('/sales'),
        submenu: [
          { 
            label: 'All Sales', 
            path: '/dashboard/sales', 
            icon: <Assessment />,
            active: location.pathname === '/dashboard/sales',
          },
          { 
            label: 'New Sale', 
            path: '/dashboard/sales/new', 
            icon: <Add />,
            active: location.pathname.includes('/sales/new'),
          },
          { 
            label: 'Reports', 
            path: '/dashboard/reports', 
            icon: <TrendingUp />,
            active: location.pathname.includes('/reports'),
          },
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
          active: location.pathname.includes('/stores'),
          submenu: [
            { 
              label: 'All Stores', 
              path: '/dashboard/stores', 
              icon: <Store />,
              active: location.pathname === '/dashboard/stores',
            },
            { 
              label: 'Add Store', 
              path: '/dashboard/stores/add', 
              icon: <Add />,
              active: location.pathname.includes('/stores/add'),
            },
          ]
        },
        {
          id: 'staff',
          label: 'Staff & Roles',
          icon: <Group />,
          path: '/dashboard/staff',
          active: location.pathname.includes('/staff'),
          submenu: [
            { 
              label: 'All Staff', 
              path: '/dashboard/staff', 
              icon: <Group />,
              active: location.pathname === '/dashboard/staff',
            },
            { 
              label: 'Pending Requests', 
              path: '/dashboard/staff/requests', 
              icon: <Person />,
              active: location.pathname.includes('/staff/requests'),
              badge: 2, // Example pending requests
            },
            { 
              label: 'Add Staff', 
              path: '/dashboard/staff/add', 
              icon: <Add />,
              active: location.pathname.includes('/staff/add'),
            },
          ]
        }
      );
    }

    // Add bottom section items
    const bottomItems = [
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <Notifications />,
        path: '/dashboard/notifications',
        badge: 3,
        active: location.pathname.includes('/notifications'),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings />,
        path: '/dashboard/settings',
        active: location.pathname.includes('/settings'),
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: <Person />,
        path: '/dashboard/profile',
        active: location.pathname.includes('/profile'),
      },
      {
        id: 'help',
        label: 'Help & Support',
        icon: <HelpOutline />,
        path: '/dashboard/help',
        active: location.pathname.includes('/help'),
      }
    ];

    return { mainItems: baseItems, bottomItems };
  };

  const { mainItems, bottomItems } = getNavigationItems();

  const renderNavigationItem = (item, isSubmenu = false) => (
    <ListItem key={item.id || item.path} disablePadding>
      <ListItemButton
        onClick={() => {
          if (item.submenu && !isSubmenu) {
            handleMenuExpand(item.id);
          } else {
            navigate(item.path);
          }
        }}
        selected={item.active}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          ml: isSubmenu ? 2 : 0,
          pl: isSubmenu ? 2 : 2,
          '&.Mui-selected': {
            bgcolor: 'primary.50',
            color: 'primary.main',
            '& .MuiListItemIcon-root': {
              color: 'primary.main',
            },
            '&:hover': {
              bgcolor: 'primary.100',
            },
          },
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'primary.main' : 'text.secondary' }}>
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
        {item.submenu && !isSubmenu && (
          expandedMenus[item.id] ? <ExpandLess /> : <ExpandMore />
        )}
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      {/* Desktop Sidebar */}
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
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
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
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={currentUser?.role?.charAt(0)?.toUpperCase() + currentUser?.role?.slice(1) || 'User'}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: '0.6875rem', height: 20 }}
                />
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Main Navigation */}
        <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
          <List>
            {mainItems.map((item) => (
              <Box key={item.id}>
                {renderNavigationItem(item)}
                
                {/* Submenu */}
                {item.submenu && (
                  <Collapse in={expandedMenus[item.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((subItem) => renderNavigationItem(subItem, true))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
        </Box>

        {/* Bottom Navigation */}
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', px: 2, py: 1 }}>
          <List>
            {bottomItems.map((item) => renderNavigationItem(item))}
            
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
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          overflow: 'auto',
          height: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DesktopLayout;