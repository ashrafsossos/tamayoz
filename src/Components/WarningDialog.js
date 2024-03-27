import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function WarningDialog({open,setOpen}) {
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false);
  };
  const handlePay = () => {
    setOpen(false);
    navigate(-1)
  };
  return (
    <div>
       <Dialog
       sx={{ direction:'rtl' }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >
          {"عفواً !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
           هذه الدروس مقفولة يجب أن تدفع لتتمكن من حضور كامل الدروس
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePay} sx={{ color:"#00797C" }}>
            الدفع
          </Button>
          <Button onClick={handleClose} sx={{ color:"#00797C" }}>إلغاء</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
