import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { initializeDefaultData, isAuthenticated } from './utils/localStorage';
import theme from './theme';
import Layout from './components/Layout';
import MobileLayout from './components/MobileLayout';
import ResponsiveLayout from './components/ResponsiveLayout';
import AdaptiveLayout from './components/AdaptiveLayout';
import Onboarding from './screens/Onboarding';
import Register from './screens/Register';
import Login from './screens/Login';
import ResponsiveLogin from './screens/ResponsiveLogin';
import StoreSetup from './screens/StoreSetup';
import Dashboard from './screens/Dashboard';
import ResponsiveDashboard from './screens/ResponsiveDashboard';
import DesktopDashboard from './screens/DesktopDashboard';
import DashboardSwitch from './components/DashboardSwitch';
import ScanProduct from './screens/ScanProduct';
import ResponsiveScanProduct from './screens/ResponsiveScanProduct';
import ProductPage from './screens/ProductPage';
import ResponsiveProductPage from './screens/ResponsiveProductPage';
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
import StoreManagement from './screens/StoreManagement';
import StoreDetails from './screens/StoreDetails';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import RoleSelection from './screens/RoleSelection';
import OwnerRegister from './screens/OwnerRegister';
import ManagerRegister from './screens/ManagerRegister';
import StaffRegister from './screens/StaffRegister';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Routes>
        {/* Onboarding Routes (1.0 to 2.3) */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding/:step" element={<Onboarding />} />
        
        {/* Register Routes */}
        <Route path="/register" element={<RoleSelection />} />
        <Route path="/register/owner" element={<OwnerRegister />} />
        <Route path="/register/manager" element={<ManagerRegister />} />
        <Route path="/register/staff" element={<StaffRegister />} />
        <Route path="/register/original" element={<Register />} />
        
        {/* Verification removed: email-based registration only */}
        
        {/* Login Route (5) */}
        <Route path="/login" element={<ResponsiveLogin />} />
        
        {/* Store Setup Route (6) */}
        <Route path="/store-setup" element={<StoreSetup />} />
        
        {/* Protected routes with mobile layout */}
        <Route path="/dashboard" element={<ProtectedRoute><AdaptiveLayout /></ProtectedRoute>}>
          {/* Dashboard Routes */}
          <Route index element={<DashboardSwitch />} />
          
          {/* Scan Product Routes */}
          <Route path="scan" element={<ResponsiveScanProduct />} />
          <Route path="scan/:step" element={<ResponsiveScanProduct />} />
          
          {/* Product Routes */}
          <Route path="products" element={<ResponsiveProductPage />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-product/:step" element={<AddNewProduct />} />
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
          <Route path="stores" element={<StoreManagement />} />
          <Route path="stores/add" element={<StoreManager />} />
          <Route path="stores/:storeId" element={<StoreDetails />} />
          <Route path="stores/edit/:storeId" element={<StoreManager />} />
          <Route path="staff" element={<RolesAndStaff />} />
          <Route path="staff/add" element={<AddStaff />} />
          <Route path="staff/requests" element={<RolesAndStaff />} />
          <Route path="roles-staff" element={<RolesAndStaff />} />
          <Route path="roles-staff/add" element={<AddStaff />} />
          <Route path="roles-staff/:step" element={<RolesAndStaff />} />
          
          {/* Help & Support */}
          <Route path="help" element={<HelpAndSupport />} />
          <Route path="help-support" element={<HelpAndSupport />} />
          <Route path="help-support/:step" element={<HelpAndSupport />} />
          
          {/* Reports */}
          <Route path="reports" element={<ReportPage />} />
          <Route path="reports/:step" element={<ReportPage />} />
          
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-invite" element={<ConfirmInvite />} />
        <Route path="/staff-login" element={<StaffPinLogin />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App; 