import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../Media/bg.png";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Container, Stack, useMediaQuery } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BackBtn from "../Components/BackBtn";
import ConirmitionDialog from "../Components/ConirmitionDialog";

export default function Subjects({ setTheState }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [alerting, setAlerting] = useState(false);
  const [message, setMessage] = useState(false);
  const location = useLocation();
  const { state } = location;
  const { subjects } = state;
  const [open, setOpen] = React.useState(false);
  const [buy, setBuy] = React.useState([]);
  const [totalp, setTotalp] = React.useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:500px)");
  const [showDetails, setShowDetails] = useState(false);
  const backdropRef = useRef(null);

  useEffect(() => {
    setTheState(false);
  }, []);

  const handleDetails = () => {
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
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        position: "relative",
        padding: matches ? "60px" : "40px",
        minHeight: "100vh",
      }}
    >
      <BackBtn />
      <Container
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        {subjects.length > 0 ? (
          subjects.map((s, Index) => (
            <Card
              key={Index}
              sx={{
                maxWidth: "500px",
                borderRadius: "20px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Stack direction={matches ? "row" : "column"}>
                <CardMedia
                  sx={{
                    height: matches ? 120 : 80,
                    width: matches ? 120 : "80%",
                    marginTop: matches ? "40px" : "20px",
                    borderRadius: "200px",
                    objectFit: "cover",
                    marginLeft: "15px",
                  }}
                  image={`${process.env.REACT_APP_API_URL_IMAGE}${s.image}`}
                />
                <CardContent>
                  <Typography gutterBottom>
                    اسم المادة : {s.subject_name}
                  </Typography>
                  <Typography gutterBottom>
                    اسم الأستاذ : {s.teacher_name}
                  </Typography>
                  <Typography gutterBottom>
                    عدد الدروس : {s.number_lessons}
                  </Typography>
                  <Typography gutterBottom>
                    الساعات : {s.number_hours}
                  </Typography>
                  <Typography gutterBottom sx={{ color: "#13C43C" }}>
                    السعر : {s.price}
                  </Typography>

                  <Button
                    sx={{
                      bgcolor: "#00797C",
                      color: "white",
                      "&:hover": { color: "#00797C", bgcolor: "white" },
                    }}
                    onClick={handleDetails}
                  >
                    التفاصيل
                  </Button>
                </CardContent>
              </Stack>
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
      </Container>
      <ConirmitionDialog
        open={open}
        setOpen={setOpen}
        buy={buy}
        totalp={totalp}
        message={message}
      />
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
    </div>
  );
}
