import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackBtn() {
    const navigate = useNavigate();

   const handleBack =() =>{
    navigate(-1)
   }
  return (
    <div>
         <Box sx={{ position: 'absolute',top:'0px' ,bgcolor:'#00797C',color:'white',height:'40px',
      left:'25px',borderRadius:'100%',width:'40px' ,"&:hover":{color:"white",bgcolor:"#00797C"}
      ,display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',cursor:'pointer'}} 
      onClick={handleBack} >
      <ArrowBackIosIcon />
      </Box>
    </div>
  )
}
