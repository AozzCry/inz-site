import { useState } from "react";
import { patchFetch } from "../hooks/fetchHooks";

import { NavLink } from "react-router-dom";

import {
  ListItem,
  ListItemText,
  Button,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function OneUser({ user, refetch }) {
  const { palette } = useTheme();
  const matches = useMediaQuery(useTheme().breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  function banUserSubmit(id) {
    patchFetch("/user/banbyid", { id }).then(({ error }) => {
      if (!error) {
        refetch();
      }
    });
  }
  function deleteUserSubmit(id) {
    patchFetch("/user/deletebyid", { id }).then(({ error }) => {
      if (!error) {
        refetch();
        setAnchorEl(false);
      }
    });
  }

  return (
    <ListItem
      sx={{
        borderRadius: "15px",
        bgcolor: palette.secondary.dark,
        m: 1,
      }}
      key={user._id}
    >
      <ListItemText
        primaryTypographyProps={{ color: palette.text.primary }}
        primary={user.username}
        secondary={user.email}
      />
      <ListItemText
        primaryTypographyProps={{ color: palette.text.primary }}
        primary={user.isBanned && "Banned"}
        secondary={user.isAdmin && "Admin"}
      />
      {matches ? (
        <>
          <Button
            component={NavLink}
            to={"../orders"}
            sx={{ mr: 1 }}
            variant="contained"
            edge={"end"}
          >
            Orders
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            edge={"end"}
            onClick={() => banUserSubmit(user._id)}
          >
            Ban
          </Button>
          <Button
            variant="contained"
            edge={"end"}
            onClick={() => deleteUserSubmit(user._id)}
          >
            Remove
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            value={user._id}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Options
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
            <MenuItem
              component={NavLink}
              to={"../orders"}
              state={{ search: user.email }}
              variant="contained"
              edge={"end"}
            >
              Orders
            </MenuItem>
            <MenuItem
              variant="contained"
              edge={"end"}
              onClick={() => banUserSubmit(anchorEl.value)}
            >
              Ban
            </MenuItem>

            <MenuItem
              variant="contained"
              edge={"end"}
              onClick={() => deleteUserSubmit(anchorEl.value)}
            >
              Remove
            </MenuItem>
          </Menu>
        </>
      )}
    </ListItem>
  );
}
