import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Badge
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Add,
  Edit,
  Delete,
  Person,
  Security,
  Group,
  CheckCircle,
  Cancel,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  SupervisorAccount,
  PersonAdd
} from '@mui/icons-material';

const RolesAndStaff = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(parseInt(step) || 14);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Mock data for roles
  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access and control',
      permissions: ['all'],
      staffCount: 2,
      color: 'error'
    },
    {
      id: 2,
      name: 'Store Manager',
      description: 'Manage store operations and staff',
      permissions: ['inventory', 'sales', 'reports', 'staff'],
      staffCount: 5,
      color: 'primary'
    },
    {
      id: 3,
      name: 'Sales Staff',
      description: 'Handle sales and customer service',
      permissions: ['sales', 'inventory_view'],
      staffCount: 12,
      color: 'success'
    },
    {
      id: 4,
      name: 'Inventory Clerk',
      description: 'Manage product inventory',
      permissions: ['inventory', 'reports_view'],
      staffCount: 8,
      color: 'warning'
    }
  ];

  // Mock data for staff
  const staff = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Super Admin',
      store: 'Main Store',
      status: 'active',
      lastActive: '2 hours ago',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Store Manager',
      store: 'Outlet Store',
      status: 'active',
      lastActive: '1 day ago',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'Sales Staff',
      store: 'Main Store',
      status: 'inactive',
      lastActive: '1 week ago',
      avatar: 'MW'
    }
  ];

  // Mock permissions
  const allPermissions = [
    { category: 'Inventory', permissions: ['View', 'Create', 'Edit', 'Delete', 'Export'] },
    { category: 'Sales', permissions: ['View', 'Create', 'Edit', 'Delete', 'Refund'] },
    { category: 'Reports', permissions: ['View', 'Export', 'Schedule'] },
    { category: 'Staff', permissions: ['View', 'Create', 'Edit', 'Delete', 'Assign Roles'] },
    { category: 'Settings', permissions: ['View', 'Edit', 'System Config'] }
  ];

  const steps = [
    { label: 'Roles Overview', value: 14 },
    { label: 'Create Role', value: 15 },
    { label: 'Staff Management', value: 15.1 },
    { label: 'Permissions Setup', value: 15.2 }
  ];

  const handleNext = () => {
    const nextStep = Math.min(activeStep + 0.1, 15.2);
    setActiveStep(nextStep);
    navigate(`/dashboard/roles-staff/${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = Math.max(activeStep - 0.1, 14);
    setActiveStep(prevStep);
    navigate(`/dashboard/roles-staff/${prevStep}`);
  };

  const handleStepClick = (stepValue) => {
    setActiveStep(stepValue);
    navigate(`/dashboard/roles-staff/${stepValue}`);
  };

  const handleDialogOpen = (type, item = null) => {
    setDialogType(type);
    setSelectedRole(item);
    setSelectedStaff(item);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedRole(null);
    setSelectedStaff(null);
  };

  const renderRolesOverview = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Roles & Permissions
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleDialogOpen('createRole')}
        >
          Create New Role
        </Button>
      </Box>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} md={6} lg={3} key={role.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip
                    label={role.name}
                    color={role.color}
                    variant="outlined"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDialogOpen('editRole', role)}
                  >
                    <Edit />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {role.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">
                    {role.staffCount} staff members
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => handleStepClick(15.1)}
                  >
                    Manage Staff
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderCreateRole = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create New Role
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Role Name"
              placeholder="e.g., Sales Manager"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Role Description"
              placeholder="Brief description of the role"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Permissions
            </Typography>
            {allPermissions.map((category) => (
              <Box key={category.category} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {category.category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.permissions.map((permission) => (
                    <FormControlLabel
                      key={permission}
                      control={<Checkbox />}
                      label={permission}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            Create Role
          </Button>
        </Box>
      </Paper>
    </Box>
  );

  const renderStaffManagement = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Staff Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => handleDialogOpen('addStaff')}
        >
          Add Staff Member
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff Member</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {member.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={member.role}
                    size="small"
                    color="primary"
                  />
                </TableCell>
                <TableCell>{member.store}</TableCell>
                <TableCell>
                  <Chip
                    label={member.status}
                    color={member.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{member.lastActive}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleDialogOpen('editStaff', member)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderPermissionsSetup = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Permissions Setup
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Configure detailed permissions for each role. Select the permissions that each role should have access to.
        </Typography>
        
        {roles.map((role) => (
          <Box key={role.id} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label={role.name}
                color={role.color}
                variant="outlined"
              />
              <Typography variant="h6">{role.name}</Typography>
            </Box>
            
            {allPermissions.map((category) => (
              <Box key={category.category} sx={{ mb: 3, ml: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {category.category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.permissions.map((permission) => (
                    <FormControlLabel
                      key={permission}
                      control={
                        <Checkbox
                          defaultChecked={role.permissions.includes('all') || role.permissions.includes(category.category.toLowerCase())}
                        />
                      }
                      label={permission}
                    />
                  ))}
                </Box>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained">
            Save Permissions
          </Button>
        </Box>
      </Paper>
    </Box>
  );

  const renderContent = () => {
    if (activeStep === 14) return renderRolesOverview();
    if (activeStep === 15) return renderCreateRole();
    if (activeStep === 15.1) return renderStaffManagement();
    if (activeStep === 15.2) return renderPermissionsSetup();
    return renderRolesOverview();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Stepper */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stepper activeStep={steps.findIndex(step => step.value === activeStep)}>
          {steps.map((stepItem) => (
            <Step key={stepItem.value}>
              <StepLabel
                onClick={() => handleStepClick(stepItem.value)}
                sx={{ cursor: 'pointer' }}
              >
                {stepItem.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      {renderContent()}

      {/* Navigation */}
      {activeStep !== 14 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep < 15.2 && (
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      )}

      {/* Dialogs */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'createRole' && 'Create New Role'}
          {dialogType === 'editRole' && 'Edit Role'}
          {dialogType === 'addStaff' && 'Add Staff Member'}
          {dialogType === 'editStaff' && 'Edit Staff Member'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'createRole' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Create a new role with specific permissions
              </Typography>
            </Box>
          )}
          {dialogType === 'editRole' && selectedRole && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Edit role: {selectedRole.name}
              </Typography>
            </Box>
          )}
          {dialogType === 'addStaff' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Add a new staff member to the system
              </Typography>
            </Box>
          )}
          {dialogType === 'editStaff' && selectedStaff && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Edit staff member: {selectedStaff.name}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained">
            {dialogType.includes('create') || dialogType.includes('add') ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesAndStaff;


