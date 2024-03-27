import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function NewsCards({ News, Newstxt }) {
  const matches = useMediaQuery("(min-width:1113px)");
  const [activeStep, setActiveStep] = useState(0);
  const itemsPerRow = matches ? 3 : 1;
  const maxSteps = News.length;
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
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
            alignItems: "center",
            gap: "50px",
            marginBottom: "30px",
          }}
        >
          {cardsForRow.map((c) => (
            <Card key={c.id} sx={{ width: "420px", borderRadius: "20px" }}>
              <CardContent
                sx={{
                  padding: matches ? "5px" : "50px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_IMAGE}${c.image}`}
                  style={{
                    borderRadius: "20px",
                    width: "380px",
                    height: "250px",
                    objectFit: "fit",
                  }}
                  alt={c.caption}
                />
                <Typography sx={{ padding: "20px" }}>
                  {c.description}
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
      id={t("الأخبار")}
      style={{ backgroundColor: "#F1F1F1", padding: "20px", marginTop: "20px" }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          marginTop: "20px",
          color: "#227B7E",
          marginBottom: "20px",
        }}
      >
        {Newstxt}
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
        {displayCardsInRows(News)}
      </AutoPlaySwipeableViews>
      {matches ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
      ) : (
        <></>
      )}
    </div>
  );
}
