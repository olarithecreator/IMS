import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Business,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

const mockSuppliers = [
  {
    id: 1,
    name: 'Apple Inc',
    contact: 'John Smith',
    email: 'john.smith@apple.com',
    phone: '+1-555-0123',
    address: '1 Infinite Loop, Cupertino, CA',
    products: 45,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Samsung Electronics',
    contact: 'Sarah Johnson',
    email: 'sarah.johnson@samsung.com',
    phone: '+1-555-0124',
    address: '129 Samsung-ro, Yeongtong-gu, Suwon',
    products: 32,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Nike Inc',
    contact: 'Mike Davis',
    email: 'mike.davis@nike.com',
    phone: '+1-555-0125',
    address: 'One Bowerman Drive, Beaverton, OR',
    products: 28,
    status: 'Active',
  },
];

function Suppliers() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleOpenDialog = (supplier = null) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
      });
    } else {
      setEditingSupplier(null);
      setFormData({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSupplier(null);
    setFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  const handleSubmit = () => {
    if (editingSupplier) {
      setSuppliers(suppliers.map(sup =>
        sup.id === editingSupplier.id
          ? { ...sup, ...formData }
          : sup
      ));
    } else {
      const newSupplier = {
        id: Date.now(),
        ...formData,
        products: 0,
        status: 'Active',
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    handleCloseDialog();
  };

  const handleDelete = (supplierId) => {
    setSuppliers(suppliers.filter(sup => sup.id !== supplierId));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Suppliers
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Supplier
        </Button>
      </Box>

      <Grid container spacing={3}>
        {suppliers.map((supplier) => (
          <Grid item xs={12} sm={6} md={4} key={supplier.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Business sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" component="h2">
                    {supplier.name}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {supplier.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {supplier.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {supplier.address}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={`${supplier.products} products`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={supplier.status}
                    size="small"
                    color="success"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleOpenDialog(supplier)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(supplier.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Company Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contact Person"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
              type="email"
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSupplier ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Suppliers; 