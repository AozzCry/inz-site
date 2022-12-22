import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuButton({ to, text }) {
  const { palette, breakpoints } = useTheme();
  const matchesMd = useMediaQuery(breakpoints.up("md"));
  return (
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
}
