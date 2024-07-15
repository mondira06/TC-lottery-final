import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import { domain } from "../../Components/config";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

function NotificationMain() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      message: message,
    };

    axios
      .post(`${domain}/createNotification`, formData, { withCredentials: true })
      .then(function (response) {
        alert("Notification submitted successfully");
        console.log(response);
        setTitle("");
        setMessage("");
        fetchNotifications();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.black,
      fontWeight: theme.typography.fontWeightBold,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      whiteSpace: "pre-wrap", // Allow text to wrap
      maxWidth: "300px", 
      overflowWrap: "break-word",// Adjust max-width as needed
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.white,
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const fetchNotifications = () => {
    axios
      .get(`${domain}/notifications`, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setNotifications(response.data.notifications);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  };

  const handleDelete = (notificationId) => {
    axios
      .delete(`${domain}/deletenotifications`, {
        data: { notificationId },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Notification deleted successfully");
          // Remove the notification from the UI after 1 second
          setTimeout(() => {
            setNotifications(
              notifications.filter(
                (notification) => notification._id !== notificationId
              )
            );
          }, 1000);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{ minHeight: "85vh", backgroundColor: "whitesmoke" }}>
      <Box sx={{ border: "1px solid #D9D9D9", margin: "0 auto", maxWidth: "1200px" }}>
        <Box
          component="main"
          sx={{
            backgroundColor: "white",
            flexGrow: 2,
            p: 4,
          }}
        >
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h5" align="left" sx={{mt:1,mb:2}}>
              <b>Create Notification</b>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="message"
                    label="Message"
                    name="message"
                    autoComplete="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      height: '56px', // Set height to match TextField height
                      backgroundColor:"#F78D02",color:"white",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 6, backgroundColor: "white", p: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, mt: 2 }}>
        <b>View Notification</b>
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No.</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification, index) => (
              <TableRow key={notification._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{notification.title}</StyledTableCell>
                <StyledTableCell>{notification.message}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => handleDelete(notification._id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
     
    </div>
  );
}

export default NotificationMain;