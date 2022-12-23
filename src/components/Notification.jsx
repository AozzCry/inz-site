import { useContext } from "react";

import { Alert, Snackbar } from "@mui/material";

import Context from "../utils/Context";
import { useTheme } from "@emotion/react";

export default function Notification() {
  const { palette } = useTheme();
  const { snackBar, setSnackBar } = useContext(Context);

  return (
    <Snackbar
      open={snackBar.open}
      onClose={() =>
        setSnackBar({ open: false, message: null, severity: "success" })
      }
      autoHideDuration={3000}
    >
      <Alert
        sx={{ bgcolor: palette.primary.dark, color: palette.text.primary }}
        severity={snackBar.severity}
      >
        {snackBar.message}
      </Alert>
    </Snackbar>
  );
}
