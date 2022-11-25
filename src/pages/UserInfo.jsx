import { Button, List, ListItem, ListItemText, Stack } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

export default function UserInfo() {
  return (
    <Stack direction="row">
      <List>
        <ListItem>
          <Button variant="contained" component={NavLink} to="/user/account">
            <ListItemText primary="Account" />
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained">
            <ListItemText primary="Orders" />
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained">
            <ListItemText primary="Reviews" />
          </Button>
        </ListItem>
      </List>
      <List>
        <Outlet />
      </List>
    </Stack>
  );
}
