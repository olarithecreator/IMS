import { createTheme } from '@mui/material/styles';

// Modern color palette
const colors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  secondary: {
    50: '#fce4ec',
    100: '#f8bbd9',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
  },
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  warning: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
  },
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
    grey: '#f8f9fa',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  }
};

// Global responsive breakpoints (Bootstrap-like)
const breakpoints = {
  values: {
    xs: 0,      // Mobile phones
    sm: 576,    // Large phones / small tablets
    md: 768,    // Tablets
    lg: 992,    // Small desktops
    xl: 1200,   // Medium desktops
    xxl: 1400,  // Large desktops
  },
};

// Modern typography scale
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.0075em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01071em',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase',
  },
};

// Component overrides for modern look
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: '#bdbdbd #f5f5f5',
        '&::-webkit-scrollbar': {
          width: 8,
        },
        '&::-webkit-scrollbar-track': {
          background: '#f5f5f5',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#bdbdbd',
          borderRadius: 4,
          '&:hover': {
            backgroundColor: '#9e9e9e',
          },
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: '10px 24px',
        fontSize: '0.875rem',
        fontWeight: 500,
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
      },
      contained: {
        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        },
      },
      outlined: {
        borderWidth: 1.5,
        '&:hover': {
          borderWidth: 1.5,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        },
        transition: 'box-shadow 0.3s ease-in-out',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      elevation1: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      elevation2: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      elevation3: {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          backgroundColor: '#fafafa',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary[400],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
            borderColor: colors.primary[500],
          },
        },
      },
    },
  },
  MuiBottomNavigation: {
    styleOverrides: {
      root: {
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
        height: 70,
      },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        color: colors.grey[500],
        '&.Mui-selected': {
          color: colors.primary[600],
        },
        '& .MuiBottomNavigationAction-label': {
          fontSize: '0.75rem',
          fontWeight: 500,
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        color: colors.text.primary,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#fafafa',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontSize: '0.75rem',
        fontWeight: 500,
      },
      outlined: {
        borderWidth: 1.5,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        fontSize: '0.875rem',
      },
    },
  },
};

// Spacing system
const spacing = 8;

// Shadows
const shadows = [
  'none',
  '0 2px 8px rgba(0, 0, 0, 0.1)',
  '0 4px 12px rgba(0, 0, 0, 0.15)',
  '0 6px 16px rgba(0, 0, 0, 0.2)',
  '0 8px 24px rgba(0, 0, 0, 0.25)',
  '0 10px 32px rgba(0, 0, 0, 0.3)',
  ...Array(19).fill('0 12px 40px rgba(0, 0, 0, 0.35)'),
];

// Create the theme
const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    grey: colors.grey,
    background: colors.background,
    text: colors.text,
  },
  breakpoints,
  typography,
  components,
  spacing,
  shadows,
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

export default theme;