import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Divider,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Person,
  Notifications,
  Security,
  Palette,
  Language,
  Storage,
  Business,
  Edit,
} from '@mui/icons-material';

function Settings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    lowStockThreshold: 10,
    autoReorder: false,
    twoFactor: false,
  });

  const handleSettingChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked !== undefined ? event.target.checked : event.target.value
    }));
  };

  const settingSections = [
    {
      title: 'Profile Settings',
      icon: <Person />,
      color: 'primary',
      items: [
        { label: 'Edit Profile', action: 'edit-profile' },
        { label: 'Change Password', action: 'change-password' },
        { label: 'Two-Factor Authentication', toggle: 'twoFactor' },
      ]
    },
    {
      title: 'Notifications',
      icon: <Notifications />,
      color: 'secondary',
      items: [
        { label: 'Push Notifications', toggle: 'notifications' },
        { label: 'Email Alerts', toggle: 'emailAlerts' },
        { label: 'Low Stock Threshold', input: 'lowStockThreshold', type: 'number' },
      ]
    },
    {
      title: 'Appearance',
      icon: <Palette />,
      color: 'success',
      items: [
        { label: 'Dark Mode', toggle: 'darkMode' },
        { label: 'Language', select: 'language', options: ['English', 'French', 'Spanish'] },
      ]
    },
    {
      title: 'Business Settings',
      icon: <Business />,
      color: 'warning',
      items: [
        { label: 'Auto Reorder', toggle: 'autoReorder' },
        { label: 'Currency', select: 'currency', options: ['NGN', 'USD', 'EUR'] },
        { label: 'Tax Rate', input: 'taxRate', type: 'number' },
      ]
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account preferences and application settings
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {settingSections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: `${section.color}.100`, color: `${section.color}.600`, mr: 2 }}>
                      {section.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {section.title}
                    </Typography>
                  </Box>

                  <Box sx={{ space: 2 }}>
                    {section.items.map((item, itemIndex) => (
                      <Box key={itemIndex} sx={{ mb: 2 }}>
                        {item.toggle && (
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings[item.toggle]}
                                onChange={handleSettingChange(item.toggle)}
                                color={section.color}
                              />
                            }
                            label={item.label}
                            sx={{ width: '100%', justifyContent: 'space-between', ml: 0 }}
                          />
                        )}
                        
                        {item.input && (
                          <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {item.label}
                            </Typography>
                            <TextField
                              type={item.type || 'text'}
                              value={settings[item.input] || ''}
                              onChange={handleSettingChange(item.input)}
                              size="small"
                              fullWidth
                            />
                          </Box>
                        )}
                        
                        {item.action && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">
                              {item.label}
                            </Typography>
                            <IconButton size="small" color={section.color}>
                              <Edit />
                            </IconButton>
                          </Box>
                        )}
                        
                        {itemIndex < section.items.length - 1 && <Divider sx={{ mt: 2 }} />}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Save Button */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
            onClick={() => {
              // Save settings logic
              console.log('Settings saved:', settings);
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;