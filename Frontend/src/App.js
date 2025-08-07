import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import InventoryList from './screens/InventoryList';
import AddProduct from './screens/AddProduct';
import EditProduct from './screens/EditProduct';
import ProductDetails from './screens/ProductDetails';
import Categories from './screens/Categories';
import Suppliers from './screens/Suppliers';
import Orders from './screens/Orders';
import CreateOrder from './screens/CreateOrder';
import OrderDetails from './screens/OrderDetails';
import Reports from './screens/Reports';
import Settings from './screens/Settings';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';
import Help from './screens/Help';
import About from './screens/About';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<InventoryList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="create-order" element={<CreateOrder />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="help" element={<Help />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App; 