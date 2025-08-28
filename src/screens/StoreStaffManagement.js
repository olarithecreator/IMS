import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fab,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  Person,
  Group,
  Badge,
  Phone,
  Email,
  Work,
  AdminPanelSettings,
  Close,
} from '@mui/icons-material';
import { 
  getCurrentUser, 
  getStoreById, 
  getStoreStaff, 
  getStoreManagers, 
  addStaffToStore, 
  addManagerToStore,
  updateStore 
} from '../utils/localStorage';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`staff-tabpanel-${index}`}
      aria-labelledby={`staff-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function StoreStaffManagement() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { storeId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [currentUser, setCurrentUser] = useState(null);
  const [store, setStore] = useState(null);
  const [staff, setStaff] = useState([]);
  const [managers, setManagers] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('staff'); // 'staff' or 'manager'
  const [editingPerson, setEditingPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [personForm, setPersonForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'staff',
    department: '',
    salary: '',
    status: 'active',
  });

  useEffect(() => {
    loadStoreData();
  }, [storeId]);

  const loadStoreData = () => {
    try {
      const user = getCurrentUser();
      setCurrentUser(user);
      
      const storeData = getStoreById(storeId);
      if (storeData) {
        setStore(storeData);
        setStaff(getStoreStaff(storeId));
        setManagers(getStoreManagers(storeId));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading store staff data:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type, person = null) => {
    setDialogType(type);
    setEditingPerson(person);
    
    if (person) {
      setPersonForm({
        firstName: person.firstName || '',
        lastName: person.lastName || '',
        email: person.email || '',
        phone: person.phone || '',
        role: person.role || type,
        department: person.department || '',
        salary: person.salary || '',
        status: person.status || 'active',
      });
    } else {
      setPersonForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: type,
        department: '',
        salary: '',
        status: 'active',
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPerson(null);
    setPersonForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'staff',
      department: '',
      salary: '',
      status: 'active',
    });
  };

  const handleSavePerson = () => {
    try {
      const personData = {
        firstName: personForm.firstName,
        lastName: personForm.lastName,
        email: personForm.email,
        phone: personForm.phone,
        role: personForm.role,
        department: personForm.department,
        salary: personForm.salary,
        status: personForm.status,
      };

      if (dialogType === 'staff') {
        addStaffToStore(storeId, personData);
      } else {
        addManagerToStore(storeId, personData);
      }
      
      loadStoreData();
      handleCloseDialog();
      
    } catch (error) {
      console.error('Error saving person:', error);
      alert('Failed to save staff member');
    }
  };

  const formatSalary = (amount) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const StaffCard = ({ person, type }) => {
    return (
      <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  mr: 2,
                  bgcolor: type === 'manager' ? 'primary.main' : 'secondary.main',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                {person.firstName?.charAt(0)?.toUpperCase()}{person.lastName?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {person.firstName} {person.lastName}
                </Typography>
                <Chip
                  label={person.role?.charAt(0)?.toUpperCase() + person.role?.slice(1)}
                  size="small"
                  color={type === 'manager' ? 'primary' : 'secondary'}
                  variant="outlined"
                />
              </Box>
            </Box>
            
            <IconButton
              onClick={() => handleOpenDialog(type, person)}
              size="small"
            >
              <Edit />
            </IconButton>
          </Box>

          <Stack spacing={1} sx={{ mb: 2 }}>
            {person.email && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.email}
                </Typography>
              </Box>
            )}
            {person.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.phone}
                </Typography>
              </Box>
            )}
            {person.department && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Work sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.department}
                </Typography>
              </Box>
            )}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={person.status || 'active'}
              size="small"
              color={person.status === 'active' ? 'success' : 'default'}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatSalary(person.salary)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="h6">Loading staff data...</Typography>
      </Box>
    );
  }

  if (!store) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Store not found
        </Typography>
        <Button onClick={() => navigate('/dashboard/stores')}>
          Back to Stores
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton 
            onClick={() => navigate(`/dashboard/stores/${storeId}`)}
            sx={{ mr: 1 }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold' }}>
              {store.name} - Staff Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage staff and managers for this store location
            </Typography>
          </Box>
        </Box>
        
        {/* Stats */}
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {managers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Managers
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                {staff.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Staff
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {staff.filter(s => s.status === 'active').length + managers.filter(m => m.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {managers.length + staff.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant={isMobile ? 'fullWidth' : 'standard'}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label={`Managers (${managers.length})`} 
            icon={<AdminPanelSettings />}
            iconPosition="start"
          />
          <Tab 
            label={`Staff (${staff.length})`} 
            icon={<Group />}
            iconPosition="start"
          />
        </Tabs>

        {/* Managers Tab */}
        <TabPanel value={tabValue} index={0}>
          {managers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <AdminPanelSettings sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No managers assigned
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add a manager to oversee this store location
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog('manager')}
              >
                Add Manager
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ p: 3 }}>
              {managers.map((manager) => (
                <Grid item xs={12} sm={6} lg={4} key={manager.id}>
                  <StaffCard person={manager} type="manager" />
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* Staff Tab */}
        <TabPanel value={tabValue} index={1}>
          {staff.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Group sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No staff members added
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add staff members to work at this store location
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog('staff')}
              >
                Add Staff Member
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ p: 3 }}>
              {staff.map((staffMember) => (
                <Grid item xs={12} sm={6} lg={4} key={staffMember.id}>
                  <StaffCard person={staffMember} type="staff" />
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Paper>

      {/* Add/Edit Person Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {editingPerson ? 'Edit' : 'Add'} {dialogType === 'manager' ? 'Manager' : 'Staff Member'}
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
                label="First Name"
                value={personForm.firstName}
                onChange={(e) => setPersonForm({ ...personForm, firstName: e.target.value })}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={personForm.lastName}
                onChange={(e) => setPersonForm({ ...personForm, lastName: e.target.value })}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={personForm.email}
                onChange={(e) => setPersonForm({ ...personForm, email: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={personForm.phone}
                onChange={(e) => setPersonForm({ ...personForm, phone: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                value={personForm.department}
                onChange={(e) => setPersonForm({ ...personForm, department: e.target.value })}
                placeholder="e.g. Sales, Cashier, Security"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary (₦)"
                type="number"
                value={personForm.salary}
                onChange={(e) => setPersonForm({ ...personForm, salary: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={personForm.status}
                  onChange={(e) => setPersonForm({ ...personForm, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="on-leave">On Leave</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button 
            onClick={handleSavePerson} 
            variant="contained"
            disabled={!personForm.firstName || !personForm.lastName}
          >
            {editingPerson ? 'Update' : 'Add'} {dialogType === 'manager' ? 'Manager' : 'Staff Member'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Buttons */}
      {!isMobile && (
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: theme.zIndex.speedDial }}>
          <Stack spacing={1}>
            <Fab
              color="primary"
              size="small"
              onClick={() => handleOpenDialog('manager')}
              sx={{ mb: 1 }}
            >
              <AdminPanelSettings />
            </Fab>
            <Fab
              color="secondary"
              size="small"
              onClick={() => handleOpenDialog('staff')}
            >
              <Add />
            </Fab>
          </Stack>
        </Box>
      )}

      {/* Mobile FABs */}
      {isMobile && (
        <Box sx={{ position: 'fixed', bottom: 90, right: 16, zIndex: theme.zIndex.speedDial }}>
          <Fab
            color={tabValue === 0 ? 'primary' : 'secondary'}
            onClick={() => handleOpenDialog(tabValue === 0 ? 'manager' : 'staff')}
          >
            <Add />
          </Fab>
        </Box>
      )}
    </Box>
  );
}

export default StoreStaffManagement;