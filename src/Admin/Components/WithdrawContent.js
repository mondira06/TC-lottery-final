import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import axios from "axios";
import { domain } from "../../Components/config";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    copy: {
      main: '#ffc107',
    },
    accept: {
      main: '#4caf50',
    },
    reject: {
      main: '#f44336',
    },
  },
  typography: {
    fontWeightSemiBold: 600,
  },
});

const styles = `
  .bold-header .MuiDataGrid-columnHeaderTitle {
    font-weight: 700;
  }
  .semibold-cell {
    font-weight: 600;
  }
  .custom-even-row {
    background-color: #f5f5f5;
  }
  .custom-odd-row {
    background-color: #ffffff;
  }
`;

function UpdateWithdrawRequest() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [disabledRows, setDisabledRows] = useState({});
  const [filterModel, setFilterModel] = useState({
    items: [{ columnField: "status", operatorValue: "contains", value: "" }],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${domain}/all-withdraw-history-admin_only`, {
        withCredentials: true,
      });

      const data = res.data.userWithdrawals
        .filter((result) => result.status === "Pending" && !result.withdrawDone)
        .map((result, index) => {
          const accountDetails = result.userId && Array.isArray(result.userId.bankDetails) && result.userId.bankDetails.length > 0
            ? result.userId.bankDetails[0]
            : {};
          const TRXAddress = result.userId && Array.isArray(result.userId.TRXAddress) && result.userId.TRXAddress.length > 0
            ? result.userId.TRXAddress[0]
            : null;

          return ({
            id: result._id,
            srNo: index + 1,
            status: result.status,
            balance: result.balance,
            userId: result.userId ? result.userId._id : null,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            ...accountDetails,
            withdrawMethod: result.withdrawMethod,
            TRXAddress,
          });
        });

      setRows(data);
      setFilteredRows(data);
      localStorage.setItem("withdrawals", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const updateRowStatus = (id, newStatus) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status: newStatus, updatedAt: new Date().toISOString() } : row
    );

    setRows(updatedRows);
    setFilteredRows(updatedRows);
    localStorage.setItem("withdrawals", JSON.stringify(updatedRows));
  };

  const handleAccept = async (id) => {
    const token = Cookies.get("token");

    try {
      const res = await axios.post(
        `${domain}/update-withdraw-status`,
        {
          withdrawId: id,
          acceptanceType: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      updateRowStatus(id, "Completed");
      removeRowFromView(id);
    } catch (error) {
      console.error("Error updating withdraw status:", error);
    }
  };

  const handleReject = async (id) => {
    const token = Cookies.get("token");

    try {
      const res = await axios.post(
        `${domain}/update-withdraw-status`,
        {
          withdrawId: id,
          acceptanceType: "Rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      updateRowStatus(id, "Rejected");
      removeRowFromView(id);
    } catch (error) {
      console.error("Error updating withdraw status:", error);
    }
  };

  const removeRowFromView = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    setFilteredRows(updatedRows);
    localStorage.setItem("withdrawals", JSON.stringify(updatedRows));
  };

  const columns = [
    { field: "srNo", headerName: "Id", width: 70, headerClassName: 'bold-header', cellClassName: 'semibold-cell' },
    { field: "status", headerName: "Status", width: 120, headerClassName: 'bold-header', cellClassName: 'semibold-cell' },
    { field: "withdrawMethod", headerName: "Withdraw Method", width: 150, headerClassName: 'bold-header', cellClassName: 'semibold-cell' },
    { field: "balance", headerName: "Balance", width: 120, headerClassName: 'bold-header', cellClassName: 'semibold-cell', type: 'number' },
    {
      field: "accountNo",
      headerName: "Account No",
      width: 220,
      headerClassName: 'bold-header',
      cellClassName: 'semibold-cell',
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>{params.value}</Typography>
          <Button
            variant="contained"
            color="copy"
            size="small"
            onClick={() => navigator.clipboard.writeText(params.value)}
            sx={{ minWidth: '60px', height: '24px', fontSize: '0.75rem' }}
          >
            Copy
          </Button>
        </Box>
      ),
    },
    { field: "bankName", headerName: "Bank Name", width: 150, headerClassName: 'bold-header', cellClassName: 'semibold-cell' },
    {
      field: "ifscCode",
      headerName: "IFSC Code",
      width: 220,
      headerClassName: 'bold-header',
      cellClassName: 'semibold-cell',
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>{params.value}</Typography>
          <Button
            variant="contained"
            color="copy"
            size="small"
            onClick={() => navigator.clipboard.writeText(params.value)}
            sx={{ minWidth: '60px', height: '24px', fontSize: '0.75rem' }}
          >
            Copy
          </Button>
        </Box>
      ),
    },
    { field: "mobile", headerName: "Mobile", width: 120, headerClassName: 'bold-header', cellClassName: 'semibold-cell' },
    { field: "name", headerName: "Name", width: 150, headerClassName: 'bold-header', cellClassName: 'semibold-cell' },
    {
      field: "TRXAddress",
      headerName: "TRX Address",
      width: 270,
      headerClassName: 'bold-header',
      cellClassName: 'semibold-cell',
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>{params.value}</Typography>
          <Button
            variant="contained"
            color="copy"
            size="small"
            onClick={() => navigator.clipboard.writeText(params.value)}
            sx={{ minWidth: '60px', height: '24px', fontSize: '0.75rem' }}
          >
            Copy
          </Button>
        </Box>
      ),
    },
    { 
      field: "createdAt", 
      headerName: "Date", 
      width: 180, 
      headerClassName: 'bold-header', 
      cellClassName: 'semibold-cell',
      type: 'dateTime',
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerClassName: 'bold-header',
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="accept"
            size="small"
            disabled={disabledRows[params.row.id]}
            onClick={() => handleAccept(params.row.id)}
            sx={{ color: 'white' }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="reject"
            size="small"
            disabled={disabledRows[params.row.id]}
            onClick={() => handleReject(params.row.id)}
            sx={{ color: 'white' }}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <style>{styles}</style>
      <Box sx={{ minHeight: "85vh", padding: 3, backgroundColor: "whitesmoke" }}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
            Withdraw Status
          </Typography>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            sortingOrder={["asc", "desc"]}
            disableSelectionOnClick
            filterModel={filterModel}
            filterMode="server"
            components={{
              Toolbar: GridToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'custom-odd-row' : 'custom-even-row'
            }
            localeText={{ noRowsLabel: 'No withdraw requests found' }}
            onFilterModelChange={(model) => {
              if (JSON.stringify(model) !== JSON.stringify(filterModel)) {
                setFilterModel(model);
              }
            }}
            autoHeight
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0',
                color: '#333',
              },
            }}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

UpdateWithdrawRequest.propTypes = {
  window: PropTypes.func,
};

export default UpdateWithdrawRequest;