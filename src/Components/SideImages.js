import React from "react";
import ImageList from "@mui/material/ImageList";
import { Stack, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import WarningDialog from "./WarningDialog";
export default function SideImages({ images }) {
  const [open, setOpen] = React.useState(false);

  const handleBtn = () => {
    setOpen(true);
  };
  return (
    <div>
      <ImageList cols={1}>
        {images.map((item, Index) => (
          <Stack key={Index} direction="row" gap={1}>
            {item.locked === 0 ? (
              <>
                <img
                  alt="img1"
                  style={{ width: "170px", height: "90px", cursor: "pointer" }}
                  src={`${process.env.REACT_APP_API_URL_IMAGE}${item.image}`}
                  loading="lazy"
                />
                <Typography sx={{ fontSize: "16px", padding: "10px" }}>
                  {item.title}
                </Typography>
              </>
            ) : (
              <>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    alt="img2"
                    style={{
                      width: "170px",
                      height: "90px",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    src={`${process.env.REACT_APP_API_URL_IMAGE}${item.image}`}
                    loading="lazy"
                    onClick={handleBtn}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "27px",
                      height: "27px",
                    }}
                  >
                    <LockIcon />
                  </div>
                </div>
                <Typography
                  sx={{ opacity: "0.5", fontSize: "18px", padding: "10px" }}
                >
                  {item.title}
                </Typography>
              </>
            )}
          </Stack>
        ))}
      </ImageList>
      <WarningDialog open={open} setOpen={setOpen} />
    </div>
  );
}
