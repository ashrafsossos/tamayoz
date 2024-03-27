import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'

export default function ShowMore({txt}) {
    const [show,setShow] =useState(false)
  return (
    <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'start' }}>
         {show ? txt : `${txt.substring(0, 50)}`}
         <Button onClick={() => setShow(!show)} sx={{ fontSize:'13px',color:'#00797C' , marginTop:'-5px'}}>
         {show === false ? 'عرض المزيد' : 'عرض أقل' }
            </Button> 
    </div>
  )
}
