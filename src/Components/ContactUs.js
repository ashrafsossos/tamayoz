import React from "react";
import Form from "./Form";
import { useMediaQuery, Stack, Container } from "@mui/material";
import ContactInfo from "./ContactInfo";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const matches = useMediaQuery("(min-width:905px)");
  const { t } = useTranslation();
  return (
    <div
      id={t("تواصل معنا")}
      style={{
        padding: matches ? "20px" : "0px",
        backgroundImage: `linear-gradient(to right, #6DB3B5, white)`,
      }}
    >
      <Container>
        <Stack
          direction="row"
          sx={{
            direction: "rtl",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={matches ? 10 : 2}
        >
          <Form matches={matches} />
          <ContactInfo />
        </Stack>
      </Container>
    </div>
  );
}
