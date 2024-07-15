import React, { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../../Components/config";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const getColorForNumber = (number) => {
  const colorMap = {
    0: "linear-gradient(to right, #d13838, #9a47da)",
    1: "#16b15e",
    2: "#d23838",
    3: "#16b15e",
    4: "#d23838",
    5: "linear-gradient(to right, #19b25f, #9a47da)",
    6: "#d23838",
    7: "#16b15e",
    8: "#d23838",
    9: "#16b15e",
  };

  const color = colorMap[number];
  return color;
};

const GamesContent = () => {
  const [data, setData] = useState({});
  const [selectedTimer, setSelectedTimer] = useState("1min");
  const [manualResult, setManualResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await axios.get(`${domain}/latest-bet-sums`, {
        withCredentials: true,
      });
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimerChange = async (event) => {
    setSelectedTimer(event.target.value);
    fetchData();
  };

  const handleManualResultChange = (event) => {
    setManualResult(event.target.value);
  };

  const handleSubmit = async () => {
    const postData = {
      periodId: data[selectedTimer]?.periodId,
      result: manualResult,
      timer: selectedTimer,
    };

    try {
      setIsLoading(true);
      setError(null);
      await axios.post(`${domain}/set-manual-result`, postData, {
        withCredentials: true,
      });
      alert("Manual result set successfully!");
    } catch (error) {
      console.error("Error setting manual result:", error);
      alert("Failed to set manual result. Please try again.");
      setError("Failed to set manual result. Please try again.");
    } finally {
      setIsLoading(false);
      fetchData(); // Refresh data after submitting
    }
  };

  const renderGrid = (betSums) => (
    <Grid container spacing={3}>
  <Grid item xs={12}>
    <Typography variant="h5" align="center" gutterBottom>
      Period ID: <span style={{ color: "red" }}>{betSums.periodId}</span>
    </Typography>
  </Grid>
  {betSums.numberBetSums.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
      <Paper style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="body1">Number: {item.number}</Typography>
        <div
          style={{
            background: getColorForNumber(item.number),
            color: "white",
            padding: "10px",
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          <Typography variant="body2">Total Bet: {item.totalBet}</Typography>
        </div>
      </Paper>
    </Grid>
  ))}
  {Object.entries(betSums.sizeBetSums).map(([key, value]) => (
    <Grid item xs={12} sm={6} md={4} lg={2.4} key={key}>
      <Paper style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="body1">Size: {key}</Typography>
        <div
          style={{
            backgroundColor: key === "big" ? "#5088d3" : "#dd9138",
            color: "white",
            padding: "10px",
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          <Typography variant="body2">Total Bet: {value}</Typography>
        </div>
      </Paper>
    </Grid>
  ))}
  {Object.entries(betSums.colorBetSums).map(([key, value]) => (
    <Grid item xs={12} sm={6} md={4} lg={2.4} key={key}>
      <Paper style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="body1">Color: {key}</Typography>
        <div
          style={{
            backgroundColor:
              key === "green"
                ? "#40ad72"
                : key === "red"
                ? "#fd565d"
                : key === "violet"
                ? "#b659ff"
                : "defaultColor",
            color: "white",
            padding: "10px",
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          <Typography variant="body2">Total Bet: {value}</Typography>
        </div>
      </Paper>
    </Grid>
  ))}
</Grid>

  
  );

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          select
          value={selectedTimer}
          onChange={handleTimerChange}
          variant="outlined"
          sx={{
            width: { xs: "150px", sm: "200px" },
            "& .MuiInputBase-root": {
              height: { xs: "40px", sm: "50px" },
              fontSize: { xs: "16px", sm: "20px" },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "gold",
              },
            },
          }}
        >
          <MenuItem value="1min">1min</MenuItem>
          <MenuItem value="3min">3min</MenuItem>
          <MenuItem value="5min">5min</MenuItem>
          <MenuItem value="10min">10min</MenuItem>
        </TextField>
      </Box>
      {isLoading ? (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="body1" align="center" style={{ color: "red" }}>
          {error}
        </Typography>
      ) : (
        data[selectedTimer] && renderGrid(data[selectedTimer])
      )}
      <Box sx={{ marginTop: { xs: "20px", sm: "40px" }, textAlign: "center" }}>
        <Card
          sx={{
            maxWidth: { xs: 300, sm: 600 },
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
              Set Manual Result
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <TextField
                select
                label="Select Timer"
                value={selectedTimer}
                onChange={handleTimerChange}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              >
                <MenuItem value="1min">1min</MenuItem>
                <MenuItem value="3min">3min</MenuItem>
                <MenuItem value="5min">5min</MenuItem>
                <MenuItem value="10min">10min</MenuItem>
              </TextField>
              <TextField
                label="Latest Period ID"
                value={data[selectedTimer]?.periodId || ""}
                disabled
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
              <TextField
                select
                label="Choose Result"
                value={manualResult}
                onChange={handleManualResultChange}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              >
                {[...Array(9)].map((_, index) => (
                  <MenuItem key={index} value={`${index + 1}`}>
                    {index + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
          <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{
            mt: 2,
            backgroundColor: "#F78D02",
            color: "color",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Submit
        </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default GamesContent;