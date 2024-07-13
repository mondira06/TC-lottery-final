import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import axios from "axios";
import { domain } from "../../Components/config";

function SettingsMain() {
  const [upi, setUpi] = useState("");
  const [trx, setTrx] = useState("");
  const [image, setImage] = useState(null);
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");
  const [level4, setLevel4] = useState("");
  const [level5, setLevel5] = useState("");
  const [level1bet, setLevel1bet] = useState("");
  const [level2bet, setLevel2bet] = useState("");
  const [level3bet, setLevel3bet] = useState("");
  const [level4bet, setLevel4bet] = useState("");
  const [level5bet, setLevel5bet] = useState("");

  useEffect(() => {
    axios
      .get(`${domain}/Getid`, { withCredentials: true })
      .then(function (response) {
        setUpi(response.data.Upi);
        setTrx(response.data.Trx);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/fetch-commission-rates`, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        setLevel1(data.data.level1);
        setLevel2(data.data.level2);
        setLevel3(data.data.level3);
        setLevel4(data.data.level4);
        setLevel5(data.data.level5);
      })
      .catch((error) => {
        console.error("Error fetching commission rates:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/commissionRates-data-get`, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        setLevel1bet(data.level1);
        setLevel2bet(data.level2);
        setLevel3bet(data.level3);
        setLevel4bet(data.level4);
        setLevel5bet(data.level5);
      })
      .catch((error) => {
        console.error("Error fetching commission rates:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Upi", upi);
    data.append("Trx", trx);
    data.append("image", image);

    axios
      .post(`${domain}/upsertID`, data, { withCredentials: true })
      .then(function (response) {
        alert("Successful");
        setUpi("");
        setTrx("");
        setImage(null);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const formData = {
      level1: level1,
      level2: level2,
      level3: level3,
      level4: level4,
      level5: level5,
    };

    axios
      .put(`${domain}/update-commission-rates`, formData, {
        withCredentials: true,
      })
      .then(function (response) {
        alert("Successful");
        setLevel1("");
        setLevel2("");
        setLevel3("");
        setLevel4("");
        setLevel5("");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    const formData = {
      level1: level1bet,
      level2: level2bet,
      level3: level3bet,
      level4: level4bet,
      level5: level5bet,
    };

    axios
      .put(`${domain}/commissionRates`, formData, { withCredentials: true })
      .then(function (response) {
        alert("Successful");
        setLevel1bet("");
        setLevel2bet("");
        setLevel3bet("");
        setLevel4bet("");
        setLevel5bet("");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Settings
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{ p: 3, border: "1px solid #D9D9D9", borderRadius: "8px" }}
            >
              <Typography
                component="h1"
                variant="h5"
                align="center"
                gutterBottom
              >
                Update UPI / TRX Address
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="upi"
                  label="UPI Address"
                  name="upi"
                  autoComplete="upi"
                  autoFocus
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="trx"
                  label="Trx"
                  name="trx"
                  autoComplete="trx"
                  value={trx}
                  onChange={(e) => setTrx(e.target.value)}
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ margin: "16px 0" }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{ p: 3, border: "1px solid #D9D9D9", borderRadius: "8px" }}
            >
              <Typography
                component="h1"
                variant="h5"
                align="center"
                gutterBottom
              >
                Update Deposit Bonus Commission
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit2}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level1"
                  label="Level 1"
                  name="Level1"
                  autoComplete="level1"
                  value={level1}
                  onChange={(e) => setLevel1(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level2"
                  label="Level 2"
                  name="Level2"
                  autoComplete="level2"
                  value={level2}
                  onChange={(e) => setLevel2(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level3"
                  label="Level 3"
                  name="level3"
                  autoComplete="level3"
                  value={level3}
                  onChange={(e) => setLevel3(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level4"
                  label="Level 4"
                  name="Level4"
                  autoComplete="level4"
                  value={level4}
                  onChange={(e) => setLevel4(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level5"
                  label="Level 5"
                  name="level5"
                  autoComplete="level5"
                  value={level5}
                  onChange={(e) => setLevel5(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{ p: 3, border: "1px solid #D9D9D9", borderRadius: "8px" }}
            >
              <Typography
                component="h1"
                variant="h5"
                align="center"
                gutterBottom
              >
                Update Wengo Bet Commission
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit3}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level1"
                  label="Level 1"
                  name="Level1"
                  autoComplete="level1"
                  value={level1bet}
                  onChange={(e) => setLevel1bet(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level2"
                  label="Level 2"
                  name="Level2"
                  autoComplete="level2"
                  value={level2bet}
                  onChange={(e) => setLevel2bet(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level3"
                  label="Level 3"
                  name="level3"
                  autoComplete="level3"
                  value={level3bet}
                  onChange={(e) => setLevel3bet(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level4"
                  label="Level 4"
                  name="Level4"
                  autoComplete="level4"
                  value={level4bet}
                  onChange={(e) => setLevel4bet(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="level5"
                  label="Level 5"
                  name="level5"
                  autoComplete="level5"
                  value={level5bet}
                  onChange={(e) => setLevel5bet(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SettingsMain;
