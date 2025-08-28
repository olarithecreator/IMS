import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
  Stack,
  useTheme,
} from '@mui/material';
import { Store, Inventory2 } from '@mui/icons-material';

function LoadingScreen({ message = 'Loading...', progress = null, fullScreen = true }) {
  const theme = useTheme();
  
  const containerProps = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.modal + 1,
  } : {
    minHeight: 200,
  };

  return (
    <Box
      sx={{
        ...containerProps,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: fullScreen ? 'background.default' : 'transparent',
        backdropFilter: fullScreen ? 'blur(10px)' : 'none',
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 300, px: 2 }}>
        {/* Animated Logo */}
        <Box sx={{ mb: 4, position: 'relative' }}>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
                '50%': {
                  transform: 'scale(1.1)',
                  opacity: 0.8,
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
              },
            }}
          >
            <Store 
              sx={{ 
                fontSize: 64, 
                color: 'primary.main',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              }} 
            />
          </Box>
          
          {/* Rotating Inventory Icon */}
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              animation: 'rotate 3s linear infinite',
              '@keyframes rotate': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }}
          >
            <Inventory2 
              sx={{ 
                fontSize: 24, 
                color: 'secondary.main',
                bgcolor: 'background.paper',
                borderRadius: '50%',
                p: 0.5,
              }} 
            />
          </Box>
        </Box>

        {/* App Name */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            color: 'primary.main',
          }}
        >
          InventoryPro
        </Typography>

        {/* Loading Spinner or Progress */}
        {progress !== null ? (
          <Stack spacing={2} sx={{ mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                },
              }} 
            />
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}% Complete
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ mb: 2 }}>
            <CircularProgress 
              size={40} 
              thickness={4}
              sx={{
                color: 'primary.main',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': {
                    transform: 'rotate(0deg)',
                  },
                  '100%': {
                    transform: 'rotate(360deg)',
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Loading Message */}
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            animation: 'fadeInOut 2s infinite',
            '@keyframes fadeInOut': {
              '0%': {
                opacity: 0.6,
              },
              '50%': {
                opacity: 1,
              },
              '100%': {
                opacity: 0.6,
              },
            },
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingScreen;