import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Skeleton,
  Alert,
} from "@mui/material";
import pic from "../Media/Web.png";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Loader from "../Components/Loader";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export default function Profile({ setTheState }) {
  const [image, setImage] = useState("");
  const [sendingImage, setSendingImage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [oldphone, setOldPhone] = useState("");
  const [imagee, setImagee] = useState("");
  const [changing, setChanging] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [alerting, setAlerting] = useState(false);
  // const [profilestate,setprofilestate] =useState(true)
  // const [loginstate,setLogin] =useState(false)
  // const stateData = {
  //   profilestate: profilestate,
  //   loginstate: loginstate,
  // };
  const navigate = useNavigate();
  useEffect(() => {
    setTheState(false);
    axios
      .get(`${process.env.REACT_APP_API_URL}getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFname(res.data.user.first_name);
        setLname(res.data.user.last_name);
        setPhone(res.data.user.phone);
        setOldPhone(res.data.user.phone);
        setImage(res.data.user.image);
        setLoading(false);
      });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagee(URL.createObjectURL(file));
    setSendingImage(e.target.files[0]);
    setChanging(true);
    // setTheIm(true)
  };

  const handleBtn = () => {
    if (fname && lname && phone) {
      const formData = new FormData();
      formData.append("first_name", fname);
      formData.append("last_name", lname);
      formData.append("phone", phone);
      if (changing) {
        formData.append("image", sendingImage);
      } else {
        formData.append("image", image);
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios
        .post(`${process.env.REACT_APP_API_URL}update_profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("image", JSON.stringify(res.data.client.image));
          window.location.reload(true);
        })
        .catch((error) => {
          console.error("Error");
        });
      setLoad(true);
      // if(oldphone !== phone){
      //   navigate('/Verification',{ state: { stateData :stateData}})
      // }
    } else {
      setAlerting(true);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    opacity: 0,
    position: "absolute",
    width: "100px",
    height: "100px",
    cursor: "pointer",
  });
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
          height: "650px",
          width: "600px",
          borderRadius: "20px",
          marginTop: "40px",
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
              <Button>
                {changing && (
                  <img
                    alt="img1"
                    src={imagee}
                    style={{
                      width: "250px",
                      objectFit: "fill",
                      marginTop: "10px",
                      height: "200px",
                    }}
                  />
                )}
                {!changing && (
                  <img
                    alt="img2"
                    src={`${process.env.REACT_APP_API_URL_IMAGE}${image}`}
                    style={{
                      width: "250px",
                      objectFit: "fill",
                      marginTop: "10px",
                      height: "200px",
                    }}
                  />
                )}
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </div>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                marginTop: "50px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                name="fname"
                label="الاسم الأول"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                  setAlerting(false);
                }}
                sx={{ width: "300px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                name="lname"
                label="الاسم الأخير"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                  setAlerting(false);
                }}
                sx={{ width: "300px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                marginBottom: "10px",
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                name="phone"
                label="رقم الموبايل"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setAlerting(false);
                }}
                sx={{ width: "300px" }}
              />
            </Grid>
            {alerting && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Alert severity="error" sx={{ width: "270px" }}>
                  يجب ملئ كل الحقول
                </Alert>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleBtn}
                sx={{
                  color: "white",
                  marginTop: "20px",
                  bgcolor: "#2D1332",
                  "&:hover": { color: "#2D1332", bgcolor: "white" },
                }}
              >
                {load ? <CircularProgress sx={{ color: "white" }} /> : "تعديل"}
              </Button>
            </div>
          </>
        )}
      </Box>
    </div>
  );
}
