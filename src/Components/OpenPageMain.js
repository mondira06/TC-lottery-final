import React from 'react';
import { Typography, Container } from '@mui/material';
import Mobile from '../Components/Mobile';

const OpenPageMain = () => {
  return (
    <Mobile>
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to top,#ff9902, #ffcf56)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <img
        src="assets/images/bottom (3).png"
        alt="Main"
        style={{
          width: '100%',
          maxWidth: 400,
          marginBottom: 16, 
        }}
      />
      <Typography variant="h6">
        Withdraw fast, safe and stable
      </Typography>
      <div style={{ marginBottom: 20 }} /> 

      <img
        src="assets/h5setting_20231215032755xgv9.png"
        alt="Logo"
        style={{
          width: 200,
          marginBottom: 8, 
        }}
      />
    </Container>
    </Mobile>
  );
};

export default OpenPageMain;