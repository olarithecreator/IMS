import React, { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Inventory,
  ShoppingCart,
  People,
  Warning,
  CheckCircle,
  Error,
  Add,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const pieData = [
  { name: 'Electronics', value: 400, color: '#8884d8' },
  { name: 'Clothing', value: 300, color: '#82ca9d' },
  { name: 'Books', value: 200, color: '#ffc658' },
  { name: 'Others', value: 100, color: '#ff7300' },
];

const recentActivities = [
  { id: 1, action: 'Product added', item: 'iPhone 13', time: '2 minutes ago', type: 'success' },
  { id: 2, action: 'Order placed', item: 'Order #1234', time: '5 minutes ago', type: 'info' },
  { id: 3, action: 'Low stock alert', item: 'Samsung TV', time: '10 minutes ago', type: 'warning' },
  { id: 4, action: 'Product updated', item: 'MacBook Pro', time: '15 minutes ago', type: 'success' },
  { id: 5, action: 'Supplier added', item: 'TechCorp Inc', time: '1 hour ago', type: 'info' },
];

const StatCard = ({ title, value, change, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {change > 0 ? (
              <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
            )}
            <Typography
              variant="body2"
              color={change > 0 ? 'success.main' : 'error.main'}
              sx={{ ml: 0.5 }}
            >
              {Math.abs(change)}% from last month
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

function Dashboard() {
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">Dashboard</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={role === 'admin' ? '7.0 • Admin' : role === 'manager' ? '7.1 • Manager' : '7.2 • Staff'}
            color={role === 'admin' ? 'primary' : role === 'manager' ? 'secondary' : 'default'}
            variant="outlined"
          />
          <Button variant="contained" startIcon={<Add />}>
            Add Product
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Statistics Cards - vary by role */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value="1,234"
            change={12}
            icon={<Inventory sx={{ color: 'white' }} />}
            color="#1976d2"
          />
        </Grid>
        {role !== 'staff' && (
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="567"
            change={-5}
            icon={<ShoppingCart sx={{ color: 'white' }} />}
            color="#2e7d32"
          />
        </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Suppliers"
            value="89"
            change={8}
            icon={<People sx={{ color: 'white' }} />}
            color="#ed6c02"
          />
        </Grid>
        {role === 'admin' && (
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock Items"
            value="23"
            change={-15}
            icon={<Warning sx={{ color: 'white' }} />}
            color="#d32f2f"
          />
        </Grid>
        )}

        {/* Charts: show sales overview for admin/manager; staff sees only bar chart */}
        <Grid item xs={12} md={role === 'staff' ? 12 : 8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {role !== 'staff' && (
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Category Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        )}

        {/* Recent Activity */}
        <Grid item xs={12} md={role === 'staff' ? 12 : 6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id} divider>
                  <ListItemIcon>
                    {activity.type === 'success' && <CheckCircle color="success" />}
                    {activity.type === 'warning' && <Warning color="warning" />}
                    {activity.type === 'info' && <ShoppingCart color="info" />}
                    {activity.type === 'error' && <Error color="error" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={`${activity.item} • ${activity.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions - scope by role */}
        <Grid item xs={12} md={role === 'staff' ? 12 : 6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {(role === 'admin' || role === 'manager') && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Add />}
                  sx={{ height: 56 }}
                >
                  Add Product
                </Button>
              </Grid>
              )}
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ShoppingCart />}
                  sx={{ height: 56 }}
                >
                  Create Order
                </Button>
              </Grid>
              {(role === 'admin' || role === 'manager') && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<People />}
                  sx={{ height: 56 }}
                >
                  Add Supplier
                </Button>
              </Grid>
              )}
              {role !== 'staff' && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Inventory />}
                  sx={{ height: 56 }}
                >
                  View Reports
                </Button>
              </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Admin Approvals */}
        {role === 'admin' && (
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pending Team Approvals
            </Typography>
            {pending.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No pending requests.</Typography>
            ) : (
              <List>
                {pending.map((p) => (
                  <ListItem key={p.email} divider secondaryAction={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="contained" onClick={() => approveUser(p.email)}>Approve</Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => denyUser(p.email)}>Deny</Button>
                    </Box>
                  }>
                    <ListItemText primary={p.email} secondary={`Requested role: ${p.role}`} />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Dashboard; 