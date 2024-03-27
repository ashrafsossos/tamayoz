import * as React from "react";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import {
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./Media/475.437.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import ChooseDialog from "./Components/ChooseDialog";

function ResponsiveAppBar({ theState, theIm }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const pages = [t("من نحن"), t("الأخبار"), t("تواصل معنا")];
  const settings = ["Settings", "Favourites", "History", "Logout"];

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [login, setLogin] = React.useState(true);
  const [langMenu, setLangMenu] = React.useState(null);
  const role = localStorage.getItem("role");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  var modifiedStr;
  const info = localStorage.getItem("image");
  if (info && !theIm) {
    modifiedStr = info.replace(/"/g, "");
  }
  if (info && theIm) {
    modifiedStr = decodeURI(info);
  }
  const handleCloseNavMenu = (e, i) => {
    setAnchorElNav(null);
    const sectionElement = document.getElementById(i);
    sectionElement.scrollIntoView();
  };

  React.useEffect(() => {
    setLogin(false);
  }, []);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseLangMenu = () => {
    setLangMenu(null);
  };
  const handleImage = () => {
    navigate("/");
    setAnchorElNav(null);
  };

  const handlelogout = () => {
    dispatch(logout());
    navigate("/");
    handleCloseUserMenu();
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/Profile");
  };

  const handleEn = () => {
    i18next.changeLanguage("en");
    handleCloseLangMenu();
  };
  const handleAr = () => {
    i18next.changeLanguage("ar");
    handleCloseLangMenu();
  };
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
        <Container maxWidth="100%" sx={{ padding: "5px", direction: "rtl" }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img
                src={logo}
                alt="img1"
                style={{
                  width: "100px",
                  height: "100px",
                  marginTop: "5px",
                  objectFit: "cover",
                }}
              />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", color: "black" },
              }}
            >
              <MenuIcon
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              ></MenuIcon>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  color: "black",
                }}
              >
                <img
                  src={logo}
                  style={{ width: "100px", height: "100px" }}
                  onClick={handleImage}
                  alt="img2"
                />
                {theState && (
                  <>
                    {pages.map((page, i) => (
                      <MenuItem
                        key={page}
                        onClick={(e) => {
                          handleCloseNavMenu(e, pages[i]);
                        }}
                        sx={{ color: "black" }}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </>
                )}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexWrap: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {theState && (
                <>
                  {pages.map((page, i) => (
                    <Button
                      key={page}
                      onClick={(e) => {
                        handleCloseNavMenu(e, pages[i]);
                      }}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                        "&:focus": { color: "#00797C" },
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#00797C",
                        },
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </>
              )}
              {!theState && (
                <>
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      "&:focus": { color: "#00797C" },
                      "&:hover": { color: "white", backgroundColor: "#00797C" },
                    }}
                  >
                    الصفحة الرئيسية
                  </Button>
                </>
              )}
            </Box>
            {!info && (
              <>
                <Button
                  sx={{ color: "#2D1332", marginTop: "10px" }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {t("تسجيل الدخول")}
                </Button>
                <Button
                  sx={{ color: "#2D1332", marginTop: "10px" }}
                  onClick={() => {
                    navigate("/Verification", { state: { login: login } });
                  }}
                >
                  {t("إنشاء حساب")}
                </Button>
              </>
            )}

            {/* <Box sx={{ flexGrow: 0 }}>
          <Tooltip >
          <a onClick={()=>{setLangMenu(!langMenu)}} style={{ marginRight:'20px' }}>
            <LanguageIcon  sx={{ p: 0 }}/>
          </a>
          </Tooltip>
            <Menu sx={{ mt: '40px',marginLeft:'-90px' }}
              anchorEl={langMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(langMenu)}
              onClose={handleCloseLangMenu}>
            <MenuItem>
              <Button sx={{ color:'black' }}
               onClick={() =>{ handleEn() }}>{t('English')}</Button>
              </MenuItem>
              <MenuItem>
              <Button sx={{ color:'black' }}
              onClick={() =>{ handleAr() }}>{t('Arabic')}</Button>
              </MenuItem>
        </Menu>
          </Box> */}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  {!info && (
                    <Avatar
                      src="/static/images/avatar/2.jpg"
                      sx={{ borderRadius: "100%" }}
                    />
                  )}
                  {info && role === "student" && !theIm && (
                    <img
                      alt="img3"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                      src={`${process.env.REACT_APP_API_URL_IMAGE}${modifiedStr}`}
                    />
                  )}
                  {info && role === "student" && theIm && (
                    <img
                      alt="img4"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                      src={modifiedStr}
                    />
                  )}
                  {info && role === "teacher" && !theIm && (
                    <img
                      alt="img5"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                      src={`${process.env.REACT_APP_API_URL_IMAGE}${modifiedStr}`}
                    />
                  )}
                  {info && role === "teacher" && theIm && (
                    <img
                      alt="img6"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                      src={modifiedStr}
                    />
                  )}
                </IconButton>
              </Tooltip>
              {info && role === "student" && (
                <Menu
                  sx={{ mt: "80px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleProfile}>
                      {t("الملف الشخصي")}
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handlelogout}>
                      {t("تسجيل الخروج")}
                    </Typography>
                  </MenuItem>
                </Menu>
              )}

              {info && role === "teacher" && (
                <Menu
                  sx={{ mt: "80px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/TeacherProfile");
                      }}
                    >
                      {t("الملف الشخصي")}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/TeacherSubject");
                      }}
                    >
                      {t("موادي")}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handlelogout}>
                      {t("تسجيل الخروج")}
                    </Typography>
                  </MenuItem>
                </Menu>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ChooseDialog open={open} setOpen={setOpen} />
    </>
  );
}
export default ResponsiveAppBar;
