import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import axios from "axios";
import CheckBoxesComp from "./CheckBoxesComp";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DisabledCheckBoxes from "./DisabledCheckBoxes";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompleteExam({
  openfulldialog,
  sameID,
  notsameID,
  id,
  setOpenFullDialog,
}) {
  const token = localStorage.getItem("token");
  const [questionStates, setQuestionStates] = useState([]);
  const [finish, setFinish] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    var payload = {
      quizes: questionStates,
    };
    if (!finish) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}store_pause_Exam/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          navigate("/Exams");
          setOpenFullDialog(false);
          window.location.reload(true);
        });
    }
    if (finish) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}store_finished_exam/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          navigate("/Exams");
          setOpenFullDialog(false);
        });
      window.location.reload(true);
    }
  };

  const handleCheckboxChange = (e, q, a) => {
    const newQuestionState = { question_id: q, answer_id: a };
    const existingQuestionIndex = questionStates.findIndex(
      (item) => item.question_id === q
    );
    if (existingQuestionIndex !== -1) {
      const newQuestionStates = [...questionStates];
      newQuestionStates[existingQuestionIndex] = newQuestionState;
      setQuestionStates(newQuestionStates);
    } else {
      setQuestionStates((prevQuestionStates) => [
        ...prevQuestionStates,
        newQuestionState,
      ]);
    }
    if (questionStates.length === sameID.length - 1) {
      setFinish(true);
    }
  };

  const isAnswerChecked = (q, a) => {
    return (
      questionStates.findIndex(
        (item) => item.question_id === q && item.answer_id === a
      ) !== -1
    );
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={openfulldialog}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          ".css-10ghrmp-MuiPaper-root-MuiAppBar-root": { bgcolor: "#00797C" },
          direction: "rtl",
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <DialogTitle
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                ml: 2,
                flex: 1,
              }}
            >
              الامتحان النهائي
            </DialogTitle>
            <Button autoFocus color="inherit" onClick={handleClose}>
              {finish ? "إنهاء" : "إيقاف"}
            </Button>
            {/* </>} */}
          </Toolbar>
        </AppBar>
        <List>
          {sameID.map((q, questionIndex) => (
            <>
              <ListItem
                key={questionIndex}
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {q.question}
              </ListItem>
              <Stack
                direction="row"
                gap={3}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {q.ans.map((a, i) => (
                  <DisabledCheckBoxes
                    key={i}
                    label={a.answer}
                    checked={q.answers_id}
                  />
                ))}
                <DisabledCheckBoxes label={q.answer} checked={q.answer} />
              </Stack>
              <Divider sx={{ marginBottom: "50px", marginTop: "50px" }} />
            </>
          ))}
        </List>

        <List>
          {notsameID.map((q, questionIndex) => (
            <>
              <ListItem
                key={questionIndex}
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {q.question}
              </ListItem>
              <Stack
                direction="row"
                gap={3}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {q.answers.map((a, answerIndex) => (
                  <CheckBoxesComp
                    key={answerIndex}
                    label={a.answer}
                    checked={isAnswerChecked(q.id, a.id)}
                    onChange={(e) => handleCheckboxChange(e, q.id, a.id)}
                  />
                ))}
              </Stack>
              <Divider sx={{ marginBottom: "50px", marginTop: "50px" }} />
            </>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
