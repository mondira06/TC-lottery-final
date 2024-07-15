import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
  Tabs,
  Tab,
  Paper,
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
  const [values, setValues] = useState(0);

  useEffect(() => {
    axios
      .get(`${domain}/Getid`, { withCredentials: true })
      .then((response) => {
        setUpi(response.data.Upi);
        setTrx(response.data.Trx);
      })
      .catch((error) => {
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
      .then((response) => {
        alert("Successful");
        setUpi("");
        setTrx("");
        setImage(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const formData = {
      level1,
      level2,
      level3,
      level4,
      level5,
    };

    axios
      .put(`${domain}/update-commission-rates`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        alert("Successful");
        setLevel1("");
        setLevel2("");
        setLevel3("");
        setLevel4("");
        setLevel5("");
      })
      .catch((error) => {
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
      .then((response) => {
        alert("Successful");
        setLevel1bet("");
        setLevel2bet("");
        setLevel3bet("");
        setLevel4bet("");
        setLevel5bet("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTabChange = (event, newValue) => {
    setValues(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  return (
    <Container maxWidth="lg"  sx={{minHeight:"85vh"}}> 
      <CssBaseline />
      <Box >
       
        <Paper  sx={{boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",paddingTop:"20px",marginTop:"60px" }}>

        <Typography variant="h5" align="left" sx={{ml: 4, marginBottom:"20px",marginTop:"20px"}}>
          <b>Updates</b>
        </Typography>

          <Tabs
              value={values}
             
              // TabIndicatorProps={{ style: { display: "none" } }}
              variant="fullWidth"
            onChange={handleTabChange}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
            aria-label="settings tabs"
          >
            <Tab
              label="Update UPI / TRX Address"
              sx={{
                color: values === 0 ? "#F2F2F2" : "#A8A5A1",
              }}
            />
            <Tab
              label="Update Deposit Bonus Commission"
              sx={{
                color: values === 1 ? "#F2F2F2" : "#A8A5A1",
              }}
            />
            <Tab
              label="Update Wengo Bet Commission"
              sx={{
                color: values=== 2 ? "#F2F2F2" : "#A8A5A1",
              }}
            />
          </Tabs>
          <TabPanel value={values} index={0}>
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
                  defaultValue={upi}
                  onBlur={(e) => setUpi(e.target.value)}
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
                  margin="normal"
                  required
                  fullWidth
                  id="trx"
                  label="Trx"
                  name="trx"
                  autoComplete="trx"
                  defaultValue={trx}
                  onBlur={(e) => setTrx(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& fieldset": {
                        borderColor: "black",
                      },
                    },
                    marginBottom: { xs: "10px", sm: "0" },
                  }}
                />
                <input
                  type="file"
                  onBlur={(e) => setImage(e.target.files[0])}
                  style={{ margin: "16px 0" }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#F78D02",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={values} index={1}>
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
                  defaultValue={level1}
                  onBlur={(e) => setLevel1(e.target.value)}
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
                  margin="normal"
                  required
                  fullWidth
                  id="level2"
                  label="Level 2"
                  name="Level2"
                  autoComplete="level2"
                  defaultValue={level2}
                  onBlur={(e) => setLevel2(e.target.value)}
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
                  margin="normal"
              required
              fullWidth
              id="level3"
              label="Level 3"
              name="level3"
              autoComplete="level3"
              defaultValue={level3}
              onBlur={(e) => setLevel3(e.target.value)}
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
              margin="normal"
              required
              fullWidth
              id="level4"
              label="Level 4"
              name="Level4"
              autoComplete="level4"
              defaultValue={level4}
              onBlur={(e) => setLevel4(e.target.value)}
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
              margin="normal"
              required
              fullWidth
              id="level5"
              label="Level 5"
              name="level5"
              autoComplete="level5"
              defaultValue={level5}
              onBlur={(e) => setLevel5(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                },
                marginBottom: { xs: "10px", sm: "0" },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#F78D02",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={values} index={2}>
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
              defaultValue={level1bet}
              onBlur={(e) => setLevel1bet(e.target.value)}
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
              margin="normal"
              required
              fullWidth
              id="level2"
              label="Level 2"
              name="Level2"
              autoComplete="level2"
              defaultValue={level2bet}
              onBlur={(e) => setLevel2bet(e.target.value)}
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
              margin="normal"
              required
              fullWidth
              id="level3"
              label="Level 3"
              name="level3"
              autoComplete="level3"
              defaultValue={level3bet}
              onBlur={(e) => setLevel3bet(e.target.value)}
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
              margin="normal"
              required
              fullWidth
              id="level4"
              label="Level 4"
              name="Level4"
              autoComplete="level4"
              defaultValue={level4bet}
              onBlur={(e) => setLevel4bet(e.target.value)}
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
              margin="normal"
              required
              fullWidth
              id="level5"
              label="Level 5"
              name="level5"
              autoComplete="level5"
              defaultValue={level5bet}
              onBlur={(e) => setLevel5bet(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                },
                marginBottom: { xs: "10px", sm: "0" },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#F78D02",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </TabPanel>
    </Paper>
  </Box>
</Container>
);
}

export default SettingsMain;