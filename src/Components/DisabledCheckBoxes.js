import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function DisabledCheckBoxes({ label ,checked }) {
  return (
    <div>
      <FormGroup >
        <FormControlLabel 
          sx={{ color: '#00797C' }}
          control={
            <Checkbox
            disabled
            checked={checked}
            />
          }
          label={label}
        />
      </FormGroup>
    </div>
  );
}