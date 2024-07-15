import React, { useEffect, useState } from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Paper, Typography, Button,Grid , Box,List,ListItem,Avatar,styled} from '@mui/material';
import { Whatshot } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Two from '../Components/Two';
import Stage from '../Components/Stage';
import BottomHome from './BottomHome';
import LoadingLogo from "./LoadingLogo";


const circleStyle = {
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: '#3498db', // Default background color
  margin: '0',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: "100%"
};
const win = [
  { txt: 'Mem***GGD', image: '/assets/7-00479cfa.png', txt2:'28.09', image1:'/assets/gimg12.png' },
  { txt: 'Mem***DHF', image: '/assets/8-ea087ede.png',txt2:'39.03',image1:'/assets/gimg22.png' },
  { txt: 'Mem***SKL', image: '/assets/9-6d772f2c.png',txt2:'13.36',image1:'/assets/K3-83a15687.png' },
  { txt: 'Mem***PID', image: '/assets/13-5676d43f.png',txt2:'16.90',image1:'/assets/gimg22.png' },
  { txt: 'Mem***JYR', image: '/assets/8-ea087ede.png',txt2:'69.03',image1:'/assets/gimg33.png' },
  { txt: 'Mem***MKL', image: '/assets/9-6d772f2c.png',txt2:'139.03',image1:'/assets/K3-83a15687.png' },
];
const Home = ({ children }) => {
  const [winners, setWinners] = useState(win);
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setWinners((prevWinners) => {
        const lastWinner = prevWinners[prevWinners.length - 1];
        const newWinners = [lastWinner, ...prevWinners.slice(0, -1)];
        return newWinners;
      });
    }, 2000); // Adjust the timing as needed
    return () => clearInterval(interval);
  }, []);

  const lastWinner = winners[winners.length - 1];
  const otherWinners = winners.slice(0, -1); 
  const lotteryItems = [
    {
      id: 1,
      bgImage: '/assets/FXOSO_bg-57f7c4c7.png',
      iconImage: '/assets/lotterycategory_202312150334238m3v.png',
      title: 'Win Go',
      description: 'Green/Red/Violet to win',
      descriptionTop: 'Guess Number',
      image:"/assets/avatar-ea3b8ee9.png",
      winningAmount: '₹39.20',
      path: '/head',
      member:"MemberHFDKJSH"
    },
    {
      id: 2,
      bgImage: '/assets/4D_bg-721dba75.png',
      iconImage: '/assets/lotterycategory_20231215033442jmqv.png',
      title: 'K3 Lottery',
      titleTop: '30%',
      titleLeftSmall: '15%',
      titleLeftLarge: '12%',
      description: 'Big/Small/Odd/Even',
      descriptionTop: 'Guess Number',
      winningAmount: '₹18.82',
      image:"/assets/avatar-ea3b8ee9.png",
      path:"/k3",
      member:"MemberHFDKJSH"
    },
    {
      id: 3,
      bgImage: '/assets/5D_bg-23f2c875.png',
      iconImage: '/assets/lotterycategory_20231215033448bjlv.png',

      title: '5D Lottery',

      title: 'Aviator',

      description: 'Big/Small/Odd/Even',
      descriptionTop: 'Guess Number',
      winningAmount: '₹15.68',
      path:'/redirect-to-second-website',
      image:"/assets/avatar-ea3b8ee9.png",
      member:"MemberHFDKJSH"
    },
    {
      id: 4,
      bgImage: '/assets/Bingo18_bg-11bddcb5.png',
      iconImage: '/assets/lotterycategory_20231215033454m1k3.png',
      title: 'TRX Win',
      description: 'Green/Red/Violet to win',
      descriptionTop: 'Guess Number',
      winningAmount: '₹39.20',
      path:"/trx",
      image:"/assets/avatar-ea3b8ee9.png",
      member:"MemberHFDKJSH"
    }
  ];
  
  const LotteryTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '10px',
    fontSize:'20px'
  }));
  
  const LotteryContent = styled(Typography)(({ theme }) => ({
    background: '#F4F5F8',
    marginBottom: theme.spacing(6),
  borderRadius:2,
  boxShadow:"0px 4px 10px #EEEEF8",
  borderRadius:"10px",
    color: 'black',
    fontSize:'13px'
  }));
 
  const images = [
    {
      id: 1,
      src: 'assets/images/dragon1.jpg',
      alt: 'First Image'
    },
    {
      id: 2,
      src: 'assets/images/dragon2.jpg',
      alt: 'Second Image'
    },
    {
      id: 3,
      src: 'assets/images/dragon3.jpg',
      alt: 'Third Image'
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, );

  const imageUrls = [
    'assets/images/gamecategory_20231215033613klhe.png',
    'assets/images/gamecategory_202312150336204mtb.png',
    'assets/images/gamecategory_20231215033607yi17.png',
    'assets/images/gamecategory_20231215033600k8os.png',
    'assets/images/gamecategory_20231215033554mpgb.png',
    'assets/images/gamecategory_20231215033528g3gt.png',
    'assets/images/gamecategory_2023121503353389nc.png',
    'assets/images/gamecategory_202312150336366phx.png',
  ];

  const [subtitles] = useState([
    'Lottery',
    'Slots',
    'Sports',
    'Casino',
    'PVC',
    'Finishing',
    'Mini games',
    'Popular',
  ]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const imageUrl = 'assets/images/lottery-7b8f3f55.png';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/head"); // Navigate to the specified link
  };
  const handleClick1 = () => {
    navigate("/k3"); // Navigate to the specified link
  };
  const handleClick2 = () => {
    navigate("/trx"); // Navigate to the specified link
  };

  const menuItems = [
    { txt: 'Lottery', image: '/assets/gamecategory_20231215033613klhe.png' },
  { txt: 'Slots', image: '/assets/gamecategory_202312150336204mtb.png' },
  { txt: 'Sports', image: '/assets/gamecategory_20231215033607yi17.png' },
  { txt: 'Casino', image: '/assets/gamecategory_20231215033600k8os.png' },
  { txt: 'PVC', image: '/assets/gamecategory_20231215033554mpgb.png' },
  { txt: 'Fishing', image: '/assets/gamecategory_20231215033528g3gt.png' },
  { txt: 'Mini Games', image: '/assets/gamecategory_2023121503353389nc.png' },
  { txt: 'Popular', image: '/assets/gamecategory_202312150336366phx.png' }
  
];


const [activeTab, setActiveTab] = useState(0);  // Add this line


const handleDownload = () => {
  // Programmatically click the hidden anchor tag
  const link = document.createElement('a');
  link.href = `https://111club.online/abclottery.apk`; // Change this to the actual path of the APK file on your server
  link.download = 'abclottery.apk';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const imageurl=[
  {image:'/assets/Banner_202406192033425v14.jpg',txt:'Our customer service never sends a link to the member, if you received a link from someone else it might be a scam.'},
    {image:'/assets/Banner_20240414155453yxr9.jpg',txt:"Welcome to our TC Website our customer service never sends a link to the member."},
    {image:'/assets/Banner_20240327161838nurx.jpg',txt:"Thankyou for visting our website and your value time,our website deals with many features,hope you enjoy"},
]

const Header = styled(Paper)(({ theme }) => ({

  textAlign: "center",
  overflow: "hidden",
  position: "relative",
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "auto",
}));


const [isLoading, setIsLoading] = useState(true);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageurl.length);
    }, 2000); 
    // Change image every 2 seconds
    return () => clearInterval(interval);
  }, [imageurl.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % imageurl.length);
    }, 4000); 
    // Change image every 2 seconds
    return () => clearInterval(interval);
  }, [imageurl.length]);
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000); // 2 seconds

  // Cleanup function to clear the timeout if the component unmounts before 2 seconds
  return () => clearTimeout(timer);
}, []); 
  return (
    <div style={{ position: 'relative' }}>
      <Mobile>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}>
          <LoadingLogo websiteName="TC" />
        </div>
      )}
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
          sx={{
            backgroundColor: '#F7F8FF', // Base background color
            overflowY: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '1px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F7F8FF',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#F7F8FF',
            },
          }}
          
        >
          <Box flexGrow={1} sx={{backgroundColor:'F7F8FF'}}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#F78D02',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
              <img src="assets/images/h5setting_20231215032755xgv9.png" alt="logo" style={{width:"100px",height:"40px"}}/>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton style={{color:"white"}} onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
