import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ResponsiveScanProduct from '../screens/ResponsiveScanProduct';
import ScanProduct from '../screens/ScanProduct';

function ScanProductSwitch() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use ResponsiveScanProduct for mobile, original ScanProduct for desktop if needed
  return <ResponsiveScanProduct />;
}

export default ScanProductSwitch;