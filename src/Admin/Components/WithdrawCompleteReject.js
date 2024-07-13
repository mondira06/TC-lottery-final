import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { domain } from "../../Components/config";

const CompletedRejectedWithdrawals = () => {
  const [completedRows, setCompletedRows] = useState([]);
  const [rejectedRows, setRejectedRows] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get(`${domain}/all-withdraw-history-admin_only`, {
        withCredentials: true,
      });
      const data = res.data.userWithdrawals.map((result) => {
        if (result.userId && Array.isArray(result.userId.bankDetails) && result.userId.bankDetails.length > 0) {
          const { accountNo, bankName, ifscCode, mobile, name } = result.userId.bankDetails[0];
          const TRXAddress = Array.isArray(result.userId.TRXAddress) && result.userId.TRXAddress.length > 0 ? result.userId.TRXAddress[0] : null;

          return {
            id: result._id,
            status: result.status,
            balance: result.balance,
            accountNo,
            bankName,
            ifscCode,
            mobile,
            name,
            withdrawMethod: result.withdrawMethod,
            TRXAddress
          };
        } else {
          return {
            id: result._id,
            status: result.status,
            balance: result.balance,
            accountNo: null,
            bankName: null,
            ifscCode: null,
            mobile: null,
            name: null,
            withdrawMethod: result.withdrawMethod,
            TRXAddress: null
          };
        }
      });

      const completed = data.filter(row => row.status === 'Completed');
      const rejected = data.filter(row => row.status === 'Rejected');

      setCompletedRows(completed);
      setRejectedRows(rejected);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'balance', headerName: 'Balance', width: 150 },
    { field: 'accountNo', headerName: 'Account No', width: 200 },
    { field: 'bankName', headerName: 'Bank Name', width: 150 },
    { field: 'ifscCode', headerName: 'IFSC Code', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'withdrawMethod', headerName: 'Withdraw Method', width: 150 },
    { field: 'TRXAddress', headerName: 'TRX Address', width: 250 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="withdrawal tabs">
          <Tab label="Completed Withdrawals" />
          <Tab label="Rejected Withdrawals" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" sx={{ p: 3 }}>
          Completed Withdrawals
        </Typography>
        <DataGrid
          rows={completedRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" sx={{ p: 3 }}>
          Rejected Withdrawals
        </Typography>
        <DataGrid
          rows={rejectedRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TabPanel>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default CompletedRejectedWithdrawals;