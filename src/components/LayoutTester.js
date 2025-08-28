import React from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';

function LayoutTester() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Paper sx={{ p: 3, m: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Layout Test
      </Typography>
      <Typography variant="body1" color="primary">
        Current Layout: {isMobile ? 'Mobile' : 'Desktop'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Screen Size: {window.innerWidth}px × {window.innerHeight}px
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Breakpoint: {isMobile ? '< 900px (md)' : '≥ 900px (md+)'}
      </Typography>
    </Paper>
  );
}

export default LayoutTester;