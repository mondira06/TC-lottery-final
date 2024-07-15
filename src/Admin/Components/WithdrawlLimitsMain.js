import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { domain } from "../../Components/config";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

const WithdrawlLimitsMain = () => {
  const classes = useStyles();
  const [settings, setSettings] = useState({
    id: "",
    withdrawalStartHour: "",
    withdrawalStartPeriod: "AM",
    withdrawalEndHour: "",
    withdrawalEndPeriod: "PM",
    maxWithdrawRequestsPerDay: "",
    minWithdrawAmount: "",
    maxWithdrawAmount: "",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${domain}/settings-modify-withdrawl`,
        settings,
        { withCredentials: true }
      );
      alert("Successfully submitted");
    } catch (err) {
      console.error(err);
      alert(`An error occurred: ${err.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ minHeight: "85vh" }}>
      <Paper className={classes.paper} elevation={3}>
        <Typography
          variant="h5"
          align="left"
          fontWeight="bold"
          gutterBottom
          style={{ paddingLeft: "6px" }}
        >
          {" "}
          Modify Withdrawal Limits
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="withdrawalStartHour"
                label="Withdrawal Start Hour"
                variant="outlined"
                fullWidth
                value={settings.withdrawalStartHour}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                name="withdrawalStartPeriod"
                label="Start Period"
                variant="outlined"
                fullWidth
                value={settings.withdrawalStartPeriod}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="withdrawalEndHour"
                label="Withdrawal End Hour"
                variant="outlined"
                fullWidth
                value={settings.withdrawalEndHour}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                name="withdrawalEndPeriod"
                label="End Period"
                variant="outlined"
                fullWidth
                value={settings.withdrawalEndPeriod}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="maxWithdrawRequestsPerDay"
                label="Max Withdraw Requests Per Day"
                variant="outlined"
                fullWidth
                value={settings.maxWithdrawRequestsPerDay}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="minWithdrawAmount"
                label="Min Withdraw Amount"
                variant="outlined"
                fullWidth
                value={settings.minWithdrawAmount}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="maxWithdrawAmount"
                label="Max Withdraw Amount"
                variant="outlined"
                fullWidth
                value={settings.maxWithdrawAmount}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            sx={{
              backgroundColor: "#F78D02",
              color: "white",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default WithdrawlLimitsMain;