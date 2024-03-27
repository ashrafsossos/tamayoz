import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FavCards({ subjects, matches }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDislike = (id) => {
    // const storedLiked = localStorage.getItem(`${subjects.id}`);
    // const newLiked = JSON.parse(!storedLiked)
    // localStorage.setItem(`${subjects.id}`, newLiked);
    const formData = new FormData();
    formData.append("subject_id", id);
    axios
      .post(`${process.env.REACT_APP_API_URL}unsaveSubject`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload(true);
      });
  };
  const handleBtn = (id) => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}show_my_subjects_videos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.subject.videos.length > 0) {
            navigate("/MySubjects", {
              state: {
                subject: res.data.subject,
                videoLength: res.data.subject.videos.length,
                id: id,
              },
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container
        sx={{
          marginTop: "30px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "50px",
        }}
      >
        {subjects.length > 0 ? (
          subjects.map((s, i) => (
            <Card
              key={i}
              sx={{ borderRadius: "20px", width: "500px", cursor: "pointer" }}
              onClick={() => {
                handleBtn(s.id);
              }}
            >
              <CardContent>
                <Stack
                  direction={matches ? "row" : "column"}
                  gap={5}
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <img
                    alt="img1"
                    src={`${process.env.REACT_APP_API_URL_IMAGE}${s.image}`}
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Stack direction="column">
                    <Typography
                      sx={{
                        color: "#2D1332",
                        fontSize: "20px",
                        marginTop: "20px",
                      }}
                    >
                      المادة : {s.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#2D1332",
                        fontSize: "20px",
                        marginTop: "20px",
                      }}
                    >
                      الأستاذ :{s.teacher_name}
                    </Typography>
                    <Button
                      sx={{ color: "#00797C", marginTop: "10px" }}
                      onClick={() => {
                        handleDislike(s.id);
                      }}
                    >
                      إزالة
                    </Button>
                  </Stack>
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
      </Container>
    </div>
  );
}
