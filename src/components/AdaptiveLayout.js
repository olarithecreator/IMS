import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ResponsiveMobileLayout from './ResponsiveMobileLayout';
import DesktopLayout from './DesktopLayout';

function AdaptiveLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use ResponsiveMobileLayout for mobile devices with proper hamburger menu
  // Use DesktopLayout for desktop/tablet
  return isMobile ? <ResponsiveMobileLayout /> : <DesktopLayout />;
}

export default AdaptiveLayout;