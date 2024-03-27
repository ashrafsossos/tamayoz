import { Alert, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { TextField, TextareaAutosize } from "@mui/material";
import TeacherCommentsSection from "./TeacherCommentsSection";
import axios from "axios";
import Cloader from "./Cloader";

export default function TeacherComments({
  id,
  array,
  cnumber,
  loading,
  setArray,
  setCnumber,
  alerting,
  setAlerting,
}) {
  const matches = useMediaQuery("(min-width:430px)");
  const [comment, setComment] = useState("");
  const [appear, setAppear] = useState(false);
  const token = localStorage.getItem("token");
  const info = localStorage.getItem("image");
  if (info) {
    var modifiedStr = info.replace(/"/g, "");
  }

  const handleCommenting = (e) => {
    setComment(e.target.value);
    setAlerting(false);
  };
  const handleComment = () => {
    const formData = new FormData();
    if (comment.length > 0) {
      formData.append("video_id", id);
      formData.append("comment_body", comment);
      axios
        .post(`${process.env.REACT_APP_API_URL}add_comment_teacher`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          axios
            .get(
              `${process.env.REACT_APP_API_URL}show_comments_for_teacher/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setArray(res.data.comments);
              setCnumber(res.data.CommentCount);
              setComment("");
            });
        });
    } else {
      setAlerting(true);
    }
  };
  return (
    <>
      {loading && <Cloader />}
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "50px" }}>
        {!loading && (
          <Stack
            direction="column"
            gap={2}
            sx={{ justifyContent: "start", alignItems: "start" }}
          >
            {matches || (appear && id) ? (
              <>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#00797C",
                  }}
                  onClick={() => {
                    setAppear(!appear);
                  }}
                >
                  {cnumber} التعليقات
                </Typography>
                <Stack
                  direction={matches ? "row" : "column"}
                  gap={matches ? 5 : 1}
                >
                  <img
                    alt="img1"
                    src={`${process.env.REACT_APP_API_URL_IMAGE}${modifiedStr}`}
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <TextField
                    name="comment"
                    label="إضافة تعليق"
                    value={comment}
                    variant="standard"
                    onChange={(e) => {
                      handleCommenting(e);
                    }}
                  />
                  <Button sx={{ color: "#00797C" }} onClick={handleComment}>
                    إرسال
                  </Button>
                </Stack>
                {alerting && (
                  <Alert severity="error">لا يمكن أن يكون الحقل فارغ</Alert>
                )}
                <TeacherCommentsSection array={array} />
              </>
            ) : (
              <Button
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#00797C" }}
                onClick={() => {
                  setAppear(true);
                }}
              >
                {cnumber} التعليقات
              </Button>
            )}
          </Stack>
        )}
      </div>
    </>
  );
}
