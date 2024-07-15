import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountIcon from '@mui/icons-material/AccountCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DiamondIcon from '@mui/icons-material/Diamond';

const BottomNavigationArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));



  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      style={{
        position: 'fixed',
        bottom: 0,
        padding: '6px 0',
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth:isSmallScreen ? '': "396px",
        margin: 'auto',
 // Adjust height based on screen size
      }}
    >
      <BottomNavigationAction
        style={{ color: value === '/home' ? '#DDB96B' : '#BFBFBF' }}
        label="Home"
        value="/home"
        icon={ <img 
          src={value === '/home' ? '/assets/images/home-r-0e9d3a12.png':'/assets/images/home-3e6a9291.png'} 
          width="25px" 
          height="25px" 

          style={{ 
            color: value === '/home' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
          }} 
          alt="icon"
        />} 
      />
  <BottomNavigationAction
  style={{ color: value === '/activity' ? '#DDB96B' : '#BFBFBF' }}
  label="Activity"
  value="/activity"
  icon={
    <img 
    src={value === '/activity' ? '/assets/images/activity-r-8eb2eaaa.png':'/assets/images/activity-bb37b07c.png'} 
    width="25px" 
    height="25px" 

    style={{ 
      color: value === '/activity' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
    }} 
    alt="icon"
  />
    
  }
/>


  <BottomNavigationAction
   
  label="Promotion"
  value="/promotion"
  icon={
    <img 
    src='/assets/images/promotionBg-d4b9ecd6.png'
    width="60px" 
    height="60px" 
    alt="icon"

  />
  }
  style={{ 
    color: '#F78D02',
    marginTop:"-35px"
  }} 
/>

      <BottomNavigationAction
        style={{ color: value === '/wallet' ? '#DDB96B' : '#BFBFBF' }}
        label="Wallet"
        value="/wallet"
        icon ={
        <img 
        src={value === '/wallet' ? '/assets/images/wallet-r-5ca037e5.png':'/assets/images/wallet-dd37d20a.png'} 
        width="25px" 
        height="25px" 

        style={{ 
          color: value === '/wallet' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
        }} 
        alt="icon"
      />}
      />
      <BottomNavigationAction
  style={{ color: value === '/account' ? '#DDB96B' : '#BFBFBF' }}
  label="Account"
  value="/account"
  icon={
    <img 
    src={value === '/account' ? '/assets/images/main-r-d2aeb055.png':'/assets/images/main-53f64122.png'} 
    width="25px" 
    height="25px" 

    style={{ 
      color: value === '/account' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
    }} 
    alt="icon"
  />
  }
/>

    </BottomNavigation>
  );
};

export default BottomNavigationArea;