import React, { useState, useEffect } from "react";
import axios from "axios";
import SwipeableViews from "react-swipeable-views";
import badge1 from "../../assets/badge1.png";
import badge2 from "../../assets/badge2.png";
import badge3 from "../../assets/badge3.png";
import badge4 from "../../assets/badge4.png";
import badge5 from "../../assets/badge5.png";
import lock from "../../assets/lock.png";
import diamond from "../../assets/diamond.png";
import DiamondIcon from "@mui/icons-material/Diamond";
import coin2 from "../../assets/coin2.png";
import safe from "../../assets/safe.png";
import wallet from "../../assets/wallet.png";
import safeicon from "../../assets/safeicon.png";
import dicon from "../../assets/dicon.png";
import stackicon from "../../assets/stackicon.png";
import stack3 from "../../assets/stack3.png";
import gift3 from "../../assets/gift3.png";
import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";
import bg3 from "../../assets/bg3.png";

import crownimg from "../../assets/crown.png";
import crownimg2 from "../../assets/crown2.png";

import "./SwipeableCards.css"; // Import your CSS file for styling
import { Diamond } from "@mui/icons-material";

const SwipeableCards = () => {
  const [index, setIndex] = useState(0);
  const [levels, setLevels] = useState([]);
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchLevelsData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/levels");
        setLevels(response.data.data); // Extracting the 'data' array from response

        // Creating cards based on levels data
        const initialCards = response.data.data.map((level) => ({
          levelReward: level.oneTimeBonus,
          moneyReward: level.monthlyBonus,
          safe: 0, // Assuming default value for 'safe', adjust as per your data structure
          exp: level.minAmount,
        }));
        setCards(initialCards);
      } catch (error) {
        console.error("Error fetching levels data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user"); // Adjust the endpoint as needed
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchLevelsData();
    fetchUserData();
  }, []);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const calculateInnerProgressWidth = (exp) => {
    if (!userData) return "0%";
    const expRequired = parseInt(exp);
    const currentExp = userData.totalBets;
    // Calculate percentage progress
    const progress = Math.min((currentExp / expRequired) * 100, 100);
    return `${progress}%`;
  };

  const getColorForAwarded = (awarded) => {
    switch (awarded) {
      case "Gold":
        return "linear-gradient(to right,#f8bd83,#e2984e)";
      case "Silver":
        return "linear-gradient(to right,#a6b7d0,#889fbe)";
      case "Bronze":
        return "linear-gradient(to right,#ffa493,#ffa493)";
      case "Platinum":
        return "linear-gradient(to right,#d084e1,#8d4aff)";
      case "Diamond":
        return "linear-gradient(to right,#54baf1,#3c77e8)";
      default:
        return "gray";
    }
  };

  const getTransparentColorForAwarded = (awarded) => {
    switch (awarded) {
      case "Gold":
        return "rgba(248, 189, 131, 0.2)";
      case "Silver":
        return "rgba(166, 183, 208, 0.2)";
      case "Bronze":
        return "rgba(255, 164, 147, 0.2)";
      case "Platinum":
        return "rgba(208, 132, 225, 0.2)";
      case "Diamond":
        return "rgba(84, 186, 241, 0.2)";
      default:
        return "rgba(128, 128, 128, 0.2)";
    }
  };

  const styles = {
    associatedContainer: {
      marginTop: "20px",
    },
    associated: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
    },
  };

  if (levels.length === 0 || !userData) return null;

  return (
    <div className="swipeable-cards-container">
      <SwipeableViews
        index={index}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        {levels.map((level, i) => (
          <div
            key={i}
            className="card"
            style={{ background: getColorForAwarded(level.awarded) }}
          >
            <div className="top">
              <div className="left">
                <div className="l-top">
                  <div className="l-one">
                    <img
                      src={
                        level.awarded === "Bronze"
                          ? crownimg
                          : level.awarded === "Silver"
                          ? crownimg2
                          : level.awarded === "Gold"
                          ? crownimg2
                          : level.awarded === "Platinum"
                          ? crownimg2
                          : crownimg
                      }
                      alt={level.awarded}
                    />
                  </div>
                  <div className="l-two" style={{ fontWeight: "bold" }}>
                    {level.awarded}
                  </div>
                  <div className="l-three">
                    {userData.totalBets >= level.minAmount ? (
                      <span
                        style={{
                          marginLeft: "10px",
                          color: "white",
                          fontSize: "0.8em",
                        }}
                      >
                        Level unlocked
                      </span>
                    ) : (
                      <div className="lthreetwo" style={{ marginTop: "5px" }}>
                        <img
                          src={lock}
                          alt="Locked"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="l-mid"
                  style={{ color: "white", textAlign: "left", fontSize: "1em" }}
                >
                  Upgrading {level.awarded} requires
                </div>
                <div
                  style={{ color: "white", textAlign: "left", fontSize: "1em" }}
                >
                  {level.minAmount} EXP
                </div>
                <div
                  className="l-bottom"
                  style={{ color: "white", textAlign: "left", fontSize: "1em" }}
                >
                  Bet ₹1 = 1 EXP
                </div>
              </div>
              <div className="right">
                <div className="image-badge">
                  <img
                    src={
                      level.awarded === "Bronze"
                        ? badge3
                        : level.awarded === "Silver"
                        ? badge1
                        : level.awarded === "Gold"
                        ? badge2
                        : level.awarded === "Platinum"
                        ? badge5
                        : level.awarded === "Diamond"
                        ? badge4
                        : badge3
                    }
                    alt=""
                  />
                </div>
                <div className="right-bottom">{level.awarded}</div>
              </div>
            </div>
            <div className="mid">
              <div
                className="outer-progress"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: getTransparentColorForAwarded(level.awarded),
                  borderRadius: "inherit",
                  position: "absolute",
                  zIndex: 1,
                }}
              ></div>
              <div
                className="inner-progress"
                style={{
                  width: calculateInnerProgressWidth(level.minAmount),
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust color as needed
                  borderRadius: "inherit",
                  position: "relative",
                  zIndex: 2,
                }}
              ></div>
            </div>
            <div className="bottom">
              <div
                className="bottom-left"
                style={{
                  background:
                    level.awarded === "Bronze"
                      ? `linear-gradient(to right, #fe7676, #f05c5c)`
                      : level.awarded === "Silver"
                      ? `linear-gradient(to right, #889ebe, #6f85a5)`
                      : level.awarded === "Gold"
                      ? `linear-gradient(to right, #ed8f32, #ca7521)`
                      : level.awarded === "Platinum"
                      ? `linear-gradient(to right, #b359ff, #8944fa)`
                      : level.awarded === "Diamond"
                      ? `linear-gradient(to right, #308efe, #1177ea)`
                      : `linear-gradient(117.29deg, #ffa493 21.85%, #ff7878 67.02%)`,
                  marginTop: "5px",
                  paddingTop: "1px",
                  paddingBottom: "1px",
                  borderRadius: "10px",
                  color: "white", // Ensures text inside is white
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  alignItems: "center", // Centers text vertically
                  fontSize: "14px", // Adjust font size as needed
                }}
              >
                {userData.totalBets}/{level.minAmount}
              </div>

              <div
                className="bottom-right"
                style={{ color: "white", textAlign: "left", fontSize: "1em" }}
              >
                {level.minAmount} can be leveled up
              </div>
            </div>
          </div>
        ))}
      </SwipeableViews>
      {/* Associated content based on selected card */}
      <div style={styles.associatedContainer}>
        {cards.map(
          (card, i) =>
            i === index && (
              <div key={i} style={styles.associated}>
                <div
                  className="heading"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <div className="d-img">
                    <Diamond sx={{ color: "#ec8a1f", fontSize: 30}} />
                  </div>
                  <div
                    style={{
                      color: "black",
                      fontSize: "1.3em",
                      fontWeight: 600,
                    }}
                  >
                    VIP Benefit Level
                  </div>
                </div>
                <div className="list" style={{ width: "100%" }}>
                  <div
                    className="list-one"
                    style={{
                      display: "flex",
                      gap: "5px",
                      width: "100%",
                      margin: "20px auto",
                      textAlign: "left",
                    }}
                  >
                    <div className="one-img">
                      <img
                        src={gift3}
                        alt=""
                        style={{ width: " 100% ", height: "100%" }}
                      />
                    </div>
                    <div style={{ width: "80%" }}>
                      <div style={{ color: "black" }}>Level up reward</div>
                      <div style={{ color: "gray" }}>
                        Each account can only recieve 1 time
                      </div>
                    </div>
                    <div style={{ width: "80px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          margin: "5px auto",
                          border: "1px solid #dd9138",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ width: "20px", height: "20px" }}>
                          <img
                            src={wallet}
                            alt=""
                            style={{ width: " 100% ", height: "100%" }}
                          />
                        </div>
                        <div style={{ color: "#ec8a1f" }}>{card.levelReward}</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          margin: "5px auto",
                          border: "1px solid #d9ac4e",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ width: "20px", height: "20px" }}>
                          <img
                            src={dicon}
                            alt=""
                            style={{ width: " 100% ", height: "100%" }}
                          />
                        </div>
                        <div style={{ color: "#ec8a1f" }}>0</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="list-one"
                    style={{
                      display: "flex",
                      gap: "5px",
                      width: "100%",
                      margin: "20px auto",
                      textAlign: "left",
                    }}
                  >
                    <div className="one-img">
                      <img src={coin2} alt="" />
                    </div>
                    <div>
                      <div style={{ color: "black" }}> Monthly reward</div>
                      <div style={{ color: "gray" }}>
                        Each account can only recieve 1 time per month
                      </div>
                    </div>
                    <div style={{ width: "80px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          margin: "5px auto",
                          border: "1px solid #dd9138",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ width: "20px", height: "20px" }}>
                          <img
                            src={wallet}
                            alt=""
                            style={{ width: " 100% ", height: "100%" }}
                          />
                        </div>
                        <div style={{ color: "#ec8a1f" }}>{card.moneyReward}</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          margin: "5px auto",
                          border: "1px solid #d9ac4e",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ width: "20px", height: "20px" }}>
                          <img
                            src={dicon}
                            alt=""
                            style={{ width: " 100% ", height: "100%" }}
                          />
                        </div>
                        <div style={{ color: "#ec8a1f" }}>0</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="list-one"
                    style={{
                      display: "flex",
                      gap: "5px",
                      width: "100%",
                      margin: "20px auto",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <div className="one-img">
                      <img src={stack3} alt="" />
                    </div>
                    <div>
                      <div style={{ color: "black" }}> Rebate Rate</div>
                      <div style={{ color: "gray" }}>
                        increase income of the rebate{" "}
                      </div>
                    </div>
                    <div style={{ width: "80px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          margin: "5px auto",
                          border: "1px solid #d9ac4e",
                          alignContent: "center",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ width: "20px", height: "20px" }}>
                          <img
                            src={stackicon}
                            alt=""
                            style={{ width: " 100% ", height: "100%" }}
                          />
                        </div>
                        <div style={{ color: "#ec8a1f" }}>0.6%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SwipeableCards;