<IconButton style={{color:"white"}} onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
              </Grid>
            </Grid>

            {/* //content */}
           

            <Header>
        <ImageWrapper>
          <img
            src={imageurl[currentImageIndex].image}
            alt={`Banner ${currentImageIndex + 1}`}
            style={{
              width: "100%",
              height: "180px",
            }}
          />
        </ImageWrapper>
      </Header>

            <Grid container alignItems="center" sx={{ backgroundColor: "#FFFBE8",marginTop:"10px" }}  >
              <Grid item xs={2} align="left">
                <IconButton>
                  <VolumeUpIcon sx={{ color: "#ED8A1F" }} />
                </IconButton>
              </Grid>
              <Grid item xs={6} align="left" >
                <div style={{ overflow: 'hidden', height: '24px', position: 'relative' }}>

                  <Typography

                    variant="caption"
                    style={{
                      position: 'absolute',
                      color: '#ED8A1F',
                      fontSize: '16px',


                    }}
                  >
                 For your convenience to ensure the safety of your account and successful withdrawal process. Please fill the genuine mobile active number register in your bank account. thanks for your cooperation
                  </Typography>

                </div>
              </Grid>


              <Grid item xs={4}>
                <Button
                  variant="contained"
                  
                  sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '20px', backgroundColor: '#ED8A1F', color: 'white', '&:hover': {
                    backgroundColor: '#ED8A1F', // Keeps the button orange on hover
                  }, }}
                >
                  Detail
                </Button>
              </Grid>
            </Grid>
        
            <Box mx={0} mt={1}>
  
            <Box
      sx={{borderRadius: '3%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {menuItems.map((item, index) => (
           <div
           key={index}
           style={{
             flex:'0 0 21%' ,
             padding:  5 ,
             marginLeft: 2,
         
         }}
         onClick={() => setActiveTab(index)}
         >
              <img src={item.image} alt={item.txt} style={{ width: '70px', height: '70px', backgroundColor: index === activeTab ? 'rgb(255,166,23)' : '#7588FB',
             borderRadius: index === activeTab ? '10px' : '50%' ,  boxShadow: index === activeTab ? '0 2px 2px orange' : '' }} />

              <p style={{ color: index === activeTab ? 'rgb(255,166,23)' : 'black'}}>{item.txt}</p>
            </div>
          ))}
       </div>
