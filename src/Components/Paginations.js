import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Paginations() {
  const { t } = useTranslation();
  const pageSize = 4;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [c, setC] = useState();
  const [cat, setCat] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}show_soperior`).then((res) => {
        setCat(res.data.data.slice(pagination.from, pagination.to));
        setC(res.data.data.length);
      });
    } catch (error) {
      console.log(error);
    }
  }, [pagination.from, pagination.to]);

  const handlePageChange = (e, page) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <>
      <div
        id={t("Superiors")}
        style={{
          marginBottom: "40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cat &&
          cat.map((c, i) => (
            <Stack key={i} sx={{ direction: "rtl" }}>
              <img
                alt="img1"
                src={`${process.env.REACT_APP_API_URL_IMAGE}${c.image}`}
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "1000px",
                  margin: "20px",
                }}
                alt={c.caption}
              />
              <Typography sx={{ color: "#227B7E", fontSize: "20px" }}>
                اسم الطالب: {c.name}
              </Typography>
              <Typography>
                المادة: {c.subject_name} <br />
                التقييم : {c.rate}
              </Typography>
              <br />
            </Stack>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={Math.ceil(c / pageSize)}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
