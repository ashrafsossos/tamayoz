import {
  Stack,
  Typography,
  Button,
  useMediaQuery,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import axios from "axios";

const TeacherCommentsSection = ({ array }) => {
  const matches = useMediaQuery("(min-width:430px)");
  return (
    <>
      <Stack
        direction="column"
        gap={3}
        sx={{ marginLeft: matches ? "20px" : "-60px" }}
      >
        {array.map((reply) => (
          <Stack key={reply.name} direction="row" gap={2}>
            <img
              alt="img1"
              src={`${process.env.REACT_APP_API_URL_IMAGE}${reply.main_image}`}
              style={{
                height: "70px",
                width: "70px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <Stack
              direction="column"
              gap={1}
              sx={{ display: "flex", flexWrap: "wrap", alignItems: "start" }}
            >
              <Typography sx={{ color: "#00797C" }}>
                {reply.teacher_name}
              </Typography>
              <Typography>{reply.comment}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

const YourComponent = ({ array }) => {
  const [status, setStatus] = useState([]);
  const matches = useMediaQuery("(min-width:430px)");
  const [comment, setComment] = useState("");
  const [replay, setReplay] = useState("");

  const toggleStatus = (index) => {
    setStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = !updatedStatus[index];
      return updatedStatus;
    });
  };
  const [replyIndex, setReplyIndex] = useState(-1);
  const toggleReply = (index) => {
    setReplyIndex(replyIndex === index ? -1 : index);
  };
  const handleCommenting = (e) => {
    setReplay(e.target.value);
  };
  const handleReply = (e, index) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("reply_body", replay);
    formData.append("comment_id", index);
    axios
      .post(`${process.env.REACT_APP_API_URL}reply_comment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload(true);
      });
  };
  return (
    <Stack direction="column" gap={3} sx={{ marginTop: "20px" }}>
      {array &&
        array.map((a, index) => (
          <Stack key={a.name} direction="row" gap={2}>
            <img
              alt="img2"
              src={`${process.env.REACT_APP_API_URL_IMAGE}${a.main_image}`}
              style={{
                height: "70px",
                width: "70px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <Stack
              direction="column"
              gap={1}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "start",
                marginTop: "10px",
              }}
            >
              <Stack direction={matches ? "row" : "column"} gap={10}>
                <Stack
                  direction="column"
                  gap={1}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "start",
                    marginTop: "10px",
                  }}
                >
                  <Typography sx={{ color: "#00797C" }}>
                    {a.first_name} {a.last_name}
                  </Typography>
                  <Typography>{a.body}</Typography>
                </Stack>
                <Button
                  onClick={() => toggleReply(index)}
                  sx={{
                    bgcolor: "#00797C",
                    color: "white",
                    height: "20px",
                    marginTop: "20px",
                    "&:hover": { color: "white", bgcolor: "#00797C" },
                  }}
                >
                  Reply
                </Button>
              </Stack>
              {a.replies.length > 0 && (
                <Button
                  sx={{ color: "#00797C", fontSize: "10px" }}
                  onClick={() => toggleStatus(index)}
                >
                  {status[index] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  {a.replies_count} الردود
                </Button>
              )}
              {status[index] && <TeacherCommentsSection array={a.replies} />}

              {replyIndex === index && (
                <Stack
                  direction={matches ? "row" : "column"}
                  gap={matches ? 5 : 1}
                >
                  <TextField
                    label="إضافة رد"
                    value={replay}
                    variant="standard"
                    sx={{ marginTop: "5px" }}
                    onChange={(e) => {
                      handleCommenting(e);
                    }}
                  />
                  <Button
                    sx={{ color: "#00797C", marginTop: "15px" }}
                    onClick={(e) => {
                      handleReply(e, a.id);
                    }}
                  >
                    إرسال
                  </Button>
                </Stack>
              )}
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
};

export default YourComponent;
