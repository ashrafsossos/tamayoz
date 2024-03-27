import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function CircularProgressWithLabel(props) {
  const handleResend = (event) => {
    event.preventDefault(); 
    props.handleReVerificationClick(); 
    props.setTimerProgress(0);
    props.startTimer();
  
  };


  return (
    <Box sx={{ position: 'relative', marginTop: '30px', }}>
      {!props.btn ? (
        <>
                <Typography sx={{ marginTop:'10px',color:'gray',fontSize:'11px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>يرجى الانتظار قبل إعادة الإرسال</Typography>
                <br/>
                <Box sx={{ position: 'relative',display:'inline-block',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
          <CircularProgress variant="determinate" {...props} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {props.value}
            </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
        <Button
          onClick={(e)=>{handleResend(e)}}
          sx={{ color: 'white', marginTop: '20px', bgcolor: '#2D1332', '&:hover': { color: '#2D1332', bgcolor: 'white' } }}
        >
          أعادة الإرسال 
        </Button>
        </div>
      )}
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Circular({ handleReVerificationClick }) {
  const [progress, setProgress] = React.useState(0);
  const [btn, setBtn] = React.useState(false);
  const [timerProgress, setTimerProgress] = React.useState(0);
  var timer;
  const startTimer = () => {
    timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 150 ? 0 : prevProgress + 1));
      setTimerProgress((prevTimerProgress) => (prevTimerProgress >= 150 ? 0 : prevTimerProgress + 1));
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setBtn(true);
    },100000);
  };

  React.useEffect(() => {
    startTimer(); 

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgressWithLabel
      value={timerProgress}
      setBtn={setBtn}
      btn={btn}
      handleReVerificationClick={handleReVerificationClick}
      setTimerProgress={setTimerProgress}
      startTimer={startTimer} 
    />
  );
}