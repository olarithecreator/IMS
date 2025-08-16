import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ExpandMore,
  Help as HelpIcon,
  Support,
  Book,
  VideoLibrary,
} from '@mui/icons-material';

function Help() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Help & Support
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Support Options
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Support />
            </ListItemIcon>
            <ListItemText
              primary="Contact Support"
              secondary="Get help from our support team"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText
              primary="User Manual"
              secondary="Complete guide to using the system"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VideoLibrary />
            </ListItemIcon>
            <ListItemText
              primary="Video Tutorials"
              secondary="Step-by-step video guides"
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Frequently Asked Questions
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>How do I add a new product?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Navigate to the Inventory section and click "Add Product". Fill in the required information including product name, SKU, category, supplier, price, and stock quantity.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>How do I update stock levels?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Go to the product details page and click "Edit". You can then update the current stock quantity and save the changes.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>How do I create reports?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Visit the Reports section to view various analytics including sales reports, inventory reports, and performance metrics.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>How do I manage suppliers?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Go to the Suppliers section to add, edit, or remove supplier information. You can also view products associated with each supplier.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
}

export default Help; 