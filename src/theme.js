import { createTheme } from '@mui/material/styles';

const primaryBlue = '#1E63FF'; // Brand-like blue from the mockups
const greyBg = '#F3F5F8'; // Light app background seen outside cards

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: primaryBlue },
    secondary: { main: '#7B61FF' },
    success: { main: '#2BB673' },
    warning: { main: '#FFA726' },
    error: { main: '#E53935' },
    background: {
      default: greyBg,
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \n  \"Apple Color Emoji\", \"Segoe UI Emoji\"',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: greyBg,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          backgroundColor: '#FFFFFF',
          color: '#111827',
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 1 },
      styleOverrides: {
        rounded: { borderRadius: 16 },
        root: { borderRadius: 16 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)' } },
    },
    MuiButton: {
      defaultProps: { size: 'medium', variant: 'contained' },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
        },
        containedPrimary: {
          boxShadow: '0 6px 12px rgba(30, 99, 255, 0.2)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
        },
        input: { paddingTop: 14, paddingBottom: 14 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 10, fontWeight: 600 } },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          border: '1px solid rgba(0,0,0,0.06)',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': { color: primaryBlue },
        },
        label: { fontSize: 12, fontWeight: 600 },
      },
    },
  },
});

export default theme;


