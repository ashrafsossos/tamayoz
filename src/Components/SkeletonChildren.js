import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';

function SkeletonChildrenDemo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' , flexWrap:'wrap' , justifyContent:'center'  }}>
      <Stack gap={2} direction='column' sx={{ display: 'flex', alignItems: 'start' , flexWrap:'wrap' , justifyContent:'start' }}>
        <Stack direction='row' gap={2} sx={{ marginTop:'100px'}}>
            <Skeleton variant="circular" width="80px" height='80px'>
              <Avatar />
            </Skeleton>
            <Skeleton width="190px" height='50px' sx={{ marginTop:'30px' }} />
        </Stack>
        <Skeleton variant="rectangular" width="290px" height='300px' sx={{ marginBottom:'126px' }}/>
        </Stack>
    </div>
  );
}


export default function SkeletonChildren() {
  return (
      <Grid item xs>
        <SkeletonChildrenDemo />
      </Grid>
  );
}