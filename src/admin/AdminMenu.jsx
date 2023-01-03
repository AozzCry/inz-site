import { useState } from "react";

import { NavLink, Outlet } from "react-router-dom";

import {
  Stack,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function AdminMenu() {
  const matchesMd = useMediaQuery(useTheme().breakpoints.up("md"));
  const matchesXs = useMediaQuery(useTheme().breakpoints.up("xs"));

  const [value, setValue] = useState(0);

  const onAcive = (isActive) => {
    return {
      backgroundColor: isActive && "primary.light",
      color: isActive && "primary.dark",
    };
  };

  return (
    <Stack
      direction={matchesMd ? "row" : "column"}
      sx={{ bgcolor: "primary.dark", border: 1 }}
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
            to={"/admin/productform"}
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
            Categories
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
      <Box sx={{ width: 1, borderBottom: 4, borderColor: "primary.dark" }}>
        <Outlet />
      </Box>

      {!matchesXs && (
        <BottomNavigation
          sx={{
            bgcolor: "primary.dark",
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
