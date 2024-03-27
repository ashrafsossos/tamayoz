import {
  Stack,
  Box,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ImgCarousel from "./ImgCarousel";
import { useTranslation } from "react-i18next";

export default function WhoAreWe({ whyus, teachers, txt }) {
  const matches = useMediaQuery("(min-width:624px)");
  const { t } = useTranslation();

  return (
    <div id={t("من نحن")}>
      <Container>
        <Stack direction={matches ? "row" : "column"} gap={10}>
          <Box sx={{ width: matches ? "50%" : "90%", marginTop: "2%" }}>
            <img
              alt="img1"
              src={`${process.env.REACT_APP_API_URL_IMAGE}${whyus.image}`}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
          <Box sx={{ width: matches ? "50%" : "90%" }}>
            <Typography
              sx={{
                color: "#00797C",
                fontWeight: "bold",
                fontSize: "30px",
                marginBottom: "50px",
                marginTop: matches ? "100px" : "0px",
              }}
            >
              معهد التميز للمتفوقين
            </Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {whyus.description}
            </Typography>
          </Box>
        </Stack>
        <ImgCarousel teachers={teachers} txt={txt} />
      </Container>
    </div>
  );
}
