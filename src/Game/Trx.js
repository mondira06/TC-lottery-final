import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Mobile from "../Components/Mobile";
import { Typography, Grid, Box, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Button } from "@mui/material";
import { Refresh, AccountBalanceWallet, VolumeUp } from "@mui/icons-material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import { wssdomain } from "../Components/config";
import Popup from "./Popup";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  Tabs,
  Tab,
  Divider,
  Pagination,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Drawer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import RowVisualization from "./Chart";
import CustomTable from "./Custom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, styled } from "@mui/material";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";

import axios from "axios";
import "../App.css";
import { domain } from "../Components/config";

const countdownSound = new Audio("/assets/sound.mp3");
countdownSound.loop = true;

const images = [
  {
    id: 1,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a99.png",
    subtitle: "1Min",
  },
  {
    id: 2,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a99.png",
    subtitle: "3Min",
  },
  {
    id: 3,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a99.png",
    subtitle: "5Min",
  },
  {
    id: 4,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a99.png",
    subtitle: "10Min",
  },
];

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButtonGroup-grouped": {
    border: "none",
    "&:not(:last-of-type)": {
      borderRight: "1px solid #117B15E",
    },
  },
}));
const StyledButton = styled(Button)(({ theme, active }) => ({
  backgroundColor: active ? '#17B15E' : '#FFFFFF',
  color: '#768096',
  fontSize: '0.875rem',
  padding: '3px 8px', // Reduced padding
  '&:hover': {
    backgroundColor: '#17B15E',
    color:"white"
  },
  '&.random': {
    backgroundColor: '#117B15E',
    border: "1px solid #D23838",
    borderRadius:"10px",
   color:"#D23838",
    paddingLeft: '10px', // Reduced padding
    paddingRight: '10px',
    gap:2,// Reduced padding
    '&:hover': {
      backgroundColor: '#D23838',
      color:"white"
    },
  },
}));
const multipliers = [
  { label: "Random", value: "random", isRandom: true },
  { label: "X1", value: 1 },
  { label: "X5", value: 5 },
  { label: "X10", value: 10 },
  { label: "X20", value: 20 },
  { label: "X50", value: 50 },
  { label: "X100", value: 100 },
];

