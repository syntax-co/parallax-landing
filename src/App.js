import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

import logo from './images/sample-logo.png';
import './css_files/App.css';



// #0b0b47 dark blue
// #37a3fe light blue
// #340b5a purple
// #cf1e50 salmonish

const darkBlue = '#0b0b47';
const lightBlue = '#37a3fe';
const purple = '#340b5a';
const salmon = '#cf1e50';



const MoonGrad = ({size,position,rotate}) => {

  return(
    <div style={{
      width: size,
      height: size,
      position:'absolute',
      left: position[0]+'%',
      top: position[1]+'%',
      borderRadius: size/2,
      background: `linear-gradient( ${rotate}deg,${purple},transparent)`
    }}>

    </div>
  )

}


const CountDown = ({small}) => {
  const [days,setDays] = useState(50);
  const [hours,setHours] = useState(70);
  const [minutes,setMinutes] = useState(50);
  const [seconds,setSeconds] = useState(50);

  const [dayLabel, setDayLabel] = useState(0);
  const [hourLabel, setHourLabel] = useState(0);
  const [minutesLabel, setMinuteLabel] = useState(0);
  const [secondsLabel, setSecondsLabel] = useState(0);
  
  const clockSize = small? '4rem':'10rem';
  const fontSize = small? '1rem':'2.5rem';
  
  const calctimes = () => {
    const endTime = new Date('March 26 2023 23:59');
    const currentDate = new Date();
    const maxDays = 50;

    var difference = endTime.getTime() - currentDate.getTime();


    var ms = difference % 1000;
    difference = (difference - ms) / 1000;
    var secs = difference % 60;
    difference = (difference - secs) / 60;
    var mins = difference % 60;
    difference = (difference-mins) / 60;
    var hrs = difference % 24;
    difference = (difference-hrs) / 24;
    var days = difference;

    setDayLabel(days);
    setHourLabel(hrs);
    setMinuteLabel(mins);
    setSecondsLabel(secs);

    setDays(100*(days/maxDays));
    setHours(100*(hrs/24));
    setMinutes(100*(mins/60));
    setSeconds(100*(secs/60));

    return {days:days,hours:hrs,minutes:mins,seconds,secs}
  }

  const startCountDown = () => {
    setInterval(calctimes,1000);
  }

  useEffect(() => {
    calctimes();
    startCountDown();
  } ,[])

  const formatNumber = (inputNumber) => {
    const size = inputNumber.toString().length 
    var final;
    if (size<2) {
      const dif = 2-size;
      final = '0'.repeat(dif) + inputNumber;
    }
    else {
      final = inputNumber;
    }


    return(final);
  }


  const timeStyle = {
    width:'22%',
    height:'80%',
    color:salmon,
    fontFamily:'nunito',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    position:'relative',
    fontSize:small? '1.5em':'3em',
    // margin:'auto'
    marginLeft:'6px',
    marginRight:'6px'
  }

  return(
    <Box sx={{width:'100%',height:'20%',display:'flex'}}>

      <Box id='days' sx={timeStyle}>
        <Box sx={{fontSize:fontSize, marginBottom:'30px'}}>
          Days
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <CircularProgress variant="determinate" value={days} size={clockSize} sx={{}} />
          <Box style={{position:'absolute'}}>
            {formatNumber(dayLabel)}
          </Box>
        </Box>
      </Box>
      <Box id='hours' sx={timeStyle}>
        <Box sx={{fontSize:fontSize, marginBottom:'30px'}}>
          Hours
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <CircularProgress variant="determinate" value={hours} size={clockSize} sx={{}} />
          <Box style={{position:'absolute'}}>
            {formatNumber(hourLabel)}
          </Box>
        </Box>
      </Box>
      <Box id='minutes' sx={timeStyle}>
        <Box sx={{fontSize:fontSize, marginBottom:'30px'}}>
          Minutes
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <CircularProgress variant="determinate" value={minutes} size={clockSize} sx={{}} />
          <Box style={{position:'absolute'}}>
            {formatNumber(minutesLabel)}
          </Box>
        </Box>
      </Box>
      <Box id='seconds' sx={timeStyle}>
        <Box sx={{fontSize:fontSize, marginBottom:'30px'}}>
          Seconds
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <CircularProgress variant="determinate" value={seconds} size={clockSize} sx={{}} />
          <Box style={{position:'absolute'}}>
            {formatNumber(secondsLabel)}
          </Box>
        </Box>
      </Box>

    </Box>
  )
}





