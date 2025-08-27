import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { initializeDefaultData, isAuthenticated } from './utils/localStorage';
import Layout from './components/Layout';
import MobileLayout from './components/MobileLayout';
import Onboarding from './screens/Onboarding';
import Register from './screens/Register';
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
import NewSale from './screens/NewSale';
import Receipt from './screens/Receipt';
import StoreManager from './screens/StoreManager';
import VerificationCode from './screens/VerificationCode';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    // Initialize default data on app load
    initializeDefaultData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Routes>
        {/* Onboarding Routes (1.0 to 2.3) */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding/:step" element={<Onboarding />} />
        
        {/* Register Route (3.2) */}
        <Route path="/register" element={<Register />} />
        
        {/* Verification removed: email-based registration only */}
        
        {/* Login Route (5) */}
        <Route path="/login" element={<Login />} />
        
        {/* Store Setup Route (6) */}
        <Route path="/store-setup" element={<StoreSetup />} />
        
        {/* Protected routes with mobile layout */}
        <Route path="/dashboard" element={<ProtectedRoute><MobileLayout /></ProtectedRoute>}>
          {/* Dashboard Routes */}
          <Route index element={<Dashboard />} />
          
          {/* Scan Product Routes */}
          <Route path="scan" element={<ScanProduct />} />
          <Route path="scan/:step" element={<ScanProduct />} />
          
          {/* Product Routes */}
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:step" element={<ProductPage />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          
          {/* Sales Routes */}
          <Route path="sales" element={<Sales />} />
          <Route path="sales/new" element={<NewSale />} />
          <Route path="sales/receipt/:id" element={<Receipt />} />
          
          {/* Notifications & Alerts */}
          <Route path="notifications" element={<Notifications />} />
          <Route path="alerts" element={<Alerts />} />
          
          {/* Profile & Settings */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Store Management */}
          <Route path="stores" element={<StoreManager />} />
          <Route path="roles-staff" element={<RolesAndStaff />} />
          <Route path="roles-staff/add" element={<AddStaff />} />
          
          {/* Help & Support */}
          <Route path="help-support" element={<HelpAndSupport />} />
          
          {/* Reports */}
          <Route path="reports" element={<ReportPage />} />
          
          {/* Logout */}
          <Route path="logout" element={<Logout />} />
          
          {/* Legacy routes for compatibility */}
          <Route path="inventory" element={<InventoryList />} />
          <Route path="categories" element={<Categories />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="local-storage" element={<LocalStorageViewer />} />
        </Route>
        
        {/* Authentication flow routes */}
        <Route path="/verification" element={<VerificationCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="confirm-invite" element={<ConfirmInvite />} />
        <Route path="staff-login" element={<StaffPinLogin />} />
      </Routes>
    </Box>
  );
}

export default App; 