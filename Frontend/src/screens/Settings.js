import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications,
  Security,
  Language,
  Palette,
  Storage,
  Backup,
} from '@mui/icons-material';

function Settings() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Notifications"
              secondary="Configure email and push notifications"
            />
          </ListItem>
          
          <Divider />
          
          <ListItem button>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText
              primary="Security"
              secondary="Password, 2FA, and privacy settings"
            />
          </ListItem>
          
          <Divider />
          
          <ListItem button>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary="Language & Region"
              secondary="Set language and regional preferences"
            />
          </ListItem>
          
          <Divider />
          
          <ListItem button>
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText
              primary="Appearance"
              secondary="Theme, colors, and display settings"
            />
          </ListItem>
          
          <Divider />
          
          <ListItem button>
            <ListItemIcon>
              <Storage />
            </ListItemIcon>
            <ListItemText
              primary="Data Management"
              secondary="Import, export, and data settings"
            />
          </ListItem>
          
          <Divider />
          
          <ListItem button>
            <ListItemIcon>
              <Backup />
            </ListItemIcon>
            <ListItemText
              primary="Backup & Sync"
              secondary="Configure automatic backups and synchronization"
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default Settings; 