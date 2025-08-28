import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Chip,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Store,
  ExpandMore,
  LocationOn,
  Add,
  Check,
} from '@mui/icons-material';
import { 
  getCurrentStore, 
  getUserStores, 
  setCurrentStore, 
  getCurrentUser 
} from '../utils/localStorage';

function StoreSwitcher({ onStoreChange }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [currentStore, setCurrentStoreState] = useState(null);
  const [stores, setStores] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadStoreData();
  }, []);

  const loadStoreData = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    const userStores = getUserStores();
    setStores(userStores);
    
    let current = getCurrentStore();
    
    // If no current store is set, set the first available store
    if (!current && userStores.length > 0) {
      current = userStores[0];
      setCurrentStore(current.id);
    }
    
    setCurrentStoreState(current);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStoreSwitch = (store) => {
    setCurrentStore(store.id);
    setCurrentStoreState(store);
    handleMenuClose();
    
    // Notify parent component of store change
    if (onStoreChange) {
      onStoreChange(store);
    }
    
    // Refresh the current page to update store-specific data
    window.location.reload();
  };

  const handleAddStore = () => {
    handleMenuClose();
    navigate('/dashboard/stores/add');
  };

  const handleManageStores = () => {
    handleMenuClose();
    navigate('/dashboard/stores');
  };

  if (!currentUser || currentUser.role !== 'owner' || stores.length === 0) {
    return null;
  }

  return (
    <Box>
      <Button
        onClick={handleMenuOpen}
        variant="outlined"
        startIcon={<Store />}
        endIcon={<ExpandMore />}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          justifyContent: 'space-between',
          minWidth: isMobile ? 'auto' : 200,
          bgcolor: 'background.paper',
          borderColor: 'divider',
          '&:hover': {
            bgcolor: 'grey.50',
            borderColor: 'primary.main',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
          {!isMobile && (
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {currentStore?.name || 'Select Store'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentStore?.type || 'No store selected'}
              </Typography>
            </Box>
          )}
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 280,
            maxHeight: 400,
            mt: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {/* Current Store Header */}
        <Box sx={{ px: 2, py: 1.5, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Select Store Location
          </Typography>
        </Box>
        
        <Divider />

        {/* Store List */}
        {stores.map((store) => (
          <MenuItem
            key={store.id}
            onClick={() => handleStoreSwitch(store)}
            sx={{
              py: 1.5,
              px: 2,
              bgcolor: currentStore?.id === store.id ? 'primary.50' : 'transparent',
              '&:hover': {
                bgcolor: currentStore?.id === store.id ? 'primary.100' : 'grey.50',
              },
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: currentStore?.id === store.id ? 'primary.main' : 'grey.300',
                  color: 'white',
                }}
              >
                <Store sx={{ fontSize: 20 }} />
              </Avatar>
            </ListItemIcon>
            
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {store.name}
                  </Typography>
                  {currentStore?.id === store.id && (
                    <Check sx={{ fontSize: 16, color: 'primary.main' }} />
                  )}
                </Box>
              }
              secondary={
                <Box sx={{ mt: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <LocationOn sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {store.address || 'No address specified'}
                    </Typography>
                  </Box>
                  <Chip
                    label={store.status || 'active'}
                    size="small"
                    color={store.status === 'active' ? 'success' : 'default'}
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                </Box>
              }
            />
          </MenuItem>
        ))}

        <Divider />

        {/* Actions */}
        <MenuItem onClick={handleAddStore} sx={{ py: 1.5, px: 2 }}>
          <ListItemIcon>
            <Add sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Add New Store
              </Typography>
            }
          />
        </MenuItem>
        
        <MenuItem onClick={handleManageStores} sx={{ py: 1.5, px: 2 }}>
          <ListItemIcon>
            <Store sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body2" color="text.secondary">
                Manage All Stores
              </Typography>
            }
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default StoreSwitcher;