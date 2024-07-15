import React, { useState, useEffect } from "react";
import Mobile from "../Components/Mobile";
import IconButton from "@mui/material/IconButton";
import SmsIcon from "@mui/icons-material/Sms";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { domain } from "./config";

const BetHistoryMain = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [gameType, setGameType] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchUserData(gameType);
  }, [gameType]);
  const fetchUserData = async (gameType) => {
    try {
      let urls = [];
      if (gameType === "all" || gameType === "game1") {
        urls.push(`${domain}/user/betshistory`);
      }
      if (gameType === "all" || gameType === "game2") {
        urls.push(`${domain}/user/K3history`);
      }
      if (gameType === "all" || gameType === "game3") {
        urls.push(`${domain}/user/trxbethistory`);
      }

      console.log("Fetching data from:", urls);

      const responses = await Promise.all(
        urls.map((url) => axios.get(url, { withCredentials: true }))
      );

      const allData = responses.flatMap((response) => {
        const responseData = Array.isArray(response.data) ? response.data : [];
        return responseData.map((data) => {
          // Assign gameType based on the URL
          if (response.config.url.includes("betshistory")) {
            return { ...data, gameType: "game1" };
          } else if (response.config.url.includes("K3history")) {
            return { ...data, gameType: "game2" };
          } else if (response.config.url.includes("trxbethistory")) {
            return { ...data, gameType: "game3" };
          }
          return data;
        });
      });

      console.log("Received data:", allData);

      setApiData(allData);
      console.log("Updated apiData:", allData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setApiData([]);
    }
  };
  const navigate = useNavigate();

  const filteredData = Array.isArray(apiData)
    ? apiData.filter((data) => {
        console.log("Filtering data:", data, "gameType:", gameType);

        const gameTypeMatch =
          gameType === "all" ||
          (gameType === "game1" && data.gameType === "game1") ||
          (gameType === "game2" && data.gameType === "game2") ||
          (gameType === "game3" && data.gameType === "game3");
        console.log("Game type match:", gameTypeMatch);

        const dateMatch =
          !selectedDate ||
          new Date(data.timestamp).toDateString() ===
            new Date(selectedDate).toDateString();
        console.log("Date match:", dateMatch);

        const shouldInclude = gameTypeMatch && dateMatch;
        console.log("Should include this item:", shouldInclude);

        return shouldInclude;
      })
    : [];

  console.log("Filtered Data:", filteredData);

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
                backgroundColor: "#ffffff",
                padding: "8px 16px",
                color: "black",
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Bet History</span>
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

            {/* Add Filters */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={12}>
                <Box width="100%" px={0.5}>
                  <div className="form-control full-width">
                    <select
                      id="game-type"
                      onChange={(e) => setGameType(e.target.value)}
                      style={{
                        width: "95%",
                        backgroundColor: "rgb(235,122,2)", // Darker background for the select
                        color: "white", // White text for better contrast
                        border: "1px solid rgb(235,122,2)",
                        fontSize: "1.2em",
                        padding: "10px",
                        borderRadius: "5px", // Rounded corners
                        appearance: "none", // Remove default styling
                        backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"white\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px top 50%",
                        backgroundSize: "20px auto",
 // For older versions of IE
                      }}
                    >
                      <option
                        value="all"
                        style={{ backgroundColor: "rgb(235,122,2)", color: "black" }}
                      >
                        All
                      </option>
                      <option
                        value="game1"
                        style={{ backgroundColor: "#444", color: "black" }}
                      >
                        Wingo
                      </option>
                      <option
                        value="game2"
                        style={{ backgroundColor: "#444", color: "black" }}
                      >
                        K3
                      </option>
                      <option
                        value="game3"
                        style={{ backgroundColor: "#444", color: "black" }}
                      >
                        TRX
                      </option>
                    </select>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                  }}
                  style={{
                    width: "87%",
                    backgroundColor: "transparent",
                    color: "black",
                    border: "1px solid grey",
                    fontSize: "1.2em",
                    padding: "10px",
                  }}
                />
              </Grid>
            </Grid>

            {filteredData.map((data, index) => (
              <Box
              key={index}
              sx={{ maxWidth: 400, margin: "auto", mt: 4, mx: 2 }}
            >
              <Paper
                elevation={3}
                sx={{ borderRadius: 2, overflow: "hidden", background: "#ffffff"}}
              >
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#ffffff",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    Lottery Result : {data.result}
                  </Typography>
                  <Chip
                    label={data.status}
                    sx={{
                      bgcolor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      height: 32,
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pl: 3,
                            py: 1.5,
                            color: "black",
                          }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pr: 3,
                            py: 1.5,
                            color: "#9195a3",
                          }}
                          align="right"
                        >
                          {data.selectedTimer}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pl: 3,
                            py: 1.5,
                            color: "black",
                          }}
                        >
                          Period
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pr: 3,
                            py: 1.5,
                            color: "#9195a3",
                          }}
                          align="right"
                        >
                          {data.periodId}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pl: 3,
                            py: 1.5,
                            color: "black",
                          }}
                        >
                          Tax Deducted{" "}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pr: 3,
                            py: 1.5,
                            color: "#9195a3",
                            wordBreak: "break-all",
                          }}
                          align="right"
                        >
                          {data.fee}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pl: 3,
                            py: 1.5,
                            color: "black",
                          }}
                        >
                          Select
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            pr: 3,
                            py: 1.5,
                            color: "#9195a3",
                          }}
                          align="right"
                        >
                          {data.selectedItem}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ pl: 3, py: 1.5, color: "black" }}
                        >
                          Total bet
                        </TableCell>
                        <TableCell
                          sx={{ pr: 3, py: 1.5, color: "green" }}
                          align="right"
                        >{`\u20B9${data.totalBet}`}</TableCell>{" "}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "rgb(235,122,2)",
                    color: "white",
                    fontSize: "0.875rem",
                  }}
                >
                  {new Date(data.timestamp).toLocaleString()}
                </Box>
              </Paper>
            </Box>
            ))}
            {/* Content End */}
          </Box>
          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default BetHistoryMain;