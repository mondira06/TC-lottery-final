import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Box, Paper, Tab, Tabs, Container } from '@mui/material';
import { domain } from '../../Components/config';

const Recharge = () => {
  const [deposits, setDeposits] = useState([]);
  const [tabValue, setTabValue] = useState(0); // 0 for Completed Deposits, 1 for Rejected Deposits

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = () => {
    axios.get(`${domain}/admin/deposit/history`, { withCredentials: true })
      .then(res => setDeposits(res.data))
      .catch(err => console.error(err));
  };

  const filteredDeposits = deposits.filter(deposit => {
    if (tabValue === 0) {
      return deposit.depositStatus === 'completed';
    } else {
      return deposit.depositStatus === 'failed';
    }
  });

  const columns = [
    { field: 'depositId', headerName: 'UTR', width: 150 },
    { field: 'uid', headerName: 'UID', width: 150 },
    { field: 'depositAmount', headerName: 'Amount', width: 150 },
    { field: 'depositStatus', headerName: 'Status', width: 150 },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Recharge Status
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Deposit Status Tabs"
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'space-between',
                width: '100%',
              },
            }}
          >
            <Tab label="Completed Deposits" />
            <Tab label="Rejected Deposits" />
          </Tabs>
        </Box>
        <DataGrid
          rows={filteredDeposits}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Paper>
    </Container>
  );
};

export default Recharge;
