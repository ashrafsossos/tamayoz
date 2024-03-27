import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBoxesComp({ label, right,onChange,checked }) {
  return (
    <div>
      <FormGroup >
        <FormControlLabel 
          sx={{ color: '#00797C' , direction:'rtl'}}
          control={
            <Checkbox
            checked={checked}
              onChange={onChange}
              sx={{
                '&.Mui-checked': {
                  color: right === 1 ? '#37D101' : right === 0 ?'#FF0000' : '#2D1332' ,
                },
              }}
            />
          }
          label={label}
        />
      </FormGroup>
    </div>
  );
}