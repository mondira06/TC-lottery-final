import React, { useEffect, useState } from "react";
import Mobile from "../Components/Mobile";
import IconButton from "@mui/material/IconButton";
import SmsIcon from "@mui/icons-material/Sms";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Container,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { domain } from "./config";

const MessagesMain = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setVh);
    setVh();

    return () => window.removeEventListener("resize", setVh);
  }, []);

  const navigate = useNavigate();
  const navigateToPage2 = () => {
    navigate("/coupen-user"); // Replace '/path-to-page' with the actual path
  };

  const [user, setUser] = useState(null);
  const [expandedTitles, setExpandedTitles] = useState({});
  const [expandedMessages, setExpandedMessages] = useState({});

  const toggleTitleExpansion = (index) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleMessageExpansion = (index) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const truncateText = (text, charLimit) => {
    return text.length > charLimit ? text.slice(0, charLimit) + "" : text;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/notifications`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
          sx={{ bgcolor: "#f7f8ff" }}
        >
          <AppBar position="sticky" sx={{ bgcolor: "#ffffff" }}>
            <Toolbar>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={6} textAlign="left">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    Notifications
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <IconButton color="inherit">
                    <SmsIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <DownloadIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Container>
            {user &&
              user.notifications.map((notification, index) => (
                <Card
                  key={index}
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "#ffffff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      spacing={2}
                      alignItems="flex-start"
                    >
                      <Grid item sx={{ marginBottom: -1.5 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          color="black"
                          fontWeight="bold"
                          sx={{
                            wordBreak: "break-word",
                            textAlign: "left",
                            textTransform: "uppercase",
                          }}
                        >
                          {expandedTitles[index]
                            ? notification.title.toUpperCase()
                            : truncateText(
                                notification.title.toUpperCase(),
                                20
                              )}
                          {!expandedTitles[index] &&
                            notification.title.length > 20 && (
                              <Button
                                onClick={() => toggleTitleExpansion(index)}
                                sx={{
                                  color: "white",
                                  textTransform: "none",
                                  padding: 0,
                                  minWidth: "unset",
                                  alignSelf: "flex-start",
                                }}
                              >
                                ...
                              </Button>
                            )}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography
                          variant="body2"
                          color="#a7a5a1"
                          sx={{
                            wordBreak: "break-word",
                            alignSelf: "flex-start",
                          }}
                        >
                          {new Date(notification.date).toLocaleDateString()}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography
                          variant="body2"
                          color="#a7a5a1"
                          sx={{ wordBreak: "break-word", textAlign: "left" }}
                        >
                          {expandedMessages[index]
                            ? notification.message
                            : truncateText(notification.message, 50)}
                          {notification.message.length > 50 &&
                            !expandedMessages[index] && (
                              <Button
                                onClick={() => toggleMessageExpansion(index)}
                                sx={{
                                  color: "#d9ac4e",
                                  textTransform: "none",
                                  alignSelf: "flex-start",
                                  marginLeft: "5px",
                                }}
                              >
                                Show more
                              </Button>
                            )}
                        </Typography>
                        {expandedMessages[index] && (
                          <Button
                            onClick={() => toggleMessageExpansion(index)}
                            sx={{
                              color: "#d9ac4e",
                              textTransform: "none",
                              alignSelf: "flex-start",
                              marginLeft: "5px",
                            }}
                          >
                            Show less
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
          </Container>

          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default MessagesMain;