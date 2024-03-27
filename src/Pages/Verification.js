import React, { useEffect, useState } from "react";
import pic from "../Media/Web.png";
import { Box, Typography, Grid, Button, Alert } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import Circular from "../Components/Circular";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Verification({ setTheState }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [warning, setWarning] = useState(false);
  const [randomNumbers, setrandomNumbers] = useState(false);
  const [alerting, setAlerting] = useState(false);
  const location = useLocation();
  const { state } = location;
  const { login } = state;
  const [currentSide, setCurrentSide] = useState("front"); // New state variable

  const navigate = useNavigate();
  useEffect(() => {
    setTheState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateRandomNumbers = () => {
    return new Promise((resolve) => {
      let randomNumbers = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
      setrandomNumbers(randomNumbers);
      resolve(randomNumbers);
    });
  };
  console.log(randomNumbers);
  var phoneNumberWithoutCountryCode;
  const handleVerificationClick = async () => {
    const randomNumbers = await generateRandomNumbers();
    const phoneNumber = phone;
    const countryCode = "+963";
    phoneNumberWithoutCountryCode = phoneNumber.substring(countryCode.length);
    const final_phone = "0" + phoneNumberWithoutCountryCode;

    if (phone.length > 0) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}check_client_phone/${final_phone}`
        )
        .then((res) => {
          if (res.data.message === "This phone number is existed") {
            setAlerting(true);
          } else {
            setCurrentSide("back");
            setAlerting(false);
            const formData = new FormData();
            formData.append("phone", phoneNumberWithoutCountryCode);
            formData.append("code", randomNumbers);
            formData.append("appHashCode", "...");
          }
        });
    } else {
      alert("لا يجب أن يكون الحقل فارغ");
    }
  };

  const handleReVerificationClick = () => {
    handleVerificationClick();
    setCurrentSide("back");
  };

  const handleOtpChange = (value) => {
    setWarning(false);
    setOtp(value);
    if (value.length == 6) {
      if (value === randomNumbers) {
        if (login === true) {
          navigate("/ResetPassword", {
            state: { phone: "0" + phoneNumberWithoutCountryCode },
          });
        } else {
          navigate("/Signup");
        }
      } else {
        setWarning(true);
      }
    }
  };

  const renderFront = () => (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        height: "400px",
        width: "400px",
        borderRadius: "20px",
        marginTop: "100px",
        marginBottom: "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          color: "#2D1332",
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        ادخل رقمك
      </Typography>
      <Grid
        sx={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
      >
        <PhoneInput
          placeholder="رقم الموبايل"
          value={phone}
          onChange={setPhone}
          defaultCountry="SY"
        />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Button
          id="myButton"
          onClick={handleVerificationClick}
          sx={{
            color: "white",
            bgcolor: "#2D1332",
            "&:hover": { color: "#2D1332", bgcolor: "white" },
          }}
        >
          تأكيد
        </Button>
      </Grid>
      {alerting && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "30px",
            alignItems: "center",
          }}
        >
          <Alert severity="error">الرقم موجود مسبقا</Alert>
        </div>
      )}
    </Box>
  );

  const renderBack = () => (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        height: "400px",
        width: "400px",
        borderRadius: "20px",
        marginTop: "100px",
        marginBottom: "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          color: "#2D1332",
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        كود التأكيد
      </Typography>

      {/* for deletttttte */}
      <Typography
        sx={{
          color: "#2D1332",
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {randomNumbers}
      </Typography>

      <Typography
        sx={{
          marginTop: "10px",
          color: "gray",
          fontSize: "11px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        .يرجى التأكد من الرسالة و ادخال الكود للاكمال
      </Typography>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "flex",
          marginTop: "40px",
        }}
      >
        <OtpInput
          inputStyle={{ width: "40px", height: "40px" }}
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </Box>
      <Circular handleReVerificationClick={handleReVerificationClick} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {warning && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <Alert severity="error">الأرقام غير متطابقة</Alert>
          </div>
        )}
      </div>
    </Box>
  );

  return (
    <div
      style={{
        backgroundImage: `url(${pic})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
        height: "90vh",
      }}
    >
      {currentSide === "front" ? renderFront() : renderBack()}
    </div>
  );
}
