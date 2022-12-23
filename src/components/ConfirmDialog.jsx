import { useContext } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useTheme,
} from "@mui/material/";

import Context from "../utils/Context";

export default function ConfirmDialog() {
  const { palette } = useTheme();
  const { confirmDialog, setConfirmDialog } = useContext(Context);

  return (
    <div>
      <Dialog
        transitionDuration={0}
        PaperProps={{ sx: { bgcolor: palette.primary.dark } }}
        open={confirmDialog.open}
        onClose={() =>
          setConfirmDialog({ open: false, text: "", afterConfirm: null })
        }
      >
        <DialogTitle id="alert-dialog-title">{confirmDialog.text}</DialogTitle>

        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            fullWidth
            onClick={() =>
              setConfirmDialog({ open: false, text: "", afterConfirm: null })
            }
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              confirmDialog.afterConfirm();
              setConfirmDialog({ open: false, text: "", afterConfirm: null });
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
