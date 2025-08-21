import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Chip, Divider, Link as MuiLink } from '@mui/material';
import { Notifications as NotificationsIcon, Warning, Info, CheckCircle, Error } from '@mui/icons-material';

function Notifications() {
  const sections = [
    {
      title: 'Today',
      items: [
        { id: 1, type: 'warning', title: 'Low Stock Alert', message: "'Organic Apples' fell below your threshold (10)", time: '10:30 AM', read: false },
      ],
    },
    {
      title: 'Yesterday',
      items: [
        { id: 2, type: 'info', title: 'Refund Processed', message: '₦1,200 refunded for Order #1234', time: '01:15 PM', read: true },
        { id: 3, type: 'warning', title: 'Expiry Warning', message: "'Fresh Milk' expires in 2 days", time: 'Jul 22', read: true },
        { id: 4, type: 'info', title: 'Sync Status', message: 'Last sync at 2:00 PM', time: 'Jul 22', read: true },
      ],
    },
    {
      title: 'Earlier',
      items: [
        { id: 5, type: 'error', title: 'Damaged Item Reported', message: '3 Bottles reported damaged', time: 'Jul 9', read: true },
        { id: 6, type: 'info', title: 'System Update', message: 'Version 2.5 available to download', time: 'Jul 3', read: true },
      ],
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <Warning color="warning" />;
      case 'info': return <Info color="info" />;
      case 'success': return <CheckCircle color="success" />;
      case 'error': return <Error color="error" />;
      default: return <NotificationsIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Notifications
      </Typography>
      {sections.map((section) => (
        <Paper key={section.title} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>{section.title}</Typography>
          <List>
            {section.items.map((n, idx) => (
              <React.Fragment key={n.id}>
                <ListItem sx={{ backgroundColor: n.read ? 'transparent' : 'action.hover', borderRadius: 1 }}>
                  <ListItemIcon>{getIcon(n.type)}</ListItemIcon>
                  <ListItemText
                    primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{n.title}{!n.read && <Chip label="New" size="small" color="primary" />}</Box>}
                    secondary={<Box><Typography variant="body2" color="text.secondary">{n.message}</Typography><Typography variant="caption" color="text.secondary">{n.time}</Typography></Box>}
                  />
                </ListItem>
                {idx < section.items.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
          </List>
          {section.title === 'Earlier' && (
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <MuiLink component="button" variant="body2">View older notifications</MuiLink>
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
}

export default Notifications;