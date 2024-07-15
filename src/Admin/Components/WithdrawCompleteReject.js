import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Container } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { domain } from "../../Components/config";

const WithdrawalStatus = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get(`${domain}/all-withdraw-history-admin_only`, {
        withCredentials: true,
      });
      const data = res.data.userWithdrawals.map((result) => {
        const { userId } = result;
        const bankDetails = Array.isArray(userId.bankDetails) && userId.bankDetails.length > 0 ? userId.bankDetails[0] : {};
        const TRXAddress = Array.isArray(userId.TRXAddress) && userId.TRXAddress.length > 0 ? userId.TRXAddress[0] : null;

        return {
          id: result._id,
          status: result.status,
          balance: result.balance,
          accountNo: bankDetails.accountNo || null,
          bankName: bankDetails.bankName || null,
          ifscCode: bankDetails.ifscCode || null,
          mobile: bankDetails.mobile || null,
          name: bankDetails.name || null,
          withdrawMethod: result.withdrawMethod,
          TRXAddress,
        };
      });

      setWithdrawals(data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      setError(error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredWithdrawals = tabValue === 0
    ? withdrawals.filter((withdrawal) => withdrawal.status === 'Completed')
    : withdrawals.filter((withdrawal) => withdrawal.status === 'Rejected');

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

  if (error) {
    return <Typography variant="h6">Error fetching withdrawals. Please try again later.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, minHeight: "85vh" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          variant="h5"
          align="left"
          fontWeight="bold"
          gutterBottom
          style={{ paddingLeft: "15px" }}
        >
          Withdrawal Status
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Withdrawal Status Tabs"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
                width: "100%",
              },
            }}
          >
            <Tab
              label="Completed Withdrawals"
              sx={{
                fontWeight: "bold",
                color: tabValue === 0 ? "#00FF00" : "#000000",
                textTransform: "none",
                fontSize: "17px"
              }}
            />
            <Tab
              label="Rejected Withdrawals"
              sx={{
                fontWeight: "bold",
                color: tabValue === 1 ? "#FF0000" : "#000000",
                textTransform: "none",
                fontSize: "17px"
              }}
            />
          </Tabs>
        </Box>
        <TableContainer sx={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWithdrawals.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align="center"
                      sx={{ borderRight: "1px solid #e0e0e0" }}
                    >
                      {row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default WithdrawalStatus;