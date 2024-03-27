import React, { useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Timing from "./Timing";
import ShowMore from "./ShowMore";
import TeacherDialog from "./TeacherDialog";
import axios from "axios";

export default function Discription({
  subjects,
  matches,
  Discription,
  teacher,
  date,
}) {
  //  const storedLiked = localStorage.getItem(`${subjects.id}`);
  //  const [liked,setLiked]=useState(storedLiked ? JSON.parse(storedLiked) : false)
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  //  const handleLike = () => {
  //   const newLiked = !liked;
  //   setLiked(newLiked);
  //   localStorage.setItem(`${subjects.id}`, newLiked);
  //   const formData = new FormData();
  //   formData.append('subject_id', subjects.id);
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}addSubjectToFavorite`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  // }

  // const handledisLike = () => {
  //   const newLiked = !liked;
  //   setLiked(newLiked);
  //   localStorage.setItem(`${subjects.id}`, newLiked);
  //   const formData = new FormData();
  //   formData.append('subject_id', subjects.id);
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}unsaveSubject`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  // };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div style={{ marginBottom: "30px" }}>
      <Stack
        sx={{ marginRight: "50%", marginBottom: "10px", marginTop: "10px" }}
        direction="row"
        gap={matches ? 60 : 5}
      >
        <Typography sx={{ fontSize: "30px", marginBottom: "10px" }}>
          {subjects.name}
        </Typography>
        {/* {like && !liked &&
        <FavoriteBorderIcon sx={{ width:'80px',height:'40px',cursor:'pointer' }} 
        onClick={handleLike} />}
        {like && liked &&
        <FavoriteIcon sx={{ width:'80px',height:'40px',cursor:'pointer',color:'red' }} 
        onClick={handledisLike} />
        } */}
      </Stack>
      <Stack
        direction="row"
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          handleClick();
        }}
      >
        <img
          alt="img1"
          src={`${process.env.REACT_APP_API_URL_IMAGE}${subjects.main_image}`}
          style={{ width: "60px", height: "60px", borderRadius: "100%" }}
        />
        <Typography sx={{ fontSize: "20px", marginTop: "20px" }}>
          الأستاذ : {subjects.teacher_name}
        </Typography>
      </Stack>
      <Stack
        direction="column"
        gap={1}
        sx={{
          bgcolor: "rgb(240, 240, 240)",
          marginTop: "20px",
          borderRadius: "5px",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Stack direction="row" gap={2}>
          {/* <Typography>
            21M views 
          </Typography> */}
          <Timing date={date} />
        </Stack>
        {Discription && <ShowMore txt={Discription} />}
      </Stack>
      <TeacherDialog open={open} setOpen={setOpen} teacher={teacher} />
    </div>
  );
}
