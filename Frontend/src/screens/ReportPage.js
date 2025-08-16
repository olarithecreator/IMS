import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Download,
  Print,
  Share,
  Refresh,
  TrendingUp,
  TrendingDown,
  Assessment,
  BarChart,
  PieChart,
  Timeline,
  FilterList,
  DateRange,
  Visibility,
  GetApp
} from '@mui/icons-material';

const ReportPage = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(parseInt(step) || 25);
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('last30days');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const steps = [
    { label: 'Report Selection', value: 25 },
    { label: 'Report Generation', value: 24.1 }
  ];

  // Mock report types
  const reportTypes = [
    {
      id: 'sales',
      name: 'Sales Report',
      description: 'Comprehensive sales analysis and performance metrics',
      icon: <TrendingUp color="success" />,
      color: 'success',
      metrics: ['Total Sales', 'Units Sold', 'Average Order Value', 'Growth Rate']
    },
    {
      id: 'inventory',
      name: 'Inventory Report',
      description: 'Stock levels, turnover rates, and inventory valuation',
      icon: <Assessment color="primary" />,
      color: 'primary',
      metrics: ['Stock Levels', 'Turnover Rate', 'Valuation', 'Low Stock Items']
    },
    {
      id: 'customer',
      name: 'Customer Report',
      description: 'Customer behavior, demographics, and loyalty metrics',
      icon: <BarChart color="info" />,
      color: 'info',
      metrics: ['Customer Count', 'Retention Rate', 'Lifetime Value', 'Satisfaction']
    },
    {
      id: 'financial',
      name: 'Financial Report',
      description: 'Revenue, costs, profit margins, and financial performance',
      icon: <PieChart color="warning" />,
      color: 'warning',
      metrics: ['Revenue', 'Costs', 'Profit Margin', 'Cash Flow']
    }
  ];

  // Mock date range options
  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // Mock store data
  const stores = [
    { id: 1, name: 'Main Store', location: 'Downtown' },
    { id: 2, name: 'Outlet Store', location: 'Suburbia' },
    { id: 3, name: 'Pop-up Store', location: 'Seasonal Market' }
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextStep = Math.min(activeStep + 0.1, 24.1);
      setActiveStep(nextStep);
      navigate(`/dashboard/reports/${nextStep}`);
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(activeStep - 0.1, 25);
    setActiveStep(prevStep);
    navigate(`/dashboard/reports/${prevStep}`);
  };

  const handleStepClick = (stepValue) => {
    setActiveStep(stepValue);
    navigate(`/dashboard/reports/${stepValue}`);
  };

  const validateCurrentStep = () => {
    if (activeStep === 25) {
      if (!reportType) {
        alert('Please select a report type');
        return false;
      }
    }
    return true;
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock report data
    const mockData = {
      type: reportType,
      dateRange: dateRange,
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalSales: '$125,450',
        totalOrders: 1247,
        averageOrderValue: '$100.76',
        growthRate: '+12.5%'
      },
      details: [
        { date: '2024-01-01', sales: '$4,250', orders: 42, avgOrder: '$101.19' },
        { date: '2024-01-02', sales: '$3,890', orders: 38, avgOrder: '$102.37' },
        { date: '2024-01-03', sales: '$4,120', orders: 41, avgOrder: '$100.49' }
      ]
    };
    
    setReportData(mockData);
    setIsGenerating(false);
  };

  const handleExportReport = (format) => {
    setDialogType('export');
    setOpenDialog(true);
  };

  const renderReportSelection = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Select Report Type
      </Typography>
      
      {/* Report Type Selection */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportTypes.map((report) => (
          <Grid item xs={12} md={6} lg={3} key={report.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: reportType === report.id ? 2 : 1,
                borderColor: reportType === report.id ? `${report.color}.main` : 'divider',
                '&:hover': { boxShadow: 4 }
              }}
              onClick={() => setReportType(report.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {report.icon}
                  <Typography variant="h6" component="h3">
                    {report.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {report.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Key Metrics:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {report.metrics.map((metric) => (
                      <Chip
                        key={metric}
                        label={metric}
                        size="small"
                        variant="outlined"
                        color={report.color}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Date Range Selection */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Date Range
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={(e) => setDateRange(e.target.value)}
            >
              {dateRangeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {dateRange === 'custom' && (
          <>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Store Selection */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Store Selection
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stores.map((store) => (
          <Grid item key={store.id}>
            <Chip
              label={`${store.name} (${store.location})`}
              variant={selectedStores.includes(store.id) ? "filled" : "outlined"}
              color={selectedStores.includes(store.id) ? "primary" : "default"}
              onClick={() => {
                if (selectedStores.includes(store.id)) {
                  setSelectedStores(selectedStores.filter(id => id !== store.id));
                } else {
                  setSelectedStores([...selectedStores, store.id]);
                }
              }}
              sx={{ cursor: 'pointer' }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Additional Options */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Additional Options
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Data Granularity</InputLabel>
              <Select label="Data Granularity" defaultValue="daily">
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Export Format</InputLabel>
              <Select label="Export Format" defaultValue="pdf">
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="json">JSON</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

  const renderReportGeneration = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Generate Report
      </Typography>

      {!reportData ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {reportTypes.find(r => r.id === reportType)?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Click the button below to generate your report with the selected parameters.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<Assessment />}
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating Report...' : 'Generate Report'}
          </Button>
          
          {isGenerating && (
            <Box sx={{ mt: 3 }}>
              <LinearProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Processing data and generating report...
              </Typography>
            </Box>
          )}
        </Paper>
      ) : (
        <Box>
          {/* Report Summary */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Report Summary
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => handleExportReport('pdf')}
                >
                  Export PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => handleExportReport('excel')}
                >
                  Export Excel
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                >
                  Share
                </Button>
              </Box>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" color="primary">
                      {reportData.summary.totalSales}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Sales
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" color="success">
                      {reportData.summary.totalOrders}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Orders
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" color="info">
                      {reportData.summary.averageOrderValue}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Order Value
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" color="warning">
                      {reportData.summary.growthRate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Growth Rate
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* Detailed Data */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Detailed Data
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Sales</TableCell>
                    <TableCell align="right">Orders</TableCell>
                    <TableCell align="right">Avg Order</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.details.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="right">{row.sales}</TableCell>
                      <TableCell align="right">{row.orders}</TableCell>
                      <TableCell align="right">{row.avgOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );

  const renderContent = () => {
    if (activeStep === 25) return renderReportSelection();
    if (activeStep === 24.1) return renderReportGeneration();
    return renderReportSelection();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Stepper */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stepper activeStep={steps.findIndex(step => step.value === activeStep)}>
          {steps.map((stepItem) => (
            <Step key={stepItem.value}>
              <StepLabel
                onClick={() => handleStepClick(stepItem.value)}
                sx={{ cursor: 'pointer' }}
              >
                {stepItem.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      {renderContent()}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={activeStep === 25}
        >
          Back
        </Button>
        {activeStep < 24.1 && (
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </Box>

      {/* Dialogs */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'export' && 'Export Report'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'export' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Your report is being prepared for export. This may take a few moments.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">
            {dialogType === 'export' ? 'Download' : 'Continue'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportPage;


