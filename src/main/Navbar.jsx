import { useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { postFetch } from "../hooks/fetchHooks";

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
  TextField,
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
import Categories from "./Categories";

import { StyledSearch } from "../components/styled";

export default function Navbar() {
  const { palette, breakpoints } = useTheme();
  const matchesMd = useMediaQuery(breakpoints.up("md"));
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  const navigate = useNavigate();
  const location = useLocation();

  const { notify, cart, userData, setUserData } = useContext(Context);

  const [openLogIn, setOpenLogIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const [anchorElLog, setAnchorElLog] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [searchCategories, setSearchCategories] = useState("");
  const [search, setSearch] = useState(null);

  function logoutSubmit() {
    postFetch("/auth/logout").then(({ error, message }) => {
      if (!error) {
        notify(message);
        setUserData({
          username: null,
          email: null,
          isAdmin: null,
        });
        navigate("/");
      }
    });
  }

  function procSearch(category) {
    navigate("/product", {
      state: {
        name: search ? search : "",
        category: category ? [category] : [],
      },
    });
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: palette.primary.dark }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {location.pathname !== "/product" && (
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
                      bgcolor: palette.primary.dark,
                    },
                  }}
                  open={openDrawer}
                  onClose={() => setOpenDrawer(false)}
                >
                  <TextField
                    fullWidth
                    sx={{ bgcolor: palette.primary.dark }}
                    placeholder="Search…"
                    onChange={(e) => setSearchCategories(e.target.value)}
                  />
                  <Categories
                    setOpenDrawer={setOpenDrawer}
                    procSearch={procSearch}
                    searchCategories={searchCategories}
                    matchesSm={matchesSm}
                  />
                </Drawer>
              </>
            )}
            <Button
              title="Main page"
              component={NavLink}
              to="/"
              sx={{ mr: 1 }}
              variant="contained"
            >
              <HomeIcon />
              {matchesMd && "Home"}
            </Button>
          </Box>
          {matchesMd &&
            location.pathname !== "/product" &&
            !location.pathname.includes("admin") && (
              <StyledSearch>
                <InputBase
                  fullWidth
                  sx={{ input: { color: palette.text.contrast } }}
                  placeholder="Search…"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && procSearch()}
                />
                <Button title="Search" onClick={() => procSearch()}>
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
                  invisible={cart.count < 0}
                >
                  <ShoppingCartIcon />
                </Badge>
                {matchesMd && "Cart"}
              </Button>
              {userData.username ? (
                <>
                  <>
                    <Button
                      title="User info"
                      variant="contained"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <AccountCircleIcon />
                      {matchesXs && userData.username.slice(0, 9)}
                    </Button>
                    <Menu
                      sx={{
                        ul: {
                          backgroundColor: palette.secondary.dark,
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
                          sx={{ bgcolor: palette.primary.main }}
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
                          sx={{ bgcolor: palette.primary.main }}
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
                        sx={{ bgcolor: palette.primary.main }}
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
                        sx={{ ul: { bgcolor: palette.primary.dark } }}
                        anchorEl={anchorElLog}
                        keepMounted
                        open={Boolean(anchorElLog)}
                        onClose={() => setAnchorElLog(false)}
                      >
                        <Button
                          onClick={() => {
                            setOpenLogIn(true);
                            setAnchorElLog(false);
                          }}
                          sx={{ mr: 1 }}
                          variant="contained"
                        >
                          Log in
                          <LoginIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            setOpenRegister(true);
                            setAnchorElLog(false);
                          }}
                          variant="contained"
                        >
                          Register <AppRegistrationIcon />
                        </Button>
                      </Menu>
                    </>
                  )}
                </>
              )}
            </>
          </Box>
        </Toolbar>
        {!matchesMd &&
          location.pathname !== "/product" &&
          !location.pathname.includes("admin") && (
            <StyledSearch>
              <InputBase
                fullWidth
                placeholder="Search…"
                sx={{ input: { color: palette.text.contrast } }}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && procSearch()}
              />
              <Button title="Search" onClick={() => procSearch()}>
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
              setUserData={setUserData}
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
