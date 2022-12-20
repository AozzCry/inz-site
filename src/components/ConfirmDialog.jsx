import * as React from "react";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material/";
import { useTheme } from "@emotion/react";

export default function ConfirmDialog({ confirmDialog, setConfirmDialog }) {
  const { palette } = useTheme();
  return (
    <div>
      <Dialog
        transitionDuration={0}
        PaperProps={{ sx: { bgcolor: palette.primary.dark } }}
        open={confirmDialog.open}
        onClose={() => setConfirmDialog(false)}
      >
        <DialogTitle id="alert-dialog-title">{confirmDialog.text}</DialogTitle>

        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            fullWidth
            onClick={() => setConfirmDialog(false)}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              setConfirmDialog(false);
              confirmDialog.afterConfirm();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
