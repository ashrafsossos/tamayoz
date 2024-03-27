import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Message } from "@mui/icons-material";

export default function ConirmitionDialog({
  setOpen,
  open,
  buy,
  totalp,
  message,
}) {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate("/ShowSubjects");
  };
  return (
    <div>
      <Dialog sx={{ direction: "rtl" }} open={open} onClose={handleClose}>
        <DialogTitle>قمت بشراء :</DialogTitle>
        <DialogContent sx={{ padding: "30px" }}>
          <Stack gap={1}>
            {message && (
              <Typography sx={{ fontSize: "20px" }}>{message}</Typography>
            )}
            {buy.map((b, i) => (
              <Box key={i}>
                <Typography sx={{ fontSize: "20px" }}>
                  المادة : {b.name}
                </Typography>
                <Typography sx={{ fontSize: "20px" }}>
                  السعر : {b.price}
                </Typography>
              </Box>
            ))}
            <Typography sx={{ fontSize: "20px" }}>
              السعر الكامل : {totalp}
            </Typography>
            <Typography sx={{ fontSize: "20px" }}>
              رقم التواصل : 093609360936{" "}
            </Typography>
          </Stack>
          <Button
            onClick={() => {
              alert("Coming Soon");
            }}
            sx={{
              bgcolor: "#00797C",
              color: "white",
              "&:hover": { color: "#00797C", bgcolor: "white" },
              marginTop: "30px",
            }}
          >
            الدفع الالكتروني
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ color: "#00797C", "&:hover": { color: "#00797C" } }}
          >
            إلغاء
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
