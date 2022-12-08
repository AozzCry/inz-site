import { useState, useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
  Divider,
  Drawer,
  Snackbar,
  Slide,
  Alert,
  useTheme,
  TextField,
  Badge,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import UserContext from "../utils/UserContext";
import LogIn from "../components/modalforms/LogIn";
import Register from "../components/modalforms/Register";
import Categories from "./Categories";

import { StyledSearch } from "../components/styled";

export default function Navbar() {
  const { cart, userData, setUserData } = useContext(UserContext);

  const [openLogIn, setOpenLogIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const { palette, breakpoints } = useTheme();
  const matchesMd = useMediaQuery(breakpoints.up("md"));
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const [SBHandler, setSB] = useState({ open: false, message: "" });

  const nav = useNavigate();
  async function logoutSubmit() {
    postFetch("/logout").then(({ error, message }) => {
      if (!error) {
        setSB({ open: true, message: message });
        setUserData({
          username: null,
          email: null,
          isAdmin: null,
        });
        nav("/");
      }
    });
  }

  // const { status, data, error, refetch } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: async () => {
  //     try {
  //       const res = await axios.get("/category", {
  //         withCredentials: true,
  //       });
  //       return res.data;
  //     } catch (err) {
  //       if (err.response && err.response.data.message) {
  //         console.error(err.response.status, err.response.data.message);
  //       } else {
  //         throw err;
  //       }
  //     }
  //   },
  // });

  //------------ lol
  useEffect(() => {
    axios
      .post(
        "/login",
        {
          email: "eml@eml.eml",
          password: "eml",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.message);
        setUserData({
          username: res.data.content.username,
          email: res.data.content.email,
          isAdmin: res.data.content.isAdmin,
        });
        setSB({ open: true, message: res.data.message });
      });
  }, []);
  const [searchCategories, setSearchCategories] = useState("");

  const [search, setSearch] = useState(null);
  const location = useLocation();
  function procSearch(category) {
    nav("/product", {
      state: {
        name: search ? search : "",
        category: category ? [category] : [],
      },
    });
  }

  return (
    <>
      <AppBar position="static" color="secondary">
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
                  onClick={() => setOpenDrawer(true)}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  {matchesSm && "Categories"}
                  <CategoryIcon />
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
            {matchesXs && (
              <NavLink to="/">
                <Button sx={{ mr: 1 }} variant="contained">
                  {matchesMd && "Home"}
                  <HomeIcon />
                </Button>
              </NavLink>
            )}
          </Box>
          {matchesMd && location.pathname !== "/product" && (
            <StyledSearch>
              <InputBase
                fullWidth
                sx={{ input: { color: palette.text.contrast } }}
                placeholder="Search…"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && procSearch()}
              />
              <Button onClick={procSearch}>
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
                  badgeContent={cart.reduce((sum, ci) => (sum += ci.count), 0)}
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
                      variant="contained"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <AccountCircleIcon />
                      {userData.username.slice(0, 9)}
                      {userData.username.length > 10 && "..."}
                    </Button>
                    <Menu
                      classes={{ paper: { bgcolor: palette.primary.dark } }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                    >
                      {userData.isAdmin ? (
                        <MenuItem
                          sx={{ bgcolor: palette.primary.dark }}
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
                          sx={{ bgcolor: palette.primary.dark }}
                          component={NavLink}
                          to="/user"
                          onClick={() => {
                            setAnchorEl(null);
                          }}
                        >
                          User info
                        </MenuItem>
                      )}
                      <Divider />
                      <MenuItem
                        sx={{ bgcolor: palette.primary.dark }}
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
                  <Button
                    onClick={() => setOpenLogIn(true)}
                    variant="contained"
                    sx={{ mr: 1 }}
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
              )}
            </>
          </Box>
        </Toolbar>
        {!matchesMd && location.pathname !== "/product" && (
          <StyledSearch>
            <InputBase
              fullWidth
              placeholder="Search…"
              sx={{ input: { color: palette.text.contrast } }}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && procSearch()}
            />
            <Button onClick={procSearch}>
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
              setSB={setSB}
            />
          </>
        </Modal>
        <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
          <>
            <Register close={() => setOpenRegister(false)} setSB={setSB} />
          </>
        </Modal>
      </>
      <Snackbar
        open={SBHandler.open}
        onClose={() => setSB({ open: false, message: null })}
        autoHideDuration={3000}
      >
        <Alert>{SBHandler.message}</Alert>
      </Snackbar>
    </>
  );
}
