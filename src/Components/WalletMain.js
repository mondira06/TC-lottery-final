import React, { useEffect, useState } from "react";
import Mobile from "../Components/Mobile";
import IconButton from "@mui/material/IconButton";
import SmsIcon from "@mui/icons-material/Sms";
import DownloadIcon from "@mui/icons-material/Download";
import { Typography, Button, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { domain } from "./config";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth hook

const WalletMain = ({ children }) => {
  const [user, setUser] = useState(null);
  const [depositHistory, setDepositHistory] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [thirdPartyWalletBalance, setThirdPartyWalletBalance] = useState(0); // State for third party wallet balance

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Use useAuth hook to access isAuthenticated

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setVh);
    setVh();

    return () => window.removeEventListener("resize", setVh);
  }, []);

  const mainWalletBalance = user ? user.walletAmount : 0;
  const progressMainWallet = (mainWalletBalance / 10000) * 100;
  const progressThirdPartyWallet = (thirdPartyWalletBalance / 10000) * 100;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, {
          withCredentials: true,
        });
        console.log("inside wallet --->",response.data.user)
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        const response = await axios.get(`${domain}/user/depositHistory/sum`, {
          withCredentials: true,
        });
        setDepositHistory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDepositHistory();
  }, []);

  useEffect(() => {
    const fetchWithdrawAmount = async () => {
      try {
        const response = await axios.get(`${domain}/completed_withdraws_sum`, {
          withCredentials: true,
        });
        setWithdrawAmount(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWithdrawAmount();
  }, []);

  useEffect(() => {
    const fetchThirdPartyWalletBalance = async () => {
      try {
        const token = sessionStorage.getItem("token"); // Fetch the token from local storage
        console.log("token value --->", token);
        const response = await axios.get(
          `https://newgoagames.anotechsolutions.site/api/users/balance?token=${token}`
        );
        console.log("response--->", response.data.user[0].balance);
        setThirdPartyWalletBalance(response.data.user[0].balance);
      } catch (err) {
        console.error(err);
      }
    };

    fetchThirdPartyWalletBalance();
  }, []);

  const data = [
    { label: "Lottery", value: 6.01 },
    { label: "TB_Chess", value: 0.0 },
    { label: "Wickets9", value: 0.0 },
    { label: "CQ9", value: 0.0 },
    { label: "MG", value: 0.0 },
    { label: "JDB", value: 0.0 },
    { label: "CMD", value: 0.0 },
    { label: "SaBa", value: 0.0 },
    { label: "IM", value: 0.0 },
    { label: "EVO_Video", value: 0.0 },
    { label: "JILI", value: 0.0 },
    { label: "Card365", value: 0.0 },
    { label: "V8Card", value: 0.0 },
    { label: "AG_Video", value: 0.0 },
    { label: "DG", value: 0.0 },
    { label: "PG", value: 0.0 },
    { label: "WM_Video", value: 0.0 },
    { label: "TB", value: 0.0 },
  ];

  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        `${domain}/wallet/transfer-to-main`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          walletAmount: response.data.newWalletAmount,
        }));
        setThirdPartyWalletBalance(0); // Set third-party wallet balance to 0
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                background: "linear-gradient(to right,#ff9903, #e77404)",
                padding: "8px 16px",
                color: "white",
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Wallet </span>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <IconButton
                  color="inherit"
                  onClick={() => navigate("/messages")}
                >
                  <SmsIcon />
                </IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{ background: "linear-gradient(to right,#ff9903, #e77404)", height: "230px" }}
            >
              <Grid item xs={12}>
                <img
                  src="assets/images/wallets-55b46543.png"
                  alt="Placeholder"
                  width={50}
                  height={50}
                />
              </Grid>
              {/* Third Row */}
              <Grid item xs={12}>
                <Typography variant="h4" color={"white"}>{`\u20B9${
                  user ? user.walletAmount : " Loading"
                }`}</Typography>
                <Typography variant="body1" color={"white"}>
                  Total balance
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color={"white"}>{`\u20B9${
                  withdrawAmount ? withdrawAmount.totalBalance : " Loading"
                }`}</Typography>
                <Typography variant="body1" color={"white"}>
                  Total Amount
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ marginBottom: "50px" }}>
                <Typography variant="h6" color={"white"}>{`\u20B9${
                  depositHistory ? depositHistory.totalDeposit : " Loading"
                }`}</Typography>
                <Typography variant="body1" color={"white"}>
                  Total Deposit Amount
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              mt={2}
              sx={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "95%",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
              }}
            >
              {/* First Grid */}
              <Grid item xs={6} mt={2}>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={80}
                    sx={{ color: "black" }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={80}
                    sx={{ color: "#ec8a1f", position: "absolute" }}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ color: "black" }}
                    >
                      {`${Math.round(progressMainWallet)}%`}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ color: "black" }}>
                  Main Wallet
                </Typography>
                <Typography variant="h6" sx={{ color: "black" }}>{`\u20B9${
                  user ? user.walletAmount : " Loading"
                }`}</Typography>
              </Grid>
              <Grid item xs={6} mt={2}>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={80}
                    sx={{ color: "#D8D8D8" }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={progressThirdPartyWallet}
                    size={80}
                    sx={{ color: "#ec8a1f", position: "absolute" }}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ color: "black" }}
                    >
                      {`${Math.round(progressThirdPartyWallet)}%`}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ color: "black" }}>
                  3rd Party Wallet
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "black" }}
                >{`₹${thirdPartyWalletBalance}`}</Typography>
              </Grid>
              {/* Second Grid */}
              <Grid item xs={12} mt={2}>
              <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right,#ff9903, #e77404)",
                borderRadius: "20px",
                width: "80%",
                fontWeight: "bold"
              }}
              fullWidth
              onClick={handleTransfer}
            >
                  Main wallet transfer
                  </Button>
              </Grid>
              {/* Third Grid */}
              <Grid container item xs={12} spacing={2} mt={2}>
                <Grid item xs={3} onClick={() => navigate("/recharge")}>
                  <img
                    src="assets/images/rechargeIcon.png"
                    alt="1"
                    width={55}
                    height={55}
                  />
                  <Typography variant="subtitle2" sx={{ color: "#768096" }}>
                    Deposit{" "}
                  </Typography>
                </Grid>
                <Grid item xs={3} onClick={() => navigate("/withdraw")}>
                  <img
                    src="assets/images/widthdrawBlue.png"
                    alt="2"
                    width={55}
                    height={55}
                  />
                  <Typography variant="subtitle2" sx={{ color: "#768096" }}>
                    Withdraw
                  </Typography>
                </Grid>
                <Grid item xs={3} onClick={() => navigate("/deposit-history")}>
                  <img
                    src="assets/images/rechargeHistory.png"
                    alt=" 3"
                    width={55}
                    height={55}
                  />
                  <Typography variant="subtitle2" sx={{ color: "#768096" }}>
                    Deposit history
                  </Typography>
                </Grid>
                <Grid item xs={3} onClick={() => navigate("/withdraw-history")}>
                  <img
                    src="assets/images/withdrawHistory.png"
                    alt="4"
                    width={55}
                    height={55}
                  />
                  <Typography variant="subtitle2" sx={{ color: "#768096" }}>
                    Withdraw History
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ p: 2, borderRadius: 1, marginBottom: "100px" }}>
              <Grid container spacing={2}>
                {data.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Box
                      sx={{ background: "linear-gradient(to right,#ff9903, #e77404)", p: 1, borderRadius: 1 }}
                    >
                      <Typography variant="body1" sx={{ color: "white" }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "white" }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {/* content end */}
          </Box>

          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default WalletMain;
