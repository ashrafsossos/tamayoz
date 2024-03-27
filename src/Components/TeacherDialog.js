import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Stack, Typography } from "@mui/material";
import bgimg from "../Media/WhatsApp Image 2023-12-13 at 11..jpg";
import DialogActions from "@mui/material/DialogActions";
import Cloader from "./Cloader";

export default function TeacherDialog({ open, setOpen, teacher, loading }) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth] = React.useState("xs");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{
        ".MuiPaper-root": {
          borderRadius: "30px",
          height: "550px",
          border: "10px solid #00797C",
        },
      }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Cloader />
          </div>
        )}

        {!loading && (
          <>
            <Stack
              direction="column"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${bgimg})`,
                  justifyContent: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  objectFit: "fit",
                  backgroundRepeat: "no-repeat",
                  height: "225px",
                  width: "220px",
                  direction: "rtl",
                }}
              >
                <img
                  alt="img1"
                  src={`${process.env.REACT_APP_API_URL_IMAGE}${teacher.main_image}`}
                  style={{
                    height: "160px",
                    width: "160px",
                    borderRadius: "100%",
                    objectFit: "contain",
                    marginTop: "33px",
                    marginLeft: "3px",
                  }}
                />
              </Box>
              <Typography
                sx={{ fontSize: "30px", fontWeight: "bold", color: "#00797C" }}
              >
                {teacher.name}
              </Typography>
              <Typography
                sx={{ fontSize: "20px", color: "gray", marginTop: "10px" }}
              >
                المادة : {teacher.subject_name}
              </Typography>
              <Typography
                sx={{ fontSize: "16px", color: "#00797C", marginTop: "20px" }}
              >
                {teacher.description}
              </Typography>
            </Stack>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#2D1332" }}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  );
}
