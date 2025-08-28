import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

function AdaptiveLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use the original MobileLayout for mobile devices
  // Use the new DesktopLayout for desktop/tablet
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

export default AdaptiveLayout;