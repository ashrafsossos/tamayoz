import { Stack, Typography, Button, useMediaQuery } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const CommentsSection = ({ array }) => {
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

  const toggleStatus = (index) => {
    setStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = !updatedStatus[index];
      return updatedStatus;
    });
  };

  return (
    <Stack direction="column" gap={3} sx={{ marginTop: "20px" }}>
      {array.map((a, index) => (
        <Stack key={a.name} direction="row" gap={2}>
          <img
            src={`${process.env.REACT_APP_API_URL_IMAGE}${a.image}`}
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
            <Typography sx={{ color: "#00797C" }}>
              {a.first_name} {a.last_name}
            </Typography>
            <Typography>{a.body}</Typography>
            {a.replies.length > 0 && (
              <Button
                sx={{ color: "#00797C", fontSize: "10px" }}
                onClick={() => toggleStatus(index)}
              >
                {status[index] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {a.replies_count} الردود
              </Button>
            )}
            {status[index] && <CommentsSection array={a.replies} />}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default YourComponent;
