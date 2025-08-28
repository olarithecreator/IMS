import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ResponsiveDashboard from '../screens/ResponsiveDashboard';
import DesktopDashboard from '../screens/DesktopDashboard';

function DashboardSwitch() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use ResponsiveDashboard for mobile, DesktopDashboard for desktop
  return isMobile ? <ResponsiveDashboard /> : <DesktopDashboard />;
}

export default DashboardSwitch;