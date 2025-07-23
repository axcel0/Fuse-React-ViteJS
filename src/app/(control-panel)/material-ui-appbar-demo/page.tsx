import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Chip,
  Alert,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Code,
  Visibility,
  Settings,
  CheckCircle,
  Star,
  TrendingUp
} from '@mui/icons-material';
import MaterialUIAppBar from '../../../components/MaterialUIAppBar';

/**
 * Demo page for the new Material-UI AppBar component
 */
function MaterialUIAppBarDemo() {
  // State for demo controls
  const [position, setPosition] = useState<'fixed' | 'static' | 'sticky'>('static');
  const [variant, setVariant] = useState<'dense' | 'regular' | 'prominent'>('regular');
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [elevation, setElevation] = useState(1);
  const [enableColorOnDark, setEnableColorOnDark] = useState(true);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [showSearch, setShowSearch] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(true);

  const features = [
    {
      icon: <CheckCircle color="success" />,
      title: 'Material-UI Native',
      description: 'Built with Material-UI components following Google Material Design principles'
    },
    {
      icon: <Visibility color="primary" />,
      title: 'Responsive Design', 
      description: 'Automatically adapts to different screen sizes with mobile-optimized interactions'
    },
    {
      icon: <Settings color="secondary" />,
      title: 'Highly Configurable',
      description: 'Multiple variants, positions, and customization options available'
    },
    {
      icon: <Star color="warning" />,
      title: 'Modern Features',
      description: 'Hide on scroll, breadcrumbs, search, notifications, and user menu integration'
    }
  ];

  const variants = [
    {
      value: 'regular',
      title: 'Regular AppBar',
      description: 'Standard height with all navigation elements in a single row'
    },
    {
      value: 'dense',
      title: 'Dense AppBar', 
      description: 'Compact height perfect for desktop applications with limited space'
    },
    {
      value: 'prominent',
      title: 'Prominent AppBar',
      description: 'Larger height with search bar prominently displayed'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Material-UI AppBar Migration
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Modern, responsive, and feature-rich navigation header built with Material-UI
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip icon={<Code />} label="TypeScript" color="primary" />
          <Chip icon={<CheckCircle />} label="Material-UI v6" color="success" />
          <Chip icon={<TrendingUp />} label="Responsive" color="info" />
          <Chip icon={<Star />} label="Modern" color="warning" />
        </Box>
      </Box>

      {/* Live Preview */}
      <Paper elevation={2} sx={{ mb: 4, overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Visibility />
            Live Preview
          </Typography>
        </Box>
        
        {/* AppBar Preview */}
        <Box sx={{ position: 'relative', minHeight: position === 'static' ? 'auto' : '100px' }}>
          <MaterialUIAppBar
            position={position}
            variant={variant}
            hideOnScroll={hideOnScroll}
            elevation={elevation}
            enableColorOnDark={enableColorOnDark}
            showBreadcrumbs={showBreadcrumbs}
            showSearch={showSearch}
            showNotifications={showNotifications}
            showUserMenu={showUserMenu}
          />
          {position === 'fixed' && <Box sx={{ height: '64px' }} />}
        </Box>
        
        {/* Sample Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sample Page Content
          </Typography>
          <Typography paragraph>
            This is sample content to demonstrate how the AppBar interacts with page content. 
            The AppBar position and behavior can be customized using the controls below.
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            Try scrolling when "Hide on Scroll" is enabled to see the AppBar behavior!
          </Alert>
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {/* Configuration Controls */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Settings />
            Configuration
          </Typography>

          {/* Position Control */}
          <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
            <FormLabel component="legend">Position</FormLabel>
            <RadioGroup
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              row
            >
              <FormControlLabel value="static" control={<Radio />} label="Static" />
              <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
              <FormControlLabel value="sticky" control={<Radio />} label="Sticky" />
            </RadioGroup>
          </FormControl>

          {/* Variant Control */}
          <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
            <FormLabel component="legend">Variant</FormLabel>
            <RadioGroup
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
            >
              <FormControlLabel value="regular" control={<Radio />} label="Regular" />
              <FormControlLabel value="dense" control={<Radio />} label="Dense" />
              <FormControlLabel value="prominent" control={<Radio />} label="Prominent" />
            </RadioGroup>
          </FormControl>

          {/* Feature Toggles */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Features</Typography>
            <FormControlLabel
              control={<Switch checked={hideOnScroll} onChange={(e) => setHideOnScroll(e.target.checked)} />}
              label="Hide on Scroll"
            />
            <FormControlLabel
              control={<Switch checked={enableColorOnDark} onChange={(e) => setEnableColorOnDark(e.target.checked)} />}
              label="Enable Color on Dark"
            />
            <FormControlLabel
              control={<Switch checked={showBreadcrumbs} onChange={(e) => setShowBreadcrumbs(e.target.checked)} />}
              label="Show Breadcrumbs"
            />
            <FormControlLabel
              control={<Switch checked={showSearch} onChange={(e) => setShowSearch(e.target.checked)} />}
              label="Show Search"
            />
            <FormControlLabel
              control={<Switch checked={showNotifications} onChange={(e) => setShowNotifications(e.target.checked)} />}
              label="Show Notifications"
            />
            <FormControlLabel
              control={<Switch checked={showUserMenu} onChange={(e) => setShowUserMenu(e.target.checked)} />}
              label="Show User Menu"
            />
          </Box>
        </Paper>

        {/* Features Overview */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <List>
            {features.map((feature, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemIcon sx={{ mt: 1 }}>
                  {feature.icon}
                </ListItemIcon>
                <ListItemText
                  primary={feature.title}
                  secondary={feature.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Variant Descriptions */}
      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          AppBar Variants
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {variants.map((variantInfo, index) => (
            <Card 
              key={index}
              variant="outlined" 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                '&:hover': { boxShadow: 2 },
                ...(variant === variantInfo.value && { 
                  borderColor: 'primary.main', 
                  boxShadow: 1 
                })
              }}
              onClick={() => setVariant(variantInfo.value as any)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {variantInfo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {variantInfo.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Implementation Guide */}
      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Implementation Guide
            </Typography>
            <Alert severity="success" sx={{ mb: 2 }}>
              ✅ Material-UI AppBar successfully migrated with all existing functionality preserved!
            </Alert>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              How to Use:
            </Typography>
            <Box component="pre" sx={{ 
              bgcolor: 'grey.100', 
              p: 2, 
              borderRadius: 1, 
              overflow: 'auto',
              fontSize: '0.875rem'
            }}>
{`import MaterialUIAppBar from './components/MaterialUIAppBar';

// Basic usage
<MaterialUIAppBar />

// With custom configuration
<MaterialUIAppBar
  position="fixed"
  variant="prominent"
  hideOnScroll={true}
  showBreadcrumbs={true}
  showSearch={true}
  showNotifications={true}
  showUserMenu={true}
/>`}
            </Box>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
              Migration Benefits:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                <ListItemText primary="100% Material-UI native components" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                <ListItemText primary="Improved accessibility with ARIA labels" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                <ListItemText primary="Better responsive behavior" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                <ListItemText primary="Enhanced theming support" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                <ListItemText primary="Modern features like hide on scroll" />
              </ListItem>
            </List>
          </Paper>
    </Container>
  );
}

export default MaterialUIAppBarDemo;
