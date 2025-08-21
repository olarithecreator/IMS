import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, ToggleButton, ToggleButtonGroup, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from '@mui/material';

const mockProducts = [
  { id: 1, name: 'Organic Apples', price: 2500, status: 'low', left: 10, image: 'https://via.placeholder.com/56?text=A' },
  { id: 2, name: 'Whole Wheat Bread', price: 1800, status: 'low', left: 5, image: 'https://via.placeholder.com/56?text=B' },
  { id: 3, name: 'Almond Milk', price: 3200, status: 'low', left: 2, image: 'https://via.placeholder.com/56?text=M' },
  { id: 4, name: 'Cotton T-Shirts', price: 4500, status: 'out', left: 0, image: 'https://via.placeholder.com/56?text=T' },
  { id: 5, name: 'Wireless Headphones', price: 25000, status: 'out', left: 0, image: 'https://via.placeholder.com/56?text=H' },
  { id: 6, name: 'Fresh Milk', price: 1200, status: 'expiring', left: 12, image: 'https://via.placeholder.com/56?text=F' },
];

function Alerts() {
  const [tab, setTab] = useState('low');
  const filtered = useMemo(() => mockProducts.filter(p => (tab === 'low' && p.status === 'low') || (tab === 'out' && p.status === 'out') || (tab === 'expiring' && p.status === 'expiring')), [tab]);

  const statusColor = (p) => p.status === 'low' ? 'warning' : p.status === 'out' ? 'error' : 'info';
  const statusText = (p) => p.status === 'low' ? `${p.left} units left` : p.status === 'out' ? 'Out of Stock' : 'Expiring Soon';

  return (
    <Box>
      <Typography sx={{ typography: { xs: 'h6', sm: 'h4' }, fontWeight: 800, mb: 2 }}>Alerts</Typography>
      <Paper sx={{ p: 1.5, mb: 2 }}>
        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => v && setTab(v)} size="small">
          <ToggleButton value="low">Low Stock</ToggleButton>
          <ToggleButton value="out">Out of Stock</ToggleButton>
          <ToggleButton value="expiring">Expiring Soon</ToggleButton>
        </ToggleButtonGroup>
      </Paper>
      <Paper sx={{ p: 1 }}>
        <List>
          {filtered.map((p) => (
            <ListItem key={p.id}>
              <ListItemAvatar><Avatar src={p.image} alt={p.name} /></ListItemAvatar>
              <ListItemText primary={p.name} secondary={`₦${p.price.toLocaleString()}`} />
              <Chip label={statusText(p)} color={statusColor(p)} variant="outlined" />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Alerts;





