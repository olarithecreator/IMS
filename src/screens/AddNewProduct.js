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
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Switch,
  Chip,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  Slider,
  Rating
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Add,
  Delete,
  CloudUpload,
  PhotoCamera,
  Category,
  Inventory,
  AttachMoney,
  Description,
  Settings,
  CheckCircle,
  Warning,
  Info
} from '@mui/icons-material';

const AddNewProduct = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(parseInt(step) || 19);
  const [formData, setFormData] = useState({
    basicInfo: {
      name: '',
      sku: '',
      category: '',
      brand: '',
      description: ''
    },
    pricing: {
      costPrice: '',
      sellingPrice: '',
      comparePrice: '',
      taxRate: '',
      discount: ''
    },
    inventory: {
      quantity: '',
      lowStockThreshold: '',
      trackInventory: true,
      allowBackorders: false,
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      }
    },
    media: {
      images: [],
      videos: [],
      documents: []
    },
    variants: [],
    shipping: {
      weight: '',
      dimensions: '',
      shippingClass: '',
      freeShipping: false
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      urlSlug: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const steps = [
    { label: 'Basic Information', value: 19 },
    { label: 'Pricing & Costs', value: 20 },
    { label: 'Inventory & Stock', value: 21 },
    { label: 'Media & Images', value: 22 },
    { label: 'Variants & Options', value: 23 },
    { label: 'Shipping & SEO', value: 24 }
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextStep = Math.min(activeStep + 1, 24);
      setActiveStep(nextStep);
      navigate(`/dashboard/add-product/${nextStep}`);
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(activeStep - 1, 19);
    setActiveStep(prevStep);
    navigate(`/dashboard/add-product/${prevStep}`);
  };

  const handleStepClick = (stepValue) => {
    setActiveStep(stepValue);
    navigate(`/dashboard/add-product/${stepValue}`);
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear error when user starts typing
    if (errors[`${section}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}_${field}`]: null
      }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch (activeStep) {
      case 19: // Basic Info
        if (!formData.basicInfo.name.trim()) {
          newErrors.basicInfo_name = 'Product name is required';
        }
        if (!formData.basicInfo.sku.trim()) {
          newErrors.basicInfo_sku = 'SKU is required';
        }
        if (!formData.basicInfo.category) {
          newErrors.basicInfo_category = 'Category is required';
        }
        break;
      case 20: // Pricing
        if (!formData.pricing.costPrice || parseFloat(formData.pricing.costPrice) <= 0) {
          newErrors.pricing_costPrice = 'Valid cost price is required';
        }
        if (!formData.pricing.sellingPrice || parseFloat(formData.pricing.sellingPrice) <= 0) {
          newErrors.pricing_sellingPrice = 'Valid selling price is required';
        }
        break;
      case 21: // Inventory
        if (!formData.inventory.quantity || parseInt(formData.inventory.quantity) < 0) {
          newErrors.inventory_quantity = 'Valid quantity is required';
        }
        break;
      // Add more validation for other steps as needed
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      // Submit the product
      console.log('Submitting product:', formData);
      // Navigate to success page or product list
      navigate('/dashboard');
    }
  };

  const renderBasicInfo = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Basic Product Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Product Name"
            value={formData.basicInfo.name}
            onChange={(e) => handleInputChange('basicInfo', 'name', e.target.value)}
            error={!!errors.basicInfo_name}
            helperText={errors.basicInfo_name}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="SKU (Stock Keeping Unit)"
            value={formData.basicInfo.sku}
            onChange={(e) => handleInputChange('basicInfo', 'sku', e.target.value)}
            error={!!errors.basicInfo_sku}
            helperText={errors.basicInfo_sku}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.basicInfo_category}>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.basicInfo.category}
              label="Category"
              onChange={(e) => handleInputChange('basicInfo', 'category', e.target.value)}
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="home">Home & Garden</MenuItem>
              <MenuItem value="sports">Sports & Outdoors</MenuItem>
              <MenuItem value="books">Books & Media</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Brand"
            value={formData.basicInfo.brand}
            onChange={(e) => handleInputChange('basicInfo', 'brand', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Description"
            multiline
            rows={4}
            value={formData.basicInfo.description}
            onChange={(e) => handleInputChange('basicInfo', 'description', e.target.value)}
            placeholder="Describe your product in detail..."
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPricing = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Pricing & Costs
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cost Price"
            type="number"
            value={formData.pricing.costPrice}
            onChange={(e) => handleInputChange('pricing', 'costPrice', e.target.value)}
            error={!!errors.pricing_costPrice}
            helperText={errors.pricing_costPrice}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Selling Price"
            type="number"
            value={formData.pricing.sellingPrice}
            onChange={(e) => handleInputChange('pricing', 'sellingPrice', e.target.value)}
            error={!!errors.pricing_sellingPrice}
            helperText={errors.pricing_sellingPrice}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Compare Price"
            type="number"
            value={formData.pricing.comparePrice}
            onChange={(e) => handleInputChange('pricing', 'comparePrice', e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tax Rate (%)"
            type="number"
            value={formData.pricing.taxRate}
            onChange={(e) => handleInputChange('pricing', 'taxRate', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Alert severity="info">
            <AlertTitle>Pricing Tips</AlertTitle>
            Set your selling price higher than your cost price to ensure profitability. 
            Compare price can be used to show original prices during sales.
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );

  const renderInventory = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Inventory & Stock Management
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Initial Stock Quantity"
            type="number"
            value={formData.inventory.quantity}
            onChange={(e) => handleInputChange('inventory', 'quantity', e.target.value)}
            error={!!errors.inventory_quantity}
            helperText={errors.inventory_quantity}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Low Stock Threshold"
            type="number"
            value={formData.inventory.lowStockThreshold}
            onChange={(e) => handleInputChange('inventory', 'lowStockThreshold', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Weight (lbs)"
            type="number"
            value={formData.inventory.weight}
            onChange={(e) => handleInputChange('inventory', 'weight', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.inventory.trackInventory}
                onChange={(e) => handleInputChange('inventory', 'trackInventory', e.target.checked)}
              />
            }
            label="Track Inventory"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.inventory.allowBackorders}
                onChange={(e) => handleInputChange('inventory', 'allowBackorders', e.target.checked)}
              />
            }
            label="Allow Backorders"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Dimensions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Length (in)"
                type="number"
                value={formData.inventory.dimensions.length}
                onChange={(e) => handleInputChange('inventory', 'dimensions', {
                  ...formData.inventory.dimensions,
                  length: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Width (in)"
                type="number"
                value={formData.inventory.dimensions.width}
                onChange={(e) => handleInputChange('inventory', 'dimensions', {
                  ...formData.inventory.dimensions,
                  width: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Height (in)"
                type="number"
                value={formData.inventory.dimensions.height}
                onChange={(e) => handleInputChange('inventory', 'dimensions', {
                  ...formData.inventory.dimensions,
                  height: e.target.value
                })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  const renderMedia = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Media & Images
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Images
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  onClick={() => setOpenDialog(true)}
                >
                  Upload Images
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                >
                  Take Photo
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Upload high-quality images of your product. First image will be the main product image.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Image Requirements
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText primary="Minimum 800x800 pixels for best quality" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText primary="Supported formats: JPG, PNG, WebP" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText primary="Maximum file size: 5MB per image" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );

  const renderVariants = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Variants & Options
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Product Variants</AlertTitle>
            Create different versions of your product (e.g., different sizes, colors, materials).
          </Alert>
        </Grid>
        
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Variant Option
          </Button>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Common Variant Types
          </Typography>
          <Grid container spacing={2}>
            {['Size', 'Color', 'Material', 'Style'].map((type) => (
              <Grid item key={type}>
                <Chip
                  label={type}
                  variant="outlined"
                  onClick={() => setOpenDialog(true)}
                  sx={{ cursor: 'pointer' }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  const renderShippingAndSEO = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Shipping & SEO Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shipping Information
          </Typography>
          <TextField
            fullWidth
            label="Shipping Weight (lbs)"
            type="number"
            value={formData.shipping.weight}
            onChange={(e) => handleInputChange('shipping', 'weight', e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Shipping Class</InputLabel>
            <Select
              value={formData.shipping.shippingClass}
              label="Shipping Class"
              onChange={(e) => handleInputChange('shipping', 'shippingClass', e.target.value)}
            >
              <MenuItem value="standard">Standard Shipping</MenuItem>
              <MenuItem value="express">Express Shipping</MenuItem>
              <MenuItem value="overnight">Overnight Shipping</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={formData.shipping.freeShipping}
                onChange={(e) => handleInputChange('shipping', 'freeShipping', e.target.checked)}
              />
            }
            label="Free Shipping"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            SEO Settings
          </Typography>
          <TextField
            fullWidth
            label="Meta Title"
            value={formData.seo.metaTitle}
            onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
            sx={{ mb: 2 }}
            helperText="Title that appears in search results"
          />
          <TextField
            fullWidth
            label="Meta Description"
            multiline
            rows={3}
            value={formData.seo.metaDescription}
            onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
            sx={{ mb: 2 }}
            helperText="Brief description for search results"
          />
          <TextField
            fullWidth
            label="Keywords"
            value={formData.seo.keywords}
            onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
            helperText="Comma-separated keywords"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderContent = () => {
    switch (activeStep) {
      case 19: return renderBasicInfo();
      case 20: return renderPricing();
      case 21: return renderInventory();
      case 22: return renderMedia();
      case 23: return renderVariants();
      case 24: return renderShippingAndSEO();
      default: return renderBasicInfo();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Stepper */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
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
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        {renderContent()}
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={activeStep === 19}
        >
          Back
        </Button>
        
        {activeStep < 24 ? (
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            size="large"
          >
            Create Product
          </Button>
        )}
      </Box>

      {/* Dialogs */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Media</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            This dialog would contain the media upload functionality.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNewProduct;


