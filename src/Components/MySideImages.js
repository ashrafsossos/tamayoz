import React from "react";
import ImageList from "@mui/material/ImageList";
import { Link, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function MySideImages({
  setThe_Vid,
  setDescription,
  setDate,
  setUnitId,
  setI,
  setAlerting,
  unites,
  setVideo_id,
  setArray,
  setCnumber,
  id,
  setLoading,
  setVids,
  setLen,
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [vid, setVid] = useState([]);

  useEffect(() => {
    if (id) {
      if (role === "student") {
        axios
          .get(`${process.env.REACT_APP_API_URL}show_comments/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setArray(res.data.comments);
            setCnumber(res.data.CommentCount);
            setLoading(false);
          });
      }
      if (role === "teacher") {
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
            setLoading(false);
          });
      }
    }
  }, [id, token, selectedUnitId]);

  const handleBtn = (video_id, url, discription, date) => {
    setVideo_id(video_id);
    setLoading(true);
    setAlerting(false);
    setThe_Vid(url);
    setDescription(discription);
    setDate(date);
  };

  const handleLink = (id, index) => {
    setUnitId(id);
    setI(index);
    setSelectedUnitId(id);
    axios
      .get(`${process.env.REACT_APP_API_URL}getAllVideoUnite/${id}`)
      .then((res) => {
        setVid(res.data);
        setVids(res.data);
        setLen(res.data.length);
      });
  };

  return (
    <div>
      <Stack
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {unites.map((unit, index) => (
          <React.Fragment key={unit.id}>
            <Link
              sx={{
                fontSize: "22px",
                color: "#00797C",
                fontWeight: "bold",
                marginTop: "45px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleLink(unit.id, index);
              }}
            >
              {unit.unite_name}
            </Link>
            {selectedUnitId === unit.id && (
              <ImageList cols={1}>
                {vid.map((item, i) => (
                  <Stack direction="row" gap={1} key={item.id}>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        alt="img1"
                        style={{
                          width: "170px",
                          height: "90px",
                          cursor: "pointer",
                        }}
                        src={`${process.env.REACT_APP_API_URL_IMAGE}${item.image}`}
                        loading="lazy"
                        onClick={(e) => {
                          handleBtn(
                            item.id,
                            item.url,
                            item.description,
                            item.created_at
                          );
                        }}
                        alt=""
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "14px",
                          right: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "20px",
                          backgroundColor: "black",
                          opacity: "0.8",
                          borderRadius: "20px",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", color: "white" }}>
                          {item.duration}:00
                        </Typography>
                      </div>
                    </div>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        cursor: "pointer",
                        padding: "10px",
                      }}
                      onClick={(e) => {
                        handleBtn(
                          item.id,
                          item.url,
                          item.description,
                          item.created_at
                        );
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                ))}
              </ImageList>
            )}
          </React.Fragment>
        ))}
      </Stack>
    </div>
  );
}