</Box>



<Box display='flex' flexDirection='row' alignItems='center'>
  <img src='/assets/lottery-7b8f3f55.png' alt='no' width='30px' height='30px'/>
  <h3>Lottery</h3>
</Box>
<Box flexGrow={1} padding={1}>
      {lotteryItems.map((item, index) => (
        <Box key={index} position="relative" width="100%">

          <img 
            src={item.bgImage}
            alt="" 
            style={{ width: '100%'}} 
            onClick={() => navigate(item.path)} 
          />
          <img 
            src={item.iconImage}
            alt="Lottery Category" 
            style={{
              position: 'absolute',
              top: '16%',
              left: '87%',
              transform: 'translate(-50%, -50%)',
              width: '7rem',
              height: '5.5rem'
            }} 
          />
          <LotteryTitle 
            style={{
              position: 'absolute',
              top: '25%',
              fontSize:"25px",

              left: index===0?'16%':index===3?'16%':"21%",

              left: index===0?'16%':index===3?'18%':index===2?"16%":"21%",

              transform: 'translate(-50%, -50%)'
            }}
          >
           {item.title}
          </LotteryTitle>
          <Typography 
            style={{
              position: 'absolute',
              top: '47%',
              fontSize:"13px",

              left: index===0?'15%':index===3?'15%':'16%',

              left: index===0?'16%':index===3?'17%':'16%',

              transform: 'translate(-50%, -50%)',
              color: 'white'
            }}
          >
          {item.descriptionTop}
          </Typography>
          
          <Typography 
            style={{
              position: 'absolute',
              top: '60%',
              fontSize:"13px",

              left: index===0?'22%':index===3?'22%':'20%',

              left: index===0?'23%':index===3?'24%':'20%',

              transform: 'translate(-50%, -50%)',
              color: 'white'
            }}
          >
        {item.description}
          </Typography>
          
          <LotteryContent style={{marginBottom:"40px"}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap:1,marginLeft:1 }}>
              <img 
                src={item.image}
                alt="Member Avatar" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '0.5px solid white'}} 
              />
              <p>{item.member}</p>
              <Box sx={{ marginLeft: 'auto', textAlign: 'right',display:"flex",flexDirection:"row" }}>
              <Typography sx={{ marginBottom: 0}}>Winning Amount:</Typography>
                <Typography sx={{ marginBottom: 0,marginRight:1 }}>{item.winningAmount}</Typography>
              </Box>
            </Box>
          </LotteryContent>
        </Box>
      ))}
    </Box>
</Box>
          
<Typography align="left" style={{fontSize:"20px",fontWeight:"bold",marginLeft:"10px"}}>
      <span style={{ color: 'orange',fontSize:"30px" }}>|</span> Winning Information
    </Typography>
          
          <Box sx={{ mt: 2,margin:1}}>
        <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 1, md: 1 }}>
          {winners.map((item, index) => (
            <Grid item xs={2} sm={2} md={2} key={index}>
              <Item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <img src={item.image} alt="" style={{ width: '50px', height: '45px', borderRadius: '50%', border: '0.5px solid white', m: 2 }} />
                  <p>{item.txt}</p>
                  <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <img src={item.image1} alt="" style={{ width: '50px', height: '45px', backgroundColor: '#D9D9D9' }} />
                      <p sx={{ marginBottom: 0 }}>
                        Receive ₹{item.txt2}
                        <br />
                        Winning Amount
                      </p>
                    </Box>
                  </Box>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography align="left" style={{fontSize:"20px",marginTop:"20px",marginLeft:"10px"}}><span style={{ color: 'orange',fontSize:"30px" }}>|</span> Today's earning chart</Typography>
<Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: "5px",marginRight:"5px",marginTop:"75px",marginBottom:"200px" }}>

<Stage/>



</Grid>



<br/>
<br/>
<br/>

            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default Home