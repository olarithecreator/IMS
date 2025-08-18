import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Divider,
  Alert,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Refresh,
  Delete,
  ContentCopy,
  Search,
  Storage,
  Key,
  Value,
  ClearAll,
} from '@mui/icons-material';

const LocalStorageViewer = () => {
  const [localStorageData, setLocalStorageData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState({});

  const loadLocalStorageData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          const value = localStorage.getItem(key);
          // Try to parse JSON, fallback to raw string
          let parsedValue;
          try {
            parsedValue = JSON.parse(value);
          } catch {
            parsedValue = value;
          }
          data[key] = {
            raw: value,
            parsed: parsedValue,
            type: typeof parsedValue,
            size: new Blob([value]).size,
          };
        } catch (error) {
          data[key] = {
            raw: value,
            parsed: 'Error parsing value',
            type: 'error',
            size: 0,
          };
        }
      }
    }
    setLocalStorageData(data);
    setFilteredData(data);
  };

  useEffect(() => {
    loadLocalStorageData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(localStorageData);
    } else {
      const filtered = {};
      Object.keys(localStorageData).forEach(key => {
        if (
          key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          JSON.stringify(localStorageData[key].parsed).toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          filtered[key] = localStorageData[key];
        }
      });
      setFilteredData(filtered);
    }
  }, [searchTerm, localStorageData]);

  const handleDeleteItem = (key) => {
    localStorage.removeItem(key);
    loadLocalStorageData();
  };

  const handleClearAll = () => {
    localStorage.clear();
    loadLocalStorageData();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatValue = (value, type) => {
    if (type === 'object' || type === 'array') {
      return (
        <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        </Box>
      );
    }
    return (
      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
        {String(value)}
      </Typography>
    );
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'string': return 'primary';
      case 'number': return 'success';
      case 'boolean': return 'warning';
      case 'object': return 'info';
      case 'array': return 'secondary';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Storage sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Local Storage Viewer
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadLocalStorageData}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ClearAll />}
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        This page shows all data currently stored in your browser's localStorage. 
        Use the search to filter items, or click the refresh button to reload data.
      </Alert>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search localStorage keys or values..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip 
            label={`Total Items: ${Object.keys(localStorageData).length}`} 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label={`Filtered: ${Object.keys(filteredData).length}`} 
            color="secondary" 
            variant="outlined" 
          />
          <Chip 
            label={`Total Size: ${formatBytes(Object.values(localStorageData).reduce((sum, item) => sum + item.size, 0))}`} 
            color="info" 
            variant="outlined" 
          />
        </Box>
      </Paper>

      {Object.keys(filteredData).length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'No items match your search' : 'No data in localStorage'}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {Object.entries(filteredData).map(([key, item]) => (
            <Grid item xs={12} key={key}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Key sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="h6" component="h2" sx={{ fontFamily: 'monospace' }}>
                          {key}
                        </Typography>
                        <Chip 
                          label={item.type} 
                          color={getTypeColor(item.type)} 
                          size="small" 
                        />
                        <Chip 
                          label={formatBytes(item.size)} 
                          color="default" 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Value:
                        </Typography>
                        <Box sx={{ 
                          bgcolor: 'grey.50', 
                          p: 2, 
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'grey.200'
                        }}>
                          {formatValue(item.parsed, item.type)}
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Copy value to clipboard">
                          <IconButton 
                            size="small" 
                            onClick={() => copyToClipboard(JSON.stringify(item.parsed, null, 2))}
                          >
                            <ContentCopy />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete this item">
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleDeleteItem(key)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default LocalStorageViewer;
