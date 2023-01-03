import { useContext, useState } from "react";

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
import { banUserById, deleteDocument } from "../utils/functions";

export default function ManageUser({ user, refetch }) {
  const matches = useMediaQuery(useTheme().breakpoints.up("md"));

  const { notify, confirm } = useContext(Context);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  return (
    <ListItem
      sx={{
        border: 1,
        borderRadius: "15px",
        bgcolor: "secondary.dark",
        my: 1,
      }}
      key={user._id}
    >
      <ListItemText
        primaryTypographyProps={{ color: "text.primary" }}
        primary={user.username}
        secondary={user.email}
      />
      <ListItemText
        primaryTypographyProps={{ color: "text.primary" }}
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
            onClick={() =>
              confirm(
                "Do you want to " +
                  (user.isBanned ? "unban" : "ban") +
                  " this user?",
                () => banUserById(user._id, refetch, notify)
              )
            }
          >
            {user.isBanned ? "Unban" : "Ban"}
          </Button>
          <Button
            title="Delete user"
            variant="outlined"
            edge={"end"}
            color="error"
            onClick={() =>
              confirm("Do you want to delete this user?", () =>
                deleteDocument("user", user._id, refetch, notify)
              )
            }
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
                backgroundColor: "secondary.dark",
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
              onClick={() =>
                confirm(
                  "Do you want to ban this user?",
                  banUserById(user._id, refetch, notify)
                )
              }
            >
              Ban
            </MenuItem>
            <MenuItem
              title="Delete user"
              variant="contained"
              edge={"end"}
              onClick={() =>
                confirm("Do you want to delete this user?", () =>
                  deleteDocument("/user/" + user._id, refetch, notify)
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
