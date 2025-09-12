import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Edit,
  Delete,
  Store,
  LocationOn,
  Phone,
  Email,
  Visibility
} from '@mui/icons-material';

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Mock data for stores
  const stores = [
    {
      id: 1,
      name: 'Main Store',
      location: 'Downtown Mall, Floor 2',
      address: '123 Main St, City Center',
      phone: '+1 (555) 123-4567',
      email: 'main@store.com',
      status: 'active',
      type: 'retail',
      manager: 'John Smith',
      products: 150,
      revenue: '$45,000'
    },
    {
      id: 2,
      name: 'Outlet Store',
      location: 'Suburban Plaza',
      address: '456 Oak Ave, Suburbia',
      phone: '+1 (555) 987-6543',
      email: 'outlet@store.com',
      status: 'active',
      type: 'outlet',
      manager: 'Sarah Johnson',
      products: 89,
      revenue: '$28,000'
    },
    {
      id: 3,
      name: 'Pop-up Store',
      location: 'Seasonal Market',
      address: '789 Market St, Downtown',
      phone: '+1 (555) 456-7890',
      email: 'popup@store.com',
      status: 'inactive',
      type: 'seasonal',
      manager: 'Mike Wilson',
      products: 45,
      revenue: '$12,000'
    }
  ];

  const handleMenuOpen = (event, store) => {
    setAnchorEl(event.currentTarget);
    setSelectedStore(store);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStore(null);
  };

  const handleAction = (action) => {
    setDialogType(action);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType('');
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || store.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'retail':
        return 'primary';
      case 'outlet':
        return 'secondary';
      case 'seasonal':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Stores Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleAction('add')}
        >
          Add New Store
        </Button>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleAction('bulk')}
            >
              Bulk Actions
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Stores Grid */}
      <Grid container spacing={3}>
        {filteredStores.map((store) => (
          <Grid item xs={12} md={6} lg={4} key={store.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Store color="primary" />
                    <Typography variant="h6" component="h3">
                      {store.name}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, store)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {store.location}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {store.address}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Phone fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {store.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {store.email}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={store.status}
                    color={getStatusColor(store.status)}
                    size="small"
                  />
                  <Chip
                    label={store.type}
                    color={getTypeColor(store.type)}
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Manager: {store.manager}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Products: {store.products}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    {store.revenue}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <Visibility sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')}>
          <Edit sx={{ mr: 1 }} />
          Edit Store
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')}>
          <Delete sx={{ mr: 1 }} />
          Delete Store
        </MenuItem>
      </Menu>

      {/* Dialogs */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' && 'Add New Store'}
          {dialogType === 'edit' && 'Edit Store'}
          {dialogType === 'delete' && 'Delete Store'}
          {dialogType === 'view' && 'Store Details'}
          {dialogType === 'bulk' && 'Bulk Actions'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'add' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add a new store to your network
              </Typography>
              {/* Add store form would go here */}
            </Box>
          )}
          {dialogType === 'edit' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Edit store: {selectedStore?.name}
              </Typography>
              {/* Edit store form would go here */}
            </Box>
          )}
          {dialogType === 'delete' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Are you sure you want to delete "{selectedStore?.name}"? This action cannot be undone.
              </Typography>
            </Box>
          )}
          {dialogType === 'view' && selectedStore && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedStore.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Location:</strong> {selectedStore.location}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Address:</strong> {selectedStore.address}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Phone:</strong> {selectedStore.phone}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong> {selectedStore.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Manager:</strong> {selectedStore.manager}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Products:</strong> {selectedStore.products}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Revenue:</strong> {selectedStore.revenue}
              </Typography>
            </Box>
          )}
          {dialogType === 'bulk' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select stores and apply bulk actions
              </Typography>
              {/* Bulk actions form would go here */}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          {dialogType === 'delete' && (
            <Button color="error" variant="contained">
              Delete
            </Button>
          )}
          {(dialogType === 'add' || dialogType === 'edit') && (
            <Button variant="contained">
              Save
            </Button>
          )}
          {dialogType === 'bulk' && (
            <Button variant="contained">
              Apply
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Stores;


