import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, ButtonGroup, Button, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';
import { Assessment, TrendingUp, Inventory, ShoppingCart } from '@mui/icons-material';

function MetricCard({ label, value, color }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color }}>{value}</Typography>
      </CardContent>
    </Card>
  );
}

function Reports() {
  return (
    <Box>
      <Typography sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 800 }} gutterBottom>
        Reports
      </Typography>

      {/* Timeframe filter */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <ButtonGroup variant="outlined" size="small">
          <Button>Daily</Button>
          <Button variant="contained">Weekly</Button>
          <Button>Monthly</Button>
          <Button>Yearly</Button>
        </ButtonGroup>
      </Box>

      {/* Summary metrics */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6} md={3}><MetricCard label="Sales Week 2" value="₦82,450" color="primary.main" /></Grid>
        <Grid item xs={6} md={3}><MetricCard label="Top Seller (Week 2)" value="Organic Apples" color="success.main" /></Grid>
        <Grid item xs={6} md={3}><MetricCard label="Gross Profit (Week 2)" value="₦18,230" color="secondary.main" /></Grid>
        <Grid item xs={6} md={3}><MetricCard label="Credit Outstanding" value="₦12,000" color="warning.main" /></Grid>
      </Grid>

      {/* Trend + Current Inventory */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 260 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Sales Trend</Typography>
            <Box sx={{ height: 200, bgcolor: 'grey.100', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 260 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Current Inventory</Typography>
            <List dense>
              <ListItem secondaryAction={<Chip label="1250" size="small" color="success" />}>
                <ListItemText primary="In Stock" />
              </ListItem>
              <ListItem secondaryAction={<Chip label="200" size="small" color="warning" />}>
                <ListItemText primary="Low Stock" />
              </ListItem>
              <ListItem secondaryAction={<Chip label="50" size="small" color="error" />}>
                <ListItemText primary="Out of Stock" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Top Sellers + Inventory Health */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Top Sellers</Typography>
            <List dense>
              {['Organic Apples', 'Whole Milk', 'Coca-cola'].map((name, i) => (
                <React.Fragment key={name}>
                  <ListItem secondaryAction={<Chip label={`${120 - i*15} units`} size="small" />}>
                    <ListItemText primary={name} />
                  </ListItem>
                  {i < 2 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Inventory Health</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><Card><CardContent><Typography variant="h6">3 items</Typography><Typography variant="body2" color="text.secondary">Expiring Soon</Typography></CardContent></Card></Grid>
              <Grid item xs={6}><Card><CardContent><Typography variant="h6">₦1,850</Typography><Typography variant="body2" color="text.secondary">Damage / Returns</Typography></CardContent></Card></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports;