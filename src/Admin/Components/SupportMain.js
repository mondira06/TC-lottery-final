import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Card, CardContent,
  Button, TextField, Grid, Select, MenuItem, FormControl, InputLabel, Box
} from '@mui/material';
import axios from 'axios';
import { domain } from '../../Components/config';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = domain;

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState('');
  const [reply, setReply] = useState('');
  const [statusFilter, setStatusFilter] = useState('open');

  useEffect(() => {
    fetchTickets();
  }, [statusFilter]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/tickets');
      const filteredTickets = response.data.filter(ticket => ticket.status === statusFilter);
      setTickets(filteredTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleReply = async (ticketId) => {
    try {
      await axios.post('/tickets/replies', { ticketId, message: reply });
      setReply('');
      fetchTickets();
    } catch (error) {
      console.error('Error replying to ticket:', error);
    }
  };

  return (
    <div style={{ minHeight: "85vh" }}>
      <Container>
      <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "black",
              },
            },
            marginBottom: { xs: "10px", sm: "0" },
          }}
        >
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </TextField>
        <Grid container spacing={3} sx={{marginTop:"5px"}}>
          {tickets.map(ticket => (
            <Grid item xs={12} key={ticket._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Mobile Number: {ticket.mobile}
                  </Typography>
                  <Typography variant="body1">
                    {ticket.message}
                  </Typography>
                  {ticket.replies.map(reply => (
                    <Typography variant="body2" key={reply._id}>
                      Admin: {reply.message}
                    </Typography>
                  ))}
                  {ticket.status === 'open' && (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        label="Reply"
                        fullWidth
                        required
                        margin="normal"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        sx={{backgroundColor:"#f78d02",color:"white"}}
                        onClick={() => handleReply(ticket._id)}
                      >
                        Reply
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default App;