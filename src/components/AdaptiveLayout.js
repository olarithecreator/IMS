import React from 'react';
import GlobalResponsiveLayout from './GlobalResponsiveLayout';

function AdaptiveLayout() {
  // Use the new GlobalResponsiveLayout that follows global responsive standards
  // Handles mobile (< 768px), tablet (768px-992px), and desktop (>= 992px)
  return <GlobalResponsiveLayout />;
}

export default AdaptiveLayout;