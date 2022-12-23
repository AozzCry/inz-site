import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const { palette } = useTheme();
  return (
    <footer>
      <Box sx={{ bgcolor: palette.secondary.main }}>
        <Typography variant="body2" align="center">
          {"Copyright © "}
          <a>EMicro</a> {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </footer>
  );
}
