import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning,
  Info,
  CheckCircle,
  Error,
} from '@mui/icons-material';

function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'iPhone 13 Pro is running low on stock (5 units remaining)',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Order Received',
      message: 'Order #1234 has been placed by customer John Smith',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'Product Updated',
      message: 'MacBook Pro stock has been updated successfully',
      time: '10 minutes ago',
      read: true,
    },
    {
      id: 4,
      type: 'error',
      title: 'System Error',
      message: 'Failed to sync inventory data with server',
      time: '1 hour ago',
      read: true,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <Warning color="warning" />;
      case 'info':
        return <Info color="info" />;
      case 'success':
        return <CheckCircle color="success" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <NotificationsIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Notifications
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                backgroundColor: notification.read ? 'transparent' : 'action.hover',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <ListItemIcon>
                {getIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {notification.title}
                    {!notification.read && (
                      <Chip label="New" size="small" color="primary" />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Notifications; 