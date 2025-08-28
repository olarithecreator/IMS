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
} from '@mui/material';
import {
  BusinessCenter,
  SupervisorAccount,
  Person,
  ArrowBack,
} from '@mui/icons-material';

function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'owner',
      title: 'Business Owner',
      description: 'Create and manage your business, stores, and staff',
      icon: <BusinessCenter sx={{ fontSize: 40 }} />,
      color: '#ff9800',
      route: '/register/owner'
    },
    {
      id: 'manager',
      title: 'Manager',
      description: 'Join an existing business as a manager',
      icon: <SupervisorAccount sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      route: '/register/manager'
    },
    {
      id: 'staff',
      title: 'Staff/Sales Clerk',
      description: 'Join an existing business as staff member',
      icon: <Person sx={{ fontSize: 40 }} />,
      color: '#757575',
      route: '/register/staff'
    }
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Choose Your Role
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select how you'll be using the inventory management system
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} key={role.id}>
            <Card 
              sx={{ 
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              <CardActionArea onClick={() => navigate(role.route)}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: role.color,
                        width: 60,
                        height: 60,
                        mr: 3,
                      }}
                    >
                      {role.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {role.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {role.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Typography 
            component="span" 
            color="primary" 
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/login')}
          >
            Sign In
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
}

export default RoleSelection;