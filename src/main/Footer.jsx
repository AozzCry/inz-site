import { useContext } from "react";

import { Button, Typography, useTheme, Box } from "@mui/material";
import Context from "../utils/Context";

export default function Footer() {
  const { setTheme } = useContext(Context);
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: useTheme().palette.secondary.dark,
        position: "absolute",
        bottom: 0,
        width: 1,
        borderTop: 1,
      }}
    >
      <Typography variant="body2" align="center">
        Copyright © EMicro 2022
        <Button
          sx={{ ml: 1, py: 0, my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={() => setTheme((prev) => !prev)}
        >
          Change theme
        </Button>
      </Typography>
    </Box>
  );
}
