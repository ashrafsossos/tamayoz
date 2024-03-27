import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Grid, TextField, Stack } from "@mui/material";
import pic from "../Media/Web.png";
import axios from "axios";
import Loader from "../Components/Loader";

export default function TeacherProfile({ setTheState, setTheIm }) {
  const [image, setImage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTheState(false);
    axios
      .get(`${process.env.REACT_APP_API_URL}getProfileData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFname(res.data.data.name);
        setLname(res.data.data.description);
        setPhone(res.data.data.phone);
        setImage(res.data.data.image);
        setLoading(false);
      });
  }, []);

  const windowHeight = useRef(window.innerHeight);

  return (
    <div
      style={{
        backgroundImage: `url(${pic})`,
        backgroundPosition: "center",
        height: windowHeight.current,
        backgroundSize: "cover",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          height: "500px",
          width: "600px",
          borderRadius: "20px",
          marginTop: "0px",
          marginBottom: "50px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            color: "#2D1332",
            marginTop: "15px",
          }}
        >
          الملف الشخصي
        </Typography>
        {loading && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            <Loader />
          </div>
        )}
        {!loading && (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="img1"
                src={`${process.env.REACT_APP_API_URL_IMAGE}${image}`}
                style={{
                  width: "250px",
                  objectFit: "fill",
                  marginTop: "10px",
                  height: "200px",
                }}
              />
            </div>
            {/* <Grid item xs={12} md={6} sx={{ marginTop:'50px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
        <TextField
        disabled
       name="fname" label='الاسم الأول'
        value={fname} 
        sx={{ width:"300px" }}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginTop:'10px' ,display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <TextField
        disabled
        name="lname" 
        label='الاسم الأخير'
        value={lname}
        sx={{ width:"300px"}}  />
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginBottom:'10px',marginTop:'10px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
        <TextField
        disabled
        name="phone" 
        label='رقم الموبايل'
        value={phone}
        sx={{ width:"300px"}}  />
        </Grid> */}
            <Box sx={{ padding: "40px" }}>
              <Stack
                direction="row"
                gap={2}
                sx={{ marginTop: "30px", direction: "rtl" }}
              >
                <Typography sx={{ fontSize: "20px", color: "#00797C" }}>
                  الاسم :
                </Typography>
                <Typography sx={{ fontSize: "20px" }}>{fname}</Typography>
              </Stack>
              {/* 
        <Stack direction='row' gap={2} sx={{direction:'rtl',marginTop:'10px' }}>
            <Typography sx={{ fontSize:'20px' , color:'#00797C' }}>
              الأخير :
            </Typography>
            <Typography sx={{ fontSize:'20px' }}>
           {lname}
            </Typography>
        </Stack> */}

              <Stack
                direction="row"
                gap={2}
                sx={{ direction: "rtl", marginTop: "10px" }}
              >
                <Typography sx={{ fontSize: "20px", color: "#00797C" }}>
                  رقم الموبايل :
                </Typography>
                <Typography sx={{ fontSize: "20px" }}>{phone}</Typography>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
