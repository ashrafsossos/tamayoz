import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  Box,
  useMediaQuery,
  Stack,
  CircularProgress,
  Grid,
  MenuItem,
  Container,
  Link,
  Alert,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import pic from "../Media/Web.png";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CheckBoxesComp from "../Components/CheckBoxesComp";
import PrivacyDialog from "../Components/PrivacyDialog";

export default function Signup({ setTheState }) {
  const matches = useMediaQuery("(min-width:623px)");
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState("");
  const [city_id, setCity_id] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [alerting, setAlerting] = useState(false);
  const [alertt, setAlert] = useState(false);
  const [educationLevel, setEducationLevel] = useState([]);
  const [educationLevelID, setEducationLevelID] = useState([]);
  const [genders, setGenders] = useState([{ name: "أنثى" }, { name: "ذكر" }]);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [show, setShow] = useState(false);
  const [city_name, setCity_name] = useState("");

  const windowHeight = useRef(window.innerHeight);
  const handleLink = () => {
    setOpen(true);
    setAlerting(false);
    setChecked(!checked);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    if (checked === false) {
      setAlerting(true);
    } else {
      const formData = new FormData();
      if (!fname || !lname || !phone || !gender || !city_id || !password) {
        const requiredFields = [
          "fname",
          "lname",
          "phone",
          "gender",
          "city_id",
          "password",
          "city_name",
        ];
        const newEmptyFields = requiredFields.filter((field) => !eval(field));
        setEmptyFields(newEmptyFields);
      }
      if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[#?!@$%^&*-]/.test(password)
      ) {
        setAlert("يجب أن تكون كلمة المرور من 8 احرف و تحوي أحرف كبيرة و رموز");
      } else {
        formData.append("first_name", fname);
        formData.append("password", password);
        formData.append("last_name", lname);
        formData.append("gender", gender);
        formData.append("fcm_token", 666);
        formData.append("birthday", birthday);
        if (city_name) {
          formData.append("city_id", " ");
          formData.append("new_city", city_name);
        }
        if (!city_name) {
          formData.append("city_id", city_id);
          formData.append("new_city", " ");
        }
        formData.append("image", image);
        formData.append("class_student_id", educationLevelID);
        formData.append("phone", phone);
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        try {
          axios
            .post(`${process.env.REACT_APP_API_URL}student_register`, formData)
            .then((res) => {
              if (res.data.message === "Registered Successfully") {
                localStorage.setItem("Authinticate", true);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem(
                  "information",
                  JSON.stringify(res.data.client)
                );
                localStorage.setItem(
                  "image",
                  JSON.stringify(res.data.client.image)
                );
                alert("تم الإضافة بنجاح");
                navigate("/");
              } else if (res.data.message === "Registered fails") {
                setAlert(res.data.validation_error.password);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    try {
      setTheState(false);
      axios.get(`${process.env.REACT_APP_API_URL}getCities`).then((res) => {
        setCities(res.data.cities);
      });
      axios
        .get(`${process.env.REACT_APP_API_URL}show_class_student`)
        .then((res) => {
          setEducationLevel(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div
      style={{
        direction: "rtl",
        backgroundImage: `url(${pic})`,
        width: "100%",
        height: windowHeight.current,
        backgroundPosition: "center",
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        paddingBottom: matches ? "100px" : "800px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          width: "800px",
          borderRadius: "20px",
          marginTop: "50px",
        }}
      >
        <Typography
          sx={{
            color: "#2D1332",
            fontWeight: "bold",
            fontSize: "30px",
            marginBottom: "30px",
            marginTop: "20px",
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          إنشاء حساب
        </Typography>

        <Grid
          spacing={2}
          sx={{
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <Grid item xs={12} md={6}>
            <TextField
              name="fname"
              label="الاسم الأول"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
              sx={{ width: "250px" }}
              error={emptyFields.includes("fname")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="lname"
              label="الاسم الأخير"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
              sx={{ width: "250px" }}
              error={emptyFields.includes("lname")}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "100px",
          }}
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            {!show && (
              <TextField
                label="المدينة"
                name={city_name}
                required
                select
                value={city_id}
                error={emptyFields.includes("city_id")}
                onChange={(e) => {
                  setCity_id(e.target.value);
                }}
                sx={{ width: "250px" }}
              >
                {cities.map((c, Index) => (
                  <MenuItem
                    key={Index}
                    value={c.id}
                    onClick={() => {
                      if (c.name === "غير ذلك") {
                        setShow(true);
                      }
                    }}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {show && (
              <TextField
                name=" "
                label="المدينة"
                value={city_name}
                onChange={(e) => {
                  setCity_name(e.target.value);
                }}
                sx={{ width: "250px" }}
                error={emptyFields.includes("city_name")}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{ position: "absolute" }}>
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="new-password"
              name="password"
              label="كلمة المرور"
              error={emptyFields.includes("password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              sx={{ width: "250px" }}
              type={showPassword ? "text" : "password"}
              autocomplete="new-password"
            />
          </Grid>
        </Grid>
        <br />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {alertt && <Alert severity="error">{alertt}</Alert>}
        </div>
        <br />
        <br />
        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "100px",
          }}
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <TextField
              name="Gender"
              label="الجنس"
              required
              select
              error={emptyFields.includes("gender")}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              sx={{ width: "250px" }}
            >
              {genders.map((c, Index) => (
                <MenuItem key={Index} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="المستوى التعليمي"
              required
              select
              value={educationLevelID}
              onChange={(e) => {
                setEducationLevelID(e.target.value);
              }}
              sx={{ width: "250px" }}
            >
              {educationLevel.map((c) => (
                <MenuItem value={c.id} key={c.id}>
                  {c.class_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "100px",
          }}
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <TextField
              name="phone"
              label="رقم الموبايل"
              error={emptyFields.includes("phone")}
              value={phone}
              type="number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              sx={{ width: "250px" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <input
              style={{ width: "250px", height: "49px" }}
              type="date"
              id="birthday"
              name="birthday"
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
              sx={{ width: "250px" }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button
            component="label"
            sx={{
              bgcolor: "#2D1332",
              color: "white",
              "&:hover": { color: "white", bgcolor: "#2D1332" },
              width: "250px",
              marginTop: "30px",
              position: "relative",
            }}
            startIcon={
              <CloudUploadIcon
                sx={{ position: "absolute", right: "65px", bottom: "9px" }}
              />
            }
          >
            تحميل صورة
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </Button>
        </Grid>
        <br />
        <br />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginRight: "70px",
            gap: "10px",
          }}
        >
          <Link onClick={handleLink}>
            <CheckBoxesComp
              label="الموافقة على سياسة الخصوصية"
              checked={checked}
            />
          </Link>
          <br />
          {alerting && (
            <Alert severity="error" sx={{ width: "60%" }}>
              عذراً يجب الموافقة على سياسة الخصوصية
            </Alert>
          )}
        </Box>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <Button
            onClick={handleClick}
            sx={{
              color: "white",
              marginTop: "20px",
              bgcolor: "#2D1332",
              "&:hover": { color: "#2D1332", bgcolor: "white" },
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "إنشاء حساب"
            )}
          </Button>
        </div>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#2D1332", marginBottom: "10px", marginTop: "20px" }}
          >
            تملك حساب مسبقاً ؟
          </Typography>
          <Button
            sx={{ color: "#00797C", marginTop: "10px", fontWeight: "bold" }}
            onClick={() => {
              navigate("/Login");
            }}
          >
            تسجيل الدخول
          </Button>
        </Stack>
      </Box>
      <PrivacyDialog setOpen={setOpen} open={open} />
    </div>
  );
}
