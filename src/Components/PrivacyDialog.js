import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function PrivacyDialog({setOpen,open}) {
  const [privacy,setPrivace] =useState('')
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}get_policy`).then(res=>{
      setPrivace(res.data.policy_ar)
    })
  },[])
    const handleClose = () => {
        setOpen(false);
      };
  return (
    <div> <Dialog
    open={open}
    onClose={handleClose}
    sx={{ direction:'rtl' }}
  >
    <DialogTitle sx={{ color:'#2D1332' }}>
      {"سياسة الخصوصية"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText >
     {privacy}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} autoFocus sx={{ color:'#00797C' }}>
        إغلاق
      </Button>
    </DialogActions>
  </Dialog></div>
  )
}
