import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { domain } from "../../Components/config";

const BonusSettingMain = () => {
  const [depositBonuses, setDepositBonuses] = useState([]);
  const [minimumDeposit, setMinimumDeposit] = useState("");
  const [bonus, setBonus] = useState("");
  const [errors, setErrors] = useState({ minimumDeposit: "", bonus: "" });

  const fetchDepositBonuses = async () => {
    try {
      const response = await axios.get(`${domain}/admin/all-deposit-bonuses`, {
        withCredentials: true,
      });
      console.log("response--->", response.data);
      setDepositBonuses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepositBonuses();
  }, []);

  const validate = () => {
    let valid = true;
    let errors = { minimumDeposit: "", bonus: "" };

    if (!minimumDeposit) {
      errors.minimumDeposit = "Minimum Deposit is required";
      valid = false;
    }
    if (!bonus) {
      errors.bonus = "Bonus is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const updateDepositBonus = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await axios.put(
        `${domain}/admin/update-deposit-bonus`,
        { minimumDeposit, bonus },
        { withCredentials: true }
      );
      setMinimumDeposit("");
      setBonus("");
      fetchDepositBonuses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Grid>
        <Box display="flex" flexDirection="column" alignItems="center" m={1}>
          <form onSubmit={updateDepositBonus}>
            <TextField
              label="Minimum Deposit"
              fullWidth
              value={minimumDeposit}
              onChange={(e) => setMinimumDeposit(e.target.value)}
              margin="normal"
              required
              error={!!errors.minimumDeposit}
              helperText={errors.minimumDeposit}
            />

            <TextField
              label="Bonus"
              fullWidth
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              margin="normal"
              required
              error={!!errors.bonus}
              helperText={errors.bonus}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              type="submit"
              margin="normal"
            >
              Update Deposit
            </Button>
          </form>
        </Box>
        <br></br>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Minimum Deposit</TableCell>
                <TableCell>Bonus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {depositBonuses.map((bonus) => (
                <TableRow key={bonus._id}>
                  <TableCell>{bonus.minimumDeposit}</TableCell>
                  <TableCell>{bonus.bonus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default BonusSettingMain;
