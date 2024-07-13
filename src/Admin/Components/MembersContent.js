import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography, Tabs, Tab, Box, Badge, IconButton, TextField } from "@mui/material";
import { domain } from "../../Components/config";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

const MembersContent = () => {
  const [users, setUsers] = useState([]);
  const [lockedUsers, setLockedUsers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${domain}/fetchuserdetails`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        const allUsers = res.data.users;
        setUsers(allUsers.filter((user) => !user.locked));
        setLockedUsers(allUsers.filter((user) => user.locked));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLockUser = (mobile) => {
    axios
      .delete(`${domain}/deleteuser`, {
        data: { mobile: mobile },
        withCredentials: true,
      })
      .then((res) => {
        console.log("User locked successfully.");
        fetchUsers(); // Refresh users after locking
      })
      .catch((error) => {
        console.error("Error locking user:", error);
      });
  };

  const handleUnlockUser = (mobile) => {
    axios
      .put(
        `${domain}/unlockuser`,
        { mobile: mobile },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("User unlocked successfully.");
        fetchUsers(); // Refresh users after unlocking
      })
      .catch((error) => {
        console.error("Error unlocking user:", error);
      });
  };

  const handleProfile = (_id) => {
    navigate(`/profile/${_id}`);
  };

  const columns = [
    { field: "id", headerName: "Sr No", width: 130 },
    { field: "username", headerName: "Username", width: 220 },
    { field: "mobile", headerName: "Mobile", width: 220 },
    { field: "uid", headerName: "UID", width: 200 },
    { field: "walletAmount", headerName: "Wallet Amount", width: 130 },
    { field: "plainPassword", headerName: "Password", width: 130 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 240,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onLockClick = () => {
          handleLockUser(params.row.mobile);
        };

        const onUnlockClick = () => {
          handleUnlockUser(params.row.mobile);
        };

        const onProfileClick = () => {
          handleProfile(params.row._id);
        };

        return (
          <div>
            {tabIndex === 0 ? (
              <Button
                variant="contained"
                onClick={onLockClick}
                sx={{ backgroundColor: "red" }}
              >
                Lock Up
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={onUnlockClick}
                sx={{ backgroundColor: "green" }}
              >
                Unlock
              </Button>
            )}
            <Button
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={onProfileClick}
            >
              Profile
            </Button>
          </div>
        );
      },
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      fetchUsers();
    } else {
      const filteredUsers = users.filter((user) =>
        user.mobile.toString().includes(searchTerm)
      );
      const filteredLockedUsers = lockedUsers.filter((user) =>
        user.mobile.toString().includes(searchTerm)
      );
      setUsers(filteredUsers);
      setLockedUsers(filteredLockedUsers);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ p: 3, textAlign: "center", fontWeight: "bold" }}>
        User Management
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab
            label={
              <Badge badgeContent={users.length} color="primary">
                Unlock Users
              </Badge>
            }
            sx={{ mx: 2 }}
          />
          <Tab
            label={
              <Badge badgeContent={lockedUsers.length} color="secondary">
                Locked Users
              </Badge>
            }
            sx={{ mx: 2 }}
          />
        </Tabs>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search user by mobile"
          sx={{ width: "60%", marginRight: 2 }}
        />
        <IconButton onClick={handleSearch} color="primary">
          <SearchIcon />
        </IconButton>
        <IconButton onClick={fetchUsers} color="primary">
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={(tabIndex === 0 ? users : lockedUsers).map((user, index) => ({
            ...user,
            id: index + 1,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{ backgroundColor: "white" }}
        />
      </Box>
    </div>
  );
};

export default MembersContent;
