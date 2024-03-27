import React, { useEffect, useState } from "react";
import ImageCarousel from "../Components/ImageCarousel";
import CategoryCards from "../Components/CategoryCards";
import WhoAreWe from "../Components/WhoAreWe";
import NewsCards from "../Components/NewsCards";
import Paginations from "../Components/Paginations";
import { Container, Typography } from "@mui/material";
import ContactUs from "../Components/ContactUs";
import axios from "axios";
import "../App.css";
import Loader from "../Components/Loader";

export default function FirstPage({ setTheState }) {
  const [images, setImages] = useState([]);
  const [cat, setCat] = useState([]);
  const [whyus, setWhyUs] = useState([]);
  const [News, setNews] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}show_first_images`)
        .then((res) => {
          setImages(res.data.images);
          setLoading(false);
        });

      setTheState(true);

      axios.get(`${process.env.REACT_APP_API_URL}show_category`).then((res) => {
        setCat(res.data.data);
      });

      axios.get(`${process.env.REACT_APP_API_URL}show_about_us`).then((res) => {
        setWhyUs(res.data.data[0]);
      });

      axios.get(`${process.env.REACT_APP_API_URL}show_news`).then((res) => {
        setNews(res.data.data);
      });
      axios.get(`${process.env.REACT_APP_API_URL}show_teachers`).then((res) => {
        setTeachers(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div style={{ height: loading ? "85vh" : "" }}>
      {loading && <Loader />}
      {!loading && (
        <>
          <ImageCarousel images={images} />
          {role === "teacher" ? null : (
            <CategoryCards cat={cat} cattxt={"الأقسام"} />
          )}
          <WhoAreWe whyus={whyus} teachers={teachers} txt={"الأساتذة"} />
          <NewsCards News={News} Newstxt={"الأخبار"} />
          {/* <Typography
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
            المتفوقون
          </Typography>
          <Paginations />*/}
        </>
      )}
      <br />

      <ContactUs />
    </div>
  );
}
