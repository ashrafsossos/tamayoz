import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function CategoryCards({ cat, cattxt }) {
  const { t } = useTranslation();
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleSubject = (e, id) => {
    if (!token) {
      alert("يجب تسجيل الدخول أولاً");
    } else {
      try {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}show_subject_by_category/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setSubjects(res.data.data);
            navigate("/Subjects", { state: { subjects: res.data.data } });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div id={t("Categories")}>
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
        }}
      >
        {cattxt}
      </Typography>
      <div
        style={{
          backgroundColor: "#F1F1F1",
          padding: "50px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {cat &&
          cat.map((c, i) => (
            <Card
              key={i}
              sx={{ width: "300px", height: "300px", borderRadius: "20px" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="img1"
                  src={`${process.env.REACT_APP_API_URL_IMAGE}${c.image}`}
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                    height: "200px",
                    objectFit: "fill",
                  }}
                />
              </CardContent>
              <CardActions
                sx={{
                  borderRadius: "1000px",
                  boxShadow: "1px 1px 5px #D3D3D3",
                  marginTop: "16px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  size="small"
                  sx={{ color: "black", fontSize: "16px" }}
                  onClick={(e) => {
                    handleSubject(e, c.id);
                  }}
                >
                  {c.name}
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
}
