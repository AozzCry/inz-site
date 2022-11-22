import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import API from "../env.jsx";

import styled from "@emotion/styled";
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
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import LogIn from "../forms/LogIn";
import Register from "../forms/Register";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  ":focus-within, :hover": {
    backgroundColor: theme.palette.secondary.light,
  },
  alignItems: "center",
  display: "flex",
  borderRadius: "25px",
  padding: theme.spacing(0, 1),
}));

function Transition(props) {
  return <Slide {...props} direction="left" />;
}

export default function Navbar() {
  const [username, setUsername] = useState(null);

  const [openLogIn, setOpenLogIn] = useState(false);
  const handleOpenLogIn = () => setOpenLogIn(true);
  const handleCloseLogIn = () => setOpenLogIn(false);

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const [SBHandler, setSB] = useState({ open: false, message: "" });
  const handleCloseSB = () => {
    setSB({ open: false });
  };

  const logoutClick = async () => {
    try {
      const res = await axios.request({
        method: "GET",
        url: API + "/logout",
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res.statusText, res.data.message);
        setSB({ open: true, message: res.data.message });
        setUsername(null);
      }
    } catch (error) {
      throw error;
    }
  };

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
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
              variant="contained"
            >
              Categories
            </Button>
            <Drawer open={openDrawer} onClose={handleDrawerClose}>
              <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton onClick={handleDrawerClose}>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
              </List>
            </Drawer>

            <NavLink to="/">
              {matches ? (
                <Button sx={{ mr: 1 }} variant="contained">
                  Home
                </Button>
              ) : (
                <HomeIcon
                  sx={{ backgroundColor: theme.palette.primary.light }}
                />
              )}
            </NavLink>
          </Box>
          <Search>
            <InputBase placeholder="Search…" />
            <SearchIcon />
          </Search>
          <Box>
            {matches ? (
              <>
                {username ? (
                  <>
                    <NavLink to="/userinfo">
                      <Button variant="contained">{username}</Button>
                    </NavLink>
                    <Button onClick={logoutClick} variant="contained">
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleOpenLogIn}
                      variant="contained"
                      sx={{ mr: 2 }}
                    >
                      Log in
                    </Button>
                    <Button onClick={handleOpenRegister} variant="contained">
                      Register
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button variant="contained" onClick={handleClick}>
                  Options
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleOpenLogIn} variant="contained">
                    Log in
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleOpenRegister} variant="contained">
                    Register
                  </MenuItem>
                  <NavLink to="/userinfo">
                    <MenuItem>User info</MenuItem>
                  </NavLink>
                  <Divider />
                  <MenuItem>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <>
        <Modal open={openLogIn} onClose={handleCloseLogIn}>
          <>
            <LogIn
              close={handleCloseLogIn}
              setUsername={setUsername}
              setSB={setSB}
            />
          </>
        </Modal>
        <Modal open={openRegister} onClose={handleCloseRegister}>
          <>
            <Register close={handleCloseRegister} setSB={setSB} />
          </>
        </Modal>
      </>
      <Snackbar
        open={SBHandler.open}
        onClose={handleCloseSB}
        autoHideDuration={3000}
        TransitionComponent={Transition}
      >
        <Alert>{SBHandler.message}</Alert>
      </Snackbar>
    </Box>
  );
}
