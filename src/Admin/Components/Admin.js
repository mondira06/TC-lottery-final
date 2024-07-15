import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import BonusIcon from '@mui/icons-material/CardGiftcard';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import SalaryIcon from '@mui/icons-material/Money';
import UpdateIcon from '@mui/icons-material/Update';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
const drawerWidth = 250;

const AdminPanel = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
            { text: 'Dashboard', icon: <DashboardIcon sx={{ color: location.pathname === '/dashboard' ? '#FFFFFF' : '#F78D02' }} />, link: '/dashboard' },
            { text: 'Wingo', icon: <InboxIcon sx={{ color: location.pathname === '/wingo-admin' ? '#FFFFFF' : '#F78D02' }} />, link: '/wingo-admin' },
            { text: 'Members', icon: <PeopleIcon sx={{ color: location.pathname === '/members' ? '#FFFFFF' : '#F78D02' }} />, link: '/members' },
            { text: 'Browse Recharge', icon: <PaymentIcon sx={{ color: location.pathname === '/pending-recharge-admin' ? '#FFFFFF' : '#F78D02' }} />, link: '/pending-recharge-admin' },
            { text: 'Browse Withdraw', icon: <PaymentIcon sx={{ color: location.pathname === '/withdraw-admin-status' ? '#FFFFFF' : '#F78D02' }} />, link: '/withdraw-admin-status' },
            { text: 'VIP Level', icon: <PeopleIcon sx={{ color: location.pathname === '/vip-levels' ? '#FFFFFF' : '#F78D02' }} />, link: '/vip-levels' },
            { text: 'Update', icon: <SettingsIcon sx={{ color: location.pathname === '/settings-admin' ? '#FFFFFF' : '#F78D02' }} />, link: '/settings-admin' },
            { text: 'First Deposit Bonus', icon: <BonusIcon sx={{ color: location.pathname === '/bonus-settings' ? '#FFFFFF' : '#F78D02' }} />, link: '/bonus-settings' },
            { text: 'Update Salary Bonus', icon: <SalaryIcon sx={{ color: location.pathname === '/playersSalary' ? '#FFFFFF' : '#F78D02' }} />, link: '/playersSalary' },
            { text: 'Create Salary', icon: <SalaryIcon sx={{ color: location.pathname === '/create-salary' ? '#FFFFFF' : '#F78D02' }} />, link: '/create-salary' },
          { text: 'Create Giftcode', icon: <GiftIcon sx={{ color: location.pathname === '/create-coupon' ? '#FFFFFF' : '#F78D02' }} />, link: '/create-coupon' },
          { text: 'Notifications', icon: <NotificationsIcon sx={{ color: location.pathname === '/notifications-admin' ? '#FFFFFF' : '#F78D02' }} />, link: '/notifications-admin' },
          { text: 'Recharge (Approved)', icon: <PaymentIcon sx={{ color: location.pathname === '/recharge-admin' ? '#FFFFFF' : '#F78D02' }} />, link: '/recharge-admin' },
          { text: 'Withdraw (Approved)', icon: <PaymentIcon sx={{ color: location.pathname === '/withdraw-admin' ? '#FFFFFF' : '#F78D02' }} />, link: '/withdraw-admin' },
          { text: 'Withdrawl Settings', icon: <UpdateIcon sx={{ color: location.pathname === '/withdrawl-limits' ? '#FFFFFF' : '#F78D02' }} />, link: '/withdrawl-limits' },
          { text: 'Wallet Update', icon: <UpdateIcon sx={{ color: location.pathname === '/wallet-update' ? '#FFFFFF' : '#F78D02' }} />, link: '/wallet-update' },
          { text: 'Support', icon: <HelpIcon sx={{ color: location.pathname === '/support-admin' ? '#FFFFFF' : '#F78D02' }} />, link: '/support-admin' },
      
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.link || '#'}
            style={{ background: location.pathname === item.link ? '#F78D02' : 'transparent',color: location.pathname === item.link ? 'white' : 'black' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
  primary={
    <Typography variant="body1" sx={{ fontWeight: '500' }}>
      {item.text}
    </Typography>
  } 
/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: '#F78D02',color:"black" }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
  <Box
    component="img"
    sx={{
      height: 40, // Adjust the height as needed
      marginRight: 1, // Adjust the space between the image and the text
    }}
    alt="Logo"
    src="assets/images/h5setting_20231215032755xgv9.png" // Replace with the actual path to your logo
  />
</Typography>
          <IconButton
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{color:"white"}}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, overflowY: 'hidden' }}
        aria-label="mailbox folders"
      >
      <Drawer
  variant={isMobile ? 'temporary' : 'permanent'}
  open={isMobile ? mobileOpen : true}
  onClose={handleDrawerToggle}
  ModalProps={{
    keepMounted: true, // Better open performance on mobile.
  }}
  sx={{
    '& .MuiDrawer-paper': { 
      boxSizing: 'border-box', 
      width: drawerWidth, 
      backgroundColor: '#FFFFFF', 
     
      overflowY: 'auto',  // Enable vertical scrolling
      '&::-webkit-scrollbar': {
        width: '0px',  // Hide scrollbar width
        background: 'transparent',  // Hide scrollbar background
      },
    },
  }}
>
  {drawer}
</Drawer>

      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 3, // Adjust the margin to match the height of the AppBar
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminPanel;