import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Paper } from '@mui/material';
import { domain } from '../../Components/config';

const WalletUpdateMain = () => {
  const [uid, setUid] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${domain}/updateWallet`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid, amount: Number(amount), action })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.alert(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert('An error occurred');
      });
  };

  return (
    <div style={{minHeight: "85vh"}}>
    <Paper elevation={3} style={{ padding: '20px', minWidth: '300px', maxWidth: '600px', width: '80%', margin: 'auto', marginTop: '40px', marginBottom: '40px', overflowY: 'auto' }}>
      <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
        Increase / Decrease Wallet Amount
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="User ID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                },
                marginBottom: { xs: "10px", sm: "0" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                },
                marginBottom: { xs: "10px", sm: "0" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}>
              <InputLabel>Action</InputLabel>
              <Select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                label="Action"
              >
                <MenuItem value="increase">Increase</MenuItem>
                <MenuItem value="decrease">Decrease</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth 
            sx={{
              backgroundColor: "#F78D02",
              color: "white",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
    </div>
  );
};

export default WalletUpdateMain;