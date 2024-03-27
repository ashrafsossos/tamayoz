import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


export default function ChooseDialog({open,setOpen}) {
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)
  }
  const handleTeacher =()=>{
  localStorage.setItem('role','teacher')
  handleClose()   
  navigate('/Login')
  }
  const handleStudent =()=>{
    localStorage.setItem('role','student')    
    handleClose() 
    navigate('/Login')       
  }
  return (
      <Dialog
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}>
        <DialogTitle>اختر نوع المستخدم</DialogTitle>
        <DialogContent sx={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
            <Button sx={{ my: 2, color: 'black', display: 'block','&:focus': {color :'#00797C'} 
                ,'&:hover':{color:'white',backgroundColor:'#00797C'}}} onClick={handleTeacher}>معلم</Button>
            <Button sx={{ my: 2, color: 'black', display: 'block','&:focus': {color :'#00797C'} 
                ,'&:hover':{color:'white',backgroundColor:'#00797C'}}} onClick={handleStudent}>طالب</Button>
        </DialogContent>
      </Dialog>
  );
}
