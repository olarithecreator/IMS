import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Avatar,
  Chip,
  Paper,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Fab,
  Menu,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import {
  Store,
  Add,
  Edit,
  Delete,
  MoreVert,
  LocationOn,
  Phone,
  Person,
  TrendingUp,
  Assessment,
  Inventory2,
  Group,
  Visibility,
  Business,
  Close,
} from '@mui/icons-material';
import { getCurrentUser, getCompanies, saveCompany } from '../utils/localStorage';

function StoreManagement() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [currentUser, setCurrentUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  const [storeForm, setStoreForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    managerId: '',
    description: '',
    type: 'retail',
    status: 'active',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const user = getCurrentUser();
      setCurrentUser(user);
      
      const companiesData = getCompanies();
      setCompanies(companiesData);
      
      // Find user's company and stores
      const userCompany = companiesData.find(c => c.owner === user?.id || c.id === user?.companyId);
      if (userCompany) {
        setStores(userCompany.stores || []);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading store data:', error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (store = null) => {
    if (store) {
      setEditingStore(store);
      setStoreForm({
        name: store.name || '',
        address: store.address || '',
        phone: store.phone || '',
        email: store.email || '',
        managerId: store.managerId || '',
        description: store.description || '',
        type: store.type || 'retail',
        status: store.status || 'active',
      });
    } else {
      setEditingStore(null);
      setStoreForm({
        name: '',
        address: '',
        phone: '',
        email: '',
        managerId: '',
        description: '',
        type: 'retail',
        status: 'active',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStore(null);
    setStoreForm({
      name: '',
      address: '',
      phone: '',
      email: '',
      managerId: '',
      description: '',
      type: 'retail',
      status: 'active',
    });
  };

  const handleSaveStore = () => {
    try {
      const user = getCurrentUser();
      const companiesData = getCompanies();
      const userCompany = companiesData.find(c => c.owner === user?.id || c.id === user?.companyId);
      
      if (!userCompany) {
        alert('Company not found');
        return;
      }

      const newStore = {
        id: editingStore ? editingStore.id : Date.now(),
        name: storeForm.name,
        address: storeForm.address,
        phone: storeForm.phone,
        email: storeForm.email,
        managerId: storeForm.managerId || user.id,
        description: storeForm.description,
        type: storeForm.type,
        status: storeForm.status,
        createdAt: editingStore ? editingStore.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let updatedStores = userCompany.stores || [];
      
      if (editingStore) {
        // Update existing store
        updatedStores = updatedStores.map(store => 
          store.id === editingStore.id ? newStore : store
        );
      } else {
        // Add new store
        updatedStores.push(newStore);
      }

      // Update company with new stores
      const updatedCompany = {
        ...userCompany,
        stores: updatedStores,
        updatedAt: new Date().toISOString(),
      };

      // Save to companies array
      const updatedCompanies = companiesData.map(c => 
        c.id === userCompany.id ? updatedCompany : c
      );
      
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      
      // Reload data
      loadData();
      handleCloseDialog();
      
    } catch (error) {
      console.error('Error saving store:', error);
      alert('Failed to save store');
    }
  };

  const handleDeleteStore = (store) => {
    setStoreToDelete(store);
    setDeleteDialog(true);
  };

  const confirmDeleteStore = () => {
    try {
      const user = getCurrentUser();
      const companiesData = getCompanies();
      const userCompany = companiesData.find(c => c.owner === user?.id || c.id === user?.companyId);
      
      if (!userCompany || !storeToDelete) return;

      const updatedStores = userCompany.stores.filter(store => store.id !== storeToDelete.id);
      
      const updatedCompany = {
        ...userCompany,
        stores: updatedStores,
        updatedAt: new Date().toISOString(),
      };

      const updatedCompanies = companiesData.map(c => 
        c.id === userCompany.id ? updatedCompany : c
      );
      
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      
      loadData();
      setDeleteDialog(false);
      setStoreToDelete(null);
      
    } catch (error) {
      console.error('Error deleting store:', error);
      alert('Failed to delete store');
    }
  };

  const handleMenuClick = (event, store) => {
    setAnchorEl(event.currentTarget);
    setSelectedStore(store);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStore(null);
  };

  const getStoreStats = (store) => {
    // Mock stats - in real app, these would come from actual data
    return {
      sales: Math.floor(Math.random() * 100) + 10,
      revenue: Math.floor(Math.random() * 1000000) + 100000,
      products: Math.floor(Math.random() * 500) + 50,
      staff: Math.floor(Math.random() * 20) + 3,
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const StoreCard = ({ store }) => {
    const stats = getStoreStats(store);
    
    return (
      <Card 
        sx={{ 
          height: '100%',
          transition: 'all 0.3s ease',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
            borderColor: 'primary.200',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.100',
                  color: 'primary.600',
                  width: 48,
                  height: 48,
                  mr: 2,
                }}
              >
                <Store />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {store.name}
                </Typography>
                <Chip
                  label={store.status || 'active'}
                  size="small"
                  color={store.status === 'active' ? 'success' : 'default'}
                  variant="outlined"
                />
              </Box>
            </Box>
            
            <IconButton
              onClick={(e) => handleMenuClick(e, store)}
              size="small"
            >
              <MoreVert />
            </IconButton>
          </Box>

          {/* Store Info */}
          <Stack spacing={1} sx={{ mb: 3 }}>
            {store.address && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {store.address}
                </Typography>
              </Box>
            )}
            {store.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {store.phone}
                </Typography>
              </Box>
            )}
            {store.email && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {store.email}
                </Typography>
              </Box>
            )}
          </Stack>

          {/* Stats */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {stats.sales}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Sales
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {stats.products}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Products
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Revenue */}
          <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Monthly Revenue
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {formatCurrency(stats.revenue)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="h6">Loading stores...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
              Store Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your business locations and store details
            </Typography>
          </Box>
          
          {!isMobile && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{ borderRadius: 2 }}
            >
              Add New Store
            </Button>
          )}
        </Box>

        {/* Stats Summary */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {stores.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Stores
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {stores.filter(s => s.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Stores
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {stores.filter(s => s.type === 'retail').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Retail Stores
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {stores.filter(s => s.type === 'warehouse').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Warehouses
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Stores Grid */}
      {stores.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Store sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No stores found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start by adding your first store location
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 2 }}
          >
            Add Your First Store
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {stores.map((store) => (
            <Grid item xs={12} sm={6} lg={4} key={store.id}>
              <StoreCard store={store} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Store Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 200 }
        }}
      >
        <MenuList>
          <MenuItem onClick={() => { handleOpenDialog(selectedStore); handleMenuClose(); }}>
            <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { handleOpenDialog(selectedStore); handleMenuClose(); }}>
            <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
            <ListItemText>Edit Store</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => { handleDeleteStore(selectedStore); handleMenuClose(); }}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Delete Store</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Add/Edit Store Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {editingStore ? 'Edit Store' : 'Add New Store'}
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Store Name"
                value={storeForm.name}
                onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Store Type</InputLabel>
                <Select
                  value={storeForm.type}
                  onChange={(e) => setStoreForm({ ...storeForm, type: e.target.value })}
                  label="Store Type"
                >
                  <MenuItem value="retail">Retail Store</MenuItem>
                  <MenuItem value="warehouse">Warehouse</MenuItem>
                  <MenuItem value="outlet">Outlet</MenuItem>
                  <MenuItem value="kiosk">Kiosk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={storeForm.address}
                onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={storeForm.phone}
                onChange={(e) => setStoreForm({ ...storeForm, phone: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={storeForm.email}
                onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={storeForm.status}
                  onChange={(e) => setStoreForm({ ...storeForm, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="maintenance">Under Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={storeForm.description}
                onChange={(e) => setStoreForm({ ...storeForm, description: e.target.value })}
                multiline
                rows={3}
                placeholder="Brief description of the store..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveStore} 
            variant="contained"
            disabled={!storeForm.name}
          >
            {editingStore ? 'Update Store' : 'Add Store'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Store</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{storeToDelete?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDeleteStore} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mobile FAB */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add store"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: theme.zIndex.speedDial,
          }}
          onClick={() => handleOpenDialog()}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
}

export default StoreManagement;