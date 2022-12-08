import { Button, ListItemText, Stack, Box, Container } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AdminMenu() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const MenuButton = ({ to, text }) => (
    <Button
      sx={{ m: 0.5 }}
      variant="contained"
      component={NavLink}
      to={to}
      style={({ isActive }) => ({
        backgroundColor: isActive && theme.palette.primary.light,
        color: isActive && theme.palette.primary.dark,
      })}
    >
      <ListItemText primary={text} />
    </Button>
  );
  return (
    <Stack direction={matches ? "row" : "column"}>
      {matches ? (
        <Stack>
          <MenuButton to="/admin/orders" text="Orders" />
          <MenuButton to="/admin/createproduct" text="Product" />
          <MenuButton to="/admin/categories" text="Categories" />
          <MenuButton to="/admin/users" text="Users" />
        </Stack>
      ) : (
        <Container
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          <MenuButton component={Box} to="/admin/orders" text="Orders" />
          <MenuButton
            component={Box}
            to="/admin/createproduct"
            text="Product"
          />
          <MenuButton
            component={Box}
            to="/admin/categories"
            text="Categories"
          />
          <MenuButton component={Box} to="/admin/users" text="Users" />
        </Container>
      )}
      <Outlet />
    </Stack>
  );
}
