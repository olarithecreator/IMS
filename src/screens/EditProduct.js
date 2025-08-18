import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import {
  Save,
  Cancel,
  ArrowBack,
} from '@mui/icons-material';

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

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const timeoutsRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
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

  useEffect(() => {
    // Simulate loading product data
    const loadTimeout = setTimeout(() => {
      setFormData({
        name: 'iPhone 13 Pro',
        sku: 'IP13P-256-BLK',
        category: 'Electronics',
        supplier: 'Apple Inc',
        description: 'Latest iPhone model with advanced features and camera system.',
        price: '999.99',
        cost: '750.00',
        stock: '45',
        minStock: '10',
        maxStock: '100',
        weight: '0.174',
        dimensions: '14.7 x 7.1 x 0.8',
        barcode: '1234567890123',
        tags: 'smartphone, apple, ios, camera',
      });
      setLoading(false);
    }, 1000);
    timeoutsRef.current.push(loadTimeout);

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [id]);

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

  const validateForm = () => {
    const newErrors = {};

    const toNumber = (val) => {
      const n = Number(val);
      return Number.isFinite(n) ? n : null;
    };
    const toInteger = (val) => {
      const n = Number(val);
      return Number.isInteger(n) ? n : null;
    };

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.supplier) newErrors.supplier = 'Supplier is required';

    const price = toNumber(formData.price);
    if (price === null || price <= 0) newErrors.price = 'Enter a valid price greater than 0';

    const stock = toInteger(formData.stock);
    if (stock === null || stock < 0) newErrors.stock = 'Enter a valid non-negative whole number';

    if (formData.cost !== '') {
      const cost = toNumber(formData.cost);
      if (cost === null || cost < 0) newErrors.cost = 'Enter a valid non-negative cost';
    }

    const minStock = formData.minStock === '' ? null : toInteger(formData.minStock);
    const maxStock = formData.maxStock === '' ? null : toInteger(formData.maxStock);
    if (formData.minStock !== '' && (minStock === null || minStock < 0)) newErrors.minStock = 'Enter a valid non-negative whole number';
    if (formData.maxStock !== '' && (maxStock === null || maxStock < 0)) newErrors.maxStock = 'Enter a valid non-negative whole number';
    if (minStock !== null && maxStock !== null && minStock > maxStock) {
      newErrors.minStock = 'Minimum cannot exceed maximum';
      newErrors.maxStock = 'Maximum must be at least the minimum';
    }

    if (formData.weight !== '') {
      const weight = toNumber(formData.weight);
      if (weight === null || weight < 0) newErrors.weight = 'Enter a valid non-negative weight';
    }

    if (formData.dimensions.trim() !== '') {
      const dimsOk = /^\s*\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*$/i.test(formData.dimensions);
      if (!dimsOk) newErrors.dimensions = 'Use format: L x W x H (e.g., 10 x 5 x 2)';
    }

    if (formData.barcode.trim() !== '') {
      const barcodeOk = /^\d{8,14}$/.test(formData.barcode.trim());
      if (!barcodeOk) newErrors.barcode = 'Use 8-14 digits only';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    
    // Simulate API call
    const apiTimeout = setTimeout(() => {
      console.log('Updating product:', formData);
      setSaving(false);
      setSuccess(true);
      const redirectTimeout = setTimeout(() => {
        navigate('/dashboard/inventory');
      }, 2000);
      timeoutsRef.current.push(redirectTimeout);
    }, 1500);
    timeoutsRef.current.push(apiTimeout);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard/inventory')}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            Edit Product
          </Typography>
        </Box>
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
          Product updated successfully! Redirecting to inventory...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
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

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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
                inputProps={{ min: 0.01, step: 0.01 }}
                required
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
                error={!!errors.cost}
                helperText={errors.cost}
                inputProps={{ min: 0, step: 0.01 }}
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
                inputProps={{ min: 0, step: 1 }}
                required
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
                inputProps={{ min: 0, step: 1 }}
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
                error={!!errors.maxStock}
                helperText={errors.maxStock}
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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
                error={!!errors.weight}
                helperText={errors.weight}
                inputProps={{ min: 0, step: 0.001 }}
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
                error={!!errors.dimensions}
                helperText={errors.dimensions}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                error={!!errors.barcode}
                helperText={errors.barcode}
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
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard/inventory')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} /> : <Save />}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditProduct; 