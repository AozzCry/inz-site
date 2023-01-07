import { useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import fetch from "../hooks/fetchHooks";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  InputBase,
  Modal,
  Menu,
  MenuItem,
  Drawer,
  useTheme,
  Badge,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SegmentIcon from "@mui/icons-material/Segment";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Context from "../utils/Context";
import LogIn from "../components/modalforms/LogIn";
import Register from "../components/modalforms/Register";
import Categories from "../components/Categories";

import { StyledSearch } from "../components/styled";

export default function Navbar() {
  const { breakpoints } = useTheme();
  const matchesMd = useMediaQuery(breakpoints.up("md"));
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  const navigate = useNavigate();
  const location = useLocation();

  const { notify, cart, userData, refetchUserData, setSearch } =
    useContext(Context);

  const [openLogIn, setOpenLogIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const [anchorElLog, setAnchorElLog] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);

  function logoutSubmit() {
    fetch.post("/auth/logout").then(({ error, message }) => {
      if (!error) {
        notify(message);
        refetchUserData();
        document.cookie = "stalLoggedIn=; max-age=0";
        navigate("/");
      }
    });
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "primary.dark" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {location.pathname !== "/search" && (
              <>
                <Button
                  title="Categories"
                  onClick={() => setOpenDrawer(true)}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  <SegmentIcon />
                  {matchesSm && "Categories"}
                </Button>
                <Drawer
                  PaperProps={{
                    sx: {
                      bgcolor: "primary.dark",
                    },
                  }}
                  open={openDrawer}
                  onClose={() => setOpenDrawer(false)}
                >
                  <Categories
                    setOpenDrawer={setOpenDrawer}
                    matchesSm={matchesSm}
                  />
                </Drawer>
              </>
            )}

            {location.pathname !== "/" && (
              <Button
                title="Main page"
                component={NavLink}
                to="/"
                sx={{ mr: 1 }}
                variant="contained"
              >
                <HomeIcon />
                {matchesSm && "Home"}
              </Button>
            )}
          </Box>
          {matchesMd &&
            location.pathname !== "/search" &&
            !location.pathname.includes("admin") && (
              <StyledSearch>
                <InputBase
                  fullWidth
                  sx={{ input: { color: "text.contrast" } }}
                  placeholder="Search…"
                  onChange={(e) =>
                    setSearch({ name: e.target.value, category: [] })
                  }
                  onKeyDown={(e) => e.key === "Enter" && navigate("/search")}
                />
                <Button title="Search" onClick={() => navigate("/search")}>
                  <SearchIcon />
                </Button>
              </StyledSearch>
            )}
          <Box>
            <>
              <Button
                component={NavLink}
                to="/cart"
                variant="contained"
                sx={{ mr: 1 }}
              >
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  badgeContent={cart.reduce((sum, ci) => sum + ci.count, 0)}
                  color="secondary"
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "text.contrast",
                      backgroundColor: "primary.light",
                    },
                  }}
                  invisible={cart.count < 0}
                >
                  <ShoppingCartIcon />
                </Badge>
                {matchesSm && "Cart"}
              </Button>
              {userData.username ? (
                <>
                  <>
                    <Button
                      sx={{ maxWidth: matchesSm ? 182 : 152 }}
                      title="User info"
                      variant="contained"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <AccountCircleIcon />
                      {matchesSm
                        ? userData.username.slice(0, 12)
                        : matchesXs && userData.username.slice(0, 9) + "..."}
                    </Button>
                    <Menu
                      sx={{
                        ul: {
                          backgroundColor: "secondary.dark",
                          p: 0,
                        },
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                    >
                      {userData.isAdmin ? (
                        <MenuItem
                          dense={true}
                          sx={{ bgcolor: "primary.dark", py: 2 }}
                          component={NavLink}
                          to="/admin"
                          onClick={() => {
                            setAnchorEl(null);
                          }}
                        >
                          Admin Panel
                        </MenuItem>
                      ) : (
                        <MenuItem
                          sx={{ bgcolor: "primary.dark", py: 2 }}
                          component={NavLink}
                          to="/user"
                          onClick={() => {
                            setAnchorEl(null);
                          }}
                        >
                          User info
                        </MenuItem>
                      )}
                      <MenuItem
                        sx={{ bgcolor: "primary.dark" }}
                        onClick={() => {
                          logoutSubmit();
                          setAnchorEl(null);
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                </>
              ) : (
                <>
                  {matchesSm ? (
                    <>
                      <Button
                        onClick={() => setOpenLogIn(true)}
                        variant="contained"
                        sx={{
                          mr: 1,
                        }}
                      >
                        {matchesMd ? "Log in" : <LoginIcon />}
                      </Button>
                      <Button
                        onClick={() => setOpenRegister(true)}
                        variant="contained"
                      >
                        {matchesMd ? "Register" : <AppRegistrationIcon />}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        title="User options"
                        variant="contained"
                        onClick={(e) => setAnchorElLog(e.currentTarget)}
                      >
                        <AccountCircleIcon />
                      </Button>
                      <Menu
                        sx={{ ul: { bgcolor: "primary.dark", p: 0 } }}
                        anchorEl={anchorElLog}
                        keepMounted
                        open={Boolean(anchorElLog)}
                        onClose={() => setAnchorElLog(false)}
                      >
                        <MenuItem
                          onClick={() => {
                            setOpenLogIn(true);
                            setAnchorElLog(false);
                          }}
                          variant="contained"
                        >
                          Log in
                          <LoginIcon />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setOpenRegister(true);
                            setAnchorElLog(false);
                          }}
                          variant="contained"
                        >
                          Register <AppRegistrationIcon />
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </>
              )}
            </>
          </Box>
        </Toolbar>
        {!matchesMd &&
          location.pathname !== "/search" &&
          !location.pathname.includes("admin") && (
            <StyledSearch>
              <InputBase
                fullWidth
                placeholder="Search…"
                sx={{ input: { color: "text.contrast" } }}
                onChange={(e) =>
                  setSearch({ name: e.target.value, category: [] })
                }
                onKeyDown={(e) => e.key === "Enter" && navigate("/search")}
              />
              <Button title="Search" onClick={() => navigate("/search")}>
                <SearchIcon />
              </Button>
            </StyledSearch>
          )}
      </AppBar>
      <>
        <Modal open={openLogIn} onClose={() => setOpenLogIn(false)}>
          <>
            <LogIn
              close={() => setOpenLogIn(false)}
              setOpenRegister={setOpenRegister}
            />
          </>
        </Modal>
        <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
          <>
            <Register
              close={() => setOpenRegister(false)}
              setOpenLogIn={setOpenLogIn}
            />
          </>
        </Modal>
      </>
    </>
  );
}
