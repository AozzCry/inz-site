import { useContext, useState } from "react";
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
import Context from "../utils/Context";

export default function ManageUser({ user, refetch }) {
  const { palette } = useTheme();
  const matches = useMediaQuery(useTheme().breakpoints.up("md"));

  const { notify, confirm } = useContext(Context);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  function banUserSubmit(id) {
    patchFetch("/user/banbyid", { id }).then(({ error }) => {
      if (!error) {
        refetch();
        notify("User banned");
      }
    });
  }
  function deleteUserSubmit(id) {
    patchFetch("/user/deletebyid", { id }).then(({ error }) => {
      if (!error) {
        refetch();
        setAnchorEl(false);
        notify("User deleted");
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
            title="View user orders"
            component={NavLink}
            to={"../orders"}
            state={{ search: user.email }}
            sx={{ mr: 1 }}
            variant="outlined"
            color="info"
            edge={"end"}
          >
            Orders
          </Button>
          <Button
            title="Ban user"
            sx={{ mr: 1 }}
            variant="outlined"
            edge={"end"}
            color="warning"
            onClick={() => banUserSubmit(user._id)}
          >
            Ban
          </Button>
          <Button
            title="Delete user"
            variant="outlined"
            edge={"end"}
            color="error"
            onClick={() => deleteUserSubmit(user._id)}
          >
            Remove
          </Button>
        </>
      ) : (
        <>
          <Button
            title="Options"
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
              title="View user orders"
              component={NavLink}
              to={"../orders"}
              state={{ search: user.email }}
              variant="contained"
              edge={"end"}
            >
              Orders
            </MenuItem>
            <MenuItem
              title="Ban user"
              variant="contained"
              edge={"end"}
              onClick={() => banUserSubmit(anchorEl.value)}
            >
              Ban
            </MenuItem>
            <MenuItem
              sx={{ bgcolor: palette.action.negative }}
              title="Delete user"
              variant="contained"
              edge={"end"}
              onClick={() =>
                confirm("Do you want to delete this user?", () =>
                  deleteUserSubmit(anchorEl.value)
                )
              }
            >
              Remove
            </MenuItem>
          </Menu>
        </>
      )}
    </ListItem>
  );
}
