import { Stack, Typography } from "@mui/material";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import RoomIcon from "@mui/icons-material/Room";
import ios from "../Media/ios.png";
import andro from "../Media/android.jpeg";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function ContactInfo() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}contact_us`).then((res) => {
      setInfo(res.data.data);
    });
  }, []);
  return (
    <Stack
      direction="column"
      sx={{ alignItems: "flex-start", marginTop: "30px", direction: "rtl" }}
    >
      {info.email && (
        <>
          <Typography sx={{ color: "#2D1332", fontWeight: "bold" }}>
            <MailIcon /> {info.email}{" "}
          </Typography>
          <br />
        </>
      )}

      {info.telephone && (
        <>
          <Typography sx={{ color: "#2D1332", fontWeight: "bold" }}>
            <CallIcon /> {info.telephone}{" "}
          </Typography>
          <br />
        </>
      )}

      {info.mobile && (
        <>
          {" "}
          <Typography sx={{ color: "#2D1332", fontWeight: "bold" }}>
            <WhatsAppIcon /> {info.mobile}{" "}
          </Typography>
          <br />
        </>
      )}
      {/* 
               {info.address && <><Typography sx={{ color:'#2D1332',fontWeight:"bold" }}>
                <RoomIcon /> {" "}{info.address} </Typography>
                <br /></>} */}

      <Stack direction="row" sx={{ padding: "0px 0px 10px 0px" }}>
        <img
          alt="img1"
          src={andro}
          style={{ width: "150px", cursor: "pointer" }}
        />
      </Stack>
    </Stack>
  );
}