const LotteryAppt = () => {
  const [activeId, setActiveId] = useState(images[0].id);
  const [selectedTimer, setSelectedTimer] = useState("1Min");
  const [timer, setTimer] = useState(60); // 60 seconds = 1 minute
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [winner, setWinner] = useState(null);
  const [periodId, setPeriodId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [totalBet, setTotalBet] = useState(0);
  const [betPlaced, setBetPlaced] = useState(false);
  const [betPeriodId, setBetPeriodId] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [popupresult, setPopupResult] = useState(0);
  const [popupperiodid, setPopupPeriodId] = useState(0);
  const [winloss, setWinLoss] = useState(0);
  const [popupTimer, setPopupTimer] = useState(0);
  const [gameResult, setGameResult] = useState("");
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastAlertedPeriodId, setLastAlertedPeriodId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bets, setBets] = useState([]);
  const [popupperiod, setPopupPeriod] = useState(0);

  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isBig, setIsBig] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsSmall(true);
        setIsBig(false);
      } else {
        setIsSmall(false);
        setIsBig(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set the initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const socket = new WebSocket(`${wssdomain}/`); // Connect to WebSocket server

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.timers && data.timers[selectedTimer]) {
        setPeriodId(data.timers[selectedTimer].periodId); // Set the periodId
        setRemainingTime(data.timers[selectedTimer].remainingTime); // Set the remainingTime
      } else {
        console.error("Unexpected data structure", data);
      }
    };

    return () => socket.close(); // Cleanup WebSocket connection
  }, [selectedTimer]);

  const timeParts = (remainingTime || "00:00").split(":");
  const minutes = timeParts[0] || "00";
  const seconds = timeParts[1] || "00";
  const [lastPlayedTime, setLastPlayedTime] = useState(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/trxresultroute/`, {
          withCredentials: true,
        });
        // console.log("Full response data:", response.data);

        if (response.data && response.data) {
          const filteredData = response.data.filter((item) => {
            // console.log("Item timer:", item.timer);
            // console.log("Selected timer:", selectedTimer);
            return item.timer === selectedTimer;
          });
          // console.log("Filtered data:", filteredData);
          setRows(filteredData);
        } else {
          console.error("Response data does not contain Result");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 1000);
    return () => clearInterval(intervalId);
  }, [selectedTimer]);

  useEffect(() => {
    handleClick(images[0].id);
  }, []);

  const handleClick = (id) => {
    let timerKey;
    switch (id) {
      case 1:
        timerKey = "1min";
        break;
      case 2:
        timerKey = "3min";
        break;
      case 3:
        timerKey = "5min";
        break;
      case 4:
        timerKey = "10min";
        break;
      default:
        timerKey = "1min";
    }
    console.log("Selected timer key:", timerKey);
    setSelectedTimer(timerKey);
    setActiveId(id);
  };

  const textArray = [
    "ATTENTION TC ! Live chats are available on our apps/website",
    "Second message",
    "Third message",
  ];

  const [index, setIndex] = React.useState(0);
  const [inProp, setInProp] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setInProp(false);

      setTimeout(() => {
        setIndex((oldIndex) => {
          return (oldIndex + 1) % textArray.length;
        });
        setInProp(true);
      }, 500); // This should be equal to the exit duration below
    }, 3000); // Duration between changing texts

    return () => clearInterval(timer);
  }, []);

  //   table
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  // ...
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/"); // Replace '/path-to-page' with the actual path
  };

  const navigateToPage1 = () => {
    navigate("/recharge"); // Replace '/path-to-page' with the actual path
  };

  const navigateToPage2 = () => {
    navigate("/withdraw"); // Replace '/path-to-page' with the actual path
  };

  const handleOpenDrawer = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
  };

  const handleMultiplier = (multiplier) => {
    setMultiplier(multiplier);
  };

  const handleTotalBet = () => {
    setTotalBet(betAmount * multiplier);
  };

  const handlePlaceBet = async () => {
    const totalBet = betAmount * multiplier;

    // Check if user's wallet balance is less than the total bet amount
    if (betAmount === 1) {
      alert("You can't place a bet with 0 amount.");
      return;
    }
    if (user.walletAmount < totalBet) {
      alert("You don't have enough balance to place this bet.");
      return;
    }
    if (
      ["00:06", "00:05", "00:04", "00:03", "00:02", "00:01"].includes(
        remainingTime
      )
    ) {
      alert("You can't place a bet in the last 5 seconds.");
      return;
    }

    console.log("Multiplier --->", multiplier);

    const betData = {
      selectedItem: selectedItem,
      betAmount: betAmount,
      multiplier: multiplier,
      totalBet: totalBet,
      selectedTimer: selectedTimer,
      periodId: periodId,
      result: " ",
      status: " ",
      winLoss: "",
    };
    console.log("betData --->", betData);
    setLastAlertedPeriodId(periodId);
    // Send a POST request to the backend API endpoint
    try {
      const response = await axios.post(`${domain}/trxbet/`, betData, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }

    setBetPlaced(true);
    setBetPeriodId(periodId);
    handleCloseDrawer();
    setOpenSnackbar(true);
  };

  const handleCancelBet = () => {
    setSelectedItem("");
    setBetAmount(0);
    setMultiplier(1);
    setTotalBet(0);
    handleCloseDrawer();
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  useEffect(() => {
    handleClick(images[0].id);
  }, []);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  useEffect(() => {
    if (["00:05","00:04","00:03", "00:02", "00:01"].includes(remainingTime)) {
      setOpenDialog(true);
      if (isSoundOn && remainingTime !== lastPlayedTime) {
        countdownSound.play();
        setLastPlayedTime(remainingTime);
        setTimeout(() => {
          countdownSound.pause();
          countdownSound.currentTime = 0;
        }, 1000 - countdownSound.duration * 1000);
      }
    } else if (remainingTime === "00:00") {
      setOpenDialog(false);
      if (isSoundOn) {
        countdownSound.pause();
        countdownSound.currentTime = 0;
        setLastPlayedTime(null);
      }
    }
  }, [remainingTime, isSoundOn]);

  const [selectedColor, setSelectedColor] = useState("RGB(71,129,255)");
  const handleEventSelection = (event) => {
    switch (event) {
      case "violet":
        setSelectedColor("#9B48DB");
        break;
      case "green":
        setSelectedColor("RGB(64,173,114)");
        break;
      case "red":
        setSelectedColor("RGB(253,86,92)");
        break;
      case "yellow":
        setSelectedColor("RGB(71,129,255)");
        break;
      case "blue":
        setSelectedColor("RGB(253,86,92)");
        break;
      case "big":
        setSelectedColor("rgb(255,168,46)");
        break;
      case "mix1":
        setSelectedColor(
          "linear-gradient(to right, rgb(253,86,92) 50%, rgb(182,89,254) 50%)"
        );
        break;
      case "mix2":
        setSelectedColor(
          "linear-gradient(to right, rgb(64,173,114) 50%, rgb(182,89,254) 50%)"
        );
        break;
      default:
        setSelectedColor("RGB(71,129,255)");
    }
  };
  const [activeButton, setActiveButton] = useState(1);
  const [activeBetAmount, setActiveBetAmount] = useState(1);
  const [customBetAmount, setCustomBetAmount] = useState("");

  const handleCustomBetChange = (event) => {
    const betAmount = parseFloat(event.target.value);
    setCustomBetAmount(event.target.value);
    if (!isNaN(betAmount) && betAmount > 0) {
      handleBetAmount(betAmount);
      setActiveBetAmount(betAmount);
    }
  };

  const getColorAndSize = (popupresult) => {
    popupresult = Number(popupresult);

    let color = "unknown";

    if ([1, 3, 7, 9].includes(popupresult)) {
      color = "green";
    } else if ([2, 4, 6, 8].includes(popupresult)) {
      color = "red";
    } else if (popupresult === 0) {
      color = "red and violet";
    } else if (popupresult === 5) {
      color = "green and violet";
    }

    return `${color} ${popupresult} `;
  };

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchUserData = async () => {
      // console.log("fetchUserData called");
      try {
        const response = await axios.get(`${domain}/user/trxbethistory/`, {
          withCredentials: true,
        });
        // console.log("--->",response.data)
        setBets(response.data);
        // console.log("--------->",response.data)
        // console.log("latestBet-->",response.data[0])
        let latestBet = response.data[0];
        // console.log("Latest bet ",latestBet);
        if (latestBet.periodId == lastAlertedPeriodId) {
          console.log(
            "Latest bet periodId is the same as the last alerted periodId"
          );
          if (latestBet.status === "lost") {
            console.log("Latest bet status is FAIL");
            setOpen(true);
            setDialogContent("You lost the bet");
            setGameResult(latestBet.status);
            setWinLoss(latestBet.winLoss);
            setPopupPeriod(latestBet.selectedItem);
            setPopupResult(latestBet.result);
            setPopupPeriodId(latestBet.periodId);
            setPopupTimer(latestBet.selectedTimer);
            setLastAlertedPeriodId(null);
          } else if (latestBet.status === "Succeed") {
            setOpen(true);
            setDialogContent("Bonus");
            setGameResult(latestBet.status);
            setWinLoss(latestBet.winLoss);
            setPopupPeriod(latestBet.selectedItem);
            setPopupResult(latestBet.result);
            setPopupPeriodId(latestBet.periodId);
            setPopupTimer(latestBet.selectedTimer);
            setLastAlertedPeriodId(null);
          }
        } else {
          // console.log("Latest bet periodId is not the same as the last alerted periodId");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 1000);

    return () => clearInterval(intervalId);
  }, [periodId, lastAlertedPeriodId]);

  useEffect(() => {
    setTotalBet(betAmount * multiplier);
  }, [betAmount, multiplier]);

  const [lastFiveCharacters, setLastFiveCharacters] = useState([]);

  useEffect(() => {
    // Function to fetch the latest period ID's hash
    const fetchLatestHash = () => {
      // Assuming `rows` is an array of objects, get the latest row based on period ID
      const latestRow =
        rows && rows.length > 0
          ? rows.reduce(
              (latest, row) => (row.periodId > latest.periodId ? row : latest),
              rows[0]
            )
          : null;

      const hash = latestRow && latestRow.hash ? latestRow.hash : "";

      if (hash) {
        const characters = hash.slice(-5).split("");
        setLastFiveCharacters(characters);
      }
    };

    fetchLatestHash();
    const timer = setInterval(fetchLatestHash, selectedTimer);
    return () => clearInterval(timer);
  }, [rows, selectedTimer]);

  const [selectedMultiplier, setSelectedMultiplier] = useState(1);

  const handleMultiplierChange = (multiplier) => {
    if (!multiplier.isRandom) {
      setSelectedMultiplier(multiplier.value);
    } else {
      // In a real app, you'd generate a random multiplier here
      const randomMultipliers = [1, 5, 10, 20, 50, 100];
      const randomIndex = Math.floor(Math.random() * randomMultipliers.length);
      setSelectedMultiplier(randomMultipliers[randomIndex]);
    }
  };
  const periodNumber = "20240322130064";
  const drawTime = "00312";
  const numbers = ["2", "5", "E", "D", "C"];

  return (
    <div>
      <Mobile>
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
            <IconButton color="inherit" onClick={navigateToPage}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <IconButton color="inherit">
              <SupportAgentIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => setIsSoundOn(!isSoundOn)}
            >
              {isSoundOn ? <MusicNoteIcon /> : <MusicOffIcon />}
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          sx={{
            height: "300px",
            background: "linear-gradient(to right,#ff9903, #e77404)",
            borderRadius: "0 0 70px 70px",
            textAlign: "center",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "#ffffff",
              margin: "0 20px 20px 20px",
              borderRadius: "30px",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <Grid
              sm={12}
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                {user ? user.walletAmount : " Loading"}
              </Typography>
              <IconButton sx={{ color: "grey" }}>
                <Refresh />
              </IconButton>
            </Grid>

            <Grid
              sm={12}
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountBalanceWallet
                sx={{ marginRight: "10px", color: "rgb(255,60,82)" }}
              />
              <Typography variant="subtitle2" sx={{ color: "black" }}>
                Wallet Balance
              </Typography>
            </Grid>
            <Grid
              sm={12}
              mt={3}
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={navigateToPage2}
                fullWidth
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#d23838",
                  borderRadius: "50px",
                }}
              >
                Withdraw
              </Button>
              <Button
                variant="contained"
                onClick={navigateToPage1}
                fullWidth
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#16b15e",
                  borderRadius: "50px",
                }}
              >
                Deposit
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              backgroundColor: "#fffbe8",
              margin: "0 20px 20px 20px",
              borderRadius: "3px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton>
              <VolumeUp sx={{ color: "rgb(238,138,31)" }} />
            </IconButton>
            <CSSTransition
              in={inProp}
              timeout={500}
              classNames="message"
              unmountOnExit
            >
              <Typography variant="caption" sx={{ color: "#e77402" }}>
                {textArray[index]}
              </Typography>
            </CSSTransition>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "rgb(235,138,31)",
                paddingRight: "12px",
                width: "90px",
                borderRadius: "20px",
                minWidth: "90px",
              }}
            >
              Details
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "95%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "-50px",
            backgroundColor: "#ffffff",
            borderRadius: "30px",
          }}
        >
          {images.map((image) => (
            <Grid
              item
              xs={3}
              key={image.id}
              onClick={() => handleClick(image.id)}
              style={{
                cursor: "pointer",
                border:
                  activeId === image.id
                    ? '1px solid  "linear-gradient(to top,#ff9903, #e77404)"'
                    : "#e8edf5",
                background:
                  activeId === image.id ? "linear-gradient(to bottom,#ff9903, #e77404)" : "transparent",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Align items horizontally
                justifyContent: "center", // Align items vertically
              }}
            >
              <img
                src={activeId === image.id ? image.altSrc : image.src}
                alt={image.subtitle}
                style={{ width: "80%" }}
              />
              <Typography variant="caption" sx={{ color: activeId === image.id ? "white" : "grey", }}>
                {image.subtitle}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "30vh",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "95%",
            backgroundImage: 'url("games/assets/trxbg-21e5d8112.png")',
            backgroundSize: "100% 100%", // Force image to fit container's size
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between", // Distribute space between the items
              alignItems: "center",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                flex: "0 1 auto", // Take up available space evenly
                maxWidth: "calc(20% - 10px)", // Adjust the width as per your design
                height: "25px",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "0 10px",
                fontSize: "12px",
                marginRight: "10px", // Add margin to create space
              }}
            >
              Period
            </div>
            <div
              style={{
                flex: "0 0 auto", // Fixed width without shrinking
                width: "80px",
                height: "25px",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "2px",
                fontSize: "12px",
                margin: "0 10px", // Add margin to create space
              }}
              onClick={handleOpenPopup}
            >
              How to play
            </div>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
            <div
              style={{
                flex: "0 0 auto", // Fixed width without shrinking
                width: "120px",
                height: "25px",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "2px",
                fontSize: "12px",
                marginLeft: "10px", // Add margin to create space
              }}
            >
              Public Chain Query
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "flex-end",
                paddingLeft: "15px",
                marginBottom: "50px",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                {periodId ? periodId.toString().slice(0, -2) : ""}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "15px",
                    fontSize: "15px",
                  }}
                >
                  Draw time
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "16px",
                      height: "22px",
                      backgroundColor: "transparent",
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      margin: "0 2px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {minutes[0]}
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "16px",
                      height: "22px",
                      backgroundColor: "transparent",
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      margin: "0 2px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {minutes[1]}
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "16px",
                      height: "22px",
                      backgroundColor: "transparent",
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      margin: "0 2px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    :
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "16px",
                      height: "22px",
                      backgroundColor: "transparent",
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      margin: "0 2px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {seconds[0]}
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: "16px",
                      height: "22px",
                      backgroundColor: "transparent",
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      margin: "0 2px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {seconds[1]}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              marginBottom: "10px",
              justifyContent: "center",
            }}
          >
            {lastFiveCharacters.map((character, index) => (
              <img
                key={index}
                src={`games/assets/${character.trim()}.png`}
                className="auja"
                alt={`Image ${index + 1}`}
                style={{
                  width: "18%",
                  marginRight:
                    index !== lastFiveCharacters.length - 1 ? "10px" : "0",
                }}
              />
            ))}
          </Grid>
        </Grid>

        <Grid
          container
          mt={2}
          spacing={2}
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "95%",
            borderRadius: "20px",
          }}
        >
          {/* First Row */}
          <Grid item xs={12} container justifyContent="space-evenly">
            <Button
              onClick={() => {
                handleOpenDrawer("Green ");
                handleEventSelection("green");
              }}
              variant="contained"
              sx={{
                backgroundColor: "RGB(64,173,114)",
                width: "100px",
                borderRadius: "0 10px 0 10px",
              }}
            >
              Green
            </Button>
            <Button
              onClick={() => {
                handleOpenDrawer("Violet");
                handleEventSelection("violet");
              }}
              variant="contained"
              sx={{
                backgroundColor: "RGB(182,89,254)",
                width: "100px",
                borderRadius: "10px",
              }}
            >
              Violet
            </Button>
            <Button
              onClick={() => {
                handleOpenDrawer("Red");
                handleEventSelection("red");
              }}
              variant="contained"
              sx={{
                backgroundColor: "RGB(253,86,92)",
                width: "100px",
                borderRadius: "10px 0 10px 0",
              }}
            >
              Red
            </Button>
          </Grid>
          {/* Second Row */}
          <Grid
            container
            mt={2}
            sx={{
              backgroundColor: "#f7f8ff",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "95%",
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <Grid item xs={12} container justifyContent="space-evenly">
              <img
                src="games/assets/n0-30bd92d1.png"
                alt="0"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("0");
                  handleEventSelection("mix1");
                }}
              />
              <img
                src="games/assets/n1-dfccbff5.png"
                alt="1"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("1");
                  handleEventSelection("green");
                }}
              />
              <img
                src="games/assets/n2-c2913607.png"
                alt="2"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("2");
                  handleEventSelection("red");
                }}
              />
              <img
                src="games/assets/n3-f92c313f.png"
                alt="3"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("3");
                  handleEventSelection("green");
                }}
              />
              <img
                src="games/assets/n4-cb84933b.png"
                alt="4"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("4");
                  handleEventSelection("red");
                }}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="space-evenly">
              <img
                src="games/assets/n5-49d0e9c5.png"
                alt="5"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("5");
                  handleEventSelection("mix2");
                }}
              />
              <img
                src="games/assets/n6-a56e0b9a.png"
                alt="6"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("6");
                  handleEventSelection("red");
                }}
              />
              <img
                src="games/assets/n7-5961a17f.png"
                alt="7"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("7");
                  handleEventSelection("green");
                }}
              />
              <img
                src="games/assets/n8-d4d951a4.png"
                alt="8"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("8");
                  handleEventSelection("red");
                }}
              />
              <img
                src="games/assets/n9-a20f6f42.png"
                alt="9"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("9");
                  handleEventSelection("green");
                }}
              />
            </Grid>
          </Grid>
          {/* Third Row */}
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <StyledButtonGroup
              variant="contained"
              aria-label="multiplier selection"
            >
              {multipliers.map((multiplier) => (
                <StyledButton
                  key={multiplier.label}
                  onClick={() => handleMultiplier(multiplier)}
                  active={
                    !multiplier.isRandom && setMultiplier === multiplier.value
                      ? 1
                      : 0
                  }
                  className={multiplier.isRandom ? "random" : ""}
                >
                  {multiplier.label}
                </StyledButton>
              ))}
            </StyledButtonGroup>
          </Box>

          {/* Fourth Row */}
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            sx={{ marginBottom: "10px" }}
          >
            <Grid item>
              <Button
                onClick={() => {
                  handleOpenDrawer("big");
                  handleEventSelection("yellow");
                }}
                variant="contained"
                sx={{
                  width: "150px",
                  borderRadius: "20px 0 0 20px",
                  margin: "0",
                  backgroundColor: " #dd9138",
                }}
              >
                Big
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  handleOpenDrawer("small");
                  handleEventSelection("blue");
                }}
                variant="contained"
                sx={{
                  width: "150px",
                  borderRadius: "0 20px 20px 0",
                  margin: "0",
                  backgroundColor: " #5088d3",
                }}
              >
                Small
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity="success"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}
          >
            Bet placed successfully!
          </MuiAlert>
        </Snackbar>

        <Drawer
            anchor="bottom"
            open={drawerOpen}
            onClose={handleCloseDrawer}
            PaperProps={{
              style: {
                margin: "auto",
                maxWidth: "400px", // Set this to the desired size of your square
                // Adjust height as needed
              },
            }}
          >
            <Grid
              container
              alignItems="center"
              style={{
                position: "relative",
                color: "black",
                backgroundColor: "white",
              }}
            >
              <Grid
                item
                xs={12}
                align="center"
                style={{
                  position: "relative",
                  marginBottom: "-5px",
                  height: "90px",
                  color: "white",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "70%",
                    background: selectedColor,
                    clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
                  }}
                ></div>
                <div style={{ position: "relative" }}>
                  <Typography variant="h6">{`Win Go ${selectedTimer}`}</Typography>
                  <Typography variant="body1">{`${selectedItem} is selected`}</Typography>
                </div>
              </Grid>

              <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                <Typography variant="h6" sx={{color:"#1E2637"}}>Balance</Typography>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 1 ? "#ED8A1F" : '#F6F6F6',
                      color: activeBetAmount === 1 ?"white":"#858EA1"
                  }}
                  onClick={() => {
                    handleBetAmount(1);
                    setActiveBetAmount(1);
                  }}
                >
                  {"\u20B9" + "1"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 10 ? '#ED8A1F' : '#F6F6F6',
                      color: activeBetAmount === 10 ?"white":"#858EA1"
                  }}
                  onClick={() => {
                    handleBetAmount(10);
                    setActiveBetAmount(10);
                  }}
                >
                  {"\u20B9" + "10"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 100 ? '#ED8A1F' : '#F6F6F6',
                      color: activeBetAmount === 100 ?"white":"#858EA1"
                  }}
                  onClick={() => {
                    handleBetAmount(100);
                    setActiveBetAmount(100);
                  }}
                >
                  {"\u20B9" + "100"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 1000 ? '#ED8A1F' : '#F6F6F6',
                      color: activeBetAmount === 1000 ?"white":"#858EA1"
                  }}
                  onClick={() => {
                    handleBetAmount(1000);
                    setActiveBetAmount(1000);
                  }}
                >
                  {"\u20B9" + "1000"}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  align="center"
                  alignItems="center"
                >
                   <Typography variant="h6" style={{color:"#1E2637"}}>Add your money</Typography>
                  <Grid justifyContent="flex-end">
                    <TextField
                      label="Add Custom Amount"
                      variant="outlined"
                      value={customBetAmount}
                      onChange={handleCustomBetChange}
                      style={{
                        borderRadius: 15,
                        height: 50,
                       
                        color:"#1E2637"
                      }}
                      InputProps={{
                        style: {
                          color: "black",
                          borderRadius: 15,
                          height: 50,
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "black" },
                      }}
                    />
                    </Grid>
                  <Typography variant="h6" style={{color:"#1E2637"}}>Quantity</Typography>
                  <div
                    className="button1"
                    onClick={() =>
                      setMultiplier(multiplier > 1 ? multiplier - 1 : 1)
                    }
                    style={{backgroundColor:'#ED8A1F',color:"white"}}
                  >
                    -
                  </div>

                  <Typography
                    variant="body1"
                    style={{ border: "1px solid #F6F6F6", width: "50px",backgroundColor:"#F6F6F6" }}
                  >
                    {multiplier}
                  </Typography>
                  <div
                    className="button1"
                    onClick={() => setMultiplier(multiplier + 1)}
                    style={{backgroundColor:'#ED8A1F',color:"white"}}
                  >
                    +
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="flex-end">
                <div
                  className={`button ${activeButton === 1 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(1);
                    setActiveButton(1);
                  }}
                  style={
                    activeButton === 1 ? { backgroundColor: '#ED8A1F',color:"white" } : { backgroundColor:'#F6F6F6',color:"#858EA1"}
                  }
                >
                  X1
                </div>
                <div
                  className={`button ${activeButton === 5 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(5);
                    setActiveButton(5);
                  }}
                  style={
                    activeButton === 5 ? { backgroundColor: '#ED8A1F',color:"white" } : { backgroundColor:'#F6F6F6',color:"#858EA1"}
                  }
                >
                  X5
                </div>
                <div
                  className={`button ${activeButton === 10 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(10);
                    setActiveButton(10);
                  }}
                  style={
                    activeButton === 10
                      ? { backgroundColor: '#ED8A1F',color:"white" }
                      : { backgroundColor:'#F6F6F6',color:"#858EA1"}
                  }
                >
                  X10
                </div>
                <div
                  className={`button ${activeButton === 20 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(20);
                    setActiveButton(20);
                  }}
                  style={
                    activeButton === 20
                      ? { backgroundColor: '#ED8A1F',color:"white" }
                      : { backgroundColor:'#F6F6F6',color:"#858EA1"}
                  }
                >
                  X20
                </div>
                <div
                  className={`button ${activeButton === 50 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(50);
                    setActiveButton(50);
                  }}
                  style={
                    activeButton === 50
                      ? { backgroundColor: '#ED8A1F',color:"white" }
                      : { backgroundColor:'#F6F6F6',color:"#858EA1"}
                  }
                >
                  X50
                </div>
                <div
                  className={`button ${activeButton === 100 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(100);
                    setActiveButton(100);
                  }}
                  style={
                    activeButton === 100
                      ? { backgroundColor: '#ED8A1F',color:"white" }
                      : { backgroundColor:'#F6F6F6',color:"#858EA1"}
                  }
                >
                  X100
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="space-around" spacing={0}>
                <Grid item xs={3}>
                  <Button
                    onClick={handleCancelBet}
                    fullWidth
                    style={{ backgroundColor: "white",color:"#817F7C" }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={9}>
                  <Button
                    onClick={handlePlaceBet}
                    fullWidth
                    style={{ background: '#ED8A1F',color:"white" }}
                    variant="contained"
                  >{`Total Bet: ${betAmount * multiplier}`}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Drawer>
        <Dialog
          open={openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              width: "350px", // Set this to the desired size of your square
              height: "250px", // Set this to the same value as width
              backgroundColor: "rgba(0, 0, 0, 0.5)", // This sets the opacity of the dialog box background
              overflow: "hidden",
              borderRadius:"40px" // This removes the scrollbars
            },
          }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                textAlign: "center",
                fontSize: "120px",
                fontWeight: "bold",
                color: "rgb(233,119,1)",
              }}
            >
              {remainingTime ? remainingTime.split(":")[1] : ""}
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Grid mt={2}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="transparent"
            style={{
              marginLeft: "20px",
            }}
          >
            <Tab
              label="Game History"
              style={
                value === 0
                  ? {
                      backgroundImage:
                        "linear-gradient(to right,#ff9903, #e77404)",
                      color: "white",
                      borderRadius: "20px",
                    }
                  : { color: "grey" }
              }
            />
            <Tab
              label="Chart"
              style={
                value === 1
                  ? {
                      backgroundImage:
                        "linear-gradient(to right,#ff9903, #e77404)",
                      color: "white",
                      borderRadius: "20px",
                    }
                  : { color: "grey" }
              }
            />
            <Tab
              label="My History"
              style={
                value === 2
                  ? {
                      backgroundImage:
                        "linear-gradient(to right,#ff9903, #e77404)",
                      color: "black",
                      borderRadius: "20px",
                    }
                  : { color: "grey" }
              }
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <CustomTable data={rows} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RowVisualization data={rows} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container style={{ marginLeft: "-15px" }}>
              {bets
                .slice()
                .sort((a, b) =>
                  b.timestamp && a.timestamp
                    ? b.timestamp.seconds - a.timestamp.seconds
                    : 0
                )
                .map((bet, index) => (
                  <Accordion sx={{ background: "#ffffff" }}>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid
                        container
                        style={{
                          backgroundColor: "#ffffff",
                          marginTop: "10px",
                          padding: "18px",
                          width: "350px",
                        }}
                      >
                        <Grid item xs={3} sm={3}>
                          <Box
                            border={1}
                            borderRadius={2}
                            style={{
                              background:
                                bet.selectedItem.toLowerCase() === "green" ||
                                [1, 3, 7, 9].includes(Number(bet.selectedItem))
                                  ? "RGB(64,173,114)"
                                  : bet.selectedItem.toLowerCase() === "red" ||
                                    [2, 4, 6, 8].includes(
                                      Number(bet.selectedItem)
                                    )
                                  ? "RGB(253,86,92)"
                                  : bet.selectedItem.toLowerCase() === "violet"
                                  ? "RGB(182,89,254)"
                                  : Number(bet.selectedItem) === 0
                                  ? "linear-gradient(to right, rgb(253,86,92) 50%, rgb(182,89,254) 50%)"
                                  : Number(bet.selectedItem) === 5
                                  ? "linear-gradient(to right, rgb(64,173,114) 50%, rgb(182,89,254) 50%)"
                                  : "rgb(71,129,255)",
                              color: "black",
                              height: "40px",
                              width: "80px",
                              display: "flex",
                              border: "none",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "14px" }}
                            >
                              {isNaN(bet.selectedItem.split(" ")[0])
                                ? bet.selectedItem.split(" ")[0].toUpperCase()
                                : bet.selectedItem}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          sm={7}
                          style={{ textAlign: "center" }}
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            {bet.periodId}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "12px", color: "black" }}
                          >
                            {bet.timestamp
                              ? `${new Date(bet.timestamp).toLocaleDateString(
                                  "en-GB"
                                )}
                 ${new Date(bet.timestamp).toLocaleTimeString("en-GB")}`
                              : "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2}>
                          <Box
                            border={1}
                            borderRadius={1}
                            borderColor={bet.winLoss > 0 ? "green" : "red"}
                            sx={{
                              height: "20px",
                              width: "65px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body1"
                              style={{
                                color: bet.winLoss > 0 ? "green" : "red",
                              }}
                            >
                              {bet.status}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            style={{ color: bet.winLoss > 0 ? "green" : "red" }}
                          >
                            {bet.winLoss > 0
                              ? `+₹${bet.winLoss}`
                              : `₹${bet.winLoss}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Bet Amount
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {bet.betAmount}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Multiplier
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {multiplier}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Total Bet
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {bet.totalBet}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Tax
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {bet.tax}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Fee
                              </TableCell>
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                  color: "red",
                                  color: "black",
                                }}
                              >
                                {bet.fee}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Selected Timer
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {bet.selectedTimer}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Result
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                {bet.result}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: "bold", color: "black" }}
                              >
                                Winloss
                              </TableCell>
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                  color: bet.status === "win" ? "green" : "red",
                                }}
                              >
                                {bet.winLoss}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Grid>
          </TabPanel>
        </Grid>
        <>
          {/* ...rest of the code... */}
          <div
            style={{
              display: open ? "block" : "none",
              position: "absolute", // changed from fixed to absolute
              zIndex: 1,
              left:isSmall ? 20 : 10,
              top: "120px",
              width: isSmall ? '90%' : "95%",
              height: isSmall ? '98%':"95%",
              overflow: "auto",
              border:"none"
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                margin: "15% auto",
                padding: 20,
                width: "80%",
                height: "50%",
                backgroundImage: `url(${
                  gameResult === "Succeed"
                    ? "assets/images/missningBg-6f17b242.png"
                    : "assets/images/missningLBg-73e02111.png"
                })`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  position: "absolute",
                  marginTop: "-100px",
                  color: "white",
                }}
              >
                {gameResult === "Succeed" ? "Congratulations" : "Sorry"}
              </Typography>
              <br />
              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  position: "absolute",
                  marginTop: "-30px",
                  color: "white",
                }}
              >
                Lottery results {getColorAndSize(popupresult)}
              </Typography>
              <Typography
                sx={{
                  marginTop: "150px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  fontWeight: "bold",
                }}
                variant="h6"
                color="text.secondary"
              >
                {dialogContent}
                <br />
                <span
                  style={{ color: gameResult === "Succeed" ? "green" : "red" }}
                >
                  ₹{winloss}
                </span>
                <br />
                <span style={{ fontSize: "10px" }}>
                  Period: Win {popupTimer} {popupperiodid}
                </span>
              </Typography>

              <Button
                sx={{
                  marginTop: isSmall ? '350px' :"370px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  position: "absolute",
                }}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      </Mobile>
    </div>
  );
};

export default LotteryAppt;