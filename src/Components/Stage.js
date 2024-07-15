import React from 'react'
import './style.css'
import crownone from '../assets/crown1.png'
import crowntwo from '../assets/crown2.png'
import crownthree from '../assets/crown3.png'
import four from '../assets/1-a6662edb.png'
import five from '../assets/5-ab77b716.png'
import six from '../assets/8-ea087ede.png'
import seven from '../assets/11-925c456e.png'
import eight from '../assets/eight.jpg'
import placeone from '../assets/place1.png'
import placetwo from '../assets/place2.png'
import placethree from '../assets/place3.png'
import { Grid,Paper,Box,styled } from '@mui/material'
const win2 = [
    { txt: 'Mem***GGD', image: '/assets/15-80f41fc6.png', txt2: '4', txt1: '826,931,490' },
    { txt: 'Mem***DHF', image: '/assets/18-52955242.png', txt2: '5', txt1: '383,283,338' },
  ];
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Stage() {
    return (
        <>
        
            <div className="container">
                <div className="stagebox">
                    <div className="winner">
                        <div className="icondiv">
                            <div className="crownimg">
                                <img src={crowntwo} alt="" />
                            </div>
                            <div className="idimg"><img src={six} alt="" /></div>
                            <div className="positionimg">
                                <img src={placetwo} alt="" />
                            </div>
                        </div>
                        <div className="name" style={{color:"#FFFFFF"}}>Subham</div>
                        <div className="price">₹ 7,00,000</div>
                    </div>
                    <div className="winner">
                        <div id='top' className="icondiv">
                            <div className="crownimg">
                                <img src={crownone} alt="" />
                            </div>
                            <div className="idimg">
                                <img src={five} alt="" /></div>
                            <div className="positionimg">
                                <img src={placeone} alt="" />
                            </div>
                        </div>
                        <div className="name" style={{color:"#FFFFFF"}}>Shivam</div>
                        <div className="price">₹ 10,00,000</div>
                    </div>
                    <div className="winner">
                        <div className="icondiv">
                            <div className="crownimg">
                                <img src={crownthree} alt="" />
                            </div>
                            <div className="idimg">
                                <img src={four} alt="" /></div>
                            <div className="positionimg">
                                <img src={placethree} alt="" />
                            </div>
                        </div>
                        <div className="name" style={{color:"#FFFFFF"}}>Subrato</div>
                        <div className="price">₹ 5,00,000</div>
                    </div>
                </div>
               <Box sx={{marginTop:"30px"}}>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 2 }}>
          {win2.map((item, index) => (
            <Grid item xs={2} sm={2} md={2} key={index}>
              <Item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    p: 1,
                    gap: 2, // Add gap between child elements
                  }}
                >
                  <p>{item.txt2}</p>
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: '50px',
                      height: '45px',
                      borderRadius: '50%',
                      border: '0.5px solid white',
                      margin: 2,
                    }}
                  />
                  <p>{item.txt}</p>
                  <Box sx={{ marginLeft: 'auto', textAlign: 'right', p: 0, color: 'white' }}>
                    <p style={{ backgroundColor: '#FE9802', padding: 3, borderRadius: '50px' }}>
                      ₹{item.txt1}
                    </p>
                  </Box>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
        </Box> 
            </div>
        </>
    )
}

export default Stage
