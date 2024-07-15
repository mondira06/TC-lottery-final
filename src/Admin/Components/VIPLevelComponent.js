import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import axios from "axios";
import { domain } from "../../Components/config";

const initialLevels = [
  { minAmount: 1000, oneTimeBonus: 100, awarded: "Bronze", monthlyBonus: 50 },
  { minAmount: 5000, oneTimeBonus: 250, awarded: "Silver", monthlyBonus: 100 },
  { minAmount: 10000, oneTimeBonus: 500, awarded: "Gold", monthlyBonus: 200 },
  {
    minAmount: 20000,
    oneTimeBonus: 1000,
    awarded: "Platinum",
    monthlyBonus: 300,
  },
  {
    minAmount: 50000,
    oneTimeBonus: 2000,
    awarded: "Diamond",
    monthlyBonus: 500,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CommissionLevelsForm = () => {
  const [levels, setLevels] = useState(initialLevels);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [fetchedLevels, setFetchedLevels] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null); // State to track hovered button

  useEffect(() => {
    const savedLevels = JSON.parse(localStorage.getItem("commissionLevels"));
    if (savedLevels) {
      setLevels(savedLevels);
    }
    fetchLevelsFromBackend();
  }, []);

  useEffect(() => {
    localStorage.setItem("commissionLevels", JSON.stringify(levels));
  }, [levels]);

  const fetchLevelsFromBackend = async () => {
    try {
      const response = await axios.get(`${domain}/levels`);
      setFetchedLevels(response.data.data);
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newLevels = [...levels];
    newLevels[index] = { ...newLevels[index], [name]: value };
    setLevels(newLevels);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.put(`${domain}/update-unlock-commission`, {
        levels,
      });
      setIsLoading(false);
      alert(res.data.msg); // Show success message
    } catch (error) {
      console.error("Error updating commission levels:", error);
      setIsLoading(false);
      alert("Failed to update commission levels. Please try again."); // Show error message
    }
  };

  const handleButtonHover = (index) => {
    setHoveredButton(index);
  };

  const handleButtonLeave = () => {
    setHoveredButton(null);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`commission-levels-tabpanel-${index}`}
        aria-labelledby={`commission-levels-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100vw",
        margin: "auto",
        mt: 3,
        px: 3,
        backgroundColor: "whitesmoke",
      }}
    >
      <Paper elevation={3} sx={{ py: 3, px: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ ml: 2, mb: 3, textAlign: "start", fontWeight: "bold", color: "black" }}
        >
          Set VIP Levels
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="commission-levels-tabs"
          sx={{
            mb: 2,
            "& .MuiTab-root": {
              color: "black", // Set default tab color
              fontWeight: "normal", // Set default font weight
            },
            "& .Mui-selected": {
              color: "black", // Set selected tab color to black
              fontWeight: "bold", // Set selected tab font weight to bold
            },
          }}
        >
          <Tab label="Edit Levels" />
          <Tab label="Fetched Levels" />
        </Tabs>

        <TabPanel value={selectedTab} index={0}>
          <form onSubmit={handleSubmit}>
            <TableContainer
              component={Paper}
              sx={{ border: "1px solid lightgray",  }}
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="commission levels table"
              >
                <TableHead>
                  <StyledTableRow >
                    <StyledTableCell sx={{fontWeight: "bold"}}>Level</StyledTableCell>
                    <StyledTableCell align="center" sx={{fontWeight: "bold"}}>
                      Minimum Amount
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{fontWeight: "bold"}}>
                      One-Time Bonus
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{fontWeight: "bold"}}>Awarded</StyledTableCell>
                    <StyledTableCell align="center" sx={{fontWeight: "bold"}}>
                      Monthly Bonus
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{fontWeight: "bold"}}>Update</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {levels.map((level, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell sx={{fontWeight: "bold"}} component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          fullWidth
                          variant="outlined"
                          name="minAmount"
                          defaultValue={levels[index].minAmount}
                          onBlur={(e) => handleInputChange(index, e)}
                          required
                          type="number"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          fullWidth
                          variant="outlined"
                          name="oneTimeBonus"
                          defaultValue={levels[index].oneTimeBonus}
                          onBlur={(e) => handleInputChange(index, e)}
                          required
                          type="number"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          fullWidth
                          variant="outlined"
                          name="awarded"
                          defaultValue={levels[index].awarded}
                          onBlur={(e) => handleInputChange(index, e)}
                          required
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          fullWidth
                          variant="outlined"
                          name="monthlyBonus"
                          defaultValue={levels[index].monthlyBonus}
                          onBlur={(e) => handleInputChange(index, e)}
                          required
                          type="number"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isLoading}
                          fullWidth
                          sx={{
                            backgroundColor:
                              hoveredButton === index ? "black" : "#F78D02", // Change to goldenrod when hovered
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#F78D02", // Override background color on hover
                            },
                          }}
                          onMouseEnter={() => handleButtonHover(index)}
                          onMouseLeave={handleButtonLeave}
                        >
                          <AutorenewIcon />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid lightgray",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="fetched levels table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell sx={{fontWeight: "bold"}}>Level</StyledTableCell>
                  <StyledTableCell align="center" sx={{fontWeight: "bold"}}>
                    Minimum Amount
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{fontWeight: "bold"}}>
                    One-Time Bonus
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{fontWeight: "bold"}}>Awarded</StyledTableCell>
                  <StyledTableCell align="center" sx={{fontWeight: "bold"}}>
                    Monthly Bonus
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {fetchedLevels.map((level, index) => (
                  <StyledTableRow key={index} >
                    <StyledTableCell component="th" scope="row" sx={{fontWeight: "bold"}}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {level.minAmount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {level.oneTimeBonus}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {level.awarded}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {level.monthlyBonus}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default CommissionLevelsForm;