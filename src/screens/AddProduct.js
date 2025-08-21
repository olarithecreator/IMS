import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Save,
  Cancel,
  Upload,
  Inventory,
  Category,
  AttachMoney,
  Description,
} from '@mui/icons-material';

const steps = ['Basic Information', 'Pricing & Stock', 'Additional Details'];

const categories = [
  'Electronics',
  'Clothing',
  'Footwear',
  'Books',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Health',
  'Automotive',
  'Toys & Games',
  'Food & Beverages',
];

const suppliers = [
  'Apple Inc',
  'Samsung Electronics',
  'Nike Inc',
  'Adidas AG',
  'Microsoft Corporation',
  'Sony Corporation',
  'LG Electronics',
  'Dell Technologies',
  'HP Inc',
  'Canon Inc',
];

function AddProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    supplier: '',
    description: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '',
    maxStock: '',
    weight: '',
    dimensions: '',
    barcode: '',
    tags: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Product name is required';
      if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.supplier) newErrors.supplier = 'Supplier is required';
    }

    if (step === 1) {
      if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
      if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
      if (formData.minStock && formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      // Simulate API call
      console.log('Submitting product:', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/inventory');
      }, 2000);
    }
  };

  const generateSKU = () => {
    const category = formData.category.substring(0, 3).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const sku = `${category}-${random}`;
    setFormData({
      ...formData,
      sku,
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  label="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  error={!!errors.sku}
                  helperText={errors.sku}
                  required
                />
                <Button
                  variant="outlined"
                  onClick={generateSKU}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  Generate
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.category} required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.supplier} required>
                <InputLabel>Supplier</InputLabel>
                <Select
                  name="supplier"
                  value={formData.supplier}
                  label="Supplier"
                  onChange={handleChange}
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      {supplier}
                    </MenuItem>
                  ))}
                </Select>
                {errors.supplier && <FormHelperText>{errors.supplier}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Enter product description..."
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Pricing & Stock Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price ($)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                required
                InputProps={{
                  startAdornment: <AttachMoney />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cost ($)"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <AttachMoney />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Current Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                error={!!errors.stock}
                helperText={errors.stock}
                required
                InputProps={{
                  startAdornment: <Inventory />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Minimum Stock"
                name="minStock"
                type="number"
                value={formData.minStock}
                onChange={handleChange}
                error={!!errors.minStock}
                helperText={errors.minStock}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Maximum Stock"
                name="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Dimensions (L x W x H cm)"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="10 x 5 x 2"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="tag1, tag2, tag3"
              />
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Product Image
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed #ccc',
                      borderRadius: 1,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Upload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Click to upload product image
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      PNG, JPG up to 5MB
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ typography: { xs: 'h6', sm: 'h4' }, fontWeight: 800 }}>
          Add New Product
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={() => navigate('/dashboard/inventory')}
        >
          Cancel
        </Button>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Product added successfully! Redirecting to inventory...
        </Alert>
      )}

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                >
                  Save Product
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddProduct; 