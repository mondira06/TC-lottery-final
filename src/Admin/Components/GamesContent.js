import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from '../../Components/config';
import { Grid, Paper, Typography, Button, TextField, MenuItem, Box, Card, CardContent, CardActions } from "@mui/material";

const numberColorMap = {
  "0": ["violet", "red"],
  "1": "green",
  "2": "red",
  "3": "green",
  "4": "red",
  "5": ["violet", "green"],
  "6": "red",
  "7": "green",
  "8": "red",
  "9": "green",
};

const GamesContent = () => {
  const [data, setData] = useState({});
  const [selectedTimer, setSelectedTimer] = useState('1min');
  const [manualResult, setManualResult] = useState('');
  const [colorOutcome, setColorOutcome] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${domain}/latest-bet-sums`, { withCredentials: true });
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleTimerChange = async (event) => {
    setSelectedTimer(event.target.value);
    const result = await axios.get(`${domain}/latest-bet-sums`, { withCredentials: true });
    setData(result.data);
  };

  const handleManualResultChange = (event) => {
    const result = event.target.value;
    setManualResult(result);
    setColorOutcome(numberColorMap[result]);
  };

  const handleSubmit = async () => {
    const postData = {
      periodId: data[selectedTimer]?.periodId,
      numberOutcome: manualResult,
      colorOutcome: numberColorMap[manualResult],
      sizeOutcome: determineSize(manualResult),
      timer: selectedTimer
    };

    try {
      await axios.post(`${domain}/set-manual-result`, postData, { withCredentials: true });
      alert('Manual result set successfully!');
    } catch (error) {
      console.error('Error setting manual result:', error);
      alert('Failed to set manual result. Please try again.');
    }
  };

  const determineSize = (numberOutcome) => {
    const number = parseInt(numberOutcome);
    if (number >= 0 && number <= 4) {
      return 'small';
    } else if (number >= 5 && number <= 9) {
      return 'big';
    } else {
      return ''; // Handle other cases as needed
    }
  };

  const renderGrid = (betSums) => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Period ID: <span style={{ color: "red" }}>{betSums.periodId}</span>
          </Typography>
        </Grid>
        {betSums.numberBetSums.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="body1">Number: {item.number}</Typography>
              <Typography variant="body2" sx={{ color: "green" }}>Total Bet: {item.totalBet}</Typography>
            </Paper>
          </Grid>
        ))}
        {Object.entries(betSums.sizeBetSums).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="body1">Size: {key}</Typography>
              <Typography variant="body2" sx={{ color: "red" }}>Total Bet: {value}</Typography>
            </Paper>
          </Grid>
        ))}
        {Object.entries(betSums.colorBetSums).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="body1">Color: {key}</Typography>
              <Typography variant="body2" sx={{ color: "blue" }}>Total Bet: {value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          select
          value={selectedTimer}
          onChange={handleTimerChange}
          variant="outlined"
          sx={{
            width: '200px',
            '& .MuiInputBase-root': {
              height: '50px',
              fontSize: '20px',
            },
          }}
        >
          <MenuItem value="1min">1min</MenuItem>
          <MenuItem value="3min">3min</MenuItem>
          <MenuItem value="5min">5min</MenuItem>
          <MenuItem value="10min">10min</MenuItem>
        </TextField>
      </Box>
      {data[selectedTimer] && renderGrid(data[selectedTimer])}
      <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
        <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Set Manual Result</Typography>
            <Box sx={{ display: 'grid', gap: '20px', padding: '20px' }}>
              <TextField
                select
                label="Select Timer"
                value={selectedTimer}
                onChange={handleTimerChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="1min">1min</MenuItem>
                <MenuItem value="3min">3min</MenuItem>
                <MenuItem value="5min">5min</MenuItem>
                <MenuItem value="10min">10min</MenuItem>
              </TextField>
              <TextField
                label="Latest Period ID"
                value={data[selectedTimer]?.periodId || ''}
                disabled
                variant="outlined"
                fullWidth
              />
              <TextField
                select
                label="Choose Result"
                value={manualResult}
                onChange={handleManualResultChange}
                variant="outlined"
                fullWidth
              >
                {[...Array(9)].map((_, index) => (
                  <MenuItem key={index} value={`${index + 1}`}>
                    {index + 1}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Color Outcome"
                value={colorOutcome}
                disabled
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Size Outcome"
                value={determineSize(manualResult)}
                disabled
                variant="outlined"
                fullWidth
              />
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default GamesContent;
