import { NavLink, Outlet } from "react-router-dom";
import {
  Stack,
  Container,
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Box } from "@mui/system";
export default function AdminMenu() {
  const { palette, breakpoints } = useTheme();
  const matchesMd = useMediaQuery(breakpoints.up("md"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  const MenuButton = ({ to, text }) => (
    <Button
      sx={{ m: 0.5, flexGrow: matchesMd ? 0 : 1 }}
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
  const [value, setValue] = useState(0);
  return (
    <Stack
      direction={matchesMd ? "row" : "column"}
      sx={{ bgcolor: palette.primary.dark, borderRadius: 30 }}
    >
      {matchesMd ? (
        <Stack>
          <MenuButton to="/admin/orders" text="Orders" />
          <MenuButton to="/admin/createproduct" text="Product" />
          <MenuButton to="/admin/categories" text="Categories" />
          <MenuButton to="/admin/users" text="Users" />
        </Stack>
      ) : (
        matchesXs && (
          <Container sx={{ display: "flex" }}>
            <MenuButton to="/admin/orders" text="Orders" />
            <MenuButton to="/admin/createproduct" text="Product" />
            <MenuButton to="/admin/categories" text="Categories" />
            <MenuButton to="/admin/users" text="Users" />
          </Container>
        )
      )}
      <Box
        sx={{ width: 1, borderBottom: 4, borderColor: palette.primary.dark }}
      >
        <Outlet />
      </Box>

      {!matchesXs && (
        <BottomNavigation
          sx={{
            bgcolor: palette.primary.dark,
            position: "fixed",
            bottom: 0,
            width: 1,
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={NavLink}
            to="/admin/orders"
            label="Orders"
            icon={<ListAltIcon />}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/admin/createproduct"
            label="Product"
            icon={<AddBoxIcon />}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/admin/categories"
            label="Categories"
            icon={<CategoryIcon />}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/admin/users"
            label="Users"
            icon={<GroupIcon />}
          />
        </BottomNavigation>
      )}
    </Stack>
  );
}
