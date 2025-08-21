import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import Onboarding from './screens/Onboarding';
import Register from './screens/Register';
import Verification from './screens/Verification';
import Login from './screens/Login';
import StoreSetup from './screens/StoreSetup';
import Dashboard from './screens/Dashboard';
import ScanProduct from './screens/ScanProduct';
import ProductPage from './screens/ProductPage';
import Sales from './screens/Sales';
import Notifications from './screens/Notifications';
import Stores from './screens/Stores';
import Profile from './screens/Profile';
import RolesAndStaff from './screens/RolesAndStaff';
import HelpAndSupport from './screens/HelpAndSupport';
import Logout from './screens/Logout';
import AddNewProduct from './screens/AddNewProduct';
import ReportPage from './screens/ReportPage';
import AlertForgetPassword from './screens/AlertForgetPassword';
import LocalStorageViewer from './screens/LocalStorageViewer';
import InventoryList from './screens/InventoryList';
import Categories from './screens/Categories';
import Suppliers from './screens/Suppliers';
import Orders from './screens/Orders';
import Settings from './screens/Settings';
import AddStaff from './screens/AddStaff';
import ConfirmInvite from './screens/ConfirmInvite';
import StaffPinLogin from './screens/StaffPinLogin';
import ProductDetails from './screens/ProductDetails';
import AddProduct from './screens/AddProduct';
import EditProduct from './screens/EditProduct';
import Alerts from './screens/Alerts';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Routes>
        {/* Onboarding Routes (1.0 to 2.3) */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding/:step" element={<Onboarding />} />
        
        {/* Register Route (3.2) */}
        <Route path="/register" element={<Register />} />
        
        {/* Verification Route (4) */}
        <Route path="/verification" element={<Verification />} />
        
        {/* Login Route (5) */}
        <Route path="/login" element={<Login />} />
        
        {/* Store Setup Route (6) */}
        <Route path="/store-setup" element={<StoreSetup />} />
        
        {/* Protected routes with layout */}
        <Route path="/dashboard" element={<Layout />}>
          {/* Dashboard Routes (7 to 7.2) */}
          <Route index element={<Dashboard />} />
          <Route path=":step" element={<Dashboard />} />
          
          {/* Scan Product Routes (8.0 to 8.1) */}
          <Route path="scan-product/:step" element={<ScanProduct />} />
          
          {/* Product Page Routes (9.0 to 9.4) */}
          <Route path="product/:step" element={<ProductPage />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          
          {/* Sales Routes (10.0 to 10.5) */}
          <Route path="sales/:step" element={<Sales />} />
          
          {/* Notifications Route (11) */}
          <Route path="notifications" element={<Notifications />} />
          <Route path="alerts" element={<Alerts />} />
          
          {/* Stores Route (12) */}
          <Route path="stores" element={<Stores />} />
          
          {/* Profile Routes (13 to 13.1) */}
          <Route path="profile/:step" element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Roles and Staff Routes (14 to 15.2) */}
          <Route path="roles-staff/:step" element={<RolesAndStaff />} />
          <Route path="roles-staff" element={<RolesAndStaff />} />
          <Route path="roles-staff/add" element={<AddStaff />} />
          <Route path="confirm-invite" element={<ConfirmInvite />} />
          <Route path="staff-login" element={<StaffPinLogin />} />
          
          {/* Help and Support Routes (16 to 17) */}
          <Route path="help-support/:step" element={<HelpAndSupport />} />
          <Route path="help-support" element={<HelpAndSupport />} />
          
          {/* Logout Route (18) */}
          <Route path="logout" element={<Logout />} />
          
          {/* Add New Product Routes (19 to 24) */}
          <Route path="add-product/:step" element={<AddNewProduct />} />
          <Route path="add-product" element={<AddNewProduct />} />
          
          {/* Report Page Routes (25 to 24.1) */}
          <Route path="reports/:step" element={<ReportPage />} />
          <Route path="reports" element={<ReportPage />} />
          
          {/* Alert Forget Password Routes (27 to 27.3) */}
          <Route path="forgot-password/:step" element={<AlertForgetPassword />} />
          <Route path="forgot-password" element={<AlertForgetPassword />} />
          
          {/* Local Storage Viewer Route */}
          <Route path="local-storage" element={<LocalStorageViewer />} />

          {/* Core app pages */}
          <Route path="inventory" element={<InventoryList />} />
          <Route path="categories" element={<Categories />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App; 