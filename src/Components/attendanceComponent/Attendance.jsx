import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./Attendance.css";
import CoinBox from "./CoinBox.jsx";
import gift from "../../assets/gift.png";
import axios from "axios";
import { domain } from "../config";
function Attendance() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <>
      <div className="outerContainer">
        <div className="bannerBox">
          <div className="content">
            <div className="contentOne">
              <h1>Attendance Bonus</h1>
              <p>
                Get <b>rewards</b> based on consecutive login days !
              </p>
            </div>
            <div className="contentTwo">
              <span style={{ fontSize: "12px" }}>Attended Consecutively</span>
              <span>
                <b>{user ? user.consecutiveDays : "Loading"}</b> Days
              </span>
            </div>
            <div className="contentThree">
              <p>Accumulated</p>
              <h1>{user ? user.totalBonusAmount : "Loading"}</h1>
            </div>
          </div>
        </div>
        <div className="cardbox">
          <CoinBox coinboxAmount="₹6.00" coinboxDay="1 Day" />
          <CoinBox coinboxAmount="₹6.00" coinboxDay="1 Day" />
          <CoinBox coinboxAmount="₹6.00" coinboxDay="1 Day" />
          <CoinBox coinboxAmount="₹6.00" coinboxDay="1 Day" />
          <CoinBox coinboxAmount="₹6.00" coinboxDay="1 Day" />
          <CoinBox coinboxAmount="₹6.00" coinboxDay="1 Day" />
          <div id="coinbox-container">
            <div id="coinbox-image">
              <img src={gift} alt="" />
            </div>
            <div id="coinbox-content">
              <div id="coinbox-amount" style={{ color: "#1e2637" }}>
                ₹7,000.00
              </div>

              <div id="coinbox-day" style={{ color: "#768096" }}>
                7 Day
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            href="#contained-buttons"
            className="attendanceButton"
            sx={{
              width: "70%",
              height: "50px",
              borderRadius: `20px`,
              background: ` linear-gradient(to right,#ff9903, #e77404)`,
              cursor: "pointer",
              border: "none",
              fontSize: "1em",
              marginBottom: "120px",
              color: "#ffffff",
            }}
          >
            Attendance
          </Button>
        </div>
      </div>
    </>
  );
}

export default Attendance;
