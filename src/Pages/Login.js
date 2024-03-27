import { TextField, IconButton, InputAdornment, Button, Typography, Box, Stack, Divider,CircularProgress, Alert } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import pic from '../Media/Web.png'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Login({setTheState}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loginstate,setLogin] =useState(true)
  const [alerting,setAlerting] =useState(false)
  const [btnn,setBtnn] =useState(false)
  const role = localStorage.getItem('role')
  const [values, setValeus] = useState({
    phone: "",
    password: "",
    fcm_token: "666"
  })
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setValeus(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
    setAlerting(false)
  }
  const {error , loading} = useSelector((state) => state.auth)
  const windowHeight = useRef(window.innerHeight);
  const handleClick = () => {
  {dispatch(login(values))
    .then((result) => {
      if (result.payload.status) {
        setValeus({
          phone: '',
          password: '',
          fcm_token: '666',
        });
        navigate('/');
      } else {
        setBtnn(localStorage.getItem('btn'))
        setAlerting(true);
      }
    })
    .catch((error) => {
      console.log(error);
      alert('حدث خطأ ما يرجى إعادة المحاولة');
    })
}}
  useEffect(()=>{
    setTheState(false)
  },[])
  
  return (
    <div style={{ backgroundImage:`url(${pic})`,width:'100%',alignItems:'center'
    ,justifyContent:'center',display:'flex',flexWrap:'wrap',backgroundSize:'cover',height:windowHeight.current }}>
      <Box sx={{ bgcolor:"#FFFFFF" , width:"600px" , borderRadius:'20px'}}>
      <Typography sx={{ color:'#2D1332' ,fontWeight:'bold',fontSize:"30px",marginBottom:'10px',marginTop:'20px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>تسجيل الدخول</Typography>
      <Typography sx={{ color:'#2D1332' ,marginBottom:'40px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>ادخل رقمك و كلمة المرور</Typography>
      <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }} >
<TextField name="phone" label="رقم الموبايل"
 value={values.phone} onChange={handleChange} 
sx={{ width:"250px" }}/>
<br/>
<br/>
</div>
<div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',marginTop:'20px' }} >
<TextField
autoComplete='new-password'
  name="password"
  label="كلمة المرور"
  value={values.password}
  onChange={handleChange}
  sx={{ width:"250px"}}
  type={showPassword ? 'text' : 'password'}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          <VisibilityIcon  />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
<br/>
</div>
{role === 'student' && <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
<Button sx={{ color:'#2D1332',marginTop:'10px' }} onClick={()=>{
  navigate('/Verification',{ state: { login: loginstate } })
}}>نسيت كلمة المرور</Button>
</div>}
<div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
{alerting && <Alert severity="error">{error}
</Alert>}
</div>

<div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
{btnn && <Button sx={{ color:'#2D1332' }} onClick={()=>{
navigate('/Verification',{ state: { login: loginstate } })}}>تأكيد الحساب</Button>}
</div>
<br/>
<div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', }}>
<Button onClick={handleClick} sx={{ color:'white',bgcolor:'#2D1332','&:hover':{color:'#2D1332' ,bgcolor:'white'} }}>
{loading ? <CircularProgress sx={{color: "white"}} /> : "تسجيل الدخول"}
</Button>
</div>
{role === 'student' && <Stack direction='row' sx={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
<Button sx={{ color:'#00797C' , marginTop:'10px' ,fontWeight:'bold'}} onClick={()=>{navigate('/Signup')}}>إنشاء حساب</Button>
<Typography sx={{ color:'#2D1332' ,marginBottom:'10px'
,marginTop:'20px' }}>لا تملك حساب ؟</Typography>
<br/>
<Divider sx={{ color:'gray',width:'70%' }} />
</Stack>}
<Stack direction='row' sx={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
<Button sx={{ color:'#00797C' , marginTop:'10px' ,fontWeight:'bold'}} onClick={()=>{navigate('/')}}>تخطي</Button>
<Typography sx={{ color:'#2D1332' ,marginBottom:'10px'
,marginTop:'20px' }}>التصفح فقط ؟</Typography>
</Stack>
<br/>
</Box>
</div>
  )
}
