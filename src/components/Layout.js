import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Inventory,
  Category,
  People,
  ShoppingCart,
  Assessment,
  Settings,
  Notifications,
  AccountCircle,
  ChevronLeft,
  Add,
  Search,
  Storage,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Inventory', icon: <Inventory />, path: '/dashboard/inventory' },
  { text: 'Categories', icon: <Category />, path: '/dashboard/categories' },
  { text: 'Suppliers', icon: <People />, path: '/dashboard/suppliers' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/dashboard/orders' },
  { text: 'Reports', icon: <Assessment />, path: '/dashboard/reports' },
  { text: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
  { text: 'Local Storage', icon: <Storage />, path: '/dashboard/local-storage' },
];

function Layout() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Inventory Management System
          </Typography>
          {/* Role pill */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
            {(() => {
              try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
                if (!currentUser?.role) return null;
                const colorMap = { admin: 'primary', manager: 'secondary', staff: 'default' };
                return (
                  <Chip label={currentUser.role.toUpperCase()} color={colorMap[currentUser.role] || 'default'} />
                );
              } catch (_) { return null; }
            })()}
          </Box>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/dashboard/alerts')}>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
        }}
      >
        <Outlet />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/dashboard/profile'); }}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/dashboard/settings'); }}>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/dashboard/logout'); }}>Logout</MenuItem>
      </Menu>
    </Box>
  );

  function DrawerContent() {
	return (
		<Box>
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
					IMS
				</Typography>
				<IconButton onClick={handleDrawerToggle}>
					<ChevronLeft />
				</IconButton>
			</Toolbar>
			<Divider />
			{/* Stores row */}
			<Box sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center', overflowX: 'auto' }}>
				<Avatar sx={{ bgcolor: 'primary.light', border: '2px solid', borderColor: 'primary.main' }}>1</Avatar>
				<Avatar sx={{ bgcolor: 'success.light' }}>2</Avatar>
				<Avatar sx={{ bgcolor: 'action.hover' }}>+
				</Avatar>
			</Box>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation('/dashboard/profile')}>
						<ListItemIcon><Storage /></ListItemIcon>
						<ListItemText primary="My Store/Profile" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation('/dashboard/roles-staff')}>
						<ListItemIcon><People /></ListItemIcon>
						<ListItemText primary="Roles & Staff" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation('/dashboard/help-support')}>
						<ListItemIcon><HelpIcon /></ListItemIcon>
						<ListItemText primary="Help & Support" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation('/dashboard/orders')}>
						<ListItemIcon><Notifications /></ListItemIcon>
						<ListItemText primary="Activities" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation('/dashboard/settings')}>
						<ListItemIcon><Settings /></ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleNavigation('/logout')}>
						<ListItemIcon><LogoutIcon /></ListItemIcon>
						<ListItemText primary="Log out" />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
}
}

export default Layout; 