function App() {
  const [positionOffset, setPositionOffset] = useState([0,0]);
  const [hoveringOne, setHoveringOne] = useState(false);
  const [circleSizes, setCircleSizes] = useState([500,200]);
  const [smallwindow, setSmallWindow] = useState(false);
  const minWindowSize = 350;

  const updateItems = () => {

      if (window.innerWidth <= minWindowSize) {
        setCircleSizes([200,100]);
        setSmallWindow(true);
      } else {
        setCircleSizes([500,200]);
        setSmallWindow(false);
      }

  }


  const handleMove = (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const xPosition = event.clientX;
    const yPosition = event.clientY;
    const xOffset = xPosition - (windowWidth / 2 ); 
    const yOffset = yPosition - (windowHeight / 2);

    setPositionOffset([xPosition,yPosition]);
    
  }

  useEffect(() => {
    updateItems();
    window.addEventListener('mousemove',handleMove);
    window.addEventListener('resize',updateItems);
    

    return () => {
      window.removeEventListener('mousemove',handleMove);
      window.removeEventListener('resize',updateItems);
    }
  },[])


  const buttonStyle = {
    hovering:{
      width:'100%',
      height:'100%',
      transition:{
        duration:.1,
        ease:'linear'
      }
    },
    hidden:{
      width:0,
      height:0
    }
  }

  return (
    <div className="App" 
    style={{
      width:'100%',
      height:'100vh',
      position:'relative',
      background: `linear-gradient(310deg ,${darkBlue} 50% , ${lightBlue} 140%)`,
      overflow:'hidden',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}
    
    >

        <MoonGrad size={circleSizes[0]} position={[60+(positionOffset[0]*-.02),10+(positionOffset[1]*-.02)]} rotate={45} />
        <MoonGrad size={circleSizes[1]} position={[40+(positionOffset[0]*-.005),60+(positionOffset[1]*-.005)]} rotate={320} />

       
        <div style={{
          width:smallwindow? '100%':'80%',
          height:smallwindow? '70%':'70%',
          position:'relative',
          flexDirection:smallwindow? 'column':'row',
          borderRadius:20,
          display:'flex',
        }}>

          

          <div style={{
            width:smallwindow? '100%':'50%',
            height:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column'
          }}>

            <div style={{
              position:'absolute',
              top:smallwindow? -50:0,
              left:smallwindow? 0:0
            }}>

              <img src={logo} style={{
                width:smallwindow? '50px':'100px',
                height:smallwindow? '50px':'100px',
                marginLeft:smallwindow? 20:'50px'
              }} />
            </div>

            {/* left side */}
            <div style={{
              width:'90%',
              height:'50%',
              display:'flex', justifyContent:'center',alignItems:'flex-start',flexDirection:'column',
              
            }}>

              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'100%',marginBottom:50}}>
                <div style={{
                  color:'white',
                  fontSize:smallwindow? '2rem':'7rem',
                  fontWeight:'bold',
                  fontFamily:'nunito'
                }}>
                  Launching
                </div>
                
                <div style={{
                  color:'white',
                  fontSize:smallwindow? '2rem':'6rem',
                  fontFamily:'nunito'
                }}>
                  Soon
                </div>
                <div style={{color:'white',fontFamily:'nunito',fontSize:smallwindow? '.75rem':'1.5rem',
                            textAlign:'left',width:'100%'
                            }}>
                  We are a group that want to help you make your dream succeed. We take everything into consideration when developing your website.
                  Functionality and a design that stays rent free in every visitors mind.
                </div>
              </div>

              <div style={{
                height:'100px',
                width:smallwindow? '100%':''
              }}>
              
              {/* web button */}
              <a href='https://www.munozchris.com/' style={{ textDecoration: 'none'}}>
                <div style={{
                  height:smallwindow? '50px':"75px",
                  borderRadius:'50px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  color:salmon,
                  fontFamily:'nunito',
                  fontSize:smallwindow? '1.255rem':'2rem',
                  border: `1px solid ${salmon}`,
                  cursor:'pointer',position:'relative'
                }}
                  onMouseEnter={() => setHoveringOne(true)}
                  onMouseLeave={() => setHoveringOne(false)}
                >
                  <motion.div style={{backgroundColor:`${salmon}22`,position:'absolute',borderRadius:'50px'}}
                    initial={buttonStyle.hidden}
                    animate={hoveringOne? buttonStyle.hovering:buttonStyle.hidden}
                  ></motion.div>
                  <div style={{marginLeft:smallwindow? '50px':'100px',marginRight:smallwindow? '50px':'100px'}}>
                    Teleport
                  </div>
                </div>
              </a>

            </div>

            </div>
          </div>


          <div style={{
            width:smallwindow? '100%':'50%',
            height:'100%',
            display:'flex',
            alignItems:'center'
          }}>


            <CountDown small={smallwindow} />

          </div>

          

        </div>


      
    </div>
  );
}

export default App;
