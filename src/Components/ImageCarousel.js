import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container, useMediaQuery } from "@mui/material";

export default function ImageCarousel({ images }) {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const matches = useMediaQuery("(min-width:1300px)");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <Container sx={{ marginTop: "20px", borderRadius: "20px" }}>
        <Box sx={{ maxWidth: "100%" }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 10,
              pl: 2,
              bgcolor: "background.default",
            }}
          ></Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images &&
              images.map((step, index) => (
                <div key={step.id}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <>
                      <Box
                        component="img"
                        sx={{
                          height: "450px",
                          objectFit: "fill",
                          display: "block",
                          maxWidth: "100%",
                          overflow: "hidden",
                          width: "100%",
                        }}
                        alt="img1"
                        src={`${process.env.REACT_APP_API_URL_IMAGE}${step.URL}`}
                      ></Box>
                    </>
                  ) : null}
                </div>
              ))}
          </AutoPlaySwipeableViews>
          <Button
            sx={{
              "&:hover": { color: "white", bgcolor: "#00797C" },
              position: "absolute",
              top: matches ? "550px" : "500px",
              left: matches ? "20%" : "50px",
              bgcolor: "#00797C",
              borderRadius: "100px",
              height: "30px",
              color: "white",
            }}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button
            sx={{
              "&:hover": { color: "white", bgcolor: "#00797C" },
              position: "absolute",
              top: matches ? "550px" : "500px",
              right: matches ? "20%" : "50px",
              bgcolor: "#00797C",
              borderRadius: "100px",
              color: "white",
              height: "30px",
            }}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      </Container>
    </div>
  );
}
