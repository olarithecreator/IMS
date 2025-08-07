import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Info,
  Code,
  Security,
  Speed,
} from '@mui/icons-material';

function About() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        About
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Inventory Management System
        </Typography>
        <Typography variant="body1" paragraph>
          A comprehensive inventory management solution designed to help businesses efficiently manage their products, 
          track stock levels, and streamline their operations.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Version 1.0.0 | Built with React & Material-UI
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Speed sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Performance
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Optimized for speed and efficiency with modern web technologies and responsive design.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Security
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Built with security best practices to protect your data and ensure safe operations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Code sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Technology
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Built with React, Material-UI, and modern JavaScript for a robust and maintainable codebase.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Features
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Comprehensive inventory management with product tracking, supplier management, and detailed reporting.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Development Team
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This application was developed as a modern inventory management solution with a focus on user experience 
          and functionality. The system provides all the essential features needed for effective inventory control.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          © 2024 Inventory Management System. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
}

export default About; 