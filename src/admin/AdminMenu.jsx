import { NavLink, Outlet } from "react-router-dom";
import {
  Stack,
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

  const [value, setValue] = useState(0);

  const onAcive = (isActive) => {
    return {
      backgroundColor: isActive && palette.primary.light,
      color: isActive && palette.primary.dark,
    };
  };

  return (
    <Stack
      direction={matchesMd ? "row" : "column"}
      sx={{ bgcolor: palette.primary.dark, borderRadius: 30 }}
    >
      {matchesXs && (
        <Stack
          direction={!matchesMd ? "row" : "column"}
          sx={{ display: matchesXs ? "flex" : "inline" }}
        >
          <Button
            sx={{ m: 0.5, flexGrow: matchesMd ? 0 : 1 }}
            variant="contained"
            component={NavLink}
            to={"/admin/orders"}
            style={({ isActive }) => onAcive(isActive)}
          >
            {"Orders"}
          </Button>
          <Button
            sx={{ m: 0.5, flexGrow: matchesMd ? 0 : 1 }}
            variant="contained"
            component={NavLink}
            to={"/admin/createproduct"}
            style={({ isActive }) => onAcive(isActive)}
          >
            Product
          </Button>
          <Button
            sx={{ m: 0.5, flexGrow: matchesMd ? 0 : 1 }}
            variant="contained"
            component={NavLink}
            to={"/admin/categories"}
            style={({ isActive }) => onAcive(isActive)}
          >
            Orders
          </Button>
          <Button
            sx={{ m: 0.5, flexGrow: matchesMd ? 0 : 1 }}
            variant="contained"
            component={NavLink}
            to={"/admin/users"}
            style={({ isActive }) => onAcive(isActive)}
          >
            Users
          </Button>
        </Stack>
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
