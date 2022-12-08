import { Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";

export default function Footer() {
  const { palette } = useTheme();
  return (
    <Container sx={{ minHeight: "11.2vh", bgcolor: palette.secondary.main }}>
      <footer>
        <Typography variant="body2" align="center">
          {"Copyright © "}
          <a color="inherit">Your Website</a> {new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
    </Container>
  );
}
