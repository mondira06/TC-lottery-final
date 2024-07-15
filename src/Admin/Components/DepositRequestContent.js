import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  Paper,
  Tab,
  Tabs,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { domain } from "../../Components/config";

const Recharge = () => {
  const [deposits, setDeposits] = useState([]);
  const [tabValue, setTabValue] = useState(0); // 0 for Completed Deposits, 1 for Rejected Deposits

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = () => {
    axios
      .get(`${domain}/admin/deposit/history`, { withCredentials: true })
      .then((res) => setDeposits(res.data))
      .catch((err) => console.error(err));
  };

  const filteredDeposits = deposits.filter((deposit) => {
    if (tabValue === 0) {
      return deposit.depositStatus === "completed";
    } else {
      return deposit.depositStatus === "failed";
    }
  });

  const columns = [
    { field: "depositId", headerName: "UTR", width: 150 },
    { field: "uid", headerName: "UID", width: 150 },
    { field: "depositAmount", headerName: "Amount", width: 150 },
    { field: "depositStatus", headerName: "Status", width: 150 },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, minHeight:"85vh" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          variant="h5"
          align="left"
          fontWeight="bold"
          gutterBottom
          style={{ paddingLeft: "15px" }}
        >
          Recharge Status
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
            aria-label="Deposit Status Tabs"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
                width: "100%",
              },
            }}
          >
            <Tab
              label="Completed Deposits"
              sx={{
                fontWeight: "bold",
                color: tabValue === 0 ? "#00FF00" : "#000000",
                textTransform: "none",
                fontSize:"17px" // Add this line
              }}
            />
            <Tab
              label="Rejected Deposits"
              sx={{
                fontWeight: "bold",
                color: tabValue === 1 ? "#FF0000" : "#000000",
                textTransform: "none",
                fontSize:"17px" // Add this line
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
              {filteredDeposits.map((row, index) => (
                <TableRow
                  key={row._id}
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

export default Recharge;