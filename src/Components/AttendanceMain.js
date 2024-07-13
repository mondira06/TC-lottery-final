import React, { useEffect} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Grid , Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Attendance from './attendanceComponent/Attendance'



const AttendanceMain= ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const navigate = useNavigate();
  const navigateToPage2 = () => {
    navigate('/coupen-user'); // Replace '/path-to-page' with the actual path
  };

  const handleDownload = () => {
    // Programmatically click the hidden anchor tag
    const link = document.createElement('a');
    link.href = `https://111club.online/abclottery.apk`; // Change this to the actual path of the APK file on your server
    link.download = 'abclottery.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1} sx={{backgroundColor: 'rgb(245,70,69)'}}>


            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#ffffff',
                padding: '8px 16px',
                color: 'black'
                
              }}
            >
              <Grid >
                <span style={{ fontSize: "1.2rem" }}>Attendance Bonus</span>
              </Grid>
            </Grid>

            {/* //content */}
<Attendance />
            
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default AttendanceMain;