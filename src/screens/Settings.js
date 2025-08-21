import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Language,
  MonetizationOn,
  DarkMode,
  Email,
  WhatsApp,
  NotificationsActive
} from '@mui/icons-material';

function Settings() {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('NGN');
  const [darkMode, setDarkMode] = useState(false);
  const [lowStock, setLowStock] = useState(50);
  const [notifyApp, setNotifyApp] = useState(false);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(false);

  return (
    <Box>
      <Typography sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 800 }} gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon><Language /></ListItemIcon>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select value={language} label="Language" onChange={(e) => setLanguage(e.target.value)}>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="fr">French</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon><MonetizationOn /></ListItemIcon>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select value={currency} label="Currency" onChange={(e) => setCurrency(e.target.value)}>
                <MenuItem value="NGN">NGN</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon><DarkMode /></ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon><NotificationsIcon /></ListItemIcon>
            <ListItemText primary="Low Stock Threshold" secondary={`Minimum stock level ${lowStock}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon><NotificationsActive /></ListItemIcon>
            <ListItemText primary="App Notifications" secondary="Receive in-app alerts" />
            <Switch checked={notifyApp} onChange={(e) => setNotifyApp(e.target.checked)} />
          </ListItem>
          <ListItem>
            <ListItemIcon><WhatsApp /></ListItemIcon>
            <ListItemText primary="WhatsApp" secondary="Receive alerts via WhatsApp" />
            <Switch checked={notifyWhatsApp} onChange={(e) => setNotifyWhatsApp(e.target.checked)} />
          </ListItem>
          <ListItem>
            <ListItemIcon><Email /></ListItemIcon>
            <ListItemText primary="Email" secondary="Receive alerts via email" />
            <Switch checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default Settings;