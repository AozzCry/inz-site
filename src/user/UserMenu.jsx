import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

export default function UserMenu() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  return (
    <Stack direction={matchesSm ? "row" : "column"}>
      <Stack direction={matchesSm || !matchesXs ? "column" : "row"}>
        <Button
          sx={{ m: 0.5 }}
          variant="contained"
          component={NavLink}
          to="/user/account"
          style={({ isActive }) => ({
            backgroundColor: isActive && palette.primary.light,
            color: isActive && palette.primary.dark,
          })}
        >
          Account
        </Button>
        <Button
          sx={{ m: 0.5 }}
          variant="contained"
          component={NavLink}
          to="/user/orders"
          style={({ isActive }) => ({
            backgroundColor: isActive && palette.primary.light,
            color: isActive && palette.primary.dark,
          })}
        >
          Orders
        </Button>
      </Stack>
      <Outlet />
    </Stack>
  );
}
