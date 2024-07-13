import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { domain } from "../../Components/config";

const initialLevels = [
  { minAmount: 1000, oneTimeBonus: 100, awarded: "Bronze", monthlyBonus: 50 },
  { minAmount: 5000, oneTimeBonus: 250, awarded: "Silver", monthlyBonus: 100 },
  { minAmount: 10000, oneTimeBonus: 500, awarded: "Gold", monthlyBonus: 200 },
  { minAmount: 20000, oneTimeBonus: 1000, awarded: "Platinum", monthlyBonus: 300 },
  { minAmount: 50000, oneTimeBonus: 2000, awarded: "Diamond", monthlyBonus: 500 },
];

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: "#f5f5f5",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
}));

const CommissionLevelsForm = () => {
  const [levels, setLevels] = useState(initialLevels);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [fetchedLevels, setFetchedLevels] = useState([]);

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
      const res = await axios.put(`${domain}/update-unlock-commission`, { levels });
      setIsLoading(false);
      alert(res.data.msg); // Show success message
    } catch (error) {
      console.error("Error updating commission levels:", error);
      setIsLoading(false);
      alert("Failed to update commission levels. Please try again."); // Show error message
    }
  };

  const handleAddLevel = () => {
    const newLevel = {
      minAmount: "",
      oneTimeBonus: "",
      awarded: "",
      monthlyBonus: "",
    };
    setLevels([...levels, newLevel]);
  };

  return (
    <Box sx={{ maxWidth: "100%", width: "100%", margin: "auto", mt: 3, px: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Manage Commission Levels
      </Typography>
      <Paper elevation={3} sx={{ py: 3, px: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="commission-levels-tabs"
          sx={{ mb: 2 }}
        >
          {levels.map((level, index) => (
            <Tab key={index} label={`Level ${index + 1}`} />
          ))}
          <Tab label="Fetched Levels" sx={{ marginLeft: "auto" }} />
        </Tabs>
        {levels.map((level, index) => (
          <TabPanel key={index} value={selectedTab} index={index}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12} sm={6}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Level {index + 1}
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Minimum Amount"
                        name="minAmount"
                        value={levels[index].minAmount}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                        type="number"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="One-Time Bonus"
                        name="oneTimeBonus"
                        value={levels[index].oneTimeBonus}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                        type="number"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Awarded"
                        name="awarded"
                        value={levels[index].awarded}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Monthly Bonus"
                        name="monthlyBonus"
                        value={levels[index].monthlyBonus}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                        type="number"
                        sx={{ mb: 3 }}
                      />
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  fullWidth
                >
                  {isLoading ? "Updating..." : "Update Level"}
                </Button>
              </Grid>
            </form>
          </TabPanel>
        ))}
        <TabPanel value={selectedTab} index={levels.length}>
          <Grid container spacing={3}>
            {fetchedLevels.map((fetchedLevel, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <StyledCard sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Fetched Level {index + 1}
                    </Typography>
                    <Typography>
                      Minimum Amount: {fetchedLevel.minAmount}
                    </Typography>
                    <Typography>
                      One-Time Bonus: {fetchedLevel.oneTimeBonus}
                    </Typography>
                    <Typography>Awarded: {fetchedLevel.awarded}</Typography>
                    <Typography>
                      Monthly Bonus: {fetchedLevel.monthlyBonus}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

function TabPanel(props) {
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
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default CommissionLevelsForm;
