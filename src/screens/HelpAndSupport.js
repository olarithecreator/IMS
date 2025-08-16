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
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Search,
  Help,
  Support,
  ContactSupport,
  Book,
  VideoLibrary,
  Article,
  Chat,
  Email,
  Phone,
  ExpandMore,
  Send,
  Star,
  StarBorder,
  ThumbUp,
  ThumbDown
} from '@mui/icons-material';

const HelpAndSupport = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(parseInt(step) || 16);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data for help categories
  const helpCategories = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Learn the basics of using the system',
      icon: <Book color="primary" />,
      articles: 12,
      color: 'primary'
    },
    {
      id: 2,
      title: 'Inventory Management',
      description: 'Manage your products and stock',
      icon: <Article color="success" />,
      articles: 18,
      color: 'success'
    },
    {
      id: 3,
      title: 'Sales & Orders',
      description: 'Handle sales and customer orders',
      icon: <VideoLibrary color="warning" />,
      articles: 15,
      color: 'warning'
    },
    {
      id: 4,
      title: 'Reports & Analytics',
      description: 'Generate reports and analyze data',
      icon: <Help color="info" />,
      articles: 8,
      color: 'info'
    }
  ];

  // Mock data for FAQs
  const faqs = [
    {
      question: 'How do I add a new product to inventory?',
      answer: 'Go to the Add Product section from the main menu. Fill in the product details including name, description, price, and quantity. Click Save to add the product to your inventory.',
      category: 'Inventory Management',
      helpful: 45,
      notHelpful: 3
    },
    {
      question: 'How can I generate sales reports?',
      answer: 'Navigate to the Reports section and select Sales Reports. Choose your date range and filters, then click Generate Report. You can export the report in various formats.',
      category: 'Reports & Analytics',
      helpful: 38,
      notHelpful: 2
    },
    {
      question: 'What payment methods are supported?',
      answer: 'We support cash, credit cards, debit cards, and digital payments. You can configure payment methods in the Store Settings section.',
      category: 'Sales & Orders',
      helpful: 52,
      notHelpful: 1
    },
    {
      question: 'How do I manage user permissions?',
      answer: 'Go to Roles & Staff section to create and manage user roles. Assign specific permissions to each role and assign staff members to appropriate roles.',
      category: 'Getting Started',
      helpful: 29,
      notHelpful: 4
    }
  ];

  // Mock data for support channels
  const supportChannels = [
    {
      id: 1,
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <Chat color="primary" />,
      availability: '24/7',
      responseTime: 'Instant',
      color: 'primary'
    },
    {
      id: 2,
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: <Email color="success" />,
      availability: '24/7',
      responseTime: 'Within 4 hours',
      color: 'success'
    },
    {
      id: 3,
      name: 'Phone Support',
      description: 'Speak directly with our team',
      icon: <Phone color="warning" />,
      availability: 'Mon-Fri 9AM-6PM',
      responseTime: 'Immediate',
      color: 'warning'
    }
  ];

  const steps = [
    { label: 'Help Center', value: 16 },
    { label: 'Support Contact', value: 17 }
  ];

  const handleNext = () => {
    const nextStep = Math.min(activeStep + 1, 17);
    setActiveStep(nextStep);
    navigate(`/dashboard/help-support/${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = Math.max(activeStep - 1, 16);
    setActiveStep(prevStep);
    navigate(`/dashboard/help-support/${prevStep}`);
  };

  const handleStepClick = (stepValue) => {
    setActiveStep(stepValue);
    navigate(`/dashboard/help-support/${stepValue}`);
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType('');
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderHelpCenter = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Help Center
      </Typography>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search for help articles, FAQs, or topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Help Categories */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Help Categories
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {helpCategories.map((category) => (
          <Grid item xs={12} md={6} lg={3} key={category.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { boxShadow: 4 }
              }}
              onClick={() => setSelectedCategory(category.title)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {category.icon}
                  <Typography variant="h6" component="h3">
                    {category.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {category.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {category.articles} articles
                  </Typography>
                  <Chip
                    label="Browse"
                    color={category.color}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQs */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Frequently Asked Questions
      </Typography>
      <Paper sx={{ mb: 4 }}>
        {filteredFAQs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography variant="subtitle1">
                  {faq.question}
                </Typography>
                <Chip
                  label={faq.category}
                  size="small"
                  variant="outlined"
                  sx={{ ml: 2 }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {faq.answer}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Was this helpful?
                </Typography>
                <IconButton size="small" color="success">
                  <ThumbUp fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {faq.helpful}
                </Typography>
                <IconButton size="small" color="error">
                  <ThumbDown fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {faq.notHelpful}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Quick Actions */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ContactSupport />}
            onClick={() => handleDialogOpen('contact')}
            sx={{ py: 2 }}
          >
            Contact Support
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Book />}
            onClick={() => handleDialogOpen('documentation')}
            sx={{ py: 2 }}
          >
            View Documentation
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<VideoLibrary />}
            onClick={() => handleDialogOpen('tutorials')}
            sx={{ py: 2 }}
          >
            Video Tutorials
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSupportContact = () => (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Support Contact
      </Typography>

      {/* Support Channels */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Support Channels
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {supportChannels.map((channel) => (
          <Grid item xs={12} md={4} key={channel.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {channel.icon}
                  <Typography variant="h6" component="h3">
                    {channel.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {channel.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Availability:</strong> {channel.availability}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Response Time:</strong> {channel.responseTime}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color={channel.color}
                  fullWidth
                  onClick={() => handleDialogOpen(channel.name.toLowerCase())}
                >
                  Contact {channel.name}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Form */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Send us a Message
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Subject"
              placeholder="Brief description of your issue"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category">
                <MenuItem value="technical">Technical Issue</MenuItem>
                <MenuItem value="billing">Billing Question</MenuItem>
                <MenuItem value="feature">Feature Request</MenuItem>
                <MenuItem value="general">General Inquiry</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              placeholder="Please describe your issue in detail..."
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<Send />}
              size="large"
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Support Hours */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        Support Hours
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Live Chat & Email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              24/7 availability for urgent issues
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Phone Support
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monday - Friday: 9:00 AM - 6:00 PM EST
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

  const renderContent = () => {
    if (activeStep === 16) return renderHelpCenter();
    if (activeStep === 17) return renderSupportContact();
    return renderHelpCenter();
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
          disabled={activeStep === 16}
        >
          Back
        </Button>
        {activeStep < 17 && (
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
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'contact' && 'Contact Support'}
          {dialogType === 'documentation' && 'Documentation'}
          {dialogType === 'tutorials' && 'Video Tutorials'}
          {dialogType === 'live chat' && 'Start Live Chat'}
          {dialogType === 'email support' && 'Email Support'}
          {dialogType === 'phone support' && 'Phone Support'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'contact' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Choose your preferred support channel to get help.
              </Typography>
            </Box>
          )}
          {dialogType === 'documentation' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Browse our comprehensive documentation and user guides.
              </Typography>
            </Box>
          )}
          {dialogType === 'tutorials' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Watch step-by-step video tutorials for common tasks.
              </Typography>
            </Box>
          )}
          {dialogType === 'live chat' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Start a live chat session with our support team.
              </Typography>
            </Box>
          )}
          {dialogType === 'email support' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Send us an email and we'll respond within 4 hours.
              </Typography>
            </Box>
          )}
          {dialogType === 'phone support' && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Call us directly for immediate assistance.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained">
            {dialogType === 'live chat' ? 'Start Chat' : 
             dialogType === 'email support' ? 'Send Email' :
             dialogType === 'phone support' ? 'Call Now' : 'Continue'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HelpAndSupport;


