import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  MoreVert,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

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

  const columns = [
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
    },
    {
      field: 'supplier',
      headerName: 'Supplier',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 0 ? 'error' : params.value < 10 ? 'warning' : 'success'}
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      width: 130,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={(event) => handleMenuOpen(event, params.row)}
          size="small"
        >
          <MoreVert />
        </IconButton>
      ),
    },
  ];

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
        <Typography variant="h4" component="h1">
          Inventory
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/dashboard/add-product')}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', mb: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: { xs: '100%', sm: 240 } }}
          />
          <FormControl sx={{ minWidth: { xs: '100%', sm: 160 } }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: '100%', sm: 160 } }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              label="Status"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Clear Filters
          </Button>
        </Box>

        <Box sx={{ height: { xs: 500, sm: 600 }, width: '100%' }}>
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              },
              '& .MuiDataGrid-cell': {
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                py: { xs: 0.5, sm: 1 },
              },
            }}
          />
        </Box>
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
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default InventoryList; 