import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import facebook from "./Media/3670124.png";
import whatsapp from "./Media/whatsapp.png";
import telegram from "./Media/telegram.png";
export default function Footer() {
  const matches = useMediaQuery("(min-width:594px)");

  return (
    <div
      style={{
        backgroundColor: "#00797C",
        bottom: "0px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: matches ? "flex" : "",
          padding: matches ? "25px" : "40px",
          flexWrap: matches ? "wrap" : "",
          alignItems: matches ? "center" : "",
          justifyContent: matches ? "center" : "",
        }}
        gap={2}
      >
        <Box sx={{ width: "40%", display: "flex", flexWrap: "flex" }}>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "white", fontSize: matches ? "21px" : "20px" }}
            >
              صُمم مِن قِبل
              <a
                href="https://focustradingcompany.com/"
                style={{ padding: "5px" }}
                target="_blank"
                rel="noreferrer"
              >
                شركة تركيز للتحول الرقمي{" "}
              </a>
              جميع الحقوق محفوظة © 2024
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexWrap: "flex",
            marginTop: "10px",
          }}
        >
          <a
            target="_blank"
            href="https://whatsapp.com/channel/0029VaGhyjG2v1Is6Mnc061X"
            rel="noreferrer"
            style={{ marginRight: matches ? "13px" : undefined }}
          >
            <img
              alt="image1"
              src={whatsapp}
              style={{
                width: "40px",
                height: "40px",
                marginRight: "10px",
                cursor: "pointer",
                marginLeft: matches ? "30%" : "0",
              }}
            />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/altamayoz.instetute?mibextid=ZbWKwL"
            rel="noreferrer"
          >
            <img
              src={facebook}
              alt="img2"
              style={{
                width: "40px",
                height: "40px",
                marginRight: "10px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            />
          </a>
          <a
            target="_blank"
            href="https://t.me/Altmayuzinstitute"
            rel="noreferrer"
          >
            <img
              alt="img3"
              src={telegram}
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            />
          </a>
        </Box>
      </Stack>
    </div>
  );
}
