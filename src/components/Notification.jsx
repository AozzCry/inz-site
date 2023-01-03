import { useContext } from "react";

import { Alert, Snackbar } from "@mui/material";

import Context from "../utils/Context";

export default function Notification() {
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
        sx={{ bgcolor: "primary.dark", color: "text.primary" }}
        severity={snackBar.severity}
      >
        {snackBar.message}
      </Alert>
    </Snackbar>
  );
}
