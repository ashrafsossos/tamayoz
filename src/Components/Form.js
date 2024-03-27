import React, { useState,useRef } from 'react'
import { Box, Stack, TextField, TextareaAutosize, Typography, Button, Container } from '@mui/material'
// import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

export default function Form({matches}) {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[comment,setComment]=useState('')
    // const { t  } = useTranslation();
    const handleNameChange =(event) =>{
        setName(event.target.value)
    }
    const handleEmailChange =(event) =>{
        setEmail(event.target.value)
    }
  const handleComment =(event) =>{
    setComment(event.target.value)
}
const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();
  const service_id = 'service_w02bort';
  const templete_id = 'template_3mre3uy';
  const public_key = 'tmBkMmQIAYLFPKGZ_';

  emailjs.sendForm(service_id, templete_id,form.current, public_key)
    .then((result) => {
      if(result.text==='OK'){
        alert('تم الإرسال بنجاح')
        setName('')
        setEmail('')
        setComment('')
        window.location.reload(true);
      }
    }, (error) => {
        console.log(error.text);
    });}

  return (
          <form ref={form} onSubmit={sendEmail} style={{ backgroundColor:'#FFFFFF'
          ,width:'550px' , borderRadius:'20px',marginTop:"10px" ,
          padding:'40px' ,alignItems:'flex-start' }}>
                <Typography sx={{ color:'#2D1332' }}>
                الاسم الكامل
             </Typography>
             <TextField onChange={handleNameChange} sx={{ width:'80%',marginBottom:'20px'}} size='small' name="from_name" />
                <Box >
                <Typography sx={{ color:'#2D1332' }}>
                الإيميل
             </Typography>
             <TextField onChange={handleEmailChange} name="from_email"
             type='email'
             sx={{ width:'80%'}} size='small'/>
              </Box>
                <br />
                <Typography sx={{ color:'#2D1332' }} >
                  الرسالة
                 </Typography>
                <TextareaAutosize onChange={handleComment} name="message"
                minRows={4} cols={matches?57:15} sx={{ width:'100%' }} />
                              <br />
                              <br />
              <Button type="submit" 
               sx={{ backgroundColor:'#2D1332',color:'white',width:'50%','&:hover':{backgroundColor:'white',color:'#2D1332'} }}>
               إرسال
              </Button>
              <br />
              <br />
    </form>
  )
}
