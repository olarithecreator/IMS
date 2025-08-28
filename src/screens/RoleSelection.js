import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
} from '@mui/material';
import {
  BusinessCenter,
  SupervisorAccount,
  Person,
  ArrowBack,
  CheckCircle,
  Schedule,
  Group,
} from '@mui/icons-material';

function RoleSelection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const roles = [
    {
      id: 'owner',
      title: 'Business Owner',
      description: 'Create and manage your business, stores, and staff',
      features: ['Full access', 'Manage stores', 'Add staff', 'View reports'],
      icon: <BusinessCenter sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      color: 'warning',
      route: '/register/owner',
      badge: 'Instant',
      badgeColor: 'success',
    },
    {
      id: 'manager',
      title: 'Manager',
      description: 'Join an existing business as a manager',
      features: ['Inventory access', 'Sales reports', 'Staff oversight', 'Store management'],
      icon: <SupervisorAccount sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      color: 'secondary',
      route: '/register/manager',
      badge: 'Approval required',
      badgeColor: 'warning',
    },
    {
      id: 'staff',
      title: 'Staff/Sales Clerk',
      description: 'Join an existing business as staff member',
      features: ['Sales transactions', 'Product scanning', 'Basic inventory', 'Customer service'],
      icon: <Person sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      color: 'info',
      route: '/register/staff',
      badge: 'PIN required',
      badgeColor: 'info',
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        backgroundImage: !isMobile ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
        {/* Header */}
        <Paper
          elevation={isMobile ? 0 : 8}
          sx={{
            borderRadius: { xs: 0, sm: 4 },
            p: { xs: 3, sm: 4, md: 6 },
            bgcolor: 'background.paper',
          }}
        >
          {/* Title Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <BusinessCenter 
              sx={{ 
                fontSize: { xs: 48, sm: 64 }, 
                color: 'primary.main', 
                mb: 2 
              }} 
            />
            <Typography 
              variant={isMobile ? 'h4' : 'h3'} 
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Choose Your Role
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Select how you'll be using the inventory management system. Each role has different permissions and features.
            </Typography>
          </Box>

          {/* Role Cards */}
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {roles.map((role) => (
              <Grid item xs={12} md={4} key={role.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[12],
                      borderColor: `${role.color}.200`,
                    }
                  }}
                >
                  {/* Badge */}
                  <Chip
                    label={role.badge}
                    color={role.badgeColor}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: 16,
                      zIndex: 1,
                      fontWeight: 600,
                    }}
                  />
                  
                  <CardActionArea 
                    onClick={() => navigate(role.route)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${role.color}.100`,
                            color: `${role.color}.600`,
                            width: { xs: 60, sm: 80 },
                            height: { xs: 60, sm: 80 },
                            mx: 'auto',
                            mb: 2,
                          }}
                        >
                          {role.icon}
                        </Avatar>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 'bold', 
                            mb: 1,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                          }}
                        >
                          {role.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ lineHeight: 1.5 }}
                        >
                          {role.description}
                        </Typography>
                      </Box>

                      {/* Features List */}
                      <Stack spacing={1}>
                        {role.features.map((feature, index) => (
                          <Box 
                            key={index}
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              fontSize: '0.875rem'
                            }}
                          >
                            <CheckCircle 
                              sx={{ 
                                fontSize: 16, 
                                mr: 1, 
                                color: `${role.color}.500` 
                              }} 
                            />
                            <Typography variant="body2">
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: { xs: 3, sm: 4 } }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Already have an account?
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              alignItems="center"
            >
              <Typography 
                component="span" 
                color="primary" 
                sx={{ 
                  cursor: 'pointer', 
                  textDecoration: 'underline',
                  fontWeight: 600,
                  '&:hover': { color: 'primary.dark' }
                }}
                onClick={() => navigate('/login')}
              >
                Regular Sign In
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                •
              </Typography>
              <Typography 
                component="span" 
                color="secondary" 
                sx={{ 
                  cursor: 'pointer', 
                  textDecoration: 'underline',
                  fontWeight: 600,
                  '&:hover': { color: 'secondary.dark' }
                }}
                onClick={() => navigate('/staff-login')}
              >
                Staff Login
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RoleSelection;