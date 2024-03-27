import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { Typography, useMediaQuery } from "@mui/material";
import TeacherDialog from "./TeacherDialog";
import axios from "axios";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function ImgCarousel({ teachers, txt }) {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerRow = 3;
  const maxSteps = teachers.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleCard = (id) => {
    setOpen(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}show_teacher_by_id/${id}`)
      .then((res) => {
        setTeacher(res.data.data);
        setLoading(false);
      });
  };

  const displayCardsInRows = (cards) => {
    const rows = [];
    const totalRows = Math.ceil(cards.length / itemsPerRow);

    for (let i = 0; i < totalRows; i++) {
      const cardsForRow = cards.slice(i * itemsPerRow, (i + 1) * itemsPerRow);

      const row = (
        <div
          key={i}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "50px",
            marginBottom: "30px",
          }}
        >
          {cardsForRow.map((c) => (
            <Card
              key={c.id}
              sx={{
                borderRadius: "20px",
                border: "none",
                boxShadow: "0px 0px 0px 0px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleCard(c.id);
              }}
            >
              <CardContent>
                <img
                  alt="img1"
                  src={`${process.env.REACT_APP_API_URL_IMAGE}${c.main_image}`}
                  style={{
                    borderRadius: "100%",
                    width: "200px",
                    height: "200px",
                    objectFit: "fit",
                  }}
                />
                <Typography sx={{ padding: "20px", fontSize: "18px" }}>
                  {c.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      );

      rows.push(row);
    }

    return rows;
  };

  return (
    <div
      style={{ bgcolor: "#C1C1C1", marginTop: "60px", position: "relative" }}
    >
      <Typography
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "30px",
          marginTop: "20px",
          color: "#227B7E",
          marginBottom: "20px",
        }}
      >
        {txt}
      </Typography>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        interval={5000}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {displayCardsInRows(teachers)}
      </AutoPlaySwipeableViews>
      <div style={{ position: "absolute", bottom: "40%" }}>
        <Button
          sx={{
            bgcolor: "#00797C",
            borderRadius: "100px",
            height: "30px",
            color: "white",
            margin: "10px",
          }}
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps % 3}
        >
          <ArrowBackIosIcon />
        </Button>
      </div>
      <div style={{ position: "absolute", bottom: "40%", right: "20px" }}>
        <Button
          sx={{
            bgcolor: "#00797C",
            borderRadius: "100px",
            color: "white",
            height: "30px",
            margin: "10px",
          }}
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
      <TeacherDialog
        open={open}
        setOpen={setOpen}
        teacher={teacher}
        loading={loading}
      />
    </div>
  );
}
