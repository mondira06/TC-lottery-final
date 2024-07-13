import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SwipeableCards from './SwipeableCards';
import './VipMain.css';
import avatar from '../../assets/avatar.png';
import vipzero from '../../assets/vip-zero.png';

// import FullWidthTabs from './tab'; // Uncomment if needed

function VipMain() {
  const [userData, setUserData] = useState({
    totalBets: 0,
    username: '',
    vipProgress: '',
    vipLevel: 'VIP0',
    nextVipLevel: '',
    progressPercentage: 0,
  });

  const levels = [
    { minAmount: 1000, awarded: 'Silver' },
    { minAmount: 3000, awarded: 'Gold' },
    { minAmount: 10000, awarded: 'Platinum' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user', {
          withCredentials: true,
        });

        const { user, totalBets } = response.data;
        console.log('----->',response.data)

        let nextVipLevel = levels.find((level) => totalBets < level.minAmount);
        let remainingAmount = nextVipLevel ? nextVipLevel.minAmount - totalBets : 0;
        let progressPercentage = nextVipLevel
          ? (totalBets / nextVipLevel.minAmount) * 100
          : 100;

        setUserData({
          username:user.username,
          totalBets,
          vipProgress:
            remainingAmount > 0
              ? `${remainingAmount} left to unlock ${nextVipLevel.awarded} level`
              : 'Max VIP level achieved',
          nextVipLevel: nextVipLevel ? nextVipLevel.awarded : 'Max VIP',
          progressPercentage,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="topbox">
        <div className="top-left">
          <div className="image-box">
            <img src={avatar} alt="" />
          </div>
        </div>
        <div className="top-right">
          <div className="top-right-top">
            <img src={vipzero} alt="" />
          </div>
          <div className="top-right-bottom">{userData.username}</div>

        </div>
      </div>
      <div className="bottom-box">
        <div className="exp-box">
          <div className="exp">
            <div style={{ color: '#d9ac4e', marginBottom: '5px' }}>{userData.totalBets} My Total Bets</div>
          </div>
          <div className="exp">
            
            <div style={{ color: '#768096' }}>Payout time</div>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${userData.progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="notice-mid">
          <div className="n-box">
            VIP level rewards are settled at 2:00 am on the 1st of every month
          </div>
        </div>
        <SwipeableCards />
      </div>
      {/* Uncomment if needed */}
      {/* <FullWidthTabs /> */}
      <br /><br /><br />
    </div>
  );
}

export default VipMain