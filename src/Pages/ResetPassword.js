import React, { useEffect, useState } from 'react'
import pic from '../Media/Web.png';
import { Box, Typography, Grid, TextField, Button, Alert, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword({setTheState}) {
    const [newpassword,setNewPassword] =useState()
    const [confirmPassword,setConfirmPassword] =useState()
    const [alerting,setAlerting]=useState(false)
    const [alertt,setAlert]=useState(false)
    const location = useLocation()
    const { state } = location;
    const { phone } = state; 
    const navigate = useNavigate()
    useEffect(()=>{
        setTheState(false)
        setAlerting(false)
    },[])
    const handleClick=() =>{
    if(confirmPassword === newpassword){
      if(confirmPassword.length < 8 || !/[A-Z]/.test(confirmPassword) || !/[0-9]/.test(confirmPassword) || !/[#?!@$%^&*-]/.test(confirmPassword))
      {
      setAlerting(false)
      setAlert('يجب أن تكون كلمة المرور من 8 احرف و تحوي أحرف كبيرة و رموز')
      }    
    else{
      const formData = new FormData();
      const formattedPhoneNumber = phone.replace("+", "");
      formData.append('phone', formattedPhoneNumber);
      formData.append('new_password', confirmPassword);

        axios.post(`${process.env.REACT_APP_API_URL}re_password`,formData).then(res =>{
            navigate('/Login')
          })
    }}
    else{
        setAlerting(true)
        setAlert(false)
    }
  
    }

  return (
    <div   style={{
        backgroundImage: `url(${pic})`,
        backgroundPosition: 'center',
        backgroundSize:'cover',
        height:'90vh',
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom:'100px' 
      }}>
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        height: '450px',
        width: '500px',
        borderRadius: '20px',
        marginTop: '200px',
        marginBottom: '50px',
      }}
    >
         <Typography sx={{ fontSize: '30px', color: '#2D1332', marginTop: '20px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
        إعادة تعيين كلمة المرور 
      </Typography>
      <br/>
      <Grid sx={{ marginTop:'30px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
<TextField
autoComplete='new-password'
  name="newpassword"
  label="كلمة المرور الجديدة"
  value={newpassword}
  onChange={(e)=>{setNewPassword(e.target.value)}}
  sx={{ width:"300px"}}
  type={'password'}
  autocomplete="new-password"
/>
</Grid>

<Grid sx={{ marginTop:'20px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
<TextField
autoComplete='new-password'
  name="confirmPassword"
  label="تأكيد كلمة المرور"
  value={confirmPassword}
  onChange={(e)=>{setConfirmPassword(e.target.value)}}
  sx={{ width:"300px"}}
  type={'password'}
  autocomplete="new-password"
/>
</Grid>
<br />
{alerting && 
<Container>
<Alert severity="error" 
>الكلمات غير متطابقة</Alert>
</Container>
}
<Container>
{alertt && <Alert severity="error">{alertt}</Alert>}
</Container>
<div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
<Button onClick={handleClick} sx={{ color:'white',marginTop:'20px',bgcolor:'#2D1332','&:hover':{color:'#2D1332' ,bgcolor:'white'} }}>
 إعادة التعيين
</Button>
</div>
    </Box>
    </div>
  )
}
