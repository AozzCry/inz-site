import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function LoadingPage({ what = "" }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={1}
    >
      <CircularProgress />
      <Typography variant="h5" sx={{ m: 3 }}>
        {what ? `Loading ${what}...` : "Loading..."}
      </Typography>
    </Box>
  );
}
