import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

export default function UserMenu() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  const MenuButton = ({ to, text }) => (
    <Button
      sx={{ m: 0.5 }}
      variant="contained"
      component={NavLink}
      to={to}
      style={({ isActive }) => ({
        backgroundColor: isActive && palette.primary.light,
        color: isActive && palette.primary.dark,
      })}
    >
      {text}
    </Button>
  );

  return (
    <Stack direction={matchesSm ? "row" : "column"}>
      <Stack direction={matchesSm || !matchesXs ? "column" : "row"}>
        <MenuButton to="/user/account" text={"Account"} />
        <MenuButton to="/user/orders" text={"Orders"} />
      </Stack>
      <Outlet />
    </Stack>
  );
}
