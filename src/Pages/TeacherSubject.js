import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  useMediaQuery,
  Skeleton,
  Stack,
} from "@mui/material";
import bg from "../Media/bg.png";
import BackBtn from "../Components/BackBtn";
import { useNavigate } from "react-router-dom";
import SkeletonChildren from "../Components/SkeletonChildren";

export default function TeacherSubject({ setTheState }) {
  const token = localStorage.getItem("token");
  const [subject, setSubject] = useState([]);
  const matches = useMediaQuery("(min-width:875px)");
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const backdropRef = useRef(null);
  const windowHeight = useRef(window.innerHeight);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}getTeacherLessons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSubject(res.data.data);
          setLoading(false);
        });
      setTheState(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCourse = () => {
    setShowDetails(true);
  };
  const handleCloseBackdrop = (event) => {
    if (backdropRef.current && !backdropRef.current.contains(event.target)) {
      setShowDetails(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (backdropRef.current && !backdropRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      style={{
        direction: "rtl",
        backgroundImage: `url(${bg})`,
        height: windowHeight.current,
        position: "relative",
        paddingBottom: matches ? "250px" : "300%",
      }}
    >
      <BackBtn />
      <br />
      <br />
      <Typography
        sx={{
          fontSize: "25px",
          color: "#00797C",
          fontWeight: "bold",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        موادي
      </Typography>
      {loading && <SkeletonChildren />}
      {!loading && (
        <Container>
          <div
            style={{
              padding: "30px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            {subject.length > 0 ? (
              subject.map((s) => (
                <Card sx={{ width: "300px", borderRadius: "20px" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stack>
                      <img
                        alt="img1"
                        src={`${process.env.REACT_APP_API_URL_IMAGE}${s.image}`}
                        style={{
                          width: "160px",
                          borderRadius: "10px",
                          height: "160px",
                          objectFit: "fit",
                        }}
                      />
                      <Typography sx={{ marginTop: "20px", fontSize: "16px" }}>
                        اسم المادة : {s.name}
                        <br />
                        عدد الدروس : {s.number_lessons}
                        <br />
                        عدد الساعات : {s.number_hours}
                      </Typography>
                      <Button
                        sx={{
                          bgcolor: "#00797C",
                          color: "white",
                          marginTop: "20px",
                          "&:hover": { color: "white", bgcolor: "#00797C" },
                        }}
                        onClick={(e) => {
                          handleCourse(e, s.id);
                        }}
                      >
                        عرض المادة
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="paper">
                <div className="pin">
                  <div className="shadow"></div>
                  <div className="metal"></div>
                  <div className="bottom-circle"></div>
                </div>
                <p>لا يوجد مواد</p>
              </div>
            )}
          </div>
        </Container>
      )}
      {showDetails && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          onClick={handleCloseBackdrop}
        >
          <div
            ref={backdropRef}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
            }}
          >
            <Typography>الرجاء تحميل التطبيق لعرض المادة</Typography>
          </div>
        </div>
      )}
    </Box>
  );
}
