import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import { getNotifications } from '../utils/localStorage';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationData = getNotifications();
    setNotifications(notificationData);
  }, []);

  const groupedNotifications = notifications.reduce((groups, notification) => {
    const group = groups[notification.date] || [];
    group.push(notification);
    groups[notification.date] = group;
    return groups;
  }, {});

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {Object.entries(groupedNotifications).map(([date, notificationGroup]) => (
        <Box key={date} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {date}
          </Typography>
          
          {notificationGroup.map((notification, index) => (
            <Paper key={notification.id} sx={{ mb: 1, borderRadius: 2, position: 'relative' }}>
              <ListItem sx={{ py: 2 }}>
                <Avatar sx={{ mr: 2, fontSize: '1.5rem', bgcolor: 'transparent' }}>
                  {notification.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {notification.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
                {notification.id === 1 && (
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    bgcolor: 'primary.main', 
                    borderRadius: '50%',
                    position: 'absolute',
                    right: 16,
                    top: 16,
                  }} />
                )}
              </ListItem>
            </Paper>
          ))}
        </Box>
      ))}
      
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
          View older notifications
        </Typography>
      </Box>
    </Container>
  );
}

export default Notifications;