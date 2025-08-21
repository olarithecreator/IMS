import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from '@mui/material';
import {
  Inventory,
  ShoppingCart,
  Warning,
  Add,
  ChevronRight,
  AttachMoney,
  MonetizationOn,
  Home,
  QrCodeScanner,
  Storefront,
  ShowChart,
  CloudDone,
  AddCircleOutline,
  PriceChange,
  InsertChart,
  ArrowCircleRight,
} from '@mui/icons-material';
// Charts removed in mobile role-specific UI to match provided designs

const MetricCard = ({ title, value, valueColor = 'text.primary' }) => (
  <Card sx={{ borderRadius: 3 }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{title}</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: valueColor }}>{value}</Typography>
    </CardContent>
  </Card>
);

const ActionCard = ({ primary, icon, highlighted = false, onClick }) => (
  <Card onClick={onClick} sx={{ borderRadius: 3, bgcolor: highlighted ? '#1976d2' : 'background.paper', cursor: 'pointer' }}>
    <CardContent sx={{ textAlign: 'center', py: 3 }}>
      <Box sx={{
        width: 48, height: 48, borderRadius: '50%', mx: 'auto', mb: 1.5,
        bgcolor: highlighted ? 'rgba(255,255,255,0.2)' : 'action.hover',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Typography sx={{ color: highlighted ? 'common.white' : 'text.primary', fontWeight: 500 }}>{primary}</Typography>
    </CardContent>
  </Card>
);

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pending, setPending] = useState([]);
  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); } catch { return null; }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' && currentUser?.company) {
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      const company = companies.find(c => c.name.toLowerCase() === String(currentUser.company).toLowerCase());
      setPending(company?.pending || []);
    }
  }, [currentUser]);

  const approveUser = (email) => {
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    const company = companies.find(c => c.name.toLowerCase() === String(currentUser.company).toLowerCase());
    if (!company) return;
    company.pending = (company.pending || []).filter(p => p.email !== email);
    company.users = company.users || [];
    const role = 'manager';
    company.users.push({ email, role, approved: true });
    localStorage.setItem('companies', JSON.stringify(companies));
    setPending(company.pending);
  };

  const denyUser = (email) => {
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    const company = companies.find(c => c.name.toLowerCase() === String(currentUser.company).toLowerCase());
    if (!company) return;
    company.pending = (company.pending || []).filter(p => p.email !== email);
    localStorage.setItem('companies', JSON.stringify(companies));
    setPending(company.pending);
  };

  const role = currentUser?.role || 'admin';

  const navValue = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith('/dashboard/scan-product')) return 'scan';
    if (path.startsWith('/dashboard/inventory') || path.startsWith('/dashboard/product')) return 'products';
    if (path.startsWith('/dashboard/sales')) return 'sales';
    return 'home';
  }, [location.pathname]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ typography: { xs: 'h6', sm: 'h5' }, fontWeight: 800 }}>Dashboard</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip icon={<CloudDone sx={{ color: 'success.main !important' }} />} label="Synced" size="small" sx={{ bgcolor: 'success.light', color: 'success.main' }} />
        </Box>
      </Box>

      {/* Welcome + Role */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 800 }}>Welcome Back!</Typography>
          <Typography variant="body2" color="text.secondary">{role === 'admin' ? "Here's your inventory snapshot." : 'Inventory Overview.'}</Typography>
        </Box>
        <Chip label={role === 'admin' ? 'Owner' : role === 'manager' ? 'Manager' : 'Sales Clerk'} color={role === 'admin' ? 'warning' : role === 'manager' ? 'secondary' : 'default'} sx={{ fontWeight: 600 }} />
      </Box>

      {/* Metrics */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <MetricCard title="Total Stock" value="1,250" />
        </Grid>
        <Grid item xs={6}>
          {role === 'admin' ? (
            <MetricCard title="Total Value" value={"₦500,000"} />
          ) : (
            <MetricCard title="Low Stock" value={"25"} valueColor="error.main" />
          )}
        </Grid>
      </Grid>

      {/* Alerts / Sales Cards */}
      {role === 'admin' && (
        <Card onClick={() => navigate('/dashboard/inventory')} sx={{ borderRadius: 3, bgcolor: 'error.light', color: 'error.dark', mb: 2, cursor: 'pointer' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'error.main', color: 'common.white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Warning />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>Low Stock Alert</Typography>
                <Typography variant="body2">25 items are running low</Typography>
              </Box>
            </Box>
            <ChevronRight />
          </CardContent>
        </Card>
      )}

      <Card onClick={() => navigate('/dashboard/sales/0')} sx={{ borderRadius: 3, mb: 2, cursor: 'pointer' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'action.hover', color: 'text.primary', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AttachMoney />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>Total Sales Today</Typography>
              <Typography variant="body2" color="text.secondary">250 sales • ₦75,300</Typography>
            </Box>
          </Box>
          <ChevronRight />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Quick Actions</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <ActionCard primary="Add Stock" icon={<AddCircleOutline color="primary" />} onClick={() => navigate('/dashboard/add-product')} />
        </Grid>
        <Grid item xs={6}>
          <ActionCard primary="Sell" icon={<ArrowCircleRight sx={{ color: 'common.white' }} />} highlighted onClick={() => navigate('/dashboard/sales/0')} />
        </Grid>
        {(role === 'admin' || role === 'manager') && (
          <>
            <Grid item xs={6}>
              <ActionCard primary="Update Price" icon={<PriceChange color="primary" />} onClick={() => navigate('/dashboard/product/0')} />
            </Grid>
            <Grid item xs={6}>
              <ActionCard primary="Report" icon={<InsertChart color="primary" />} onClick={() => navigate('/dashboard/reports')} />
            </Grid>
          </>
        )}
      </Grid>

      {/* Admin Approvals section retained but moved below actions */}
      {role === 'admin' && (
        <Paper sx={{ p: 2, borderRadius: 3, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Pending Team Approvals</Typography>
          {pending.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No pending requests.</Typography>
          ) : (
            pending.map((p) => (
              <Box key={p.email} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{p.email}</Typography>
                  <Typography variant="body2" color="text.secondary">Requested role: {p.role}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="contained" onClick={() => approveUser(p.email)}>Approve</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => denyUser(p.email)}>Deny</Button>
                </Box>
              </Box>
            ))
          )}
        </Paper>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0, borderRadius: 3 }} elevation={1}>
        <BottomNavigation showLabels value={navValue} onChange={(_, value) => {
          if (value === 'home') navigate('/dashboard');
          if (value === 'scan') navigate('/dashboard/scan-product/0');
          if (value === 'products') navigate('/dashboard/inventory');
          if (value === 'sales') navigate('/dashboard/sales/0');
        }}>
          <BottomNavigationAction value="home" label="Home" icon={<Home />} />
          <BottomNavigationAction value="scan" label="Scan" icon={<QrCodeScanner />} />
          <BottomNavigationAction value="products" label="Products" icon={<Storefront />} />
          <BottomNavigationAction value="sales" label="Sales" icon={<ShowChart />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Dashboard; 