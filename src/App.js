import React, { useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import FirstPage from "./Pages/FirstPage";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { HelmetProvider } from "react-helmet-async";
import Subjects from "./Pages/Subjects";

import { useSelector } from "react-redux";
import Verification from "./Pages/Verification";
import ResetPassword from "./Pages/ResetPassword";
import Profile from "./Pages/Profile";
import { createTheme, ThemeProvider } from "@mui/material";
import TeacherSubject from "./Pages/TeacherSubject";
import TeacherProfile from "./Pages/TeacherProfile";

function App() {
  const [theState, setTheState] = useState(false);
  const [theIm, setTheIm] = useState(false);
  const auth = useSelector((state) => state.auth.Authinticate);
  const role = localStorage.getItem("role");

  const theme = createTheme({
    typography: {
      fontFamily: "Noto Kufi Arabic",
    },
  });
  return (
    <div>
      <HelmetProvider>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <Navbar theState={theState} theIm={theIm} />
            <Routes>
              <Route
                path="/"
                element={<FirstPage setTheState={setTheState} />}
              />
              <Route
                path="/Login"
                element={<Login setTheState={setTheState} />}
              />
              <Route
                path="/Verification"
                element={<Verification setTheState={setTheState} />}
              />
              <Route
                path="/Signup"
                element={<Signup setTheState={setTheState} />}
              />
              <Route
                path="/ResetPassword"
                element={<ResetPassword setTheState={setTheState} />}
              />
              <Route
                path="/Subjects"
                element={
                  auth && role === "student" ? (
                    <Subjects setTheState={setTheState} />
                  ) : (
                    <Login setTheState={setTheState} />
                  )
                }
              />

              <Route
                path="/Profile"
                element={
                  auth && role === "student" ? (
                    <Profile setTheState={setTheState} />
                  ) : (
                    <Login setTheState={setTheState} />
                  )
                }
              />

              <Route path="*" element={<Login setTheState={setTheState} />} />

              <Route
                path="/TeacherSubject"
                element={
                  auth && role === "teacher" ? (
                    <TeacherSubject setTheState={setTheState} />
                  ) : (
                    <Login setTheState={setTheState} />
                  )
                }
              />

              <Route
                path="/TeacherProfile"
                element={
                  auth && role === "teacher" ? (
                    <TeacherProfile setTheState={setTheState} />
                  ) : (
                    <Login setTheState={setTheState} />
                  )
                }
              />
            </Routes>
          </ThemeProvider>
          <Footer />
        </HashRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;
