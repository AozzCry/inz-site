import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import UserContext from "../UserContext";
import LogIn from "../forms/LogIn";
import Register from "../forms/Register";
import { StyledSearch } from "../styled.jsx";

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);

  const [openLogIn, setOpenLogIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const [SBHandler, setSB] = useState({ open: false, message: "" });

  const nav = useNavigate();
  async function logoutClick() {
    try {
      const res = await axios.get("/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res.statusText, res.data.message);
        setSB({ open: true, message: res.data.message });
        setUserData({
          username: null,
          email: null,
        });
        nav("/");
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Button
              onClick={() => setOpenDrawer(true)}
              sx={{ mr: 1 }}
              variant="contained"
            >
              {matches ? "Categories" : <CategoryIcon />}
            </Button>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton onClick={() => setOpenDrawer(false)}>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
              </List>
            </Drawer>

            <NavLink to="/">
              <Button sx={{ mr: 1 }} variant="contained">
                {matches ? "Home" : <HomeIcon />}
              </Button>
            </NavLink>
          </Box>
          {matches && (
            <StyledSearch>
              <InputBase placeholder="Search…" />
              <SearchIcon />
            </StyledSearch>
          )}
          <Box>
            <>
              {userData.username ? (
                <>
                  <>
                    <Button
                      variant="contained"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      {userData.username ? userData.username : "Options"}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem
                        component={NavLink}
                        to="/user"
                        onClick={() => {
                          setAnchorEl(null);
                        }}
                      >
                        User info
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          logoutClick();
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
                    {matches ? "Log in" : <LoginIcon />}
                  </Button>
                  <Button
                    onClick={() => setOpenRegister(true)}
                    variant="contained"
                  >
                    {matches ? "Register" : <AppRegistrationIcon />}
                  </Button>
                </>
              )}
            </>
          </Box>
        </Toolbar>
        {!matches && (
          <StyledSearch>
            <InputBase fullWidth placeholder="Search…" />
            <SearchIcon />
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
        onClose={() => setSB({ open: false })}
        autoHideDuration={3000}
        TransitionComponent={(p) => <Slide {...p} direction="left" />}
      >
        <Alert>{SBHandler.message}</Alert>
      </Snackbar>
    </Box>
  );
}
