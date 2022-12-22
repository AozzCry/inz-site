import { Box, Typography } from "@mui/material";

export default function ErrorPage({ error = "Unknown", status = "500" }) {
  return (
    <Box>
      <Typography textAlign={"center"} variant="h5">
        An error has occurred
      </Typography>
      <Typography textAlign={"center"} variant="body1">
        {error}
      </Typography>
      <Typography textAlign={"center"} variant="body1">
        {status}
      </Typography>
    </Box>
  );
}
