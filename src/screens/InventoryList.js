import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Slide,
  Switch,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  MoreVert,
  PriceChange,
  AddCircleOutline,
  Remove,
} from '@mui/icons-material';

const mockProducts = [
  {
    id: 1,
    name: 'iPhone 13 Pro',
    sku: 'IP13P-256-BLK',
    category: 'Electronics',
    supplier: 'Apple Inc',
    price: 999.99,
    stock: 45,
    status: 'In Stock',
    lastUpdated: '2024-01-15',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21',
    sku: 'SGS21-128-BLU',
    category: 'Electronics',
    supplier: 'Samsung Electronics',
    price: 799.99,
    stock: 12,
    status: 'Low Stock',
    lastUpdated: '2024-01-14',
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    sku: 'MBP16-512-SLV',
    category: 'Electronics',
    supplier: 'Apple Inc',
    price: 2499.99,
    stock: 8,
    status: 'In Stock',
    lastUpdated: '2024-01-13',
  },
  {
    id: 4,
    name: 'Nike Air Max 270',
    sku: 'NAM270-10-BLK',
    category: 'Footwear',
    supplier: 'Nike Inc',
    price: 150.00,
    stock: 0,
    status: 'Out of Stock',
    lastUpdated: '2024-01-12',
  },
  {
    id: 5,
    name: 'Adidas Ultraboost 21',
    sku: 'AUB21-9-WHT',
    category: 'Footwear',
    supplier: 'Adidas AG',
    price: 180.00,
    stock: 23,
    status: 'In Stock',
    lastUpdated: '2024-01-11',
  },
];

const categories = ['All', 'Electronics', 'Footwear', 'Clothing', 'Books', 'Home & Garden'];
const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

function InventoryList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addStockOpen, setAddStockOpen] = useState(false);
  const [addStockQty, setAddStockQty] = useState(1);
  const [addStockCost, setAddStockCost] = useState('');
  const [bulkSheetOpen, setBulkSheetOpen] = useState(false);
  const [bulkByPercent, setBulkByPercent] = useState(true);
  const [bulkDelta, setBulkDelta] = useState('');
  const [roundToTen, setRoundToTen] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEdit = () => {
    if (selectedProduct) {
      navigate(`/dashboard/edit-product/${selectedProduct.id}`);
    }
    handleMenuClose();
  };

  const handleView = () => {
    if (selectedProduct) {
      navigate(`/dashboard/product-details/${selectedProduct.id}`);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Delete product:', selectedProduct);
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const previewBulk = useMemo(() => {
    const delta = parseFloat(bulkDelta || '0');
    return mockProducts.slice(0, 4).map((p) => {
      const base = p.price;
      let next = bulkByPercent ? base * (1 + delta / 100) : base + delta;
      if (roundToTen) {
        next = Math.round(next / 10) * 10;
      }
      return { sku: p.sku, current: base, next };
    });
  }, [bulkDelta, bulkByPercent, roundToTen]);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, mb: 3 }}>
        <Typography sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 800 }}>Product</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PriceChange />} onClick={() => setBulkSheetOpen(true)}>Bulk Update Price</Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/dashboard/add-product')}>Add Product</Button>
        </Box>
      </Box>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', mb: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}
            sx={{ minWidth: { xs: '100%', sm: 300 } }}
          />
          <FormControl sx={{ minWidth: { xs: '100%', sm: 160 } }}>
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} label="Category" onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (<MenuItem key={category} value={category}>{category}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: '100%', sm: 160 } }}>
            <InputLabel>Status</InputLabel>
            <Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}>
              {statuses.map((status) => (<MenuItem key={status} value={status}>{status}</MenuItem>))}
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<FilterList />} onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedStatus('All'); }} sx={{ width: { xs: '100%', sm: 'auto' } }}>Clear</Button>
        </Box>

        {filteredProducts.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>No products found</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Try clearing filters or add a new product to get started.</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/dashboard/add-product')}>Add Product</Button>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card onClick={() => navigate(`/dashboard/product-details/${p.id}`)} sx={{ cursor: 'pointer' }}>
                  <CardContent sx={{ display: 'flex', gap: 2 }}>
                    <CardMedia component="img" image={`https://via.placeholder.com/80x80?text=${encodeURIComponent(p.name.split(' ')[0])}`} alt={p.name} sx={{ width: 80, height: 80, borderRadius: 2 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{p.name}</Typography>
                      <Typography variant="body2" color="text.secondary">SKU: {p.sku}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography variant="h6">₦{p.price.toLocaleString()}</Typography>
                        <Typography variant="body2" color={p.stock === 0 ? 'error.main' : p.stock < 10 ? 'warning.main' : 'success.main'}>
                          {p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? `Low Stock (${p.stock})` : `In Stock (${p.stock})`}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleMenuOpen(e, p); }}><MoreVert /></IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>
          <Visibility sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => { setAddStockOpen(true); handleMenuClose(); }}>
          <AddCircleOutline sx={{ mr: 1 }} />
          Add Stock
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Add Stock Dialog */}
      <Dialog open={addStockOpen} onClose={() => setAddStockOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton onClick={() => setAddStockQty(Math.max(1, addStockQty - 1))}><Remove /></IconButton>
            <TextField type="number" label="Quantity" value={addStockQty} onChange={(e) => setAddStockQty(Math.max(1, parseInt(e.target.value)||1))} sx={{ width: 120 }} />
            <IconButton onClick={() => setAddStockQty(addStockQty + 1)}><Add /></IconButton>
          </Box>
          <TextField fullWidth label="Add cost per unit" value={addStockCost} onChange={(e) => setAddStockCost(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start">₦</InputAdornment> }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddStockOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddStockOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Update Price Bottom Sheet */}
      <Dialog open={bulkSheetOpen} onClose={() => setBulkSheetOpen(false)} fullWidth maxWidth="sm" TransitionComponent={Slide} TransitionProps={{ direction: 'up' }}>
        <DialogTitle>Bulk Update Price</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant={bulkByPercent ? 'contained' : 'outlined'} onClick={() => setBulkByPercent(true)}>By %</Button>
            <Button variant={!bulkByPercent ? 'contained' : 'outlined'} onClick={() => setBulkByPercent(false)}>By Amount</Button>
          </Box>
          <TextField fullWidth placeholder={bulkByPercent ? 'e.g. 10 for 10%' : 'e.g. 500'} value={bulkDelta} onChange={(e) => setBulkDelta(e.target.value)} InputProps={{ startAdornment: !bulkByPercent ? <InputAdornment position="start">₦</InputAdornment> : null }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
            <Switch checked={roundToTen} onChange={(e) => setRoundToTen(e.target.checked)} />
            <Typography variant="body2">Round to nearest 10 NGN</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Preview</Typography>
          {previewBulk.map((row) => (
            <Box key={row.sku} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>{row.sku}</Typography>
              <Typography variant="body2">₦{row.current.toLocaleString()}</Typography>
              <Typography variant="body2" color="primary">₦{row.next.toLocaleString()}</Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkSheetOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setBulkSheetOpen(false)}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default InventoryList; 