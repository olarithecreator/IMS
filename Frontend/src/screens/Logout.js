import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  AlertTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Logout as LogoutIcon,
  CheckCircle,
  Warning,
  Info,
  Security,
  Timer,
  ExitToApp,
  Cancel,
  Refresh
} from '@mui/icons-material';

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(false);
  const [logoutError, setLogoutError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  // Mock user session data
  const userSession = {
    username: 'john.smith@company.com',
    lastLogin: '2 hours ago',
    activeTime: '1 hour 45 minutes',
    openTabs: 3,
    unsavedChanges: false
  };

  // Mock active sessions
  const activeSessions = [
    {
      id: 1,
      device: 'Chrome - Windows 10',
      location: 'New York, NY',
      lastActivity: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari - iPhone 12',
      location: 'New York, NY',
      lastActivity: '15 minutes ago',
      current: false
    }
  ];

  useEffect(() => {
    if (logoutComplete && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (logoutComplete && countdown === 0) {
      navigate('/');
    }
  }, [logoutComplete, countdown, navigate]);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = async () => {
    setShowConfirmation(false);
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      // Simulate logout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate potential error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Network error during logout');
      }

      setIsLoggingOut(false);
      setLogoutComplete(true);
      
      // Clear any stored session data here
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      
    } catch (error) {
      setIsLoggingOut(false);
      setLogoutError(error.message);
    }
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleContinueSession = () => {
    navigate('/dashboard');
  };

  const handleForceLogout = async () => {
    setLogoutError(null);
    setIsLoggingOut(true);
    
    try {
      // Simulate force logout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoggingOut(false);
      setLogoutComplete(true);
      
      // Clear session data
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      
    } catch (error) {
      setIsLoggingOut(false);
      setLogoutError(error.message);
    }
  };

  if (logoutComplete) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        p: 3,
        textAlign: 'center'
      }}>
        <Card sx={{ maxWidth: 500, width: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <CheckCircle color="success" sx={{ fontSize: 64 }} />
            </Box>
            
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Logout Successful
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You have been successfully logged out of your account. All active sessions have been terminated.
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle>Redirecting...</AlertTitle>
              You will be redirected to the login page in {countdown} seconds.
            </Alert>
            
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/')}
            >
              Go to Login Now
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Logout
      </Typography>

      {/* Session Summary */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Current Session Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Username:</strong> {userSession.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Last Login:</strong> {userSession.lastLogin}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Active Time:</strong> {userSession.activeTime}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Open Tabs:</strong> {userSession.openTabs}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Unsaved Changes:</strong> {userSession.unsavedChanges ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Active Sessions */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Active Sessions
        </Typography>
        <List>
          {activeSessions.map((session) => (
            <ListItem key={session.id}>
              <ListItemIcon>
                {session.current ? (
                  <CheckCircle color="primary" />
                ) : (
                  <Info color="action" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={session.device}
                secondary={`${session.location} • Last activity: ${session.lastActivity}`}
              />
              {session.current && (
                <Typography variant="caption" color="primary">
                  Current Session
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Logout Options */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LogoutIcon color="primary" />
                <Typography variant="h6">
                  Logout Current Session
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This will log you out of your current session and redirect you to the login page.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ExitToApp />}
                onClick={handleLogoutClick}
              >
                Logout Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Security color="warning" />
                <Typography variant="h6">
                  Continue Session
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Return to your dashboard and continue working. Your session will remain active.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<Refresh />}
                onClick={handleContinueSession}
              >
                Continue Working
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Error Display */}
      {logoutError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          <AlertTitle>Logout Error</AlertTitle>
          {logoutError}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleForceLogout}
            >
              Force Logout
            </Button>
          </Box>
        </Alert>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={showConfirmation} onClose={handleCancelLogout} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning color="warning" />
            Confirm Logout
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to logout? This will:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Timer fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="End your current session" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Clear any unsaved changes" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Redirect you to the login page" />
            </ListItem>
          </List>
          
          {userSession.unsavedChanges && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <strong>Warning:</strong> You have unsaved changes that will be lost.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmLogout} 
            variant="contained" 
            color="primary"
                            startIcon={<LogoutIcon />}
          >
            Confirm Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logging Out Progress */}
      <Dialog open={isLoggingOut} maxWidth="sm" fullWidth>
        <DialogTitle>Logging Out...</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
            <CircularProgress size={24} />
            <Typography>
              Please wait while we securely log you out...
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Logout;


