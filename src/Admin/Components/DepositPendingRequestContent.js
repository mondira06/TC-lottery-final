import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Box, Paper, Button, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { domain } from '../../Components/config';

const DepositPendingRequestContent = ({ onAccept, onReject }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to manage errors
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage snackbar visibility

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = () => {
    axios.get(`${domain}/admin/deposit/history`, { withCredentials: true })
      .then(res => {
        const filteredRequests = res.data.filter(request => request.depositStatus === 'pending');
        setPendingRequests(filteredRequests);
      })
      .catch(err => {
        console.error('Error fetching pending recharge requests:', err);
      });
  };

  const handleAccept = (request) => {
    setLoading(true);

    axios.post(`${domain}/wallet-manual`, { userId: request.userId, amount: request.depositAmount, depositId: request._id }, { withCredentials: true })
      .then(res => {
        const updatedRequests = pendingRequests.filter(req => req._id !== request._id);
        setPendingRequests(updatedRequests);
        setLoading(false);
        setSnackbarOpen(true); // Show success message
      })
      .catch(err => {
        console.error('Error accepting deposit:', err);
        setError('Failed to accept deposit. Please try again later.');
        setLoading(false);
        setSnackbarOpen(true); // Show error message
      });
  };

  const handleReject = (request) => {
    setLoading(true);

    axios.post(`${domain}/rejectDeposit`, { userId: request.userId, depositId: request._id }, { withCredentials: true })
      .then(res => {
        const updatedRequests = pendingRequests.filter(req => req._id !== request._id);
        setPendingRequests(updatedRequests);
        setLoading(false);
        setSnackbarOpen(true); // Show success message
      })
      .catch(err => {
        console.error('Error rejecting deposit:', err);
        setError('Failed to reject deposit. Please try again later.');
        setLoading(false);
        setSnackbarOpen(true); // Show error message
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setError(null);
  };

  const columns = [
    { field: 'depositId', headerName: 'UTR', width: 150 },
    { field: 'depositAmount', headerName: 'Amount', width: 150 },
    { field: 'depositDate', headerName: 'Date', width: 200 },
    { field: 'depositStatus', headerName: 'Status', width: 150 },
    { field: 'uid', headerName: 'UID', width: 150 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <>
          {params.row.depositStatus === 'pending' && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={() => handleAccept(params.row)}
              >
                {loading ? <CircularProgress size={24} /> : 'Accept'}
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={loading}
                onClick={() => handleReject(params.row)}
              >
                {loading ? <CircularProgress size={24} /> : 'Reject'}
              </Button>
            </Box>
          )}
        </>
      ),
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Pending Recharge Requests
        </Typography>
        <Box sx={{ height: 500, width: '100%', marginTop: 3 }}>
          <DataGrid
            rows={pendingRequests}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Paper>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
          {error ? error : 'Operation successful'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DepositPendingRequestContent;
